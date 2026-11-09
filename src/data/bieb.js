/*
 * ============================================================
 *  DE BIEB – herhalingsblok (Staal groep 7): zinsontleding
 * ============================================================
 *  Een ruimte in het schoolgebouw met zeven leesplekken. Bij elke leesplek oefen je één zinsdeel (of het rangtelwoord):
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
  geenHt: 'Deze zin heeft geen hoofdtelwoord',
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
    rt: 'Klik op alle rangtelwoorden in de zin.',
    ht: 'Klik op alle hoofdtelwoorden in de zin.',
  },
  namen: { pv: 'persoonsvorm', ow: 'onderwerp', wg: 'werkwoordelijk gezegde', lv: 'lijdend voorwerp', vz: 'voorzetsels', rt: 'rangtelwoorden', ht: 'hoofdtelwoorden' },
  // Tips bij een fout antwoord.
  tip: {
    pv: 'Doe de vraagproef: maak er een vraag van. Het werkwoord dat vooraan komt, is de persoonsvorm. Of doe de tijdproef: welk werkwoord verandert als je de zin in een andere tijd zet?',
    ow: 'Zoek eerst de persoonsvorm. Vraag dan: wie of wat + persoonsvorm? Het hele antwoord is het onderwerp.',
    wg: 'Het werkwoordelijk gezegde zijn álle werkwoorden in de zin samen, dus ook de persoonsvorm.',
    lv: 'Vraag: wie of wat + gezegde + onderwerp? Het antwoord is het lijdend voorwerp. Niet elke zin heeft er een!',
    vz: "Doe de doostest: kun je het woord voor 'de doos' zetten (op de doos, in de doos)? Dan is het waarschijnlijk een voorzetsel.",
    rt: 'Een rangtelwoord zegt welke plaats of welke beurt: eerste, tweede, derde, tiende, twintigste. Het eindigt meestal op -de of -ste. Let op: vierde kan ook een werkwoord zijn (zij vierde een feest)!',
    ht: 'Een hoofdtelwoord zegt hoeveel: twee, drie, tien, twintig, honderd. Er staat geen -de of -ste achter.',
  },
};

/*
 * De zeven leesplekken. zoek = welk zinsdeel je zoekt (rt = rangtelwoord, met eigen zinnen: BIEB_TELZINNEN).
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
  {
    id: 'rangtelwoord', zoek: 'rt', goud: ['rt', 'ht'], naam: 'Ronja Rangtelwoord', onderwerp: 'rangtelwoord', icoon: '🔢',
    karakter: 'ronja', kleur: '#c2255c', telzinnen: true,
    niveaus: ['Korte zinnen', 'Met hoofdtelwoorden als valkuil', 'Rangtelwoorden én hoofdtelwoorden'],
    begroeting: 'Hoi! Ik ben Ronja Rangtelwoord. Ik werd eerste bij de leeswedstrijd! Bij mij zoek je rangtelwoorden.',
    uitleg: [
      { tekst: 'Een rangtelwoord zegt welke plaats of welke beurt iets heeft: eerste, tweede, derde, tiende, twintigste.', voorbeeld: 'Ik zit in de **derde** rij.<br>Tim werd **vijfde**.' },
      { tekst: 'Een hoofdtelwoord zegt hoeveel: twee, drie, tien, honderd. Dat is géén rangtelwoord.', voorbeeld: 'Ik lees **drie** boeken (hoofdtelwoord).<br>Het **tweede** boek is het mooist (rangtelwoord).' },
      { tekst: 'Rangtelwoorden eindigen meestal op -de of -ste. Pas op: vierde kan ook een werkwoord zijn!', voorbeeld: 'vier → vier**de**, acht → acht**ste**, twintig → twintig**ste**<br>Sanne **vierde** haar verjaardag. (werkwoord: vieren)' },
    ],
  },
  {
    id: 'woordsoorten', zoek: 'woordsoort', goud: [], naam: 'Wanda Woordsoort', onderwerp: 'woordsoorten', icoon: '🏷️',
    karakter: 'wanda', kleur: '#d6336c', woordsoorten: true,
    niveaus: ['Lidwoord, zn, bn, werkwoord, voorzetsel, telwoord', 'Alle 11 woordsoorten', 'Zelf de woordsoort kiezen'],
    begroeting: 'Hallo! Ik ben Wanda Woordsoort. Ik plak een etiket op elk woord. Bij mij oefen je de 11 woordsoorten van de kaart!',
    uitleg: [
      { tekst: 'Lidwoord: de, het, een. Zelfstandig naamwoord: mens, dier, ding of naam. Bijvoeglijk naamwoord: zegt hoe iets is.', voorbeeld: '**de** (lw) **grote** (bn) **boom** (zn)' },
      { tekst: 'Werkwoord: wat iemand doet. Een hulpwerkwoord helpt een ander werkwoord. Het voltooid deelwoord hoort bij hebben of zijn.', voorbeeld: 'Ik **heb** (hww) gefietst (vd).<br>Ik **heb** (ww) een fiets.' },
      { tekst: 'Voorzetsel: doostest (op de doos). Voegwoord: verbindt (en, maar, omdat). Stoffelijk bijvoeglijk naamwoord: waarvan iets gemaakt is (houten, gouden). Telwoord: hoeveel (drie). Rangtelwoord: welke plaats (derde).', voorbeeld: 'een **houten** kist, **drie** boeken, de **derde** rij' },
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
    'Ronja Rangtelwoord werd eerste. Eerste is een rangtelwoord, drie is een hoofdtelwoord!',
  ],
};

/*
 * Zinnen voor Ronja Rangtelwoord.
 *   rt:   de rangtelwoorden in de zin (eerste, derde, twintigste …), in de volgorde van de zin
 *   ht:   de hoofdtelwoorden in de zin (twee, tien, honderd …); [] = geen
 *   geen: woorden die op een telwoord lijken maar het niet zijn (bijv. vierde als werkwoord)
 *   Schrijf getallen altijd in letters. Gebruik 'een' niet als telwoord (dat is verwarrend met het lidwoord).
 */
