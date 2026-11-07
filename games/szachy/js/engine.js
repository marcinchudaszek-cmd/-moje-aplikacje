/* Silnik szachowy: zasady, generator ruchów, notacja, ocena pozycji i przeszukiwanie.
   Zwykły skrypt bez modułów — działa w <script>, w Web Workerze (importScripts)
   i w testach Node (vm). Plansza 0x88: pole = rząd*16 + kolumna, a1 = 0, h8 = 119. */
(function (root) {
'use strict';

const WHITE = 8, BLACK = 16;
const PAWN = 1, KNIGHT = 2, BISHOP = 3, ROOK = 4, QUEEN = 5, KING = 6;
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const N_OFF = [-33, -31, -18, -14, 14, 18, 31, 33];
const B_OFF = [-17, -15, 15, 17];
const R_OFF = [-16, -1, 1, 16];
const K_OFF = [-17, -16, -15, -1, 1, 15, 16, 17];

const F_CAP = 1, F_EP = 2, F_CASTLE = 4, F_DOUBLE = 8, F_PROMO = 16;

const encode = (from, to, flags, promo) => from | (to << 7) | (flags << 14) | ((promo || 0) << 19);
const mFrom = m => m & 127;
const mTo = m => (m >> 7) & 127;
const mFlags = m => (m >> 14) & 31;
const mPromo = m => (m >> 19) & 7;

const PIECE_CHARS = ' pnbrqk';

function sqName(sq) { return 'abcdefgh'[sq & 7] + ((sq >> 4) + 1); }
function sqFromName(s) {
  if (!s || s.length < 2) return -1;
  const f = s.charCodeAt(0) - 97, r = s.charCodeAt(1) - 49;
  return (f < 0 || f > 7 || r < 0 || r > 7) ? -1 : r * 16 + f;
}
function toUci(m) {
  const p = mPromo(m);
  return sqName(mFrom(m)) + sqName(mTo(m)) + (p ? PIECE_CHARS[p] : '');
}

/* ---------- Zobrist (deterministyczny generator, żeby hashe były powtarzalne) ---------- */
let seed = 0x2545F491;
function rnd32() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return seed | 0; }
const ZLO = new Int32Array(12 * 128), ZHI = new Int32Array(12 * 128);
for (let i = 0; i < ZLO.length; i++) { ZLO[i] = rnd32(); ZHI[i] = rnd32(); }
const ZC_LO = new Int32Array(16), ZC_HI = new Int32Array(16);
for (let i = 0; i < 16; i++) { ZC_LO[i] = rnd32(); ZC_HI[i] = rnd32(); }
const ZEP_LO = new Int32Array(8), ZEP_HI = new Int32Array(8);
for (let i = 0; i < 8; i++) { ZEP_LO[i] = rnd32(); ZEP_HI[i] = rnd32(); }
const ZS_LO = rnd32(), ZS_HI = rnd32();
const pidx = p => (((p & WHITE) ? 0 : 6) + (p & 7) - 1) * 128;

const CASTLE_MASK = new Int8Array(128).fill(15);
CASTLE_MASK[0] = 13; CASTLE_MASK[4] = 12; CASTLE_MASK[7] = 14;
CASTLE_MASK[112] = 7; CASTLE_MASK[116] = 3; CASTLE_MASK[119] = 11;

/* ======================================================================= */
class Position {
  constructor(fen) {
    this.board = new Int8Array(128);
    this.kingSq = new Int16Array(24);
    this.stack = [];
    this.hist = [];
    this.load(fen || START_FEN);
  }

  load(fen) {
    const parts = String(fen).trim().split(/\s+/);
    if (parts.length < 2) throw new Error('Niepoprawny FEN');
    const b = this.board;
    b.fill(0);
    let r = 7, f = 0, kings = 0;
    for (const ch of parts[0]) {
      if (ch === '/') { r--; f = 0; continue; }
      if (ch >= '1' && ch <= '8') { f += +ch; continue; }
      const lower = ch.toLowerCase();
      const t = PIECE_CHARS.indexOf(lower);
      if (t < 1 || r < 0 || f > 7) throw new Error('Niepoprawny FEN');
      const c = ch === lower ? BLACK : WHITE;
      const sq = r * 16 + f;
      b[sq] = t | c;
      if (t === KING) { this.kingSq[c] = sq; kings++; }
      f++;
    }
    if (kings !== 2) throw new Error('Niepoprawny FEN: brak króla');
    this.turn = parts[1] === 'b' ? BLACK : WHITE;
    const cs = parts[2] || '-';
    let c = 0;
    if (cs.includes('K') && b[4] === (WHITE | KING) && b[7] === (WHITE | ROOK)) c |= 1;
    if (cs.includes('Q') && b[4] === (WHITE | KING) && b[0] === (WHITE | ROOK)) c |= 2;
    if (cs.includes('k') && b[116] === (BLACK | KING) && b[119] === (BLACK | ROOK)) c |= 4;
    if (cs.includes('q') && b[116] === (BLACK | KING) && b[112] === (BLACK | ROOK)) c |= 8;
    this.castling = c;
    this.ep = parts[3] && parts[3] !== '-' ? sqFromName(parts[3]) : -1;
    this.half = parseInt(parts[4], 10) || 0;
    this.full = parseInt(parts[5], 10) || 1;
    this.stack.length = 0;
    this.computeHash();
    this.hist = [this.hlo];
  }

  computeHash() {
    let lo = 0, hi = 0;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) { sq += 7; continue; }
      const p = this.board[sq];
      if (p) { lo ^= ZLO[pidx(p) + sq]; hi ^= ZHI[pidx(p) + sq]; }
    }
    lo ^= ZC_LO[this.castling]; hi ^= ZC_HI[this.castling];
    if (this.ep >= 0) { lo ^= ZEP_LO[this.ep & 7]; hi ^= ZEP_HI[this.ep & 7]; }
    if (this.turn === BLACK) { lo ^= ZS_LO; hi ^= ZS_HI; }
    this.hlo = lo; this.hhi = hi;
    return [lo, hi];
  }

  fen() {
    let s = '';
    for (let r = 7; r >= 0; r--) {
      let empty = 0;
      for (let f = 0; f < 8; f++) {
        const p = this.board[r * 16 + f];
        if (!p) { empty++; continue; }
        if (empty) { s += empty; empty = 0; }
        const ch = PIECE_CHARS[p & 7];
        s += (p & WHITE) ? ch.toUpperCase() : ch;
      }
      if (empty) s += empty;
      if (r > 0) s += '/';
    }
    let cs = '';
    if (this.castling & 1) cs += 'K';
    if (this.castling & 2) cs += 'Q';
    if (this.castling & 4) cs += 'k';
    if (this.castling & 8) cs += 'q';
    return s + ' ' + (this.turn === WHITE ? 'w' : 'b') + ' ' + (cs || '-') + ' ' +
      (this.ep >= 0 ? sqName(this.ep) : '-') + ' ' + this.half + ' ' + this.full;
  }

  isAttacked(sq, by) {
    const b = this.board;
    let s;
    if (by === WHITE) {
      s = sq - 15; if (!(s & 0x88) && b[s] === (WHITE | PAWN)) return true;
      s = sq - 17; if (!(s & 0x88) && b[s] === (WHITE | PAWN)) return true;
    } else {
      s = sq + 15; if (!(s & 0x88) && b[s] === (BLACK | PAWN)) return true;
      s = sq + 17; if (!(s & 0x88) && b[s] === (BLACK | PAWN)) return true;
    }
    const kn = by | KNIGHT, kg = by | KING;
    for (let i = 0; i < 8; i++) {
      s = sq + N_OFF[i]; if (!(s & 0x88) && b[s] === kn) return true;
      s = sq + K_OFF[i]; if (!(s & 0x88) && b[s] === kg) return true;
    }
    const bi = by | BISHOP, ro = by | ROOK, qu = by | QUEEN;
    for (let i = 0; i < 4; i++) {
      let o = B_OFF[i];
      s = sq + o;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) { if (p === bi || p === qu) return true; break; }
        s += o;
      }
      o = R_OFF[i];
      s = sq + o;
      while (!(s & 0x88)) {
        const p = b[s];
        if (p) { if (p === ro || p === qu) return true; break; }
        s += o;
      }
    }
    return false;
  }

  inCheck() { return this.isAttacked(this.kingSq[this.turn], this.turn ^ 24); }

  /* Ruchy pseudo-legalne (bez sprawdzania, czy król zostaje pod szachem). */
  gen(list, capsOnly) {
    const b = this.board, us = this.turn, them = us ^ 24;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) { sq += 7; continue; }
      const p = b[sq];
      if (!p || !(p & us)) continue;
      const t = p & 7;
      if (t === PAWN) {
        const dir = us === WHITE ? 16 : -16;
        const rank = sq >> 4;
        const promoRank = us === WHITE ? 6 : 1;
        const one = sq + dir;
        if (!b[one]) {
          if (rank === promoRank) {
            list.push(encode(sq, one, F_PROMO, QUEEN));
            if (!capsOnly) {
              list.push(encode(sq, one, F_PROMO, KNIGHT));
              list.push(encode(sq, one, F_PROMO, ROOK));
              list.push(encode(sq, one, F_PROMO, BISHOP));
            }
          } else if (!capsOnly) {
            list.push(encode(sq, one, 0));
            const two = one + dir;
            if (rank === (us === WHITE ? 1 : 6) && !b[two]) list.push(encode(sq, two, F_DOUBLE));
          }
        }
        for (let k = -1; k <= 1; k += 2) {
          const to = one + k;
          if (to & 0x88) continue;
          const q = b[to];
          if (q && (q & them)) {
            if (rank === promoRank) {
              list.push(encode(sq, to, F_CAP | F_PROMO, QUEEN));
              list.push(encode(sq, to, F_CAP | F_PROMO, KNIGHT));
              list.push(encode(sq, to, F_CAP | F_PROMO, ROOK));
              list.push(encode(sq, to, F_CAP | F_PROMO, BISHOP));
            } else list.push(encode(sq, to, F_CAP));
          } else if (to === this.ep) list.push(encode(sq, to, F_CAP | F_EP));
        }
      } else if (t === KNIGHT || t === KING) {
        const offs = t === KNIGHT ? N_OFF : K_OFF;
        for (let i = 0; i < 8; i++) {
          const to = sq + offs[i];
          if (to & 0x88) continue;
          const q = b[to];
          if (!q) { if (!capsOnly) list.push(encode(sq, to, 0)); }
          else if (q & them) list.push(encode(sq, to, F_CAP));
        }
      } else {
        const offs = t === BISHOP ? B_OFF : t === ROOK ? R_OFF : K_OFF;
        for (let i = 0; i < offs.length; i++) {
          const o = offs[i];
          let to = sq + o;
          while (!(to & 0x88)) {
            const q = b[to];
            if (!q) { if (!capsOnly) list.push(encode(sq, to, 0)); }
            else { if (q & them) list.push(encode(sq, to, F_CAP)); break; }
            to += o;
          }
        }
      }
    }
    if (!capsOnly && this.castling) {
      const c = this.castling;
      if (us === WHITE) {
        if ((c & 1) && !b[5] && !b[6] && !this.isAttacked(4, BLACK) && !this.isAttacked(5, BLACK) && !this.isAttacked(6, BLACK))
          list.push(encode(4, 6, F_CASTLE));
        if ((c & 2) && !b[3] && !b[2] && !b[1] && !this.isAttacked(4, BLACK) && !this.isAttacked(3, BLACK) && !this.isAttacked(2, BLACK))
          list.push(encode(4, 2, F_CASTLE));
      } else {
        if ((c & 4) && !b[117] && !b[118] && !this.isAttacked(116, WHITE) && !this.isAttacked(117, WHITE) && !this.isAttacked(118, WHITE))
          list.push(encode(116, 118, F_CASTLE));
        if ((c & 8) && !b[115] && !b[114] && !b[113] && !this.isAttacked(116, WHITE) && !this.isAttacked(115, WHITE) && !this.isAttacked(114, WHITE))
          list.push(encode(116, 114, F_CASTLE));
      }
    }
    return list;
  }

  make(m) {
    const b = this.board, from = mFrom(m), to = mTo(m), flags = mFlags(m);
    const us = this.turn, them = us ^ 24;
    const piece = b[from];
    let capSq = to, captured = b[to];
    if (flags & F_EP) { capSq = us === WHITE ? to - 16 : to + 16; captured = b[capSq]; }
    this.stack.push({ m, captured, castling: this.castling, ep: this.ep, half: this.half, hlo: this.hlo, hhi: this.hhi });
    let lo = this.hlo, hi = this.hhi;
    if (this.ep >= 0) { lo ^= ZEP_LO[this.ep & 7]; hi ^= ZEP_HI[this.ep & 7]; }
    lo ^= ZC_LO[this.castling]; hi ^= ZC_HI[this.castling];
    let i = pidx(piece);
    b[from] = 0; lo ^= ZLO[i + from]; hi ^= ZHI[i + from];
    if (captured) { b[capSq] = 0; const j = pidx(captured) + capSq; lo ^= ZLO[j]; hi ^= ZHI[j]; }
    const placed = (flags & F_PROMO) ? (us | mPromo(m)) : piece;
    b[to] = placed; i = pidx(placed) + to; lo ^= ZLO[i]; hi ^= ZHI[i];
    if (flags & F_CASTLE) {
      let rf, rt;
      if (to > from) { rf = from + 3; rt = from + 1; } else { rf = from - 4; rt = from - 1; }
      const rook = b[rf];
      b[rf] = 0; b[rt] = rook;
      const k = pidx(rook);
      lo ^= ZLO[k + rf] ^ ZLO[k + rt]; hi ^= ZHI[k + rf] ^ ZHI[k + rt];
    }
    if ((piece & 7) === KING) this.kingSq[us] = to;
    this.castling &= CASTLE_MASK[from] & CASTLE_MASK[to];
    this.ep = -1;
    if (flags & F_DOUBLE) {
      // pole bicia w przelocie zapisujemy tylko, gdy obok stoi pion, który może z niego skorzystać
      const ep = (from + to) >> 1, enemy = them | PAWN;
      if ((!((to - 1) & 0x88) && b[to - 1] === enemy) || (!((to + 1) & 0x88) && b[to + 1] === enemy)) {
        this.ep = ep; lo ^= ZEP_LO[ep & 7]; hi ^= ZEP_HI[ep & 7];
      }
    }
    lo ^= ZC_LO[this.castling]; hi ^= ZC_HI[this.castling];
    this.half = ((piece & 7) === PAWN || captured) ? 0 : this.half + 1;
    if (us === BLACK) this.full++;
    this.turn = them; lo ^= ZS_LO; hi ^= ZS_HI;
    this.hlo = lo; this.hhi = hi;
    this.hist.push(lo);
  }

  unmake() {
    const u = this.stack.pop();
    const m = u.m, from = mFrom(m), to = mTo(m), flags = mFlags(m), b = this.board;
    this.turn ^= 24;
    const us = this.turn;
    const piece = (flags & F_PROMO) ? (us | PAWN) : b[to];
    b[from] = piece; b[to] = 0;
    if (u.captured) b[(flags & F_EP) ? (us === WHITE ? to - 16 : to + 16) : to] = u.captured;
    if (flags & F_CASTLE) {
      if (to > from) { b[from + 3] = b[from + 1]; b[from + 1] = 0; }
      else { b[from - 4] = b[from - 1]; b[from - 1] = 0; }
    }
    if ((piece & 7) === KING) this.kingSq[us] = from;
    this.castling = u.castling; this.ep = u.ep; this.half = u.half;
    this.hlo = u.hlo; this.hhi = u.hhi;
    if (us === BLACK) this.full--;
    this.hist.pop();
  }

  makeNull() {
    this.stack.push({ m: 0, captured: 0, castling: this.castling, ep: this.ep, half: this.half, hlo: this.hlo, hhi: this.hhi });
    if (this.ep >= 0) { this.hlo ^= ZEP_LO[this.ep & 7]; this.hhi ^= ZEP_HI[this.ep & 7]; }
    this.ep = -1;
    this.turn ^= 24; this.hlo ^= ZS_LO; this.hhi ^= ZS_HI;
    this.half++;
    this.hist.push(this.hlo);
  }

  unmakeNull() {
    const u = this.stack.pop();
    this.turn ^= 24;
    this.ep = u.ep; this.half = u.half; this.hlo = u.hlo; this.hhi = u.hhi;
    this.hist.pop();
  }

  legalMoves() {
    const list = this.gen([], false), us = this.turn, them = us ^ 24, out = [];
    for (let i = 0; i < list.length; i++) {
      this.make(list[i]);
      if (!this.isAttacked(this.kingSq[us], them)) out.push(list[i]);
      this.unmake();
    }
    return out;
  }

  /* Ile razy bieżąca pozycja wystąpiła wcześniej (od ostatniego ruchu nieodwracalnego). */
  repetitions() {
    const h = this.hist, n = h.length - 1, cur = h[n], lim = Math.max(0, n - this.half);
    let c = 0;
    for (let i = n - 2; i >= lim; i -= 2) if (h[i] === cur) c++;
    return c;
  }

  insufficientMaterial() {
    let minors = 0, knights = 0, light = 0, dark = 0;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) { sq += 7; continue; }
      const t = this.board[sq] & 7;
      if (!t || t === KING) continue;
      if (t === PAWN || t === ROOK || t === QUEEN) return false;
      minors++;
      if (t === KNIGHT) knights++;
      else if (((sq >> 4) + (sq & 7)) & 1) light++; else dark++;
    }
    if (minors <= 1) return true;
    return knights === 0 && (light === 0 || dark === 0);
  }

  hasMatingMaterial(color) {
    let minors = 0;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) { sq += 7; continue; }
      const p = this.board[sq];
      if (!p || !(p & color)) continue;
      const t = p & 7;
      if (t === PAWN || t === ROOK || t === QUEEN) return true;
      if (t === KNIGHT || t === BISHOP) minors++;
    }
    return minors >= 2;
  }

  /* null, albo { result: '1-0' | '0-1' | '1/2-1/2', reason } */
  status() {
    const moves = this.legalMoves();
    if (!moves.length) {
      if (this.inCheck()) return { result: this.turn === WHITE ? '0-1' : '1-0', reason: 'checkmate' };
      return { result: '1/2-1/2', reason: 'stalemate' };
    }
    if (this.insufficientMaterial()) return { result: '1/2-1/2', reason: 'material' };
    if (this.half >= 100) return { result: '1/2-1/2', reason: 'fifty' };
    if (this.repetitions() >= 2) return { result: '1/2-1/2', reason: 'repetition' };
    return null;
  }

  moveFromUci(u) {
    if (!u || u.length < 4) return 0;
    const from = sqFromName(u.slice(0, 2)), to = sqFromName(u.slice(2, 4));
    const pr = u.length > 4 ? PIECE_CHARS.indexOf(u[4].toLowerCase()) : 0;
    let fallback = 0;
    for (const m of this.legalMoves()) {
      if (mFrom(m) !== from || mTo(m) !== to) continue;
      const mp = mPromo(m);
      if (mp === pr) return m;
      if (!pr && mp === QUEEN) fallback = m;
    }
    return fallback;
  }

  play(u) { const m = this.moveFromUci(u); if (m) this.make(m); return m; }

  san(m) {
    const from = mFrom(m), to = mTo(m), flags = mFlags(m), b = this.board;
    const t = b[from] & 7;
    let s;
    if (flags & F_CASTLE) s = to > from ? 'O-O' : 'O-O-O';
    else if (t === PAWN) {
      s = (flags & F_CAP) ? 'abcdefgh'[from & 7] + 'x' + sqName(to) : sqName(to);
      if (flags & F_PROMO) s += '=' + PIECE_CHARS[mPromo(m)].toUpperCase();
    } else {
      let sameFile = false, sameRank = false, ambiguous = false;
      for (const o of this.legalMoves()) {
        const of = mFrom(o);
        if (of === from || mTo(o) !== to || (b[of] & 7) !== t) continue;
        ambiguous = true;
        if ((of & 7) === (from & 7)) sameFile = true;
        if ((of >> 4) === (from >> 4)) sameRank = true;
      }
      let dis = '';
      if (ambiguous) {
        if (!sameFile) dis = 'abcdefgh'[from & 7];
        else if (!sameRank) dis = String((from >> 4) + 1);
        else dis = sqName(from);
      }
      s = PIECE_CHARS[t].toUpperCase() + dis + ((flags & F_CAP) ? 'x' : '') + sqName(to);
    }
    this.make(m);
    if (this.inCheck()) s += this.legalMoves().length ? '+' : '#';
    this.unmake();
    return s;
  }
}

