/* Szachy — interfejs: plansza, wejście (dotknięcie/przeciąganie), zegar, komputer, zapis. */
(() => {
'use strict';
const E = window.ChessEngine, P = window.PIECES;
const { Position, WHITE, BLACK } = E;
const $ = (s) => document.querySelector(s);

const LEVELS = [null,
  ['Nowicjusz', 'pierwsze partie'], ['Początkujący', 'zna zasady'], ['Amator', 'gra rekreacyjnie'],
  ['Klubowicz', 'myśli 2 ruchy naprzód'], ['Zaawansowany', 'rzadko się myli'], ['Ekspert', 'liczy głęboko'],
  ['Mistrz', 'silna gra'], ['Arcymistrz', 'pełna moc']];
const TIMES = [
  { id: 'none', label: 'Bez zegara', base: 0, inc: 0 },
  { id: '3+2', label: 'Błyskawiczne 3 min + 2 s', base: 180e3, inc: 2e3 },
  { id: '5+0', label: 'Błyskawiczne 5 min', base: 300e3, inc: 0 },
  { id: '10+0', label: 'Szybkie 10 min', base: 600e3, inc: 0 },
  { id: '15+10', label: 'Szybkie 15 min + 10 s', base: 900e3, inc: 10e3 },
  { id: '30+0', label: 'Klasyczne 30 min', base: 1800e3, inc: 0 }
];
const THEMES = {
  drewno: ['Drewno', '#f0d9b5', '#b58863'], turniej: ['Turniej', '#ebecd0', '#739552'],
  blekit: ['Błękit', '#dee3e6', '#8ca2ad'], orzech: ['Orzech', '#e9d2ac', '#94643e'],
  grafit: ['Grafit', '#d0d0cc', '#6e767c']
};
const REASONS = {
  checkmate: 'Mat', stalemate: 'Pat — król bez ruchu, ale nie jest szachowany',
  repetition: 'Trzykrotne powtórzenie pozycji', fifty: 'Zasada 50 ruchów',
  material: 'Za mało materiału, by dać mata', time: 'Koniec czasu', resign: 'Poddanie partii',
  agreement: 'Remis za zgodą'
};
const PL = { N: 'S', B: 'G', R: 'W', Q: 'H', K: 'K' };
const plSan = (s) => s.replace(/[NBRQK]/g, (c) => PL[c]);

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* brak miejsca / tryb prywatny */ } }
};
const settings = Object.assign({ theme: 'drewno', sound: true, legal: true, coords: true, animate: true, autoFlip: false,
  last: { mode: 'ai', color: 'w', level: 4, time: 'none' } }, store.get('szachy.ustawienia', {}));
const saveSettings = () => store.set('szachy.ustawienia', settings);
let stats = store.get('szachy.statystyki', {});

/* ---------------- stan gry ---------------- */
const G = {
  pos: new Position(), startFen: E.START_FEN, moves: [], legal: [],
  mode: 'ai', human: WHITE, level: 4, time: TIMES[0],
  clocks: { [WHITE]: 0, [BLACK]: 0 }, started: false, lastTick: 0,
  over: null, recorded: false, view: null, flipped: false,
  thinking: false, aiId: 0, hint: null, active: false
};

const boardEl = $('#board'), squaresEl = $('#squares'), piecesEl = $('#pieces'), arrowsEl = $('#arrows');
let squareEls = new Array(128), pieceEls = new Array(128);

/* ---------------- geometria ---------------- */
const sqXY = (sq) => G.flipped ? [7 - (sq & 7), sq >> 4] : [sq & 7, 7 - (sq >> 4)];
const xyToSq = (x, y) => G.flipped ? y * 16 + (7 - x) : (7 - y) * 16 + x;
function place(el, sq) { const [x, y] = sqXY(sq); el.style.transform = `translate(${x * 100}%, ${y * 100}%)`; }
function eventSq(e) {
  const r = boardEl.getBoundingClientRect();
  const x = Math.floor((e.clientX - r.left) / r.width * 8), y = Math.floor((e.clientY - r.top) / r.height * 8);
  return (x < 0 || x > 7 || y < 0 || y > 7) ? -1 : xyToSq(x, y);
}

function buildSquares() {
  squaresEl.innerHTML = '';
  squareEls = new Array(128);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    const sq = xyToSq(x, y), d = document.createElement('div');
    d.className = 'sq ' + ((((sq >> 4) + (sq & 7)) & 1) ? 'l' : 'd');
    if (y === 7) d.insertAdjacentHTML('beforeend', `<span class="coord f">${'abcdefgh'[sq & 7]}</span>`);
    if (x === 0) d.insertAdjacentHTML('beforeend', `<span class="coord r">${(sq >> 4) + 1}</span>`);
    squaresEl.appendChild(d);
    squareEls[sq] = d;
  }
}

function shownPosition() {
  if (G.view === null) return G.pos;
  return new Position(G.view === 0 ? G.startFen : G.moves[G.view - 1].fen);
}

function renderPieces() {
  const b = shownPosition().board;
  boardEl.classList.add('no-anim');
  piecesEl.innerHTML = '';
  pieceEls = new Array(128);
  for (let sq = 0; sq < 128; sq++) {
    if ((sq & 0x88) || !b[sq]) continue;
    const el = document.createElement('div');
    el.className = 'pc'; el.dataset.p = b[sq]; el.innerHTML = P.svg(b[sq]);
    place(el, sq);
    piecesEl.appendChild(el);
    pieceEls[sq] = el;
  }
  void piecesEl.offsetWidth;
  boardEl.classList.remove('no-anim');
}

/* Bezpiecznik: jeśli animowane bierki rozjadą się z pozycją, rysujemy od nowa. */
function piecesInSync() {
  const b = shownPosition().board;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) continue;
    const el = pieceEls[sq];
    if ((el ? +el.dataset.p : 0) !== b[sq]) return false;
  }
  return true;
}

/* ---------------- podświetlenia ---------------- */
let sel = -1, targets = [], drag = null, promoOpen = false;