export const BIEB_TELZINNEN = [
  /* ---------- Brons: korte zinnen met één rangtelwoord ---------- */
  { niveau: 1, zin: 'Ik zit in de eerste rij.', rt: ['eerste'], ht: [] },
  { niveau: 1, zin: 'Sanne woont op de derde verdieping.', rt: ['derde'], ht: [] },
  { niveau: 1, zin: 'Dit is mijn tweede boek over haaien.', rt: ['tweede'], ht: [] },
  { niveau: 1, zin: 'Tim werd vijfde bij de wedstrijd.', rt: ['vijfde'], ht: [] },
  { niveau: 1, zin: 'Vandaag is mijn tiende verjaardag.', rt: ['tiende'], ht: [] },
  { niveau: 1, zin: 'Het vierde hoofdstuk is spannend.', rt: ['vierde'], ht: [] },
  { niveau: 1, zin: 'Noor zit in de zesde rij.', rt: ['zesde'], ht: [] },
  { niveau: 1, zin: 'Ik las het boek voor de derde keer.', rt: ['derde'], ht: [] },
  { niveau: 1, zin: 'Mila werd tweede met tekenen.', rt: ['tweede'], ht: [] },
  { niveau: 1, zin: 'Op de zevende dag rustten we uit.', rt: ['zevende'], ht: [] },
  { niveau: 1, zin: 'Daan staat als eerste in de rij.', rt: ['eerste'], ht: [] },
  { niveau: 1, zin: 'Het negende huis is van mijn oma.', rt: ['negende'], ht: [] },
  { niveau: 1, zin: 'Dit is de twaalfde bladzijde.', rt: ['twaalfde'], ht: [] },
  { niveau: 1, zin: 'Opa viert zijn tachtigste verjaardag.', rt: ['tachtigste'], ht: [] },
  { niveau: 1, zin: 'Wij wonen in het elfde huis.', rt: ['elfde'], ht: [] },
  { niveau: 1, zin: 'De honderdste bezoeker krijgt een prijs.', rt: ['honderdste'], ht: [] },

  /* ---------- Zilver: ook hoofdtelwoorden in de zin (die klik je níet aan) ---------- */
  { niveau: 2, zin: 'Ik lees drie boeken, maar het tweede vind ik het mooist.', rt: ['tweede'], ht: ['drie'] },
  { niveau: 2, zin: 'In het vierde lokaal staan twintig tafels.', rt: ['vierde'], ht: ['twintig'] },
  { niveau: 2, zin: 'Na twee rondes ligt Noor op de eerste plaats.', rt: ['eerste'], ht: ['twee'] },
  { niveau: 2, zin: 'Op de vijfde dag van de vakantie zagen we tien dolfijnen.', rt: ['vijfde'], ht: ['tien'] },
  { niveau: 2, zin: 'Het zesde boek uit de serie heeft honderd bladzijden.', rt: ['zesde'], ht: ['honderd'] },
  { niveau: 2, zin: 'Mijn zus wordt twaalf en viert haar twaalfde verjaardag.', rt: ['twaalfde'], ht: ['twaalf'] },
  { niveau: 2, zin: 'Bij de derde vraag had ik vier punten.', rt: ['derde'], ht: ['vier'] },
  { niveau: 2, zin: 'De trein vertrekt van het achtste spoor over vijf minuten.', rt: ['achtste'], ht: ['vijf'] },
  { niveau: 2, zin: 'Wij staan met zes kinderen op de tweede rij.', rt: ['tweede'], ht: ['zes'] },
  { niveau: 2, zin: 'Lisa eindigde als derde van de dertig lopers.', rt: ['derde'], ht: ['dertig'] },
  { niveau: 2, zin: 'In de tiende minuut scoorde Daan twee goals.', rt: ['tiende'], ht: ['twee'] },
  { niveau: 2, zin: 'Het elfde hoofdstuk is maar drie bladzijden lang.', rt: ['elfde'], ht: ['drie'] },
  { niveau: 2, zin: 'Ik heb het zevende level na negen pogingen gehaald.', rt: ['zevende'], ht: ['negen'] },
  { niveau: 2, zin: 'Op de vijftiende verdieping wonen twee katten.', rt: ['vijftiende'], ht: ['twee'] },
  { niveau: 2, zin: 'De eerste prijs is een fiets met zeven versnellingen.', rt: ['eerste'], ht: ['zeven'] },
  { niveau: 2, zin: 'Voor de negende keer las ik dit boek van vijftig bladzijden.', rt: ['negende'], ht: ['vijftig'] },

  /* ---------- Goud: meer telwoorden, soms geen hoofdtelwoord, en strikvragen ---------- */
  { niveau: 3, zin: 'De eerste twee leerlingen krijgen een prijs, de derde krijgt een boek.', rt: ['eerste', 'derde'], ht: ['twee'] },
  { niveau: 3, zin: 'Op de tweede en de vierde dag regende het drie uur lang.', rt: ['tweede', 'vierde'], ht: ['drie'] },
  { niveau: 3, zin: 'Van de twintig kinderen werd Tim zesde en Noor achtste.', rt: ['zesde', 'achtste'], ht: ['twintig'] },
  { niveau: 3, zin: 'Het tiende en het elfde hoofdstuk lees ik in twee dagen.', rt: ['tiende', 'elfde'], ht: ['twee'] },
  { niveau: 3, zin: 'Na vijf rondes staat Mila eerste en Sem tweede.', rt: ['eerste', 'tweede'], ht: ['vijf'] },
  { niveau: 3, zin: 'Bij het honderdste bezoek kregen de vier vrienden een taart.', rt: ['honderdste'], ht: ['vier'] },
  { niveau: 3, zin: 'Opa werd negentig en vierde zijn negentigste verjaardag.', rt: ['negentigste'], ht: ['negentig'], geen: ['vierde'] },
  { niveau: 3, zin: 'In de derde week lazen wij zes boeken en in de vijfde week acht.', rt: ['derde', 'vijfde'], ht: ['zes', 'acht'] },
  { niveau: 3, zin: 'Mijn broer zit in de tweede klas en mijn zus in de vierde.', rt: ['tweede', 'vierde'], ht: [] },
  { niveau: 3, zin: 'De twaalfde en de dertiende bladzijde ontbreken in mijn boek.', rt: ['twaalfde', 'dertiende'], ht: [] },
  { niveau: 3, zin: 'Twee meisjes en drie jongens eindigden op de eerste plaats.', rt: ['eerste'], ht: ['Twee', 'drie'] },
  { niveau: 3, zin: 'Op zijn achtste verjaardag kreeg Daan acht cadeaus.', rt: ['achtste'], ht: ['acht'] },
  { niveau: 3, zin: 'Vijf kinderen lazen het eerste deel en zes kinderen het tweede deel.', rt: ['eerste', 'tweede'], ht: ['Vijf', 'zes'] },
  { niveau: 3, zin: 'Wij vieren de twintigste verjaardag van de bieb met vijftig gasten.', rt: ['twintigste'], ht: ['vijftig'] },
  { niveau: 3, zin: 'Het eerste en het tweede antwoord zijn goed, het derde niet.', rt: ['eerste', 'tweede', 'derde'], ht: [] },
  { niveau: 3, zin: 'Sanne vierde haar elfde verjaardag met twaalf vriendinnen.', rt: ['elfde'], ht: ['twaalf'], geen: ['vierde'] },
];

