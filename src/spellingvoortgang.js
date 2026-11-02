/**
 * Voortgang in de Spellingwereld (herhalingsblok), apart van de stempels op het plein. Bewaard in localStorage.
 * niveaus: { lokaalId: hoogste niveau (1 = Brons, 2 = Zilver, 3 = Goud) waarop een ronde gehaald is }
 */
const SLEUTEL = 'staal-herhaling-spelling';

function lees() {
  try {
    const data = JSON.parse(localStorage.getItem(SLEUTEL));
    if (data && typeof data === 'object' && data.niveaus && typeof data.niveaus === 'object') {
      return { niveaus: data.niveaus, kampioen: !!data.kampioen };
    }
  } catch { /* geen of kapotte opslag */ }
  return { niveaus: {}, kampioen: false };
}

let staat = lees();

function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
}

export const spellingvoortgang = {
  /** Hoogste gehaalde niveau per lokaal (0 = nog niets). */
  niveau(id) {
    const n = Number(staat.niveaus[id]);
    return Number.isFinite(n) ? Math.max(0, Math.min(3, n)) : 0;
  },
  get kampioen() { return staat.kampioen; },

  /** Ronde gehaald. Geeft het nieuwe niveau terug (1-3) als dat hoger is dan voorheen, anders null. */
  rondeGehaald(id, niveau) {
    if (niveau <= this.niveau(id)) return null;
    staat.niveaus[id] = niveau;
    bewaar();
    return niveau;
  },

  zetKampioen() { staat.kampioen = true; bewaar(); },

  wis() {
    staat = { niveaus: {}, kampioen: false };
    bewaar();
  },
};
