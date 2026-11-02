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
  // Alle foute schrijfwijzen: een vaste uit de data, of die het spel maakt met de regels per categorie.
  const fouten = item.fout ? [item.fout] : (regel[gat] ?? []).map((klank) => voor + klank + na);
  return { woord, voor, gat, na, zin: item.zin, fouten: fouten.filter((f) => f !== woord), lang: !!item.lang, cat };
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

/** Een willekeurige foute schrijfwijze van dit woord. */
export function foutVan(w) {
  return w.fouten[Math.floor(Math.random() * w.fouten.length)];
}

/** Een zin in losse stukjes: woorden (klikbaar) en leestekens. Het gat (___) wordt het woord zelf. */
export function zinInStukjes(zin, invul) {
  return zin.split(' ').flatMap((stuk) => {
    if (!stuk.includes('___')) {
      const m = /^(.*?)([.,!?]*)$/.exec(stuk);
      return [{ tekst: m[1], woord: true }, ...(m[2] ? [{ tekst: m[2], woord: false }] : [])];
    }
    const [voor, na] = stuk.split('___');
    return [
      ...(voor ? [{ tekst: voor, woord: false }] : []),
      { tekst: invul, woord: true, isHetWoord: true },
      ...(na ? [{ tekst: na, woord: false }] : []),
    ];
  });
}

/** De zin met het woord ingevuld (voor het voorlezen en na een goed antwoord). */
export function zinMetWoord(w) {
  return w.zin.replace('___', w.woord);
}
