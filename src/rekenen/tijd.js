/*
 * Klokkijken als gewone logica (zonder scherm): tijden in woorden, digitaal en 24-uurs,
 * en het maken van klokvragen per niveau (REKEN_REGELS.klok in src/data/rekenen.js).
 * Een tijd is { h, m } met h = 0..23 en m = 0..59.
 */

const GETAL = ['nul', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien'];
const pad = (n) => String(n).padStart(2, '0');
const tussen = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const kies = (lijst) => lijst[Math.floor(Math.random() * lijst.length)];
const schud = (lijst) => {
  const a = [...lijst];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

/** Uur op de klok (1 t/m 12) bij een uur van 0..23 (of hoger). */
export const uur12 = (h) => ((((h % 12) + 12) % 12) || 12);
const uurWoord = (h) => GETAL[uur12(h)];

export function normaal({ h, m }) {
  const totaal = (((h * 60 + m) % 1440) + 1440) % 1440;
  return { h: Math.floor(totaal / 60), m: totaal % 60 };
}
export const minutenVan = ({ h, m }) => h * 60 + m;
export const gelijk12 = (a, b) => a.h % 12 === b.h % 12 && a.m === b.m;

/** In woorden, zoals je het zegt: "vijf over half drie". */
export function inWoorden({ h, m }) {
  if (m === 0) return `${uurWoord(h)} uur`;
  if (m < 15) return `${GETAL[m]} over ${uurWoord(h)}`; // bijv. "tien over drie"
  if (m === 15) return `kwart over ${uurWoord(h)}`;
  if (m < 30) return `${GETAL[30 - m]} voor half ${uurWoord(h + 1)}`;
  if (m === 30) return `half ${uurWoord(h + 1)}`;
  if (m < 45) return `${GETAL[m - 30]} over half ${uurWoord(h + 1)}`;
  if (m === 45) return `kwart voor ${uurWoord(h + 1)}`;
  return `${GETAL[60 - m]} voor ${uurWoord(h + 1)}`;
}

export function dagdeel(h) {
  if (h < 6) return "'s nachts";
  if (h < 12) return "'s ochtends";
  if (h < 18) return "'s middags";
  return "'s avonds";
}

export const inWoordenMetDagdeel = (t) => `${inWoorden(t)} ${dagdeel(t.h)}`;
/** Digitaal zoals op een gewone klok (1:00 t/m 12:59). */
export const digitaal12 = ({ h, m }) => `${uur12(h)}:${pad(m)}`;
/** 24-uursklok (0:00 t/m 23:59). */
export const digitaal24 = ({ h, m }) => `${h}:${pad(m)}`;

export function duurTekst(minuten) {
  const u = Math.floor(minuten / 60), m = minuten % 60;
  if (!u) return `${m} minuten`;
  if (!m) return `${u} uur`;
  return `${u} uur en ${m} minuten`;
}

/* ---------- Uitleg van Meester Koen ---------- */

const hoofdletter = (t) => t.charAt(0).toUpperCase() + t.slice(1);
const minuten = (m) => `${m} ${m === 1 ? 'minuut' : 'minuten'}`;
const GETAL_WIJZER = (m) => (m % 5 === 0 ? `bij de ${m === 0 ? 12 : m / 5}` : `${m % 5} streepje${m % 5 > 1 ? 's' : ''} na de ${Math.floor(m / 5) || 12}`);

export function uitlegAflezen(t) {
  const plek = t.m === 0 ? `precies bij de ${uur12(t.h)}` : t.m < 30 ? `net voorbij de ${uur12(t.h)}` : `tussen de ${uur12(t.h)} en de ${uur12(t.h + 1)}`;
  const lang = t.m === 0 ? 'De lange wijzer staat bij de 12: dus precies op het hele uur.' : `De lange wijzer staat ${GETAL_WIJZER(t.m)}: dat is ${minuten(t.m)} na het hele uur.`;
  return `De korte wijzer staat ${plek}. ${lang} Het is dus ${inWoorden(t)} (${digitaal12(t)}).`;
}

export function uitlegZetten(t) {
  const lang = t.m === 0 ? 'De lange wijzer moet bij de 12 staan.' : `De lange wijzer moet ${GETAL_WIJZER(t.m)} staan (${minuten(t.m)}).`;
  const kort = t.m === 0
    ? `De korte wijzer moet precies bij de ${uur12(t.h)} staan.`
    : `De korte wijzer staat dan tussen de ${uur12(t.h)} en de ${uur12(t.h + 1)}.`;
  return `${hoofdletter(inWoorden(t))} is ${digitaal12(t)}. ${lang} ${kort}`;
}

export function uitleg24(t) {
  const middag = t.h >= 13 ? `Haal 12 van ${t.h} af: dan krijg je ${t.h - 12}. ` : '';
  return `${digitaal24(t)}: ${middag}Het is ${inWoorden(t)} ${dagdeel(t.h)}.`;
}

export function uitlegTijdsduur(begin, duur) {
  const u = Math.floor(duur / 60), m = duur % 60;
  const naUren = normaal({ h: begin.h + u, m: begin.m });
  const eind = normaal({ h: begin.h, m: begin.m + duur });
  let tekst = `Begin om ${digitaal24(begin)}.`;
  if (u) tekst += ` Plus ${u} uur is ${digitaal24(naUren)}.`;
  if (m) {
    const totHeel = 60 - naUren.m;
    if (m >= totHeel && naUren.m !== 0) {
      const heel = normaal({ h: naUren.h + 1, m: 0 });
      tekst += ` Plus ${totHeel} minuten is ${digitaal24(heel)}${m - totHeel ? `, en nog ${m - totHeel} minuten erbij is ${digitaal24(eind)}` : ''}.`;
    } else {
      tekst += ` Plus ${m} minuten is ${digitaal24(eind)}.`;
    }
  }
  return `${tekst} Het is afgelopen om ${digitaal24(eind)}.`;
}

/* ---------- Foute keuzes die bij echte vergissingen horen ---------- */

/** Mogelijke foute antwoorden bij het aflezen van een klok. */
function aflesFouten(t) {
  return [
    normaal({ h: t.h - 1, m: t.m }), // "half drie" i.p.v. "half vier": een uur te vroeg
    normaal({ h: t.h + 1, m: t.m }),
    { h: t.h, m: (60 - t.m) % 60 }, // voor en over omgedraaid (3:20 ↔ 3:40)
    { h: Math.round(t.m / 5) % 12, m: (t.h % 12) * 5 }, // wijzers verwisseld
    normaal({ h: t.h, m: t.m + 5 }),
    normaal({ h: t.h, m: t.m - 5 }),
    normaal({ h: t.h, m: t.m + 15 }),
  ];
}

/** 3 opties: het goede antwoord en 2 foute, allemaal verschillend (volgens 'tekst'). */
function maakOpties(goed, fouten, tekst) {
  const goedTekst = tekst(goed);
  const gezien = new Set([goedTekst]);
  const fout = [];
  for (const f of schud(fouten)) {
    const ft = tekst(f);
    if (gezien.has(ft)) continue;
    gezien.add(ft);
    fout.push(f);
    if (fout.length === 2) break;
  }
  const opties = schud([{ tijd: goed, goed: true }, ...fout.map((f) => ({ tijd: f, goed: false }))]);
  return opties.map((o) => ({ ...o, label: tekst(o.tijd) }));
}

function tijdOpStap(stap, { vanUur = 1, totUur = 12 } = {}) {
  return { h: tussen(vanUur, totUur) % 24, m: tussen(0, Math.floor(59 / stap)) * stap };
}

/* ---------- Vragen ---------- */

export function maakKlokVraag(soort, r, T) {
  const vul = (s, tijd) => s.replace('{tijd}', tijd);
  switch (soort) {
    case 'kiesAnaloogWoorden': {
      const t = tijdOpStap(r.minuten);
      return { soort: 'kies', type: soort, tijd: t, toonKlok: t, vraag: T.hoeLaat, opties: maakOpties(t, aflesFouten(t), inWoorden), uitleg: uitlegAflezen(t), jop: 'regel', hint: T.foutKies };
    }
    case 'kiesAnaloogDigitaal': {
      const t = tijdOpStap(r.minuten);
      return { soort: 'kies', type: soort, tijd: t, toonKlok: t, vraag: T.hoeLaat, opties: maakOpties(t, aflesFouten(t), digitaal12), uitleg: uitlegAflezen(t), jop: 'regel', hint: T.foutKies };
    }
    case 'kiesDigitaalAnaloog': {
      const t = tijdOpStap(r.minuten);
      const opties = maakOpties(t, aflesFouten(t), digitaal12).map((o) => ({ ...o, klok: true }));
      return { soort: 'kies', type: soort, tijd: t, toonTekst: digitaal12(t), vraag: vul(T.welkeKlok, digitaal12(t)), opties, uitleg: uitlegZetten(t), jop: 'regel', hint: T.foutKies };
    }
    case 'versleepWoorden':
    case 'versleepDigitaal':
    case 'versleep24': {
      const t = soort === 'versleep24' ? tijdOpStap(r.minuten, { vanUur: 13, totUur: 22 }) : tijdOpStap(r.minuten);
      const tekst = soort === 'versleepWoorden' ? inWoorden(t) : soort === 'versleepDigitaal' ? digitaal12(t) : digitaal24(t);
      const uitleg = soort === 'versleep24' ? `${uitleg24(t)} ${uitlegZetten(t)}` : uitlegZetten(t);
      return { soort: 'versleep', type: soort, tijd: t, doel: { h: t.h % 12, m: t.m }, vraag: vul(T.zetOp, tekst), toonTekst: tekst, uitleg, jop: soort === 'versleep24' ? '24' : 'regel', sleepStap: r.sleepStap };
    }
    case 'kies24Woorden': {
      const t = tijdOpStap(r.minuten, { vanUur: 13, totUur: 22 });
      const fouten = [
        ...aflesFouten(t).filter((f) => f.h >= 12),
        { h: t.h - 12, m: t.m }, // goed uur, verkeerd dagdeel
        { h: t.h + (t.h < 18 ? 6 : -6), m: t.m },
      ];
      return { soort: 'kies', type: soort, tijd: t, toonTekst: digitaal24(t), vraag: vul(T.inWoorden, digitaal24(t)), opties: maakOpties(t, fouten, inWoordenMetDagdeel), uitleg: uitleg24(t), jop: '24', hint: T.foutKies24 };
    }
    case 'kiesWoorden24': {
      const t = tijdOpStap(r.minuten, { vanUur: 13, totUur: 22 });
      const fouten = [{ h: t.h - 12, m: t.m }, normaal({ h: t.h - 1, m: t.m }), normaal({ h: t.h + 1, m: t.m }), { h: t.h, m: (60 - t.m) % 60 }];
      const woorden = inWoordenMetDagdeel(t);
      return { soort: 'kies', type: soort, tijd: t, toonTekst: woorden, vraag: vul(T.alsDigitaal, woorden), opties: maakOpties(t, fouten, digitaal24), uitleg: uitleg24(t), jop: '24', hint: T.foutKies24 };
    }
    case 'tijdsduur': {
      // Begintijd en duur zo dat je over het hele uur heen moet tellen.
      let begin, duur;
      do {
        begin = { h: tussen(8, 19), m: tussen(1, 11) * 5 };
        duur = tussen(0, 2) * 60 + tussen(2, 11) * 5;
      } while (begin.m + (duur % 60) < 60 || duur < 25);
      const eind = normaal({ h: begin.h, m: begin.m + duur });
      const fouten = [
        normaal({ h: eind.h - 1, m: eind.m }), // het extra uur vergeten
        normaal({ h: eind.h + 1, m: eind.m }),
        normaal({ h: eind.h, m: eind.m + 10 }),
        normaal({ h: eind.h, m: eind.m - 10 }),
      ];
      const wat = kies(T.watLijst);
      const vraag = T.tijdsduur.replace('{wat}', wat.wat).replace('{begin}', digitaal24(begin)).replace('{duur}', duurTekst(duur)).replace('{kort}', wat.kort);
      return { soort: 'kies', type: soort, tijd: eind, begin, duur, vraag, opties: maakOpties(eind, fouten, digitaal24), uitleg: uitlegTijdsduur(begin, duur), jop: 'duur', hint: T.foutTijdsduur };
    }
    default:
      throw new Error(`Onbekende klokvraag: ${soort}`);
  }
}

/** n klokvragen voor een niveau, met de soorten door elkaar en zonder dubbele tijden. */
export function maakKlokVragen(r, n, T) {
  const vragen = [];
  const gezien = new Set();
  let i = 0;
  const soorten = schud(r.soorten);
  for (let poging = 0; vragen.length < n && poging < n * 40; poging++) {
    const v = maakKlokVraag(soorten[i % soorten.length], r, T);
    const sleutel = `${v.type}-${v.tijd.h}:${v.tijd.m}`;
    if (gezien.has(sleutel)) continue;
    gezien.add(sleutel);
    vragen.push(v);
    i++;
  }
  return vragen;
}
