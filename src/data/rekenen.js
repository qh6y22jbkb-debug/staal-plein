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

/*
 * ============================================================
 *  REKENSPELLEN: instellingen voor het DHTE-schema
 * ============================================================
 *  Pas dit aan zodat het past bij de rekenmethode van school.
 */
export const REKEN_INSTELLINGEN = {
  sommenPerRonde: 5, // aantal sommen in één ronde
  klokVragenPerRonde: 6, // aantal klokvragen in één ronde (Klaas Klok)
  tafelVragenPerRonde: 10, // aantal sommen in één tafelrace (Tijn Tafel): zoveel stappen tot de finish
  onthoudPlek: 'boven', // 'boven' = onthoud-cijfer boven de kolom (boven de getallen), 'onder' = onder de getallen, vlak boven de streep
  onthoudVerplicht: true, // true = de onthoud-vakjes moeten ingevuld worden; false = mag leeg blijven (een fout getal is wel fout)
  // Aftrekken: in het vakje boven een kolom schrijf je het nieuwe getal na het inwisselen (bijv. 4 en 12).
  // Bij een kolom die niet verandert, blijft het vakje leeg (het oude cijfer nog eens opschrijven mag ook).
  nulZelfInvullen: false, // keersom met 2 cijfers (Goud): false = de 0 in de tweede regel staat er al, true = kind typt de 0 zelf
};

/*
 * Regels per niveau (1 = Brons, 2 = Zilver, 3 = Goud). De sommen worden steeds willekeurig gemaakt.
 *  min / max          kleinste en grootste getal
 *  onthouden          hoe vaak je moet onthouden: { min, max } (max weglaten = geen maximum)
 *  inwisselen         hoe vaak je moet inwisselen bij aftrekken
 *  overNul            aftrekken: inwisselen over een nul heen (bijv. 4003 - 1678)
 *  maxUitkomst        de uitkomst mag niet groter zijn dan dit
 *  varianten          meerdere soorten sommen door elkaar
 */
export const REKEN_REGELS = {
  plus: {
    1: { aantalGetallen: 2, min: 100, max: 999, onthouden: { min: 1, max: 1 }, maxUitkomst: 999 },
    2: { aantalGetallen: 2, min: 1000, max: 9999, onthouden: { min: 2 }, maxUitkomst: 9999 },
    3: {
      varianten: [
        { aantalGetallen: 3, min: 100, max: 9999, onthouden: { min: 1 }, maxUitkomst: 99999 },
        { aantalGetallen: 2, min: 10000, max: 99999, onthouden: { min: 1 }, maxUitkomst: 99999 },
      ],
    },
  },
  min: {
    1: { min: 100, max: 999, minTweede: 10, inwisselen: { min: 1, max: 1 } },
    2: { min: 1000, max: 9999, minTweede: 100, inwisselen: { min: 2 } },
    3: { min: 1000, max: 9999, minTweede: 100, inwisselen: { min: 1 }, overNul: true },
  },
  keer: {
    1: { cijfersBoven: 3, cijfersOnder: 1, onthouden: { min: 1 } },
    2: { cijfersBoven: 4, cijfersOnder: 1, onthouden: { min: 1 } },
    3: { cijfersBoven: 2, cijfersOnder: 2 },
  },
  // Delen (staartdeling): deeltal = het getal dat je deelt, deelgetal = waardoor je deelt.
  // rest: 'nee' = er blijft niets over, 'ja' = er blijft altijd iets over, 'mag' = allebei kan.
  deel: {
    1: { deeltal: { min: 100, max: 999 }, deelgetal: { min: 2, max: 9 }, rest: 'nee' },
    2: {
      varianten: [
        { deeltal: { min: 100, max: 999 }, deelgetal: { min: 2, max: 9 }, rest: 'ja' },
        { deeltal: { min: 1000, max: 9999 }, deelgetal: { min: 2, max: 9 }, rest: 'ja' },
      ],
    },
    3: { deeltal: { min: 1000, max: 9999 }, deelgetal: { min: 12, max: 39 }, rest: 'mag' },
  },
  // Klokkijken. soorten = welke vragen er komen (door elkaar):
  //  kiesAnaloogWoorden  klok aflezen, kiezen uit 3 tijden in woorden (bijv. kwart over drie)
  //  versleepWoorden     zelf de wijzers verslepen naar een tijd in woorden
  //  kiesAnaloogDigitaal klok aflezen, kiezen uit 3 digitale tijden (bijv. 3:20)
  //  kiesDigitaalAnaloog digitale tijd, kiezen uit 3 klokken
  //  versleepDigitaal    wijzers verslepen naar een digitale tijd
  //  kies24Woorden       24-uurstijd (14:35) → in woorden met dagdeel (vijf over half drie 's middags)
  //  kiesWoorden24       in woorden met dagdeel → 24-uurstijd
  //  versleep24          wijzers verslepen naar een 24-uurstijd
  //  tijdsduur           begintijd + hoe lang het duurt → hoe laat is het afgelopen?
  // minuten = om de hoeveel minuten de tijden vallen; sleepStap = hoe de lange wijzer verspringt bij het slepen.
  klok: {
    1: { soorten: ['kiesAnaloogWoorden', 'kiesAnaloogWoorden', 'versleepWoorden'], minuten: 15, sleepStap: 5 },
    2: { soorten: ['kiesAnaloogDigitaal', 'kiesDigitaalAnaloog', 'versleepDigitaal'], minuten: 1, sleepStap: 1 },
    3: { soorten: ['kies24Woorden', 'kiesWoorden24', 'versleep24', 'tijdsduur', 'tijdsduur'], minuten: 5, sleepStap: 1 },
  },
  // Tafels (tafelrace). tafels = de tafels om uit te kiezen, doorElkaar = welke tafels bij "Alle tafels door elkaar",
  // deelsommen = ook deelsommen (bijv. 24 : 4), deelKans = hoe vaak een deelsom (0 = nooit, 1 = altijd).
  tafel: {
    1: { tafels: [1, 2, 5, 10], doorElkaar: [1, 2, 5, 10], deelsommen: false, deelKans: 0 },
    2: { tafels: [3, 4, 6], doorElkaar: [3, 4, 6], deelsommen: true, deelKans: 0.35 },
    3: { tafels: [7, 8, 9], doorElkaar: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], deelsommen: true, deelKans: 0.4 },
  },
};

