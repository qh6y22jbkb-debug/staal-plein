/**
 * Voortgang in Leergroep 3 (rekenen), apart van de taalstempels. Bewaard in localStorage.
 * niveaus: { kraamId: hoogste niveau (1 = Brons, 2 = Zilver, 3 = Goud) waarop een ronde gehaald is }
 * De rekenvoortgang telt NIET mee voor de poort naar de Voetbalwereld.
 */
const SLEUTEL = 'staal-blok2-rekenen';

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

export const rekenvoortgang = {
  /** Hoogste gehaalde niveau per rekenkraam (0 = nog niets). */
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
