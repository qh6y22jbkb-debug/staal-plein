/*
 * ============================================================
 *  ONDERDELEN AAN/UIT (herhalingsblok)
 * ============================================================
 *  Hier zet je hele onderdelen van het spel aan (true) of uit (false).
 *  Een onderdeel dat UIT staat, is niet weg: de code en de teksten blijven bewaard,
 *  en ook de voortgang van de kinderen blijft opgeslagen. Zet je het weer op true,
 *  dan werkt alles weer zoals vroeger.
 *
 *  Na een wijziging: zet de nieuwe versie online met `npm run deploy`.
 * ============================================================
 */
export const ONDERDELEN = {
  // Werkwoordenwereld (herhalingsblok): de vijf werkwoordkramen op het schoolplein (src/data/werkwoorden.js).
  // Uit = de zes taalkramen van Staal blok 2 komen terug (src/data/taalkramen-blok2.js).
  werkwoordenwereld: true,

  // De Voetbalwereld achter de poort in het oostelijke hek (teksten: src/data/voetbal.js, code: src/voetbal/).
  // Uit = er staat een gewoon hek, de voetbalspullen staan niet in de winkel en de Bunders Beker staat niet op het plein.
  voetbalwereld: false,

  // De rekenwereld in Leergroep 3 (teksten en regels: src/data/rekenen.js, code: src/rekenen/).
  // Uit = de rekenkramen en de Rekenkaart zijn weg, en de gouden rekenmachine-rugzak staat niet in de winkel.
  rekenwereld: false,

  // De Spellingwereld in Leergroep 3 (herhalingsblok; woorden en instellingen: src/data/spelling.js).
  // Werkt als de rekenwereld uit staat. Staan ze allebei uit, dan is de school dicht.
  spellingwereld: true,

  // De Bieb in het schoolgebouw (herhalingsblok): vijf leesplekken met zinsontleding (src/data/bieb.js).
  bieb: true,

  // De Leeskraam (Spot aan!) met Lotte Leeslamp (vragenkaartjes: src/data/leeskaartjes.js, venster: src/ui/leesvenster.js).
  // Uit = de kraam, het podium en de spotlight staan niet op het plein.
  leeskraam: false,
};

/*
 *  BOUWVARIANT REKENPLEIN (voor Meester Jop, tegel Rekenen)
 *  Bouw je met VITE_WERELD=rekenen, dan zit de rekenwereld in de school (in plaats van de
 *  Spellingwereld) en is de Bieb dicht. De rest van het plein blijft hetzelfde.
 *  Gewoon `npm run build` of `npm run deploy` = Staal Plein zoals hierboven ingesteld.
 */
export const VARIANT = import.meta.env?.VITE_WERELD === 'rekenen' ? 'rekenen' : '';
if (VARIANT === 'rekenen') Object.assign(ONDERDELEN, { rekenwereld: true, spellingwereld: false, bieb: false });
