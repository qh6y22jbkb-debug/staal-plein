/*
 * ============================================================
 *  GYMZAAL
 * ============================================================
 *  Teksten en instellingen van de gymzaal (naast de school). Een leerkracht kan dit aanpassen.
 */
export const GYM = {
  naam: 'Gymzaal',
  welkom: 'Welkom in de gymzaal! Klim in het touw, spring op de trampoline of gooi een balletje.',
  // Buiten bij de deur
  naarBinnenToets: 'Druk op E om naar de gymzaal te gaan',
  naarBinnenTik: 'Tik hier om naar de gymzaal te gaan',
  // Binnen bij de deur
  naarBuitenToets: 'Druk op E om naar het schoolplein te gaan',
  naarBuitenTik: 'Tik hier om naar het schoolplein te gaan',
  deurBord: 'Schoolplein',

  // Klimtouw
  touwPakken: 'Druk op E om in het touw te klimmen',
  touwPakkenTik: 'Tik hier om in het touw te klimmen',
  klimmen: '↑ klimmen · ↓ zakken · E loslaten',
  klimmenTik: 'Gebruik ▲ en ▼ om te klimmen',
  belLuiden: 'Je bent bovenin! Druk op spatie om de bel te luiden',
  belLuidenTik: 'Je bent bovenin! Tik op 🔔 om de bel te luiden',
  ding: 'DING! +{munten}',
  dingGenoeg: 'DING! Vandaag heb je al {max} keer munten gekregen voor de bel.',
  belMunten: 3, // munten per keer de bel luiden...
  belMaxPerDag: 3, // ...maximaal zo vaak per dag
  klimSnelheid: 1.4, // meter per seconde omhoog

  // Trampoline
  trampoline: 'Spring met spatie, en druk in de lucht nog eens op spatie voor een salto!',
  trampolineTik: 'Spring met de springknop, en tik in de lucht nog eens voor een salto!',
  salto: 'Salto!',

  // Basketbal
  balPakken: 'Druk op E om de bal te pakken',
  balPakkenTik: 'Tik hier om de bal te pakken',
  balGooien: 'Houd spatie ingedrukt, laat los als de balk in het groene vak is',
  balGooienTik: 'Houd Gooi ingedrukt, laat los als de balk in het groene vak is',
  gescoord: '🏀 Gescoord: {aantal}',
  raak: 'Raak!',

  // Touchknoppen
  knopGooi: 'Gooi',
  knopLos: 'Los',
};

/*
 * Gymtijd: die verdien je met stempels. Alleen een hele nieuwe stempel (alle 3 niveaus van een taalkraam,
 * of Goud bij een rekenkraam) geeft gymtijd. Alleen in de gymzaal loopt hij af.
 */
export const GYMTIJD = {
  minutenPerStempel: 3, // zoveel minuten per nieuwe stempel (alle 3 niveaus van een kraam, of Goud bij een rekenkraam)
  maxMinuten: 3, // meer kun je niet opsparen
  menu: '⏱️ Gymtijd: {tijd}',
  verdiend: '⏱️ +{minuten} minuten gymtijd!',
  vol: '⏱️ Je gymtijd is vol ({max} minuten).',
  deurOpen: 'Je hebt {tijd} gymtijd. Druk op E om naar binnen te gaan',
  deurOpenTik: 'Je hebt {tijd} gymtijd. Tik hier om naar binnen te gaan',
  deurDicht: 'Haal een stempel om gymtijd te verdienen!',
  nog30: '⏱️ Nog 30 seconden gymtijd!',
  voorbij: 'De gymles is voorbij!',
  testtoets: '🧪 Testtoets: {max} minuten gymtijd',
};
