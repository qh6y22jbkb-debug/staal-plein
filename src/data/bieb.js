/*
 * ============================================================
 *  DE BIEB – herhalingsblok (Staal groep 7): zinsontleding
 * ============================================================
 *  Een ruimte in het schoolgebouw met vijf leesplekken. Bij elke leesplek oefen je één zinsdeel:
 *  persoonsvorm, onderwerp, werkwoordelijk gezegde, lijdend voorwerp of voorzetsels.
 *  De zin verschijnt als losse woordblokjes; het kind klikt de goede woorden aan.
 *
 *  Alle leesplekken gebruiken dezelfde zinnen (BIEB_ZINNEN). Per zin staat erbij:
 *    pv:  de persoonsvorm
 *    ow:  het onderwerp (de woorden precies zoals in de zin)
 *    wg:  het werkwoordelijk gezegde: alle werkwoorden, in de volgorde van de zin
 *    lv:  het lijdend voorwerp, of null als de zin geen lijdend voorwerp heeft
 *    vz:  de voorzetsels in de zin, in de volgorde van de zin ([] = geen)
 *    niveau: 1 = Brons (kort), 2 = Zilver (langer, ook met inversie), 3 = Goud (lang, meer werkwoorden)
 *  Let op bij nieuwe zinnen: geen koppelwerkwoorden (is ziek, wordt groot) en geen scheidbare
 *  werkwoorden (ruimt op): dan klopt het werkwoordelijk gezegde niet meer met deze regels.
 * ============================================================
 */

export const BIEB = {
  naam: 'De Bieb',
  deurBord: '📚 De Bieb',
  welkom: 'Welkom in de Bieb! Bij elke leesplek oefen je een stukje zinsontleding.',
  naarBinnenToets: 'Druk op E om naar de Bieb te gaan',
  naarBinnenTik: 'Tik hier om naar de Bieb te gaan',
  naarBuitenToets: 'Druk op E om naar het schoolplein te gaan',
  naarBuitenTik: 'Tik hier om naar het schoolplein te gaan',
  deurTerugBord: 'Schoolplein',
  wandBord: 'De boekenwereld',
  griezelBord: 'Griezelboeken',
};

export const BIEBKAART = {
  titel: 'Biebkaart',
  teller: '{aantal}/{totaal} Goud',
  medailles: ['', '🥉', '🥈', '🥇'],
  kampioen: '🏆 Zinnenkampioen!',
  feestTitel: '🏆 Zinnenkampioen!',
  feestTekst: 'Wauw! Alle leesplekken op Goud. Jij kunt elke zin ontleden!',
  testtoets: '🧪 Testtoets: alle leesplekken in de Bieb op Goud',
};

export const BIEB_TEKSTEN = {
  niveauNamen: ['🥉 Brons', '🥈 Zilver', '🥇 Goud'],
  niveauGehaald: '{medaille} gehaald bij {naam}!',
  klaarKnop: 'Klaar ✓',
  geenLv: 'Deze zin heeft geen lijdend voorwerp',
  stap: 'Stap {nr} van {totaal}',
  goedeAntwoord: 'Het goede antwoord is: {antwoord}',
  nietsGekozen: 'Klik eerst op een of meer woorden.',
  // Wat het kind per zinsdeel moet zoeken (bij Goud in stappen).
  zoek: {
    pv: 'Klik op de persoonsvorm.',
    ow: 'Klik op alle woorden van het onderwerp.',
    wg: 'Klik op alle woorden van het werkwoordelijk gezegde.',
    lv: 'Klik op alle woorden van het lijdend voorwerp.',
    vz: 'Klik op alle voorzetsels in de zin.',
  },
  namen: { pv: 'persoonsvorm', ow: 'onderwerp', wg: 'werkwoordelijk gezegde', lv: 'lijdend voorwerp', vz: 'voorzetsels' },
  // Tips bij een fout antwoord.
  tip: {
    pv: 'Doe de vraagproef: maak er een vraag van. Het werkwoord dat vooraan komt, is de persoonsvorm. Of doe de tijdproef: welk werkwoord verandert als je de zin in een andere tijd zet?',
    ow: 'Zoek eerst de persoonsvorm. Vraag dan: wie of wat + persoonsvorm? Het hele antwoord is het onderwerp.',
    wg: 'Het werkwoordelijk gezegde zijn álle werkwoorden in de zin samen, dus ook de persoonsvorm.',
    lv: 'Vraag: wie of wat + gezegde + onderwerp? Het antwoord is het lijdend voorwerp. Niet elke zin heeft er een!',
    vz: "Doe de doostest: kun je het woord voor 'de doos' zetten (op de doos, in de doos)? Dan is het waarschijnlijk een voorzetsel.",
  },
};

