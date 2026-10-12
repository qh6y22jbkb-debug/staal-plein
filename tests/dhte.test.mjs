// DHTE-schema (plus, min, keer): antwoorden, onthoud-cijfers, inwissel-getallen en tussenregels moeten kloppen,
// de regels per niveau moeten gelden, en geen enkel fout antwoord mag goed gerekend worden.
import { maakSom, telOnthoudPlus, inwisselInfo, telOnthoudKeer, cijfersVan } from '../src/rekenen/sommen.js';
import { bouwSchema, kijkNa } from '../src/rekenen/schema.js';
import { REKEN_REGELS, REKEN_TEKSTEN_SPEL } from '../src/data/rekenen.js';
const KOL = REKEN_TEKSTEN_SPEL.kolommen;
const instVarianten = [
  { onthoudPlek: 'boven', onthoudVerplicht: true, nulZelfInvullen: false },
  { onthoudPlek: 'onder', onthoudVerplicht: false, nulZelfInvullen: true },
];
let fouten = 0, sommen = 0, pert = 0;
const meld = (...m) => { if (fouten++ < 25) console.log('FOUT', ...m); };
const rijWaarde = (schema, id) => {
  const r = schema.rijen.find((x) => x.id === id); if (!r) return null;
  let n = 0; for (const [k, c] of Object.entries(r.cellen)) { const v = c.invoer ? c.verwacht : c.waarde; if (v !== '') n += Number(v) * 10 ** Number(k); } return n;
};
for (const soort of ['plus', 'min', 'keer']) {
  for (const niveau of [1, 2, 3]) {
    const r = REKEN_REGELS[soort][niveau];
    for (let i = 0; i < 3000; i++) {
      const som = maakSom(soort, r); sommen++;
      const [a, b] = som.getallen;
      const echt = soort === 'plus' ? som.getallen.reduce((x, y) => x + y, 0) : soort === 'min' ? a - b : a * b;
      if (echt !== som.antwoord) meld('antwoord', som);
      if (soort === 'plus') {
        const reg = r.varianten ? r.varianten.find((v) => v.aantalGetallen === som.getallen.length && som.getallen.every((g) => g >= v.min && g <= v.max)) : r;
        if (!reg) meld('geen passende variant', som);
        else {
          const o = telOnthoudPlus(som.getallen);
          if (o < (reg.onthouden?.min ?? 0) || o > (reg.onthouden?.max ?? 99)) meld('onthouden', som);
          if (som.antwoord > reg.maxUitkomst) meld('te groot', som);
        }
      }
      if (soort === 'min') {
        const info = inwisselInfo(a, b);
        if (!(a > b && b >= r.minTweede && a >= r.min && a <= r.max)) meld('getallen min', som);
        if (info.aantal < (r.inwisselen?.min ?? 0) || info.aantal > (r.inwisselen?.max ?? 99)) meld('inwisselen', som);
        if (r.overNul && !info.overNul) meld('overNul', som);
      }
      if (soort === 'keer') {
        if (String(a).length !== r.cijfersBoven || String(b).length !== r.cijfersOnder) meld('cijfers keer', som);
        if (r.cijfersOnder === 1 && telOnthoudKeer(a, b) < (r.onthouden?.min ?? 0)) meld('onthouden keer', som);
      }
      for (const inst of instVarianten) {
        const sch = bouwSchema(som, inst, KOL);
        if (rijWaarde(sch, 'uitkomst') !== som.antwoord) meld('uitkomstrij', som);
        if (sch.breedte > 5) meld('te breed', som);
        if (soort === 'keer' && b >= 10) {
          if (rijWaarde(sch, 'regel1') !== a * (b % 10)) meld('regel1', som);
          if (rijWaarde(sch, 'regel2') !== a * Math.floor(b / 10) * 10) meld('regel2', som);
        }
        const kn = kijkNa(sch, (c) => c.verwacht);
        if (!kn.allesGoed || kn.onvolledig) meld('juist niet goed', som);
        if (soort === 'min') {
          const ta = cijfersVan(a), tb = cijfersVan(b);
          for (const s of sch.stappen) {
            const [vak, ant] = s.cellen;
            const boven = vak.verwacht === '' ? ta[s.k] : Number(vak.verwacht);
            const antw = ant.verwacht === '' ? 0 : Number(ant.verwacht);
            if (boven - (tb[s.k] ?? 0) !== antw || boven < 0 || boven > 19) meld('min kolom', som, s.k);
          }
          const totaal = sch.stappen.reduce((t, s) => t + (s.cellen[0].verwacht === '' ? ta[s.k] : Number(s.cellen[0].verwacht)) * 10 ** s.k, 0);
          if (totaal !== a) meld('inwisselen verandert de waarde', som);
        }
        for (const cel of sch.cellen) {
          for (let f = 0; f <= 19; f++) {
            const fout = String(f);
            if (fout === cel.verwacht || cel.alsOok.includes(fout) || (cel.verwacht === '' && fout === '0')) continue;
            pert++;
            if (kijkNa(sch, (c) => (c === cel ? fout : c.verwacht)).allesGoed) meld('fout antwoord goedgekeurd', som, cel.id, fout);
          }
          if (cel.soort === 'antwoord' && cel.verwacht !== '') {
            const kn3 = kijkNa(sch, (c) => (c === cel ? '' : c.verwacht));
            if (kn3.allesGoed || !kn3.onvolledig) meld('leeg antwoord goed', som, cel.id);
          }
        }
      }
    }
  }
}
console.log(`${sommen} sommen (plus, min, keer), ${pert} foute invullingen, ${fouten} fouten`);
if (fouten) process.exit(1);
