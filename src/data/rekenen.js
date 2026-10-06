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
 * De zes lokalen, elk met één rekenkraam. Lokaal 1 t/m 3 liggen links van het leerplein, 4 t/m 6 rechts.
 * naam        = naam van de kraam en het karakter (staat op het bord bij de deur)
 * onderwerp   = klein onder de naam op het bord
 * begroeting  = wat het karakter zegt als je op E drukt
 * uitleg      = de uitleg bij "Leg het nog eens uit" (kort: max. 4 zinnen). Wordt ook voorgelezen.
 */
export const LOKALEN = [
  {
    nummer: 1, id: 'plus', naam: 'Pim Plus', onderwerp: 'optellen', icoon: '➕',
    begroeting: 'Hoi, ik ben Pim Plus! Bij mij tel je grote getallen op, netjes onder elkaar.',
    uitleg: [
      { tekst: 'Zet de getallen netjes onder elkaar. Begin rechts bij de E. Is het samen 10 of meer? Schrijf de eenheden op en zet het tiental als onthoud-cijfer boven de volgende kolom.' },
    ],
  },
  {
    nummer: 2, id: 'min', naam: 'Mila Min', onderwerp: 'aftrekken', icoon: '➖',
    begroeting: 'Hallo, ik ben Mila Min! Bij mij trek je getallen van elkaar af, onder elkaar.',
    uitleg: [
      { tekst: 'Zet de getallen onder elkaar en begin rechts. Is het bovenste cijfer te klein? Dan wissel je in: je haalt er één van de kolom links af en krijgt er 10 bij.' },
    ],
  },
  {
    nummer: 3, id: 'keer', naam: 'Kees Keer', onderwerp: 'vermenigvuldigen', icoon: '✖️',
    begroeting: 'Hé, ik ben Kees Keer! Bij mij maak je keersommen, netjes onder elkaar.',
    uitleg: [
      { tekst: 'Begin rechts. Keer het onderste cijfer met elk cijfer van boven. Is het 10 of meer? Schrijf de eenheden op en onthoud het tiental voor de volgende kolom.' },
    ],
  },
  {
    nummer: 4, id: 'deel', naam: 'Dina Deel', onderwerp: 'delen', icoon: '➗',
    begroeting: 'Hoi, ik ben Dina Deel! Bij mij leer je de staartdeling, stap voor stap.',
    uitleg: [
      { tekst: 'Kijk hoe vaak het deelgetal in het eerste stukje past. Schrijf dat op, keer terug, trek af en haal het volgende cijfer naar beneden. Herhaal tot je klaar bent.' },
    ],
  },
  {
    nummer: 5, id: 'klok', naam: 'Klaas Klok', onderwerp: 'klokkijken', icoon: '🕒',
    begroeting: 'Tik tak! Ik ben Klaas Klok. Bij mij leer je klokkijken.',
    uitleg: [
      { tekst: 'De korte wijzer wijst de uren aan, de lange wijzer de minuten. Bij de 3 is het kwart over, bij de 6 half, bij de 9 kwart voor.' },
    ],
  },
  {
    nummer: 6, id: 'tafel', naam: 'Tijn Tafel', onderwerp: 'tafels', icoon: '🏁',
    begroeting: 'Hoi, ik ben Tijn Tafel! Bij mij oefen je de tafels van 1 tot en met 10.',
    uitleg: [
      { tekst: 'Een tafel is steeds hetzelfde getal erbij. Weet je 5 x 7 niet? Begin bij 5 x 5 = 25 en tel er twee keer 5 bij.' },
    ],
  },
];

export const REKEN_TEKSTEN = {
  // Tijdelijk, tot de rekenspellen klaar zijn (stap 3 t/m 6).
  spelKomtEraan: 'Mijn spel is bijna klaar! Kom straks nog eens terug.',
};
