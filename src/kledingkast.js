import { itemMetId } from './kleding.js';

/**
 * Wat heb je gekocht en wat heb je aan? Bewaard in localStorage.
 * aan = { hoofd, shirt, broek, schoenen, extra: [] }  (één item per categorie, extra's mogen samen)
 */
const SLEUTEL = 'staal-blok2-kleding';

function leeg() {
  return { gekocht: [], aan: { hoofd: null, shirt: null, broek: null, schoenen: null, extra: [] } };
}

function lees() {
  try {
    const d = JSON.parse(localStorage.getItem(SLEUTEL));
    if (d && Array.isArray(d.gekocht)) {
      const basis = leeg();
      return { gekocht: d.gekocht.filter((id) => itemMetId(id)), aan: { ...basis.aan, ...d.aan, extra: d.aan?.extra ?? [] } };
    }
  } catch { /* geen opslag */ }
  return leeg();
}

let staat = lees();
const luisteraars = new Set();

function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
  for (const f of luisteraars) f();
}

export const kledingkast = {
  get gekocht() { return staat.gekocht; },
  /** Kopie van wat je aan hebt. */
  get aan() { return { ...staat.aan, extra: [...staat.aan.extra] }; },
  heeft(id) { return staat.gekocht.includes(id); },
  heeftAan(id) {
    const item = itemMetId(id);
    if (!item) return false;
    return item.categorie === 'extra' ? staat.aan.extra.includes(id) : staat.aan[item.categorie] === id;
  },

  koop(id) {
    if (!staat.gekocht.includes(id)) staat.gekocht.push(id);
    this.trekAan(id);
  },

  trekAan(id) {
    const item = itemMetId(id);
    if (!item || !this.heeft(id)) return;
    if (item.categorie === 'extra') {
      if (!staat.aan.extra.includes(id)) staat.aan.extra.push(id);
    } else {
      staat.aan[item.categorie] = id;
    }
    bewaar();
  },

  trekUit(id) {
    const item = itemMetId(id);
    if (!item) return;
    if (item.categorie === 'extra') staat.aan.extra = staat.aan.extra.filter((x) => x !== id);
    else if (staat.aan[item.categorie] === id) staat.aan[item.categorie] = null;
    bewaar();
  },

  wissel(id) {
    if (this.heeftAan(id)) this.trekUit(id);
    else this.trekAan(id);
  },

  /** Uitrusting met één item er tijdelijk bij (om te passen in de winkel). */
  metPasItem(id) {
    const u = this.aan;
    const item = itemMetId(id);
    if (!item) return u;
    if (item.categorie === 'extra') { if (!u.extra.includes(id)) u.extra.push(id); } else u[item.categorie] = id;
    return u;
  },

  opVerandering(f) { luisteraars.add(f); },

  wis() {
    staat = leeg();
    bewaar();
  },
};
