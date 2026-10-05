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
  startVerder: 'Welkom terug! Je hebt al {aantal} van de 6 stempels.',
  startKnop: 'Spelen',
  startKnopVerder: 'Verder spelen',

  // Knoppen rechtsboven
  voorlezenAan: 'Voorlezen staat aan',
  voorlezenUit: 'Voorlezen staat uit',
  geluidAan: 'Geluid staat aan',
  geluidUit: 'Geluid staat uit',
  opnieuwKnop: 'Opnieuw beginnen',
  opnieuwVraag: 'Weet je het zeker? Al je stempels en munten worden gewist.',
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
 * ============================================================
 */
export const SPELLEN = {
  /* 1. Kapitein Kofschip – kies de schatkist "te" of "de".
   *    hele = het hele werkwoord, ik = de ik-vorm, uitgang = 'te' of 'de'.
   *    niveau = 1, 2 of 3 sterren. Bij 2 en 3 sterren komen ook makkelijkere vragen voor. */
  kofschip: {
    titel: 'De schatkisten van Kapitein Kofschip',
    opdracht: 'Krijgt dit werkwoord -te of -de? Kies de goede schatkist!',
    niveaus: [
      'Gewone werkwoorden. De letters van \'t kofschip-x staan in beeld.',
      'Ook werkwoorden met dubbele letters, ch en x.',
      'Strikvragen zoals leven en reizen. Zonder geheugensteun!',
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
      { hele: 'zwemmen', ik: 'zwem', uitgang: 'de', niveau: 2 },
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
    niveaus: [
      'Eén persoon of ding. Kies uit -te of -tte.',
      'Ook zinnen met wij, jullie en zij. Kies uit vier stukjes.',
      'Typ zelf het stukje dat ontbreekt.',
    ],
    vragen: [
      { zin: 'Gisteren werk__ ik in de tuin.', ik: 'werk', meer: false },
      { zin: 'Wij fiets__ samen naar het bos.', ik: 'fiets', meer: true },
      { zin: 'Mama kook__ gisteren soep.', ik: 'kook', meer: false },
      { zin: 'De kinderen maak__ een mooie tekening.', ik: 'maak', meer: true },
      { zin: 'Ik lach__ om de grap van Tim.', ik: 'lach', meer: false },
      { zin: 'Oma dans__ op het feest.', ik: 'dans', meer: false },
      { zin: 'Ik hoop__ op mooi weer.', ik: 'hoop', meer: false },
      { zin: 'Gisteren plan__ ik een boom.', ik: 'plant', meer: false },
      { zin: 'Wij plan__ bloemen in de tuin.', ik: 'plant', meer: true },
      { zin: 'De juf praa__ met de directeur.', ik: 'praat', meer: false },
      { zin: 'Na het voetballen rus__ wij even.', ik: 'rust', meer: true },
      { zin: 'Ik wach__ op de bus.', ik: 'wacht', meer: false },
      { zin: 'Jullie wach__ heel lang op een ijsje.', ik: 'wacht', meer: true },
      { zin: 'Tom poets__ zijn tanden.', ik: 'poets', meer: false },
      { zin: 'Wij poets__ de ramen van de klas.', ik: 'poets', meer: true },
      { zin: 'Papa maak__ pannenkoeken.', ik: 'maak', meer: false },
    ],
  },

  /* 3. Dirk de Drummer – vang de goed gespelde woorden, ontwijk de foute.
   *    Bij elk fout woord staat het goede woord, voor de hint.
   *    Bij 1 ster vallen alleen foute woorden van niveau 1; bij 2 en 3 sterren alle foute woorden. */
  drummer: {
    titel: 'De woordenregen van Dirk de Drummer',
    opdracht: 'Vang de goed geschreven woorden met je trommel. Ontwijk de foute!',
    niveaus: [
      'De woorden vallen langzaam. Weinig foute woorden.',
      'Iets sneller, en meer soorten foute woorden.',
      'Snel! En veel foute woorden met dubbele d.',
    ],
    klaarTekst: 'Je hebt 8 goede woorden gevangen. {aantal} keer zonder fout woord ertussen. Wat een ritme!',
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
    niveaus: [
      'Kies uit twee woorden.',
      'Kies uit drie woorden.',
      'Typ zelf het hele woord.',
    ],
    vragen: [
      { zin: 'Gisteren ___ de juf een boom.', ik: 'verplant', goed: 'verplantte', opties: ['verplante', 'verplantte', 'verplantde'] },
      { zin: 'Oeps! De kok ___ de pannenkoek.', ik: 'verbrand', goed: 'verbrandde', opties: ['verbrande', 'verbrandde', 'verbrandden'] },
      { zin: 'Lisa ___ een geheime gang onder de school.', ik: 'ontdek', goed: 'ontdekte', opties: ['ontdekte', 'ontdekde', 'ontdekten'] },
      { zin: 'Wij ___ een grote doos voor ons kunstwerk.', ik: 'gebruik', goed: 'gebruikten', opties: ['gebruikte', 'gebruikten', 'gebruikden'] },
      { zin: 'Opa ___ een spannend verhaal.', ik: 'vertel', goed: 'vertelde', opties: ['vertelde', 'vertelte', 'vertelden'] },
      { zin: 'Ik ___ mijn juf van groep 3 meteen.', ik: 'herken', goed: 'herkende', opties: ['herkente', 'herkende', 'herkenden'] },
      { zin: 'Mijn ouders ___ een pizza.', ik: 'bestel', goed: 'bestelden', opties: ['bestelde', 'bestelden', 'bestelten'] },
      { zin: 'Papa ___ met zijn pinpas.', ik: 'betaal', goed: 'betaalde', opties: ['betaalte', 'betaalde', 'betaalden'] },
      { zin: 'De hamster ___ uit zijn kooi.', ik: 'ontsnap', goed: 'ontsnapte', opties: ['ontsnapde', 'ontsnapte', 'ontsnapten'] },
      { zin: 'Gisteren ___ ik mijn nieuwe buurmeisje.', ik: 'ontmoet', goed: 'ontmoette', opties: ['ontmoete', 'ontmoette', 'ontmoetten'] },
      { zin: 'Niemand ___ dat het ging sneeuwen.', ik: 'verwacht', goed: 'verwachtte', opties: ['verwachte', 'verwachtte', 'verwachtten'] },
      { zin: 'De meester ___ de uitleg nog een keer.', ik: 'herhaal', goed: 'herhaalde', opties: ['herhaalte', 'herhaalde', 'herhaalden'] },
      { zin: 'Wat ___ er gisteren op het plein?', ik: 'gebeur', goed: 'gebeurde', opties: ['gebeurte', 'gebeurde', 'gebeurden'] },
    ],
  },

  /* 5. Peter & Olga – klik eerst de persoonsvorm, daarna het onderwerp.
   *    Zet een | tussen de zinsdelen. pv = nummer van de persoonsvorm, ow = nummer van het onderwerp
   *    (tellen begint bij 0). niveau = 1, 2 of 3 sterren. Klinkt "Wie of wat + persoonsvorm?" raar? Zet dan zelf een vraag bij wieOfWat. */
  poffertjes: {
    titel: 'Zinnen bakken met Peter en Olga',
    opdracht: 'Klik eerst op de persoonsvorm. Klik daarna op het onderwerp.',
    niveaus: [
      'Zoek alleen de persoonsvorm. Het onderwerp staat vooraan.',
      'Zoek de persoonsvorm én het onderwerp. Soms staat het onderwerp achteraan.',
      'Ook vraagzinnen en lange zinnen. Goed opletten!',
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
    niveaus: [
      'Zinnen met één of twee werkwoorden. Je ziet hoeveel je er nog moet vinden.',
      'Iets lastigere zinnen. Je ziet hoeveel je er nog moet vinden.',
      'Zinnen met drie werkwoorden. Druk zelf op Klaar als je ze allemaal hebt!',
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
  vraag: 'Vraag',
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
  metTip: 0.5, // goed met hulp van een tip: de helft
  reeksLengte: 3, // elke 3 goede antwoorden op rij (in één keer goed)...
  reeksBonus: 5, // ...geven 5 extra munten
  foutloosBonus: 20, // ronde zonder één fout
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