/* ======================================================================= */
/* Ocena pozycji: materiał + tablice pól (Michniewski), struktura pionów, para gońców,
   wieże na otwartych liniach, król zależnie od fazy gry i dobijanie w końcówce. */
const VAL = [0, 100, 320, 330, 500, 900, 0];
const PHASE_W = [0, 0, 1, 1, 2, 4, 0];

const T_PAWN = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0];
const T_KNIGHT = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50];
const T_BISHOP = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 10, 10, 10, 10, 10, 10, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20];
const T_ROOK = [
  0, 0, 0, 0, 0, 0, 0, 0,
  5, 10, 10, 10, 10, 10, 10, 5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  -5, 0, 0, 0, 0, 0, 0, -5,
  0, 0, 0, 5, 5, 0, 0, 0];
const T_QUEEN = [
  -20, -10, -10, -5, -5, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 5, 5, 5, 0, -10,
  -5, 0, 5, 5, 5, 5, 0, -5,
  0, 0, 5, 5, 5, 5, 0, -5,
  -10, 5, 5, 5, 5, 5, 0, -10,
  -10, 0, 5, 0, 0, 0, 0, -10,
  -20, -10, -10, -5, -5, -10, -10, -20];
const T_KING_MG = [
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -20, -30, -30, -40, -40, -30, -30, -20,
  -10, -20, -20, -20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20];
