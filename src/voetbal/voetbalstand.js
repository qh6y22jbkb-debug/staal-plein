/**
 * Voortgang in de Voetbalwereld, bewaard in localStorage.
 * poortOpen: is de poort al eens opengegaan
 * verslagen: id's van verslagen tegenstanders, beker: Bunders Beker gewonnen
 */
const SLEUTEL = 'staal-blok2-voetbal';

function leeg() {
  return { poortOpen: false, verslagen: [], beker: false };
}

function lees() {
  try {
    const d = JSON.parse(localStorage.getItem(SLEUTEL));
    if (d && typeof d === 'object') return { ...leeg(), ...d, verslagen: Array.isArray(d.verslagen) ? d.verslagen : [] };
  } catch { /* geen opslag */ }
  return leeg();
}

let staat = lees();

function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
}

export const voetbalstand = {
  get poortOpen() { return staat.poortOpen; },
  zetPoortOpen() { staat.poortOpen = true; bewaar(); },
  get verslagen() { return [...staat.verslagen]; },
  isVerslagen(id) { return staat.verslagen.includes(id); },
  zetVerslagen(id) { if (!staat.verslagen.includes(id)) { staat.verslagen.push(id); bewaar(); } },
  get beker() { return staat.beker; },
  zetBeker() { staat.beker = true; bewaar(); },
  wis() { staat = leeg(); bewaar(); },
};
