// ==== Tłumaczenie po stronie klienta (bezpośrednio do darmowego Google Translate) ====
// Wersja statyczna dla beagleapps.pl/apps/tlumacz/ — bez backendu.
const LANGUAGES = {
  auto: "Wykryj język", pl: "polski", en: "angielski", de: "niemiecki",
  fr: "francuski", es: "hiszpański", it: "włoski", uk: "ukraiński",
  ru: "rosyjski", cs: "czeski", sk: "słowacki", nl: "niderlandzki",
  pt: "portugalski", sv: "szwedzki", no: "norweski", da: "duński",
  fi: "fiński", tr: "turecki", el: "grecki", ro: "rumuński",
  hu: "węgierski", ja: "japoński", ko: "koreański", zh: "chiński (uproszczony)",
  ar: "arabski", hi: "hindi", he: "hebrajski", th: "tajski",
  vi: "wietnamski", id: "indonezyjski",
};

const MAX_CHUNK = 1500;
function splitIntoChunks(text, limit) {
  if (text.length <= limit) return [text];
  const chunks = [];
  let rest = text;
  while (rest.length > limit) {
    const win = rest.slice(0, limit);
    let cut = Math.max(win.lastIndexOf("\n"), win.lastIndexOf("."), win.lastIndexOf("!"), win.lastIndexOf("?"));
    if (cut < limit / 2) cut = win.lastIndexOf(" ");
    if (cut <= 0) cut = limit - 1;
    chunks.push(rest.slice(0, cut + 1));
    rest = rest.slice(cut + 1);
  }
  if (rest.length) chunks.push(rest);
  return chunks;
}

async function googleTranslateChunk(text, source, target) {
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx" +
    "&sl=" + encodeURIComponent(source) + "&tl=" + encodeURIComponent(target) +
    "&dt=t&dt=bd&dt=md&q=" + encodeURIComponent(text);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Nie udało się przetłumaczyć tekstu. Spróbuj ponownie.");
  const data = await resp.json();
  const translation = (data[0] || []).map((s) => s[0]).filter(Boolean).join("");
  const detectedSource = data[2] || source;
  const dictionary = (data[1] || [])
    .filter((g) => Array.isArray(g))
    .map((g) => ({ pos: g[0], terms: (g[1] || []).slice(0, 8) }));
  const definitions = (data[12] || [])
    .filter((g) => Array.isArray(g))
    .map((g) => ({ pos: g[0], items: (g[1] || []).map((d) => d[0]).filter(Boolean).slice(0, 3) }));
  return { translation, detectedSource, dictionary, definitions };
}

async function googleTranslate(text, source, target) {
  const chunks = splitIntoChunks(text, MAX_CHUNK);
  if (chunks.length > 1) {
    let translation = "", detectedSource = source;
    for (const chunk of chunks) {
      const r = await googleTranslateChunk(chunk, source, target);
      translation += r.translation;
      detectedSource = r.detectedSource;
    }
    return { translation, detectedSource, dictionary: [], definitions: [] };
  }
  return googleTranslateChunk(text, source, target);
}

// ---- Elementy DOM ----
const sourceSel = document.getElementById("source-lang");
const targetSel = document.getElementById("target-lang");
const swapBtn = document.getElementById("swap");
const input = document.getElementById("input");
const output = document.getElementById("output");
const charCount = document.getElementById("char-count");
const detected = document.getElementById("detected");
const status = document.getElementById("status");

const micBtn = document.getElementById("mic");
const speakInputBtn = document.getElementById("speak-input");
const speakOutputBtn = document.getElementById("speak-output");
const clearBtn = document.getElementById("clear");
const copyBtn = document.getElementById("copy");
const favoriteBtn = document.getElementById("favorite");
const fileInput = document.getElementById("file-input");
const themeToggle = document.getElementById("theme-toggle");

const dictEl = document.getElementById("dictionary");
const tabs = document.querySelectorAll(".tab");
const listEl = document.getElementById("list");
const clearListBtn = document.getElementById("clear-list");

