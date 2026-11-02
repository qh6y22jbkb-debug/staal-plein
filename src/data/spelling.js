/*
 * ============================================================
 *  SPELLINGWERELD – herhalingsblok (Staal groep 7)
 * ============================================================
 *  De binnenwereld in de school (Leergroep 3), met in elk lokaal een spellingkraam.
 *  Leerkrachten: hier pas je de woorden, zinnen, uitleg en tips aan.
 *
 *  Zo schrijf je een woord:
 *    w:    het woord, met het moeilijke stukje tussen [haakjes]: 'pro[c]ent', 'gezond[heid]', 'log[isch]'
 *    zin:  een zin met het woord, waar het woord als ___ staat. Die zin hoort het kind bij het dictee.
 *    fout: (mag weg) een vaste foute schrijfwijze. Anders maakt het spel er zelf een
 *          (c → s, c → k, heid → heit/hijd, teit → tijt, isch → ies, tie → sie/tsie).
 *    lang: true = een lang woord (samenstelling). Die komen alleen bij Goud.
 *  Per niveau:
 *    🥉 Brons  = foutenjacht: in drie zinnen staat één woord fout gespeld; klik het aan
 *    🥈 Zilver = foutenjacht + het woord goed typen (en soms is alles goed gespeld)
 *    🥇 Goud   = dictee: je hoort het woord en de zin, en typt het hele woord (ook lange woorden)
 *  Zet per lokaal minstens 10 gewone woorden en 6 lange woorden in.
 * ============================================================
 */

export const SPELLING_INSTELLINGEN = {
  // Lokaal 5 (het stationrijtje, -tie) aan of uit.
  stationrijtje: true,
  // Wachtwoord voor de school. '' = iedereen kan zo naar binnen.
  wachtwoord: '',
};

/** Teksten van de Spellingwereld (vervangen die van Leergroep 3 – Rekenen). */
export const SPELLING_LEERGROEP = {
  naam: 'Spellingwereld',
  deurBord: 'Spellingwereld',
  welkom: 'Welkom in de Spellingwereld! In elk lokaal oefen je een spellingcategorie.',
  wachtwoord: SPELLING_INSTELLINGEN.wachtwoord,
  slotTitel: 'De Spellingwereld is nog dicht',
};

export const SPELLINGKAART = {
  titel: 'Spellingkaart',
  teller: '{aantal}/{totaal} Goud',
  medailles: ['', '🥉', '🥈', '🥇'],
  kampioen: '🏆 Spellingkampioen!',
  feestTitel: '🏆 Spellingkampioen!',
  feestTekst: 'Wauw! Alle lokalen op Goud. Jij bent een echte spellingkampioen!',
  testtoets: '🧪 Testtoets: alle spellinglokalen op Goud',
};

export const SPELLING_TEKSTEN = {
  niveauNamen: ['🥉 Brons', '🥈 Zilver', '🥇 Goud'],
  niveaus: ['Foutenjacht: vind het foute woord', 'Foutenjacht + verbeteren', 'Dictee met lange woorden'],
  opdrachtBrons: 'Foutenjacht! In één zin staat een woord fout gespeld. Klik op dat woord.',
  opdrachtZilver: 'Foutenjacht! Klik op het foute woord en verbeter het. Is alles goed? Klik dan op de groene knop.',
  opdrachtGoud: 'Dictee! Luister goed en typ het hele woord. Je ziet de zin niet.',
  opdrachtMix: 'Herhaalmix! Vind of hoor het woord, kies de categorie en schrijf het goed.',
  welkeCategorie: 'Bij welke categorie hoort dit woord?',
  allesGoed: '✅ Alles is goed gespeld',
  welkWoordFout: 'Welk woord is fout gespeld?',
  verbeter: 'Typ het woord goed:',
  nietFout: 'Dat woord is goed gespeld. Zoek verder!',
  welFout: 'Kijk nog eens goed: er staat wél een fout in.',
  geenFout: 'Goed gekeken: alles is goed gespeld!',
  luisterOpdracht: 'Luister naar het woord en typ het.',
  categorieFout: 'Luister nog eens goed naar het woord. Wat hoor je, en wat schrijf je?',
  luister: '🔊 Luister nog eens',
  geenStem: 'Deze computer kan niet voorlezen. Kijk goed naar de zin.',
  nogEenStap: 'Goed! Schrijf nu het woord.',
  goedeAntwoord: 'Het goede antwoord is: {woord}',
  niveauGehaald: '{medaille} gehaald bij {naam}!',
  mixOpSlot: 'De Herhaalmix gaat open als je in alle andere lokalen minstens 🥉 Brons hebt. Nog even oefenen!',
};

