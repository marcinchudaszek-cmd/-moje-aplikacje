/* Własne rysunki bierek (SVG, viewBox 100×100). Kod bierki jak w silniku: typ | kolor. */
(function () {
'use strict';
const STYLE = {
  w: { fill: '#fbf8f1', stroke: '#2a2622', detail: '#2a2622' },
  b: { fill: '#3b3633', stroke: '#110f0e', detail: '#ece6da' }
};
const BASE = (x, w) => `<rect x="${x}" y="80" width="${w}" height="9" rx="4"/>`;
const SHAPES = {
  1: d => `
    <path d="M34 80 C34 67 40 59 44 55 L56 55 C60 59 66 67 66 80 Z"/>
    <rect x="37" y="49" width="26" height="7" rx="3.5"/>
    <circle cx="50" cy="35" r="13"/>
    ${BASE(26, 48)}`,
  2: d => `
    <path d="M30 80 C30 68 34 62 42 56 C34 58 26 60 21 56 C16 52 17 45 22 41 L38 26 L41 13 L49 22 C63 23 73 36 72 54 C71 64 69 72 68 80 Z"/>
    <path d="M53 27 C62 33 66 43 66 56" fill="none" stroke="${d.detail}" stroke-width="2.6"/>
    <circle cx="39" cy="36" r="3.2" fill="${d.detail}" stroke="none"/>
    <circle cx="24" cy="49" r="2" fill="${d.detail}" stroke="none"/>
    ${BASE(24, 52)}`,
  3: d => `
    <path d="M34 80 C34 70 40 64 44 60 L56 60 C60 64 66 70 66 80 Z"/>
    <path d="M50 17 C36 29 34 43 40 56 L60 56 C66 43 64 29 50 17 Z"/>
    <path d="M56 31 L46 43" fill="none" stroke="${d.detail}" stroke-width="3.4"/>
    <circle cx="50" cy="13" r="5"/>
    <rect x="36" y="54" width="28" height="7" rx="3.5"/>
    ${BASE(24, 52)}`,
  4: d => `
    <path d="M31 80 L34 48 L66 48 L69 80 Z"/>
    <path d="M27 43 V18 H37 V25 H45 V18 H55 V25 H63 V18 H73 V43 Z"/>
    <rect x="29" y="42" width="42" height="8" rx="2"/>
    <path d="M36 66 H64" fill="none" stroke="${d.detail}" stroke-width="2.4" opacity=".55"/>
    ${BASE(22, 56)}`,
  5: d => `
    <path d="M32 80 C33 68 37 58 38 50 L62 50 C63 58 67 68 68 80 Z"/>
    <path d="M30 50 L22 25 L37 38 L38 19 L47 35 L50 15 L53 35 L62 19 L63 38 L78 25 L70 50 Z"/>
    <circle cx="22" cy="23" r="4.5"/><circle cx="38" cy="17" r="4.5"/><circle cx="50" cy="12" r="4.5"/>
    <circle cx="62" cy="17" r="4.5"/><circle cx="78" cy="23" r="4.5"/>
    <rect x="31" y="47" width="38" height="7" rx="3.5"/>
    ${BASE(22, 56)}`,
  6: d => `
    <path d="M47 5 h6 v7 h7 v6 h-7 v13 h-6 v-13 h-7 v-6 h7 z"/>
    <path d="M33 80 C34 70 38 62 39 54 L61 54 C62 62 66 70 67 80 Z"/>
    <path d="M36 54 C25 46 25 31 38 30 C44 29 48 33 50 38 C52 33 56 29 62 30 C75 31 75 46 64 54 Z"/>
    <rect x="34" y="51" width="32" height="7" rx="3.5"/>
    ${BASE(22, 56)}`
};
const cache = {};
function svg(code) {
  if (cache[code]) return cache[code];
  const t = code & 7, c = (code & 8) ? 'w' : 'b', st = STYLE[c];
  return (cache[code] = `<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${st.fill}" stroke="${st.stroke}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${SHAPES[t](st)}</g></svg>`);
}
window.PIECES = { svg };
})();
