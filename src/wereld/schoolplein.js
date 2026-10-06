import * as THREE from 'three';
import {
  mat, doos, cilinder, kegel, bol, grondVlak, canvasTextuur, tekstTextuur, zaadRandom,
} from './helpers.js';
import { LEERGROEP } from '../data/rekenen.js';

// Het plein (binnen het hek). Noord = -z (daar staat de school), zuid = +z (ingang).
// Sfeer naar foto's van het echte plein: een natuurspeelplaats met hout, zand en groen.
// Het midden (ongeveer x -16..16, z -8..18) blijft vrij voor de marktkramen.
export const PLEIN = { minX: -40, maxX: 40, minZ: -30, maxZ: 30 };
export const STARTPLEK = new THREE.Vector3(0, 0, 22);
/** Voor de voordeur van de school (naar Leergroep 3). */
export const SCHOOLDEUR = new THREE.Vector3(0, 0, -20.6);

const KLEUR = {
  gras: 0x7fb35a, rubbergras: 0x8db37a, zand: 0xdccba3, donkerTegel: 0x6f7883,
  baksteen: 0xb5694c, dak: 0x4c5259, wit: 0xffffff, glas: 0x8fc6e0,
  hout: [0x8b7a66, 0x7a6a58, 0x9c8b76, 0x6f604f], bankHout: 0x9a6a3c,
  stam: 0x6e5a45, eik: [0x3d7a35, 0x4a8a3c, 0x356d30, 0x55963f],
  wilg: [0xb3b45a, 0xa3b25a, 0xc2b45e, 0x98a850], struik: [0x4f8a3e, 0x5c9746, 0x467d39],
  roodStruik: [0xb5443a, 0xc9603f, 0xa8473b], kei: 0x9a948c, metaal: 0xc9ccd0,
  hek: 0x2b2f33, geel: 0xf2c230, blauw: 0x2a6fb5, rood: 0xd9473e, groen: 0x3fae5a, oranje: 0xff8a2a,
};

/**
 * Bouwt het hele schoolplein.
 * Geeft terug: blokkers (voor de camera) en een update-functie (wolken, vlag, schommel).
 */
export function bouwSchoolplein(scene, botsing) {
  const blokkers = [];
  const animaties = [];
  const stammen = new Stammen(scene);

  bouwGrond(scene);
  bouwSchool(scene, botsing, blokkers);
  bouwGymzaal(scene, botsing, blokkers);
  bouwFietsenhok(scene, botsing, blokkers);
  bouwFietsenrij(scene, botsing);
  bouwHek(scene);
  bouwKeienzand(scene, botsing, -6, -14);
  bouwBalanceerpalen(scene, botsing, stammen, 11, -15);
  bouwTouwschommel(scene, botsing, -24, -10, animaties);
  bouwKlimtoren(scene, botsing, 26, -12);
  bouwPalissade(scene, botsing, stammen, 28, 10);
  bouwBorders(scene, botsing, stammen);
  bouwHinkelbaan(scene, -9, 22);
  bouwVlaggenmast(scene, botsing, 6, -19, animaties);
  bouwBankjes(scene, botsing);
  bouwBomen(scene, botsing);
  bouwBuurt(scene);
  bouwWolken(scene, animaties);
  stammen.maak();

  return {
    blokkers,
    update(dt, tijd) { for (const a of animaties) a(dt, tijd); },
  };
}

/* ---------- Boomstammetjes (allemaal in één keer getekend: snel op Chromebooks) ---------- */

class Stammen {
  constructor(scene) {
    this.scene = scene;
    this.lijst = [];
    this.rnd = zaadRandom(123);
  }

  voegToe(x, z, r, h, kantel = 0) {
    this.lijst.push({ x, z, r, h, kantel, kleur: KLEUR.hout[Math.floor(this.rnd() * KLEUR.hout.length)] });
  }

  /** Rij stammetjes langs een omtrek (lijst punten), met eventueel een opening. */
  langsRand(punten, { afstand = 0.24, r = 0.1, hoogte = 0.35, variatie = 0.08, opening } = {}) {
    for (let i = 0; i < punten.length; i++) {
      const a = punten[i], b = punten[(i + 1) % punten.length];
      const lengte = Math.hypot(b.x - a.x, b.z - a.z);
      const n = Math.max(1, Math.round(lengte / afstand));
      for (let s = 0; s < n; s++) {
        const x = a.x + ((b.x - a.x) * s) / n, z = a.z + ((b.z - a.z) * s) / n;
        if (opening && opening(x, z)) continue;
        this.voegToe(x, z, r * (0.85 + this.rnd() * 0.3), hoogte + (this.rnd() * 2 - 1) * variatie);
      }
    }
  }

  maak() {
    const geo = new THREE.CylinderGeometry(1, 1, 1, 7);
    geo.translate(0, 0.5, 0);
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial(), this.lijst.length);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    const kleur = new THREE.Color();
    this.lijst.forEach((s, i) => {
      e.set(s.kantel, 0, s.kantel * 0.5);
      q.setFromEuler(e);
      m.compose(new THREE.Vector3(s.x, 0, s.z), q, new THREE.Vector3(s.r, s.h, s.r));
      mesh.setMatrixAt(i, m);
      mesh.setColorAt(i, kleur.setHex(s.kleur));
    });
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
}