const T_KING_EG = [
  -50, -40, -30, -20, -20, -30, -40, -50,
  -30, -20, -10, 0, 0, -10, -20, -30,
  -30, -10, 20, 30, 30, 20, -10, -30,
  -30, -10, 30, 40, 40, 30, -10, -30,
  -30, -10, 30, 40, 40, 30, -10, -30,
  -30, -10, 20, 30, 30, 20, -10, -30,
  -30, -30, 0, 0, 0, 0, -30, -30,
  -50, -30, -30, -30, -30, -30, -30, -50];

// PST[kolor 0=białe 1=czarne][typ][pole 0x88]
function buildPst(table) {
  const w = new Int16Array(128), bl = new Int16Array(128);
  for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++) {
    w[r * 16 + f] = table[(7 - r) * 8 + f];
    bl[r * 16 + f] = table[r * 8 + f];
  }
  return [w, bl];
}
const PST = [[], []];
[null, T_PAWN, T_KNIGHT, T_BISHOP, T_ROOK, T_QUEEN].forEach((t, i) => {
  if (!t) return;
  const [w, b] = buildPst(t);
  PST[0][i] = w; PST[1][i] = b;
});
const KMG = buildPst(T_KING_MG), KEG = buildPst(T_KING_EG);
const PASSED_MG = [0, 5, 10, 15, 25, 40, 60, 0];
const PASSED_EG = [0, 10, 20, 35, 60, 100, 150, 0];
const CMD = new Int8Array(128); // odległość od środka planszy
for (let r = 0; r < 8; r++) for (let f = 0; f < 8; f++)
  CMD[r * 16 + f] = (f < 4 ? 3 - f : f - 4) + (r < 4 ? 3 - r : r - 4);

