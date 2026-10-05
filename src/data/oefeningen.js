/*
 * ============================================================
 *  ALLE TEKSTEN VAN HET SPEL – Staal groep 7, blok 2
 * ============================================================
 *  Leerkrachten: hier kun je alles aanpassen.
 *  - Houd zinnen kort.
 *  - Tussen **sterretjes** wordt een stukje tekst gekleurd (bijv. ik werk**te**).
 *  - Een pijl schrijf je als →
 *  - Bewaar het bestand; het spel ververst vanzelf (bij npm run dev).
 * ============================================================
 */

export const KRAMEN = [
  {
    id: 'kofschip',
    kraamNaam: 'Kapitein Kofschip',
    karakterNaam: 'Kapitein Kofschip',
    icoon: '🏴‍☠️',
    leerdoel: "'t kofschip-x",
    begroeting: "Ahoi, matroos! Ik ben Kapitein Kofschip. Bij mij leer je of een werkwoord in de verleden tijd -te of -de krijgt.",
    uitleg: [
      {
        tekst: "Neem het hele werkwoord en haal er -en af. Is de laatste letter een letter uit 't kofschip-x (t, k, f, s, ch, p, x)? Dan schrijf je ik-vorm + te(n). Anders ik-vorm + de(n).",
        voorbeeld: 'werken → werk → de **k** zit erin → ik werk**te**, wij werk**ten**',
      },
      {
        tekst: "Let op: alleen de medeklinkers tellen mee. De o en de i in 't kofschip doen niet mee!",
        voorbeeld: 'bouwen → bouw → de **w** zit er niet in → ik bouw**de**',
      },
    ],
  },
  {
    id: 'taarten',
    kraamNaam: "Tante Tessa's Taarten",
    karakterNaam: 'Tante Tessa',
    icoon: '🎂',
    leerdoel: 'verleden tijd met -te(n)',
    begroeting: 'Hallo schat! Ik ben Tante Tessa. In mijn taartenkraam bakken we werkwoorden met -te en -ten.',
    uitleg: [
      {
        tekst: "Zit de laatste letter in 't kofschip-x? Dan krijgt de verleden tijd -te. Bij wij, jullie en zij wordt het -ten.",
        voorbeeld: 'fietsen → ik fiets**te** – wij fiets**ten**',
      },
      {
        tekst: 'Let op! Eindigt de ik-vorm al op een t? Dan komt er toch nog -te achter. Zo krijg je twee keer t!',
        voorbeeld: 'planten → ik plant → ik plan**tte** – wij plan**tten**',
      },
    ],
  },
  {
    id: 'drummer',
    kraamNaam: 'Dirk de Drummer',
    karakterNaam: 'Dirk de Drummer',
    icoon: '🥁',
    leerdoel: 'verleden tijd met -de(n)',
    begroeting: 'Yo! Ik ben Dirk de Drummer. Boem-boem-de! Bij mij hoor je werkwoorden met -de en -den.',
    uitleg: [
      {
        tekst: "Zit de laatste letter níet in 't kofschip-x? Dan krijgt de verleden tijd -de. Bij wij, jullie en zij wordt het -den.",
        voorbeeld: 'rennen → ik ren**de** – wij ren**den**',
      },
      {
        tekst: 'Let op! Eindigt de ik-vorm al op een d? Dan komt er toch nog -de achter. Zo krijg je twee keer d!',
        voorbeeld: 'branden → ik brand → ik bran**dde** – wij bran**dden**',
      },
    ],
  },
  {
    id: 'voorvoegsel',
    kraamNaam: 'Vera Voorvoegsel',
    karakterNaam: 'Vera Voorvoegsel',
    icoon: '🔤',
    leerdoel: 'werkwoorden met be-, ge-, ver-, her-, ont-',
    begroeting: 'Goedendag! Ik ben Vera Voorvoegsel. Ik verzamel werkwoorden die beginnen met be-, ge-, ver-, her- of ont-.',
    uitleg: [
      {
        tekst: "Staat er be-, ge-, ver-, her- of ont- voor het werkwoord? De regel blijft precies hetzelfde! Kijk naar de ik-vorm en gebruik 't kofschip-x.",
        voorbeeld: 'verplanten → verplant → **t** → ik verplan**tte**<br>verbranden → verbrand → **d** → ik verbran**dde**',
      },
      {
        tekst: "Je hoort het verschil niet altijd. Zeg er daarom 'gisteren' bij. Dan weet je zeker dat het verleden tijd is.",
        voorbeeld: 'Vandaag verplant ik een boom.<br>Gisteren verplan**tte** ik een boom.',
      },
    ],
  },
  {
    id: 'poffertjes',
    kraamNaam: 'Poffertjeskraam',
    karakterNaam: 'Peter & Olga',
    icoon: '🥞',
    leerdoel: 'persoonsvorm en onderwerp',
    begroeting: 'Hoi! Wij zijn Peter Persoonsvorm en Olga Onderwerp. Wij bakken de lekkerste poffertjes én zinnen!',
    uitleg: [
      {
        spreker: 'Peter Persoonsvorm',
        tekst: 'Zo vind je de persoonsvorm. Maak de zin vragend: het woord dat vooraan komt, is de persoonsvorm (vraagproef). Of verander de tijd: het werkwoord dat verandert, is de persoonsvorm (tijdproef).',
        voorbeeld: 'Olga bakt poffertjes.<br>Vraagproef: **Bakt** Olga poffertjes?<br>Tijdproef: Olga **bakte** poffertjes.',
      },
      {
        spreker: 'Olga Onderwerp',
        tekst: 'Zo vind je het onderwerp. Vraag: wie of wat + persoonsvorm? Het antwoord is het onderwerp.',
        voorbeeld: 'Olga bakt poffertjes.<br>Wie bakt? → **Olga**. Olga is het onderwerp.',
      },
    ],
  },
  {
    id: 'ijs',
    kraamNaam: 'IJskraam Gijs',
    karakterNaam: 'Gijs Gezegde',
    icoon: '🍦',
    leerdoel: 'werkwoordelijk gezegde',
    begroeting: 'Hé hallo! Ik ben Gijs Gezegde. Bij mij stapel je werkwoorden als ijsbolletjes!',
    uitleg: [
      {
        tekst: 'Het werkwoordelijk gezegde zijn alle werkwoorden in de zin samen. De persoonsvorm hoort er dus ook bij!',
        voorbeeld: 'Ik **heb** een ijsje **gekocht**.<br>Werkwoordelijk gezegde: heb gekocht',
      },
      {
        tekst: 'Zoek eerst de persoonsvorm. Zoek daarna de andere werkwoorden. Samen zijn ze het werkwoordelijk gezegde.',
        voorbeeld: 'Wij **willen** morgen ijs **gaan eten**.<br>Werkwoordelijk gezegde: willen gaan eten',
      },
    ],
  },
];

