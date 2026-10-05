import * as THREE from 'three';
import { mat, doos, cilinder, kegel, bol, canvasTextuur, tekstTextuur } from './helpers.js';
import { KRAMEN } from '../data/oefeningen.js';
import { Karakter, STIJLEN } from '../karakters.js';

// Uiterlijk per kraam (kleuren, karakters, versiering).
const UITERLIJK = {
  kofschip: { kleur: 0x8b3a2b, luifel: ['#d9473e', '#ffffff'], bord: '#d9473e', stem: 0.7, karakters: ['kapitein'], versier: versierPiraat },
  taarten: { kleur: 0xf3a6c0, luifel: ['#f783ac', '#fff0f6'], bord: '#e64980', stem: 1.25, karakters: ['tessa'], versier: versierTaarten },
  drummer: { kleur: 0x2a6fb5, luifel: ['#1c7ed6', '#ffd43b'], bord: '#1c7ed6', stem: 0.9, karakters: ['dirk'], versier: versierDrums },
  voorvoegsel: { kleur: 0x8d5bd6, luifel: ['#9c36b5', '#ffffff'], bord: '#9c36b5', stem: 1.35, karakters: ['vera'], versier: versierLetters },
  poffertjes: { kleur: 0xff8a2a, luifel: ['#fd7e14', '#ffffff'], bord: '#e8590c', stem: 1, stemmen: { 'Peter Persoonsvorm': 0.75, 'Olga Onderwerp': 1.35 }, karakters: ['peter', 'olga'], versier: versierPoffertjes },
  ijs: { kleur: 0x38d9a9, luifel: ['#12b886', '#e6fcf5'], bord: '#0ca678', stem: 1.1, karakters: ['gijs'], versier: versierIjs },
};

// De kramen staan in een U rond het midden van het plein; de opening wijst naar de ingang (zuid).
const MIDDEN = new THREE.Vector2(0, 5);
const STRAAL = 13;
const HOEKEN = [200, 228, 256, 284, 312, 340];

/** Bouwt de zes kramen. Geeft per kraam: data, groep, praatplek en karakters. */
export function bouwKramen(scene, botsing) {
  return KRAMEN.map((data, i) => {
    const hoek = THREE.MathUtils.degToRad(HOEKEN[i]);
    const x = MIDDEN.x + Math.cos(hoek) * STRAAL;
    const z = MIDDEN.y + Math.sin(hoek) * STRAAL;
    const draai = Math.atan2(MIDDEN.x - x, MIDDEN.y - z); // voorkant naar het midden
    return bouwKraam(scene, botsing, data, UITERLIJK[data.id], x, z, draai);
  });
}

function streepTextuur([a, b]) {
  return canvasTextuur(256, 64, (ctx, w, h) => {
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 ? b : a;
      ctx.fillRect((i * w) / 8, 0, w / 8 + 1, h);
    }
  });
}

function schulpRandTextuur([a, b]) {
  return canvasTextuur(512, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const n = 8;
    for (let i = 0; i < n; i++) {
      ctx.fillStyle = i % 2 ? b : a;
      const x = (i * w) / n;
      ctx.fillRect(x, 0, w / n + 1, h * 0.45);
      ctx.beginPath();
      ctx.arc(x + w / n / 2, h * 0.45, w / n / 2, 0, Math.PI);
      ctx.fill();
    }
  });
}