/*
 * ============================================================
 *  WOORDSOORTEN (leesplek van Wanda Woordsoort)
 * ============================================================
 *  De 11 woordsoorten van de klassenkaart. Achter elk woord staat met een / de woordsoort:
 *    lw  lidwoord                  zn  zelfstandig naamwoord      bn  bijvoeglijk naamwoord
 *    ww  werkwoord                 hww hulpwerkwoord             vd  voltooid deelwoord
 *    vz  voorzetsel                vw  voegwoord                 sbn stoffelijk bijvoeglijk naamwoord
 *    tw  telwoord (hoofdtelwoord)  rtw rangtelwoord
 *  Een woord zonder / (bijv. ik, mijn, niet, gisteren) wordt nooit gevraagd.
 *  Let op: hebben/zijn/willen/kunnen/moeten zijn alleen een hulpwerkwoord als er nog een werkwoord bij hoort
 *  (ik heb/hww … gekocht/vd). Ik heb/ww een fiets = gewoon werkwoord.
 *  niveau 1 = alleen lw, zn, bn, ww, vz, tw · niveau 2 = alle 11 · niveau 3 = lange zinnen (Goud)
 * ============================================================
 */
export const WOORDSOORTEN = {
  lw: 'lidwoord', zn: 'zelfstandig naamwoord', bn: 'bijvoeglijk naamwoord', ww: 'werkwoord', hww: 'hulpwerkwoord',
  vd: 'voltooid deelwoord', vz: 'voorzetsel', vw: 'voegwoord', sbn: 'stoffelijk bijvoeglijk naamwoord', tw: 'telwoord', rtw: 'rangtelwoord',
};
/** Meervoud voor "Klik op alle …". */
export const WOORDSOORTEN_MEERVOUD = {
  lw: 'lidwoorden', zn: 'zelfstandige naamwoorden', bn: 'bijvoeglijke naamwoorden', ww: 'werkwoorden', hww: 'hulpwerkwoorden',
  vd: 'voltooide deelwoorden', vz: 'voorzetsels', vw: 'voegwoorden', sbn: 'stoffelijke bijvoeglijke naamwoorden', tw: 'telwoorden', rtw: 'rangtelwoorden',
};
export const WOORDSOORT_TIPS = {
  lw: 'Er zijn maar drie lidwoorden: de, het en een.',
  zn: 'Een zelfstandig naamwoord is een mens, dier, ding of naam. Je kunt er de, het of een voor zetten.',
  bn: 'Een bijvoeglijk naamwoord zegt hoe iets is: groot, rood, lief. Het past tussen het lidwoord en het zelfstandig naamwoord (de grote boom).',
  ww: 'Een werkwoord zegt wat iemand doet of wat er gebeurt. Is het geen hulpwerkwoord en geen voltooid deelwoord? Dan is het een werkwoord.',
  hww: 'Een hulpwerkwoord helpt een ander werkwoord: ik heb gefietst, zij wil zwemmen. Zonder ander werkwoord (ik heb een fiets) is het een gewoon werkwoord.',
  vd: 'Een voltooid deelwoord hoort bij hebben of zijn: (heb) gefietst, (is) gevallen, (heeft) gebroken. Het begint vaak met ge-.',
  vz: "Doe de doostest: kun je het woord voor 'de doos' zetten (op de doos, in de doos)? Dan is het een voorzetsel.",
  vw: 'Een voegwoord verbindt woorden of zinnen: en, maar, of, want, omdat, als, terwijl, dat, dus.',
  sbn: 'Een stoffelijk bijvoeglijk naamwoord zegt waarvan iets gemaakt is: houten, gouden, wollen, papieren. Het eindigt op -en.',
  tw: 'Een telwoord zegt hoeveel: twee, drie, tien, honderd.',
  rtw: 'Een rangtelwoord zegt welke plaats of beurt: eerste, tweede, derde.',
};

