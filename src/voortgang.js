/**
 * Voortgang van de speler, bewaard in localStorage (blijft bewaard na het sluiten van de browser).
 * niveaus: { kraamId: hoogste niveau (1-3) waarop een ronde gehaald is }
 * Een kraam krijgt pas een stempel als alle 3 de niveaus gehaald zijn.
 */
const SLEUTEL = 'staal-blok2-voortgang';
export const NIVEAU_VOOR_STEMPEL = 3;

function lees() {
  try {
    const data = JSON.parse(localStorage.getItem(SLEUTEL));
    if (data && typeof data === 'object') {
      return { niveaus: data.niveaus ?? data.stempels ?? {}, kampioen: !!data.kampioen, naam: data.naam ?? '' };
    }
  } catch { /* geen of kapotte opslag */ }
  return { niveaus: {}, kampioen: false, naam: '' };
}

let staat = lees();

function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
}

export const voortgang = {
  /** Hoogste gehaalde niveau per kraam (0 = nog niets). */
  niveau(id) { return staat.niveaus[id] ?? 0; },
  heeftStempel(id) { return this.niveau(id) >= NIVEAU_VOOR_STEMPEL; },
  /** Aantal stempels (kramen waar alle 3 de niveaus gehaald zijn). */
  get aantal() { return Object.keys(staat.niveaus).filter((id) => this.heeftStempel(id)).length; },
  get kampioen() { return staat.kampioen; },
  get naam() { return staat.naam; },
  set naam(n) { staat.naam = n; bewaar(); },

  /** Ronde gehaald. Geeft terug: 'stempel' (alle niveaus gehaald), 'niveau' (nieuw niveau gehaald) of null. */
  rondeGehaald(id, niveau) {
    const oud = this.niveau(id);
    if (niveau <= oud) return null;
    staat.niveaus[id] = niveau;
    bewaar();
    return niveau >= NIVEAU_VOOR_STEMPEL ? 'stempel' : 'niveau';
  },

  zetKampioen() { staat.kampioen = true; bewaar(); },

  wis() {
    staat = { niveaus: {}, kampioen: false, naam: '' };
    bewaar();
  },
};