function bouwKraam(scene, botsing, data, stijl, x, z, draai) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  g.rotation.y = draai;
  scene.add(g);
  const hout = 0x9a6a3c;

  // Toonbank.
  doos(3.6, 1.05, 0.7, stijl.kleur, 0, 0.525, 0.7, g);
  doos(3.62, 0.16, 0.72, 0xffffff, 0, 0.82, 0.7, g);
  doos(3.9, 0.08, 0.95, hout, 0, 1.09, 0.7, g);
  // Zijkantjes en achterbank.
  doos(0.08, 1.05, 2, stijl.kleur, -1.85, 0.525, -0.1, g);
  doos(0.08, 1.05, 2, stijl.kleur, 1.85, 0.525, -0.1, g);
  doos(3.4, 0.9, 0.5, hout, 0, 0.45, -1.15, g);

  for (const px of [-1.9, 1.9]) {
    for (const pz of [-1.25, 1.1]) cilinder(0.07, 3.45, hout, px, 1.725, pz, g, 8);
  }

  // Gestreepte luifel met een geschulpt randje.
  const luifel = doos(4.5, 0.05, 3.1, new THREE.MeshLambertMaterial({ map: streepTextuur(stijl.luifel) }), 0, 3.48, 0.15, g);
  luifel.rotation.x = 0.17;
  const rand = new THREE.Mesh(
    new THREE.PlaneGeometry(4.5, 0.4),
    new THREE.MeshLambertMaterial({ map: schulpRandTextuur(stijl.luifel), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }),
  );
  rand.position.set(0, 3.02, 1.69);
  g.add(rand);

  // Groot naambord, leesbaar van voren én van achteren.
  const bordTex = tekstTextuur(data.kraamNaam, { rand: stijl.bord, grootte: 120 });
  const bordMat = new THREE.MeshLambertMaterial({ map: bordTex });
  const randMat = mat(0xffffff);
  const bord = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 0.08), [randMat, randMat, randMat, randMat, bordMat, bordMat]);
  bord.position.set(0, 4.25, 1.2);
  bord.castShadow = true;
  g.add(bord);
  for (const px of [-1.6, 1.6]) cilinder(0.04, 0.6, hout, px, 3.65, 1.2, g, 6);

  stijl.versier(g);

  // Karakter(s) achter de toonbank.
  const karakters = stijl.karakters.map((naam, i, lijst) => {
    const k = new Karakter(STIJLEN[naam]);
    const offset = lijst.length > 1 ? (i === 0 ? -0.75 : 0.75) : 0;
    k.groep.position.set(offset, 0, -0.35);
    g.add(k.groep);
    return k;
  });

  g.traverse((o) => { if (o.isMesh) o.receiveShadow = true; });

  // Waar de speler staat om te praten, en botsing van de kraam (twee cirkels).
  const praatPunt = new THREE.Vector3(0, 0, 2.6).applyEuler(g.rotation).add(g.position);
  for (const lx of [-1.05, 1.05]) {
    const p = new THREE.Vector3(lx, 0, 0).applyEuler(g.rotation).add(g.position);
    botsing.voegCirkelToe(p.x, p.z, 1.45, 4);
  }
  g.userData.loopDoel = praatPunt;

  return {
    data,
    stijl,
    groep: g,
    praatPunt,
    karakters,
    update(dt, t, spelerPos) {
      for (const k of karakters) k.update(dt, t, spelerPos);
    },
  };
}

/* ---------- Versieringen op de toonbank ---------- */

const BLAD = 1.13; // hoogte van het toonbankblad

function versierPiraat(g) {
  for (const [x, schaal] of [[-1.1, 1], [1.1, 0.8]]) {
    const kist = new THREE.Group();
    kist.position.set(x, BLAD, 0.7);
    kist.scale.setScalar(schaal);
    g.add(kist);
    doos(0.7, 0.4, 0.45, 0x7a4a24, 0, 0.2, 0, kist);
    const deksel = new THREE.Mesh(new THREE.CylinderGeometry(0.225, 0.225, 0.7, 10, 1, false, 0, Math.PI), mat(0x8b5a2b));
    deksel.rotation.z = Math.PI / 2;
    deksel.position.y = 0.4;
    kist.add(deksel);
    doos(0.72, 0.06, 0.47, 0xf2c230, 0, 0.38, 0, kist);
    doos(0.1, 0.14, 0.05, 0xf2c230, 0, 0.3, 0.24, kist);
  }
  // Gouden muntjes.
  for (let i = 0; i < 7; i++) {
    const munt = cilinder(0.07, 0.02, 0xf2c230, -0.3 + (i % 4) * 0.18, BLAD + 0.01 + Math.floor(i / 4) * 0.02, 0.6 + (i % 2) * 0.15, g, 10);
    munt.castShadow = false;
  }
  // Piratenvlag op het dak.
  cilinder(0.03, 1.4, 0x5a3a22, 2.05, 4.2, -1.25, g, 5);
  const vlag = doos(0.7, 0.45, 0.02, 0x1d1d1d, 2.4, 4.65, -1.25, g);
  bol(0.08, 0xffffff, 0, 0.02, 0.02, vlag);
}

function versierTaarten(g) {
  const taart = (x, z, kleur, lagen) => {
    for (let l = 0; l < lagen; l++) {
      const r = 0.28 - l * 0.07;
      cilinder(r, 0.16, l % 2 ? 0xffffff : kleur, x, BLAD + 0.08 + l * 0.16, z, g, 14);
    }
    bol(0.05, 0xe03131, x, BLAD + lagen * 0.16 + 0.04, z, g);
  };
  taart(-1.2, 0.7, 0xf783ac, 3);
  taart(-0.45, 0.75, 0x8b5a2b, 2);
  taart(1.2, 0.7, 0xffd43b, 3);
  // Taartjes onder een glazen stolp.
  cilinder(0.25, 0.04, 0xdddddd, 0.45, BLAD + 0.02, 0.7, g, 14);
  cilinder(0.18, 0.12, 0xf783ac, 0.45, BLAD + 0.1, 0.7, g, 12);
  const stolp = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshLambertMaterial({ color: 0xd0ebff, transparent: true, opacity: 0.35 }));
  stolp.position.set(0.45, BLAD + 0.04, 0.7);
  g.add(stolp);
}