/* Teksten van de rekenspellen. {totaal} = aantal sommen, {aantal} = in één keer goed. */
export const REKEN_SPELLEN = {
  plus: {
    titel: 'Optellen met Pim',
    opdracht: 'Reken de som uit. Begin rechts bij de E en werk naar links.',
    niveaus: ['Twee getallen tot 1000, één keer onthouden', 'Twee getallen tot 10.000, vaker onthouden', 'Drie getallen, of getallen tot 100.000'],
  },
  min: {
    titel: 'Aftrekken met Mila',
    opdracht: 'Reken de som uit. Begin rechts. Wissel in als het bovenste cijfer te klein is.',
    niveaus: ['Getallen tot 1000, één keer inwisselen', 'Getallen tot 10.000, vaker inwisselen', 'Inwisselen over een nul heen'],
  },
  tafel: {
    titel: 'Tafelrace met Tijn',
    opdracht: 'Typ het antwoord en druk op Enter. Elk goed antwoord laat je verder rennen!',
    niveaus: ['Tafels van 1, 2, 5 en 10', 'Tafels van 3, 4 en 6, ook delen', 'Tafels van 7, 8 en 9, en alles door elkaar'],
  },
  klok: {
    titel: 'Klokkijken met Klaas',
    opdracht: 'Lees de klok, of zet de wijzers zelf goed.',
    niveaus: ['Hele uren, halve uren en kwartieren', 'Op de minuut, analoog en digitaal', '24-uursklok en hoe lang iets duurt'],
  },
  deel: {
    titel: 'Staartdelingen met Dina',
    opdracht: 'Maak de staartdeling. Begin links en werk stap voor stap naar beneden.',
    niveaus: ['3 cijfers gedeeld door 1 cijfer, zonder rest', '3 of 4 cijfers gedeeld door 1 cijfer, met rest', '4 cijfers gedeeld door 2 cijfers'],
  },
  keer: {
    titel: 'Keersommen met Kees',
    opdracht: 'Reken de som uit. Begin rechts en onthoud het tiental.',
    niveaus: ['3 cijfers keer 1 cijfer', '4 cijfers keer 1 cijfer', '2 cijfers keer 2 cijfers'],
  },
};

export const REKEN_TEKSTEN_SPEL = {
  niveauNamen: ['🥉 Brons', '🥈 Zilver', '🥇 Goud'],
  klaarTekst: 'Je hebt alle {totaal} sommen gemaakt. {aantal} keer had je het in één keer goed!',
  klaarTekstKlok: 'Je hebt alle {totaal} vragen gedaan. {aantal} keer had je het in één keer goed!',
  terug: 'Terug naar het lokaal',
  vulAlles: 'Vul eerst alle vakjes van het antwoord in.',
  koenTip: 'Lukt het niet? Vraag Meester Koen om hulp!',
  alles: 'Je bent klaar met deze som. Druk op Controleer!',
  niveauGehaald: '{medaille} gehaald bij {naam}!',
  kolommen: ['E', 'T', 'H', 'D', 'TD', 'HD'],
  // Uitleg onder het schema.
  overslaanOnthoud: 'Niets te onthouden? Typ een 0 of druk op de spatiebalk.',
  overslaanInwissel: 'Niet ingewisseld? Laat het vakje leeg: druk op de spatiebalk.',
  uitlegDeel: 'Per stap: het antwoord bovenaan, dan het keer-getal, het aftrekken en het cijfer dat naar beneden komt.',
  rest: 'rest',
};

