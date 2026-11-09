// De Bieb: alle zinnen en antwoorden nakijken.
// - Elk zinsdeel (pv, ow, wg, lv, vz) is precies terug te vinden in de zin, zonder twijfel welk woord bedoeld is.
// - De persoonsvorm hoort bij het werkwoordelijk gezegde en is het eerste werkwoord daarvan.
// - Onderwerp, lijdend voorwerp en gezegde overlappen elkaar niet.
// - Alle voorzetsels uit de lijst hieronder die in de zin staan, zijn ook als antwoord opgegeven (er wordt er geen vergeten).
// - Per leesplek en per niveau zijn er minstens 15 zinnen; geen keuze die fout is wordt goed gerekend.
// - Rangtelwoord: alle rang- en hoofdtelwoorden in de zin zijn opgegeven; strikvragen (vierde als werkwoord) staan bij 'geen'.
import { BIEB_ZINNEN, BIEB_PLEKKEN, BIEB_TELZINNEN } from '../src/data/bieb.js';
import { zinnenVoor } from '../src/bieb/zinnen.js';
import { woorden, antwoordVan, keuzeGoed } from '../src/bieb/ontleding.js';

const VOORZETSELS = ['aan', 'achter', 'bij', 'boven', 'door', 'in', 'langs', 'met', 'na', 'naar', 'naast', 'om', 'onder', 'op', 'over',
  'sinds', 'tegen', 'tijdens', 'tot', 'tussen', 'uit', 'van', 'voor', 'zonder'];
let fouten = 0, controles = 0;
const meld = (...m) => { fouten++; console.log('FOUT', ...m); };

for (const v of BIEB_ZINNEN) {
  const lijst = woorden(v.zin);
  const tel = (w) => lijst.filter((x) => x.tekst.toLowerCase() === w.toLowerCase()).length;
  const pv = antwoordVan(v, 'pv'), ow = antwoordVan(v, 'ow'), wg = antwoordVan(v, 'wg'), lv = antwoordVan(v, 'lv'), vz = antwoordVan(v, 'vz');
  controles += 5;
  if (!pv || pv.length !== 1) meld('pv niet gevonden', v.zin);
  if (!ow?.length) meld('ow niet gevonden', v.zin);
  if (!wg?.length) meld('wg niet gevonden', v.zin);
  if (lv == null) meld('lv niet gevonden', v.zin);
  if (vz == null) meld('vz niet gevonden', v.zin);
  if (!pv || !ow || !wg || lv == null || vz == null) continue;
  // Geen twijfel: werkwoorden en voorzetsels staan maar één keer in de zin.
  for (const w of [...v.wg.split(' '), ...v.vz]) if (tel(w) !== 1) meld('woord staat vaker in de zin', w, v.zin);
  if (wg[0] !== pv[0]) meld('pv is niet het eerste woord van het gezegde', v.zin);
  const overlap = (a, b) => a.some((x) => b.includes(x));
  if (overlap(ow, wg) || overlap(lv, wg) || overlap(ow, lv)) meld('zinsdelen overlappen', v.zin);
  // Vergeten voorzetsels?
  const gevonden = lijst.filter((x) => VOORZETSELS.includes(x.tekst.toLowerCase())).map((x) => x.tekst.toLowerCase());
  const opgegeven = v.vz.map((x) => x.toLowerCase());
  if (gevonden.join(' ') !== opgegeven.join(' ')) meld('voorzetsels kloppen niet', v.zin, gevonden, opgegeven);
  for (const w of opgegeven) if (!VOORZETSELS.includes(w)) meld('onbekend voorzetsel', w, v.zin);
  // Nakijken: het goede antwoord is goed, een woord meer of minder is fout.
  for (const soort of ['pv', 'ow', 'wg', 'lv', 'vz']) {
    const goed = antwoordVan(v, soort);
    controles++;
    if (!keuzeGoed(v, soort, goed)) meld('goed antwoord niet goed gerekend', soort, v.zin);
    for (let i = 0; i < lijst.length; i++) {
      controles++;
      const meer = goed.includes(i) ? goed.filter((x) => x !== i) : [...goed, i];
      if (keuzeGoed(v, soort, meer)) meld('fout antwoord goed gerekend', soort, v.zin, meer);
    }
  }
}

