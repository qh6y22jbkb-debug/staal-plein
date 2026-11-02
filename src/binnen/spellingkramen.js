import * as THREE from 'three';
import { bouwKraam, letterTextuur } from '../wereld/kramen.js';
import { doos, cilinder, bol } from '../wereld/helpers.js';
import { SPELLING_LOKALEN } from '../data/spelling.js';

const BLAD = 1.13; // hoogte van het toonbankblad

// Uiterlijk per spellingkraam (kleuren, karakter, letterblokken op de toonbank).
const UITERLIJK = {
  centwoord: { kleur: 0xf59f00, luifel: ['#f59f00', '#ffffff'], bord: '#e67700', stem: 1.3, karakters: ['cisca'], letters: ['c', 'e', 'n', 't'], letterKleur: '#e67700' },
  heidteit: { kleur: 0xe64980, luifel: ['#e64980', '#ffffff'], bord: '#c2255c', stem: 1.35, karakters: ['heidi'], letters: ['ei', 'd', 't'], letterKleur: '#c2255c' },
  isch: { kleur: 0x7048e8, luifel: ['#7048e8', '#ffffff'], bord: '#5f3dc4', stem: 0.85, karakters: ['tobias'], letters: ['i', 's', 'c', 'h'], letterKleur: '#5f3dc4' },
  colawoord: { kleur: 0xe03131, luifel: ['#e03131', '#ffffff'], bord: '#c92a2a', stem: 1.0, karakters: ['carlo'], letters: ['c', 'o', 'l', 'a'], letterKleur: '#c92a2a' },
  stationrijtje: { kleur: 0x1c7ed6, luifel: ['#1c7ed6', '#ffffff'], bord: '#1864ab', stem: 1.2, karakters: ['patty'], letters: ['t', 'i', 'e'], letterKleur: '#1864ab', zwaailicht: true },
  herhaalmix: { kleur: 0x0ca678, luifel: ['#0ca678', '#ffd43b'], bord: '#099268', stem: 1.05, karakters: ['max'], letters: ['c', 'ei', 'isch', 'tie'], letterKleur: '#099268' },
};

function blok(g, tekst, kleur, x, z, draai = 0, grootte = 0.36) {
  const b = doos(grootte, grootte, grootte, new THREE.MeshLambertMaterial({ map: letterTextuur(tekst, kleur) }), x, BLAD + grootte / 2, z, g);
  b.rotation.y = draai;
  return b;
}

/** Letterblokken op de toonbank (en bij Agent Patty een blauw zwaailicht dat stil staat). */
function versierLetters(stijl) {
  return (g) => {
    const n = stijl.letters.length;
    stijl.letters.forEach((letter, i) => {
      const x = -1.35 + i * (0.5 + (n < 4 ? 0.15 : 0));
      blok(g, letter, stijl.letterKleur, x, 0.68 + (i % 2) * 0.08, (i % 2 ? -0.2 : 0.15));
    });
    if (stijl.zwaailicht) {
      cilinder(0.14, 0.08, 0x343a40, 1.25, BLAD + 0.04, 0.7, g, 12);
      bol(0.13, 0x4dabf7, 1.25, BLAD + 0.14, 0.7, g, 1);
    }
  };
}

/**
 * Zet in elk lokaal één spellingkraam, midden in het lokaal met de voorkant naar de deur.
 * Een lokaal dat uit staat (zie SPELLING_INSTELLINGEN.stationrijtje) blijft leeg.
 * @param plek  functie (i) → { kant, zc } (uit leergroep3.js)
 */
export function bouwSpellingkramen(ouder, botsing, plek) {
  const kramen = [];
  SPELLING_LOKALEN.forEach((lokaal, i) => {
    if (lokaal.uit) return;
    const { kant, zc } = plek(i);
    const x = kant * 10.3;
    const draai = -kant * Math.PI / 2; // voorkant (lokaal +z) wijst naar het leerplein
    const stijl = { ...UITERLIJK[lokaal.id] };
    stijl.versier = versierLetters(stijl);
    const data = { ...lokaal, kraamNaam: lokaal.naam, karakterNaam: lokaal.naam, leerdoel: lokaal.onderwerp };
    const kraam = bouwKraam(ouder, botsing, data, stijl, x, zc, draai);
    kraam.isSpellingkraam = true;
    kramen.push(kraam);
  });
  return kramen;
}