// ---- Stan ----
let languages = {};
let debounceTimer = null;
let lastDetected = null;
let lastResult = null; // { sourceText, translation, source, target }
let activeTab = "history";

const store = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

let history = store.get("history", []);
let favorites = store.get("favorites", []);

init();

async function init() {
  applyTheme(store.get("theme", "light"));

  languages = LANGUAGES;
  fillSelect(sourceSel, languages, store.get("source", "auto"));
  fillSelect(targetSel, languages, store.get("target", "pl"), { skipAuto: true });

  // Tłumaczenie
  input.addEventListener("input", onInput);
  swapBtn.addEventListener("click", swap);
  sourceSel.addEventListener("change", () => {
    store.set("source", sourceSel.value);
    translate();
  });
  targetSel.addEventListener("change", () => {
    store.set("target", targetSel.value);
    translate();
  });

  // Akcje
  micBtn.addEventListener("click", toggleDictation);
  speakInputBtn.addEventListener("click", () => speak(input.value, sourceSel.value));
  speakOutputBtn.addEventListener("click", () => speak(output.textContent, targetSel.value));
  clearBtn.addEventListener("click", clearInput);
  copyBtn.addEventListener("click", copyOutput);
  favoriteBtn.addEventListener("click", toggleFavorite);
  fileInput.addEventListener("change", loadFile);
  themeToggle.addEventListener("click", toggleTheme);

  // Biblioteka
  tabs.forEach((t) => t.addEventListener("click", () => switchTab(t.dataset.tab)));
  clearListBtn.addEventListener("click", clearActiveList);

  renderList();
}

// ---- Wypełnianie list języków ----
function fillSelect(select, langs, defaultValue, { skipAuto = false } = {}) {
  select.innerHTML = "";
  for (const [code, name] of Object.entries(langs)) {
    if (skipAuto && code === "auto") continue;
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = name;
    if (code === defaultValue) opt.selected = true;
    select.appendChild(opt);
  }
}

// ---- Tłumaczenie ----
function onInput() {
  charCount.textContent = `${input.value.length} / 5000`;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(translate, 400);
}

async function translate() {
  const text = input.value;
  if (!text.trim()) {
    output.textContent = "";
    detected.textContent = "";
    lastResult = null;
    updateFavoriteIcon();
    renderDictionary(null, null);
    return;
  }

  status.className = "status loading";
  try {
    const data = await googleTranslate(text, sourceSel.value, targetSel.value);

    output.textContent = data.translation;
    lastDetected = data.detectedSource;
    lastResult = {
      sourceText: text,
      translation: data.translation,
      source: sourceSel.value === "auto" ? data.detectedSource : sourceSel.value,
      target: targetSel.value,
    };

    if (sourceSel.value === "auto" && data.detectedSource) {
      detected.textContent = `Wykryto: ${languages[data.detectedSource] || data.detectedSource}`;
    } else {
      detected.textContent = "";
    }

    updateFavoriteIcon();
    renderDictionary(data.dictionary, data.definitions);
    saveToHistory();
  } catch (err) {
    output.textContent = "";
    detected.textContent = err.message;
    renderDictionary(null, null);
  } finally {
    status.className = "status";
  }
}

function swap() {
  const newSource = targetSel.value;
  const newTarget = sourceSel.value === "auto" ? lastDetected || "en" : sourceSel.value;

  sourceSel.value = newSource;
  targetSel.value = newTarget;
  store.set("source", newSource);
  store.set("target", newTarget);

  if (output.textContent.trim()) {
    input.value = output.textContent;
    charCount.textContent = `${input.value.length} / 5000`;
  }
  translate();
}