/** Ovale, een beetje bobbelige vorm (voor zand, rubbergras, borders). */
function ovaal(cx, cz, rx, rz, zaad = 1, n = 36, bobbel = 0.12) {
  const rnd = zaadRandom(zaad);
  const fase = rnd() * 6;
  const punten = [];
  for (let i = 0; i < n; i++) {
    const h = (i / n) * Math.PI * 2;
    const f = 1 + Math.sin(h * 2 + fase) * bobbel + Math.sin(h * 3 + fase * 2) * bobbel * 0.5;
    punten.push({ x: cx + Math.cos(h) * rx * f, z: cz + Math.sin(h) * rz * f });
  }
  return punten;
}

function vlak(scene, punten, kleur, y = 0.02) {
  const vorm = new THREE.Shape(punten.map((p) => new THREE.Vector2(p.x, -p.z)));
  const m = new THREE.Mesh(new THREE.ShapeGeometry(vorm), typeof kleur === 'number' ? mat(kleur) : kleur);
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.receiveShadow = true;
  m.userData.grond = true;
  scene.add(m);
  return m;
}

/* ---------- Grond ---------- */

function bouwGrond(scene) {
  const gras = grondVlak(320, 320, mat(KLEUR.gras), 0, 0, 0, scene);
  gras.userData.grond = true;

  // Blauwgrijze betontegels in halfsteens verband, elk net een andere tint.
  const rnd = zaadRandom(5);
  const tinten = ['#9ea7b0', '#97a0aa', '#a5adb6', '#929ca6', '#abb2ba', '#9aa3ad'];
  const tegels = canvasTextuur(256, 256, (ctx, b, h) => {
    ctx.fillStyle = '#868e97';
    ctx.fillRect(0, 0, b, h);
    const tb = 64, th = 32;
    for (let r = 0; r < h / th; r++) {
      const verschuif = (r % 2) * (tb / 2);
      for (let k = -1; k < b / tb + 1; k++) {
        ctx.fillStyle = tinten[Math.floor(rnd() * tinten.length)];
        ctx.fillRect(k * tb + verschuif + 2, r * th + 2, tb - 4, th - 4);
      }
    }
  });
  tegels.wrapS = tegels.wrapT = THREE.RepeatWrapping;
  tegels.repeat.set(80 / 2.4, 60 / 2.4);
  const plein = grondVlak(80, 60, new THREE.MeshLambertMaterial({ map: tegels }), 0, 0, 0.01, scene);
  plein.userData.grond = true;
}

/* ---------- Gebouwen ---------- */

function bouwSchool(scene, botsing, blokkers) {
  const g = new THREE.Group();
  scene.add(g);
  const voor = -22; // voorgevel

  const hoofd = doos(60, 7, 8, KLEUR.baksteen, 0, 3.5, -26, g);
  doos(60.2, 0.6, 8.2, 0x6c7178, 0, 0.3, -26, g); // plint
  doos(61, 0.5, 9, KLEUR.dak, 0, 7.25, -26, g); // dak
  blokkers.push(hoofd);
  botsing.voegDoosToe(-30, 30, -30, voor, 7);

  // Grote ramen met donkere kozijnen.
  for (const y of [2.1, 5.1]) {
    for (let x = -26.5; x <= 26.5; x += 4.4) {
      if (Math.abs(x) < 3.5) continue;
      doos(3.2, 2.2, 0.12, 0x2f3438, x, y, voor + 0.06, g);
      doos(2.9, 1.9, 0.14, KLEUR.glas, x, y, voor + 0.08, g);
      doos(0.1, 1.9, 0.18, 0x2f3438, x, y, voor + 0.1, g);
    }
  }

  // Voordeur met luifel. De glazen schuifdeuren staan altijd open: daarachter is Leergroep 3.
  doos(3.2, 3.2, 0.2, 0x2f3438, 0, 1.6, voor + 0.05, g);
  doos(2.7, 2.9, 0.22, 0x5b4636, 0, 1.45, voor + 0.07, g); // de hal achter de deur (warm binnenlicht)
  doos(2.4, 0.04, 0.6, 0xd3d0c8, 0, 0.03, voor + 0.25, g); // drempel
  doos(1.35, 2.9, 0.12, KLEUR.glas, -1.95, 1.45, voor + 0.2, g); // deur opzij geschoven
  doos(1.35, 2.9, 0.12, KLEUR.glas, 1.95, 1.45, voor + 0.2, g);
  // Bord "Leergroep 3 - Rekenen" boven op de luifel.
  const deurBord = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 0.9),
    new THREE.MeshLambertMaterial({ map: tekstTextuur(LEERGROEP.deurBord, { rand: '#e8590c', grootte: 110 }) }),
  );
  deurBord.position.set(0, 4.25, voor + 2.62);
  g.add(deurBord);
  for (const x of [-2.2, 2.2]) cilinder(0.04, 0.45, 0x3a3f44, x, 3.85, voor + 2.55, g, 6);
  doos(6, 0.3, 2.6, 0x3a3f44, 0, 3.6, voor + 1.3, g);
  cilinder(0.12, 3.5, 0x3a3f44, -2.7, 1.75, voor + 2.4, g);
  cilinder(0.12, 3.5, 0x3a3f44, 2.7, 1.75, voor + 2.4, g);
  botsing.voegCirkelToe(-2.7, voor + 2.4, 0.15, 3.6);
  botsing.voegCirkelToe(2.7, voor + 2.4, 0.15, 3.6);

  // Naambord.
  const bord = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 2),
    new THREE.MeshLambertMaterial({ map: tekstTextuur('Basisschool De Bunders', { rand: '#2a6fb5' }) }),
  );
  bord.position.set(0, 6.25, voor + 0.09);
  g.add(bord);

  // Struikjes langs de gevel.
  for (const x of [-25, -16, 15, 24]) {
    struik(scene, botsing, x, voor + 1, 1, x > 0 ? KLEUR.roodStruik : KLEUR.struik);
  }
}

