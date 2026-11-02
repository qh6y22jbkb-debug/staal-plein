/*
 * ============================================================
 *  WERKWOORDENWERELD – herhalingsblok (Staal groep 7)
 * ============================================================
 *  De vijf kramen op het schoolplein. Leerkrachten: hier pas je alles aan.
 *
 *  Per kraam:
 *    WERKWOORD_KRAMEN  → naam, karakter, begroeting en uitleg (het gesprek bij de kraam)
 *    WERKWOORD_SPELLEN → de niveaus, tips en alle vragen van het minispel
 *
 *  Zo schrijf je een vraag:
 *    zin:   de zin; ___ (drie lage streepjes) is het gat dat het kind invult
 *    ww:    het hele werkwoord (staat tussen haakjes achter de zin)
 *    kies:  twee keuzes → het kind klikt (Brons). Zonder kies → het kind typt (Zilver).
 *    goed:  het goede antwoord. Meer goede antwoorden? Schrijf een lijstje: ['houd', 'hou']
 *    delen: (Goud) een vraag in stappen. Elk deel heeft zijn eigen kies/goed.
 *           Een deel zonder eigen zin vult het volgende ___ in de zin van de vraag in.
 *           Een deel met een eigen zin laat die zin zien.
 *    tip:   (mag weg) een eigen tip bij deze vraag. Anders komt de tip van het niveau.
 *    niveau: 1 = Brons, 2 = Zilver, 3 = Goud
 *  Hoofdletters maken bij het typen niet uit, een punt of uitroepteken erachter ook niet.
 *  Per ronde kiest het spel 8 vragen. Zet er per niveau minstens 8 in.
 * ============================================================
 */

export const WERKWOORD_TEKSTEN = {
  pleinTitel: 'Werkwoordenwereld',
  startTitel: 'Werkwoordenwereld',
  startOndertitel: 'Herhalingsblok Staal · Basisschool De Bunders · groep 7',
  startUitleg: 'Loop over het plein en praat met de karakters achter de kramen. Speel hun spel en verzamel 5 stempels! Een stempel krijg je als je bij een kraam 🥇 Goud haalt.',
  startVerder: 'Welkom terug! Je hebt al {aantal} van de 5 stempels.',
  stempelErbij: '🥇 Goud gehaald! Je krijgt een stempel op je stempelkaart!',
  stempelNog: 'Nog {aantal} te gaan, dan krijg je een stempel!',
  feestTekst: 'Hoera! Je hebt alle 5 stempels! Feest in de Werkwoordenwereld!',
  oorkondeTitel: 'Werkwoordenkampioen!',
  oorkondeTekst: 'Jij hebt bij alle vijf de kramen van de Werkwoordenwereld Goud gehaald. Je bent een echte werkwoordenkampioen!',
};

/** Zo heten de niveaus in de Werkwoordenwereld. */
export const WERKWOORD_NIVEAUS = ['🥉 Brons', '🥈 Zilver', '🥇 Goud'];

