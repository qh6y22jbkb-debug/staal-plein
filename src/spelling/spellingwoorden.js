import { SPELLING_WOORDEN, FOUTE_KLANK } from '../data/spelling.js';

/**
 * Een woord uit de data ontleden: 'pro[c]ent' → { woord: 'procent', voor: 'pro', gat: 'c', na: 'ent' }.
 */
export function ontleed(item, cat) {
  const m = /^([^[\]]*)\[([^[\]]+)\]([^[\]]*)$/.exec(item.w);
  if (!m) return null;
  const [, voor, gat, na] = m;
  const woord = voor + gat + na;
  const regel = FOUTE_KLANK[cat] ?? {};
  const fout = item.fout ?? (regel[gat] != null ? voor + regel[gat] + na : null);
  return { woord, voor, gat, na, zin: item.zin, fout, cat };
}

/** Alle woorden van een categorie, ontleed (woorden die niet kloppen worden overgeslagen). */
export function woordenVan(cat) {
  return (SPELLING_WOORDEN[cat] ?? []).map((item) => ontleed(item, cat)).filter(Boolean);
}

/** Getypt antwoord netjes: kleine letters, geen spaties of punt eromheen. */
export function schoon(tekst) {
  return String(tekst ?? '').toLowerCase().replace(/[.!?,;:]/g, '').trim();
}

/** Zilver: klopt het ingevulde stukje? */
export function gatGoed(w, tekst) {
  return schoon(tekst) === w.gat;
}

/** Goud (dictee): klopt het hele woord? */
export function woordGoed(w, tekst) {
  return schoon(tekst) === w.woord;
}

/** De zin met het woord ingevuld (voor het voorlezen en na een goed antwoord). */
export function zinMetWoord(w) {
  return w.zin.replace('___', w.woord);
}