const pawnFiles = [new Int8Array(10), new Int8Array(10)]; // indeks kolumna+1
const pawnList = new Int16Array(16), rookList = new Int16Array(20);

function evaluate(pos) {
  const b = pos.board;
  let s = 0, phase = 0, matW = 0, matB = 0, bW = 0, bB = 0, pawnsW = 0, pawnsB = 0;
  let np = 0, nr = 0;
  pawnFiles[0].fill(0); pawnFiles[1].fill(0);
  for (let sq = 0; sq < 128; sq++) {
    if (sq & 0x88) { sq += 7; continue; }
    const p = b[sq];
    if (!p) continue;
    const t = p & 7;
    if (t === KING) continue;
    const c = (p & WHITE) ? 0 : 1;
    const v = VAL[t] + PST[c][t][sq];
    phase += PHASE_W[t];
    if (c === 0) { s += v; if (t !== PAWN) matW += VAL[t]; } else { s -= v; if (t !== PAWN) matB += VAL[t]; }
    if (t === PAWN) {
      pawnFiles[c][(sq & 7) + 1]++;
      if (np < 16) pawnList[np++] = sq;
      if (c === 0) pawnsW++; else pawnsB++;
    } else if (t === BISHOP) { if (c === 0) bW++; else bB++; }
    else if (t === ROOK && nr < 20) rookList[nr++] = sq;
  }
  if (phase > 24) phase = 24;
  const wk = pos.kingSq[WHITE], bk = pos.kingSq[BLACK];
  s += ((KMG[0][wk] * phase + KEG[0][wk] * (24 - phase)) - (KMG[1][bk] * phase + KEG[1][bk] * (24 - phase))) / 24 | 0;

  if (bW >= 2) s += 30;
  if (bB >= 2) s -= 30;

  // struktura pionów
  for (let f = 1; f <= 8; f++) {
    if (pawnFiles[0][f] > 1) s -= 12 * (pawnFiles[0][f] - 1);
    if (pawnFiles[1][f] > 1) s += 12 * (pawnFiles[1][f] - 1);
  }
  for (let i = 0; i < np; i++) {
    const sq = pawnList[i], p = b[sq], c = (p & WHITE) ? 0 : 1, f = (sq & 7) + 1, r = sq >> 4;
    const sign = c === 0 ? 1 : -1;
    const own = pawnFiles[c];
    if (!own[f - 1] && !own[f + 1]) s -= 12 * sign;
    // przechodni?
    const enemy = c === 0 ? (BLACK | PAWN) : (WHITE | PAWN);
    let passed = true;
    const dir = c === 0 ? 16 : -16;
    for (let s2 = sq + dir; !(s2 & 0x88) && passed; s2 += dir) {
      if (b[s2] === enemy) passed = false;
      else if (!((s2 - 1) & 0x88) && b[s2 - 1] === enemy) passed = false;
      else if (!((s2 + 1) & 0x88) && b[s2 + 1] === enemy) passed = false;
    }
    if (passed) {
      const rr = c === 0 ? r : 7 - r;
      s += sign * ((PASSED_MG[rr] * phase + PASSED_EG[rr] * (24 - phase)) / 24 | 0);
    }
  }
  // wieże na otwartych i półotwartych liniach
  for (let i = 0; i < nr; i++) {
    const sq = rookList[i], c = (b[sq] & WHITE) ? 0 : 1, f = (sq & 7) + 1, sign = c === 0 ? 1 : -1;
    if (!pawnFiles[c][f]) s += sign * (pawnFiles[1 - c][f] ? 8 : 18);
  }
  // dobijanie w końcówce: wypchnij króla przeciwnika do krawędzi i zbliż swojego
  if (phase <= 10) {
    const diff = (matW + pawnsW * 100) - (matB + pawnsB * 100);
    const kd = Math.abs((wk & 7) - (bk & 7)) + Math.abs((wk >> 4) - (bk >> 4));
    if (diff >= 300) s += CMD[bk] * 12 + (14 - kd) * 5;
    else if (diff <= -300) s -= CMD[wk] * 12 + (14 - kd) * 5;
  }
  // bez pionów i z co najwyżej lekką figurą nie da się wygrać
  if (pawnsW === 0 && matW <= 330 && s > 0) s = 0;
  if (pawnsB === 0 && matB <= 330 && s < 0) s = 0;
  s += pos.turn === WHITE ? 10 : -10;
  return pos.turn === WHITE ? s : -s;
}

