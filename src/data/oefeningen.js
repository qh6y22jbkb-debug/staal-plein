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

import { ONDERDELEN } from './onderdelen.js';
import { KRAMEN_BLOK2, SPELLEN_BLOK2 } from './taalkramen-blok2.js';
import { WERKWOORD_KRAMEN, WERKWOORD_SPELLEN, WERKWOORD_TEKSTEN } from './werkwoorden.js';

// De kramen op het plein en hun minispellen: de Werkwoordenwereld (herhalingsblok, src/data/werkwoorden.js)
// of de zes taalkramen van blok 2 (src/data/taalkramen-blok2.js). Kiezen doe je in src/data/onderdelen.js.
export const KRAMEN = ONDERDELEN.werkwoordenwereld ? WERKWOORD_KRAMEN : KRAMEN_BLOK2;
export const SPELLEN = ONDERDELEN.werkwoordenwereld ? WERKWOORD_SPELLEN : SPELLEN_BLOK2;
export { KRAMEN_BLOK2, SPELLEN_BLOK2 };

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
  startPoort: ' En… wat zit er achter de poort met het slot?', // alleen als de Voetbalwereld aan staat
  startVerder: 'Welkom terug! Je hebt al {aantal} van de 6 stempels.',
  startKnop: 'Spelen',
  startKnopVerder: 'Verder spelen',

  // Knoppen rechtsboven
  voorlezenAan: 'Voorlezen staat aan',
  voorlezenUit: 'Voorlezen staat uit',
  geluidAan: 'Geluid staat aan',
  geluidUit: 'Geluid staat uit',
  opnieuwKnop: 'Opnieuw beginnen',
  opnieuwVraag: 'Weet je het zeker? Al je stempels, munten, kleding en voetbalprijzen worden gewist.',
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
// Werkwoordenwereld aan? Dan gelden de teksten uit src/data/werkwoorden.js (startscherm, feest, oorkonde).
if (ONDERDELEN.werkwoordenwereld) Object.assign(TEKSTEN, WERKWOORD_TEKSTEN);

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
  // Alleen te koop als de hele Rekenkaart (Leergroep 3) op Goud staat.
  { id: 'rekenrugzak', categorie: 'extra', naam: 'Gouden rekenmachine-rugzak', icoon: '🧮', kleur: 0xffc929, model: 'rekenrugzak', prijs: 150, vereist: 'rekenkampioen' },
  // Voetbal (groep: 'voetbal' = eigen knopje in de winkel)
  { id: 'voetbalschoenen-oranje', categorie: 'schoenen', groep: 'voetbal', naam: 'Oranje voetbalschoenen', icoon: '👟', kleur: 0xff7a00, model: 'voetbalschoen', prijs: 45 },
  { id: 'voetbalschoenen-groen', categorie: 'schoenen', groep: 'voetbal', naam: 'Neongroene voetbalschoenen', icoon: '👟', kleur: 0x7cfc00, model: 'voetbalschoen', prijs: 45 },
  { id: 'keepershandschoenen', categorie: 'extra', groep: 'voetbal', naam: 'Keepershandschoenen', icoon: '🧤', kleur: 0x40c057, model: 'handschoenen', prijs: 60 },
  { id: 'aanvoerdersband', categorie: 'extra', groep: 'voetbal', naam: 'Aanvoerdersband', icoon: '©️', kleur: 0xfab005, model: 'aanvoerdersband', prijs: 80 },
  { id: 'gouden-bal', categorie: 'extra', groep: 'voetbal', naam: 'Gouden bal', icoon: '⚽', kleur: 0xffc929, model: 'gouden-bal', prijs: 250, vereist: 'beker' },
];

/*
 * De 12 vaste kleuren van de kleurkiezer (shirts in de kledingkast, later ook fiets en step).
 * Je kunt de kleuren en namen hier aanpassen; houd het bij 12 vrolijke kleuren.
 */
export const KLEURKIEZER_KLEUREN = [
  { naam: 'Rood', kleur: 0xe03131 },
  { naam: 'Oranje', kleur: 0xfd7e14 },
  { naam: 'Geel', kleur: 0xfcc419 },
  { naam: 'Lichtgroen', kleur: 0x94d82d },
  { naam: 'Groen', kleur: 0x2f9e44 },
  { naam: 'Turquoise', kleur: 0x15aabf },
  { naam: 'Lichtblauw', kleur: 0x74c0fc },
  { naam: 'Blauw', kleur: 0x1c7ed6 },
  { naam: 'Paars', kleur: 0x7048e8 },
  { naam: 'Roze', kleur: 0xf06595 },
  { naam: 'Wit', kleur: 0xf8f9fa },
  { naam: 'Zwart', kleur: 0x343a40 },
];

/*
 * Vervoersmiddelen (toets V, of de knop 🚲 op een touchscreen). Alleen op het schoolplein.
 * prijs = aantal munten, snelheid = hoeveel keer zo snel als lopen, kleurbaar = kleurkiezer in de kledingkast.
 */
export const VERVOER = [
  { id: 'step', naam: 'Step', icoon: '🛴', prijs: 80, kleur: 0x1c7ed6, snelheid: 1.8, kleurbaar: true },
  { id: 'skateboard', naam: 'Skateboard', icoon: '🛹', prijs: 150, kleur: 0xe8590c, snelheid: 1.9, kleurbaar: false },
  { id: 'fiets', naam: 'Fiets', icoon: '🚲', prijs: 250, kleur: 0xe03131, snelheid: 2.1, kleurbaar: true },
];