/** Vaste teksten in het spel. */
export const TEKSTEN = {
  praatToets: 'Druk op E om te praten',
  praatTik: 'Tik hier om te praten',
  kindToets: 'Druk op E om met {naam} te praten',
  kindTik: 'Tik hier om met {naam} te praten',
  knopUitleg: 'Leg het nog eens uit',
  knopSpelen: 'Ik wil spelen!',
  knopDoei: 'Doei!',
  knopVerder: 'Verder ▶',

  // Startscherm
  startTitel: 'Staal Plein',
  startOndertitel: 'Taalfeest op het schoolplein van De Bunders · Staal blok 2',
  startUitleg: 'Loop over het plein en praat met de karakters achter de kramen. Speel hun spel en verzamel 6 stempels! Een stempel krijg je als je bij een kraam alle 3 de niveaus haalt.',
  startExtra: '🪙 Verdien munten, zoek verstopte muntjes, beantwoord de vragen van de meesters en koop coole kleding in De Bunders Boetiek!',
  startVerder: 'Welkom terug! Je hebt al {aantal} van de 6 stempels.',
  startKnop: 'Spelen',
  startKnopVerder: 'Verder spelen',

  // Knoppen rechtsboven
  voorlezenAan: 'Voorlezen staat aan',
  voorlezenUit: 'Voorlezen staat uit',
  geluidAan: 'Geluid staat aan',
  geluidUit: 'Geluid staat uit',
  opnieuwKnop: 'Opnieuw beginnen',
  opnieuwVraag: 'Weet je het zeker? Al je stempels, munten en kleding worden gewist.',
  opnieuwJa: 'Ja, opnieuw beginnen',
  opnieuwNee: 'Nee, toch niet',

  // Stempels en feest
  stempelErbij: '⭐ Alle 3 de niveaus gehaald! Je krijgt een stempel op je stempelkaart!',
  stempelNog: 'Nog {aantal} te gaan, dan krijg je een stempel!',
  feestTekst: 'Hoera! Je hebt alle 6 stempels! Feest op het plein!',
  oorkondeTitel: 'Staal Blok 2 Kampioen!',
  oorkondeSchool: 'Basisschool De Bunders · groep 7',
  oorkondeVoor: 'Deze oorkonde is voor',
  oorkondeNaam: 'Typ hier je naam',
  oorkondeTekst: 'Jij hebt bij alle zes de kramen op het schoolplein een stempel verdiend. Je bent een echte taalkampioen!',
  oorkondeHandtekening: 'handtekening juf of meester',
  oorkondePrint: 'Afdrukken',
  oorkondeVerder: 'Verder spelen',
};

/*
 * ============================================================
 *  DE MINISPELLEN
 * ============================================================
 *  Per ronde kiest het spel willekeurig 8 vragen uit de lijst.
 *  Zorg dat er per spel minstens 8 vragen in staan.
 *  LET OP: gebruik bij de verleden tijd alleen ZWAKKE werkwoorden ('t kofschip-x).
 *  Sterke werkwoorden veranderen van klank (zwemmen → zwom, lopen → liep) en horen hier niet.
 * ============================================================
 */