export const WOORDSOORT_ZINNEN = [
  /* ---------- niveau 1: lidwoord, zelfstandig naamwoord, bijvoeglijk naamwoord, werkwoord, voorzetsel, telwoord ---------- */
  { niveau: 1, zin: 'De/lw kleine/bn hond/zn rent/ww door/vz het/lw park/zn.' },
  { niveau: 1, zin: 'Een/lw rode/bn appel/zn ligt/ww op/vz de/lw tafel/zn.' },
  { niveau: 1, zin: 'Twee/tw vogels/zn zingen/ww in/vz de/lw boom/zn.' },
  { niveau: 1, zin: 'De/lw juf/zn leest/ww een/lw spannend/bn boek/zn.' },
  { niveau: 1, zin: 'Mijn kat/zn slaapt/ww onder/vz het/lw bed/zn.' },
  { niveau: 1, zin: 'Drie/tw kinderen/zn spelen/ww op/vz het/lw grote/bn plein/zn.' },
  { niveau: 1, zin: 'De/lw bakker/zn bakt/ww vers/bn brood/zn.' },
  { niveau: 1, zin: 'Het/lw meisje/zn draagt/ww een/lw gele/bn jas/zn.' },
  { niveau: 1, zin: 'Wij lopen/ww met/vz de/lw hond/zn naar/vz huis/zn.' },
  { niveau: 1, zin: 'Een/lw groene/bn kikker/zn springt/ww in/vz de/lw sloot/zn.' },
  { niveau: 1, zin: 'Vier/tw paarden/zn staan/ww in/vz de/lw wei/zn.' },
  { niveau: 1, zin: 'De/lw boer/zn melkt/ww de/lw koeien/zn in/vz de/lw stal/zn.' },
  { niveau: 1, zin: 'Het/lw kleine/bn konijn/zn eet/ww een/lw wortel/zn.' },
  { niveau: 1, zin: 'Opa/zn drinkt/ww warme/bn thee/zn bij/vz het/lw ontbijt/zn.' },
  { niveau: 1, zin: 'Zes/tw eendjes/zn zwemmen/ww achter/vz hun moeder/zn.' },
  { niveau: 1, zin: 'De/lw postbode/zn brengt/ww een/lw dik/bn pakket/zn.' },

  /* ---------- niveau 2: ook hulpwerkwoord, voltooid deelwoord, voegwoord, stoffelijk bn en rangtelwoord ---------- */
  { niveau: 2, zin: 'Ik heb/hww een/lw houten/sbn kist/zn gevonden/vd.' },
  { niveau: 2, zin: 'De/lw kinderen/zn zijn/hww naar/vz het/lw strand/zn gefietst/vd.' },
  { niveau: 2, zin: 'Oma/zn draagt/ww een/lw gouden/sbn ketting/zn en/vw een/lw zilveren/sbn ring/zn.' },
  { niveau: 2, zin: 'Tim/zn werd/ww eerste/rtw en/vw Noor/zn werd/ww tweede/rtw.' },
  { niveau: 2, zin: 'Mila/zn wil/hww een/lw wollen/sbn trui/zn kopen/ww.' },
  { niveau: 2, zin: 'De/lw derde/rtw les/zn begint/ww om/vz negen/tw uur/zn.' },
  { niveau: 2, zin: 'Papa/zn heeft/hww de/lw glazen/sbn vaas/zn gebroken/vd.' },
  { niveau: 2, zin: 'Ik ga/ww naar/vz bed/zn, want/vw ik ben/ww moe/bn.' },
  { niveau: 2, zin: 'De/lw stenen/sbn muur/zn is/hww gisteren omgevallen/vd.' },
  { niveau: 2, zin: 'Sem/zn kan/hww zwemmen/ww en/vw duiken/ww.' },
  { niveau: 2, zin: 'Na/vz de/lw tweede/rtw ronde/zn zijn/ww de/lw lopers/zn moe/bn.' },
  { niveau: 2, zin: 'Ik heb/hww zeven/tw papieren/sbn vliegtuigjes/zn gevouwen/vd.' },
  { niveau: 2, zin: 'De/lw leren/sbn bal/zn is/hww in/vz de/lw sloot/zn gevallen/vd.' },
  { niveau: 2, zin: 'Lotte/zn blijft/ww in/vz bed/zn omdat/vw ze ziek/bn is/ww.' },
  { niveau: 2, zin: 'De/lw eerste/rtw bezoekers/zn hebben/hww een/lw katoenen/sbn tas/zn gekregen/vd.' },
  { niveau: 2, zin: 'Wij moeten/hww vijf/tw sommen/zn maken/ww of/vw een/lw verhaal/zn schrijven/ww.' },

  /* ---------- niveau 3: lange zinnen met alles door elkaar (Goud) ---------- */
  { niveau: 3, zin: 'De/lw vier/tw vrolijke/bn kinderen/zn hebben/hww in/vz de/lw zomer/zn een/lw houten/sbn hut/zn gebouwd/vd.' },
  { niveau: 3, zin: 'Omdat/vw het/lw water/zn koud/bn was/ww, bleven/ww wij op/vz het/lw strand/zn.' },
  { niveau: 3, zin: 'Mijn zus/zn heeft/hww voor/vz de/lw derde/rtw keer/zn een/lw gouden/sbn medaille/zn gewonnen/vd.' },
  { niveau: 3, zin: 'De/lw kapitein/zn en/vw zijn twee/tw matrozen/zn varen/ww met/vz een/lw oud/bn schip/zn naar/vz het/lw eiland/zn.' },
  { niveau: 3, zin: 'Na/vz het/lw eten/zn moet/hww ik de/lw zilveren/sbn lepels/zn poetsen/ww.' },
  { niveau: 3, zin: 'De/lw juf/zn vertelde/ww dat/vw de/lw eerste/rtw bus/zn al vertrokken/vd was/hww.' },
  { niveau: 3, zin: 'Twaalf/tw kinderen/zn zongen/ww een/lw vrolijk/bn lied/zn, terwijl/vw de/lw meester/zn gitaar/zn speelde/ww.' },
  { niveau: 3, zin: 'In/vz de/lw stenen/sbn toren/zn woonde/ww vroeger een/lw rijke/bn koning/zn.' },
  { niveau: 3, zin: 'Ik had/hww mijn wollen/sbn sjaal/zn vergeten/vd, dus/vw ik had/ww koude/bn handen/zn.' },
  { niveau: 3, zin: 'Bij/vz de/lw tweede/rtw wedstrijd/zn hebben/hww wij drie/tw doelpunten/zn gescoord/vd.' },
  { niveau: 3, zin: 'Opa/zn heeft/ww een/lw grote/bn tuin/zn met/vz zes/tw hoge/bn bomen/zn.' },
  { niveau: 3, zin: 'De/lw katten/zn hebben/hww de/lw hele/bn nacht/zn op/vz het/lw zachte/bn kussen/zn geslapen/vd.' },
  { niveau: 3, zin: 'Als/vw de/lw zon/zn schijnt/ww, gaan/ww wij met/vz vijf/tw vrienden/zn naar/vz het/lw zwembad/zn.' },
  { niveau: 3, zin: 'De/lw nieuwe/bn leerling/zn is/hww in/vz de/lw eerste/rtw week/zn verdwaald/vd.' },
  { niveau: 3, zin: 'Tom/zn en/vw Lisa/zn hebben/hww een/lw papieren/sbn draak/zn gemaakt/vd.' },
  { niveau: 3, zin: 'De/lw honderd/tw gasten/zn aten/ww taart/zn, maar/vw de/lw bruid/zn at/ww alleen fruit/zn.' },
];