/* ======================================================================= */
const MATE = 100000, INF = 1000000;
const TT_BITS = 19, TT_SIZE = 1 << TT_BITS, TT_MASK = TT_SIZE - 1;
const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

class Searcher {
  constructor() {
    this.ttKey = new Int32Array(TT_SIZE);
    this.ttMove = new Int32Array(TT_SIZE);
    this.ttScore = new Int32Array(TT_SIZE);
    this.ttDepth = new Int8Array(TT_SIZE);
    this.ttFlag = new Uint8Array(TT_SIZE);
    this.killers = new Int32Array(256 * 2);
    this.history = new Int32Array(24 * 128);
    this.nodes = 0;
  }

  reset(pos, timeMs) {
    this.pos = pos;
    this.nodes = 0;
    this.stop = false;
    this.canStop = false;
    this.deadline = timeMs ? now() + timeMs : Infinity;
    this.killers.fill(0);
    for (let i = 0; i < this.history.length; i++) this.history[i] >>= 2;
  }

  hasPieces(color) {
    const b = this.pos.board;
    for (let sq = 0; sq < 128; sq++) {
      if (sq & 0x88) { sq += 7; continue; }
      const p = b[sq];
      if (p && (p & color) && (p & 7) !== PAWN && (p & 7) !== KING) return true;
    }
    return false;
  }

  scoreMoves(moves, ttMove, ply) {
    const b = this.pos.board, out = new Array(moves.length);
    const k1 = this.killers[ply * 2], k2 = this.killers[ply * 2 + 1];
    for (let i = 0; i < moves.length; i++) {
      const m = moves[i], fl = mFlags(m);
      let s;
      if (m === ttMove) s = 10000000;
      else if (fl & F_CAP) {
        const victim = (fl & F_EP) ? PAWN : (b[mTo(m)] & 7);
        s = 1000000 + victim * 100 - (b[mFrom(m)] & 7);
        if (fl & F_PROMO) s += mPromo(m) === QUEEN ? 50000 : -900000;
      } else if (fl & F_PROMO) s = mPromo(m) === QUEEN ? 950000 : -1000;
      else if (m === k1) s = 800000;
      else if (m === k2) s = 700000;
      else s = this.history[b[mFrom(m)] * 128 + mTo(m)];
      out[i] = s;
    }
    return out;
  }

  tick() {
    if ((++this.nodes & 1023) === 0 && this.canStop && now() > this.deadline) this.stop = true;
    return this.stop;
  }