/*
 * De zes lokalen. Lokaal 1 t/m 3 liggen links van het leerplein, 4 t/m 6 rechts.
 * cat = welke woordenlijst (zie SPELLING_WOORDEN hieronder). Lokaal 6 = alle categorieën door elkaar.
 */
const ALLE_LOKALEN = [
  {
    nummer: 1, id: 'centwoord', cat: 'centwoord', naam: 'Cisca Cent', onderwerp: 'centwoord', icoon: '🪙', label: 'c klinkt als s',
    begroeting: 'Hoi! Ik ben Cisca Cent. Mijn naam begint met een c, maar je hoort een s. Bij mij oefen je centwoorden!',
    uitleg: [
      { tekst: 'Je hoort een s, maar je schrijft een c. Dat gebeurt vaak als er een e of i na de c komt.', voorbeeld: '**c**ent, **c**itroen, pro**c**ent' },
    ],
    tip: 'Je hoort een s, maar je schrijft een c. Komt er een e of i na? Dan is het vaak een c: cent, citroen.',
  },
  {
    nummer: 2, id: 'heidteit', cat: 'heidteit', naam: 'Heidi Heid', onderwerp: 'heid/teit', icoon: '🌟', label: '-heid / -teit',
    begroeting: 'Hallo! Ik ben Heidi Heid. Bij mij oefen je woorden die eindigen op -heid en -teit.',
    uitleg: [
      { tekst: "Hoor je aan het eind 'heit'? Dan schrijf je -heid. Hoor je 'teit'? Dan schrijf je -teit.", voorbeeld: 'gezond**heid**, kwali**teit**' },
      { tekst: 'Let op: je hoort ij, maar je schrijft ei! En -heid eindigt op een d.', voorbeeld: 'vrij**heid** (niet vrijhijd of vrijheit)' },
    ],
    tip: "Je hoort ij, maar je schrijft ei. 'heit' schrijf je als -heid (met een d), 'teit' als -teit.",
  },
  {
    nummer: 3, id: 'isch', cat: 'isch', naam: 'Tobias Typisch', onderwerp: 'isch', icoon: '🎩', label: '-isch',
    begroeting: 'Goedendag! Ik ben Tobias Typisch. Typisch ik: altijd -isch! Bij mij oefen je isch-woorden.',
    uitleg: [
      { tekst: "Hoor je aan het eind van een woord 'ies'? Dan schrijf je vaak -isch.", voorbeeld: 'log**isch**, prakt**isch**' },
      { tekst: 'Komt er een e achter? Dan schrijf je -ische.', voorbeeld: 'de log**ische** oplossing' },
    ],
    tip: "Hoor je aan het eind 'ies'? Dan schrijf je -isch. Komt er een e achter? Dan -ische.",
  },
  {
    nummer: 4, id: 'colawoord', cat: 'colawoord', naam: 'Carlo Cola', onderwerp: 'colawoord', icoon: '🥤', label: 'c klinkt als k',
    begroeting: 'Hé! Ik ben Carlo Cola. Mijn naam begint met een c, maar je hoort een k. Bij mij oefen je colawoorden!',
    uitleg: [
      { tekst: 'Je hoort een k, maar je schrijft een c. Dat gebeurt vaak als er een a, o, u of een medeklinker na de c komt.', voorbeeld: '**c**ola, **c**adeau, **c**lown' },
    ],
    tip: 'Je hoort een k, maar je schrijft een c. Komt er een a, o, u of een medeklinker na? Dan is het vaak een c: cola, clown.',
  },
  {
    nummer: 5, id: 'stationrijtje', cat: 'tie', naam: 'Agent Patty', onderwerp: 'stationrijtje (-tie)', icoon: '🚓', label: '-tie',
    begroeting: 'Goedemiddag! Ik ben Agent Patty van de politie. Bij mij oefen je woorden die eindigen op -tie.',
    uitleg: [
      { tekst: "Hoor je aan het eind 'sie' of 'tsie'? Dan schrijf je -tie.", voorbeeld: 'poli**tie**, vakan**tie**, informa**tie**' },
    ],
    tip: "Hoor je aan het eind 'sie' of 'tsie'? Dan schrijf je -tie: politie, vakantie.",
  },
  {
    nummer: 6, id: 'herhaalmix', cat: 'mix', naam: 'Max Mix', onderwerp: 'herhaalmix', icoon: '🔀', label: 'mix',
    begroeting: 'Yo! Ik ben Max Mix. Bij mij komen alle categorieën door elkaar. Eerst kies je de categorie, dan schrijf je het woord!',
    uitleg: [
      { tekst: 'Luister goed naar het woord. Hoor je een s die een c is? Een k die een c is? Hoor je heit, teit, ies of sie aan het eind? Kies de categorie en schrijf het woord.', voorbeeld: 'cent → centwoord<br>cola → colawoord<br>logisch → isch' },
    ],
    tip: 'Kijk eerst bij welke categorie het woord hoort. Gebruik dan de regel van die categorie.',
  },
];