/* Klokkijken (Klaas Klok). */
export const KLOK_TEKSTEN = {
  hoeLaat: 'Hoe laat is het?',
  welkeKlok: 'Welke klok wijst {tijd} aan?',
  zetOp: 'Zet de klok op {tijd}.',
  inWoorden: 'Hoe zeg je {tijd} in woorden?',
  alsDigitaal: 'Welke tijd hoort bij {tijd}?',
  tijdsduur: '{wat} begint om {begin} en duurt {duur}. Hoe laat is {kort} afgelopen?',
  watLijst: [
    { wat: 'De film', kort: 'de film' },
    { wat: 'De voetbalwedstrijd', kort: 'de wedstrijd' },
    { wat: 'Het toneelstuk', kort: 'het toneelstuk' },
    { wat: 'De zwemles', kort: 'de zwemles' },
    { wat: 'Het verjaardagsfeest', kort: 'het feest' },
    { wat: 'De busreis', kort: 'de busreis' },
  ],
  langeWijzer: 'Lange wijzer',
  korteWijzer: 'Korte wijzer',
  sleepUitleg: 'Sleep de wijzers met je muis of vinger. Of gebruik de knopjes.',
  controleer: '✓ Controleer',
  // Hints bij een fout.
  foutKies: 'Kijk eerst naar de korte wijzer (de uren), dan naar de lange wijzer (de minuten).',
  foutKies24: 'Na 12 uur tel je door: 13 uur is 1 uur \'s middags. Haal er 12 af.',
  foutTijdsduur: 'Tel eerst de hele uren erbij op, dan de minuten. Kom je over het hele uur? Dan komt er een uur bij.',
  foutLang: 'De lange wijzer (minuten) staat nog niet goed.',
  foutKort: 'De korte wijzer (uren) staat nog niet goed.',
  foutKortHalf: 'Let op: bij half, kwart voor en … voor half staat de korte wijzer al voorbij het uur, op weg naar het volgende uur.',
  // Tips van de meesters.
  jopRegel: 'De korte wijzer wijst de uren aan, de lange wijzer de minuten. Bij de 3 is het kwart over, bij de 6 half, bij de 9 kwart voor.',
  jop24: 'Na 12 uur \'s middags tel je door: 13:00 is 1 uur \'s middags, 14:00 is 2 uur. Haal er dus 12 af.',
  jopDuur: 'Tel eerst de hele uren erbij op. Tel daarna de minuten erbij: eerst tot het hele uur, dan de rest.',
  bramLang: 'Begin met de lange wijzer: die heb ik geel gekleurd. Die wijst de minuten aan.',
  bramKort: 'Nu de korte wijzer (geel): die wijst de uren aan.',
  bramKies: 'Ik heb een fout antwoord weggestreept.',
  bramKlaar: 'Beide wijzers staan goed. Druk op Controleer!',
};

/* Tafelrace (Tijn Tafel). */
export const TAFEL_TEKSTEN = {
  kiesTafel: 'Welke tafel wil je oefenen?',
  tafelVan: 'Tafel van {tafel}',
  alles: 'Alle tafels door elkaar',
  jij: 'Jij',
  tegenstander: 'Tijn',
  teller: '{nr} van {totaal}',
  start: 'Klaar? Af!',
  fout: 'Nog niet goed. Probeer het nog eens! Tijn wacht even op je.',
  foutKeer: 'Tel steeds {tafel} erbij, of begin bij een som die je al weet.',
  foutDeel: 'Welk getal keer {tafel} is {getal}?',
  gewonnen: '🏆 Jij wint de tafelrace!',
  verloren: 'Tijn was net iets eerder bij de finish. Volgende keer pak je hem!',
  klaarTekst: 'Je hebt alle {totaal} sommen goed gemaakt. {aantal} keer in één keer goed!',
  // Tips
  jopKeer: 'Een tafel is steeds hetzelfde getal erbij. Weet je {som} niet? Begin bij een som die je wel weet, zoals 5 × {tafel} of 10 × {tafel}.',
  jopDeel: 'Delen is terugrekenen: welk getal keer {tafel} is {getal}? Zeg de tafel van {tafel} op tot je bij {getal} bent.',
  bramKeer: 'Ik heb de tafel van {tafel} voor je opgeschreven. Het gele vakje is jouw antwoord.',
  bramDeel: 'Ik heb de tafel van {tafel} opgeschreven tot {getal}. Tel hoeveel stappen het zijn!',
};