  quiesce(alpha, beta, ply) {
    if (this.tick()) return 0;
    const pos = this.pos;
    const stand = evaluate(pos);
    if (stand >= beta) return stand;
    if (stand > alpha) alpha = stand;
    if (ply >= 120) return stand;
    const moves = pos.gen([], true);
    const scores = this.scoreMoves(moves, 0, Math.min(ply, 255));
    const us = pos.turn, them = us ^ 24, b = pos.board;
    for (let i = 0; i < moves.length; i++) {
      let bi = i;
      for (let j = i + 1; j < moves.length; j++) if (scores[j] > scores[bi]) bi = j;
      if (bi !== i) { const t = moves[i]; moves[i] = moves[bi]; moves[bi] = t; const u = scores[i]; scores[i] = scores[bi]; scores[bi] = u; }
      const m = moves[i], fl = mFlags(m);
      if ((fl & F_CAP) && !(fl & F_PROMO)) {
        const victim = (fl & F_EP) ? PAWN : (b[mTo(m)] & 7);
        if (stand + VAL[victim] + 200 < alpha) continue;
      }
      pos.make(m);
      if (pos.isAttacked(pos.kingSq[us], them)) { pos.unmake(); continue; }
      const sc = -this.quiesce(-beta, -alpha, ply + 1);
      pos.unmake();
      if (this.stop) return 0;
      if (sc > alpha) { alpha = sc; if (alpha >= beta) return alpha; }
    }
    return alpha;
  }

  negamax(depth, alpha, beta, ply, allowNull) {
    if (this.tick()) return 0;
    const pos = this.pos;
    if (ply > 0) {
      if (pos.half >= 100 || pos.repetitions() > 0) return 0;
      if (alpha < -MATE + ply) alpha = -MATE + ply;
      if (beta > MATE - ply - 1) beta = MATE - ply - 1;
      if (alpha >= beta) return alpha;
    }
    const inCheck = pos.inCheck();
    if (inCheck) depth++;
    if (depth <= 0) return this.quiesce(alpha, beta, ply);
    if (ply >= 100) return evaluate(pos);

    const idx = pos.hlo & TT_MASK;
    let ttMove = 0;
    if (this.ttFlag[idx] && this.ttKey[idx] === pos.hhi) {
      ttMove = this.ttMove[idx];
      if (ply > 0 && this.ttDepth[idx] >= depth) {
        let sc = this.ttScore[idx];
        if (sc > MATE - 300) sc -= ply; else if (sc < -MATE + 300) sc += ply;
        const fl = this.ttFlag[idx];
        if (fl === 1 || (fl === 2 && sc >= beta) || (fl === 3 && sc <= alpha)) return sc;
      }
    }
    const pvNode = beta - alpha > 1;
    if (!pvNode && !inCheck && ply > 0 && Math.abs(beta) < MATE - 300) {
      // statyczne odcięcie przy małej głębokości
      if (depth <= 3) {
        const ev = evaluate(pos);
        if (ev - 110 * depth >= beta) return ev - 110 * depth;
      }
      // ruch zerowy
      if (allowNull && depth >= 3 && this.hasPieces(pos.turn)) {
        pos.makeNull();
        const sc = -this.negamax(depth - 1 - (depth >= 6 ? 3 : 2), -beta, -beta + 1, ply + 1, false);
        pos.unmakeNull();
        if (this.stop) return 0;
        if (sc >= beta) return beta;
      }
    }

    const moves = pos.gen([], false);
    const scores = this.scoreMoves(moves, ttMove, ply);
    const us = pos.turn, them = us ^ 24;
    const k1 = this.killers[ply * 2], k2 = this.killers[ply * 2 + 1];
    let legal = 0, best = -INF, bestMove = 0;
    const origAlpha = alpha;
    for (let i = 0; i < moves.length; i++) {
      let bi = i;
      for (let j = i + 1; j < moves.length; j++) if (scores[j] > scores[bi]) bi = j;
      if (bi !== i) { const t = moves[i]; moves[i] = moves[bi]; moves[bi] = t; const u = scores[i]; scores[i] = scores[bi]; scores[bi] = u; }
      const m = moves[i];
      const pieceCode = pos.board[mFrom(m)];
      pos.make(m);
      if (pos.isAttacked(pos.kingSq[us], them)) { pos.unmake(); continue; }
      legal++;
      const quiet = !(mFlags(m) & (F_CAP | F_PROMO));
      let sc;
      if (legal === 1) sc = -this.negamax(depth - 1, -beta, -alpha, ply + 1, true);
      else {
        let r = 0;
        if (depth >= 3 && legal > 3 && quiet && !inCheck && m !== k1 && m !== k2 && !pos.inCheck())
          r = legal > 10 && depth >= 5 ? 2 : 1;
        sc = -this.negamax(depth - 1 - r, -alpha - 1, -alpha, ply + 1, true);
        if (sc > alpha && r > 0) sc = -this.negamax(depth - 1, -alpha - 1, -alpha, ply + 1, true);
        if (sc > alpha && sc < beta) sc = -this.negamax(depth - 1, -beta, -alpha, ply + 1, true);
      }
      pos.unmake();
      if (this.stop) return 0;
      if (sc > best) {
        best = sc; bestMove = m;
        if (ply === 0) { this.rootBest = m; this.rootScore = sc; }
        if (sc > alpha) {
          alpha = sc;
          if (alpha >= beta) {
            if (quiet) {
              if (this.killers[ply * 2] !== m) { this.killers[ply * 2 + 1] = this.killers[ply * 2]; this.killers[ply * 2] = m; }
              const hi = pieceCode * 128 + mTo(m);
              this.history[hi] += depth * depth;
              if (this.history[hi] > 400000) for (let k = 0; k < this.history.length; k++) this.history[k] >>= 1;
            }
            break;
          }
        }
      }
    }
    if (!legal) return inCheck ? -MATE + ply : 0;
    let st = best;
    if (st > MATE - 300) st += ply; else if (st < -MATE + 300) st -= ply;
    this.ttKey[idx] = pos.hhi; this.ttMove[idx] = bestMove; this.ttScore[idx] = st;
    this.ttDepth[idx] = depth; this.ttFlag[idx] = best >= beta ? 2 : best > origAlpha ? 1 : 3;
    return best;
  }