/** De lokalen die meedoen (lokaal 5 kan uit). Een lokaal dat uit staat, heeft geen kraam. */
export const SPELLING_LOKALEN = ALLE_LOKALEN.map((l) => (
  l.cat === 'tie' && !SPELLING_INSTELLINGEN.stationrijtje
    ? { nummer: l.nummer, id: l.id, naam: `Lokaal ${l.nummer}`, onderwerp: 'gesloten', icoon: '🚪', uit: true }
    : l
));

export const SPELLING_WOORDEN = {
  centwoord: [
    { w: '[c]ent', zin: 'Een euro is honderd ___.' },
    { w: '[c]entrum', zin: 'We gaan winkelen in het ___ van de stad.' },
    { w: '[c]entimeter', zin: 'Mijn gum is vier ___ lang.' },
    { w: '[c]itroen', zin: 'Een ___ is geel en zuur.' },
    { w: '[c]ijfer', zin: 'Ik kreeg een mooi ___ voor mijn toets.' },
    { w: '[c]ircus', zin: 'In het ___ zag ik een clown op een eenwieler.' },
    { w: '[c]irkel', zin: 'Een ___ is helemaal rond.' },
    { w: '[c]el', zin: 'De boef zit in een ___ in de gevangenis.' },
    { w: '[c]eremonie', zin: 'Bij de opening was er een feestelijke ___.' },
    { w: 'de[c]ember', zin: 'Pakjesavond is in ___.' },
    { w: 'pro[c]ent', zin: 'In de uitverkoop krijg je vijftig ___ korting.' },
    { w: 'pre[c]ies', zin: 'Het is nu ___ twaalf uur.' },
    { w: 're[c]ept', zin: 'Oma bakt een taart volgens een oud ___.' },
    { w: 'medi[c]ijn', zin: 'Als je ziek bent, krijg je soms een ___.' },
    { w: 'con[c]ert', zin: 'We gaan naar een ___ van mijn favoriete band.' },
    { w: 'provin[c]ie', zin: 'Noord-Brabant is een ___ van Nederland.' },
    { w: 'o[c]eaan', zin: 'De walvis zwemt in de ___.' },
    // Lang (alleen bij Goud): samenstellingen en lange woorden
    { w: '[c]ijferslot', zin: 'Mijn kluisje zit dicht met een ___.', lang: true },
    { w: '[c]ircustent', zin: 'De ___ staat op het grasveld.', lang: true },
    { w: '[c]itroenthee', zin: 'Als ik verkouden ben, drink ik ___.', lang: true },
    { w: 'stads[c]entrum', zin: 'Op zaterdag is het druk in het ___.', lang: true },
    { w: 'winkel[c]entrum', zin: 'In het ___ kopen we nieuwe schoenen.', lang: true },
    { w: 'vioolcon[c]ert', zin: 'Mijn zus speelt mee in een ___.', lang: true },
    { w: 'openings[c]eremonie', zin: 'De Olympische Spelen beginnen met een ___.', lang: true },
    { w: 'familiere[c]ept', zin: 'Deze soep maken we volgens een oud ___.', lang: true },
    { w: 'om[c]irkelen', zin: 'Je moet het goede antwoord ___.', lang: true },
    { w: 'euro[c]ent', zin: 'Ik vond een ___ onder de bank.', lang: true },
  ],
  heidteit: [
    { w: 'gezond[heid]', zin: 'Groente is goed voor je ___.' },
    { w: 'waar[heid]', zin: 'Wie liegt, vertelt niet de ___.' },
    { w: 'schoon[heid]', zin: 'Iedereen bewondert de ___ van de zonsondergang.' },
    { w: 'een[heid]', zin: 'Een meter is een ___ om mee te meten.' },
    { w: 'vrij[heid]', zin: 'Op 5 mei vieren we de ___.', fout: 'vrijhijd' },
    { w: 'gelegen[heid]', zin: 'Een feest is een mooie ___ om te dansen.' },
    { w: 'snel[heid]', zin: 'De trein rijdt met een hoge ___.', fout: 'snelhijd' },
    { w: 'veilig[heid]', zin: 'Voor je ___ draag je een fietshelm.' },
    { w: 'kwali[teit]', zin: 'Deze schoenen zijn van goede ___.' },
    { w: 'universi[teit]', zin: 'Mijn zus studeert aan de ___.' },
    { w: 'activi[teit]', zin: 'Zwemmen is een leuke ___ in de zomer.' },
    { w: 'elektrici[teit]', zin: 'Een lamp werkt op ___.' },
    { w: 'identi[teit]', zin: 'Met je paspoort laat je je ___ zien.' },
    { w: 'nationali[teit]', zin: 'Zij heeft de Nederlandse ___.' },
    { w: 'reali[teit]', zin: 'Het was geen droom, maar ___.', fout: 'realiteid' },
    { w: 'creativi[teit]', zin: 'Bij het knutselen gebruik je je ___.' },
    { w: 'speciali[teit]', zin: 'Pannenkoeken bakken is de ___ van mijn opa.' },
    // Lang (alleen bij Goud)
    { w: 'veilig[heid]shelm', zin: 'Op de bouwplaats draag je een ___.', lang: true },
    { w: 'houdbaar[heid]sdatum', zin: 'Kijk op de ___ voordat je de melk drinkt.', lang: true },
    { w: 'elektrici[teit]skabel', zin: 'De ___ ligt diep onder de grond.', lang: true },
    { w: 'kwali[teit]scontrole', zin: 'In de fabriek is elke dag een ___.', lang: true },
    { w: 'universi[teit]sgebouw', zin: 'Het nieuwe ___ heeft tien verdiepingen.', lang: true },
    { w: 'nieuwsgierig[heid]', zin: 'Door haar ___ ontdekte ze een geheime kamer.', lang: true },
    { w: 'moeilijk[heid]sgraad', zin: 'Bij dit spel kies je zelf de ___.', lang: true },
    { w: 'brandveilig[heid]', zin: 'De brandweer controleert de ___ van de school.', lang: true },
  ],
  isch: [
    { w: 'log[isch]', zin: 'Het antwoord is heel ___.' },
    { w: 'prakt[isch]', zin: 'Een rugzak is heel ___ voor school.' },
    { w: 'typ[isch]', zin: 'Klompen zijn ___ Nederlands.' },
    { w: 'elektr[isch]', zin: 'Deze auto rijdt ___.' },
    { w: 'fantast[isch]', zin: 'Het schoolfeest was ___!' },
    { w: 'histor[isch]', zin: 'Het kasteel is een ___ gebouw.' },
    { w: 'techn[isch]', zin: 'Mijn oom is heel ___ en repareert alles.' },
    { w: 'mag[isch]', zin: 'De tovenaar heeft een ___ zwaard.' },
    { w: 'trop[isch]', zin: 'In de zomer was het heet en ___.' },
    { w: 'kom[isch]', zin: 'De film was heel ___.' },
    { w: 'log[ische]', zin: 'Dat is een ___ oplossing.' },
    { w: 'prakt[ische]', zin: 'Ik heb een ___ tas voor op de fiets.' },
    { w: 'elektr[ische]', zin: 'Wij hebben een ___ fiets.' },
    { w: 'fantast[ische]', zin: 'Wat een ___ tekening!' },
    { w: 'typ[ische]', zin: 'Dat is een ___ fout.' },
    { w: 'histor[ische]', zin: 'De ___ optocht trekt door de stad.' },
    // Lang (alleen bij Goud)
    { w: 'alfabet[isch]', zin: 'In het woordenboek staan de woorden ___.', lang: true },
    { w: 'automat[isch]', zin: 'De deur van de supermarkt gaat ___ open.', lang: true },
    { w: 'biolog[isch]', zin: 'Deze appels zijn ___ gekweekt.', lang: true },
    { w: 'chronolog[isch]', zin: 'Vertel het verhaal ___, van het begin tot het eind.', lang: true },
    { w: 'gigant[isch]', zin: 'De blauwe vinvis is ___ groot.', lang: true },
    { w: 'optimist[isch]', zin: 'Mijn opa is altijd vrolijk en ___.', lang: true },
    { w: 'vegetar[isch]', zin: 'Mijn tante eet ___.', lang: true },
    { w: 'romant[isch]', zin: 'Het was een ___ diner bij kaarslicht.', lang: true },
    { w: 'automat[ische]', zin: 'De winkel heeft een ___ deur.', lang: true },
    { w: 'biolog[ische]', zin: 'Op de markt koop ik ___ groente.', lang: true },
    { w: 'gigant[ische]', zin: 'In het bos staat een ___ boom.', lang: true },
  ],
  colawoord: [
    { w: '[c]ola', zin: 'Bij de pizza drink ik een glas ___.' },
    { w: '[c]adeau', zin: 'Voor mijn verjaardag kreeg ik een groot ___.' },
    { w: '[c]amping', zin: 'In de zomer slapen we in een tent op de ___.' },
    { w: '[c]omputer', zin: 'Ik typ mijn verhaal op de ___.' },
    { w: '[c]acao', zin: 'Chocolademelk maak je van melk en ___.' },
    { w: '[c]lown', zin: 'De ___ heeft een rode neus.' },
    { w: '[c]avia', zin: 'Mijn ___ eet graag komkommer.' },
    { w: '[c]ontact', zin: 'Via de app heb ik ___ met mijn oma.' },
    { w: '[c]lub', zin: 'Mijn broer zit bij een ___ voor hardlopen.' },
    { w: '[c]ultuur', zin: 'In de les leren we over de ___ van andere landen.' },
    { w: '[c]amera', zin: 'Met mijn ___ maak ik mooie foto’s.' },
    { w: '[c]arnaval', zin: 'Met ___ verkleed ik me als piraat.' },
    { w: '[c]actus', zin: 'Een ___ heeft scherpe stekels.' },
    { w: '[c]ollega', zin: 'De juf drinkt koffie met een ___.' },
    { w: 'produ[c]t', zin: 'Dit ___ kun je in de winkel kopen.' },
    { w: 'dire[c]teur', zin: 'De ___ van de school opent het schoolfeest.' },
    // Lang (alleen bij Goud)
    { w: '[c]adeaupapier', zin: 'Ik pak het pakje in met ___.', lang: true },
    { w: '[c]lubhuis', zin: 'Na de training drinken we limonade in het ___.', lang: true },
    { w: 'voetbal[c]lub', zin: 'Ik speel bij een ___ in het dorp.', lang: true },
    { w: 'taal[c]ursus', zin: 'Mijn moeder volgt een ___ Spaans.', lang: true },
    { w: 'stop[c]ontact', zin: 'Steek de stekker in het ___.', lang: true },
    { w: 'fluit[c]oncert', zin: 'Mijn broer speelt mee in een ___.', lang: true },
    { w: 'bios[c]oop', zin: 'We kijken de nieuwe film in de ___.', lang: true },
    { w: '[c]ursusleider', zin: 'De ___ legt uit hoe je moet tekenen.', lang: true },
    { w: 'a[c]robaat', zin: 'De ___ maakt een salto op het touw.', lang: true },
    { w: 'mi[c]rofoon', zin: 'De zanger zingt in een ___.', lang: true },
    { w: 'ta[c]tiek', zin: 'De trainer bedenkt een slimme ___.', lang: true },
  ],
  tie: [
    { w: 'poli[tie]', zin: 'De ___ zet de straat af.' },
    { w: 'vakan[tie]', zin: 'In de ___ gaan we naar Frankrijk.' },
    { w: 'informa[tie]', zin: 'Op de website staat veel ___.' },
    { w: 'posi[tie]', zin: 'De keeper staat op de goede ___.' },
    { w: 'tradi[tie]', zin: 'Kerst vieren is een ___ in ons gezin.' },
    { w: 'opera[tie]', zin: 'In het ziekenhuis had opa een ___ aan zijn knie.' },
    { w: 'adverten[tie]', zin: 'In de krant staat een ___ voor een nieuwe fiets.' },
    { w: 'administra[tie]', zin: 'De juf doet de ___ op de computer.' },
    { w: 'situa[tie]', zin: 'Wat doe je in een gevaarlijke ___?' },
    { w: 'garan[tie]', zin: 'Op mijn nieuwe fiets zit twee jaar ___.' },
    { w: 'emo[tie]', zin: 'Blij zijn is een ___.' },
    { w: 'presta[tie]', zin: 'Tien kilometer lopen is een knappe ___.' },
    { w: 'por[tie]', zin: 'Ik wil graag een ___ patat.' },
    // Lang (alleen bij Goud)
    { w: 'vakan[tie]huis', zin: 'Ons ___ staat vlak bij het strand.', lang: true },
    { w: 'poli[tie]auto', zin: 'Er rijdt een ___ met sirene voorbij.', lang: true },
    { w: 'poli[tie]bureau', zin: 'De dief moest mee naar het ___.', lang: true },
    { w: 'informa[tie]bord', zin: 'Op het ___ staat hoe laat de trein vertrekt.', lang: true },
    { w: 'opera[tie]kamer', zin: 'De dokter gaat de ___ in.', lang: true },
    { w: 'concentra[tie]', zin: 'Voor dit dictee heb je veel ___ nodig.', lang: true },
    { w: 'presenta[tie]', zin: 'Ik geef morgen een ___ over haaien.', lang: true },
    { w: 'motiva[tie]', zin: 'Met veel ___ train ik voor de wedstrijd.', lang: true },
    { w: 'vaccina[tie]', zin: 'Bij de dokter kreeg ik een ___.', lang: true },
    { w: 'organisa[tie]', zin: 'De ___ van het schoolfeest was perfect.', lang: true },
    { w: 'demonstra[tie]', zin: 'De brandweer geeft een ___ op het plein.', lang: true },
  ],
};

/**
 * Hoe het spel zelf foute schrijfwijzen maakt, per categorie. Het spel kiest er steeds één uit,
 * dus het ene kind ziet 'gezondheit' en het andere 'gezondhijd'.
 */
export const FOUTE_KLANK = {
  centwoord: { c: ['s'] },
  colawoord: { c: ['k'] },
  heidteit: { heid: ['heit', 'hijd', 'hijt'], teit: ['tijt', 'teid', 'tijd'] },
  isch: { isch: ['ies', 'iesch', 'is'], ische: ['iese', 'iesche', 'isse'] },
  tie: { tie: ['sie', 'tsie', 'cie'] },
};