function bouwGymzaal(scene, botsing, blokkers) {
  const g = new THREE.Group();
  scene.add(g);
  const hal = doos(9, 8, 15, 0x8c949c, 35.5, 4, -22.5, g);
  doos(9.6, 0.5, 15.6, KLEUR.dak, 35.5, 8.25, -22.5, g);
  for (let z = -27; z <= -18; z += 3) doos(0.12, 1.2, 2.2, KLEUR.glas, 30.95, 6.2, z, g);
  doos(0.2, 2.8, 2, KLEUR.geel, 30.95, 1.4, -16.8, g); // deur
  blokkers.push(hal);
  botsing.voegDoosToe(31, 40, -30, -15, 8);

  const bord = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 1.25),
    new THREE.MeshLambertMaterial({ map: tekstTextuur('Gymzaal', { rand: '#d9473e' }) }),
  );
  bord.rotation.y = -Math.PI / 2;
  bord.position.set(30.9, 4.2, -22.5);
  g.add(bord);
}

/** Houten fietsenhok met lichte golfplaten op het dak. */
function bouwFietsenhok(scene, botsing, blokkers) {
  const latten = canvasTextuur(256, 128, (ctx, b, h) => {
    ctx.fillStyle = '#b9a58a';
    ctx.fillRect(0, 0, b, h);
    for (let x = 0; x < b; x += 16) {
      ctx.fillStyle = x % 32 ? '#c4b296' : '#ad9a80';
      ctx.fillRect(x + 1, 0, 13, h);
    }
  });
  latten.wrapS = THREE.RepeatWrapping;
  latten.repeat.set(3, 1);
  const g = new THREE.Group();
  g.position.set(-35, 0, -19.5);
  scene.add(g);
  const hok = doos(8, 2.4, 5, new THREE.MeshLambertMaterial({ map: latten }), 0, 1.2, 0, g);
  const dak = doos(8.4, 0.15, 5.4, 0xe6e8ea, 0, 2.5, 0, g);
  dak.rotation.x = 0.05;
  for (let x = -3.6; x <= 3.6; x += 0.6) doos(0.08, 0.05, 5.4, 0xcfd3d6, x, 2.6, 0, g).rotation.x = 0.05;
  doos(0.6, 0.3, 0.05, KLEUR.blauw, 1.5, 1.9, 2.52, g); // bordje
  blokkers.push(hok, dak);
  botsing.voegDoosToe(-39.2, -30.8, -22.2, -16.8, 2.6);
}

function fiets(ouder, x, z, kleur, draai) {
  const f = new THREE.Group();
  f.position.set(x, 0, z);
  f.rotation.y = draai;
  const wiel = new THREE.TorusGeometry(0.33, 0.04, 5, 14);
  for (const wz of [-0.55, 0.55]) {
    const w = new THREE.Mesh(wiel, mat(0x222222));
    w.rotation.y = Math.PI / 2;
    w.position.set(0, 0.38, wz);
    w.castShadow = true;
    f.add(w);
  }
  doos(0.06, 0.06, 1.1, kleur, 0, 0.72, 0, f);
  doos(0.06, 0.5, 0.06, kleur, 0, 0.5, -0.25, f);
  doos(0.5, 0.05, 0.05, 0x222222, 0, 0.95, 0.5, f);
  doos(0.18, 0.06, 0.28, 0x222222, 0, 0.78, -0.25, f);
  ouder.add(f);
}

/** Fietsen in een rek langs de heg aan de westkant. */
function bouwFietsenrij(scene, botsing) {
  const g = new THREE.Group();
  scene.add(g);
  const kleuren = [KLEUR.rood, KLEUR.blauw, KLEUR.groen, 0x8d5bd6, KLEUR.oranje, 0xf06595, 0x222222, 0x74c0fc];
  const rnd = zaadRandom(77);
  for (let z = -6, i = 0; z <= 14; z += 1.1, i++) {
    fiets(g, -37 + (rnd() - 0.5) * 0.3, z, kleuren[i % kleuren.length], Math.PI / 2 + (rnd() - 0.5) * 0.25);
  }
  const rek = doos(0.08, 0.08, 21, 0x777d84, -36.3, 0.45, 4, g);
  rek.castShadow = false;
  const heg = doos(1.2, 1.5, 24, KLEUR.struik[2], -39.2, 0.75, 4, g);
  heg.material = new THREE.MeshLambertMaterial({ color: KLEUR.struik[2], flatShading: true });
  botsing.voegDoosToe(-40, -36, -6.8, 14.8, 1.1);
}

