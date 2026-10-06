/*
 * Willekeurige sommen maken volgens de regels per niveau (REKEN_REGELS in src/data/rekenen.js).
 * Alles hier is gewone rekenlogica zonder scherm, zodat het makkelijk te testen is.
 */

export const cijfersVan = (n) => String(n).split('').reverse().map(Number); // index 0 = eenheden
const tussen = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
const kies = (lijst) => lijst[Math.floor(Math.random() * lijst.length)];

/** Hoe vaak moet je onthouden bij optellen? (kolommen waar de som 10 of meer is) */
export function telOnthoudPlus(getallen) {
  const lengte = Math.max(...getallen.map((g) => String(g).length));
  let onthoud = 0, aantal = 0;
  for (let k = 0; k < lengte; k++) {
    const som = getallen.reduce((s, g) => s + (cijfersVan(g)[k] ?? 0), 0) + onthoud;
    onthoud = Math.floor(som / 10);
    if (onthoud > 0) aantal++;
  }
  return aantal;
}

/** Inwisselen bij a - b: welke kolommen moeten lenen, en gaat het ergens over een nul heen? */
export function inwisselInfo(a, b) {
  const ta = cijfersVan(a), tb = cijfersVan(b);
  let leen = 0, aantal = 0, overNul = false;
  for (let k = 0; k < ta.length; k++) {
    const boven = ta[k] - leen;
    const onder = tb[k] ?? 0;
    if (boven < onder) {
      aantal++;
      // Over een nul heen: de kolom links is een 0 (in het oorspronkelijke getal).
      if (ta[k + 1] === 0) overNul = true;
      leen = 1;
    } else leen = 0;
  }
  return { aantal, overNul };
}

/** Hoe vaak moet je onthouden bij a × één cijfer? (niet de laatste kolom: die schrijf je helemaal op) */
export function telOnthoudKeer(a, m) {
  const ta = cijfersVan(a);
  let onthoud = 0, aantal = 0;
  for (let k = 0; k < ta.length - 1; k++) {
    const p = ta[k] * m + onthoud;
    onthoud = Math.floor(p / 10);
    if (onthoud > 0) aantal++;
  }
  return aantal;
}

const binnen = (n, grens) => n >= (grens?.min ?? 0) && n <= (grens?.max ?? Infinity);

function maakPlus(r) {
  for (let poging = 0; poging < 5000; poging++) {
    const getallen = Array.from({ length: r.aantalGetallen }, () => tussen(r.min, r.max));
    const uitkomst = getallen.reduce((s, g) => s + g, 0);
    if (r.maxUitkomst && uitkomst > r.maxUitkomst) continue;
    if (!binnen(telOnthoudPlus(getallen), r.onthouden)) continue;
    getallen.sort((x, y) => y - x); // grootste getal bovenaan
    return { soort: 'plus', getallen, antwoord: uitkomst };
  }
  throw new Error('Geen optelsom gevonden met deze regels');
}

function maakMin(r) {
  for (let poging = 0; poging < 20000; poging++) {
    let a = tussen(r.min, r.max);
    if (r.overNul) {
      // Een nul in het midden maakt "over de nul heen inwisselen" veel waarschijnlijker.
      const t = cijfersVan(a);
      const plek = tussen(1, t.length - 2);
      t[plek] = 0;
      if (Math.random() < 0.5 && plek + 1 < t.length - 1) t[plek + 1] = 0;
      a = Number(t.reverse().join(''));
      if (a < r.min) continue;
    }
    const b = tussen(r.minTweede ?? 1, a - 1);
    if (b >= a) continue;
    const info = inwisselInfo(a, b);
    if (!binnen(info.aantal, r.inwisselen)) continue;
    if (r.overNul && !info.overNul) continue;
    return { soort: 'min', getallen: [a, b], antwoord: a - b };
  }
  throw new Error('Geen aftreksom gevonden met deze regels');
}

function maakKeer(r) {
  for (let poging = 0; poging < 5000; poging++) {
    const a = tussen(10 ** (r.cijfersBoven - 1), 10 ** r.cijfersBoven - 1);
    let b;
    if (r.cijfersOnder === 1) b = tussen(2, 9);
    else {
      // Twee cijfers zonder nul (anders is een tussenregel leeg), en niet 11.
      b = tussen(1, 9) * 10 + tussen(2, 9);
    }
    if (r.cijfersOnder === 1 && !binnen(telOnthoudKeer(a, b), r.onthouden)) continue;
    return { soort: 'keer', getallen: [a, b], antwoord: a * b };
  }
  throw new Error('Geen keersom gevonden met deze regels');
}

/** Eén willekeurige som voor een rekenkraam en niveau. */
export function maakSom(soort, regelsPerNiveau) {
  const r = regelsPerNiveau.varianten ? kies(regelsPerNiveau.varianten) : regelsPerNiveau;
  if (soort === 'plus') return maakPlus(r);
  if (soort === 'min') return maakMin(r);
  if (soort === 'keer') return maakKeer(r);
  throw new Error(`Onbekende soort som: ${soort}`);
}

/** n verschillende sommen. */
export function maakSommen(soort, regelsPerNiveau, n) {
  const sommen = [];
  const gezien = new Set();
  for (let poging = 0; sommen.length < n && poging < n * 50; poging++) {
    const som = maakSom(soort, regelsPerNiveau);
    const sleutel = som.getallen.join(',');
    if (gezien.has(sleutel)) continue;
    gezien.add(sleutel);
    sommen.push(som);
  }
  return sommen;
}

/** Hoe de som klinkt als hij wordt voorgelezen, bijv. "348 plus 275". */
export function somAlsTekst(som, teken = { plus: '+', min: '−', keer: '×' }) {
  return som.getallen.join(` ${teken[som.soort]} `);
}