function renderHighlights() {
  const pos = shownPosition();
  const ply = G.view === null ? G.moves.length : G.view;
  const last = ply > 0 ? G.moves[ply - 1] : null;
  for (let sq = 0; sq < 128; sq++) {
    const el = squareEls[sq];
    if (!el) continue;
    el.classList.remove('last', 'sel', 'check', 'dot', 'ring', 'over', 'hint');
  }
  if (last) { squareEls[last.from].classList.add('last'); squareEls[last.to].classList.add('last'); }
  if (pos.inCheck()) squareEls[pos.kingSq[pos.turn]].classList.add('check');
  if (sel >= 0) {
    squareEls[sel].classList.add('sel');
    if (settings.legal) for (const m of targets) {
      const to = E.mTo(m);
      squareEls[to].classList.add((pos.board[to] || (E.mFlags(m) & E.F_EP)) ? 'ring' : 'dot');
    }
  }
  drawArrow();
}

function drawArrow() {
  arrowsEl.innerHTML = '';
  if (!G.hint || G.view !== null) return;
  const c = (sq) => { const [x, y] = sqXY(sq); return [x * 100 + 50, y * 100 + 50]; };
  const [x1, y1] = c(G.hint.from), [x2, y2] = c(G.hint.to);
  const len = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  const ex = x2 - ux * 30, ey = y2 - uy * 30;
  arrowsEl.innerHTML = `<defs><marker id="ah" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L4,2 L0,4 Z" fill="rgba(40,140,255,.85)"/></marker></defs>
    <line x1="${x1}" y1="${y1}" x2="${ex}" y2="${ey}" stroke="rgba(40,140,255,.85)" stroke-width="18" stroke-linecap="round" marker-end="url(#ah)"/>`;
}