/* ---------- Hek ---------- */

function bouwHek(scene) {
  const textuur = canvasTextuur(64, 64, (ctx) => {
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = '#2b2f33';
    ctx.fillRect(0, 0, 5, 64);
    ctx.fillRect(32, 0, 5, 64);
    ctx.fillRect(0, 0, 64, 5);
  });
  textuur.wrapS = textuur.wrapT = THREE.RepeatWrapping;
  const hoogte = 1.5;

  const maakStuk = (x1, z1, x2, z2) => {
    const lengte = Math.hypot(x2 - x1, z2 - z1);
    const t = textuur.clone();
    t.repeat.set(lengte / 0.5, hoogte / 0.5);
    t.needsUpdate = true;
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(lengte, hoogte),
      new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }),
    );
    m.position.set((x1 + x2) / 2, hoogte / 2, (z1 + z2) / 2);
    m.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
    m.castShadow = true;
    m.userData.geenKlik = true;
    scene.add(m);
    const buis = doos(lengte, 0.07, 0.07, KLEUR.hek, m.position.x, hoogte, m.position.z, scene);
    buis.rotation.y = m.rotation.y;
    buis.userData.geenKlik = true;
    const stappen = Math.round(lengte / 2.5);
    for (let s = 0; s <= stappen; s++) {
      const f = s / stappen;
      const p = cilinder(0.06, hoogte + 0.1, KLEUR.hek, x1 + (x2 - x1) * f, (hoogte + 0.1) / 2, z1 + (z2 - z1) * f, scene, 6);
      p.userData.geenKlik = true;
    }
  };

  const { minX, maxX, minZ, maxZ } = PLEIN;
  maakStuk(minX, minZ, minX, maxZ);
  maakStuk(maxX, minZ, maxX, -3); // oostkant: opening voor de poort naar de Voetbalwereld
  maakStuk(maxX, 3, maxX, maxZ);
  maakStuk(minX, maxZ, -3, maxZ); // ingang in het midden van de zuidkant
  maakStuk(3, maxZ, maxX, maxZ);
  for (const x of [-3, 3]) {
    cilinder(0.16, 2.2, KLEUR.hek, x, 1.1, maxZ, scene);
    bol(0.22, KLEUR.geel, x, 2.3, maxZ, scene);
  }
}

/* ---------- Speelplekken (naar de foto's) ---------- */

/** Zandvlak met drie grote keien om op te klimmen. */
function bouwKeienzand(scene, botsing, x, z) {
  const rand = ovaal(x, z, 3.6, 2.2, 3, 32, 0.08);
  vlak(scene, ovaal(x, z, 3.85, 2.45, 3, 32, 0.08), 0x8b939c, 0.022); // betonrand
  vlak(scene, rand, KLEUR.zand, 0.03);
  const keiMat = new THREE.MeshLambertMaterial({ color: KLEUR.kei, flatShading: true });
  for (const [kx, kz, r] of [[-1.4, -0.4, 0.55], [0.3, 0.7, 0.5], [1.5, -0.3, 0.65]]) {
    const k = bol(r, keiMat, x + kx, r * 0.55, z + kz, scene, 0);
    k.scale.set(1.2, 0.8, 1);
    k.rotation.y = kx;
    botsing.voegCirkelToe(x + kx, z + kz, r, r * 1.1);
  }
}

/** Boomstammen van verschillende hoogte op rubbergras: springen van paal naar paal! */
function bouwBalanceerpalen(scene, botsing, stammen, x, z) {
  vlak(scene, ovaal(x, z, 5, 3, 11, 36, 0.1), KLEUR.rubbergras, 0.025);
  const palen = [
    [-3.4, 1, 0.5], [-2.3, 0.2, 0.8], [-1.2, -0.5, 1.1], [0, -0.8, 0.7],
    [1.2, -0.5, 1.3], [2.3, 0.1, 0.9], [3.3, 0.9, 0.6],
  ];
  for (const [px, pz, h] of palen) {
    stammen.voegToe(x + px, z + pz, 0.2, h);
    botsing.voegCirkelToe(x + px, z + pz, 0.2, h);
  }
}

/** Schuine boomstam met een touw en een rond zitje, op een donker tegelvlak. */
function bouwTouwschommel(scene, botsing, x, z, animaties) {
  const cirkel = new THREE.Mesh(new THREE.CircleGeometry(4.5, 32), mat(KLEUR.donkerTegel));
  cirkel.rotation.x = -Math.PI / 2;
  cirkel.position.set(x, 0.025, z);
  cirkel.receiveShadow = true;
  cirkel.userData.grond = true;
  scene.add(cirkel);

  const voet = new THREE.Vector3(x - 3.2, 0, z - 1);
  const top = new THREE.Vector3(x + 0.8, 3.4, z + 0.3);
  const lengte = voet.distanceTo(top);
  const balk = cilinder(0.2, lengte, KLEUR.hout[0], 0, 0, 0, scene, 7);
  balk.position.copy(voet).lerp(top, 0.5);
  balk.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), top.clone().sub(voet).normalize());

  // Steunbok halverwege.
  const steun = voet.clone().lerp(top, 0.62);
  for (const kant of [-1, 1]) {
    const poot = cilinder(0.11, 2.6, KLEUR.hout[1], steun.x, 1.2, steun.z + kant * 0.6, scene, 6);
    poot.rotation.x = kant * 0.28;
    botsing.voegCirkelToe(steun.x, steun.z + kant * 0.95, 0.2, 3);
  }
  botsing.voegCirkelToe(voet.x + 0.4, voet.z + 0.1, 0.3, 1);

  const touw = new THREE.Group();
  touw.position.copy(top);
  scene.add(touw);
  cilinder(0.03, 2.8, 0xc8b48a, 0, -1.4, 0, touw, 5);
  const zitje = cilinder(0.3, 0.1, KLEUR.hout[2], 0, -2.85, 0, touw, 12);
  zitje.castShadow = true;
  animaties.push((dt, t) => {
    touw.rotation.x = Math.sin(t * 1.4) * 0.22;
    touw.rotation.z = Math.sin(t * 0.9) * 0.08;
  });
}

