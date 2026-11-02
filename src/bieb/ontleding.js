/* Zinnen van de Bieb opdelen in woordblokjes en nakijken (los bestand, zodat de tests het ook kunnen gebruiken). */

const klein = (t) => t.toLowerCase();

/** Zin → lijst van stukjes: { tekst, woord: true/false }. Leestekens zijn geen woordblokje. */
export function blokjes(zin) {
  return zin.split(' ').flatMap((stuk) => {
    const m = /^(.*?)([.,!?]*)$/.exec(stuk);
    return [{ tekst: m[1], woord: true }, ...(m[2] ? [{ tekst: m[2], woord: false }] : [])].filter((x) => x.tekst);
  });
}

/** Alleen de woorden (met hun plek in de lijst van blokjes). */
export function woorden(zin) {
  return blokjes(zin).map((b, i) => ({ ...b, i })).filter((b) => b.woord);
}

/** Zoek de woorden van een aaneengesloten stuk (onderwerp, lijdend voorwerp). Geeft de woordnummers, of null. */
function zoekStuk(lijst, stuk) {
  const deel = stuk.split(' ').map(klein);
  for (let s = 0; s + deel.length <= lijst.length; s++) {
    if (deel.every((d, k) => klein(lijst[s + k].tekst) === d)) return deel.map((_, k) => s + k);
  }
  return null;
}

/** Zoek losse woorden in volgorde (werkwoordelijk gezegde, voorzetsels). */
function zoekLos(lijst, losse) {
  const uit = [];
  let vanaf = 0;
  for (const w of losse) {
    const n = lijst.findIndex((x, i) => i >= vanaf && klein(x.tekst) === klein(w));
    if (n < 0) return null;
    uit.push(n);
    vanaf = n + 1;
  }
  return uit;
}

/**
 * Welke woorden (nummers in woorden(zin)) horen bij een zinsdeel?
 * soort: 'pv' | 'ow' | 'wg' | 'lv' | 'vz'. Geeft [] als het zinsdeel er niet is (lv = null), of null als het niet klopt.
 */
export function antwoordVan(vraag, soort) {
  const lijst = woorden(vraag.zin);
  if (soort === 'lv' && vraag.lv == null) return [];
  if (soort === 'pv' || soort === 'ow' || soort === 'lv') return zoekStuk(lijst, vraag[soort]);
  if (soort === 'wg') return zoekLos(lijst, vraag.wg.split(' '));
  if (soort === 'vz') return zoekLos(lijst, vraag.vz);
  return null;
}

/** Klopt de keuze van het kind precies (niet te veel, niet te weinig)? */
export function keuzeGoed(vraag, soort, gekozen) {
  const goed = antwoordVan(vraag, soort) ?? [];
  const a = [...new Set(gekozen)].sort((x, y) => x - y);
  return a.length === goed.length && a.every((n, i) => n === [...goed].sort((x, y) => x - y)[i]);
}

/** De woorden van een antwoord als tekst (voor "het goede antwoord is …"). */
export function antwoordTekst(vraag, soort) {
  const lijst = woorden(vraag.zin);
  const nrs = antwoordVan(vraag, soort) ?? [];
  return nrs.map((n) => lijst[n].tekst).join(' ');
}
