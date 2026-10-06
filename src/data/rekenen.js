/*
 * ============================================================
 *  LEERGROEP 3 - REKENEN
 * ============================================================
 *  Hier staan de teksten van Leergroep 3 (de binnenwereld in de school)
 *  en de zes rekenlokalen. Een leerkracht kan dit bestand aanpassen.
 *  De rekenkramen tellen NIET mee voor de stempelkaart en de poort.
 */

export const LEERGROEP = {
  naam: 'Leergroep 3',
  deurBord: 'Leergroep 3 - Rekenen',
  // Buiten, bij de voordeur van de school.
  naarBinnenToets: 'Druk op E om naar binnen te gaan',
  naarBinnenTik: 'Tik hier om naar binnen te gaan',
  // Binnen, bij de deur terug.
  naarBuitenToets: 'Druk op E om naar het schoolplein te gaan',
  naarBuitenTik: 'Tik hier om naar het schoolplein te gaan',
  deurTerugBord: 'Schoolplein',
  welkom: 'Welkom in Leergroep 3! Hier oefen je rekenen.',
};

/*
 * De zes lokalen. Lokaal 1 t/m 3 liggen links van het leerplein, 4 t/m 6 rechts.
 * naam = naam van de kraam (staat op het bord bij de deur), onderwerp = klein onder de naam.
 */
export const LOKALEN = [
  { nummer: 1, id: 'plus', naam: 'Pim Plus', onderwerp: 'optellen' },
  { nummer: 2, id: 'min', naam: 'Mila Min', onderwerp: 'aftrekken' },
  { nummer: 3, id: 'keer', naam: 'Kees Keer', onderwerp: 'vermenigvuldigen' },
  { nummer: 4, id: 'deel', naam: 'Dina Deel', onderwerp: 'delen' },
  { nummer: 5, id: 'klok', naam: 'Klaas Klok', onderwerp: 'klokkijken' },
  { nummer: 6, id: 'tafel', naam: 'Tijn Tafel', onderwerp: 'tafels' },
];