/** Houten klimtoren met puntdak en een metalen glijbaan, op rubbergras. */
function bouwKlimtoren(scene, botsing, x, z) {
  vlak(scene, ovaal(x, z + 1, 6.5, 4.5, 21, 40, 0.12), KLEUR.rubbergras, 0.025);
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  scene.add(g);
  const rnd = zaadRandom(8);
  const ph = 1.6; // hoogte platform

  for (const [px, pz] of [[-1.1, -1.1], [1.1, -1.1], [-1.1, 1.1], [1.1, 1.1]]) {
    const paal = cilinder(0.13, 4.2, KLEUR.hout[Math.floor(rnd() * 4)], px, 2.1, pz, g, 7);
    paal.rotation.z = (rnd() - 0.5) * 0.06;
    botsing.voegCirkelToe(x + px, z + pz, 0.18, 4.2);
  }
  doos(2.4, 0.15, 2.4, KLEUR.hout[2], 0, ph, 0, g);

  // Leuning van takken.
  for (const [lx, lz, draai] of [[0, -1.1, 0], [-1.1, 0, Math.PI / 2], [1.1, 0, Math.PI / 2]]) {
    const leuning = cilinder(0.06, 2.3, KLEUR.hout[1], lx, ph + 0.8, lz, g, 5);
    leuning.rotation.z = Math.PI / 2;
    leuning.rotation.y = draai;
    for (const k of [-1, 1]) {
      const tak = cilinder(0.04, 1.1, KLEUR.hout[3], lx, ph + 0.42, lz, g, 4);
      tak.rotation.set(draai ? k * 0.7 : 0, draai, draai ? 0 : k * 0.7);
    }
  }

  // Puntdak van grijze houten dakspanen.
  const dak = kegel(1.9, 1.9, new THREE.MeshLambertMaterial({ color: 0x7d7468, flatShading: true }), 0, 4.95, 0, g, 4);
  dak.rotation.y = Math.PI / 4;
  cilinder(0.05, 0.8, KLEUR.hout[0], 0, 6.1, 0, g, 4);

  // Laddertje aan de noordkant.
  for (const lx of [-0.4, 0.4]) {
    const zijkant = cilinder(0.05, 1.9, KLEUR.hout[1], lx, 0.8, -1.55, g, 5);
    zijkant.rotation.x = -0.3;
  }
  for (let i = 0; i < 4; i++) {
    const sport = cilinder(0.04, 0.8, KLEUR.hout[2], 0, 0.3 + i * 0.4, -1.75 + i * 0.12, g, 5);
    sport.rotation.z = Math.PI / 2;
  }

  // Glijbaan naar het zuiden.
  const glijMat = new THREE.MeshLambertMaterial({ color: KLEUR.metaal, emissive: 0x222222 });
  const lengte = Math.hypot(4, ph - 0.25);
  const hoek = Math.atan2(ph - 0.25, 4);
  const glij = new THREE.Group();
  glij.position.set(0, (ph + 0.25) / 2, 1.2 + 2);
  glij.rotation.x = hoek;
  g.add(glij);
  doos(0.7, 0.06, lengte, glijMat, 0, 0, 0, glij);
  doos(0.06, 0.3, lengte, glijMat, -0.35, 0.12, 0, glij);
  doos(0.06, 0.3, lengte, glijMat, 0.35, 0.12, 0, glij);

  // Op het platform kun je springen; de glijbaan is een randje.
  botsing.voegDoosToe(x - 1.2, x + 1.2, z - 1.2, z + 1.2, ph + 0.08);
  botsing.voegDoosToe(x - 0.4, x + 0.4, z + 1.2, z + 5.2, 0.9);
}