/* ---------------- gracze, zegary, zbite ---------------- */
const INIT = [0, 8, 2, 2, 2, 1];
function capturedInfo(pos) {
  const cnt = { [WHITE]: [0, 0, 0, 0, 0, 0, 0], [BLACK]: [0, 0, 0, 0, 0, 0, 0] };
  let mat = 0;
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) continue;
    const p = pos.board[sq];
    if (!p) continue;
    const c = p & 24, t = p & 7;
    cnt[c][t]++;
    mat += (c === WHITE ? 1 : -1) * E.VAL[t];
  }
  return { cnt, mat };
}
function fmtClock(ms) {
  ms = Math.max(0, ms);
  if (ms < 10e3) return `0:0${Math.floor(ms / 1000)}.${Math.floor(ms % 1000 / 100)}`;
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
function playerName(color) {
  if (G.mode === 'puzzle') return color === G.human ? 'Ty' : 'Obrona';
  if (G.mode === 'pvp') return color === WHITE ? 'Białe' : 'Czarne';
  return color === G.human ? 'Ty' : `Komputer · ${LEVELS[G.level][0]}`;
}
function renderPlayers() {
  const pos = shownPosition(), { cnt, mat } = capturedInfo(pos);
  const bottom = G.flipped ? BLACK : WHITE;
  for (const [id, color] of [['#pBottom', bottom], ['#pTop', bottom ^ 24]]) {
    const root = $(id), opp = color ^ 24;
    root.querySelector('.avatar').className = 'avatar ' + (color === WHITE ? 'w' : 'b');
    root.querySelector('.avatar').innerHTML = P.svg(color | (G.mode === 'ai' && color !== G.human ? E.KNIGHT : E.KING));
    root.querySelector('.pname').textContent = playerName(color);
    let cap = '';
    if (G.mode !== 'puzzle') for (const t of [1, 2, 3, 4, 5]) for (let i = cnt[opp][t]; i < INIT[t]; i++) cap += P.svg(opp | t);
    const adv = color === WHITE ? mat : -mat;
    root.querySelector('.pcap').innerHTML = cap + (adv > 0 ? `<span class="adv">+${Math.round(adv / 100)}</span>` : '');
    root.classList.toggle('on', !G.over && !(G.mode === 'puzzle' && G.pz.done) && G.view === null && pos.turn === color);
    const clk = root.querySelector('.clock');
    clk.classList.toggle('hidden', !G.time.base);
    clk.textContent = fmtClock(G.clocks[color]);
    clk.classList.toggle('active', !G.over && G.started && G.pos.turn === color);
    clk.classList.toggle('low', G.clocks[color] < 20e3);
  }
}
function renderClocks() {
  if (!G.time.base) return;
  const bottom = G.flipped ? BLACK : WHITE;
  for (const [id, color] of [['#pBottom', bottom], ['#pTop', bottom ^ 24]]) {
    const clk = $(id).querySelector('.clock');
    clk.textContent = fmtClock(G.clocks[color]);
    clk.classList.toggle('low', G.clocks[color] < 20e3);
  }
}

/* ---------------- status i lista ruchów ---------------- */
function resultText() {
  const o = G.over;
  if (o.result === '1/2-1/2') return 'Remis';
  const winner = o.result === '1-0' ? WHITE : BLACK;
  if (G.mode === 'ai') return winner === G.human ? 'Wygrałeś!' : 'Przegrałeś';
  return winner === WHITE ? 'Wygrywają białe' : 'Wygrywają czarne';
}
function renderStatus() {
  const st = $('#status'), pos = G.pos;
  st.classList.remove('good', 'bad');
  if (G.mode === 'puzzle') { renderPuzzleStatus(st); return; }
  if (G.over) st.innerHTML = `${resultText()}<small>${REASONS[G.over.reason] || ''} · ${G.over.result.replace('1/2', '½').replace('1/2', '½')}</small>`;
  else if (G.thinking) st.innerHTML = '<span class="think"></span>Komputer myśli…';
  else {
    const who = G.mode === 'ai' ? (pos.turn === G.human ? 'Twój ruch' : 'Ruch komputera') : (pos.turn === WHITE ? 'Ruch białych' : 'Ruch czarnych');
    st.innerHTML = pos.inCheck() ? `Szach! <small>${who}</small>` : who;
  }
  const name = G.startFen === E.START_FEN ? E.openingName(G.moves.slice(0, G.view ?? G.moves.length).map((m) => m.uci)) : null;
  $('#opening').textContent = name || '';
  $('#btnUndo').disabled = !G.moves.length || (G.mode === 'ai' && G.moves.length < 2 && G.human === BLACK);
  $('#btnHint').disabled = !!G.over || G.thinking || (G.mode === 'ai' && pos.turn !== G.human);
  $('#btnDraw').disabled = !!G.over || G.moves.length < 2 || G.thinking;
  $('#btnResign').disabled = !!G.over || !G.moves.length;
}
function renderMoves() {
  const box = $('#moves');
  if (!G.moves.length) { box.innerHTML = '<div class="empty">Partia jeszcze się nie zaczęła.</div>'; return; }
  const blackFirst = new Position(G.startFen).turn === BLACK;
  const startNo = new Position(G.startFen).full;
  const cur = G.view === null ? G.moves.length : G.view;
  let html = '', i = 0, no = startNo;
  if (blackFirst) { html += `<div class="mrow"><span class="mnum">${no}.</span><span class="mv">…</span>${cell(0)}</div>`; i = 1; no++; }
  function cell(k) { return k < G.moves.length ? `<span class="mv${k + 1 === cur ? ' cur' : ''}" data-ply="${k + 1}">${plSan(G.moves[k].san)}</span>` : '<span></span>'; }
  for (; i < G.moves.length; i += 2, no++) html += `<div class="mrow"><span class="mnum">${no}.</span>${cell(i)}${cell(i + 1)}</div>`;
  box.innerHTML = html;
  const c = box.querySelector('.mv.cur');
  if (c) { const top = c.offsetTop - box.clientHeight / 2; box.scrollTop = Math.max(0, top); }
}

function renderAll(full) {
  if (full || !piecesInSync()) renderPieces();
  renderHighlights();
  renderPlayers();
  renderStatus();
  renderMoves();
  $('#reviewBanner').classList.toggle('hidden', G.view === null);
  document.body.classList.toggle('pz-mode', G.mode === 'puzzle');
  $('#puzzleCard').classList.toggle('hidden', G.mode !== 'puzzle');
  if (G.mode === 'puzzle') renderPuzzleCard();
  boardEl.classList.toggle('no-coords', !settings.coords);
  const th = THEMES[settings.theme] || THEMES.drewno;
  document.documentElement.style.setProperty('--light', th[1]);
  document.documentElement.style.setProperty('--dark', th[2]);
}

/* ---------------- dźwięk ---------------- */
let actx = null, noiseBuf = null;
function ensureAudio() {
  if (!settings.sound) return;
  try {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      noiseBuf = actx.createBuffer(1, actx.sampleRate * 0.08, actx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    } else if (actx.state === 'suspended') actx.resume();
  } catch { actx = null; }
}
function knock(vol, freq, delay = 0) {
  const t = actx.currentTime + delay, src = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
  src.buffer = noiseBuf; f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.4; g.gain.value = vol;
  src.connect(f).connect(g).connect(actx.destination); src.start(t);
}
function tone(freq, dur, vol, delay = 0, type = 'sine') {
  const t = actx.currentTime + delay, o = actx.createOscillator(), g = actx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(actx.destination); o.start(t); o.stop(t + dur + 0.05);
}
function sound(kind) {
  if (!settings.sound || !actx) return;
  try {
    if (kind === 'move') { knock(1.4, 1500); tone(170, 0.07, 0.12); }
    else if (kind === 'capture') { knock(1.8, 1100); knock(1.1, 800, 0.045); tone(130, 0.09, 0.15); }
    else if (kind === 'check') { knock(1.2, 1500); tone(880, 0.18, 0.08, 0.02, 'triangle'); }
    else if (kind === 'end') { [523, 659, 784].forEach((f, i) => tone(f, 0.5, 0.09, i * 0.12, 'triangle')); }
    else if (kind === 'start') { tone(660, 0.12, 0.07, 0, 'triangle'); tone(880, 0.16, 0.07, 0.1, 'triangle'); }
  } catch { /* dźwięk nie jest krytyczny */ }
}

/* ---------------- wykonywanie ruchów ---------------- */
function animateMove(m) {
  const pos = G.pos, from = E.mFrom(m), to = E.mTo(m), fl = E.mFlags(m);
  const el = pieceEls[from];
  if (!el) return;
  const capSq = (fl & E.F_EP) ? (pos.turn === WHITE ? to - 16 : to + 16) : to;
  const capEl = pieceEls[capSq];
  if (capEl) { capEl.classList.add('gone'); setTimeout(() => capEl.remove(), 220); pieceEls[capSq] = null; }
  place(el, to); pieceEls[from] = null; pieceEls[to] = el;
  if (fl & E.F_CASTLE) {
    const [rf, rt] = to > from ? [from + 3, from + 1] : [from - 4, from - 1];
    const r = pieceEls[rf];
    if (r) { place(r, rt); pieceEls[rf] = null; pieceEls[rt] = r; }
  }
  if (fl & E.F_PROMO) {
    const code = pos.turn | E.mPromo(m);
    el.dataset.p = code;
    setTimeout(() => { el.innerHTML = P.svg(code); }, 150);
  }
}

function commitMove(m) {
  const pos = G.pos, mover = pos.turn;
  const san = pos.san(m), fl = E.mFlags(m);
  G.hint = null;
  sel = -1; targets = [];
  if (settings.animate && G.view === null) animateMove(m);
  pos.make(m);
  G.moves.push({ uci: E.toUci(m), san, from: E.mFrom(m), to: E.mTo(m), fen: pos.fen() });
  G.legal = pos.legalMoves();
  if (G.time.base) {
    if (G.started) G.clocks[mover] += G.time.inc;
    G.started = true; G.lastTick = performance.now();
  }
  const st = G.mode === 'puzzle' ? null : pos.status();
  sound(pos.inCheck() ? 'check' : (fl & E.F_CAP) ? 'capture' : 'move');
  if (st) endGame(st.result, st.reason);
  if (G.mode === 'puzzle') { if (!settings.animate) renderPieces(); puzzleAfterMove(); return; }
  if (!settings.animate) renderPieces();
  renderAll(false);
  if (G.mode === 'pvp' && settings.autoFlip && !G.over) {
    setTimeout(() => { const want = G.pos.turn === BLACK; if (G.flipped !== want) { G.flipped = want; buildSquares(); renderAll(true); } }, 350);
  }
  save();
  maybeAI();
}

function tryMove(from, to) {
  const cands = G.legal.filter((m) => E.mFrom(m) === from && E.mTo(m) === to);
  if (!cands.length) return false;
  if (cands.length > 1) { showPromo(from, to, cands); return true; }
  commitMove(cands[0]);
  return true;
}

function showPromo(from, to, cands) {
  promoOpen = true;
  const box = $('#promo'), color = G.pos.turn;
  const [x, y] = sqXY(to);
  const down = y === 0;
  box.innerHTML = '';
  [E.QUEEN, E.KNIGHT, E.ROOK, E.BISHOP].forEach((t, i) => {
    const b = document.createElement('button');
    b.className = 'opt';
    b.style.left = `${x * 12.5}%`;
    b.style.top = `${(down ? y + i : y - i) * 12.5}%`;
    b.innerHTML = P.svg(color | t);
    b.setAttribute('aria-label', ['Hetman', 'Skoczek', 'Wieża', 'Goniec'][i]);
    b.onclick = (e) => { e.stopPropagation(); closePromo(); commitMove(cands.find((m) => E.mPromo(m) === t)); };
    box.appendChild(b);
  });
  box.onclick = () => { closePromo(); renderAll(true); };
  box.classList.remove('hidden');
}
function closePromo() { promoOpen = false; $('#promo').classList.add('hidden'); }

/* ---------------- wejście: dotknięcie i przeciąganie ---------------- */
function canInteract() {
  if (G.mode === 'puzzle') return G.view === null && !promoOpen && !G.pz.done && !G.pz.busy && !G.pz.auto && G.pos.turn === G.human;
  return G.active && !G.over && G.view === null && !G.thinking && !promoOpen &&
    (G.mode === 'pvp' || G.pos.turn === G.human);
}
function select(sq) { sel = sq; targets = G.legal.filter((m) => E.mFrom(m) === sq); renderHighlights(); }
function clearSel() { sel = -1; targets = []; renderHighlights(); }

boardEl.addEventListener('pointerdown', (e) => {
  if (e.button > 0) return;
  ensureAudio();
  if (promoOpen) return;
  if (G.view !== null) return;
  if (!canInteract()) return;
  const sq = eventSq(e);
  if (sq < 0) return;
  if (sel >= 0 && targets.some((m) => E.mTo(m) === sq)) { tryMove(sel, sq); return; }
  const p = G.pos.board[sq];
  if (p && (p & G.pos.turn)) {
    const wasSel = sel === sq;
    select(sq);
    const el = pieceEls[sq];
    if (el) {
      drag = { sq, el, x0: e.clientX, y0: e.clientY, moved: false, wasSel, over: -1 };
      try { boardEl.setPointerCapture(e.pointerId); } catch { /* starsze przeglądarki */ }
    }
    e.preventDefault();
  } else clearSel();
});
boardEl.addEventListener('pointermove', (e) => {
  if (!drag) return;
  if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < 5) return;
  drag.moved = true;
  drag.el.classList.add('dragging');
  const r = boardEl.getBoundingClientRect(), s = r.width / 8;
  drag.el.style.transform = `translate(${e.clientX - r.left - s / 2}px, ${e.clientY - r.top - s / 2}px)`;
  const sq = eventSq(e);
  if (sq !== drag.over) {
    if (drag.over >= 0) squareEls[drag.over].classList.remove('over');
    drag.over = sq;
    if (sq >= 0 && targets.some((m) => E.mTo(m) === sq)) squareEls[sq].classList.add('over');
  }
});
function endDrag(e, cancel) {
  if (!drag) return;
  const d = drag; drag = null;
  d.el.classList.remove('dragging');
  if (d.over >= 0) squareEls[d.over].classList.remove('over');
  if (d.moved) {
    const sq = cancel ? -1 : eventSq(e);
    if (sq >= 0 && sq !== d.sq && targets.some((m) => E.mTo(m) === sq)) tryMove(d.sq, sq);
    else place(d.el, d.sq);
  } else if (d.wasSel) clearSel();
}
boardEl.addEventListener('pointerup', (e) => endDrag(e, false));
boardEl.addEventListener('pointercancel', (e) => endDrag(e, true));
boardEl.addEventListener('contextmenu', (e) => e.preventDefault());