// Rangtelwoorden: elk rangtelwoord en hoofdtelwoord in de zin is opgegeven (of staat bij 'geen'), en niets dubbel.
const RANG = new Set(['eerste', 'tweede', 'derde', 'vierde', 'vijfde', 'zesde', 'zevende', 'achtste', 'negende', 'tiende', 'elfde', 'twaalfde',
  'dertiende', 'veertiende', 'vijftiende', 'twintigste', 'dertigste', 'veertigste', 'vijftigste', 'tachtigste', 'negentigste', 'honderdste', 'duizendste']);
const HOOFD = new Set(['twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'twintig', 'dertig',
  'veertig', 'vijftig', 'tachtig', 'negentig', 'honderd', 'duizend']);
for (const v of BIEB_TELZINNEN) {
  const lijst = woorden(v.zin).map((x) => x.tekst.toLowerCase());
  const geen = (v.geen ?? []).map((x) => x.toLowerCase());
  const rt = antwoordVan(v, 'rt'), ht = antwoordVan(v, 'ht');
  controles += 4;
  if (!rt?.length) meld('rangtelwoord niet gevonden', v.zin);
  if (ht == null) meld('hoofdtelwoord niet gevonden', v.zin);
  if (!rt || ht == null) continue;
  const rtIn = lijst.filter((w) => RANG.has(w) && !geen.includes(w));
  const htIn = lijst.filter((w) => HOOFD.has(w));
  if (rtIn.join(' ') !== v.rt.map((x) => x.toLowerCase()).join(' ')) meld('rangtelwoorden kloppen niet', v.zin, rtIn, v.rt);
  if (htIn.join(' ') !== v.ht.map((x) => x.toLowerCase()).join(' ')) meld('hoofdtelwoorden kloppen niet', v.zin, htIn, v.ht);
  for (const w of [...v.rt, ...v.ht, ...geen]) if (lijst.filter((x) => x === w.toLowerCase()).length !== 1) meld('telwoord staat vaker in de zin', w, v.zin);
  if (/\d/.test(v.zin)) meld('getal in cijfers (schrijf het in letters)', v.zin);
  for (const soort of ['rt', 'ht']) {
    const goed = antwoordVan(v, soort);
    for (let i = 0; i < lijst.length; i++) {
      controles++;
      const meer = goed.includes(i) ? goed.filter((x) => x !== i) : [...goed, i];
      if (meer.length && keuzeGoed(v, soort, meer)) meld('fout antwoord goed gerekend', soort, v.zin);
    }
  }
}
// Goud bij Ronja: rangtelwoorden en hoofdtelwoorden; er zijn zinnen met en zonder hoofdtelwoord, en strikvragen.
const goudTel = BIEB_TELZINNEN.filter((z) => z.niveau === 3);
if (!goudTel.some((z) => !z.ht.length) || !goudTel.some((z) => z.geen?.length)) meld('Goud bij Ronja mist zinnen zonder hoofdtelwoord of strikvragen');
if (BIEB_TELZINNEN.filter((z) => z.niveau === 2).some((z) => !z.ht.length)) meld('Zilver bij Ronja: elke zin moet een hoofdtelwoord als valkuil hebben');

// Genoeg zinnen per leesplek en niveau.
for (const plek of BIEB_PLEKKEN) {
  for (const n of [1, 2, 3]) {
    const pool = zinnenVoor(plek, n);
    if (pool.length < 15) meld(plek.id, `niveau ${n}: maar ${pool.length} zinnen`);
  }
  if (!plek.begroeting || !plek.uitleg?.length || plek.niveaus?.length !== 3) meld('leesplek niet compleet', plek.id);
}

console.log(`${BIEB_ZINNEN.length + BIEB_TELZINNEN.length} biebzinnen, ${controles} controles, ${fouten} fouten`);
if (fouten) process.exit(1);