/** Zandgebied omringd door een palissade van boomstammetjes, met een hutje op palen. */
function bouwPalissade(scene, botsing, stammen, x, z) {
  const rx = 8, rz = 5.5;
  vlak(scene, ovaal(x, z, rx, rz, 31, 48, 0.05), KLEUR.zand, 0.03);
  const punten = [];
  for (let i = 0; i < 64; i++) {
    const h = (i / 64) * Math.PI * 2;
    punten.push({ x: x + Math.cos(h) * rx, z: z + Math.sin(h) * rz });
  }
  // Opening aan de westkant (naar het midden van het plein).
  const inOpening = (px, pz) => px < x - rx * 0.8 && Math.abs(pz - z) < 1.6;
  const voor = stammen.lijst.length;
  stammen.langsRand(punten, { afstand: 0.3, r: 0.14, hoogte: 1.1, variatie: 0.35, opening: inOpening });
  for (let i = voor; i < stammen.lijst.length; i += 2) {
    const s = stammen.lijst[i];
    botsing.voegCirkelToe(s.x, s.z, 0.32, s.h);
  }

  // Hutje op palen met puntdak.
  const hx = x + 3, hz = z + 0.5, ph = 1.2;
  const g = new THREE.Group();
  g.position.set(hx, 0, hz);
  scene.add(g);
  for (const [px, pz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    cilinder(0.12, ph + 1.6, KLEUR.hout[1], px, (ph + 1.6) / 2, pz, g, 6);
    botsing.voegCirkelToe(hx + px, hz + pz, 0.16, 3);
  }
  doos(2.3, 0.15, 2.3, KLEUR.hout[2], 0, ph, 0, g);
  for (const [wx, wz, b, d] of [[0, -1.1, 2.2, 0.08], [1.1, 0, 0.08, 2.2], [0, 1.1, 2.2, 0.08]]) {
    doos(b, 0.9, d, KLEUR.hout[3], wx, ph + 0.5, wz, g);
  }
  const dak = kegel(2, 2.2, new THREE.MeshLambertMaterial({ color: 0x7d7468, flatShading: true }), 0, ph + 2.4, 0, g, 4);
  dak.rotation.y = Math.PI / 4;
  botsing.voegDoosToe(hx - 1.15, hx + 1.15, hz - 1.15, hz + 1.15, ph + 0.08);
}

/** Plantvakken met een randje van stammetjes, wilgjes en struiken. */
function bouwBorders(scene, botsing, stammen) {
  const borders = [
    { x: -24, z: -19, rx: 3.2, rz: 2, wilgen: [[-1, 0]], struiken: [[1.4, 0.3, KLEUR.struik]] },
    { x: 18, z: 22, rx: 4.5, rz: 3, wilgen: [[-1.5, -0.5], [1.8, 0.4]], struiken: [[0.2, 0.8, KLEUR.roodStruik], [-2.5, 1, KLEUR.struik]] },
    { x: -22, z: 14, rx: 4, rz: 2.8, wilgen: [[0.5, -0.4]], struiken: [[-1.8, 0.6, KLEUR.struik], [2.2, 0.8, KLEUR.struik]] },
    { x: -30, z: 24, rx: 4, rz: 3, wilgen: [[1, 0]], struiken: [[-1.6, 0.4, KLEUR.roodStruik]] },
  ];
  borders.forEach((b, i) => {
    const omtrek = ovaal(b.x, b.z, b.rx, b.rz, 40 + i, 36, 0.1);
    vlak(scene, omtrek, KLEUR.zand, 0.03);
    stammen.langsRand(omtrek);
    for (const [wx, wz] of b.wilgen) wilg(scene, botsing, b.x + wx, b.z + wz, 1 + (i % 2) * 0.2, i);
    for (const [sx, sz, kleur] of b.struiken) struik(scene, botsing, b.x + sx, b.z + sz, 1, kleur);
  });
}

function bouwHinkelbaan(scene, x, z) {
  const textuur = canvasTextuur(256, 768, (ctx, b, h) => {
    ctx.clearRect(0, 0, b, h);
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 8;
    ctx.font = 'bold 60px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const kleuren = ['#ff8787', '#ffe066', '#74c0fc', '#8ce99a', '#e599f7'];
    const vak = (vx, vy, n) => {
      ctx.strokeRect(vx, vy, 120, 120);
      ctx.fillStyle = kleuren[n % 5];
      ctx.fillText(String(n), vx + 60, vy + 62);
    };
    vak(68, 640, 1); vak(68, 520, 2); vak(8, 400, 3); vak(128, 400, 4);
    vak(68, 280, 5); vak(8, 160, 6); vak(128, 160, 7); vak(68, 40, 8);
  });
  const m = grondVlak(2.6, 7.8, new THREE.MeshLambertMaterial({ map: textuur, transparent: true }), x, z, 0.025, scene);
  m.userData.grond = true;
}

function bouwVlaggenmast(scene, botsing, x, z, animaties) {
  cilinder(0.08, 8, 0xdddddd, x, 4, z, scene, 8);
  bol(0.15, KLEUR.geel, x, 8.05, z, scene);
  botsing.voegCirkelToe(x, z, 0.15, 8);
  const vlag = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 1.2, 8, 1),
    new THREE.MeshLambertMaterial({ color: KLEUR.oranje, side: THREE.DoubleSide }),
  );
  vlag.position.set(x + 1.05, 7.2, z);
  vlag.castShadow = true;
  vlag.userData.geenKlik = true;
  scene.add(vlag);
  const pos = vlag.geometry.attributes.position;
  const basis = Float32Array.from(pos.array);
  animaties.push((dt, t) => {
    for (let i = 0; i < pos.count; i++) {
      const bx = basis[i * 3] + 1; // 0 bij de mast, 2 aan het uiteinde
      pos.array[i * 3 + 2] = Math.sin(t * 4 - bx * 2.2) * 0.12 * bx;
    }
    pos.needsUpdate = true;
  });
}

