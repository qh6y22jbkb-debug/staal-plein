// Staartdeling: elke deelsom, elk keer-getal, elk aftrekken, elk cijfer naar beneden en de rest moeten kloppen,
// en geen enkel fout antwoord mag goed gerekend worden.
import { maakSom } from '../src/rekenen/sommen.js';
import { kijkNa } from '../src/rekenen/schema.js';
import { bouwStaartdeling } from '../src/rekenen/staartdeling.js';
import { REKEN_REGELS } from '../src/data/rekenen.js';
let fouten = 0, sommen = 0, pert = 0;
const meld = (...m) => { if (fouten++ < 20) console.log('FOUT', ...m); };
const waarde = (rij) => { let n = 0; for (const [k, c] of Object.entries(rij.cellen)) { const v = c.invoer ? c.verwacht : c.waarde; if (v !== '') n += Number(v) * 10 ** Number(k); } return n; };
for (const niveau of [1, 2, 3]) {
  const r = REKEN_REGELS.deel[niveau];
  for (let t = 0; t < 6000; t++) {
    const som = maakSom('deel', r); sommen++;
    const [D, d] = som.getallen;
    if (som.antwoord !== Math.floor(D / d) || som.rest !== D % d) meld('antwoord', som);
    const reg = r.varianten ? r.varianten.find((v) => D >= v.deeltal.min && D <= v.deeltal.max && d >= v.deelgetal.min && d <= v.deelgetal.max) : r;
    if (!reg) meld('regels', som);
    else {
      if (reg.rest === 'nee' && som.rest !== 0) meld('rest moet 0', som);
      if (reg.rest === 'ja' && som.rest === 0) meld('rest moet > 0', som);
    }
    const sch = bouwStaartdeling(som);
    const antw = sch.rijen.find((x) => x.soort === 'antwoord');
    if (waarde(antw) !== som.antwoord) meld('antwoordrij', som);
    if (som.rest > 0 && antw.rest?.verwacht !== String(som.rest)) meld('restvak', som);
    if (som.rest === 0 && antw.rest) meld('restvak terwijl geen rest', som);
    const rijen = sch.rijen;
    let idx = rijen.findIndex((x) => x.soort === 'deeltal') + 1;
    for (const st of sch.stappen) {
      const keer = rijen[idx], lijn = rijen[idx + 1], aftrek = rijen[idx + 2];
      idx += 3;
      if (keer.soort !== 'keer' || lijn.soort !== 'lijn' || aftrek.soort !== 'aftrek') { meld('rijvolgorde', som); break; }
      const q = Number(st.cellen[0].verwacht);
      if (waarde(keer) !== q * d * 10 ** st.k) meld('keer-getal', som, st.nr);
      const aftrekCellen = Object.values(aftrek.cellen).filter((c) => c.soort === 'aftrek');
      const rest = aftrekCellen.reduce((s, c) => s + (c.verwacht === '' ? 0 : Number(c.verwacht) * 10 ** (c.k - st.k)), 0);
      if (rest !== st.stukje - q * d || rest < 0 || rest >= d) meld('aftrekken', som, st.nr);
      const omlaag = Object.values(aftrek.cellen).find((c) => c.soort === 'omlaag');
      if (omlaag && omlaag.verwacht !== String(D)[String(D).length - 1 - omlaag.k]) meld('omlaag', som);
    }
    const kn = kijkNa(sch, (c) => c.verwacht);
    if (!kn.allesGoed || kn.onvolledig) meld('juist niet goed', som);
    for (const cel of sch.cellen) {
      for (let f = 0; f <= 12; f++) {
        const fout = String(f);
        if (fout === cel.verwacht || (cel.verwacht === '' && fout === '0')) continue;
        pert++;
        if (kijkNa(sch, (c) => (c === cel ? fout : c.verwacht)).allesGoed) meld('fout goed', som, cel.id, fout);
      }
      if (cel.verwacht !== '') {
        const k2 = kijkNa(sch, (c) => (c === cel ? '' : c.verwacht));
        if (k2.allesGoed || !k2.onvolledig) meld('leeg goed', som, cel.id);
      }
    }
  }
}
console.log(`${sommen} deelsommen, ${pert} foute invullingen, ${fouten} fouten`);
if (fouten) process.exit(1);