// ---- Słownik i definicje ----
function renderDictionary(dictionary, definitions) {
  const hasDict = dictionary && dictionary.length;
  const hasDef = definitions && definitions.length;

  if (!hasDict && !hasDef) {
    dictEl.hidden = true;
    dictEl.innerHTML = "";
    return;
  }

  let html = "";

  if (hasDict) {
    html += `<div class="dict-block"><div class="dict-title">📖 Inne znaczenia</div>`;
    for (const group of dictionary) {
      const terms = group.terms
        .map((t) => `<span class="dict-term">${escapeHtml(t)}</span>`)
        .join("");
      html += `
        <div class="dict-pos">
          <div class="dict-pos-name">${escapeHtml(group.pos || "")}</div>
          <div class="dict-terms">${terms}</div>
        </div>`;
    }
    html += `</div>`;
  }

  if (hasDef) {
    html += `<div class="dict-block"><div class="dict-title">📝 Definicje</div>`;
    for (const group of definitions) {
      const items = group.items
        .map((d) => `<li class="dict-def">${escapeHtml(d)}</li>`)
        .join("");
      html += `
        <div class="dict-pos">
          <div class="dict-pos-name">${escapeHtml(group.pos || "")}</div>
          <ul>${items}</ul>
        </div>`;
    }
    html += `</div>`;
  }

  dictEl.innerHTML = html;
  dictEl.hidden = false;

  // klik w alternatywne tłumaczenie wstawia je jako tekst źródłowy (odwrotne tłumaczenie)
  dictEl.querySelectorAll(".dict-term").forEach((el) => {
    el.addEventListener("click", () => {
      input.value = el.textContent;
      charCount.textContent = `${input.value.length} / 5000`;
      // zamień kierunek, żeby zobaczyć tłumaczenie wybranego słowa
      const cur = sourceSel.value === "auto" ? lastDetected || "en" : sourceSel.value;
      sourceSel.value = targetSel.value;
      targetSel.value = cur;
      translate();
    });
  });
}

// ---- Synteza mowy (TTS) ----
function speak(text, lang) {
  if (!text || !text.trim()) return;
  if (!("speechSynthesis" in window)) {
    alert("Twoja przeglądarka nie obsługuje odczytu na głos.");
    return;
  }
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  if (lang && lang !== "auto") utter.lang = lang;
  else if (lastDetected) utter.lang = lastDetected;
  speechSynthesis.speak(utter);
}

// ---- Rozpoznawanie mowy (dyktowanie) ----
let recognition = null;
let recording = false;

function toggleDictation() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert("Twoja przeglądarka nie obsługuje dyktowania (spróbuj w Chrome).");
    return;
  }

  if (recording) {
    recognition.stop();
    return;
  }

  recognition = new SR();
  recognition.lang = sourceSel.value === "auto" ? "pl-PL" : sourceSel.value;
  recognition.interimResults = true;
  recognition.continuous = false;

  let finalText = input.value ? input.value + " " : "";

  recognition.onstart = () => {
    recording = true;
    micBtn.classList.add("recording");
  };
  recognition.onend = () => {
    recording = false;
    micBtn.classList.remove("recording");
    translate();
  };
  recognition.onerror = () => {
    recording = false;
    micBtn.classList.remove("recording");
  };
  recognition.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += transcript;
      else interim += transcript;
    }
    input.value = finalText + interim;
    charCount.textContent = `${input.value.length} / 5000`;
  };

  recognition.start();
}

// ---- Akcje pomocnicze ----
function clearInput() {
  input.value = "";
  output.textContent = "";
  detected.textContent = "";
  charCount.textContent = "0 / 5000";
  lastResult = null;
  updateFavoriteIcon();
  input.focus();
}

async function copyOutput() {
  if (!output.textContent.trim()) return;
  try {
    await navigator.clipboard.writeText(output.textContent);
    copyBtn.textContent = "✅";
    setTimeout(() => (copyBtn.textContent = "📋"), 1200);
  } catch {
    alert("Nie udało się skopiować.");
  }
}

