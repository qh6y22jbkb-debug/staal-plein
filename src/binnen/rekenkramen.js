import * as THREE from 'three';
import { bouwKraam, letterTextuur } from '../wereld/kramen.js';
import { doos, cilinder, kegel, bol } from '../wereld/helpers.js';
import { LOKALEN } from '../data/rekenen.js';

const BLAD = 1.13; // hoogte van het toonbankblad

// Uiterlijk per rekenkraam (kleuren, karakter, versiering op de toonbank).
const UITERLIJK = {
  plus: { kleur: 0x2f9e44, luifel: ['#2f9e44', '#ffffff'], bord: '#2b8a3e', stem: 1.05, karakters: ['pim'], versier: versierPlus },
  min: { kleur: 0xe03131, luifel: ['#e03131', '#ffffff'], bord: '#c92a2a', stem: 1.3, karakters: ['mila'], versier: versierMin },
  keer: { kleur: 0x1c7ed6, luifel: ['#1c7ed6', '#ffffff'], bord: '#1864ab', stem: 0.85, karakters: ['kees'], versier: versierKeer },
  deel: { kleur: 0x7048e8, luifel: ['#7048e8', '#ffffff'], bord: '#5f3dc4', stem: 1.2, karakters: ['dina'], versier: versierDeel },
  klok: { kleur: 0xf59f00, luifel: ['#f59f00', '#ffffff'], bord: '#e67700', stem: 0.7, karakters: ['klaas'], versier: versierKlok },
  tafel: { kleur: 0x0ca678, luifel: ['#0ca678', '#ffd43b'], bord: '#099268', stem: 1.15, karakters: ['tijn'], versier: versierTafel },
};

/**
 * Zet in elk lokaal één rekenkraam, midden in het lokaal met de voorkant naar de deur.
 * @param plek  functie (i) → { kant, zc } (uit leergroep3.js)
 */
export function bouwRekenkramen(ouder, botsing, plek) {
  return LOKALEN.map((lokaal, i) => {
    const { kant, zc } = plek(i);
    const x = kant * 10.3;
    const draai = -kant * Math.PI / 2; // voorkant (lokaal +z) wijst naar het leerplein
    const data = { ...lokaal, kraamNaam: lokaal.naam, karakterNaam: lokaal.naam };
    const kraam = bouwKraam(ouder, botsing, data, UITERLIJK[lokaal.id], x, zc, draai);
    kraam.isRekenkraam = true;
    return kraam;
  });
}

/* ---------- Versieringen op de toonbank ---------- */

function blok(g, tekst, kleur, x, z, draai = 0, grootte = 0.38) {
  const b = doos(grootte, grootte, grootte, new THREE.MeshLambertMaterial({ map: letterTextuur(tekst, kleur) }), x, BLAD + grootte / 2, z, g);
  b.rotation.y = draai;
  return b;
}

function versierPlus(g) {
  // Telraam: houten raam met vijf staafjes vol gekleurde kralen.
  doos(0.08, 0.7, 0.08, 0x9a6a3c, -1.45, BLAD + 0.35, 0.7, g);
  doos(0.08, 0.7, 0.08, 0x9a6a3c, -0.35, BLAD + 0.35, 0.7, g);
  doos(1.18, 0.06, 0.1, 0x9a6a3c, -0.9, BLAD + 0.03, 0.7, g);
  const kralen = [0xe03131, 0xfab005, 0x1c7ed6, 0x2f9e44, 0xf06595];
  for (let r = 0; r < 5; r++) {
    const y = BLAD + 0.14 + r * 0.12;
    const staaf = cilinder(0.012, 1.06, 0xc0c0c0, -0.9, y, 0.7, g, 4);
    staaf.rotation.z = Math.PI / 2;
    for (let k = 0; k < 6; k++) bol(0.045, kralen[r], -1.3 + k * 0.09 + (k > 2 ? 0.3 : 0), y, 0.7, g).castShadow = false;
  }
  blok(g, '+', '#2f9e44', 0.55, 0.72, 0.15);
  blok(g, '=', '#1c7ed6', 1.15, 0.68, -0.2, 0.32);
}

function versierMin(g) {
  blok(g, '10', '#e03131', -1.2, 0.7, -0.1);
  blok(g, '−', '#1d2b4f', -0.6, 0.74, 0.1, 0.32);
  blok(g, '3', '#e03131', -0.05, 0.7, -0.15, 0.32);
  // Stapel munten waar er een paar vanaf zijn gehaald.
  for (let i = 0; i < 5; i++) cilinder(0.12, 0.04, 0xf2c230, 0.85, BLAD + 0.02 + i * 0.045, 0.7, g, 14);
  cilinder(0.12, 0.04, 0xf2c230, 1.25, BLAD + 0.02, 0.85, g, 14);
  cilinder(0.12, 0.04, 0xf2c230, 1.45, BLAD + 0.02, 0.6, g, 14);
}

