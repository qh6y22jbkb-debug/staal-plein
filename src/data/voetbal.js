/*
 * Teksten en instellingen van de Voetbalwereld. Staat nu UIT (zie src/data/onderdelen.js);
 * alles blijft hier bewaard, zodat hij later weer aan kan.
 */
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
  overzichtDoelpunten: '⚽ Doelpunten: {aantal} × {per} munten',
  overzichtWinst: '🏆 Winst tegen {team}',
  overzichtGelijk: '🤝 Gelijkspel',
  overzichtBeker: '🥇 Bunders Beker',
  overzichtVerlies: 'Verlies kost geen munten. Probeer het nog eens!',
  overzichtTotaal: 'Verdiend: {aantal} munten',
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

/** Munten in de Voetbalwereld. Verlies kost nooit munten. */
export const VOETBAL_MUNTEN = {
  doelpunt: 5, // per doelpunt van De Bunders
  gelijk: 10, // gelijkspel
  beker: 100, // de eerste keer de Bunders Beker winnen
  // Winst per tegenstander staat hieronder bij elk team (winstMunten).
};

export const VOETBAL_TEAMS = [
  {
    id: 'slakken', naam: 'De Slakken', kort: 'SLAKKEN', niveau: 'makkelijk',
    tenue: { shirt: '#82c91e', streep: '#5c940d', broek: 0x2b8a3e },
    snelheid: 4.2, schot: 0.3, keeper: 0.35, afpakken: 0.5, passen: 0.3, winstMunten: 20,
  },
  {
    id: 'wervelwinden', naam: 'De Wervelwinden', kort: 'WERVELWINDEN', niveau: 'gemiddeld',
    tenue: { shirt: '#ae3ec9', streep: '#ffffff', broek: 0x5f3dc4 },
    snelheid: 5.4, schot: 0.55, keeper: 0.6, afpakken: 1.2, passen: 0.55, winstMunten: 30,
  },
  {
    id: 'bliksems', naam: 'De Bliksems', kort: 'BLIKSEMS', niveau: 'moeilijk',
    tenue: { shirt: '#fab005', streep: '#212529', broek: 0x212529 },
    snelheid: 6.4, schot: 0.8, keeper: 0.85, afpakken: 2.0, passen: 0.75, winstMunten: 40,
  },
];