/* ---------- Bankjes en groen ---------- */

function bankje(scene, botsing, x, z, draai) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = draai;
  scene.add(g);
  doos(2.2, 0.12, 0.6, KLEUR.bankHout, 0, 0.5, 0, g);
  doos(2.2, 0.5, 0.1, KLEUR.bankHout, 0, 0.85, -0.3, g);
  for (const lx of [-0.9, 0.9]) {
    doos(0.1, 0.5, 0.55, 0x444a52, lx, 0.25, 0, g);
    doos(0.1, 0.6, 0.1, 0x444a52, lx, 0.8, -0.3, g);
  }
  const breed = Math.abs(Math.cos(draai)) > 0.5;
  const hx = breed ? 1.1 : 0.32, hz = breed ? 0.32 : 1.1;
  botsing.voegDoosToe(x - hx, x + hx, z - hz, z + hz, 0.56);
}

function bouwBankjes(scene, botsing) {
  bankje(scene, botsing, -12, -19.5, 0);
  bankje(scene, botsing, 18, -19.5, 0);
  bankje(scene, botsing, -31, 4, Math.PI / 2);
  bankje(scene, botsing, 37.5, -9, -Math.PI / 2);
  bankje(scene, botsing, 10, 26, Math.PI);
}

function struik(scene, botsing, x, z, schaal, kleuren) {
  const rnd = zaadRandom(Math.abs(Math.round(x * 13 + z * 7)) + 1);
  for (let i = 0; i < 3; i++) {
    const m = new THREE.MeshLambertMaterial({ color: kleuren[i % kleuren.length], flatShading: true });
    const b = bol((0.6 + rnd() * 0.3) * schaal, m, x + (rnd() - 0.5) * 1.2 * schaal, 0.55 * schaal, z + (rnd() - 0.5) * 0.8 * schaal, scene, 0);
    b.scale.y = 0.85;
  }
  botsing.voegCirkelToe(x, z, 0.9 * schaal, 1.1 * schaal);
}

/** Jong wilgje met veerachtige, geelgroene takken. */
function wilg(scene, botsing, x, z, schaal, zaad) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.scale.setScalar(schaal);
  scene.add(g);
  cilinder(0.1, 2, KLEUR.stam, 0, 1, 0, g, 6);
  const rnd = zaadRandom(zaad + 50);
  for (let i = 0; i < 7; i++) {
    const m = new THREE.MeshLambertMaterial({ color: KLEUR.wilg[i % KLEUR.wilg.length], flatShading: true });
    const h = (i / 7) * Math.PI * 2;
    const tak = bol(0.55 + rnd() * 0.2, m, Math.cos(h) * 0.6, 2.6 + rnd() * 0.9, Math.sin(h) * 0.6, g, 0);
    tak.scale.set(0.8, 1.9, 0.8);
    tak.rotation.z = Math.cos(h) * 0.3;
    tak.rotation.x = -Math.sin(h) * 0.3;
  }
  botsing.voegCirkelToe(x, z, 0.2, 10);
}

/** Grote eik, zoals achter op het plein. */
function eik(scene, botsing, x, z, schaal = 1, zaad = 0, schaduw = true) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.scale.setScalar(schaal);
  scene.add(g);
  const stam = cilinder(0.45, 5, KLEUR.stam, 0, 2.5, 0, g, 7);
  stam.castShadow = schaduw;
  const rnd = zaadRandom(zaad + 3);
  const delen = [[0, 7, 0, 3.2], [2.2, 6.2, 0.8, 2.4], [-2, 6.4, -0.6, 2.5], [0.6, 6, -2, 2.3], [-0.5, 8.6, 0.5, 2.2]];
  for (const [bx, by, bz, r] of delen) {
    const m = mat(KLEUR.eik[Math.floor(rnd() * KLEUR.eik.length)], { flatShading: true });
    const b = bol(r * (0.9 + rnd() * 0.2), m, bx, by, bz, g, 0);
    b.castShadow = schaduw;
  }
  if (botsing) botsing.voegCirkelToe(x, z, 0.6 * schaal, 20);
}

function bouwBomen(scene, botsing) {
  // Eiken op het plein (vooral achteraan, zoals op de foto's).
  [[-33.5, -7.5], [-14, 27], [27, 26], [37, 18], [-36, 27]].forEach(([x, z], i) => eik(scene, botsing, x, z, 0.9 + (i % 3) * 0.1, i));

  // Eiken tussen het hek en de straat.
  const rnd = zaadRandom(42);
  for (let x = -38; x <= 40; x += 9 + rnd() * 4) eik(scene, null, x, 33.5 + rnd() * 2, 1 + rnd() * 0.3, 10 + x, false);
  for (let z = -26; z <= 26; z += 10 + rnd() * 4) eik(scene, null, -43.5 - rnd(), z, 1 + rnd() * 0.3, 30 + z, false);
  for (let z = -26; z <= 26; z += 9 + rnd() * 5) eik(scene, null, 44 + rnd() * 3, z, 1 + rnd() * 0.3, 60 + z, false);
  for (let x = -38; x <= 40; x += 10 + rnd() * 5) eik(scene, null, x, -36 - rnd() * 4, 1.1 + rnd() * 0.3, 90 + x, false);
}