  /* Iteracyjne pogłębianie z limitem czasu. */
  search(pos, { maxDepth = 64, timeMs = 1000 } = {}) {
    const root = pos.legalMoves();
    if (!root.length) return null;
    this.reset(pos, timeMs);
    const start = now();
    if (root.length === 1) return { move: root[0], score: evaluate(pos), depth: 0, nodes: 0 };
    let best = root[0], bestScore = 0, done = 0;
    for (let d = 1; d <= maxDepth; d++) {
      this.canStop = d > 1;
      this.rootBest = 0;
      const sc = this.negamax(d, -INF, INF, 0, true);
      if (this.stop) { if (this.rootBest) best = this.rootBest; break; }
      best = this.rootBest || best; bestScore = sc; done = d;
      if (Math.abs(sc) > MATE - 300) break;
      if (now() - start > timeMs * 0.5) break;
    }
    return { move: best, score: bestScore, depth: done, nodes: this.nodes };
  }

  /* Ocena każdego ruchu z osobna (pełne okno) — do słabszych poziomów z losowym szumem. */
  rootScores(pos, depth) {
    this.reset(pos, 0);
    const out = [];
    for (const m of pos.legalMoves()) {
      pos.make(m);
      const sc = -this.negamax(depth - 1, -INF, INF, 1, true);
      pos.unmake();
      out.push({ m, score: sc });
    }
    return out;
  }
}

/* ======================================================================= */
/* Książka debiutowa (ruchy w notacji UCI) i nazwy debiutów. */
const BOOK = [
  'e2e4 e7e5 g1f3 b8c6 f1b5 a7a6 b5a4 g8f6 e1g1 f8e7 f1e1 b7b5 a4b3 d7d6',
  'e2e4 e7e5 g1f3 b8c6 f1b5 g8f6 e1g1 f6e4 d2d4 e4d6',
  'e2e4 e7e5 g1f3 b8c6 f1c4 f8c5 c2c3 g8f6 d2d4 e5d4',
  'e2e4 e7e5 g1f3 b8c6 f1c4 g8f6 d2d3 f8c5',
  'e2e4 e7e5 g1f3 b8c6 d2d4 e5d4 f3d4 g8f6 d4c6 b7c6',
  'e2e4 e7e5 g1f3 g8f6 f3e5 d7d6 e5f3 f6e4 d2d4 d6d5',
  'e2e4 e7e5 b1c3 g8f6 f2f4 d7d5',
  'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6 c1e3 e7e5',
  'e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6 c1e3 f8g7',
  'e2e4 c7c5 g1f3 b8c6 d2d4 c5d4 f3d4 g8f6 b1c3 e7e5',
  'e2e4 c7c5 g1f3 e7e6 d2d4 c5d4 f3d4 a7a6',
  'e2e4 c7c5 c2c3 g8f6 e4e5 f6d5 d2d4 c5d4',
  'e2e4 e7e6 d2d4 d7d5 b1c3 g8f6 c1g5 f8e7',
  'e2e4 e7e6 d2d4 d7d5 e4e5 c7c5 c2c3 b8c6 g1f3 d8b6',
  'e2e4 c7c6 d2d4 d7d5 b1c3 d5e4 c3e4 c8f5 e4g3 f5g6',
  'e2e4 c7c6 d2d4 d7d5 e4e5 c8f5',
  'e2e4 d7d5 e4d5 d8d5 b1c3 d5a5 d2d4 g8f6',
  'e2e4 d7d6 d2d4 g8f6 b1c3 g7g6 g1f3 f8g7',
  'd2d4 d7d5 c2c4 e7e6 b1c3 g8f6 c1g5 f8e7 e2e3 e8g8',
  'd2d4 d7d5 c2c4 d5c4 g1f3 g8f6 e2e3 e7e6 f1c4 c7c5',
  'd2d4 d7d5 c2c4 c7c6 g1f3 g8f6 b1c3 d5c4',
  'd2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6 g1f3 e8g8 f1e2 e7e5',
  'd2d4 g8f6 c2c4 e7e6 b1c3 f8b4 e2e3 e8g8',
  'd2d4 g8f6 c2c4 e7e6 g1f3 b7b6 g2g3 c8b7',
  'd2d4 g8f6 c2c4 g7g6 b1c3 d7d5 c4d5 f6d5 e2e4 d5c3 b2c3 f8g7',
  'd2d4 d7d5 c1f4 g8f6 e2e3 c7c5 c2c3 b8c6',
  'd2d4 g8f6 g1f3 e7e6 c1f4 c7c5 e2e3',
  'c2c4 e7e5 b1c3 g8f6 g1f3 b8c6 g2g3 d7d5',
  'c2c4 g8f6 b1c3 e7e6 g1f3 d7d5',
  'g1f3 d7d5 g2g3 g8f6 f1g2 e7e6 e1g1 f8e7',
  'd2d4 f7f5 g2g3 g8f6 f1g2 e7e6 g1f3'
].map(l => l.split(' '));

