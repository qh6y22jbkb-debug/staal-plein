import { BIEB_ZINNEN, BIEB_TELZINNEN } from '../data/bieb.js';
import { woordsoortZinnen } from './woordsoorten.js';

/** Welke zinnen passen bij een leesplek en een niveau? */
export function zinnenVoor(plek, niveau) {
  if (plek.woordsoorten) return woordsoortZinnen(niveau); // Wanda Woordsoort
  // Ronja Rangtelwoord heeft eigen zinnen (met rangtelwoorden en hoofdtelwoorden).
  let pool = (plek.telzinnen ? BIEB_TELZINNEN : BIEB_ZINNEN).filter((z) => z.niveau === niveau);
  const zoekt = niveau === 3 ? plek.goud : [plek.zoek];
  if (zoekt.includes('vz')) pool = pool.filter((z) => z.vz.length); // voorzetsels zoeken: er moet er een zijn
  if (plek.zoek === 'lv' && niveau === 1) pool = pool.filter((z) => z.lv); // Brons: altijd een lijdend voorwerp
  return pool;
}