export const WERKWOORD_KRAMEN = [
  {
    id: 'sterk',
    kraamNaam: 'Dirk de Drummer',
    karakterNaam: 'Dirk de Drummer',
    icoon: '🥁',
    leerdoel: 'sterke werkwoorden',
    begroeting: 'Yo! Ik ben Dirk de Drummer. Boem, de klank verandert! Bij mij oefen je sterke werkwoorden.',
    uitleg: [
      {
        tekst: 'Bij een sterk werkwoord verandert de klank in de verleden tijd. Je plakt er geen -te of -de achter.',
        voorbeeld: 'lopen → ik **liep**<br>zingen → ik **zong**',
      },
      {
        tekst: 'Het voltooid deelwoord eindigt meestal op -en.',
        voorbeeld: 'lopen → ik ben ge**lopen**<br>zingen → ik heb ge**zongen**',
      },
      {
        tekst: 'Let op! Bij vinden hoort de d gewoon bij het woord: ik vond. Bij wij, jullie en zij komt er -en achter.',
        voorbeeld: 'ik **vond** – wij **vonden**<br>ik **liep** – wij **liepen**',
      },
    ],
  },
  {
    id: 'tegenwoordig',
    kraamNaam: "Tante Tessa's Taarten",
    karakterNaam: 'Tante Tessa',
    icoon: '🎂',
    leerdoel: 'zwakke werkwoorden – tegenwoordige tijd',
    begroeting: 'Hallo schat! Ik ben Tante Tessa. Vandaag bak ik, en vandaag bakt Tessa. Bij mij oefen je de tegenwoordige tijd!',
    uitleg: [
      {
        tekst: 'De ik-vorm is de stam. Bij jij, hij, zij en het komt er een t bij.',
        voorbeeld: 'ik **werk** – hij werk**t**',
      },
      {
        tekst: 'Eindigt de stam al op een t? Dan komt er geen extra t bij. Eindigt de stam op een d? Dan komt er wél een t bij.',
        voorbeeld: 'zetten → hij **zet**<br>landen → hij lan**dt**',
      },
      {
        tekst: 'Staat jij (of je) achter het werkwoord? Dan komt er géén t achter.',
        voorbeeld: 'Jij werk**t** hard.<br>**Werk** jij hard?',
      },
    ],
  },
  {
    id: 'verleden',
    kraamNaam: 'Kapitein Kofschip',
    karakterNaam: 'Kapitein Kofschip',
    icoon: '🏴‍☠️',
    leerdoel: 'zwakke werkwoorden – verleden tijd',
    begroeting: "Ahoi, matroos! Ik ben Kapitein Kofschip. Bij mij oefen je de verleden tijd met 't kofschip-x!",
    uitleg: [
      {
        tekst: "Haal -en van het hele werkwoord af. Zit de laatste letter in 't kofschip-x (t, k, f, s, ch, p, x)? Dan schrijf je -te(n). Anders -de(n).",
        voorbeeld: 'werken → werk → **k** → ik werk**te**<br>bouwen → bouw → **w** → ik bouw**de**',
      },
      {
        tekst: 'Let op de dubbele t of d! Eindigt de ik-vorm al op een t of d? Dan komt er toch -te of -de achter.',
        voorbeeld: 'planten → ik plan**tte**<br>branden → ik bran**dde**',
      },
      {
        tekst: 'Bij be-, ge-, ver-, her- en ont- werkt het precies hetzelfde. Bij wij, jullie en zij komt er een n achter.',
        voorbeeld: 'verhuizen → verhuiz → **z** → wij verhuis**den**',
      },
    ],
  },
  {
    id: 'voltooid',
    kraamNaam: 'Vera Voorvoegsel',
    karakterNaam: 'Vera Voorvoegsel',
    icoon: '🔤',
    leerdoel: 'voltooide tijd',
    begroeting: 'Goedendag! Ik ben Vera Voorvoegsel. Ik heb al heel wat werkwoorden verzameld. Bij mij oefen je de voltooide tijd!',
    uitleg: [
      {
        tekst: 'De voltooide tijd maak je met hebben of zijn + een voltooid deelwoord.',
        voorbeeld: 'ik **heb** ge**fietst**<br>ik **ben** ver**huisd**',
      },
      {
        tekst: "Bij zwakke werkwoorden: ge + stam + t of d. Gebruik 't kofschip-x. Twijfel je? Maak het woord langer.",
        voorbeeld: 'gefiets**t** (de **s** zit in kofschip-x)<br>de verhuisde kast → verhuis**d**',
      },
      {
        tekst: 'Begint het werkwoord met be-, ge-, ver-, her- of ont-? Dan komt er geen extra ge- voor. En eindigt de stam al op een t of d? Dan komt er niets meer achter.',
        voorbeeld: '**be**taald, **ont**dekt, **ver**huisd<br>planten → geplant (niet geplantt)',
      },
    ],
  },
  {
    id: 'gebiedend',
    kraamNaam: 'Coach Cor',
    karakterNaam: 'Coach Cor',
    icoon: '📣',
    leerdoel: 'gebiedende wijs',
    begroeting: 'Fluit! Ik ben Coach Cor. Ik geef de hele dag opdrachten. Bij mij oefen je de gebiedende wijs!',
    uitleg: [
      {
        tekst: 'Met de gebiedende wijs geef je een opdracht. Je gebruikt de stam (de ik-vorm), zonder t.',
        voorbeeld: '**Loop** door!<br>**Pak** je jas!<br>**Word** wakker!',
      },
      {
        tekst: "Let op: bij zijn wordt het 'Wees'.",
        voorbeeld: '**Wees** stil!',
      },
      {
        tekst: 'Een gewone zin of een vraag is geen gebiedende wijs.',
        voorbeeld: 'Hij word**t** wakker. → geen opdracht<br>**Word** wakker! → opdracht',
      },
    ],
  },
];

/* ---------- Hulpjes om vragen kort op te schrijven (hoef je niet aan te passen) ---------- */

/** Goud bij Dirk: sterk of zwak? + verleden tijd (ik) + voltooid deelwoord. */
function sterkOfZwak(ww, soort, ik, deelwoord, hulp = 'heb') {
  return {
    niveau: 3,
    ww,
    delen: [
      { zin: `Is **${ww}** een sterk of een zwak werkwoord?`, kies: ['sterk', 'zwak'], goed: soort },
      { zin: 'Gisteren ___ ik.', goed: ik },
      { zin: `Ik ${hulp} ___.`, goed: deelwoord },
    ],
    uitleg: `${ww} is ${soort}: ik <mark>${ik}</mark> – ik ${hulp} <mark>${deelwoord}</mark>`,
  };
}

/** Goud bij Vera: hulpwerkwoord kiezen + voltooid deelwoord typen. */
function hulpEnDeelwoord(zin, ww, keuzes, hulp, deelwoord) {
  return { niveau: 3, zin, ww, delen: [{ kies: keuzes, goed: hulp }, { goed: deelwoord }] };
}

/** Goud bij Coach Cor: is dit een gebiedende wijs? */
function herken(zin, isOpdracht) {
  return {
    niveau: 3,
    zin,
    kies: ['gebiedende wijs', 'geen gebiedende wijs'],
    goed: isOpdracht ? 'gebiedende wijs' : 'geen gebiedende wijs',
  };
}