const OPENINGS = [
  ['e2e4', 'Otwarcie piona królewskiego'],
  ['d2d4', 'Otwarcie piona hetmańskiego'],
  ['c2c4', 'Partia angielska'],
  ['g1f3', 'Otwarcie Rétiego'],
  ['e2e4 e7e5', 'Debiut otwarty'],
  ['e2e4 e7e5 g1f3 b8c6 f1b5', 'Partia hiszpańska'],
  ['e2e4 e7e5 g1f3 b8c6 f1b5 g8f6', 'Partia hiszpańska, obrona berlińska'],
  ['e2e4 e7e5 g1f3 b8c6 f1c4', 'Partia włoska'],
  ['e2e4 e7e5 g1f3 b8c6 f1c4 f8c5', 'Partia włoska, Giuoco piano'],
  ['e2e4 e7e5 g1f3 b8c6 f1c4 g8f6', 'Obrona dwóch skoczków'],
  ['e2e4 e7e5 g1f3 b8c6 d2d4', 'Partia szkocka'],
  ['e2e4 e7e5 g1f3 g8f6', 'Obrona rosyjska'],
  ['e2e4 e7e5 g1f3 d7d6', 'Obrona Philidora'],
  ['e2e4 e7e5 f2f4', 'Gambit królewski'],
  ['e2e4 e7e5 b1c3', 'Partia wiedeńska'],
  ['e2e4 c7c5', 'Obrona sycylijska'],
  ['e2e4 c7c5 b1c3', 'Obrona sycylijska zamknięta'],
  ['e2e4 c7c5 c2c3', 'Obrona sycylijska, wariant Alapina'],
  ['e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 a7a6', 'Obrona sycylijska, wariant Najdorfa'],
  ['e2e4 c7c5 g1f3 d7d6 d2d4 c5d4 f3d4 g8f6 b1c3 g7g6', 'Obrona sycylijska, wariant smoczy'],
  ['e2e4 e7e6', 'Obrona francuska'],
  ['e2e4 e7e6 d2d4 d7d5 e4e5', 'Obrona francuska, wariant zaawansowany'],
  ['e2e4 c7c6', 'Obrona Caro-Kann'],
  ['e2e4 d7d5', 'Obrona skandynawska'],
  ['e2e4 g8f6', 'Obrona Alechina'],
  ['e2e4 d7d6', 'Obrona Pirca'],
  ['e2e4 g7g6', 'Obrona nowoczesna'],
  ['d2d4 d7d5 c2c4', 'Gambit hetmański'],
  ['d2d4 d7d5 c2c4 e7e6', 'Gambit hetmański odrzucony'],
  ['d2d4 d7d5 c2c4 d5c4', 'Gambit hetmański przyjęty'],
  ['d2d4 d7d5 c2c4 c7c6', 'Obrona słowiańska'],
  ['d2d4 g8f6', 'Obrona indyjska'],
  ['d2d4 g8f6 c2c4 g7g6 b1c3 f8g7 e2e4 d7d6', 'Obrona królewsko-indyjska'],
  ['d2d4 g8f6 c2c4 e7e6 b1c3 f8b4', 'Obrona nimzoindyjska'],
  ['d2d4 g8f6 c2c4 e7e6 g1f3 b7b6', 'Obrona hetmańsko-indyjska'],
  ['d2d4 g8f6 c2c4 g7g6 b1c3 d7d5', 'Obrona Grünfelda'],
  ['d2d4 g8f6 c2c4 c7c5 d4d5 b7b5', 'Gambit wołżański'],
  ['d2d4 d7d5 c1f4', 'System londyński'],
  ['d2d4 g8f6 g1f3 e7e6 c1f4', 'System londyński'],
  ['d2d4 f7f5', 'Obrona holenderska']
].map(([l, n]) => [l.split(' '), n]);

function startsWith(seq, prefix) {
  if (prefix.length > seq.length) return false;
  for (let i = 0; i < prefix.length; i++) if (seq[i] !== prefix[i]) return false;
  return true;
}
function bookMove(played) {
  const cands = [];
  for (const line of BOOK) if (line.length > played.length && startsWith(line, played)) cands.push(line[played.length]);
  return cands.length ? cands[Math.random() * cands.length | 0] : null;
}
function openingName(played) {
  let best = null, len = 0;
  for (const [line, name] of OPENINGS) if (line.length > len && startsWith(played, line)) { best = name; len = line.length; }
  return best;
}

/* ======================================================================= */
/* Poziomy komputera. depth+noise = ocena każdego ruchu z losowym szumem (słabsze),
   time = pełne przeszukiwanie z limitem czasu (mocniejsze). */
const LEVELS = [null,
  { depth: 1, noise: 320, randomP: 0.3 },
  { depth: 1, noise: 160, randomP: 0.1 },
  { depth: 2, noise: 90, randomP: 0.04 },
  { depth: 2, noise: 40 },
  { depth: 3, noise: 15 },
  { time: 600 },
  { time: 1500 },
  { time: 3500 }
];

let shared = null;
function think(pos, level, bookPlayed, override) {
  const legal = pos.legalMoves();
  if (!legal.length) return null;
  const cfg = Object.assign({}, LEVELS[level] || LEVELS[4], override || {});
  if (bookPlayed && level >= 3 && bookPlayed.length < 16) {
    const u = bookMove(bookPlayed);
    if (u && pos.moveFromUci(u)) return { uci: u, score: 0, depth: 0, book: true };
  }
  const s = shared || (shared = new Searcher());
  if (cfg.randomP && Math.random() < cfg.randomP) {
    return { uci: toUci(legal[Math.random() * legal.length | 0]), score: 0, depth: 0, random: true };
  }
  if (cfg.time) {
    const r = s.search(pos, { maxDepth: cfg.maxDepth || 64, timeMs: cfg.time });
    return { uci: toUci(r.move), score: r.score, depth: r.depth, nodes: r.nodes };
  }
  let best = null, bv = -Infinity;
  for (const e of s.rootScores(pos, cfg.depth)) {
    const v = e.score + (Math.random() * 2 - 1) * cfg.noise;
    if (v > bv) { bv = v; best = e; }
  }
  return { uci: toUci(best.m), score: best.score, depth: cfg.depth };
}

/* Wspólne wejście dla Workera i trybu awaryjnego w głównym wątku. */
function runRequest(msg) {
  const pos = new Position(msg.startFen || START_FEN);
  for (const u of msg.moves || []) if (!pos.play(u)) break;
  const played = (msg.startFen || START_FEN) === START_FEN ? (msg.moves || []) : null;
  if (msg.kind === 'eval') {
    const r = think(pos, 6, null, { time: 500 });
    return { score: r ? r.score : 0 };
  }
  if (msg.kind === 'hint') return think(pos, 7, played, { time: 900 }) || {};
  return think(pos, msg.level, played) || {};
}

root.ChessEngine = {
  WHITE, BLACK, PAWN, KNIGHT, BISHOP, ROOK, QUEEN, KING, START_FEN, MATE,
  F_CAP, F_EP, F_CASTLE, F_DOUBLE, F_PROMO,
  Position, Searcher, evaluate, think, runRequest, bookMove, openingName, BOOK, OPENINGS, LEVELS,
  sqName, sqFromName, toUci, mFrom, mTo, mFlags, mPromo, VAL
};
})(typeof globalThis !== 'undefined' ? globalThis : self);