/* De tips van de drie meesters. */
export const REKEN_TIPS = {
  jop: {
    naam: 'Meester Jop', icoon: '👨‍🏫', knop: 'Tip van Meester Jop',
    // Meester Jop herinnert aan de regel of de eerste stap. {kolom} = de kolom waar je nu bent.
    regels: {
      plusEerste: 'Begin rechts, bij de eenheden! Tel de cijfers in de E-kolom bij elkaar op.',
      plus: 'Nu de {kolom}-kolom. Tel de cijfers op en vergeet het onthoud-cijfer niet!',
      plusLaatste: 'Dit is de laatste kolom ({kolom}). Tel op, met het onthoud-cijfer, en schrijf het hele getal op.',
      minEerste: 'Begin rechts, bij de eenheden! Is het bovenste cijfer kleiner dan het onderste? Dan wissel je in.',
      min: 'Nu de {kolom}-kolom. Is er al ingewisseld? Reken dan met het nieuwe getal in het vakje erboven.',
      keerEerste: 'Begin rechts! Keer het onderste cijfer met het cijfer in de E-kolom.',
      keer: 'Nu de {kolom}-kolom: keer, en tel het onthoud-cijfer erbij op.',
      keerLaatste: 'Laatste cijfer ({kolom}): keer, tel het onthoud-cijfer erbij op en schrijf het hele getal op.',
      keerRegel2Nul: 'Nu de tweede regel: je rekent met het tiental. Zet eerst een 0 bij de E.',
      keerRegel2Eerste: 'Tweede regel: keer het tiental van het onderste getal met het cijfer rechts. De 0 bij de E staat er al.',
      keerRegel2: 'Tweede regel, {kolom}-kolom: keer met het tiental en tel het onthoud-cijfer erbij op.',
      keerRegel2Laatste: 'Tweede regel, laatste cijfer: keer, tel het onthoud-cijfer erbij op en schrijf het hele getal op.',
      keerOptellenEerste: 'Tel nu de twee regels bij elkaar op. Begin rechts, bij de E!',
      keerOptellen: 'Tel de twee regels op in de {kolom}-kolom. Vergeet het onthoud-cijfer niet!',
      keerOptellenLaatste: 'Laatste kolom van het optellen ({kolom}): schrijf het hele getal op.',
      deelEerste: 'Begin links! Pak het eerste stukje dat groot genoeg is: {stukje}. Hoe vaak past {deler} daarin?',
      deel: 'Hoe vaak past {deler} in {stukje}? Schrijf dat bovenaan, keer terug, trek af en haal het volgende cijfer naar beneden.',
      deelLaatste: 'Laatste stap: hoe vaak past {deler} in {stukje}? Wat je overhoudt, is de rest.',
    },
  },
  bram: { naam: 'Meester Bram', icoon: '🖍️', knop: 'Meester Bram kleurt', tekst: 'Kijk naar de gele vakjes: daar ben je nu.' },
  koen: { naam: 'Meester Koen', icoon: '👣', knop: 'Samen met Meester Koen' },
};

/* Vriendelijke hints bij een fout. {kolom} = de kolom waar het misgaat. */
export const REKEN_FOUT = {
  kolom: 'Kijk nog eens naar de {kolom}-kolom.',
  plus: 'Tel alle cijfers in die kolom op, ook het onthoud-cijfer.',
  min: 'Haal het onderste cijfer van het bovenste af.',
  keer: 'Keer de cijfers en tel het onthoud-cijfer erbij op.',
  onthoud: 'Het onthoud-cijfer boven de {kolom}-kolom klopt nog niet.',
  inwissel: 'Kijk naar het vakje boven de {kolom}-kolom. Heb je goed ingewisseld?',
  regel1: 'In de eerste regel: ',
  regel2: 'In de tweede regel: ',
  optellen: 'Bij het optellen van de regels: ',
  // Staartdeling. {stukje} = het getal waar je mee bezig bent, {deler} = het deelgetal.
  deelAntwoord: 'Kijk nog eens naar het cijfer bovenaan: hoe vaak past {deler} in {stukje}?',
  deelKeer: 'Kijk naar het keer-getal: reken het cijfer bovenaan keer {deler}.',
  deelAftrekken: 'Kijk naar het aftrekken: {stukje} min het keer-getal.',
  deelOmlaag: 'Welk cijfer haal je naar beneden? Neem het volgende cijfer van het deeltal.',
  deelRest: 'Kijk naar de rest: dat is wat er onderaan overblijft.',
};
