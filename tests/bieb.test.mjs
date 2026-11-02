// De Bieb: alle zinnen en antwoorden nakijken.
// - Elk zinsdeel (pv, ow, wg, lv, vz) is precies terug te vinden in de zin, zonder twijfel welk woord bedoeld is.
// - De persoonsvorm hoort bij het werkwoordelijk gezegde en is het eerste werkwoord daarvan.
// - Onderwerp, lijdend voorwerp en gezegde overlappen elkaar niet.
// - Alle voorzetsels uit de lijst hieronder die in de zin staan, zijn ook als antwoord opgegeven (er wordt er geen vergeten).
// - Per leesplek en per niveau zijn er minstens 15 zinnen; geen keuze die fout is wordt goed gerekend.
import { BIEB_ZINNEN, BIEB_PLEKKEN } from '../src/data/bieb.js';
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

// Genoeg zinnen per leesplek en niveau.
for (const plek of BIEB_PLEKKEN) {
  for (const n of [1, 2, 3]) {
    let pool = BIEB_ZINNEN.filter((z) => z.niveau === n);
    if (plek.zoek === 'vz') pool = pool.filter((z) => z.vz.length);
    if (plek.zoek === 'lv' && n === 1) pool = pool.filter((z) => z.lv);
    if (pool.length < 15) meld(plek.id, `niveau ${n}: maar ${pool.length} zinnen`);
  }
  if (!plek.begroeting || !plek.uitleg?.length || plek.niveaus?.length !== 3) meld('leesplek niet compleet', plek.id);
}

console.log(`${BIEB_ZINNEN.length} biebzinnen, ${controles} controles, ${fouten} fouten`);
if (fouten) process.exit(1);
