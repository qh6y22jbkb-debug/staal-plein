import { DhteSchema } from './dhte.js';

/**
 * De staartdeling op het scherm (Dina Deel). Zelfde vakjes, typgedrag, nakijken en tips als
 * het DHTE-schema; alleen de opbouw is anders:
 *
 *   kolomkoppen        H  T  E
 *   antwoord          [1][2][3]   rest [ ]
 *   dak                ────────
 *   deelgetal )        8  6  1
 *   keer-getal        [7]
 *   aftrekken + omlaag [1][6] ...
 */
export class StaartdelingSchema extends DhteSchema {
  bouw() {
    const schema = this.schema;
    const n = schema.breedte;
    const [, deelgetal] = schema.som.getallen;
    this.el.classList.add('staart');
    this.el.style.setProperty('--kolommen', n);
    const kolom = (k) => n - k + 2; // kolom 1 = deelgetal, 2 = haakje, dan de cijfers van het deeltal
    const plek = (rijNr, k) => `grid-row: ${rijNr}; grid-column: ${kolom(k)};`;
    this.bouwKolommen(n, kolom, schema.rijen.length + 1);

    schema.rijen.forEach((rij, i) => {
      const rijNr = i + 2;
      if (rij.soort === 'dak') {
        this.zet('div', 'dhte-lijn dak', `grid-row: ${rijNr}; grid-column: 2 / ${n + 3};`);
        return;
      }
      if (rij.soort === 'lijn') {
        this.zet('div', 'dhte-lijn dun', `grid-row: ${rijNr}; grid-column: ${kolom(rij.van)} / ${kolom(rij.tot) + 1};`);
        return;
      }
      if (rij.soort === 'deeltal') {
        this.zet('div', 'dhte-cijfer deelgetal', `grid-row: ${rijNr}; grid-column: 1;`, String(deelgetal));
        this.zet('div', 'staart-haakje', `grid-row: ${rijNr}; grid-column: 2;`, ')');
      }
      for (let k = n - 1; k >= 0; k--) {
        const cel = rij.cellen[k];
        if (!cel) continue;
        if (!cel.invoer) {
          this.zet('div', 'dhte-cijfer', plek(rijNr, k), cel.waarde);
          continue;
        }
        const naam = { antwoord: 'cijfer van het antwoord', keer: 'keer-getal', aftrek: 'aftrekken', omlaag: 'cijfer naar beneden' }[cel.soort];
        this.maakVak(cel, plek(rijNr, k), `rij-${rij.soort}`, `${this.kolomNamen[k]}-kolom, ${naam}`);
      }
      if (rij.rest) {
        this.zet('div', 'staart-rest-label', `grid-row: ${rijNr}; grid-column: ${n + 3};`, this.restTekst);
        this.maakVak(rij.rest, `grid-row: ${rijNr}; grid-column: ${n + 4};`, 'rij-antwoord', 'rest');
      }
    });
  }
}