/* ---------- De buurt: straat, rijtjeshuizen en auto's ---------- */

function bouwBuurt(scene) {
  const asfalt = mat(0x5d6166);
  const stoep = mat(0xa9a59d);
  grondVlak(160, 6, asfalt, 0, 40.5, 0.015, scene);
  grondVlak(160, 2, stoep, 0, 44.5, 0.02, scene);
  grondVlak(6, 120, asfalt, -48.5, 0, 0.016, scene);
  grondVlak(2, 120, stoep, -52.5, 0, 0.021, scene);

  const rnd = zaadRandom(99);
  const gevels = [0xb08a6a, 0xa77c5e, 0xc29a78, 0x9c7458];
  const huizenRij = (startX, startZ, aantal, stapX, stapZ, draai) => {
    for (let i = 0; i < aantal; i++) {
      huis(scene, startX + stapX * i, startZ + stapZ * i, draai, gevels[Math.floor(rnd() * gevels.length)]);
    }
  };
  huizenRij(-56, 50, 17, 7, 0, 0); // zuidkant, kijkt naar het plein
  huizenRij(-58, -36, 11, 0, 7, -Math.PI / 2); // westkant

  const autoKleuren = [0xffffff, 0xd9473e, 0x3b4a6b, 0xbfc5cc, 0x2b2f33, 0x74c0fc];
  [[-30, 42.5, 0], [-18, 42.5, 0], [5, 42.5, 0], [22, 42.5, 0], [35, 38.5, Math.PI], [-46.5, -10, Math.PI / 2], [-46.5, 18, Math.PI / 2]]
    .forEach(([x, z, d], i) => auto(scene, x, z, d, autoKleuren[i % autoKleuren.length]));
}

function huis(scene, x, z, draai, kleur) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = draai;
  scene.add(g);
  const b = 6.8, d = 8, h = 6;
  const romp = doos(b, h, d, kleur, 0, h / 2, 0, g);
  romp.castShadow = false;
  // Zadeldak als driehoekig prisma.
  const vorm = new THREE.Shape([new THREE.Vector2(-d / 2 - 0.3, 0), new THREE.Vector2(d / 2 + 0.3, 0), new THREE.Vector2(0, 3.2)]);
  const dakGeo = new THREE.ExtrudeGeometry(vorm, { depth: b, bevelEnabled: false });
  dakGeo.translate(0, 0, -b / 2);
  const dak = new THREE.Mesh(dakGeo, mat(0x6b4a3a));
  dak.rotation.y = Math.PI / 2;
  dak.position.y = h;
  g.add(dak);
  // Ramen en deur aan de voorkant (+z na draaien = kant van het plein).
  for (const [wx, wy] of [[-1.6, 1.6], [1.4, 1.6], [-1.6, 4.3], [1.4, 4.3]]) {
    doos(1.6, 1.3, 0.1, 0xffffff, wx, wy, -d / 2 - 0.05, g).castShadow = false;
    doos(1.4, 1.1, 0.12, 0x6d8fa8, wx, wy, -d / 2 - 0.06, g).castShadow = false;
  }
  doos(1, 2.1, 0.12, 0x4b5d3a, 0, 1.05, -d / 2 - 0.06, g).castShadow = false;
  doos(b, 1.2, 0.8, KLEUR.struik[1], 0, 0.6, -d / 2 - 1.6, g).castShadow = false; // heggetje
}

function auto(scene, x, z, draai, kleur) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = draai;
  scene.add(g);
  doos(4, 0.8, 1.8, kleur, 0, 0.65, 0, g);
  doos(2.2, 0.65, 1.6, kleur, -0.2, 1.35, 0, g);
  doos(2.0, 0.5, 1.65, 0x6d8fa8, -0.2, 1.35, 0, g);
  for (const [wx, wz] of [[-1.3, 0.85], [1.3, 0.85], [-1.3, -0.85], [1.3, -0.85]]) {
    const w = cilinder(0.35, 0.25, 0x222222, wx, 0.35, wz, g, 10);
    w.rotation.x = Math.PI / 2;
  }
}

/* ---------- Lucht ---------- */

function bouwWolken(scene, animaties) {
  const rnd = zaadRandom(9);
  const wolkMat = new THREE.MeshLambertMaterial({ color: 0xffffff, flatShading: true, emissive: 0x666666 });
  const wolken = [];
  for (let i = 0; i < 9; i++) {
    const w = new THREE.Group();
    const delen = 3 + Math.floor(rnd() * 3);
    for (let j = 0; j < delen; j++) {
      const d = new THREE.Mesh(new THREE.IcosahedronGeometry(3 + rnd() * 2, 0), wolkMat);
      d.position.set(j * 3.5 - delen * 1.7, rnd() * 1.5, rnd() * 3);
      d.userData.geenKlik = true;
      w.add(d);
    }
    w.scale.y = 0.55;
    w.position.set(-120 + rnd() * 240, 45 + rnd() * 15, -100 + rnd() * 160);
    scene.add(w);
    wolken.push(w);
  }
  animaties.push((dt) => {
    for (const w of wolken) {
      w.position.x += dt * 1.5;
      if (w.position.x > 130) w.position.x = -130;
    }
  });
}