export const WERKWOORD_SPELLEN = {
  /* ---------- 1. Sterke werkwoorden (Dirk de Drummer) ---------- */
  sterk: {
    titel: 'Sterke werkwoorden',
    opdracht: 'Kies de goede verleden tijd.',
    opdrachtTypen: 'Typ de verleden tijd van het werkwoord.',
    opdrachtGoud: 'Sterk of zwak? Typ daarna de verleden tijd en het voltooid deelwoord.',
    niveaus: ['Kies uit 2 woorden', 'Zelf typen, ook bij wij', 'Sterk of zwak + 2 vormen'],
    tips: [
      'Bij een sterk werkwoord verandert de klank. Er komt geen -te of -de achter: lopen → liep.',
      'Wij, jullie of zij? Dan komt er -en achter: wij liepen, wij zongen. Let op: zwemmen → zwom, wij zwommen.',
      'Verandert de klank? Dan is het sterk (zong). Komt er -te of -de achter? Dan is het zwak (werkte). Het voltooid deelwoord van een sterk werkwoord eindigt meestal op -en.',
    ],
    vragen: [
      // Brons: kies uit 2
      { niveau: 1, zin: 'Gisteren ___ ik naar school.', ww: 'lopen', kies: ['liep', 'loopte'], goed: 'liep' },
      { niveau: 1, zin: 'Op het feest ___ Sanne een liedje.', ww: 'zingen', kies: ['zingde', 'zong'], goed: 'zong' },
      { niveau: 1, zin: 'Papa ___ in een rode auto.', ww: 'rijden', kies: ['reed', 'rijdde'], goed: 'reed' },
      { niveau: 1, zin: 'Ik ___ naar de film.', ww: 'kijken', kies: ['kijkte', 'keek'], goed: 'keek' },
      { niveau: 1, zin: 'De juf ___ een brief.', ww: 'schrijven', kies: ['schreef', 'schrijfde'], goed: 'schreef' },
      { niveau: 1, zin: 'Ik ___ een euro op straat.', ww: 'vinden', kies: ['vond', 'vont'], goed: 'vond', tip: 'De d hoort bij vinden: ik vond.' },
      { niveau: 1, zin: 'Tim ___ in het meer.', ww: 'zwemmen', kies: ['zwemde', 'zwom'], goed: 'zwom' },
      { niveau: 1, zin: 'Oma ___ een koekje.', ww: 'nemen', kies: ['nam', 'neemde'], goed: 'nam' },
      { niveau: 1, zin: 'Ik ___ een spannend boek.', ww: 'lezen', kies: ['las', 'leesde'], goed: 'las' },
      { niveau: 1, zin: 'Hij ___ een glas melk.', ww: 'drinken', kies: ['drinkte', 'dronk'], goed: 'dronk' },
      { niveau: 1, zin: 'Ik ___ mijn gymtas.', ww: 'vergeten', kies: ['vergat', 'vergeette'], goed: 'vergat' },
      { niveau: 1, zin: 'De les ___ om half negen.', ww: 'beginnen', kies: ['beginde', 'begon'], goed: 'begon' },
      // Zilver: zelf typen, ook meervoud
      { niveau: 2, zin: 'Gisteren ___ wij naar het park.', ww: 'lopen', goed: 'liepen' },
      { niveau: 2, zin: 'Vorige week ___ jullie in het koor.', ww: 'zingen', goed: 'zongen' },
      { niveau: 2, zin: 'De kinderen ___ op de fiets naar school.', ww: 'rijden', goed: 'reden' },
      { niveau: 2, zin: 'Wij ___ samen naar de sterren.', ww: 'kijken', goed: 'keken' },
      { niveau: 2, zin: 'Ik ___ mijn naam op het bord.', ww: 'schrijven', goed: 'schreef' },
      { niveau: 2, zin: 'Ik ___ mijn sleutel onder de bank.', ww: 'vinden', goed: 'vond', tip: 'De d hoort bij vinden: ik vond.' },
      { niveau: 2, zin: 'Mijn broers ___ tien baantjes.', ww: 'zwemmen', goed: 'zwommen' },
      { niveau: 2, zin: 'Wij ___ de bus naar huis.', ww: 'nemen', goed: 'namen' },
      { niveau: 2, zin: 'Lisa ___ een grappige strip.', ww: 'lezen', goed: 'las' },
      { niveau: 2, zin: 'De paarden ___ uit de emmer.', ww: 'drinken', goed: 'dronken' },
      { niveau: 2, zin: 'Jullie ___ je huiswerk.', ww: 'vergeten', goed: 'vergaten' },
      { niveau: 2, zin: 'De voorstelling ___ om zeven uur.', ww: 'beginnen', goed: 'begon' },
      { niveau: 2, zin: 'De kinderen ___ heerlijk lang.', ww: 'slapen', goed: 'sliepen' },
      { niveau: 2, zin: 'Wij ___ de hele dag binnen.', ww: 'blijven', goed: 'bleven' },
      // Goud: sterk of zwak + verleden tijd + voltooid deelwoord
      sterkOfZwak('zingen', 'sterk', 'zong', 'gezongen'),
      sterkOfZwak('schrijven', 'sterk', 'schreef', 'geschreven'),
      sterkOfZwak('drinken', 'sterk', 'dronk', 'gedronken'),
      sterkOfZwak('vinden', 'sterk', 'vond', 'gevonden'),
      sterkOfZwak('nemen', 'sterk', 'nam', 'genomen'),
      sterkOfZwak('lezen', 'sterk', 'las', 'gelezen'),
      sterkOfZwak('helpen', 'sterk', 'hielp', 'geholpen'),
      sterkOfZwak('geven', 'sterk', 'gaf', 'gegeven'),
      sterkOfZwak('eten', 'sterk', 'at', 'gegeten'),
      sterkOfZwak('beginnen', 'sterk', 'begon', 'begonnen', 'ben'),
      sterkOfZwak('werken', 'zwak', 'werkte', 'gewerkt'),
      sterkOfZwak('fietsen', 'zwak', 'fietste', 'gefietst'),
      sterkOfZwak('spelen', 'zwak', 'speelde', 'gespeeld'),
      sterkOfZwak('maken', 'zwak', 'maakte', 'gemaakt'),
      sterkOfZwak('wonen', 'zwak', 'woonde', 'gewoond'),
      sterkOfZwak('dansen', 'zwak', 'danste', 'gedanst'),
    ],
  },

  /* ---------- 2. Zwakke werkwoorden – tegenwoordige tijd (Tante Tessa) ---------- */
  tegenwoordig: {
    titel: 'Tegenwoordige tijd',
    opdracht: 'Kies de goede vorm van het werkwoord.',
    opdrachtTypen: 'Typ de goede vorm van het werkwoord.',
    niveaus: ['Ik-vorm of hij-vorm', 'Stam op d of t', 'Werk jij? Wordt hij?'],
    tips: [
      'Ik? Dan schrijf je alleen de stam: ik werk. Jij, hij, zij of het? Dan komt er een t bij: hij werkt.',
      'Eindigt de stam al op een t? Dan geen extra t: hij zet. Eindigt de stam op een d? Dan wél een t erbij: hij landt.',
      'Staat jij of je achter het werkwoord? Dan géén t: werk jij? Bij hij, zij of het komt er wel een t bij: werkt hij?',
    ],
    vragen: [
      // Brons: ik-vorm of hij-vorm
      { niveau: 1, zin: 'Ik ___ in de tuin.', ww: 'werken', kies: ['werk', 'werkt'], goed: 'werk' },
      { niveau: 1, zin: 'Hij ___ in de tuin.', ww: 'werken', kies: ['werk', 'werkt'], goed: 'werkt' },
      { niveau: 1, zin: 'Ik ___ een taart.', ww: 'bakken', kies: ['bak', 'bakt'], goed: 'bak' },
      { niveau: 1, zin: 'Zij ___ een taart.', ww: 'bakken', kies: ['bak', 'bakt'], goed: 'bakt' },
      { niveau: 1, zin: 'Jij ___ heel hard.', ww: 'fietsen', kies: ['fiets', 'fietst'], goed: 'fietst' },
      { niveau: 1, zin: 'Ik ___ naar huis.', ww: 'lopen', kies: ['loop', 'loopt'], goed: 'loop' },
      { niveau: 1, zin: 'Het meisje ___ een liedje.', ww: 'zingen', kies: ['zing', 'zingt'], goed: 'zingt' },
      { niveau: 1, zin: 'Hij ___ een boek.', ww: 'lezen', kies: ['lees', 'leest'], goed: 'leest' },
      { niveau: 1, zin: 'Ik ___ mijn moeder.', ww: 'bellen', kies: ['bel', 'belt'], goed: 'bel' },
      { niveau: 1, zin: 'Jij ___ heel mooi.', ww: 'tekenen', kies: ['teken', 'tekent'], goed: 'tekent' },
      { niveau: 1, zin: 'Ik ___ graag.', ww: 'dansen', kies: ['dans', 'danst'], goed: 'dans' },
      { niveau: 1, zin: 'Het konijn ___ in het gras.', ww: 'springen', kies: ['spring', 'springt'], goed: 'springt' },
      // Zilver: stam op d of t
      { niveau: 2, zin: 'Het vliegtuig ___ op Schiphol.', ww: 'landen', goed: 'landt' },
      { niveau: 2, zin: 'Hij ___ heel netjes.', ww: 'antwoorden', goed: 'antwoordt' },
      { niveau: 2, zin: 'Zij ___ de vaas op tafel.', ww: 'zetten', goed: 'zet' },
      { niveau: 2, zin: 'Mijn opa ___ graag over vroeger.', ww: 'praten', goed: 'praat' },
      { niveau: 2, zin: 'Het vuur ___ fel.', ww: 'branden', goed: 'brandt' },
      { niveau: 2, zin: 'De juf ___ op de bus.', ww: 'wachten', goed: 'wacht' },
      { niveau: 2, zin: 'Hij ___ de bal goed vast.', ww: 'houden', goed: 'houdt' },
      { niveau: 2, zin: 'Het meisje ___ een cadeautje.', ww: 'vinden', goed: 'vindt' },
      { niveau: 2, zin: 'Mijn broer ___ elke dag paard.', ww: 'rijden', goed: 'rijdt' },
      { niveau: 2, zin: 'De kat ___ een muis.', ww: 'eten', goed: 'eet' },
      { niveau: 2, zin: 'Ik ___ in de zon.', ww: 'zitten', goed: 'zit' },
      { niveau: 2, zin: 'Ik ___ morgen jarig.', ww: 'worden', goed: 'word' },
      { niveau: 2, zin: 'Hij ___ morgen tien jaar.', ww: 'worden', goed: 'wordt' },
      { niveau: 2, zin: 'Ik ___ de deur open.', ww: 'houden', goed: ['houd', 'hou'] },
      // Goud: inversie en lastige gevallen
      { niveau: 3, zin: '___ jij morgen in de winkel?', ww: 'werken', goed: 'werk' },
      { niveau: 3, zin: '___ hij morgen in de winkel?', ww: 'werken', goed: 'werkt' },
      { niveau: 3, zin: 'Wanneer ___ jij elf?', ww: 'worden', goed: 'word' },
      { niveau: 3, zin: 'Wanneer ___ hij elf?', ww: 'worden', goed: 'wordt' },
      { niveau: 3, zin: '___ jij een spannend boek?', ww: 'lezen', goed: 'lees' },
      { niveau: 3, zin: 'Morgen ___ jij de tafel.', ww: 'dekken', goed: 'dek' },
      { niveau: 3, zin: 'Morgen ___ hij de tafel.', ww: 'dekken', goed: 'dekt' },
      { niveau: 3, zin: 'Waar ___ jij?', ww: 'wonen', goed: 'woon' },
      { niveau: 3, zin: 'Waar ___ je oma?', ww: 'wonen', goed: 'woont', tip: 'Je oma is niet jij! Bij je oma (zij) komt er een t bij.' },
      { niveau: 3, zin: 'Hoe laat ___ jij thuis?', ww: 'komen', goed: 'kom' },
      { niveau: 3, zin: '___ jij het antwoord?', ww: 'vinden', goed: 'vind' },
      { niveau: 3, zin: '___ hij het antwoord?', ww: 'vinden', goed: 'vindt' },
      { niveau: 3, zin: 'Straks ___ jij de bal vast.', ww: 'houden', goed: ['houd', 'hou'] },
      { niveau: 3, zin: 'Wanneer ___ het vliegtuig?', ww: 'landen', goed: 'landt' },
      { niveau: 3, zin: '___ je broer ook mee?', ww: 'fietsen', goed: 'fietst', tip: 'Je broer is niet jij! Bij je broer (hij) komt er een t bij.' },
      { niveau: 3, zin: 'Vandaag ___ jij de hele dag.', ww: 'praten', goed: 'praat', tip: 'De stam van praten is praat. Die eindigt al op een t, dus er komt niets meer bij.' },
    ],
  },

  /* ---------- 3. Zwakke werkwoorden – verleden tijd (Kapitein Kofschip) ---------- */
  verleden: {
    titel: 'Verleden tijd',
    opdracht: "Kies -te of -de. Gebruik 't kofschip-x!",
    opdrachtTypen: 'Typ het werkwoord in de verleden tijd.',
    niveaus: ['-te of -de kiezen', 'Zelf typen, ook tt en dd', 'Met be-, ge-, ver-, her-, ont-'],
    tips: [
      "Haal -en van het hele werkwoord af. Zit de laatste letter in 't kofschip-x (t, k, f, s, ch, p, x)? Dan -te, anders -de.",
      'Eindigt de ik-vorm al op een t of d? Dan komt er toch -te of -de achter: plantte, brandde. Bij wij, jullie en zij: -ten of -den.',
      'Bij be-, ge-, ver-, her- en ont- werkt het precies hetzelfde. Kijk naar het hele werkwoord zonder -en: verhuizen → verhuiz → z → -de.',
    ],
    vragen: [
      // Brons: -te of -de kiezen
      { niveau: 1, zin: 'Gisteren werk___ ik in de tuin.', ww: 'werken', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren fiets___ ik naar school.', ww: 'fietsen', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren bouw___ ik een hut.', ww: 'bouwen', kies: ['te', 'de'], goed: 'de' },
      { niveau: 1, zin: 'Gisteren speel___ ik buiten.', ww: 'spelen', kies: ['te', 'de'], goed: 'de' },
      { niveau: 1, zin: 'Gisteren maak___ ik een tekening.', ww: 'maken', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Vroeger woon___ ik in Breda.', ww: 'wonen', kies: ['te', 'de'], goed: 'de' },
      { niveau: 1, zin: 'Gisteren poets___ ik mijn tanden.', ww: 'poetsen', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren huil___ de baby de hele nacht.', ww: 'huilen', kies: ['te', 'de'], goed: 'de' },
      { niveau: 1, zin: 'Gisteren lach___ iedereen om de grap.', ww: 'lachen', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren kook___ mama pannenkoeken.', ww: 'koken', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren schilder___ ik een boot.', ww: 'schilderen', kies: ['te', 'de'], goed: 'de' },
      { niveau: 1, zin: 'Gisteren stop___ de bus bij school.', ww: 'stoppen', kies: ['te', 'de'], goed: 'te' },
      { niveau: 1, zin: 'Gisteren regen___ het de hele dag.', ww: 'regenen', kies: ['te', 'de'], goed: 'de' },
      // Zilver: zelf typen, ook dubbel t en d
      { niveau: 2, zin: 'Gisteren ___ ik een boom.', ww: 'planten', goed: 'plantte' },
      { niveau: 2, zin: 'Het kampvuur ___ de hele nacht.', ww: 'branden', goed: 'brandde' },
      { niveau: 2, zin: 'Wij ___ naar de stad.', ww: 'fietsen', goed: 'fietsten' },
      { niveau: 2, zin: 'Ik ___ lang op de bus.', ww: 'wachten', goed: 'wachtte' },
      { niveau: 2, zin: 'Het vliegtuig ___ precies op tijd.', ww: 'landen', goed: 'landde' },
      { niveau: 2, zin: 'Mama ___ lekkere soep.', ww: 'koken', goed: 'kookte' },
      { niveau: 2, zin: 'De kinderen ___ de hele les.', ww: 'praten', goed: 'praatten' },
      { niveau: 2, zin: 'Ik ___ oma een kaart.', ww: 'sturen', goed: 'stuurde' },
      { niveau: 2, zin: 'Opa ___ een vogelhuisje.', ww: 'bouwen', goed: 'bouwde' },
      { niveau: 2, zin: 'Jullie ___ de hele middag.', ww: 'voetballen', goed: 'voetbalden' },
      { niveau: 2, zin: 'Hij ___ de bal heel ver weg.', ww: 'schoppen', goed: 'schopte' },
      { niveau: 2, zin: 'Ik ___ de post uit de bus.', ww: 'halen', goed: 'haalde' },
      { niveau: 2, zin: 'De kinderen ___ een tent.', ww: 'zetten', goed: 'zetten', tip: 'zetten → zet → t → ik zette. Bij wij, jullie en zij: zetten.' },
      // Goud: met voorvoegsels en meervoud
      { niveau: 3, zin: 'Wij ___ de boom naar de tuin.', ww: 'verplanten', goed: 'verplantten' },
      { niveau: 3, zin: 'Het papier ___ in de kachel.', ww: 'verbranden', goed: 'verbrandde' },
      { niveau: 3, zin: 'De kinderen ___ het lied.', ww: 'herhalen', goed: 'herhaalden' },
      { niveau: 3, zin: 'Ik ___ de rekening.', ww: 'betalen', goed: 'betaalde' },
      { niveau: 3, zin: 'De piraten ___ een schateiland.', ww: 'ontdekken', goed: 'ontdekten' },
      { niveau: 3, zin: 'Wij ___ naar Utrecht.', ww: 'verhuizen', goed: 'verhuisden' },
      { niveau: 3, zin: 'Het ___ gisteren na school.', ww: 'gebeuren', goed: 'gebeurde' },
      { niveau: 3, zin: 'Jullie ___ de klas.', ww: 'versieren', goed: 'versierden' },
      { niveau: 3, zin: 'Zij ___ het cadeau.', ww: 'beloven', goed: 'beloofde', tip: 'beloven → belov → de v zit niet in kofschip-x → -de. Je schrijft wel een f: beloofde.' },
      { niveau: 3, zin: 'De juf ___ de toetsen.', ww: 'verbeteren', goed: 'verbeterde' },
      { niveau: 3, zin: 'Wij ___ een spannend avontuur.', ww: 'beleven', goed: 'beleefden', tip: 'beleven → belev → de v zit niet in kofschip-x → -den. Je schrijft wel een f: beleefden.' },
      { niveau: 3, zin: 'Hij ___ de zieke vogel.', ww: 'verzorgen', goed: 'verzorgde' },
      { niveau: 3, zin: 'De dieven ___ door het raam.', ww: 'ontsnappen', goed: 'ontsnapten' },
      { niveau: 3, zin: 'Ik ___ mijn fiets zelf.', ww: 'repareren', goed: 'repareerde' },
    ],
  },

  /* ---------- 4. Voltooide tijd (Vera Voorvoegsel) ---------- */
  voltooid: {
    titel: 'Voltooide tijd',
    opdracht: 'Kies het goede voltooid deelwoord.',
    opdrachtTypen: 'Typ het voltooid deelwoord.',
    opdrachtGoud: 'Kies hebben of zijn. Typ daarna het voltooid deelwoord.',
    niveaus: ['Eindigt het op t of d?', 'Zelf typen in een zin', 'Hebben of zijn + deelwoord'],
    tips: [
      "Gebruik 't kofschip-x: gefiets**t**, gespeel**d**. Twijfel je? Maak het woord langer: de gespeelde wedstrijd → gespeeld.",
      'Ge + stam + t of d. Begint het werkwoord met be-, ge-, ver-, her- of ont-? Dan geen extra ge-: betaald, ontdekt. Sterke werkwoorden eindigen meestal op -en: gelopen.',
      'Gaat het over een verandering of een plek waar je heen gaat? Vaak zijn: ik ben verhuisd, ik ben gevallen. Anders meestal hebben: ik heb gefietst.',
    ],
    vragen: [
      // Brons: kies uit 2
      { niveau: 1, zin: 'Ik heb de hele dag ___.', ww: 'fietsen', kies: ['gefietst', 'gefietsd'], goed: 'gefietst' },
      { niveau: 1, zin: 'Wij hebben buiten ___.', ww: 'spelen', kies: ['gespeelt', 'gespeeld'], goed: 'gespeeld' },
      { niveau: 1, zin: 'Opa heeft een boom ___.', ww: 'planten', kies: ['geplant', 'geplantt'], goed: 'geplant', tip: 'De stam plant eindigt al op een t. Er komt niets meer achter: geplant.' },
      { niveau: 1, zin: 'De kaars heeft lang ___.', ww: 'branden', kies: ['gebrandt', 'gebrand'], goed: 'gebrand', tip: 'De stam brand eindigt al op een d. Er komt niets meer achter: gebrand.' },
      { niveau: 1, zin: 'Papa heeft hard ___.', ww: 'werken', kies: ['gewerkt', 'gewerkd'], goed: 'gewerkt' },
      { niveau: 1, zin: 'Wij hebben in Breda ___.', ww: 'wonen', kies: ['gewoont', 'gewoond'], goed: 'gewoond' },
      { niveau: 1, zin: 'Mama heeft de boodschappen ___.', ww: 'betalen', kies: ['betaald', 'betaalt'], goed: 'betaald' },
      { niveau: 1, zin: 'De kinderen hebben een schat ___.', ww: 'ontdekken', kies: ['ontdekd', 'ontdekt'], goed: 'ontdekt' },
      { niveau: 1, zin: 'Wij zijn vorig jaar ___.', ww: 'verhuizen', kies: ['verhuisd', 'verhuist'], goed: 'verhuisd', tip: 'Maak het woord langer: de verhuisde kast. Je hoort een d, dus verhuisd.' },
      { niveau: 1, zin: 'De juf heeft de vraag ___.', ww: 'herhalen', kies: ['herhaalt', 'herhaald'], goed: 'herhaald' },
      { niveau: 1, zin: 'Wat is er ___?', ww: 'gebeuren', kies: ['gebeurd', 'gebeurt'], goed: 'gebeurd' },
      { niveau: 1, zin: 'Ik heb een rondje ___.', ww: 'lopen', kies: ['gelopen', 'geloopt'], goed: 'gelopen' },
      { niveau: 1, zin: 'Het koor heeft prachtig ___.', ww: 'zingen', kies: ['gezingd', 'gezongen'], goed: 'gezongen' },
      // Zilver: zelf typen in een zin
      { niveau: 2, zin: 'Ik heb een uur ___.', ww: 'fietsen', goed: 'gefietst' },
      { niveau: 2, zin: 'Wij hebben verstoppertje ___.', ww: 'spelen', goed: 'gespeeld' },
      { niveau: 2, zin: 'Wij hebben tulpen ___.', ww: 'planten', goed: 'geplant' },
      { niveau: 2, zin: 'Het kampvuur heeft de hele nacht ___.', ww: 'branden', goed: 'gebrand' },
      { niveau: 2, zin: 'De bakker heeft heel vroeg ___.', ww: 'werken', goed: 'gewerkt' },
      { niveau: 2, zin: 'Mijn tante heeft in Spanje ___.', ww: 'wonen', goed: 'gewoond' },
      { niveau: 2, zin: 'Heb jij de ijsjes al ___?', ww: 'betalen', goed: 'betaald' },
      { niveau: 2, zin: 'Wij hebben een geheime gang ___.', ww: 'ontdekken', goed: 'ontdekt' },
      { niveau: 2, zin: 'De buren zijn naar Gouda ___.', ww: 'verhuizen', goed: 'verhuisd' },
      { niveau: 2, zin: 'Meester heeft de uitleg ___.', ww: 'herhalen', goed: 'herhaald' },
      { niveau: 2, zin: 'Er is iets geks ___.', ww: 'gebeuren', goed: 'gebeurd' },
      { niveau: 2, zin: 'Het oude papier is ___.', ww: 'verbranden', goed: 'verbrand' },
      { niveau: 2, zin: 'Wij hebben een liedje ___.', ww: 'zingen', goed: 'gezongen' },
      // Goud: hulpwerkwoord + voltooid deelwoord
      hulpEnDeelwoord('Vorig jaar ___ wij ___.', 'verhuizen', ['hebben', 'zijn'], 'zijn', 'verhuisd'),
      hulpEnDeelwoord('Ik ___ naar school ___.', 'lopen', ['heb', 'ben'], 'ben', 'gelopen'),
      hulpEnDeelwoord('Wij ___ een lied ___.', 'zingen', ['hebben', 'zijn'], 'hebben', 'gezongen'),
      hulpEnDeelwoord('Ik ___ de hele middag ___.', 'fietsen', ['heb', 'ben'], 'heb', 'gefietst'),
      hulpEnDeelwoord('Tim ___ van zijn fiets ___.', 'vallen', ['heeft', 'is'], 'is', 'gevallen'),
      hulpEnDeelwoord('Mama ___ de taart ___.', 'betalen', ['heeft', 'is'], 'heeft', 'betaald'),
      hulpEnDeelwoord('De kinderen ___ een schat ___.', 'ontdekken', ['hebben', 'zijn'], 'hebben', 'ontdekt'),
      hulpEnDeelwoord('Wat ___ er ___?', 'gebeuren', ['heeft', 'is'], 'is', 'gebeurd'),
      hulpEnDeelwoord('Oma ___ op bezoek ___.', 'komen', ['heeft', 'is'], 'is', 'gekomen'),
      hulpEnDeelwoord('Wij ___ bloemen ___.', 'planten', ['hebben', 'zijn'], 'hebben', 'geplant'),
      hulpEnDeelwoord('Het hout ___ helemaal ___.', 'verbranden', ['heeft', 'is'], 'is', 'verbrand'),
      hulpEnDeelwoord('De juf ___ de som ___.', 'herhalen', ['heeft', 'is'], 'heeft', 'herhaald'),
      hulpEnDeelwoord('Ik ___ een brief ___.', 'schrijven', ['heb', 'ben'], 'heb', 'geschreven'),
      hulpEnDeelwoord('Wij ___ lekker thuis ___.', 'blijven', ['hebben', 'zijn'], 'zijn', 'gebleven'),
      hulpEnDeelwoord('Papa ___ in de tuin ___.', 'werken', ['heeft', 'is'], 'heeft', 'gewerkt'),
      hulpEnDeelwoord('De film ___ al ___.', 'beginnen', ['heeft', 'is'], 'is', 'begonnen'),
    ],
  },

  /* ---------- 5. Gebiedende wijs (Coach Cor) ---------- */
  gebiedend: {
    titel: 'Gebiedende wijs',
    opdracht: 'Kies de goede opdracht.',
    opdrachtTypen: 'Typ het werkwoord in de gebiedende wijs.',
    opdrachtGoud: 'Is dit een opdracht (gebiedende wijs) of niet?',
    niveaus: ['Kies uit 2 woorden', 'Zelf typen', 'Opdracht of niet?'],
    tips: [
      'Bij een opdracht gebruik je de stam (de ik-vorm), zonder t: Loop door! Word wakker!',
      "Neem de ik-vorm: ik loop → Loop! ik word → Word! Let op: bij zijn wordt het 'Wees'.",
      'Een opdracht begint met de stam en heeft vaak een uitroepteken: Word wakker! Een gewone zin (Hij wordt wakker.) of een vraag is geen gebiedende wijs.',
    ],
    vragen: [
      // Brons: kies uit 2
      { niveau: 1, zin: '___ door!', ww: 'lopen', kies: ['Loop', 'Loopt'], goed: 'Loop' },
      { niveau: 1, zin: '___ je jas!', ww: 'pakken', kies: ['Pakt', 'Pak'], goed: 'Pak' },
      { niveau: 1, zin: '___ hier!', ww: 'komen', kies: ['Kom', 'Komt'], goed: 'Kom' },
      { niveau: 1, zin: '___ wakker!', ww: 'worden', kies: ['Wordt', 'Word'], goed: 'Word' },
      { niveau: 1, zin: '___ de schat!', ww: 'vinden', kies: ['Vind', 'Vindt'], goed: 'Vind' },
      { niveau: 1, zin: '___ netjes!', ww: 'antwoorden', kies: ['Antwoordt', 'Antwoord'], goed: 'Antwoord' },
      { niveau: 1, zin: '___ het neer!', ww: 'zetten', kies: ['Zet', 'Zett'], goed: 'Zet' },
      { niveau: 1, zin: '___ stil!', ww: 'zijn', kies: ['Ben', 'Wees'], goed: 'Wees', tip: "Bij zijn wordt de opdracht 'Wees': Wees stil!" },
      { niveau: 1, zin: '___ goed vast!', ww: 'houden', kies: ['Houd', 'Houdt'], goed: 'Houd' },
      { niveau: 1, zin: '___ de bal!', ww: 'gooien', kies: ['Gooit', 'Gooi'], goed: 'Gooi' },
      { niveau: 1, zin: '___ je tanden!', ww: 'poetsen', kies: ['Poets', 'Poetst'], goed: 'Poets' },
      { niveau: 1, zin: '___ goed op!', ww: 'letten', kies: ['Let', 'Lett'], goed: 'Let' },
      // Zilver: zelf typen
      { niveau: 2, zin: '___ over het touw!', ww: 'springen', goed: 'spring' },
      { niveau: 2, zin: '___ je kamer op!', ww: 'ruimen', goed: 'ruim' },
      { niveau: 2, zin: '___ maar even!', ww: 'wachten', goed: 'wacht' },
      { niveau: 2, zin: '___ voorzichtig!', ww: 'zijn', goed: 'wees', tip: "Bij zijn wordt de opdracht 'Wees': Wees voorzichtig!" },
      { niveau: 2, zin: '___ het licht uit!', ww: 'doen', goed: 'doe' },
      { niveau: 2, zin: '___ het boek!', ww: 'lezen', goed: 'lees' },
      { niveau: 2, zin: '___ eens goed!', ww: 'luisteren', goed: 'luister' },
      { niveau: 2, zin: '___ je naam op!', ww: 'schrijven', goed: 'schrijf' },
      { niveau: 2, zin: '___ een plekje!', ww: 'vinden', goed: 'vind' },
      { niveau: 2, zin: '___ het touw vast!', ww: 'houden', goed: ['houd', 'hou'] },
      { niveau: 2, zin: '___ niet zo hard!', ww: 'rijden', goed: 'rijd' },
      { niveau: 2, zin: '___ op tijd!', ww: 'komen', goed: 'kom' },
      { niveau: 2, zin: '___ niet zo bang!', ww: 'worden', goed: 'word' },
      { niveau: 2, zin: '___ de bloemen water!', ww: 'geven', goed: 'geef' },
      // Goud: opdracht of niet?
      herken('Word wakker!', true),
      herken('Hij wordt wakker.', false),
      herken('Loop door!', true),
      herken('Tim loopt door.', false),
      herken('Pak je jas!', true),
      herken('Pak jij je jas?', false),
      herken('Wees stil!', true),
      herken('Wij zijn stil.', false),
      herken('Vind de schat!', true),
      herken('Zij vindt de schat.', false),
      herken('Zet het neer!', true),
      herken('Hij zet het neer.', false),
      herken('Kom maar binnen!', true),
      herken('Komt hij binnen?', false),
      herken('Houd de deur open!', true),
      herken('Antwoord in een hele zin!', true),
    ],
  },
};

/** Waar de meesters hun vraag over stellen (een Zilver-vraag van een van de kramen). */
export const WERKWOORD_MEESTER = {
  sterk: { intro: 'Mijn vraag gaat over sterke werkwoorden.', vraag: 'Typ het werkwoord in de verleden tijd:' },
  tegenwoordig: { intro: 'Mijn vraag gaat over de tegenwoordige tijd.', vraag: 'Typ de goede vorm van het werkwoord:' },
  verleden: { intro: "Mijn vraag gaat over de verleden tijd en 't kofschip-x.", vraag: 'Typ het werkwoord in de verleden tijd:' },
  voltooid: { intro: 'Mijn vraag gaat over de voltooide tijd.', vraag: 'Typ het voltooid deelwoord:' },
  gebiedend: { intro: 'Mijn vraag gaat over de gebiedende wijs.', vraag: 'Typ de opdracht (de gebiedende wijs):' },
};