/* ---------------- komputer (Web Worker) ---------------- */
let worker = null, workerBroken = false;
function getWorker() {
  if (worker || workerBroken) return worker;
  try {
    worker = new Worker('js/ai-worker.js?v=1.1.0');
    worker.onmessage = (e) => onEngine(e.data);
    worker.onerror = () => { workerBroken = true; worker = null; };
  } catch { workerBroken = true; worker = null; }
  return worker;
}
function askEngine(kind, level) {
  const id = ++G.aiId;
  const msg = { id, kind, level, startFen: G.startFen, moves: G.moves.map((m) => m.uci) };
  const w = getWorker();
  if (w) w.postMessage(msg);
  else setTimeout(() => onEngine(Object.assign({ id, kind }, E.runRequest(msg))), 30);
  return id;
}
let aiStarted = 0;
function maybeAI() {
  if (G.mode !== 'ai' || G.over || G.view !== null || G.pos.turn === G.human || !G.active) return;
  G.thinking = true;
  aiStarted = performance.now();
  renderStatus();
  askEngine('move', G.level);
}
let pendingDraw = null;
function onEngine(r) {
  if (r.id !== G.aiId) return;
  if (r.kind === 'move') {
    const wait = Math.max(0, 380 - (performance.now() - aiStarted));
    setTimeout(() => {
      if (r.id !== G.aiId || G.over) return;
      G.thinking = false;
      const m = r.uci && G.pos.moveFromUci(r.uci);
      if (m) commitMove(m); else renderAll(false);
    }, wait);
  } else if (r.kind === 'hint') {
    $('#btnHint').disabled = false;
    const m = r.uci && G.pos.moveFromUci(r.uci);
    if (m) { G.hint = { from: E.mFrom(m), to: E.mTo(m) }; drawArrow(); toast('Podpowiedź: ' + plSan(G.pos.san(m))); }
  } else if (r.kind === 'eval' && pendingDraw) {
    pendingDraw = null;
    // wynik z perspektywy człowieka (to jego ruch); komputer zgadza się, gdy sam nie stoi lepiej
    if (r.score >= -40) { toast('Komputer przyjmuje remis'); endGame('1/2-1/2', 'agreement'); }
    else toast('Komputer odrzuca remis — gra dalej');
  }
}

