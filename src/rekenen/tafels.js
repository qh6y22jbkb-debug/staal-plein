/*
 * Tafels als gewone logica (zonder scherm): sommen voor de tafelrace, de uitleg van Meester Koen
 * en het tempo van de tegenstander. Een som is { soort: 'keer' | 'deel', a, tafel, vraag, antwoord }:
 *   keer: a × tafel = a·tafel        deel: (a·tafel) : tafel = a
 */

const schud = (lijst) => {
  const a = [...lijst];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

export function maakTafelSom(soort, a, tafel) {
  if (soort === 'deel') return { soort, a, tafel, getal: a * tafel, vraag: `${a * tafel} : ${tafel}`, antwoord: a };
  return { soort: 'keer', a, tafel, getal: a * tafel, vraag: `${a} × ${tafel}`, antwoord: a * tafel };
}

/**
 * n sommen voor een niveau en een keuze (één tafel, of null = alle tafels door elkaar).
 * Elke combinatie komt hoogstens één keer voor (zolang dat kan), en nooit twee keer dezelfde som achter elkaar.
 */
export function maakTafelSommen(r, keuze, n) {
  const tafels = keuze == null ? r.doorElkaar : [keuze];
  const alle = [];
  for (const t of tafels) for (let a = 1; a <= 10; a++) alle.push([a, t]);
  const sommen = [];
  let pot = [];
  while (sommen.length < n) {
    if (!pot.length) pot = schud(alle);
    const [a, t] = pot.pop();
    const soort = r.deelsommen && Math.random() < r.deelKans ? 'deel' : 'keer';
    const som = maakTafelSom(soort, a, t);
    const vorige = sommen.at(-1);
    if (vorige && vorige.vraag === som.vraag && alle.length > 1) continue;
    sommen.push(som);
  }
  return sommen;
}

/** Is het getypte antwoord goed? Alleen cijfers tellen; "56" en " 56 " zijn goed, "5 6" of "56a" niet. */
export function antwoordGoed(som, getypt) {
  const t = String(getypt ?? '').trim();
  if (!/^\d+$/.test(t)) return false;
  return Number(t) === som.antwoord;
}

/** Meester Koen: rekent de som stap voor stap uit via een som die je al weet. */
export function uitlegTafel(som) {
  const { a, tafel } = som;
  const keer = (x) => `${x} × ${tafel} = ${x * tafel}`;
  let weg;
  if (a === 1) weg = `1 × ${tafel} is gewoon ${tafel}.`;
  else if (a === 2) weg = `2 × ${tafel} is het dubbele: ${tafel} + ${tafel} = ${2 * tafel}.`;
  else if (a === 5) weg = `5 × ${tafel} is de helft van 10 × ${tafel} = ${10 * tafel}. De helft is ${5 * tafel}.`;
  else if (a === 10) weg = `10 × ${tafel}: zet een 0 achter de ${tafel}. Dat is ${10 * tafel}.`;
  else if (a === 9) weg = `Begin bij ${keer(10)}. Haal er één keer ${tafel} af: ${10 * tafel} − ${tafel} = ${9 * tafel}.`;
  else if (a === 3 || a === 4) weg = `Begin bij ${keer(2)}. Tel er nog ${a === 3 ? `één keer ${tafel}` : `twee keer ${tafel}`} bij: ${2 * tafel} + ${(a - 2) * tafel} = ${a * tafel}.`;
  else weg = `Begin bij ${keer(5)}. Tel er nog ${a - 5 === 1 ? `één keer ${tafel}` : `${a - 5} keer ${tafel}`} bij: ${5 * tafel} + ${(a - 5) * tafel} = ${a * tafel}.`;
  if (som.soort === 'deel') {
    return `${som.vraag}: welk getal keer ${tafel} is ${som.getal}? ${weg} Dus ${som.vraag} = ${a}.`;
  }
  return `${som.vraag}: ${weg}`;
}

/** Meester Bram: de tafelrij tot en met de som (het laatste vakje is het antwoord). */
export function tafelRij(som) {
  return Array.from({ length: som.a }, (_, i) => (i + 1) * som.tafel);
}

/**
 * Tempo van de tegenstander (Tijn). Hij past zich aan het kind aan: hoe lang het kind gemiddeld
 * over een som doet, zo snel rent Tijn (net iets langzamer). Loopt Tijn ver voor, dan gaat hij
 * langzamer; staat hij ver achter, dan iets sneller. Zo blijft het spannend, zonder straf voor langzaam zijn.
 * Posities zijn in "sommen": 0 = start, totaal = finish.
 */
export class Tempo {
  constructor(totaal, { startTijd = 12, factor = 1.05, min = 2.5, max = 45 } = {}) {
    this.totaal = totaal;
    this.gemiddeld = startTijd; // seconden per som
    this.factor = factor;
    this.min = min;
    this.max = max;
    this.positie = 0;
    this.pauze = 0;
  }

  /** Het kind had een som goed na zoveel seconden. */
  registreer(seconden) {
    const s = Math.min(this.max, Math.max(this.min, seconden));
    // Het gemiddelde schuift mee met het kind; de eerste som telt meteen zwaar (dan weet Tijn hoe snel je bent).
    this.gemiddeld = this.aantal ? this.gemiddeld * 0.5 + s * 0.5 : s;
    this.aantal = (this.aantal ?? 0) + 1;
  }

  /** Tijn staat even stil (bijv. bij een fout of een tip). */
  wacht(seconden) {
    this.pauze = Math.max(this.pauze, seconden);
  }

  /** Eén stapje in de tijd. kindPositie = hoeveel sommen het kind al goed heeft. */
  update(dt, kindPositie) {
    if (this.pauze > 0) { this.pauze -= dt; return this.positie; }
    let snelheid = 1 / (this.gemiddeld * this.factor); // sommen per seconde
    const voorsprong = this.positie - kindPositie;
    // (Uitgeprobeerd met simulaties: zo wint een kind meestal, vaak met een spannende finish, ook als het rustig rekent.)
    if (voorsprong > 1.5) snelheid *= 0.5;
    else if (voorsprong > 0.8) snelheid *= 0.8;
    else if (voorsprong < -1.5) snelheid *= 1.4;
    this.positie = Math.min(this.totaal, this.positie + snelheid * dt);
    return this.positie;
  }

  get klaar() { return this.positie >= this.totaal; }
}