function versierKeer(g) {
  // Bordje met een rooster van stippen: 3 rijen van 4 (3 × 4).
  const plank = doos(0.9, 0.62, 0.05, 0xffffff, -0.9, BLAD + 0.36, 0.55, g);
  plank.rotation.x = -0.25;
  for (let r = 0; r < 3; r++) {
    for (let k = 0; k < 4; k++) {
      const stip = bol(0.045, 0x1c7ed6, -1.2 + k * 0.2, BLAD + 0.18 + r * 0.17, 0.62 + r * 0.04, g);
      stip.castShadow = false;
    }
  }
  blok(g, '×', '#1c7ed6', 0.4, 0.72, 0.2);
  blok(g, '12', '#2f9e44', 1.05, 0.7, -0.1, 0.34);
}

function versierDeel(g) {
  // Pizza in acht gelijke stukken (eerlijk delen!).
  cilinder(0.42, 0.04, 0xe8c07a, -0.85, BLAD + 0.02, 0.7, g, 24);
  cilinder(0.37, 0.02, 0xd9480f, -0.85, BLAD + 0.05, 0.7, g, 24);
  for (let i = 0; i < 4; i++) {
    const snee = doos(0.76, 0.02, 0.015, 0xe8c07a, -0.85, BLAD + 0.065, 0.7, g);
    snee.rotation.y = (i / 4) * Math.PI;
    snee.castShadow = false;
  }
  for (let i = 0; i < 8; i++) {
    const h = (i / 8) * Math.PI * 2 + 0.4;
    cilinder(0.05, 0.02, 0xfff3bf, -0.85 + Math.cos(h) * 0.22, BLAD + 0.075, 0.7 + Math.sin(h) * 0.22, g, 10).castShadow = false;
  }
  blok(g, ':', '#7048e8', 0.45, 0.72, -0.15);
  blok(g, '8', '#7048e8', 1.05, 0.7, 0.2, 0.32);
}

function versierKlok(g) {
  // Grote klok op een voetje, die kwart over drie aanwijst.
  const klok = new THREE.Group();
  klok.position.set(-0.75, BLAD + 0.55, 0.7);
  g.add(klok);
  const rand = cilinder(0.46, 0.1, 0xe67700, 0, 0, 0, klok, 28);
  rand.rotation.x = Math.PI / 2;
  const plaat = cilinder(0.4, 0.11, 0xffffff, 0, 0, 0.005, klok, 28);
  plaat.rotation.x = Math.PI / 2;
  for (let u = 0; u < 12; u++) {
    const h = (u / 12) * Math.PI * 2;
    doos(0.03, u % 3 === 0 ? 0.09 : 0.05, 0.02, 0x1d2b4f, Math.sin(h) * 0.33, Math.cos(h) * 0.33, 0.065, klok).rotation.z = -h;
  }
  // Kwart over drie: lange wijzer op de 3, korte wijzer net voorbij de 3 (een kwart van het uur verder).
  const lang = doos(0.035, 0.32, 0.02, 0x1d2b4f, 0.16, 0, 0.075, klok);
  lang.rotation.z = -Math.PI / 2;
  const hoekKort = Math.PI / 2 + (Math.PI / 6) * 0.25;
  const kort = doos(0.05, 0.2, 0.02, 0xe03131, Math.sin(hoekKort) * 0.1, Math.cos(hoekKort) * 0.1, 0.08, klok);
  kort.rotation.z = -hoekKort;
  doos(0.12, 0.1, 0.25, 0xe67700, -0.75, BLAD + 0.05, 0.7, g);
  // Zandloper.
  kegel(0.13, 0.22, 0xffffff, 0.85, BLAD + 0.13, 0.7, g, 10).material = new THREE.MeshLambertMaterial({ color: 0xd0ebff, transparent: true, opacity: 0.7 });
  const boven = kegel(0.13, 0.22, 0xffffff, 0.85, BLAD + 0.35, 0.7, g, 10);
  boven.rotation.x = Math.PI;
  boven.material = new THREE.MeshLambertMaterial({ color: 0xd0ebff, transparent: true, opacity: 0.7 });
  cilinder(0.16, 0.03, 0x9a6a3c, 0.85, BLAD + 0.015, 0.7, g, 12);
  cilinder(0.16, 0.03, 0x9a6a3c, 0.85, BLAD + 0.47, 0.7, g, 12);
  kegel(0.08, 0.1, 0xf2c230, 0.85, BLAD + 0.08, 0.7, g, 10);
}

function versierTafel(g) {
  // Een rijtje cijferblokken 1 t/m 10 en een finishvlag voor de tafelrace.
  for (let n = 1; n <= 5; n++) blok(g, String(n * 2), n % 2 ? '#0ca678' : '#f59f00', -1.45 + (n - 1) * 0.36, 0.72, (n % 2 ? 0.1 : -0.1), 0.3);
  cilinder(0.025, 1.0, 0x495057, 1.3, BLAD + 0.5, 0.7, g, 6);
  const vlag = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 0.4), new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    map: (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const ctx = c.getContext('2d');
      for (let y = 0; y < 4; y++) for (let x = 0; x < 6; x++) { ctx.fillStyle = (x + y) % 2 ? '#1d2b4f' : '#ffffff'; ctx.fillRect(x * 11, y * 16, 11, 16); }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })(),
  }));
  vlag.position.set(1.0, BLAD + 0.82, 0.7);
  g.add(vlag);
}
