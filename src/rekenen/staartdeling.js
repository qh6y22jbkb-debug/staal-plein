/*
 * De staartdeling als gegevens (zonder scherm), voor Dina Deel.
 *
 *          1 2 3        ← het antwoord bovenaan (één cijfer per stap)
 *      7 ) 8 6 1        ← deelgetal en deeltal
 *          7            ← het keer-getal (1 × 7)
 *          ─
 *          1 6          ← aftrekken (8 − 7 = 1) en het cijfer dat naar beneden komt (6)
 *          1 4
 *          ───
 *            2 1  ...
 *
 * Elke stap: hoe vaak past het deelgetal in het stukje? Schrijf dat op, keer terug,
 * trek af en haal het volgende cijfer naar beneden. Wat onderaan overblijft, is de rest.
 * Kolommen: k = 0 is de E van het deeltal, 1 de T, enzovoort.
 */

export function bouwStaartdeling(som) {
  const [D, d] = som.getallen;
  const cijfers = String(D).split('').map(Number); // van links naar rechts
  const n = cijfers.length;
  const kVan = (i) => n - 1 - i; // index van links → kolom
  const rijen = [];
  const cellen = [];
  const stappen = [];
  let rijId = 0;
  const rij = (soort, extra = {}) => {
    const r = { id: `r${rijId++}`, soort, cellen: {}, ...extra };
    rijen.push(r);
    return r;
  };
  const vak = (r, k, soort, verwacht, { verplicht = true } = {}) => {
    const cel = { id: `${r.id}-${k}`, rij: r.id, k, invoer: true, soort, klein: false, verwacht: String(verwacht), leegMag: verwacht === '', alsOok: [], verplicht: verplicht && verwacht !== '' };
    r.cellen[k] = cel;
    cellen.push(cel);
    return cel;
  };
  const cijferVakken = (r, getal, kEind, soort) => String(getal).split('').map((c, i, lijst) => vak(r, kEind + (lijst.length - 1 - i), soort, c));

  const antwoordRij = rij('antwoord');
  rij('dak'); // de streep boven het deeltal
  const deeltalRij = rij('deeltal');
  cijfers.forEach((c, i) => { deeltalRij.cellen[kVan(i)] = { id: `deeltal-${i}`, k: kVan(i), invoer: false, waarde: String(c) }; });

  // Het eerste stukje: zo weinig cijfers als nodig om het deelgetal er minstens één keer in te laten passen.
  let i = 0;
  let stukje = cijfers[0];
  while (stukje < d && i < n - 1) { i++; stukje = stukje * 10 + cijfers[i]; }

  let stapNr = 0;
  for (;;) {
    const kEind = kVan(i);
    const q = Math.floor(stukje / d);
    const p = q * d;
    const r = stukje - p;
    const laatste = i === n - 1;
    const stapCellen = [];

    stapCellen.push(vak(antwoordRij, kEind, 'antwoord', q));
    const keerRij = rij('keer');
    stapCellen.push(...cijferVakken(keerRij, p, kEind, 'keer'));
    const kLinks = kEind + Math.max(String(stukje).length, String(p).length) - 1;
    rij('lijn', { van: kLinks, tot: kEind });
    const restRij = rij('aftrek');
    let volgende = null;
    if (r === 0 && !laatste) {
      // Niets over: een 0 opschrijven mag, leeg laten ook.
      stapCellen.push(vak(restRij, kEind, 'aftrek', ''));
    } else {
      stapCellen.push(...cijferVakken(restRij, r, kEind, 'aftrek'));
    }
    let uitleg = `Hoe vaak past ${d} in ${stukje}? ${q} keer, want ${q} × ${d} = ${p}. Schrijf ${q} bovenaan en ${p} eronder. ${stukje} − ${p} = ${r}.`;
    if (!laatste) {
      const omlaag = cijfers[i + 1];
      stapCellen.push(vak(restRij, kVan(i + 1), 'omlaag', omlaag));
      volgende = r * 10 + omlaag;
      uitleg += ` Haal de ${omlaag} naar beneden: dan heb je ${volgende}.`;
    } else {
      uitleg += r ? ` Er blijft ${r} over: dat is de rest.` : ' Er blijft niets over.';
    }
    if (laatste && som.rest > 0) {
      // Rest naast het antwoord.
      const rest = { id: 'rest', rij: antwoordRij.id, k: -1, invoer: true, soort: 'rest', klein: false, verwacht: String(r), leegMag: false, alsOok: [], verplicht: true };
      antwoordRij.rest = rest;
      cellen.push(rest);
      stapCellen.push(rest);
    }
    const regel = stapNr === 0 ? 'deelEerste' : laatste ? 'deelLaatste' : 'deel';
    const stap = { nr: stappen.length, fase: 'deel', k: kEind, kolom: '', cellen: stapCellen, uitleg, regel, stukje, deler: d };
    for (const c of stapCellen) c.stap = stap.nr;
    stappen.push(stap);
    stapNr++;
    if (laatste) break;
    i++;
    stukje = volgende;
  }

  const volgorde = stappen.flatMap((s) => s.cellen);
  return { som, rijen, stappen, cellen, volgorde, breedte: n, staartdeling: true };
}