/* ---------------- koniec gry, zegar ---------------- */
function endGame(result, reason) {
  if (G.over) return;
  G.over = { result, reason };
  G.thinking = false; G.aiId++;
  sound('end');
  if (G.mode === 'ai' && !G.recorded) {
    G.recorded = true;
    const s = stats[G.level] || (stats[G.level] = { w: 0, d: 0, l: 0 });
    if (result === '1/2-1/2') s.d++;
    else if ((result === '1-0') === (G.human === WHITE)) s.w++;
    else s.l++;
    store.set('szachy.statystyki', stats);
  }
  renderAll(false);
  save();
  setTimeout(() => {
    if (!G.over) return;
    $('#overTitle').textContent = resultText();
    $('#overReason').textContent = (REASONS[reason] || '') + ' · ' + G.moves.length + ' półruchów';
    $('#overRematch').textContent = G.mode === 'ai' ? 'Rewanż (zmiana kolorów)' : 'Rewanż';
    openDlg('#dlgOver');
  }, 650);
}

setInterval(() => {
  if (!G.time.base || G.over || !G.started || !G.active) return;
  const t = performance.now(), side = G.pos.turn;
  G.clocks[side] -= t - G.lastTick;
  G.lastTick = t;
  if (G.clocks[side] <= 0) {
    G.clocks[side] = 0;
    const winner = side ^ 24;
    endGame(G.pos.hasMatingMaterial(winner) ? (winner === WHITE ? '1-0' : '0-1') : '1/2-1/2', 'time');
  }
  renderClocks();
}, 100);

/* ---------------- nowa gra, cofanie, przegląd ---------------- */
function startGame(opts) {
  G.mode = opts.mode;
  G.human = opts.color === 'r' ? (Math.random() < 0.5 ? WHITE : BLACK) : opts.color === 'b' ? BLACK : WHITE;
  G.level = +opts.level;
  G.time = TIMES.find((t) => t.id === opts.time) || TIMES[0];
  G.startFen = E.START_FEN;
  G.pos = new Position(G.startFen);
  G.moves = []; G.legal = G.pos.legalMoves();
  G.clocks = { [WHITE]: G.time.base, [BLACK]: G.time.base };
  G.started = false; G.over = null; G.recorded = false; G.view = null; G.hint = null;
  G.thinking = false; G.aiId++; G.active = true;
  G.flipped = G.mode === 'ai' && G.human === BLACK;
  sel = -1; targets = []; closePromo();
  buildSquares(); renderAll(true); save();
  ensureAudio(); sound('start');
  maybeAI();
}

function rebuild() {
  G.pos = new Position(G.startFen);
  for (const m of G.moves) G.pos.play(m.uci);
  G.legal = G.pos.legalMoves();
}

function undo() {
  if (!G.moves.length || promoOpen || G.mode === 'puzzle') return;
  // z komputerem: cofamy jego odpowiedź i Twój ruch (gdy komputer jeszcze myśli — tylko Twój ruch)
  let n = G.mode === 'ai' && !G.thinking && G.pos.turn === G.human ? 2 : 1;
  n = Math.min(n, G.moves.length);
  G.aiId++; G.thinking = false; G.over = null; G.hint = null; G.view = null;
  G.moves.splice(G.moves.length - n, n);
  rebuild();
  sel = -1; targets = [];
  renderAll(true); save();
  maybeAI();
}

function setView(k) {
  if (!G.moves.length) return;
  k = Math.max(0, Math.min(k, G.moves.length));
  G.view = k === G.moves.length ? null : k;
  sel = -1; targets = []; closePromo();
  renderAll(true);
  if (G.view === null) maybeAI();
}
const curPly = () => G.view === null ? G.moves.length : G.view;

/* ---------------- zapis ---------------- */
function save() {
  if (G.mode === 'puzzle') return; // zadania nie nadpisują zapisanej partii
  store.set('szachy.gra', {
    startFen: G.startFen, moves: G.moves.map((m) => m.uci), mode: G.mode, human: G.human, level: G.level,
    time: G.time.id, clocks: [G.clocks[WHITE], G.clocks[BLACK]], started: G.started, over: G.over,
    recorded: G.recorded, flipped: G.flipped
  });
}
function restore() {
  const s = store.get('szachy.gra', null);
  if (!s || !s.moves) return false;
  try {
    G.mode = s.mode; G.human = s.human; G.level = s.level;
    G.time = TIMES.find((t) => t.id === s.time) || TIMES[0];
    G.startFen = s.startFen || E.START_FEN;
    G.pos = new Position(G.startFen);
    G.moves = [];
    for (const u of s.moves) {
      const m = G.pos.moveFromUci(u);
      if (!m) break;
      const san = G.pos.san(m);
      G.pos.make(m);
      G.moves.push({ uci: u, san, from: E.mFrom(m), to: E.mTo(m), fen: G.pos.fen() });
    }
    G.legal = G.pos.legalMoves();
    G.clocks = { [WHITE]: s.clocks[0], [BLACK]: s.clocks[1] };
    G.started = s.started; G.lastTick = performance.now();
    G.over = s.over; G.recorded = s.recorded; G.flipped = !!s.flipped;
    G.view = null; G.active = true;
    return true;
  } catch { return false; }
}

/* ---------------- PGN / FEN ---------------- */
function pgn() {
  const d = new Date(), date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
  const nm = (c) => G.mode === 'pvp' ? (c === WHITE ? 'Białe' : 'Czarne') : (c === G.human ? 'Gracz' : `Komputer (${LEVELS[G.level][0]})`);
  const res = G.over ? G.over.result : '*';
  let h = `[Event "Partia towarzyska"]\n[Site "beagleapps.pl"]\n[Date "${date}"]\n[White "${nm(WHITE)}"]\n[Black "${nm(BLACK)}"]\n[Result "${res}"]\n`;
  if (G.startFen !== E.START_FEN) h += `[SetUp "1"]\n[FEN "${G.startFen}"]\n`;
  const p0 = new Position(G.startFen);
  let no = p0.full, black = p0.turn === BLACK, out = [];
  G.moves.forEach((m, i) => {
    if (!black) out.push(`${no}.`); else if (i === 0) out.push(`${no}...`);
    out.push(m.san);
    if (black) no++;
    black = !black;
  });
  out.push(res);
  let text = '', line = '';
  for (const w of out) { if ((line + ' ' + w).trim().length > 78) { text += line.trim() + '\n'; line = ''; } line += ' ' + w; }
  return h + '\n' + text + line.trim() + '\n';
}
async function copyText(text, title) {
  try { await navigator.clipboard.writeText(text); toast('Skopiowano do schowka'); }
  catch { $('#textTitle').textContent = title; $('#textArea').value = text; openDlg('#dlgText'); $('#textArea').select(); }
}