function versierDrums(g) {
  const trom = (x, z, r, h, kleur) => {
    cilinder(r, h, kleur, x, BLAD + h / 2, z, g, 16);
    cilinder(r * 1.01, 0.02, 0xf8f9fa, x, BLAD + h + 0.01, z, g, 16);
    cilinder(r * 1.03, 0.04, 0xc0c0c0, x, BLAD + 0.02, z, g, 16);
  };
  trom(-1.2, 0.7, 0.3, 0.35, 0xd9473e);
  trom(1.25, 0.7, 0.25, 0.3, 0xd9473e);
  trom(0, 0.5, 0.3, 0.18, 0xf8f9fa); // snaredrum, recht voor Dirk
  // Bekken op een standaard.
  cilinder(0.02, 0.6, 0xc0c0c0, 0.65, BLAD + 0.3, 0.8, g, 5);
  const bekken = cilinder(0.22, 0.02, 0xf2c230, 0.65, BLAD + 0.62, 0.8, g, 16);
  bekken.rotation.x = 0.2;
}

function letterTextuur(tekst, kleur) {
  return canvasTextuur(128, 128, (ctx, w, h) => {
    ctx.fillStyle = kleur;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${tekst.length > 2 ? 46 : 60}px "Trebuchet MS", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tekst, w / 2, h / 2 + 4);
  });
}

function versierLetters(g) {
  const woorden = [['be', '#e64980'], ['ge', '#1c7ed6'], ['ver', '#f59f00'], ['her', '#37b24d'], ['ont', '#7048e8']];
  woorden.forEach(([tekst, kleur], i) => {
    const blok = doos(0.38, 0.38, 0.38, new THREE.MeshLambertMaterial({ map: letterTextuur(tekst, kleur) }),
      -1.3 + i * 0.65, BLAD + 0.19, 0.7 + (i % 2) * 0.08, g);
    blok.rotation.y = (i - 2) * 0.12;
  });
  // Stapel boeken.
  const kleuren = [0x2a6fb5, 0xd9473e, 0xf2c230];
  kleuren.forEach((k, i) => doos(0.5, 0.1, 0.35, k, 1.45, BLAD + 0.05 + i * 0.1, 0.35, g).rotation.y = i * 0.2);
}

function versierPoffertjes(g) {
  const pan = cilinder(0.6, 0.08, 0x2b2f33, -0.6, BLAD + 0.08, 0.7, g, 20);
  pan.scale.z = 0.6;
  for (let r = 0; r < 3; r++) {
    for (let k = 0; k < 6; k++) {
      const p = bol(0.06, 0xc98b3c, -0.95 + k * 0.14, BLAD + 0.15, 0.55 + r * 0.14, g, 1);
      p.scale.y = 0.6;
      p.castShadow = false;
    }
  }
  // Bordje met poffertjes en poedersuiker.
  cilinder(0.25, 0.03, 0xffffff, 0.8, BLAD + 0.02, 0.7, g, 16);
  for (let i = 0; i < 6; i++) {
    const p = bol(0.06, 0xd9a05b, 0.7 + (i % 3) * 0.1, BLAD + 0.07, 0.65 + Math.floor(i / 3) * 0.1, g, 1);
    p.scale.y = 0.6;
  }
  bol(0.06, 0xffffff, 0.8, BLAD + 0.11, 0.7, g).scale.y = 0.4;
  cilinder(0.06, 0.18, 0xffffff, 1.4, BLAD + 0.09, 0.8, g, 8); // suikerpot
}

function versierIjs(g) {
  // Vriesbak met bakken ijs.
  doos(1.6, 0.12, 0.7, 0xdee2e6, -0.55, BLAD + 0.06, 0.7, g);
  const smaken = [0xfff3bf, 0xf783ac, 0x8b5a2b, 0x69db7c];
  smaken.forEach((s, i) => doos(0.34, 0.06, 0.5, s, -1.1 + i * 0.37, BLAD + 0.14, 0.7, g));
  // Hoorntjes met bolletjes.
  [[0.75, [0xf783ac, 0xfff3bf]], [1.25, [0x8b5a2b, 0x69db7c, 0xf783ac]]].forEach(([x, bollen]) => {
    const hoorn = kegel(0.1, 0.35, 0xe0a85a, x, BLAD + 0.18, 0.7, g, 8);
    hoorn.rotation.x = Math.PI;
    bollen.forEach((k, i) => bol(0.12, k, x, BLAD + 0.42 + i * 0.18, 0.7, g, 1));
  });
}