/*
 * De vijf leesplekken. zoek = welk zinsdeel je zoekt.
 * goud = welke zinsdelen je bij Goud na elkaar zoekt (meerdere zinsdelen in één zin).
 */
export const BIEB_PLEKKEN = [
  {
    id: 'persoonsvorm', zoek: 'pv', goud: ['pv', 'ow'], naam: 'Peter Persoonsvorm', onderwerp: 'persoonsvorm', icoon: '🎯',
    karakter: 'peter', kleur: '#1c7ed6',
    niveaus: ['Korte zinnen', 'Langere zinnen, ook met inversie', 'Persoonsvorm én onderwerp'],
    begroeting: 'Hallo! Ik ben Peter Persoonsvorm. Bij mij zoek je in elke zin het werkwoord dat verandert als je de tijd verandert: de persoonsvorm!',
    uitleg: [
      { tekst: 'Maak de zin vragend: het werkwoord dat vooraan komt, is de persoonsvorm (vraagproef).', voorbeeld: 'Sanne leest een boek.<br>**Leest** Sanne een boek?' },
      { tekst: 'Of zet de zin in een andere tijd: het werkwoord dat verandert, is de persoonsvorm (tijdproef).', voorbeeld: 'Sanne **leest** een boek.<br>Sanne **las** een boek.' },
    ],
  },
  {
    id: 'onderwerp', zoek: 'ow', goud: ['pv', 'ow'], naam: 'Olga Onderwerp', onderwerp: 'onderwerp', icoon: '🙋',
    karakter: 'olga', kleur: '#2f9e44',
    niveaus: ['Korte zinnen', 'Langere zinnen, ook met inversie', 'Persoonsvorm én onderwerp'],
    begroeting: 'Hoi! Ik ben Olga Onderwerp. Bij mij zoek je wie of wat iets doet in de zin.',
    uitleg: [
      { tekst: 'Zoek eerst de persoonsvorm. Vraag dan: wie of wat + persoonsvorm? Het antwoord is het onderwerp.', voorbeeld: 'Morgen gaat Tim naar school.<br>Wie gaat? → **Tim**' },
      { tekst: 'Het onderwerp kan uit meer woorden bestaan. Klik ze dan allemaal aan.', voorbeeld: '**De kinderen van groep 7** zingen een lied.' },
    ],
  },
  {
    id: 'gezegde', zoek: 'wg', goud: ['pv', 'ow', 'wg'], naam: 'Gijs Gezegde', onderwerp: 'werkwoordelijk gezegde', icoon: '🍦',
    karakter: 'gijs', kleur: '#0ca678',
    niveaus: ['Korte zinnen', 'Langere zinnen met meer werkwoorden', 'Persoonsvorm, onderwerp én gezegde'],
    begroeting: 'Hé! Ik ben Gijs Gezegde. Bij mij zoek je álle werkwoorden in de zin: het werkwoordelijk gezegde.',
    uitleg: [
      { tekst: 'Het werkwoordelijk gezegde zijn alle werkwoorden in de zin samen, dus ook de persoonsvorm.', voorbeeld: 'Noor **heeft** een tekening **gemaakt**.<br>Werkwoordelijk gezegde: heeft gemaakt' },
    ],
  },
  {
    id: 'lijdendvoorwerp', zoek: 'lv', goud: ['pv', 'ow', 'wg', 'lv'], naam: 'Lies Leeslamp', onderwerp: 'lijdend voorwerp', icoon: '📖',
    karakter: 'lies', kleur: '#e8590c',
    niveaus: ['Korte zinnen', 'Ook zinnen zonder lijdend voorwerp', 'Alle zinsdelen na elkaar'],
    begroeting: 'Goedendag! Ik ben Lies Leeslamp, de bibliothecaris. Bij mij zoek je het lijdend voorwerp.',
    uitleg: [
      { tekst: 'Zoek eerst het gezegde en het onderwerp. Vraag dan: wie of wat + gezegde + onderwerp? Het antwoord is het lijdend voorwerp.', voorbeeld: 'Sanne leest een boek.<br>Wat leest Sanne? → **een boek**' },
      { tekst: 'Niet elke zin heeft een lijdend voorwerp!', voorbeeld: 'De kat slaapt op de bank.<br>Wat slaapt de kat? → geen antwoord: geen lijdend voorwerp' },
    ],
  },
  {
    id: 'voorzetsels', zoek: 'vz', goud: ['pv', 'vz'], naam: 'Bob de Boekenwurm', onderwerp: 'voorzetsels', icoon: '🐛',
    karakter: 'bob', kleur: '#7048e8',
    niveaus: ['Korte zinnen', 'Langere zinnen, soms meer voorzetsels', 'Persoonsvorm én voorzetsels'],
    begroeting: 'Hallo hallo! Ik ben Bob de Boekenwurm. Ik kruip tussen, onder en achter de boeken. Bij mij zoek je voorzetsels!',
    uitleg: [
      { tekst: 'Een voorzetsel zegt vaak waar iets is of wanneer iets gebeurt: op, in, onder, naast, achter, voor, tussen, boven, bij, na, tijdens.', voorbeeld: 'De bal ligt **onder** de tafel.' },
      { tekst: "Twijfel je? Doe de doostest: kun je het woord voor 'de doos' zetten? Dan is het waarschijnlijk een voorzetsel.", voorbeeld: '**op** de doos, **in** de doos, **naast** de doos' },
    ],
  },
];

