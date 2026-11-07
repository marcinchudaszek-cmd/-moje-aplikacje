/* Wątek komputera — liczy ruchy, żeby interfejs nie zamarzał. */
importScripts('engine.js?v=1.1.0'); // numer wersji = świeży plik po aktualizacji
self.onmessage = (e) => {
  const msg = e.data;
  let res;
  try { res = self.ChessEngine.runRequest(msg); } catch (err) { res = { error: String(err) }; }
  self.postMessage(Object.assign({ id: msg.id, kind: msg.kind }, res));
};
