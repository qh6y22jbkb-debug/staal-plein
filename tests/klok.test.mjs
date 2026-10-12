import { inWoorden, inWoordenMetDagdeel, digitaal12, digitaal24, maakKlokVragen, normaal, gelijk12, uitlegTijdsduur } from '../src/rekenen/tijd.js';
import { REKEN_REGELS, KLOK_TEKSTEN } from '../src/data/rekenen.js';
let fouten = 0, n = 0;
const meld = (...m) => { if (fouten++ < 20) console.log('FOUT', ...m); };
// Onafhankelijke terugvertaler: woorden → minuten na 12 uur (0..719)
const G = { 'één': 1, twee: 2, drie: 3, vier: 4, vijf: 5, zes: 6, zeven: 7, acht: 8, negen: 9, tien: 10, elf: 11, twaalf: 12, dertien: 13, veertien: 14 };
function terug(w) {
  let m;
  const u = (x) => (G[x] % 12);
  if ((m = w.match(/^(\S+) uur$/))) return u(m[1]) * 60;
  if ((m = w.match(/^kwart over (\S+)$/))) return u(m[1]) * 60 + 15;
  if ((m = w.match(/^kwart voor (\S+)$/))) return (u(m[1]) * 60 - 15 + 720) % 720;
  if ((m = w.match(/^half (\S+)$/))) return (u(m[1]) * 60 - 30 + 720) % 720;
  if ((m = w.match(/^(\S+) voor half (\S+)$/))) return (u(m[2]) * 60 - 30 - G[m[1]] + 720) % 720;
  if ((m = w.match(/^(\S+) over half (\S+)$/))) return (u(m[2]) * 60 - 30 + G[m[1]] + 720) % 720;
  if ((m = w.match(/^(\S+) over (\S+)$/))) return u(m[2]) * 60 + G[m[1]];
  if ((m = w.match(/^(\S+) voor (\S+)$/))) return (u(m[2]) * 60 - G[m[1]] + 720) % 720;
  return null;
}
const woordenSet = new Set();
for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m++) {
  const w = inWoorden({ h, m }); n++;
  if (terug(w) !== (h % 12) * 60 + m) meld('woorden', h, m, w, terug(w));
  // zinnen die je niet zegt
  if (/(één|twee|drie|vier|vijf|zes|zeven|acht|negen|tien|elf|twaalf|dertien|veertien) (over|voor) half/.test(w) && (m === 15 || m === 45)) meld('kwart', w);
  if (/vijftien|nul/.test(w)) meld('raar woord', w);
  if (h < 12) woordenSet.add(w);
  const d = inWoordenMetDagdeel({ h, m });
  if (h === 14 && m === 35 && d !== "vijf over half drie 's middags") meld('voorbeeld 14:35', d);
}
if (woordenSet.size !== 720) meld('woorden niet uniek', woordenSet.size);
// Vragen
let vragen = 0;
for (const niveau of [1, 2, 3]) {
  const r = REKEN_REGELS.klok[niveau];
  for (let i = 0; i < 4000; i++) {
    for (const v of maakKlokVragen(r, 6, KLOK_TEKSTEN)) {
      vragen++;
      if (!r.soorten.includes(v.type)) meld('soort', v.type);
      if (v.tijd.m % r.minuten !== 0 && v.type !== 'tijdsduur') meld('minuten', v);
      if (v.soort === 'kies') {
        const goed = v.opties.filter((o) => o.goed);
        if (goed.length !== 1 || v.opties.length !== 3) meld('opties', v.type, v.opties.length, goed.length);
        if (new Set(v.opties.map((o) => o.label)).size !== v.opties.length) meld('dubbele opties', v.opties);
        const tekst = { kiesAnaloogWoorden: inWoorden, kiesAnaloogDigitaal: digitaal12, kiesDigitaalAnaloog: digitaal12, kies24Woorden: inWoordenMetDagdeel, kiesWoorden24: digitaal24, tijdsduur: digitaal24 }[v.type];
        if (goed[0].label !== tekst(v.tijd)) meld('goed label', v.type, goed[0].label);
        // Geen fout antwoord dat eigenlijk ook goed is
        for (const o of v.opties.filter((x) => !x.goed)) {
          if (['kiesAnaloogWoorden', 'kiesAnaloogDigitaal', 'kiesDigitaalAnaloog'].includes(v.type) && gelijk12(o.tijd, v.tijd)) meld('fout = goed (12u)', v.type, o, v.tijd);
          if (['kies24Woorden', 'kiesWoorden24', 'tijdsduur'].includes(v.type) && o.tijd.h === v.tijd.h && o.tijd.m === v.tijd.m) meld('fout = goed (24u)', v.type);
          if (o.tijd.h < 0 || o.tijd.h > 23 || o.tijd.m < 0 || o.tijd.m > 59) meld('ongeldige tijd', o);
        }
        if (v.type === 'tijdsduur') {
          const eind = normaal({ h: v.begin.h, m: v.begin.m + v.duur });
          if (eind.h !== v.tijd.h || eind.m !== v.tijd.m) meld('tijdsduur', v);
          if (!uitlegTijdsduur(v.begin, v.duur).endsWith(`om ${digitaal24(eind)}.`)) meld('uitleg duur', v.uitleg);
          if (v.begin.m + (v.duur % 60) < 60) meld('niet over het uur', v);
        }
        if (v.type === 'kies24Woorden' || v.type === 'kiesWoorden24') if (v.tijd.h < 13) meld('24 uur', v.tijd);
      } else {
        if (v.doel.h !== v.tijd.h % 12 || v.doel.m !== v.tijd.m) meld('doel', v);
        if (v.type === 'versleep24' && (v.tijd.h < 13 || !v.toonTekst.startsWith(String(v.tijd.h)))) meld('versleep24', v);
      }
    }
  }
}
console.log(`${n} tijden in woorden, ${vragen} klokvragen getest, ${fouten} fouten`);

if (fouten) process.exit(1);
