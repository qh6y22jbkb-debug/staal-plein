/**
 * Overzicht van alles wat het spel in de browser bewaart (localStorage).
 * Elke module leest en schrijft zijn eigen sleutel; hier staat de lijst op één plek.
 *
 *   staal-blok2-voortgang    gehaalde niveaus per kraam (stempels) + kampioen + naam op de oorkonde
 *   staal-blok2-munten       aantal munten
 *   staal-blok2-kleding      gekochte en aangetrokken kleding
 *   staal-blok2-pleinmunten  welke verstopte muntjes vandaag al gevonden zijn
 *   staal-blok2-meesters     pauze en aantal vragen per meester (per dag)
 *   staal-niveau-<kraam>     laatst gekozen niveau per kraam
 *   staal-voorlezen          voorlezen aan/uit   (blijft staan bij opnieuw beginnen)
 *   staal-geluid             geluid aan/uit      (blijft staan bij opnieuw beginnen)
 */
export const SPEL_SLEUTELS = [
  'staal-blok2-voortgang',
  'staal-blok2-munten',
  'staal-blok2-kleding',
  'staal-blok2-pleinmunten',
  'staal-blok2-meesters',
];

/** Wist alle spelgegevens (niet de instellingen voor geluid en voorlezen). */
export function wisSpelOpslag() {
  try {
    for (const sleutel of SPEL_SLEUTELS) localStorage.removeItem(sleutel);
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const sleutel = localStorage.key(i);
      if (sleutel?.startsWith('staal-niveau-')) localStorage.removeItem(sleutel);
    }
  } catch { /* geen opslag */ }
}