export const SPELLEN = {
  /* 1. Kapitein Kofschip – kies de schatkist "te" of "de".
   *    hele = het hele werkwoord, ik = de ik-vorm, uitgang = 'te' of 'de'.
   *    niveau = 1, 2 of 3 sterren. Bij 2 en 3 sterren komen ook makkelijkere vragen voor. */
  kofschip: {
    titel: 'De schatkisten van Kapitein Kofschip',
    opdracht: 'Krijgt dit werkwoord -te of -de? Kies de goede schatkist!',
    opdrachtTypen: 'Typ de verleden tijd. Krijgt het -te of -de?',
    niveaus: [
      'Gewone werkwoorden. Kies de schatkist -te of -de.',
      'Typ zelf de verleden tijd. De ik-vorm staat erbij als hulp.',
      'Typ zelf de verleden tijd, zonder hulp. Ook strikvragen zoals leven en reizen!',
    ],
    vragen: [
      { hele: 'werken', ik: 'werk', uitgang: 'te', niveau: 1 },
      { hele: 'fietsen', ik: 'fiets', uitgang: 'te', niveau: 1 },
      { hele: 'koken', ik: 'kook', uitgang: 'te', niveau: 1 },
      { hele: 'hopen', ik: 'hoop', uitgang: 'te', niveau: 1 },
      { hele: 'lachen', ik: 'lach', uitgang: 'te', niveau: 2 },
      { hele: 'maken', ik: 'maak', uitgang: 'te', niveau: 1 },
      { hele: 'dansen', ik: 'dans', uitgang: 'te', niveau: 1 },
      { hele: 'straffen', ik: 'straf', uitgang: 'te', niveau: 2 },
      { hele: 'mixen', ik: 'mix', uitgang: 'te', niveau: 2 },
      { hele: 'stoppen', ik: 'stop', uitgang: 'te', niveau: 2 },
      { hele: 'missen', ik: 'mis', uitgang: 'te', niveau: 2 },
      { hele: 'praten', ik: 'praat', uitgang: 'te', niveau: 3 },
      { hele: 'spelen', ik: 'speel', uitgang: 'de', niveau: 1 },
      { hele: 'wonen', ik: 'woon', uitgang: 'de', niveau: 1 },
      { hele: 'leren', ik: 'leer', uitgang: 'de', niveau: 1 },
      { hele: 'bouwen', ik: 'bouw', uitgang: 'de', niveau: 1 },
      { hele: 'huilen', ik: 'huil', uitgang: 'de', niveau: 1 },
      { hele: 'rennen', ik: 'ren', uitgang: 'de', niveau: 2 },
      { hele: 'branden', ik: 'brand', uitgang: 'de', niveau: 3 },
      { hele: 'horen', ik: 'hoor', uitgang: 'de', niveau: 1 },
      { hele: 'bellen', ik: 'bel', uitgang: 'de', niveau: 2 },
      { hele: 'kammen', ik: 'kam', uitgang: 'de', niveau: 2 },
      { hele: 'leven', ik: 'leef', uitgang: 'de', niveau: 3 },
      { hele: 'reizen', ik: 'reis', uitgang: 'de', niveau: 3 },
      { hele: 'blaffen', ik: 'blaf', uitgang: 'te', niveau: 2 },
      { hele: 'verhuizen', ik: 'verhuis', uitgang: 'de', niveau: 3 },
      { hele: 'geloven', ik: 'geloof', uitgang: 'de', niveau: 3 },
      { hele: 'antwoorden', ik: 'antwoord', uitgang: 'de', niveau: 3 },
      { hele: 'zetten', ik: 'zet', uitgang: 'te', niveau: 3 },
      { hele: 'rusten', ik: 'rust', uitgang: 'te', niveau: 3 },
    ],
  },

  /* 2. Tante Tessa – vul het ontbrekende stukje in (-te, -ten, -tte, -tten).
   *    Zet __ op de plek van het werkwoord-stukje.
   *    ik = de ik-vorm, meer = true als het om meer personen of dingen gaat (wij, jullie, zij, de kinderen).
   *    1 ster: alleen zinnen met meer: false. */
  taarten: {
    titel: 'De taartenbakkerij van Tante Tessa',
    opdracht: 'Welk stukje hoort op de lege plek?',
    opdrachtTypen: 'Typ wat er op de lege plek hoort.',
    niveaus: [
      'Eén persoon of ding. Kies uit -te of -tte.',
      'Typ zelf het stukje dat ontbreekt. Ook met wij, jullie en zij.',
      'Typ zelf het hele woord. Alleen het hele werkwoord staat erbij.',
    ],
    vragen: [
      { zin: 'Gisteren werk__ ik in de tuin.', hele: 'werken', ik: 'werk', meer: false },
      { zin: 'Wij fiets__ samen naar het bos.', hele: 'fietsen', ik: 'fiets', meer: true },
      { zin: 'Mama kook__ gisteren soep.', hele: 'koken', ik: 'kook', meer: false },
      { zin: 'De kinderen maak__ een mooie tekening.', hele: 'maken', ik: 'maak', meer: true },
      { zin: 'Ik lach__ om de grap van Tim.', hele: 'lachen', ik: 'lach', meer: false },
      { zin: 'Oma dans__ op het feest.', hele: 'dansen', ik: 'dans', meer: false },
      { zin: 'Ik hoop__ op mooi weer.', hele: 'hopen', ik: 'hoop', meer: false },
      { zin: 'Gisteren plan__ ik een boom.', hele: 'planten', ik: 'plant', meer: false },
      { zin: 'Wij plan__ bloemen in de tuin.', hele: 'planten', ik: 'plant', meer: true },
      { zin: 'De juf praa__ met de directeur.', hele: 'praten', ik: 'praat', meer: false },
      { zin: 'Na het voetballen rus__ wij even.', hele: 'rusten', ik: 'rust', meer: true },
      { zin: 'Ik wach__ op de bus.', hele: 'wachten', ik: 'wacht', meer: false },
      { zin: 'Jullie wach__ heel lang op een ijsje.', hele: 'wachten', ik: 'wacht', meer: true },
      { zin: 'Tom poets__ zijn tanden.', hele: 'poetsen', ik: 'poets', meer: false },
      { zin: 'Wij poets__ de ramen van de klas.', hele: 'poetsen', ik: 'poets', meer: true },
      { zin: 'Papa maak__ pannenkoeken.', hele: 'maken', ik: 'maak', meer: false },
    ],
  },

  /* 3. Dirk de Drummer – vang de goed gespelde woorden, ontwijk de foute.
   *    Bij elk fout woord staat het goede woord, voor de hint.
   *    Bij 1 ster vallen alleen foute woorden van niveau 1; bij 2 en 3 sterren alle foute woorden. */
  drummer: {
    titel: 'De woordenregen van Dirk de Drummer',
    opdracht: 'Vang de goed geschreven woorden met je trommel. Ontwijk de foute!',
    opdrachtTypen: 'Typ de verleden tijd voordat het woord de grond raakt!',
    niveaus: [
      'Vang de goed geschreven woorden met je trommel.',
      'Er valt een werkwoord. Typ de verleden tijd voordat het de grond raakt!',
      'Sneller! En ook met wij, jullie en zij.',
    ],
    klaarTekst: 'Je hebt 8 goede woorden gevangen. {aantal} keer zonder fout woord ertussen. Wat een ritme!',
    // Bij 2 en 3 sterren valt er een heel werkwoord en typ je de verleden tijd.
    // hele = het hele werkwoord, ik = de ik-vorm. niveau 3 = ook met dubbel d.
    typWoorden: [
      { hele: 'spelen', ik: 'speel', niveau: 2 },
      { hele: 'wonen', ik: 'woon', niveau: 2 },
      { hele: 'leren', ik: 'leer', niveau: 2 },
      { hele: 'bouwen', ik: 'bouw', niveau: 2 },
      { hele: 'huilen', ik: 'huil', niveau: 2 },
      { hele: 'rennen', ik: 'ren', niveau: 2 },
      { hele: 'horen', ik: 'hoor', niveau: 2 },
      { hele: 'bellen', ik: 'bel', niveau: 2 },
      { hele: 'trommelen', ik: 'trommel', niveau: 2 },
      { hele: 'schilderen', ik: 'schilder', niveau: 2 },
      { hele: 'branden', ik: 'brand', niveau: 3 },
      { hele: 'landen', ik: 'land', niveau: 3 },
      { hele: 'schudden', ik: 'schud', niveau: 3 },
      { hele: 'antwoorden', ik: 'antwoord', niveau: 3 },
      { hele: 'leven', ik: 'leef', niveau: 3 },
      { hele: 'reizen', ik: 'reis', niveau: 3 },
    ],
    goed: ['speelde', 'woonde', 'leerde', 'bouwde', 'huilde', 'rende', 'brandde', 'landde', 'schudde',
      'speelden', 'bouwden', 'renden', 'brandden', 'landden', 'leerden'],
    fout: [
      { niveau: 1, woord: 'speelte', goed: 'speelde' },
      { niveau: 1, woord: 'woonte', goed: 'woonde' },
      { niveau: 1, woord: 'leerte', goed: 'leerde' },
      { niveau: 1, woord: 'bouwte', goed: 'bouwde' },
      { niveau: 1, woord: 'huilte', goed: 'huilde' },
      { niveau: 2, woord: 'rennde', goed: 'rende' },
      { niveau: 2, woord: 'brande', goed: 'brandde' },
      { niveau: 2, woord: 'lande', goed: 'landde' },
      { niveau: 2, woord: 'schude', goed: 'schudde' },
      { niveau: 3, woord: 'bouwdde', goed: 'bouwde' },
      { niveau: 3, woord: 'speeldde', goed: 'speelde' },
    ],
  },

  /* 4. Vera Voorvoegsel – kies het goede woord in de zin.
   *    ___ = de lege plek. ik = de ik-vorm (voor de hint).
   *    1 ster: twee keuzes, 2 sterren: drie keuzes, 3 sterren: zelf typen. */
  voorvoegsel: {
    titel: 'De letterkast van Vera Voorvoegsel',
    opdracht: 'Welk woord is goed geschreven?',
    opdrachtTypen: 'Typ het werkwoord in de verleden tijd.',
    niveaus: [
      'Kies uit twee woorden.',
      'Typ zelf het woord. De ik-vorm staat erbij als hulp.',
      'Typ zelf het woord. Alleen het hele werkwoord staat erbij.',
    ],
    vragen: [
      { zin: 'Gisteren ___ de juf een boom.', hele: 'verplanten', ik: 'verplant', goed: 'verplantte', opties: ['verplante', 'verplantte', 'verplantde'] },
      { zin: 'Oeps! De kok ___ de pannenkoek.', hele: 'verbranden', ik: 'verbrand', goed: 'verbrandde', opties: ['verbrande', 'verbrandde', 'verbrandden'] },
      { zin: 'Lisa ___ een geheime gang onder de school.', hele: 'ontdekken', ik: 'ontdek', goed: 'ontdekte', opties: ['ontdekte', 'ontdekde', 'ontdekten'] },
      { zin: 'Wij ___ een grote doos voor ons kunstwerk.', hele: 'gebruiken', ik: 'gebruik', goed: 'gebruikten', opties: ['gebruikte', 'gebruikten', 'gebruikden'] },
      { zin: 'Opa ___ een spannend verhaal.', hele: 'vertellen', ik: 'vertel', goed: 'vertelde', opties: ['vertelde', 'vertelte', 'vertelden'] },
      { zin: 'Ik ___ mijn juf van groep 3 meteen.', hele: 'herkennen', ik: 'herken', goed: 'herkende', opties: ['herkente', 'herkende', 'herkenden'] },
      { zin: 'Mijn ouders ___ een pizza.', hele: 'bestellen', ik: 'bestel', goed: 'bestelden', opties: ['bestelde', 'bestelden', 'bestelten'] },
      { zin: 'Papa ___ met zijn pinpas.', hele: 'betalen', ik: 'betaal', goed: 'betaalde', opties: ['betaalte', 'betaalde', 'betaalden'] },
      { zin: 'De hamster ___ uit zijn kooi.', hele: 'ontsnappen', ik: 'ontsnap', goed: 'ontsnapte', opties: ['ontsnapde', 'ontsnapte', 'ontsnapten'] },
      { zin: 'Gisteren ___ ik mijn nieuwe buurmeisje.', hele: 'ontmoeten', ik: 'ontmoet', goed: 'ontmoette', opties: ['ontmoete', 'ontmoette', 'ontmoetten'] },
      { zin: 'Niemand ___ dat het ging sneeuwen.', hele: 'verwachten', ik: 'verwacht', goed: 'verwachtte', opties: ['verwachte', 'verwachtte', 'verwachtten'] },
      { zin: 'De meester ___ de uitleg nog een keer.', hele: 'herhalen', ik: 'herhaal', goed: 'herhaalde', opties: ['herhaalte', 'herhaalde', 'herhaalden'] },
      { zin: 'Wat ___ er gisteren op het plein?', hele: 'gebeuren', ik: 'gebeur', goed: 'gebeurde', opties: ['gebeurte', 'gebeurde', 'gebeurden'] },
    ],
  },

  /* 5. Peter & Olga – klik eerst de persoonsvorm, daarna het onderwerp.
   *    Zet een | tussen de zinsdelen. pv = nummer van de persoonsvorm, ow = nummer van het onderwerp
   *    (tellen begint bij 0). niveau = 1, 2 of 3 sterren. Klinkt "Wie of wat + persoonsvorm?" raar? Zet dan zelf een vraag bij wieOfWat. */
  poffertjes: {
    titel: 'Zinnen bakken met Peter en Olga',
    opdracht: 'Klik eerst op de persoonsvorm. Klik daarna op het onderwerp.',
    niveaus: [
      'Klik op de persoonsvorm. Het onderwerp staat vooraan.',
      'Typ zelf de persoonsvorm én het onderwerp. Soms staat het onderwerp achteraan.',
      'Typ zelf de persoonsvorm en het onderwerp. Ook vraagzinnen en lange zinnen!',
    ],
    vragen: [
      { zin: 'Olga | bakt | poffertjes.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'De kinderen | spelen | op het plein.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Morgen | gaat | Peter | naar de markt.', pv: 1, ow: 2, niveau: 2 },
      { zin: 'Mijn zusje | eet | tien poffertjes.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'In de pauze | voetballen | de jongens.', pv: 1, ow: 2, niveau: 2 },
      { zin: 'Gisteren | regende | het | de hele dag.', pv: 1, ow: 2, niveau: 2 },
      { zin: 'Wij | lopen | samen | naar school.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Na school | fietst | Sara | naar huis.', pv: 1, ow: 2, niveau: 2 },
      { zin: 'Peter en Olga | verkopen | warme poffertjes.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Heb | jij | de poffertjes | al geproefd?', pv: 0, ow: 1, wieOfWat: 'Wie heeft de poffertjes al geproefd?', niveau: 3 },
      { zin: 'Op zaterdag | zwemmen | mijn ouders | in het meer.', pv: 1, ow: 2, niveau: 2 },
      { zin: 'De hond | blaft | naar de postbode.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Tim | leest | een spannend boek.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'De juf | schrijft | op het bord.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Mijn opa | woont | naast de school.', pv: 1, ow: 0, niveau: 1 },
      { zin: 'Lust | jij | ook poffertjes?', pv: 0, ow: 1, niveau: 3, wieOfWat: 'Wie lust er ook poffertjes?' },
      { zin: 'Komt | de juf | ook | naar de markt?', pv: 0, ow: 1, niveau: 3, wieOfWat: 'Wie komt er ook naar de markt?' },
      { zin: 'Vanmiddag | bakken | Peter en Olga | samen | heel veel poffertjes.', pv: 1, ow: 2, niveau: 3 },
      { zin: 'Na de pauze | gaan | alle kinderen van groep 7 | naar de gymzaal.', pv: 1, ow: 2, niveau: 3 },
    ],
  },

  /* 6. Gijs Gezegde – klik alle werkwoorden aan.
   *    Zet *sterretjes* om elk werkwoord. niveau = 1, 2 of 3 sterren. */
  ijs: {
    titel: 'IJsjes stapelen met Gijs',
    opdracht: 'Klik alle werkwoorden aan. Samen zijn ze het werkwoordelijk gezegde!',
    opdrachtTypen: 'Typ alle werkwoorden uit de zin. Samen zijn ze het werkwoordelijk gezegde!',
    niveaus: [
      'Klik alle werkwoorden aan. Je ziet hoeveel je er nog moet vinden.',
      'Typ zelf alle werkwoorden. Je ziet hoeveel het er zijn.',
      'Typ zelf alle werkwoorden, ook bij zinnen met drie. Hoeveel? Dat zoek je zelf uit!',
    ],
    vragen: [
      { zin: 'Ik *heb* een ijsje *gekocht*.', niveau: 1 },
      { zin: 'Wij *willen* morgen ijs *gaan* *eten*.', niveau: 3 },
      { zin: 'Gijs *schept* een groot bolletje.', niveau: 1 },
      { zin: 'De kinderen *zijn* naar de ijskraam *gelopen*.', niveau: 1 },
      { zin: 'Ik *mag* een smaak *uitkiezen*.', niveau: 2 },
      { zin: 'Het ijs *is* helemaal *gesmolten*.', niveau: 1 },
      { zin: 'Jullie *moeten* even *wachten*.', niveau: 1 },
      { zin: 'Sanne *heeft* drie bolletjes *besteld*.', niveau: 1 },
      { zin: 'Wij *gaan* op het plein *spelen*.', niveau: 2 },
      { zin: 'De ijsjes *worden* snel *verkocht*.', niveau: 1 },
      { zin: 'Ik *zal* mijn ijsje niet *laten* *vallen*.', niveau: 3 },
      { zin: 'Opa *eet* een ijsje met slagroom.', niveau: 1 },
      { zin: '*Kun* jij mij even *helpen*?', niveau: 2 },
      { zin: 'Wij *zijn* de hele middag *blijven* *spelen*.', niveau: 3 },
      { zin: 'Ik *wil* een ijsje met spikkels.', niveau: 2 },
      { zin: 'Mama *laat* mij een smaak *kiezen*.', niveau: 2 },
      { zin: 'Wij *hebben* een ijsje *willen* *kopen*.', niveau: 3 },
      { zin: 'Gijs *moet* nieuwe hoorntjes *gaan* *halen*.', niveau: 3 },
      { zin: 'Jullie *mogen* straks een ijsje *komen* *halen*.', niveau: 3 },
    ],
  },
};

/** Teksten in de minispellen. {woord}, {ik} enz. worden door het spel ingevuld. */
export const SPEL_TEKSTEN = {
  goed: ['Goed zo!', 'Super!', 'Helemaal goed!', 'Knap gedaan!', 'Top!', 'Yes, goed!'],
  bijna: 'Bijna!',
  stoppen: 'Stoppen',
  klaarTitel: 'Ronde gehaald!',
  kiesNiveau: 'Kies je niveau',
  niveauOpSlot: 'Op slot. Haal eerst een ronde met {sterren}.',
  niveauVrij: '🔓 Nieuw niveau vrijgespeeld: {sterren}!',
  anderNiveau: 'Ander niveau',
  controleer: 'Controleer',
  typHier: 'Typ hier…',
  klaarKnop: 'Klaar!',
  klaarTekst: 'Je hebt alle 8 vragen gedaan. {aantal} keer had je het in één keer goed!',
  opnieuw: 'Nog een keer',
  terug: 'Terug naar het plein',
};

/*
 * ============================================================
 *  MUNTEN
 * ============================================================
 *  Hier stel je de beloningen in. Een fout antwoord kost nooit munten.
 * ============================================================
 */
export const MUNTEN = {
  perNiveau: [5, 10, 15], // munten per goed antwoord bij ★, ★★ en ★★★
  tweedePoging: 0.5, // goed bij de 2e poging: de helft
  latereKeer: 0, // goed bij de 3e poging of later: (nog) geen munten
  reeksLengte: 3, // elke 3 goede antwoorden op rij (in één keer goed)...
  reeksBonus: 5, // ...geven 5 extra munten
  foutloosBonus: 20, // ronde zonder één fout
  pleinMuntje: 2, // waarde van een verstopt muntje op het plein (ze komen elke dag terug)
};

export const MUNT_TEKSTEN = {
  reeks: '{aantal} op rij! +{bonus}',
  foutloos: 'Foutloze ronde! +{bonus}',
  overzichtTitel: 'Jouw ronde',
  goedeAntwoorden: 'Goede antwoorden',
  inEenKeer: 'In één keer goed',
  muntenAntwoorden: 'Munten voor antwoorden',
  reeksBonus: 'Reeks-bonus',
  foutloosBonus: 'Bonus foutloze ronde',
  totaal: 'Je hebt nu',
  munten: 'munten',
  pleinGevonden: 'Muntje gevonden! {aantal} van de {totaal}',
  pleinAlles: 'Alle {totaal} muntjes gevonden! Morgen liggen er weer nieuwe.',
};

/*
 * ============================================================
 *  DE BUNDERS BOETIEK (winkel) EN KLEDING
 * ============================================================
 *  categorie: hoofd, shirt, broek, schoenen of extra
 *  model: hoe het eruitziet (zie src/kleding.js), kleur: hoofdkleur
 *  prijs: in munten
 * ============================================================
 */
export const KLEDING = [
  // Hoofd
  { id: 'pet-rood', categorie: 'hoofd', naam: 'Rode pet', icoon: '🧢', kleur: 0xe03131, model: 'pet', prijs: 20 },
  { id: 'beanie', categorie: 'hoofd', naam: 'Warme muts', icoon: '🧶', kleur: 0x12b886, model: 'beanie', prijs: 40 },
  { id: 'cowboyhoed', categorie: 'hoofd', naam: 'Cowboyhoed', icoon: '🤠', kleur: 0x9c6b3c, model: 'cowboy', prijs: 90 },
  { id: 'piratenhoed', categorie: 'hoofd', naam: 'Piratenhoed', icoon: '🏴‍☠️', kleur: 0x1d1d1d, model: 'piraat', prijs: 120 },
  { id: 'kroon', categorie: 'hoofd', naam: 'Gouden kroon', icoon: '👑', kleur: 0xffc929, model: 'kroon', prijs: 300 },
  // Shirt
  { id: 'shirt-groen', categorie: 'shirt', naam: 'Groen shirt', icoon: '👕', kleur: 0x40c057, model: 'kleur', prijs: 20 },
  { id: 'shirt-paars', categorie: 'shirt', naam: 'Paars shirt', icoon: '👕', kleur: 0x9c36b5, model: 'kleur', prijs: 20 },
  { id: 'shirt-geel', categorie: 'shirt', naam: 'Geel shirt', icoon: '👕', kleur: 0xfcc419, model: 'kleur', prijs: 25 },
  { id: 'voetbalshirt', categorie: 'shirt', naam: 'Voetbalshirt', icoon: '⚽', kleur: 0xe03131, model: 'voetbal', prijs: 70 },
  { id: 'heldenshirt', categorie: 'shirt', naam: 'Superheldenshirt', icoon: '⚡', kleur: 0x1971c2, model: 'held', prijs: 140 },
  // Broek
  { id: 'broek-spijker', categorie: 'broek', naam: 'Spijkerbroek', icoon: '👖', kleur: 0x4a6fa5, model: 'kleur', prijs: 25 },
  { id: 'broek-rood', categorie: 'broek', naam: 'Rode broek', icoon: '👖', kleur: 0xc92a2a, model: 'kleur', prijs: 30 },
  { id: 'korte-broek', categorie: 'broek', naam: 'Korte broek', icoon: '🩳', kleur: 0xf08c00, model: 'kort', prijs: 40 },
  { id: 'broek-goud', categorie: 'broek', naam: 'Glimmende broek', icoon: '✨', kleur: 0xe0b000, model: 'glim', prijs: 110 },
  // Schoenen
  { id: 'schoenen-rood', categorie: 'schoenen', naam: 'Rode sneakers', icoon: '👟', kleur: 0xfa5252, model: 'kleur', prijs: 25 },
  { id: 'schoenen-wit', categorie: 'schoenen', naam: 'Witte sneakers', icoon: '👟', kleur: 0xf1f3f5, model: 'kleur', prijs: 30 },
  { id: 'laarzen', categorie: 'schoenen', naam: 'Stoere laarzen', icoon: '🥾', kleur: 0x7a4a24, model: 'laars', prijs: 60 },
  { id: 'schoenen-goud', categorie: 'schoenen', naam: 'Gouden schoenen', icoon: '🌟', kleur: 0xffc929, model: 'glim', prijs: 150 },
  // Extra
  { id: 'zonnebril', categorie: 'extra', naam: 'Zonnebril', icoon: '🕶️', kleur: 0x212529, model: 'zonnebril', prijs: 50 },
  { id: 'vlinderdas', categorie: 'extra', naam: 'Vlinderdas', icoon: '🎀', kleur: 0xe64980, model: 'vlinderdas', prijs: 40 },
  { id: 'rugzak-paars', categorie: 'extra', naam: 'Paarse rugzak', icoon: '🎒', kleur: 0x7048e8, model: 'rugzak', prijs: 35 },
  { id: 'cape', categorie: 'extra', naam: 'Heldencape', icoon: '🦸', kleur: 0xe03131, model: 'cape', prijs: 250 },
];

export const WINKEL = {
  naam: 'De Bunders Boetiek',
  verkoper: 'Bo Boetiek',
  welkom: 'Welkom bij De Bunders Boetiek! Ik ben Bo. Kijk maar rond en pas gerust iets aan!',
  tabKleding: 'Kleding',
  categorieen: { hoofd: 'Hoofd', shirt: 'Shirt', broek: 'Broek', schoenen: 'Schoenen', extra: 'Extra' },
  openToets: 'Druk op E om de winkel te openen',
  openTik: 'Tik hier om de winkel te openen',
  pasAan: 'Pas aan',
  uitproberen: 'Je past nu: {naam}',
  kopen: 'Kopen',
  aantrekken: 'Aantrekken',
  aan: 'Heb je aan ✓',
  nogNodig: 'Nog {aantal} munten nodig',
  zekerVraag: 'Weet je het zeker? Je koopt: {naam} voor {prijs} munten.',
  ja: 'Ja, kopen!',
  nee: 'Nee, toch niet',
  bedankt: 'Gekocht! {naam} staat je super!',
  sluiten: 'Sluiten',
  kast: 'Kledingkast',
  kastLeeg: 'Je kast is nog leeg. Koop kleding in De Bunders Boetiek!',
  uittrekken: 'Uittrekken',
  kastUitleg: 'Klik op kleding om het aan of uit te trekken.',
};

/*
 * ============================================================
 *  DE MEESTERS OP HET PLEIN
 * ============================================================
 *  Meester Jop, Meester Bram en Meester Koen lopen rond en stellen een vraag
 *  over een van de onderwerpen. De vragen komen uit de minispellen hierboven.
 * ============================================================
 */
export const MEESTERS = [
  {
    id: 'jop', naam: 'Meester Jop', stem: 0.85,
    uiterlijk: { shirt: 0x1c7ed6, broek: 0x343a40, pet: null, haar: 0x5c3a1a, kapsel: 'kort', rugzak: null },
    extra: ['bril', 'keycord'],
    begroeting: 'Hé, hallo! Heb jij even tijd voor een vraag?',
  },
  {
    id: 'bram', naam: 'Meester Bram', stem: 0.75,
    uiterlijk: { shirt: 0x2f9e44, broek: 0x5c4033, pet: null, haar: 0x868e96, kapsel: 'kort', rugzak: null },
    extra: ['baard', 'vlinderdas'],
    begroeting: 'Goedemorgen! Ik heb een pittige vraag voor je.',
  },
  {
    id: 'koen', naam: 'Meester Koen', stem: 0.95,
    uiterlijk: { shirt: 0xe03131, broek: 0x212529, pet: 0x212529, rugzak: null },
    extra: ['fluitje'],
    begroeting: 'Yo! Klaar voor een vraag? Kom op, jij kunt dit!',
  },
];

export const MEESTER_VRAAG = {
  beloning: 20, // munten voor een goed antwoord in één keer
  tweedePoging: 10, // munten als het bij de tweede poging goed is
  wachtMinuten: 5, // daarna heeft die meester even geen nieuwe vraag
  maxPerDag: 5, // zoveel vragen stelt elke meester per dag (dan blijven de kramen het belangrijkst)
  onderwerpen: {
    kofschip: { intro: "Mijn vraag gaat over 't kofschip-x.", hint: "Haal -en van het hele werkwoord af. Zit de laatste letter in 't kofschip-x? Dan -te, anders -de." },
    taarten: { intro: 'Mijn vraag gaat over werkwoorden met -te en -ten.', hint: 'Eindigt de ik-vorm al op een t? Dan komt er nog -te achter: twee keer t!' },
    drummer: { intro: 'Mijn vraag gaat over werkwoorden met -de en -den.', hint: 'Eindigt de ik-vorm al op een d? Dan komt er nog -de achter: twee keer d!' },
    voorvoegsel: { intro: 'Mijn vraag gaat over werkwoorden met be-, ge-, ver-, her- en ont-.', hint: "De regel blijft hetzelfde: ik-vorm + te of de. Gebruik 't kofschip-x." },
    poffertjes: { intro: 'Mijn vraag gaat over de persoonsvorm en het onderwerp.', hint: '' },
    ijs: { intro: 'Mijn vraag gaat over het werkwoordelijk gezegde.', hint: 'Zoek eerst de persoonsvorm. Zoek daarna de andere werkwoorden in de zin.' },
  },
  vraagVerleden: 'Hoe schrijf je de verleden tijd?',
  vraagZin: 'Typ het werkwoord in de verleden tijd:',
  vraagPv: 'Wat is de persoonsvorm in deze zin?',
  vraagOw: 'Wat is het onderwerp in deze zin?',
  vraagWwg: 'Welke werkwoorden horen bij het werkwoordelijk gezegde? Typ ze allemaal.',
  hintPv: 'Doe de vraagproef: maak er een vraag van. Welk woord komt vooraan?',
  hintOw: 'Vraag: wie of wat + persoonsvorm?',
  goed: ['Helemaal goed! Hier zijn je munten.', 'Top! Dat wist je goed.', 'Knap hoor! Die munten heb je verdiend.'],
  nogEens: 'Bijna! Probeer het nog één keer.',
  helaas: 'Jammer! Het goede antwoord is: {antwoord}. Volgende keer beter!',
  wachten: 'Ik heb zo weer een nieuwe vraag! Kom over {minuten} terug.',
  genoegVandaag: 'Voor vandaag heb ik genoeg vragen gesteld. Morgen heb ik weer nieuwe! Oefen maar lekker bij de kramen.',
  controleer: 'Controleer',
  doei: 'Doei!',
  bedankt: 'Bedankt, meester!',
  wolkjeToets: 'Druk op E: {naam} heeft een vraag!',
  wolkjeTik: 'Tik hier: {naam} heeft een vraag!',
  wolkjeWacht: 'Druk op E om met {naam} te praten',
};

/*
 * ============================================================
 *  DE VOETBALWERELD (gaat open als alle 6 stempels gehaald zijn)
 * ============================================================
 */
export const VOETBAL = {
  poortBord: 'Voetbalwereld',
  terugBord: 'Schoolplein',
  slotTekst: 'Haal eerst alle stempels!',
  nogStempels: 'Nog {aantal} stempels',
  nogEenStempel: 'Nog 1 stempel',
  wolkjeDicht: '🔒 Haal eerst alle stempels! ({nog})',
  wolkjeOpen: '⚽ Loop door de poort naar de Voetbalwereld!',
  poortOpen: 'De poort is open!',
  poortOpenUitleg: 'De poort naar de Voetbalwereld bij het hek is open!',
  welkom: 'Welkom in de Voetbalwereld!',
  wolkjeTerug: '🏫 Loop door de poort terug naar het schoolplein',
  uitlegLopen: 'WASD of pijltjes: lopen',
  uitlegSprint: 'Shift: sprinten',
  uitlegSchiet: 'Spatie vasthouden: harder schieten',
  uitlegJoystick: 'Joystick: lopen',
  uitlegSchietKnop: 'Schiet: vasthouden en loslaten',
  uitlegSprintKnop: 'Sprint: vasthouden',
  kracht: 'Kracht',
  knopSprint: 'Sprint',
  knopSchiet: 'Schiet',
  oefenen: 'OEFENEN',
  goal: 'GOAL!',
  thuisTeam: 'DE BUNDERS',
  uitlegPass: 'Q: passen',
  uitlegWissel: 'E: wissel van speler',
  knopPass: 'Pass',
  knopWissel: 'Wissel',
  startWedstrijd: 'Start wedstrijd tegen {team}',
  aftrap: 'Aftrap!',
  uitBal: 'Uit! Bal voor {team}',
  hoekschop: 'Hoekschop voor {team}',
  doelschop: 'Doelschop voor {team}',
  goalTegen: 'Goal voor {team}',
  eindeTitel: 'Einde wedstrijd!',
  gewonnen: 'Gewonnen! 🎉',
  gelijk: 'Gelijkspel!',
  verloren: 'Verloren… volgende keer beter!',
  nogEenKeer: 'Nog een keer',
  terugVeld: 'Terug naar het veld',
  stoppen: 'Stoppen',
  kiesTegenstander: 'Kies je tegenstander',
  bordWolkje: 'Druk op E om een tegenstander te kiezen',
  bordTik: 'Tik hier om een tegenstander te kiezen',
  opSlot: 'Win eerst van {team}',
  verslagen: 'Verslagen ✓',
  spelen: 'Spelen!',
  niveaus: { makkelijk: 'Makkelijk', gemiddeld: 'Gemiddeld', moeilijk: 'Moeilijk' },
  nieuwVrij: '🔓 Nieuwe tegenstander: {team}!',
  andereTegenstander: 'Andere tegenstander',
  terugSchoolplein: 'Terug naar het schoolplein',
  sluiten: 'Sluiten',
  bekerTitel: 'De Bunders Beker!',
  bekerTekst: 'Je hebt van alle drie de teams gewonnen! De beker staat nu op het schoolplein.',
  bekerKnop: 'Hoera!',
  bekerOpPlein: '🏆 De Bunders Beker staat nu midden op het schoolplein!',
  bekerBord: 'BUNDERS BEKER',
};

/*
 * ============================================================
 *  VOETBALWEDSTRIJD EN TEGENSTANDERS
 * ============================================================
 *  snelheid: hardlopen (meter per seconde)
 *  schot: hoe zuiver ze schieten (0 = altijd naast, 1 = heel zuiver)
 *  keeper: hoe goed de keeper is (0 = laat alles door, 1 = houdt bijna alles)
 *  afpakken: hoe vaak ze de bal van je afpakken (per seconde dat ze naast je staan)
 *  passen: hoe graag ze naar elkaar passen (0..1)
 * ============================================================
 */
export const VOETBAL_WEDSTRIJD = {
  duurMinuten: 3,
  eigenTeam: { snelheid: 5.2, schot: 0.6, keeper: 0.6, afpakken: 0.8, passen: 0.5 }, // de computerspelers van De Bunders
  kindAfpakken: 2, // hoe makkelijk het kind de bal afpakt (per seconde naast de balbezitter)
};

export const VOETBAL_TEAMS = [
  {
    id: 'slakken', naam: 'De Slakken', kort: 'SLAKKEN', niveau: 'makkelijk',
    tenue: { shirt: '#82c91e', streep: '#5c940d', broek: 0x2b8a3e },
    snelheid: 4.2, schot: 0.3, keeper: 0.35, afpakken: 0.5, passen: 0.3,
  },
  {
    id: 'wervelwinden', naam: 'De Wervelwinden', kort: 'WERVELWINDEN', niveau: 'gemiddeld',
    tenue: { shirt: '#ae3ec9', streep: '#ffffff', broek: 0x5f3dc4 },
    snelheid: 5.4, schot: 0.55, keeper: 0.6, afpakken: 1.2, passen: 0.55,
  },
  {
    id: 'bliksems', naam: 'De Bliksems', kort: 'BLIKSEMS', niveau: 'moeilijk',
    tenue: { shirt: '#fab005', streep: '#212529', broek: 0x212529 },
    snelheid: 6.4, schot: 0.8, keeper: 0.85, afpakken: 2.0, passen: 0.75,
  },
];

/*
 * ============================================================
 *  TESTEN (voor de leerkracht)
 * ============================================================
 *  F9 = geheime testtoets: geeft meteen alle stempels, zodat de poort opengaat.
 *  ZET DIT OP false VOORDAT DE KINDEREN GAAN SPELEN!
 * ============================================================
 */
export const TEST = {
  geheimeToetsF9: true,
};

/*
 * ============================================================
 *  KINDEREN OP HET PLEIN
 * ============================================================
 *  Ze lopen rond en zeggen iets grappigs als je ze aanspreekt.
 * ============================================================
 */
export const KINDEREN = {
  namen: ['Sem', 'Noor', 'Daan', 'Lotte', 'Finn', 'Zoë', 'Mila', 'Ayoub', 'Bram', 'Fenna', 'Jesse', 'Lina'],
  uitspraken: [
    'Hoi! Heb jij Kapitein Kofschip al ontmoet? Ahoi!',
    "Ik fietste vanochtend naar school. Met -te, want de s zit in 't kofschip!",
    'Dirk de Drummer is zó hard. Boem-boem-de!',
    'Ik heb echt zin in een ijsje van Gijs.',
    "Tikkertje? Jij bent 'm!",
    'Spring eens op de palen bij de school. Dat is echt leuk!',
    'Ik bouwde gisteren een zandkasteel. Bouwde, met een d!',
    'Psst… de poffertjes van Peter en Olga zijn heerlijk.',
    'Weet jij nog hoe de vraagproef werkt? Ik vergeet het steeds.',
    'Mijn hamster heet Werkwoord. Grappig, hè?',
    'Ik ben helemaal tot boven in de klimtoren geklommen!',
    'Haha, je pet staat scheef!',
    'Ik zoek mijn bal. Heb jij hem gezien?',
    'Tante Tessa bakt de lekkerste taarten van het plein.',
    'Gaap… is het al pauze?',
    'Ik had een negen voor spelling!',
    'Wij speelden gisteren verstoppertje. Ik won!',
    'Vera Voorvoegsel heeft wel héél veel letterblokken.',
    'Niet verder vertellen, maar ik ben een beetje bang voor die papegaai.',
    'Kom je ook schommelen bij het touw?',
    'Ik dacht dat jij een juf was. Grapje!',
  ],
};