async function loadFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  status.className = "status";
  status.textContent = "Wczytuję plik...";
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/extract", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Błąd odczytu pliku");

    input.value = (data.text || "").slice(0, 5000);
    charCount.textContent = `${input.value.length} / 5000`;
    if ((data.text || "").length > 5000) {
      status.textContent = "Wczytano pierwsze 5000 znaków.";
      setTimeout(() => (status.textContent = ""), 2500);
    } else {
      status.textContent = "";
    }
    translate();
  } catch (err) {
    status.textContent = "";
    alert(err.message);
  } finally {
    fileInput.value = "";
  }
}

// ---- Motyw ----
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const next =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  store.set("theme", next);
}

// ---- Historia ----
function saveToHistory() {
  if (!lastResult) return;
  // pomiń duplikat z czubka listy
  const top = history[0];
  if (top && top.sourceText === lastResult.sourceText && top.target === lastResult.target) {
    return;
  }
  history.unshift({ ...lastResult, id: Date.now() });
  history = history.slice(0, 50);
  store.set("history", history);
  if (activeTab === "history") renderList();
}

// ---- Ulubione ----
function isFavorite() {
  return (
    lastResult &&
    favorites.some(
      (f) => f.sourceText === lastResult.sourceText && f.target === lastResult.target
    )
  );
}

function updateFavoriteIcon() {
  const fav = isFavorite();
  favoriteBtn.textContent = fav ? "⭐" : "☆";
  favoriteBtn.classList.toggle("active", !!fav);
}

function toggleFavorite() {
  if (!lastResult) return;
  if (isFavorite()) {
    favorites = favorites.filter(
      (f) => !(f.sourceText === lastResult.sourceText && f.target === lastResult.target)
    );
  } else {
    favorites.unshift({ ...lastResult, id: Date.now() });
  }
  store.set("favorites", favorites);
  updateFavoriteIcon();
  if (activeTab === "favorites") renderList();
}

// ---- Biblioteka (renderowanie list) ----
function switchTab(tab) {
  activeTab = tab;
  tabs.forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  renderList();
}

function renderList() {
  const items = activeTab === "history" ? history : favorites;
  listEl.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent =
      activeTab === "history" ? "Brak historii tłumaczeń." : "Brak ulubionych.";
    listEl.appendChild(empty);
    return;
  }

  for (const item of items) {
    const li = document.createElement("li");
    li.className = "list-item";

    const textWrap = document.createElement("div");
    textWrap.className = "item-text";
    textWrap.innerHTML = `
      <div class="item-src">${escapeHtml(item.sourceText)}</div>
      <div class="item-trg">${escapeHtml(item.translation)}</div>
      <div class="item-langs">${(languages[item.source] || item.source)} → ${(languages[item.target] || item.target)}</div>
    `;
    textWrap.addEventListener("click", () => loadFromLibrary(item));

    const remove = document.createElement("button");
    remove.className = "item-remove";
    remove.textContent = "✕";
    remove.title = "Usuń";
    remove.addEventListener("click", (e) => {
      e.stopPropagation();
      removeItem(item.id);
    });

    li.appendChild(textWrap);
    li.appendChild(remove);
    listEl.appendChild(li);
  }
}

function loadFromLibrary(item) {
  input.value = item.sourceText;
  output.textContent = item.translation;
  if (languages[item.source]) sourceSel.value = item.source;
  targetSel.value = item.target;
  charCount.textContent = `${input.value.length} / 5000`;
  lastResult = { ...item };
  detected.textContent = "";
  updateFavoriteIcon();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function removeItem(id) {
  if (activeTab === "history") {
    history = history.filter((i) => i.id !== id);
    store.set("history", history);
  } else {
    favorites = favorites.filter((i) => i.id !== id);
    store.set("favorites", favorites);
    updateFavoriteIcon();
  }
  renderList();
}

function clearActiveList() {
  if (activeTab === "history") {
    history = [];
    store.set("history", history);
  } else {
    favorites = [];
    store.set("favorites", favorites);
    updateFavoriteIcon();
  }
  renderList();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
