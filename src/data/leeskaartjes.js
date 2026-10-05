/*
 * ============================================================
 *  LEESKRAAM - SPOT AAN!  (vragenkaartjes voor maatjeslezen)
 * ============================================================
 *  Hier staan alle teksten en kaartjes van de Leeskraam.
 *  Een kaartje toevoegen? Zet een nieuwe regel tussen de aanhalingstekens
 *  bij de juiste categorie, met een komma erachter. Zo:
 *      'Wat is jouw favoriete hoofdstuk?',
 *  Een nieuwe categorie kan ook: kopieer een blok { naam, kleur, vragen }.
 *  De Leeskraam telt NIET mee voor de stempelkaart en de poort.
 */

export const LEESKRAAM = {
  kraamNaam: 'Leeskraam - Spot aan!',
  karakterNaam: 'Lotte Leeslamp',
  icoon: '🔦',
  begroeting: 'Welkom bij de Leeskraam! Lees samen met je maatje en stel elkaar vragen over je boek.',
  uitleg: [
    { tekst: 'Maatje A leest een stukje voor. Maatje B pakt een kaartje en stelt de vraag. Daarna wissel je om.' },
  ],
  knopKaartjes: 'Kaartjes pakken',

  // Teksten in het kaartjesvenster.
  kiesBoek: 'Wat voor boek lees je?',
  kiesCategorie: 'Kies een soort vraag',
  kiesInfo: 'Pak een kaartje over je informatieboek',
  verrasMe: 'Verras me!',
  pakKaartje: 'Kaartje pakken',
  anderBoek: 'Ander boek',
  volgend: 'Volgend kaartje',
  andereCategorie: 'Andere categorie',
  klaar: 'Klaar',
  voorlezen: 'Lees de vraag voor',
  beurtA: 'Maatje A stelt de vraag',
  beurtB: 'Maatje B stelt de vraag',
};

/*
 * Munten voor de Leeskraam. Staat standaard UIT, zodat kinderen niet snel doorklikken.
 * Zet aan: true om munten te geven (per kaartje, met een maximum per dag).
 */
export const LEES_MUNTEN = {
  aan: false,
  perKaartje: 2,
  maxPerDag: 10,
};

export const LEESKAARTJES = {
  verhaal: {
    naam: 'Verhalenboek',
    categorieen: [
      {
        naam: 'Personages',
        kleur: '#2E75B6',
        vragen: [
          'Wie is de hoofdpersoon? Vertel iets over hem of haar.',
          'Hoe ziet de hoofdpersoon eruit, denk je?',
          'Hoe voelt de hoofdpersoon zich nu? Waaraan merk je dat?',
          'Welk personage vind jij het leukst? Waarom?',
          'Zou je vrienden willen zijn met de hoofdpersoon? Waarom wel of niet?',
        ],
      },
      {
        naam: 'Plaats & tijd',
        kleur: '#3A9D5D',
        vragen: [
          'Waar speelt het verhaal zich af?',
          'Speelt het verhaal nu, vroeger of in de toekomst? Hoe weet je dat?',
          'Zou jij op deze plek willen wonen? Waarom wel of niet?',
        ],
      },
      {
        naam: 'Wat gebeurt er?',
        kleur: '#E07B1F',
        vragen: [
          'Wat gebeurde er in het stukje dat je net hebt gehoord?',
          'Wat is het probleem in het verhaal?',
          'Wat was tot nu toe het spannendste of grappigste moment?',
          'Welk woord of welke zin viel je op? Waarom?',
        ],
      },
      {
        naam: 'Voorspellen',
        kleur: '#7B4FB0',
        vragen: [
          'Wat denk je dat er hierna gebeurt?',
          'Hoe denk je dat het boek afloopt?',
          'Past de titel bij het verhaal? Welke titel zou jij bedenken?',
          'Kijk naar de kaft. Wat verraadt de kaft over het verhaal?',
        ],
      },
      {
        naam: 'Jouw mening',
        kleur: '#D6457A',
        vragen: [
          'Wat vind je tot nu toe van het boek? Geef het een cijfer van 1 tot 10.',
          'Aan wie in de klas zou jij dit boek aanraden? Waarom?',
          'Wat zou jij doen als jij de hoofdpersoon was?',
          'Doet het verhaal je denken aan iets wat jij zelf hebt meegemaakt?',
        ],
      },
      {
        naam: 'Spot aan!',
        kleur: '#E8A800',
        vragen: [
          'Welk personage zou jij in de spotlight zetten? Waarom?',
          'Dit boek wordt een toneelstuk. Welke rol wil jij spelen?',
          'Welk moment uit het boek zou jij op een podium naspelen?',
          'Welke muziek of welk geluid past bij dit stukje?',
        ],
      },
    ],
  },
  info: {
    naam: 'Informatieboek',
    categorieen: [
      {
        naam: 'Informatieboek',
        kleur: '#138A8A',
        vragen: [
          'Waar gaat dit boek over? Wat is het onderwerp?',
          'Wat is het interessantste feitje dat je net hebt gelezen?',
          'Wat wist je nog niet voordat je dit stukje las?',
          'Welke foto of tekening vind je het mooist? Wat zie je erop?',
          'Leg in je eigen woorden uit wat je net hebt gelezen.',
          'Welk feitje zou jij in de spotlight aan de hele klas vertellen?',
          'Welk moeilijk woord kwam je tegen? Wat betekent het, denk je?',
          'Welk feitje vind je het gekst of het meest verrassend?',
          'Wat zou jij nog meer willen weten over dit onderwerp?',
          'Kijk in de inhoudsopgave. Welk hoofdstuk wil je als eerste lezen? Waarom?',
          'Waar zou je nog meer over dit onderwerp kunnen vinden?',
          'Aan wie in de klas zou jij dit boek aanraden? Waarom?',
        ],
      },
    ],
  },
};