/* ---------------- dialogi ---------------- */
function openDlg(id) { const d = $(id); if (!d.open) d.showModal(); }
document.querySelectorAll('dialog').forEach((d) => {
  d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  d.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => d.close()));
});
let toastT = 0;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2200); }
function confirmBox(title, text, yes) {
  $('#confTitle').textContent = title; $('#confText').textContent = text;
  $('#confYes').onclick = () => { $('#dlgConfirm').close(); yes(); };
  $('#confNo').onclick = () => $('#dlgConfirm').close();
  openDlg('#dlgConfirm');
}

// nowa gra
const tcSel = $('#tc');
TIMES.forEach((t) => tcSel.insertAdjacentHTML('beforeend', `<option value="${t.id}">${t.label}</option>`));
function syncNewForm() {
  const f = $('#formNew'), ai = f.mode.value === 'ai';
  document.querySelectorAll('.ai-only').forEach((el) => el.classList.toggle('hidden', !ai));
  const l = +f.level.value;
  $('#lvlName').textContent = `${l}. ${LEVELS[l][0]}`;
  $('#lvlDesc').textContent = LEVELS[l][1];
}
function openNew() {
  const f = $('#formNew'), L = settings.last;
  f.mode.value = L.mode; f.color.value = L.color; f.level.value = L.level; f.time.value = L.time;
  syncNewForm();
  openDlg('#dlgNew');
}
$('#formNew').addEventListener('input', syncNewForm);
$('#formNew').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = e.target;
  settings.last = { mode: f.mode.value, color: f.color.value, level: +f.level.value, time: f.time.value };
  saveSettings();
  $('#dlgNew').close();
  startGame(settings.last);
});
$('#newCancel').onclick = () => $('#dlgNew').close();
$('#btnNew').onclick = openNew;

// przyciski akcji
$('#btnUndo').onclick = undo;
$('#btnFlip').onclick = () => { G.flipped = !G.flipped; buildSquares(); renderAll(true); };
$('#btnHint').onclick = () => {
  if (G.mode === 'puzzle') return puzzleHint();
  if (!canInteract()) return;
  $('#btnHint').disabled = true;
  toast('Szukam najlepszego ruchu…');
  askEngine('hint', 7);
};
$('#btnResign').onclick = () => {
  if (G.over || !G.moves.length) return;
  const loser = G.mode === 'ai' ? G.human : G.pos.turn;
  confirmBox('Poddać partię?', G.mode === 'ai' ? 'Partia zostanie zapisana jako porażka.' : `Poddają się ${loser === WHITE ? 'białe' : 'czarne'}.`,
    () => endGame(loser === WHITE ? '0-1' : '1-0', 'resign'));
};
$('#btnDraw').onclick = () => {
  if (G.over) return;
  if (G.mode === 'pvp') return confirmBox('Remis?', 'Obaj gracze zgadzają się na remis?', () => endGame('1/2-1/2', 'agreement'));
  if (G.pos.turn !== G.human || G.thinking) return;
  pendingDraw = true;
  toast('Komputer zastanawia się nad remisem…');
  askEngine('eval');
};
$('#overReview').onclick = () => $('#dlgOver').close();
$('#overPgn').onclick = () => copyText(pgn(), 'Zapis partii (PGN)');
$('#overRematch').onclick = () => {
  $('#dlgOver').close();
  const L = Object.assign({}, settings.last, { mode: G.mode, level: G.level, time: G.time.id });
  if (G.mode === 'ai') L.color = G.human === WHITE ? 'b' : 'w';
  startGame(L);
};

// przegląd partii
$('#moves').addEventListener('click', (e) => { const t = e.target.closest('[data-ply]'); if (t) setView(+t.dataset.ply); });
$('#navFirst').onclick = () => setView(0);
$('#navPrev').onclick = () => setView(curPly() - 1);
$('#navNext').onclick = () => setView(curPly() + 1);
$('#navLast').onclick = () => setView(G.moves.length);
$('#reviewBanner').onclick = () => setView(G.moves.length);
document.addEventListener('keydown', (e) => {
  if (document.querySelector('dialog[open]') || e.target.closest('input,select,textarea')) return;
  if (e.key === 'ArrowLeft') { setView(curPly() - 1); e.preventDefault(); }
  else if (e.key === 'ArrowRight') { setView(curPly() + 1); e.preventDefault(); }
  else if (e.key === 'Home') setView(0);
  else if (e.key === 'End') setView(G.moves.length);
  else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { undo(); e.preventDefault(); }
  else if (e.key.toLowerCase() === 'h' && !e.ctrlKey) $('#btnHint').click();
  else if (e.key.toLowerCase() === 'f' && !e.ctrlKey) $('#btnFlip').click();
  else if (e.key === 'Escape') { clearSel(); if (promoOpen) { closePromo(); renderAll(true); } }
});

// menu
const menu = $('#menu');
$('#btnMenu').onclick = (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); };
document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
menu.addEventListener('click', (e) => {
  const act = e.target.closest('[data-act]')?.dataset.act;
  menu.classList.add('hidden');
  if (act === 'stats') { renderStats(); openDlg('#dlgStats'); }
  else if (act === 'settings') { renderSettings(); openDlg('#dlgSettings'); }
  else if (act === 'pgn') copyText(pgn(), 'Zapis partii (PGN)');
  else if (act === 'fen') copyText(shownPosition().fen(), 'Pozycja (FEN)');
  else if (act === 'help') openDlg('#dlgHelp');
});

function renderStats() {
  let html = '', tw = 0, td = 0, tl = 0;
  for (let l = 1; l <= 8; l++) {
    const s = stats[l] || { w: 0, d: 0, l: 0 };
    tw += s.w; td += s.d; tl += s.l;
    html += `<tr><td>${l}. ${LEVELS[l][0]}</td><td class="w">${s.w}</td><td>${s.d}</td><td class="l">${s.l}</td></tr>`;
  }
  html += `<tr><td><b>Razem</b></td><td class="w"><b>${tw}</b></td><td><b>${td}</b></td><td class="l"><b>${tl}</b></td></tr>`;
  $('#statsBody').innerHTML = html;
}
$('#statsReset').onclick = () => confirmBox('Wyzerować statystyki?', 'Tego nie da się cofnąć.', () => {
  stats = {}; store.set('szachy.statystyki', stats); renderStats(); openDlg('#dlgStats');
});

