import { maakTafelSommen, antwoordGoed, uitlegTafel, tafelRij, Tempo } from '../src/rekenen/tafels.js';
import { REKEN_REGELS } from '../src/data/rekenen.js';
let fouten = 0, sommen = 0, pert = 0;
const meld = (...m) => { if (fouten++ < 20) console.log('FOUT', ...m); };
for (const niveau of [1, 2, 3]) {
  const r = REKEN_REGELS.tafel[niveau];
  for (const keuze of [...r.tafels, null]) {
    for (let i = 0; i < 2000; i++) {
      const lijst = maakTafelSommen(r, keuze, 10);
      if (lijst.length !== 10) meld('aantal');
      lijst.forEach((s, j) => {
        sommen++;
        if (j && lijst[j - 1].vraag === s.vraag) meld('dubbel achter elkaar', s.vraag);
        const toegestaan = keuze == null ? r.doorElkaar : [keuze];
        if (!toegestaan.includes(s.tafel)) meld('tafel', niveau, keuze, s);
        if (s.a < 1 || s.a > 10) meld('a', s);
        if (s.soort === 'deel' && !r.deelsommen) meld('deelsom op brons', s);
        const echt = s.soort === 'keer' ? s.a * s.tafel : (s.a * s.tafel) / s.tafel;
        if (s.antwoord !== echt) meld('antwoord', s);
        if (s.soort === 'keer' && s.vraag !== `${s.a} × ${s.tafel}`) meld('vraag', s);
        if (s.soort === 'deel' && s.vraag !== `${s.a * s.tafel} : ${s.tafel}`) meld('vraag deel', s);
        if (!antwoordGoed(s, String(s.antwoord)) || !antwoordGoed(s, ` ${s.antwoord} `)) meld('goed niet goed', s);
        for (let f = 0; f <= 110; f++) { if (f === s.antwoord) continue; pert++; if (antwoordGoed(s, String(f))) meld('fout goed', s, f); }
        for (const raar of ['', ' ', `${s.antwoord}a`, `-${s.antwoord}`, `${s.antwoord}.5`, `${String(s.antwoord).split('').join(' ')}`.length > 1 && s.antwoord > 9 ? String(s.antwoord).split('').join(' ') : 'x']) {
          pert++; if (antwoordGoed(s, raar)) meld('raar goed', s, raar);
        }
        const u = uitlegTafel(s);
        if (s.soort === 'keer' && !u.includes(String(s.antwoord))) meld('uitleg keer', u);
        if (s.soort === 'deel' && !u.endsWith(`= ${s.a}.`)) meld('uitleg deel', u);
        const rij = tafelRij(s);
        if (rij.length !== s.a || rij.at(-1) !== s.a * s.tafel) meld('rij', s);
      });
    }
  }
}
// Alle uitleg-zinnen eenmaal controleren op rekenwerk: alle "x × y = z" en "x + y = z" en "x − y = z" in de tekst kloppen.
for (let t = 1; t <= 10; t++) for (let a = 1; a <= 10; a++) for (const soort of ['keer', 'deel']) {
  const s = soort === 'keer' ? { soort, a, tafel: t, getal: a * t, vraag: `${a} × ${t}`, antwoord: a * t } : { soort, a, tafel: t, getal: a * t, vraag: `${a * t} : ${t}`, antwoord: a };
  const u = uitlegTafel(s);
  for (const [, x, op, y, z] of u.matchAll(/(\d+) ([×+−:]) (\d+) = (\d+)/g)) {
    const w = op === '×' ? x * y : op === '+' ? +x + +y : op === '−' ? x - y : x / y;
    if (w !== +z) meld('rekenfout in uitleg', u);
  }
}
// Tempo van Tijn: kinderen met verschillende snelheden (seconden per som), races van 10 sommen.
// Een kind moet meestal winnen, ook als het rustig rekent (geen straf voor langzaam zijn).
const uitslag = {};
for (const snel of [3, 6, 12, 20]) {
  let wint = 0;
  for (let race = 0; race < 1000; race++) {
    const tempo = new Tempo(10); let kind = 0, tijd = 0, start = 0, duur = snel * (0.6 + Math.random() * 0.8);
    while (kind < 10 && !tempo.klaar) {
      tijd += 0.05; tempo.update(0.05, kind);
      if (tijd - start >= duur) { kind++; tempo.registreer(tijd - start); start = tijd; duur = snel * (0.6 + Math.random() * 0.8); }
    }
    if (kind >= 10) wint++;
  }
  uitslag[`${snel}s per som`] = `${Math.round(wint / 10)}% gewonnen`;
  if (wint < 800) meld('Tijn wint te vaak bij', snel, 's per som:', wint / 10, '%');
}
console.log(`${sommen} tafelsommen, ${pert} foute antwoorden getest, ${fouten} fouten`);
console.log('Tafelrace:', JSON.stringify(uitslag));

if (fouten) process.exit(1);