export const BIEB_ZINNEN = [
  /* ---------- Brons: korte zinnen ---------- */
  { niveau: 1, zin: 'Sanne leest een boek in de bieb.', pv: 'leest', ow: 'Sanne', wg: 'leest', lv: 'een boek', vz: ['in'] },
  { niveau: 1, zin: 'De kat slaapt op de bank.', pv: 'slaapt', ow: 'De kat', wg: 'slaapt', lv: null, vz: ['op'] },
  { niveau: 1, zin: 'Tim schopt de bal naar Noor.', pv: 'schopt', ow: 'Tim', wg: 'schopt', lv: 'de bal', vz: ['naar'] },
  { niveau: 1, zin: 'Oma bakt een taart voor mijn verjaardag.', pv: 'bakt', ow: 'Oma', wg: 'bakt', lv: 'een taart', vz: ['voor'] },
  { niveau: 1, zin: 'De hond rent door het park.', pv: 'rent', ow: 'De hond', wg: 'rent', lv: null, vz: ['door'] },
  { niveau: 1, zin: 'Wij fietsen naar school.', pv: 'fietsen', ow: 'Wij', wg: 'fietsen', lv: null, vz: ['naar'] },
  { niveau: 1, zin: 'Juf Anna schrijft op het bord.', pv: 'schrijft', ow: 'Juf Anna', wg: 'schrijft', lv: null, vz: ['op'] },
  { niveau: 1, zin: 'Ik eet een appel na school.', pv: 'eet', ow: 'Ik', wg: 'eet', lv: 'een appel', vz: ['na'] },
  { niveau: 1, zin: 'De vogel zit in de boom.', pv: 'zit', ow: 'De vogel', wg: 'zit', lv: null, vz: ['in'] },
  { niveau: 1, zin: 'Papa wast de auto met een spons.', pv: 'wast', ow: 'Papa', wg: 'wast', lv: 'de auto', vz: ['met'] },
  { niveau: 1, zin: 'Lisa tekent een paard.', pv: 'tekent', ow: 'Lisa', wg: 'tekent', lv: 'een paard', vz: [] },
  { niveau: 1, zin: 'De bal ligt onder de tafel.', pv: 'ligt', ow: 'De bal', wg: 'ligt', lv: null, vz: ['onder'] },
  { niveau: 1, zin: 'Mijn broer speelt met zijn hond.', pv: 'speelt', ow: 'Mijn broer', wg: 'speelt', lv: null, vz: ['met'] },
  { niveau: 1, zin: 'Wij lezen in de bieb.', pv: 'lezen', ow: 'Wij', wg: 'lezen', lv: null, vz: ['in'] },
  { niveau: 1, zin: 'De juf vertelt een verhaal.', pv: 'vertelt', ow: 'De juf', wg: 'vertelt', lv: 'een verhaal', vz: [] },
  { niveau: 1, zin: 'Sem zwemt in het meer.', pv: 'zwemt', ow: 'Sem', wg: 'zwemt', lv: null, vz: ['in'] },
  { niveau: 1, zin: 'De kinderen zingen een lied.', pv: 'zingen', ow: 'De kinderen', wg: 'zingen', lv: 'een lied', vz: [] },
  { niveau: 1, zin: 'Mama koopt brood bij de bakker.', pv: 'koopt', ow: 'Mama', wg: 'koopt', lv: 'brood', vz: ['bij'] },
  { niveau: 1, zin: 'Het meisje springt over het hek.', pv: 'springt', ow: 'Het meisje', wg: 'springt', lv: null, vz: ['over'] },
  { niveau: 1, zin: 'Ik zoek mijn jas.', pv: 'zoek', ow: 'Ik', wg: 'zoek', lv: 'mijn jas', vz: [] },
  { niveau: 1, zin: 'Noor plukt bloemen in de tuin.', pv: 'plukt', ow: 'Noor', wg: 'plukt', lv: 'bloemen', vz: ['in'] },
  { niveau: 1, zin: 'De boer melkt de koeien.', pv: 'melkt', ow: 'De boer', wg: 'melkt', lv: 'de koeien', vz: [] },
  { niveau: 1, zin: 'Daan bouwt een hut in het bos.', pv: 'bouwt', ow: 'Daan', wg: 'bouwt', lv: 'een hut', vz: ['in'] },
  { niveau: 1, zin: 'Wij planten een boom bij school.', pv: 'planten', ow: 'Wij', wg: 'planten', lv: 'een boom', vz: ['bij'] },
  { niveau: 1, zin: 'Mila pakt haar tas.', pv: 'pakt', ow: 'Mila', wg: 'pakt', lv: 'haar tas', vz: [] },

  /* ---------- Zilver: langere zinnen, ook met inversie ---------- */
  { niveau: 2, zin: 'Morgen gaat Tim naar school.', pv: 'gaat', ow: 'Tim', wg: 'gaat', lv: null, vz: ['naar'] },
  { niveau: 2, zin: 'Na de pauze tekenen wij een kasteel.', pv: 'tekenen', ow: 'wij', wg: 'tekenen', lv: 'een kasteel', vz: ['Na'] },
  { niveau: 2, zin: 'In de vakantie bezoeken we opa en oma.', pv: 'bezoeken', ow: 'we', wg: 'bezoeken', lv: 'opa en oma', vz: ['In'] },
  { niveau: 2, zin: 'Gisteren heeft Noor een mooie tekening gemaakt.', pv: 'heeft', ow: 'Noor', wg: 'heeft gemaakt', lv: 'een mooie tekening', vz: [] },
  { niveau: 2, zin: 'Op zaterdag speelt mijn zus hockey.', pv: 'speelt', ow: 'mijn zus', wg: 'speelt', lv: 'hockey', vz: ['Op'] },
  { niveau: 2, zin: 'Elke ochtend loopt de buurman met zijn hond door het park.', pv: 'loopt', ow: 'de buurman', wg: 'loopt', lv: null, vz: ['met', 'door'] },
  { niveau: 2, zin: 'Tijdens de les fluistert Daan iets tegen Mila.', pv: 'fluistert', ow: 'Daan', wg: 'fluistert', lv: 'iets', vz: ['Tijdens', 'tegen'] },
  { niveau: 2, zin: 'Wij hebben de hele middag in de tuin gewerkt.', pv: 'hebben', ow: 'Wij', wg: 'hebben gewerkt', lv: null, vz: ['in'] },
  { niveau: 2, zin: 'Vanavond kijkt het hele gezin een film.', pv: 'kijkt', ow: 'het hele gezin', wg: 'kijkt', lv: 'een film', vz: [] },
  { niveau: 2, zin: 'Achter de school staat een grote boom.', pv: 'staat', ow: 'een grote boom', wg: 'staat', lv: null, vz: ['Achter'] },
  { niveau: 2, zin: 'De leerlingen van groep 7 maken samen een werkstuk.', pv: 'maken', ow: 'De leerlingen van groep 7', wg: 'maken', lv: 'een werkstuk', vz: ['van'] },
  { niveau: 2, zin: 'Na het eten wast Sem de borden.', pv: 'wast', ow: 'Sem', wg: 'wast', lv: 'de borden', vz: ['Na'] },
  { niveau: 2, zin: 'Mijn moeder heeft een nieuwe fiets gekocht.', pv: 'heeft', ow: 'Mijn moeder', wg: 'heeft gekocht', lv: 'een nieuwe fiets', vz: [] },
  { niveau: 2, zin: 'Op het plein spelen de kinderen tikkertje.', pv: 'spelen', ow: 'de kinderen', wg: 'spelen', lv: 'tikkertje', vz: ['Op'] },
  { niveau: 2, zin: 'Morgen reist Lotte met de trein naar Utrecht.', pv: 'reist', ow: 'Lotte', wg: 'reist', lv: null, vz: ['met', 'naar'] },
  { niveau: 2, zin: 'In de bieb leent Ayoub drie boeken.', pv: 'leent', ow: 'Ayoub', wg: 'leent', lv: 'drie boeken', vz: ['In'] },
  { niveau: 2, zin: 'De brandweer is snel naar het huis gereden.', pv: 'is', ow: 'De brandweer', wg: 'is gereden', lv: null, vz: ['naar'] },
  { niveau: 2, zin: 'Vandaag schrijven we een brief aan de burgemeester.', pv: 'schrijven', ow: 'we', wg: 'schrijven', lv: 'een brief', vz: ['aan'] },
  { niveau: 2, zin: 'Boven de deur hangt een klok.', pv: 'hangt', ow: 'een klok', wg: 'hangt', lv: null, vz: ['Boven'] },
  { niveau: 2, zin: 'Gisteren hebben wij pannenkoeken gebakken.', pv: 'hebben', ow: 'wij', wg: 'hebben gebakken', lv: 'pannenkoeken', vz: [] },

  /* ---------- Goud: lange zinnen, meer werkwoorden, vaak geen lijdend voorwerp ---------- */
  { niveau: 3, zin: 'Volgende week gaan wij met de hele klas naar het museum.', pv: 'gaan', ow: 'wij', wg: 'gaan', lv: null, vz: ['met', 'naar'] },
  { niveau: 3, zin: 'Na schooltijd heeft mijn broer zijn huiswerk aan de keukentafel gemaakt.', pv: 'heeft', ow: 'mijn broer', wg: 'heeft gemaakt', lv: 'zijn huiswerk', vz: ['Na', 'aan'] },
  { niveau: 3, zin: 'Tijdens de storm zijn veel bomen omgevallen.', pv: 'zijn', ow: 'veel bomen', wg: 'zijn omgevallen', lv: null, vz: ['Tijdens'] },
  { niveau: 3, zin: 'Morgen moeten de kinderen van groep 7 een spreekbeurt houden.', pv: 'moeten', ow: 'de kinderen van groep 7', wg: 'moeten houden', lv: 'een spreekbeurt', vz: ['van'] },
  { niveau: 3, zin: 'In het bos hebben wij een eekhoorn tussen de bladeren gezien.', pv: 'hebben', ow: 'wij', wg: 'hebben gezien', lv: 'een eekhoorn', vz: ['In', 'tussen'] },
  { niveau: 3, zin: 'De meester heeft de toetsen op zijn bureau gelegd.', pv: 'heeft', ow: 'De meester', wg: 'heeft gelegd', lv: 'de toetsen', vz: ['op'] },
  { niveau: 3, zin: 'Zaterdag gaan mijn ouders met de auto naar de markt.', pv: 'gaan', ow: 'mijn ouders', wg: 'gaan', lv: null, vz: ['met', 'naar'] },
  { niveau: 3, zin: 'Na de wedstrijd wilde het hele team een ijsje eten.', pv: 'wilde', ow: 'het hele team', wg: 'wilde eten', lv: 'een ijsje', vz: ['Na'] },
  { niveau: 3, zin: 'Mijn opa heeft vroeger op een boerderij gewoond.', pv: 'heeft', ow: 'Mijn opa', wg: 'heeft gewoond', lv: null, vz: ['op'] },
  { niveau: 3, zin: 'Elke woensdag zwemmen de kinderen in het zwembad.', pv: 'zwemmen', ow: 'de kinderen', wg: 'zwemmen', lv: null, vz: ['in'] },
  { niveau: 3, zin: 'Gisteren heeft de juf een spannend boek in de klas voorgelezen.', pv: 'heeft', ow: 'de juf', wg: 'heeft voorgelezen', lv: 'een spannend boek', vz: ['in'] },
  { niveau: 3, zin: 'Tijdens de vakantie zullen wij bij onze tante logeren.', pv: 'zullen', ow: 'wij', wg: 'zullen logeren', lv: null, vz: ['Tijdens', 'bij'] },
  { niveau: 3, zin: 'Over een uur kan de bakker de taarten uit de oven halen.', pv: 'kan', ow: 'de bakker', wg: 'kan halen', lv: 'de taarten', vz: ['Over', 'uit'] },
  { niveau: 3, zin: 'De kinderen hebben de hele middag buiten op het plein gespeeld.', pv: 'hebben', ow: 'De kinderen', wg: 'hebben gespeeld', lv: null, vz: ['op'] },
  { niveau: 3, zin: 'Volgend jaar wil mijn zus op de universiteit studeren.', pv: 'wil', ow: 'mijn zus', wg: 'wil studeren', lv: null, vz: ['op'] },
  { niveau: 3, zin: 'Met een vergrootglas heeft Mila een kever onder de steen gevonden.', pv: 'heeft', ow: 'Mila', wg: 'heeft gevonden', lv: 'een kever', vz: ['Met', 'onder'] },
  { niveau: 3, zin: 'Wanneer gaan jullie met de bus naar het zwembad?', pv: 'gaan', ow: 'jullie', wg: 'gaan', lv: null, vz: ['met', 'naar'] },
  { niveau: 3, zin: 'Heeft Daan zijn gymtas in de kast gelegd?', pv: 'Heeft', ow: 'Daan', wg: 'Heeft gelegd', lv: 'zijn gymtas', vz: ['in'] },
  { niveau: 3, zin: 'Na het concert zijn de muzikanten met de bus naar huis gereden.', pv: 'zijn', ow: 'de muzikanten', wg: 'zijn gereden', lv: null, vz: ['Na', 'met', 'naar'] },
  { niveau: 3, zin: 'Door de regen moesten wij binnen blijven.', pv: 'moesten', ow: 'wij', wg: 'moesten blijven', lv: null, vz: ['Door'] },
];

/** Kinderen die door de Bieb lopen (aanspreken met E) en wat ze zeggen. */
export const BIEB_KINDEREN = {
  namen: ['Saar', 'Milan', 'Nora', 'Bilal'],
  uitspraken: [
    'Sst! In de bieb praten we zachtjes.',
    'Ik lees een griezelboek. Superspannend!',
    'Weet jij waar de strips staan?',
    'Bob de Boekenwurm vraagt naar voorzetsels. Op, in, onder… ik ken ze allemaal!',
    'Wie of wat + persoonsvorm? Dan vind je het onderwerp. Dat heeft Olga me geleerd!',
    'Niet elke zin heeft een lijdend voorwerp. Daar trapte ik eerst in!',
    'Het werkwoordelijk gezegde zijn álle werkwoorden. Ook de persoonsvorm!',
    'Ik zit het liefst op de groene bank om te lezen.',
    'Vraagproef: maak er een vraag van. Het werkwoord vooraan is de persoonsvorm!',
    'Ik heb drie boeken geleend. Eentje over haaien!',
  ],
};