function renderSettings() {
  $('#themes').innerHTML = Object.entries(THEMES).map(([k, [name, l, d]]) =>
    `<div><button class="theme${settings.theme === k ? ' on' : ''}" data-theme="${k}" aria-label="${name}"><i style="background:${l}"></i><i style="background:${d}"></i><i style="background:${d}"></i><i style="background:${l}"></i></button><div class="theme-name">${name}</div></div>`).join('');
  document.querySelectorAll('[data-set]').forEach((c) => { c.checked = !!settings[c.dataset.set]; });
}
$('#themes').addEventListener('click', (e) => {
  const b = e.target.closest('[data-theme]');
  if (!b) return;
  settings.theme = b.dataset.theme; saveSettings(); renderSettings(); renderAll(false);
});
document.querySelectorAll('[data-set]').forEach((c) => c.addEventListener('change', () => {
  settings[c.dataset.set] = c.checked; saveSettings();
  if (c.dataset.set === 'sound' && c.checked) ensureAudio();
  renderAll(false);
}));

/* ---------------- zadania szachowe ---------------- */
const PUZZLES = (window.ZADANIA || []);
const PZ = Object.assign({ rating: 1000, solved: {}, tried: {}, streak: 0, best: 0, dailyLast: '', dailyDays: 0, cat: 0 },
  store.get('szachy.zadania', {}));
const savePZ = () => store.set('szachy.zadania', PZ);
const ruchy = (n) => n === 1 ? 'ruchu' : 'ruchach';

function dayKey(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function dailyPuzzle() {
  const pool = PUZZLES.filter((p) => p.n >= 2);
  if (!pool.length) return null;
  const d = new Date(), day = Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5);
  return pool[(day * 7919) % pool.length];
}
function pickPuzzle(cat) {
  let pool = PUZZLES.filter((p) => !cat || p.n === cat);
  const fresh = pool.filter((p) => !PZ.solved[p.id] && (!G.pz || p.id !== G.pz.p.id));
  if (fresh.length) pool = fresh;
  pool = pool.slice().sort((a, b) => Math.abs(a.r - PZ.rating) - Math.abs(b.r - PZ.rating));
  return pool[Math.random() * Math.min(5, pool.length) | 0];
}

function startPuzzle(p, daily) {
  if (!p) { toast('Brak zadań'); return; }
  G.mode = 'puzzle';
  G.startFen = p.fen;
  G.pos = new Position(p.fen);
  G.moves = []; G.legal = G.pos.legalMoves();
  G.human = G.pos.turn;
  G.time = TIMES[0]; G.clocks = { [WHITE]: 0, [BLACK]: 0 }; G.started = false;
  G.over = null; G.view = null; G.hint = null; G.thinking = false; G.aiId++; G.active = true;
  G.flipped = G.human === BLACK;
  G.pz = { p, line: p.line.split(' '), step: 0, k: p.n, lineValid: true, mistakes: false, helped: false,
    done: false, busy: false, daily: !!daily, msg: '', tone: '', hintLevel: 0, scored: false };
  sel = -1; targets = []; closePromo();
  ensureAudio();
  buildSquares(); renderAll(true);
}

function scorePuzzle(clean) {
  const pz = G.pz;
  if (pz.scored) return;
  pz.scored = true;
  const expct = 1 / (1 + Math.pow(10, (pz.p.r - PZ.rating) / 400));
  const delta = Math.round(32 * ((clean ? 1 : 0) - expct));
  PZ.rating = Math.max(100, PZ.rating + delta);
  pz.delta = delta;
  PZ.tried[pz.p.id] = 1;
  if (clean) { PZ.solved[pz.p.id] = 1; PZ.streak++; PZ.best = Math.max(PZ.best, PZ.streak); }
  else PZ.streak = 0;
  savePZ();
}
function markDaily() {
  const pz = G.pz;
  if (!pz.daily) return;
  const today = dayKey(), y = new Date(); y.setDate(y.getDate() - 1);
  if (PZ.dailyLast === today) return;
  PZ.dailyDays = PZ.dailyLast === dayKey(y) ? PZ.dailyDays + 1 : 1;
  PZ.dailyLast = today;
  savePZ();
}

/* Następny ruch atakującego zgodny z rozwiązaniem (z zapisanej linii albo policzony dokładnie). */
function solutionMove() {
  const pz = G.pz;
  if (pz.lineValid && pz.line[pz.step]) return G.pos.moveFromUci(pz.line[pz.step]);
  return E.mateMoves(G.pos, pz.k)[0] || 0;
}
function defenceMove() {
  const pz = G.pz;
  if (pz.lineValid && pz.line[pz.step]) return G.pos.moveFromUci(pz.line[pz.step]);
  return E.toughestReply(G.pos, pz.k + 1);
}

function puzzleAfterMove() {
  const pz = G.pz, pos = G.pos, last = G.moves[G.moves.length - 1];
  const moverHuman = pos.turn !== G.human;
  if (!moverHuman) { // odpowiedź obrony
    if (pz.lineValid && pz.line[pz.step] !== last.uci) pz.lineValid = false;
    pz.step++;
    pz.busy = false;
    if (pz.auto) setTimeout(autoStep, 650);
    renderAll(false);
    return;
  }
  const mated = pos.inCheck() && !G.legal.length;
  let ok = pz.lineValid && last.uci === pz.line[pz.step];
  if (!ok) {
    if (pz.k === 1) ok = mated;
    else if (pz.k === 2) ok = E.defenderLoses(pos, 2);
    if (ok) pz.lineValid = false;
  }
  if (!ok) {
    pz.mistakes = true; pz.busy = true;
    pz.msg = 'To nie ten ruch — spróbuj jeszcze raz'; pz.tone = 'bad';
    scorePuzzle(false);
    renderAll(false);
    setTimeout(() => {
      if (G.mode !== 'puzzle' || G.pz !== pz) return;
      G.moves.pop(); rebuild(); pz.busy = false; renderAll(true);
    }, 750);
    return;
  }
  pz.hintLevel = 0;
  if (mated) {
    pz.done = true;
    const clean = !pz.mistakes && !pz.helped;
    scorePuzzle(clean);
    markDaily();
    pz.msg = pz.auto ? 'Tak wyglądało rozwiązanie' : clean ? 'Rozwiązane! Brawo' : 'Rozwiązane';
    pz.tone = 'good';
    setTimeout(() => sound('end'), 150);
    renderAll(false);
    return;
  }
  pz.msg = pz.auto ? '' : 'Dobrze! Grasz dalej…'; pz.tone = pz.auto ? '' : 'good';
  pz.step++;
  pz.k--;
  pz.busy = true;
  renderAll(false);
  setTimeout(() => {
    if (G.mode !== 'puzzle' || G.pz !== pz) return;
    const r = defenceMove();
    if (r) commitMove(r);
  }, 550);
}

