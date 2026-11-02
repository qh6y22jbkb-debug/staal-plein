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
  // De Voetbalwereld achter de poort in het oostelijke hek (teksten: src/data/voetbal.js, code: src/voetbal/).
  // Uit = er staat een gewoon hek, de voetbalspullen staan niet in de winkel en de Bunders Beker staat niet op het plein.
  voetbalwereld: false,

  // De rekenwereld in Leergroep 3 (teksten en regels: src/data/rekenen.js, code: src/rekenen/).
  // Uit = de rekenkramen en de Rekenkaart zijn weg, en de gouden rekenmachine-rugzak staat niet in de winkel.
  rekenwereld: false,

  // De Leeskraam (Spot aan!) met Lotte Leeslamp (vragenkaartjes: src/data/leeskaartjes.js, venster: src/ui/leesvenster.js).
  // Uit = de kraam, het podium en de spotlight staan niet op het plein.
  leeskraam: false,
};
