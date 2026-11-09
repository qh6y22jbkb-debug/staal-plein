/* Woordsoorten: zinnen met labels (woord/zn) omzetten in woordblokjes. Los bestand, zodat de tests het ook kunnen gebruiken. */
import { WOORDSOORTEN, WOORDSOORT_ZINNEN } from '../data/bieb.js';

export const BASIS_SOORTEN = ['lw', 'zn', 'bn', 'ww', 'vz', 'tw'];
export const EXTRA_SOORTEN = ['hww', 'vd', 'vw', 'sbn', 'rtw'];

/**
 * 'De/lw kat/zn slaapt/ww.' → [{ tekst: 'De', soort: 'lw', woord: true }, …, { tekst: '.', woord: false }]
 * Een woord zonder label krijgt soort null (wordt nooit gevraagd).
 */
export function ontleedWoordsoorten(zin) {
  return zin.split(' ').flatMap((stuk) => {
    const m = /^([^/.,!?]+)(?:\/([a-z]+))?([.,!?]*)$/.exec(stuk);
    if (!m) return [{ tekst: stuk, soort: null, woord: true, fout: true }];
    const uit = [{ tekst: m[1], soort: m[2] ?? null, woord: true }];
    if (m[3]) uit.push({ tekst: m[3], woord: false });
    return uit;
  });
}

/** De zin zonder labels (zoals het kind hem ziet). */
export function kaleZin(zin) {
  return ontleedWoordsoorten(zin).map((t) => t.tekst).join(' ').replace(/ ([.,!?])/g, '$1');
}

/** Woordnummers (alleen de woorden, niet de leestekens) van een woordsoort. */
export function nummersVan(zin, soort) {
  return ontleedWoordsoorten(zin).filter((t) => t.woord).map((t, i) => (t.soort === soort ? i : -1)).filter((i) => i >= 0);
}

/** Zinnen voor een niveau: Brons = niveau 1, Zilver = niveau 2, Goud = niveau 3 én 2. */
export function woordsoortZinnen(niveau) {
  return WOORDSOORT_ZINNEN.filter((z) => (niveau === 3 ? z.niveau >= 2 : z.niveau === niveau));
}

export function isWoordsoort(code) {
  return code in WOORDSOORTEN;
}