function puzzleHint() {
  const pz = G.pz;
  if (!pz || pz.done || pz.busy || G.pos.turn !== G.human) return;
  const m = solutionMove();
  if (!m) return;
  pz.helped = true;
  scorePuzzle(false);
  pz.hintLevel++;
  if (pz.hintLevel === 1) {
    G.hint = null; select(E.mFrom(m));
    pz.msg = 'Podpowiedź: rusz zaznaczoną bierką'; pz.tone = '';
  } else {
    G.hint = { from: E.mFrom(m), to: E.mTo(m) };
    pz.msg = 'Podpowiedź: ' + plSan(G.pos.san(m)); pz.tone = '';
  }
  renderAll(false);
}
function autoStep() {
  const pz = G.pz;
  if (G.mode !== 'puzzle' || !pz || pz.done || pz.busy || G.pos.turn !== G.human) return;
  const m = solutionMove();
  if (m) commitMove(m);
}
function puzzleSolution() {
  const pz = G.pz;
  if (!pz || pz.done) return;
  pz.helped = true; pz.auto = true;
  scorePuzzle(false);
  autoStep();
}

function renderPuzzleStatus(st) {
  const pz = G.pz, n = pz.p.n;
  const side = G.human === WHITE ? 'białe' : 'czarne';
  if (pz.msg) {
    st.innerHTML = `${pz.msg}<small>Mat w ${n} · grają ${side}</small>`;
    if (pz.tone) st.classList.add(pz.tone);
  } else st.innerHTML = `Znajdź mata w ${n} ${ruchy(n)}<small>Grają ${side}${n > 1 ? ' · odpowiedzi obrony wykonają się same' : ''}</small>`;
  $('#opening').textContent = pz.daily ? 'Zadanie dnia' : '';
}
function renderPuzzleCard() {
  const pz = G.pz;
  const total = PUZZLES.length, solved = Object.keys(PZ.solved).length;
  const d = pz.scored && pz.delta !== undefined ? ` <span class="${pz.delta >= 0 ? 'w' : 'l'}">${pz.delta >= 0 ? '+' : ''}${pz.delta}</span>` : '';
  $('#pzMeta').innerHTML = `<span>Trudność <b>${pz.p.r}</b></span><span>Twój ranking <b>${PZ.rating}</b>${d}</span>` +
    `<span>Seria <b>${PZ.streak}</b></span><span>Rozwiązane <b>${solved}/${total}</b></span>`;
  $('#pzHint').disabled = pz.done || pz.busy;
  $('#pzSolution').disabled = pz.done || pz.busy;
  $('#pzNext').classList.toggle('primary', pz.done);
}

function openPuzzles() {
  const dp = dailyPuzzle();
  const doneToday = PZ.dailyLast === dayKey();
  $('#pzDaily').classList.toggle('done', doneToday);
  $('#pzDailyInfo').textContent = dp ? `Mat w ${dp.n} · trudność ${dp.r}${doneToday ? ' · rozwiązane dziś' : ''}` : '';
  $('#pzDailyGo').textContent = doneToday ? 'Jeszcze raz' : 'Rozwiąż';
  $('#psRating').textContent = PZ.rating;
  $('#psSolved').textContent = Object.keys(PZ.solved).length;
  $('#psStreak').textContent = PZ.streak + (PZ.best > PZ.streak ? ` / ${PZ.best}` : '');
  $('#psDays').textContent = PZ.dailyDays && (PZ.dailyLast === dayKey() || PZ.dailyLast === dayKey(new Date(Date.now() - 864e5))) ? PZ.dailyDays : 0;
  for (let c = 0; c <= 3; c++) {
    const pool = PUZZLES.filter((p) => !c || p.n === c);
    $('#pcc' + c).textContent = `${pool.filter((p) => PZ.solved[p.id]).length}/${pool.length}`;
  }
  $('#pc' + (PZ.cat || 0)).checked = true;
  openDlg('#dlgPuzzles');
}
$('#btnPuzzles').onclick = openPuzzles;
$('#pzDailyGo').onclick = () => { $('#dlgPuzzles').close(); startPuzzle(dailyPuzzle(), true); };
$('#pzStart').onclick = () => {
  PZ.cat = +document.querySelector('input[name=pzcat]:checked').value; savePZ();
  $('#dlgPuzzles').close();
  startPuzzle(pickPuzzle(PZ.cat));
};
$('#pzHint').onclick = puzzleHint;
$('#pzSolution').onclick = puzzleSolution;
$('#pzNext').onclick = () => {
  const pz = G.pz;
  if (pz && !pz.done && !pz.scored && G.moves.length) scorePuzzle(false); // pominięte po rozpoczęciu = nierozwiązane
  startPuzzle(pickPuzzle(PZ.cat));
};
$('#pzExit').onclick = () => {
  G.pz = null;
  if (restore()) { buildSquares(); renderAll(true); maybeAI(); }
  else { G.mode = 'ai'; startGame(settings.last); }
};

/* ---------------- start ---------------- */
if (restore()) {
  buildSquares(); renderAll(true);
  if (G.over) G.recorded = true;
  maybeAI();
} else {
  buildSquares(); renderAll(true);
  openNew();
}
window.addEventListener('resize', () => renderHighlights());
window.__szachy = G; // do testów w przeglądarce
})();
