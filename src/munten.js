/**
 * De munten van de speler. Bewaard in localStorage (los van de stempelvoortgang).
 * Munten kunnen nooit onder 0 komen.
 */
const SLEUTEL = 'staal-blok2-munten';

function lees() {
  try {
    const n = Number(JSON.parse(localStorage.getItem(SLEUTEL))?.totaal);
    return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
  } catch { return 0; }
}

let totaal = lees();
const luisteraars = new Set();

function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify({ totaal })); } catch { /* geen opslag */ }
  for (const f of luisteraars) f(totaal);
}

export const munten = {
  get totaal() { return totaal; },

  voegToe(aantal) {
    const n = Math.floor(aantal);
    if (n <= 0) return;
    totaal += n;
    bewaar();
  },

  /** Uitgeven (voor de winkel). Geeft false als je te weinig munten hebt. */
  geefUit(aantal) {
    if (aantal > totaal) return false;
    totaal -= aantal;
    bewaar();
    return true;
  },

  opVerandering(f) { luisteraars.add(f); },

  wis() {
    totaal = 0;
    bewaar();
  },
};
