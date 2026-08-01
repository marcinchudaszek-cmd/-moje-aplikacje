import fs from "fs";

const FILE = "C:/Users/marci/Desktop/Projekty/moje-aplikacje-strona/index.html";
let html = fs.readFileSync(FILE, "utf8");

const re = /var embeddedSiteData = (\{.*?\});/s;
const data = JSON.parse(html.match(re)[1]);

// --- liczby wyliczone z danych (nie wpisywane na sztywno) ---
const total = data.apps.length;
const play  = data.apps.filter(a => a.playstore).length;
const games = data.apps.filter(a => a.category === "games").length;

const PL1 = "Nazywam się Marcin Chudaszek — jestem niezależnym deweloperem z Dolnego Śląska, żyjącym między Polską a Niemcami. Każdą aplikację buduję sam: od pierwszego commita, przez ikony i opisy, aż po publikację w Google Play.";
const PL2 = `Beagle Apps Studio to nie tylko nazwa — to mój trójkolorowy beagle, który siedzi obok podczas każdej sesji kodowania. ${total} aplikacji i gier, z czego ${play} w Google Play, a do tego autorska muzyka, filmy i grafika AI. Każdy projekt zaczyna się od osobistej pasji: dartów, muzyki, roślin, nauki języków.`;

const EN1 = "My name is Marcin Chudaszek — an independent developer from Lower Silesia, living between Poland and Germany. I build every app myself: from the first commit through icons and store listings all the way to release on Google Play.";
const EN2 = `Beagle Apps Studio isn't just a name — it's my tricolor beagle who sits beside me through every coding session. ${total} apps and games, ${play} of them on Google Play, plus original music, short films and AI art. Every project starts from a personal passion: darts, music, plants, learning languages.`;

const DE1 = "Ich heiße Marcin Chudaszek — ein unabhängiger Entwickler aus Niederschlesien, der zwischen Polen und Deutschland lebt. Jede App baue ich selbst: vom ersten Commit über Icons und Store-Texte bis zur Veröffentlichung bei Google Play.";
const DE2 = `Beagle Apps Studio ist nicht nur ein Name — es ist mein dreifarbiger Beagle, der bei jeder Coding-Session neben mir sitzt. ${total} Apps und Spiele, davon ${play} bei Google Play, dazu eigene Musik, Kurzfilme und KI-Grafik. Jedes Projekt beginnt mit einer persönlichen Leidenschaft: Darts, Musik, Pflanzen, Sprachenlernen.`;

// --- 1) dane profilu (to renderuje się przy wejściu na stronę) ---
data.profile.aboutText1 = PL1;
data.profile.aboutText2 = PL2;
html = html.replace(re, "var embeddedSiteData = " + JSON.stringify(data) + ";");

// --- 2) i18n: about_text1/2 w kolejności PL, EN, DE ---
const q = s => "'" + s.replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
const texts = [[PL1, PL2], [EN1, EN2], [DE1, DE2]];

["about_text1", "about_text2"].forEach((key, ti) => {
  let i = 0;
  const rx = new RegExp("(" + key + ": )([\"'])(?:\\\\.|(?!\\2)[\\s\\S])*?\\2", "g");
  html = html.replace(rx, (m, p1) => {
    const val = texts[i] ? texts[i][ti] : null;
    i++;
    return val === null ? m : p1 + q(val);
  });
  if (i !== 3) throw new Error(`${key}: znaleziono ${i} wystąpień zamiast 3`);
});

// --- 3) highlights (hl1 = liczba w Play, hl2 = liczba gier) ---
// odmiana polskiego liczebnika: 1 gra / 2-4 gry / 5+ gier
const plGry = n => {
  const d = n % 10, s = n % 100;
  if (n === 1) return "gra";
  if (d >= 2 && d <= 4 && !(s >= 12 && s <= 14)) return "gry";
  return "gier";
};

const hl = [
  ["hl1", [`${play} aplikacji w Google Play`, `${play} apps on Google Play`, `${play} Apps bei Google Play`]],
  ["hl2", [`${games} ${plGry(games)} — Android i przeglądarka`, `${games} games — Android and browser`, `${games} Spiele — Android und Browser`]],
];
for (const [key, vals] of hl) {
  let i = 0;
  const rx = new RegExp("(" + key + ": )([\"'])(?:\\\\.|(?!\\2)[\\s\\S])*?\\2", "g");
  html = html.replace(rx, (m, p1) => {
    const v = vals[i]; i++;
    return v === undefined ? m : p1 + q(v);
  });
  if (i !== 3) throw new Error(`${key}: znaleziono ${i} wystąpień zamiast 3`);
}

fs.writeFileSync(FILE, html);
console.log(`OK — aplikacji: ${total}, w Google Play: ${play}, gier: ${games}`);