export const VERVOER_TEKSTEN = {
  knop: 'Rijden',
  winkelUitleg: 'Op- en afstappen doe je met V (of de knop 🚲). Rijden kan alleen op het schoolplein.',
  gekocht: 'Je hebt nu een {naam}! Op het schoolplein stap je op met V (of de knop 🚲).',
  kiezen: 'Gebruiken',
  gekozen: '✓ In gebruik',
  bekijk: 'Bekijk',
  kastKop: '🚲 Vervoer',
  kastUitleg: 'Kies waarmee je rijdt. Fiets en step kun je een andere kleur geven.',
  geenVervoer: 'Je hebt nog geen vervoer. Koop een step, skateboard of fiets in De Bunders Boetiek!',
  opgestapt: '{icoon} Op je {naam}! Druk op V om af te stappen.',
  afgestapt: 'Je stapt af.',
  afgestaptKraam: 'Je stapt af, zodat je kunt praten.',
  nietHier: 'Rijden kan alleen op het schoolplein.',
};

/*
 * Dansjes (toets M, of de knop "Dans" op een touchscreen). De moonwalk is gratis;
 * de andere koop je in De Bunders Boetiek bij "Dansjes". prijs = aantal munten.
 */
export const DANSJES = [
  { id: 'moonwalk', naam: 'Moonwalk', icoon: '🕺', prijs: 0 },
  { id: 'juichen', naam: 'Juichdansje', icoon: '🙌', prijs: 40 },
  { id: 'robot', naam: 'Robotdans', icoon: '🤖', prijs: 60 },
  { id: 'draaien', naam: 'Draaien op één been', icoon: '🩰', prijs: 80 },
];

export const DANS_TEKSTEN = {
  knop: 'Dans',
  menuTitel: 'Kies je dansje',
  menuUitleg: 'Druk op een cijfer om te wisselen',
  menuUitlegTouch: 'Tik op een dansje',
  menuMeer: 'Meer dansjes koop je in De Bunders Boetiek!',
  gratis: 'Gratis',
  bekijk: 'Bekijk',
  kiezen: 'Kiezen',
  gekozen: '✓ Gekozen',
  gekocht: 'Gekocht: {naam}! Druk op M om te dansen.',
  winkelUitleg: 'Dansen doe je met M (lang ingedrukt = dansmenu), of met de knop Dans.',
};

export const WINKEL = {
  naam: 'De Bunders Boetiek',
  verkoper: 'Bo Boetiek',
  welkom: 'Welkom bij De Bunders Boetiek! Ik ben Bo. Kijk maar rond en pas gerust iets aan!',
  tabKleding: 'Kleding',
  categorieen: { hoofd: 'Hoofd', shirt: 'Shirt', broek: 'Broek', schoenen: 'Schoenen', extra: 'Extra', voetbal: '⚽ Voetbal', dansjes: '💃 Dansjes', vervoer: '🚲 Vervoer' },
  vereistBeker: '🔒 Win eerst de Bunders Beker',
  vereistRekenkaart: '🔒 Haal eerst de hele Rekenkaart op Goud',
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
  bedankt: 'Gekocht: {naam}! Je ziet er super uit!',
  sluiten: 'Sluiten',
  kast: 'Kledingkast',
  kastLeeg: 'Je kast is nog leeg. Koop kleding in De Bunders Boetiek!',
  uittrekken: 'Uittrekken',
  kastUitleg: 'Klik op kleding om het aan of uit te trekken. Shirts kun je gratis een andere kleur geven.',
  kleurKiezen: 'Kleur:',
  kleurOrigineel: 'Origineel',
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
 *  DE VOETBALWERELD: de teksten staan nu in src/data/voetbal.js
 *  (aan/uit: src/data/onderdelen.js)
 * ============================================================
 */
export * from './voetbal.js';

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
  // Leerkrachtcode: druk op de sneltoets (Ctrl + Alt + L, op een Mac Control + Option + L) en vul de code in
  // om ALLES vrij te spelen. Zet hem op '' om dit uit te zetten.
  leerkrachtCode: 'Themamuur', // hoofdletters maken niet uit: themamuur werkt ook
  // De sneltoets: Ctrl (of Cmd) + Alt + deze letter. (Ctrl+T of Cmd+T kan niet: dat opent in elke browser een nieuw tabblad.)
  leerkrachtSneltoets: { code: 'KeyL', alt: true, shift: false },
  leerkrachtPogingen: 2, // zo vaak mag je raden...
  leerkrachtBlokkeerMinuten: 15, // ...daarna is het invullen zo lang geblokkeerd
};

export const LEERKRACHT = {
  titel: 'Leerkrachtcode',
  uitleg: 'Vul de leerkrachtcode in om alles vrij te spelen.',
  plaatshouder: 'Code',
  ok: 'OK',
  sluiten: 'Sluiten',
  fout: 'Die code klopt niet. Je hebt {nog}.',
  geblokkeerd: 'Te vaak een verkeerde code. Probeer het over {tijd} opnieuw.',
  melding: '🔑 Leerkrachtmodus: alles is vrijgespeeld!',
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
