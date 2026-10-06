import * as THREE from 'three';
import { mat, doos, cilinder, kegel, bol, canvasTextuur } from '../wereld/helpers.js';
import { Botsing } from '../wereld/botsing.js';
import { LEERGROEP, LOKALEN } from '../data/rekenen.js';

/*
 * Leergroep 3: de binnenwereld in de school, nagebouwd naar de foto's.
 * - Een lang, hoog leerplein met een lichtstraat in het dak, schuine grijze plafondplaten en hanglampen.
 * - Links drie lokalen met oranje wanden, rechts drie met gele/oker wanden.
 * - Bij de ingang blauwe nissen: een U-vormige werkplek van blauwe schotten en kasten met verf.
 * - Lage kasten van licht hout met groene bakjes, lange tafels, oranje stoeltjes en vlaggetjes.
 * Plafonds en buitenmuren zijn vlakken die maar van één kant zichtbaar zijn, en boven de lage
 * lokaalmuren is het open: de camera (schuin boven de speler) kijkt zo altijd de ruimte in.
 * Wordt pas gebouwd als je naar binnen gaat, en weer opgeruimd (dispose) als je naar buiten gaat.
 */

const KLEUR = {
  muur: 0xf3f0e8, oranje: 0xe0682c, geel: 0xdca52c, blauw: 0x5a7394, blauwLicht: 0x6d87a8,
  hout: 0xe4cfa6, houtRand: 0xd2b98d, groenBak: 0x93c83e, poot: 0x9aa3ad, glas: 0xbfe0ee,
  stoel: 0xef8a2b, blad: 0xe9e4d8, kozijn: 0x8a5a3a,
};

export const BINNEN_GRENZEN = { minX: -14.5, maxX: 14.5, minZ: -31, maxZ: 9 };
const HAL = 4.5; // halve breedte van het leerplein
const MUURH = 3.2; // hoogte van de lokaalmuren en lage plafonds
const DIK = 0.3; // muurdikte
const DEUR = 2.4; // breedte van een deuropening
const HALDAK = { laag: 5, hoog: 7.2, licht: 1.6 }; // schuin dak van het leerplein

/** Middelpunt en kant van lokaal i (0..5). Lokaal 1-3 links (x < 0), 4-6 rechts. */
export function lokaalPlek(i) {
  const kant = i < 3 ? -1 : 1;
  const zMax = -1 - (i % 3) * 10;
  return { kant, zMin: zMax - 10, zMax, zc: zMax - 5, xc: kant * 9.5 };
}

/* ---------- Texturen ---------- */

function vloerTextuur(basis, streep) {
  const t = canvasTextuur(256, 256, (ctx, b, h) => {
    ctx.fillStyle = basis;
    ctx.fillRect(0, 0, b, h);
    // Fijne strepen in het linoleum (in de lengte van het leerplein).
    let zaad = 11;
    const rnd = () => { zaad = (zaad * 16807) % 2147483647; return zaad / 2147483647; };
    for (let i = 0; i < 70; i++) {
      ctx.fillStyle = rnd() < 0.5 ? streep : 'rgba(255,255,255,.18)';
      const x = rnd() * b, y = rnd() * h;
      ctx.fillRect(x, y, 1, 30 + rnd() * 120);
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function tegelTextuur({ basis = '#f4f4f1', lijn = '#d6d6d0', lampen = true } = {}) {
  const t = canvasTextuur(128, 128, (ctx, b, h) => {
    ctx.fillStyle = basis;
    ctx.fillRect(0, 0, b, h);
    ctx.strokeStyle = lijn;
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, b, h);
    ctx.beginPath(); ctx.moveTo(b / 2, 0); ctx.lineTo(b / 2, h); ctx.moveTo(0, h / 2); ctx.lineTo(b, h / 2); ctx.stroke();
    if (lampen) { // inbouwspotje
      ctx.fillStyle = '#fffbe6';
      ctx.beginPath(); ctx.arc(b / 4, h / 4, 7, 0, Math.PI * 2); ctx.fill();
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function akoestischTextuur() {
  // Grijze akoestische platen, schuin gelegd zoals op de foto.
  const t = canvasTextuur(128, 128, (ctx, b, h) => {
    ctx.fillStyle = '#c9c7c0';
    ctx.fillRect(0, 0, b, h);
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,.25)' : 'rgba(0,0,0,.06)';
      ctx.fillRect(Math.random() * b, Math.random() * h, 2, 2);
    }
    ctx.strokeStyle = '#b3b0a8';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(b, h); ctx.moveTo(b, 0); ctx.lineTo(0, h); ctx.stroke();
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

function lokaalBordTextuur(lokaal, kleur) {
  return canvasTextuur(768, 216, (ctx, b, h) => {
    ctx.fillStyle = '#1d2b4f';
    ctx.beginPath(); ctx.roundRect(0, 0, b, h, 30); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.roundRect(10, 10, b - 20, h - 20, 22); ctx.fill();
    // Groot nummer in een rondje.
    ctx.fillStyle = kleur;
    ctx.beginPath(); ctx.arc(108, h / 2, 82, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 120px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(String(lokaal.nummer), 108, h / 2 + 6);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#1d2b4f';
    let s = 92;
    do { ctx.font = `bold ${s}px "Trebuchet MS", sans-serif`; s -= 4; } while (ctx.measureText(lokaal.naam).width > b - 240 && s > 30);
    ctx.fillText(lokaal.naam, 214, 88);
    ctx.fillStyle = '#5c6b7a';
    ctx.font = 'bold 50px "Trebuchet MS", sans-serif';
    ctx.fillText(lokaal.onderwerp, 216, 160);
  });
}

function tekstBordTextuur(tekst, { achter = '#ffffff', kleur = '#1d2b4f', rand = '#1d2b4f', b = 768, h = 192 } = {}) {
  return canvasTextuur(b, h, (ctx, w, hh) => {
    ctx.fillStyle = rand;
    ctx.beginPath(); ctx.roundRect(0, 0, w, hh, 28); ctx.fill();
    ctx.fillStyle = achter;
    ctx.beginPath(); ctx.roundRect(10, 10, w - 20, hh - 20, 20); ctx.fill();
    let s = 110;
    do { ctx.font = `bold ${s}px "Trebuchet MS", sans-serif`; s -= 4; } while (ctx.measureText(tekst).width > w - 70 && s > 24);
    ctx.fillStyle = kleur;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(tekst, w / 2, hh / 2 + 5);
  });
}

/** Whiteboard met iets van het rekenonderwerp erop. */
function whiteboardTextuur(id) {
  return canvasTextuur(512, 208, (ctx, b, h) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, b, h);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 64px "Comic Sans MS", "Trebuchet MS", sans-serif';
    const regels = {
      plus: ['348 + 275', '#1c7ed6'],
      min: ['703 − 258', '#e03131'],
      keer: ['126 × 4', '#2b8a3e'],
      deel: ['864 : 4', '#7048e8'],
      tafel: ['7 × 8 = 56', '#e8590c'],
    }[id];
    if (regels) {
      ctx.fillStyle = regels[1];
      ctx.fillText(regels[0], b / 2, h / 2);
    } else {
      // Klok getekend op het bord.
      ctx.strokeStyle = '#1d2b4f'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(b / 2, h / 2, 80, 0, Math.PI * 2); ctx.stroke();
      ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(b / 2, h / 2); ctx.lineTo(b / 2, h / 2 - 62); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(b / 2, h / 2); ctx.lineTo(b / 2 + 40, h / 2 + 10); ctx.stroke();
    }
  });
}

/* ---------- De binnenwereld ---------- */

export class Leergroep3 {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe7edf1);
    this.botsing = new Botsing(BINNEN_GRENZEN);
    this.blokkers = []; // binnen botst de camera nergens tegen (plafonds en muren laten haar door)
    this.kramen = []; // de rekenkramen komen in stap 2
    this.eigenMaterialen = new Set();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d2c4, 1.9));
    this.licht = new THREE.DirectionalLight(0xfff6e6, 1.4);
    this.licht.castShadow = true;
    this.licht.shadow.mapSize.set(1024, 1024);
    Object.assign(this.licht.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
    this.licht.shadow.normalBias = 0.03;
    this.scene.add(this.licht, this.licht.target);

    this.groep = new THREE.Group();
    this.scene.add(this.groep);

    this.bouwVloeren();
    this.bouwLeerplein();
    LOKALEN.forEach((l, i) => this.bouwLokaal(l, i));
    this.bouwIngang();
    this.bouwMeubelsLeerplein();

    this.groep.traverse((o) => { if (o.isMesh && !o.userData.geenSchaduw) { o.castShadow = o.castShadow ?? true; o.receiveShadow = true; } });

    // Waar je binnenkomt en waar de deur terug naar het schoolplein is.
    this.startPlek = new THREE.Vector3(0, 0, 6.6);
    this.startRichting = Math.PI; // kijkt het leerplein in
    this.deurTerug = new THREE.Vector3(0, 0, 8.1);
  }

  /** Nieuw materiaal dat bij het opruimen ook weg moet. */
  m(opties, soort = THREE.MeshLambertMaterial) {
    const materiaal = new soort(opties);
    this.eigenMaterialen.add(materiaal);
    return materiaal;
  }

  /** Muur (as-recht) met botsing. Van (x1, z1) tot (x2, z2), één van beide richtingen is 0 breed. */
  muur(x1, z1, x2, z2, h, kleur, y0 = 0) {
    const b = Math.max(Math.abs(x2 - x1), DIK), d = Math.max(Math.abs(z2 - z1), DIK);
    const mesh = doos(b, h, d, kleur, (x1 + x2) / 2, y0 + h / 2, (z1 + z2) / 2, this.groep);
    if (y0 < 1) this.botsing.voegDoosToe((x1 + x2) / 2 - b / 2, (x1 + x2) / 2 + b / 2, (z1 + z2) / 2 - d / 2, (z1 + z2) / 2 + d / 2, y0 + h);
    return mesh;
  }

  /**
   * Buitenmuur: botst wel, maar is alleen van binnenuit zichtbaar.
   * Staat de camera buiten het gebouw, dan kijkt ze er dwars doorheen naar binnen.
   * naarBinnen = richting van de binnenkant: '+x', '-x', '+z' of '-z'.
   */
  buitenMuur(x1, z1, x2, z2, h, kleur, naarBinnen, y0 = 0) {
    const langsX = Math.abs(x2 - x1) > Math.abs(z2 - z1);
    const lengte = langsX ? Math.abs(x2 - x1) : Math.abs(z2 - z1);
    const draai = { '+z': 0, '-z': Math.PI, '+x': Math.PI / 2, '-x': -Math.PI / 2 }[naarBinnen];
    const nx = Math.sin(draai), nz = Math.cos(draai);
    this.wandVlak((x1 + x2) / 2 + nx * (DIK / 2 + 0.01), y0 + h / 2, (z1 + z2) / 2 + nz * (DIK / 2 + 0.01), lengte, h, draai, kleur);
    if (y0 < 1) {
      const b = langsX ? lengte : DIK, d = langsX ? DIK : lengte;
      const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
      this.botsing.voegDoosToe(cx - b / 2, cx + b / 2, cz - d / 2, cz + d / 2, y0 + h);
    }
  }

  /** Raam in een buitenmuur (alleen van binnen zichtbaar). */
  buitenRaam(x, y, z, b, h, naarBinnen) {
    const draai = { '+z': 0, '-z': Math.PI, '+x': Math.PI / 2, '-x': -Math.PI / 2 }[naarBinnen];
    const nx = Math.sin(draai), nz = Math.cos(draai);
    this.wandVlak(x + nx * (DIK / 2 + 0.02), y, z + nz * (DIK / 2 + 0.02), b + 0.2, h + 0.2, draai, 0x6b7680);
    const glas = this.wandVlak(x + nx * (DIK / 2 + 0.03), y, z + nz * (DIK / 2 + 0.03), b, h, draai, 0);
    glas.material = this.m({ color: 0xd8eef7 }, THREE.MeshBasicMaterial);
  }

  /** Plafond (alleen van onderaf zichtbaar). */
  plafond(x, z, b, d, y, materiaal, herhaal = [b / 1.2, d / 1.2]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(b, d), materiaal);
    p.rotation.x = Math.PI / 2; // kijkt naar beneden
    p.position.set(x, y, z);
    materiaal.map?.repeat.set(...herhaal);
    p.castShadow = false;
    p.userData.geenSchaduw = true;
    this.groep.add(p);
    return p;
  }

  /** Verticaal vlak dat maar van één kant zichtbaar is (bijv. de muur boven de lokalen). */
  wandVlak(x, y, z, b, h, draaiY, kleur) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(b, h), mat(kleur));
    p.position.set(x, y, z);
    p.rotation.y = draaiY;
    p.castShadow = false;
    p.userData.geenSchaduw = true;
    this.groep.add(p);
    return p;
  }

  bouwVloeren() {
    const { minX, maxX, minZ, maxZ } = BINNEN_GRENZEN;
    // Buitenom: een rustige grijze ondergrond (zie je soms schuin van boven).
    const onder = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), mat(0xd5dade));
    onder.rotation.x = -Math.PI / 2;
    onder.position.y = -0.02;
    this.groep.add(onder);

    const lichtTex = vloerTextuur('#d3d0c8', 'rgba(110,110,110,.12)');
    lichtTex.repeat.set((maxX - minX) / 3, (maxZ - minZ) / 3);
    const vloer = new THREE.Mesh(new THREE.PlaneGeometry(maxX - minX, maxZ - minZ), this.m({ map: lichtTex }));
    vloer.rotation.x = -Math.PI / 2;
    vloer.position.set((minX + maxX) / 2, 0, (minZ + maxZ) / 2);
    vloer.userData.grond = true;
    this.groep.add(vloer);

    // De ingang heeft een blauwgrijze vloer, zoals bij de blauwe nissen op de foto.
    const blauwTex = vloerTextuur('#bcc4cc', 'rgba(70,85,110,.14)');
    blauwTex.repeat.set(20 / 3, 10 / 3);
    const ingang = new THREE.Mesh(new THREE.PlaneGeometry(20, 10), this.m({ map: blauwTex }));
    ingang.rotation.x = -Math.PI / 2;
    ingang.position.set(0, 0.008, 4);
    ingang.userData.grond = true;
    this.groep.add(ingang);
  }

  bouwLeerplein() {
    const zN = BINNEN_GRENZEN.minZ, zZ = -1; // het hoge deel van het leerplein
    const lengte = zZ - zN;
    const zMid = (zN + zZ) / 2;

    // Noordmuur van het leerplein, hoog, met een groot raam.
    this.buitenMuur(-HAL, zN, HAL, zN, HALDAK.hoog, KLEUR.muur, '+z');
    this.buitenRaam(0, 2.4, zN, 4.7, 2.9, '+z');

    // Boven de lokaalmuren blijft het open (als een poppenhuis): zo kan de camera altijd naar binnen kijken.

    // Schuine akoestische plafondplaten met de lichtstraat ertussen.
    const helling = Math.atan2(HALDAK.hoog - HALDAK.laag, HAL - HALDAK.licht);
    const breedte = Math.hypot(HALDAK.hoog - HALDAK.laag, HAL - HALDAK.licht);
    for (const kant of [-1, 1]) {
      const g = new THREE.Group();
      g.position.set(kant * (HAL + HALDAK.licht) / 2, (HALDAK.laag + HALDAK.hoog) / 2, zMid);
      g.rotation.z = -kant * helling;
      this.groep.add(g);
      const tex = akoestischTextuur();
      tex.repeat.set(breedte / 1.3, lengte / 1.3);
      const plaat = new THREE.Mesh(new THREE.PlaneGeometry(breedte, lengte), this.m({ map: tex }));
      plaat.rotation.x = Math.PI / 2;
      plaat.userData.geenSchaduw = true;
      g.add(plaat);
    }
    // Lichtstraat: helder daglicht van boven.
    const lichtstraat = new THREE.Mesh(new THREE.PlaneGeometry(HALDAK.licht * 2, lengte), this.m({ color: 0xf6fbff }, THREE.MeshBasicMaterial));
    lichtstraat.rotation.x = Math.PI / 2;
    lichtstraat.position.set(0, HALDAK.hoog, zMid);
    lichtstraat.userData.geenSchaduw = true;
    this.groep.add(lichtstraat);

    // Witte balken dwars over de lichtstraat, met zilveren hanglampen ertussen.
    for (let z = zN + 3; z < zZ; z += 6) {
      const balk = doos(HALDAK.licht * 2 + 0.4, 0.3, 0.35, 0xffffff, 0, HALDAK.hoog - 0.15, z, this.groep);
      balk.userData.geenSchaduw = true;
      balk.castShadow = false;
    }
    for (let z = zN + 6; z < zZ; z += 6) {
      const draad = cilinder(0.012, 1.6, 0xdddddd, 0, HALDAK.hoog - 0.8, z, this.groep, 4);
      draad.castShadow = false;
      const kop = cilinder(0.12, 0.3, 0xb8bec4, 0, HALDAK.hoog - 1.7, z, this.groep, 10);
      kop.castShadow = false;
      const kap = kegel(0.32, 0.42, 0xdfe4e8, 0, HALDAK.hoog - 2.0, z, this.groep, 14);
      kap.castShadow = false;
      const lamp = bol(0.13, 0xffffff, 0, HALDAK.hoog - 2.2, z, this.groep);
      lamp.material = this.m({ color: 0xfffbe6, emissive: 0xfff3bf });
      lamp.castShadow = false;
    }
  }

  bouwLokaal(lokaal, i) {
    const { kant, zMin, zMax, zc, xc } = lokaalPlek(i);
    const binnenX = kant * HAL, buitenX = kant * BINNEN_GRENZEN.maxX;
    const accent = kant < 0 ? KLEUR.oranje : KLEUR.geel;
    const accentCss = kant < 0 ? '#e0682c' : '#dca52c';

    // Muur aan het leerplein: gekleurd, met een deuropening en ramen.
    this.muur(binnenX, zMin, binnenX, zc - DEUR / 2, MUURH, accent);
    this.muur(binnenX, zc + DEUR / 2, binnenX, zMax, MUURH, accent);
    this.muur(binnenX, zc - DEUR / 2, binnenX, zc + DEUR / 2, MUURH - 2.35, accent, 2.35); // boven de deur
    for (const zr of [zMin + 2.1, zMax - 2.1]) {
      doos(DIK + 0.04, 1.5, 2.5, KLEUR.kozijn, binnenX, 1.75, zr, this.groep);
      doos(DIK + 0.08, 1.3, 2.3, KLEUR.glas, binnenX, 1.75, zr, this.groep);
    }
    // Deurkozijn en een openstaande deur (het lokaal in gedraaid).
    for (const dz of [-1, 1]) doos(DIK + 0.1, 2.35, 0.1, 0x3a3f44, binnenX, 1.175, zc + dz * (DEUR / 2 + 0.05), this.groep);
    const deur = doos(0.06, 2.25, DEUR - 0.15, accent, 0, 1.125, 0, this.groep);
    deur.position.set(binnenX + kant * (DEUR / 2), 1.125, zc - DEUR / 2 + 0.05);
    deur.rotation.y = Math.PI / 2;
    bol(0.05, 0xc0c0c0, binnenX + kant * (DEUR - 0.2), 1.05, zc - DEUR / 2 + 0.1, this.groep);

    // Groot bord boven de deur (nummer + naam van de kraam), en een hangbord in de lengte van het leerplein.
    const bordTex = lokaalBordTextuur(lokaal, accentCss);
    const bordMat = this.m({ map: bordTex });
    const bord = new THREE.Mesh(new THREE.PlaneGeometry(2.9, 0.82), bordMat);
    bord.position.set(binnenX - kant * (DIK / 2 + 0.03), 2.78, zc);
    bord.rotation.y = -kant * Math.PI / 2;
    this.groep.add(bord);
    for (const kijk of [1, -1]) {
      const hang = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 0.6), bordMat);
      hang.position.set(binnenX - kant * 1.25, 4.0, zc + DEUR / 2 + 0.5 + kijk * 0.012);
      hang.rotation.y = kijk > 0 ? 0 : Math.PI;
      hang.userData.geenSchaduw = true;
      this.groep.add(hang);
    }
    for (const dx of [-0.85, 0.85]) {
      const stang = cilinder(0.015, 0.7, 0x777777, binnenX - kant * (1.25 + dx), 4.65, zc + DEUR / 2 + 0.5, this.groep, 4);
      stang.castShadow = false;
    }

    // Overige muren: tussen de lokalen, aan de buitenkant (met ramen) en aan de noordkant.
    if (i % 3 === 2) this.buitenMuur(binnenX, zMin, buitenX, zMin, MUURH, KLEUR.muur, '+z');
    else this.muur(binnenX, zMin, buitenX, zMin, MUURH, KLEUR.muur);
    if (i % 3 === 0) this.muur(binnenX, zMax, buitenX, zMax, MUURH, KLEUR.muur);
    const binnenkant = kant > 0 ? '-x' : '+x';
    this.buitenMuur(buitenX, zMin, buitenX, zMax, MUURH, KLEUR.muur, binnenkant);
    for (const zr of [zc - 2.6, zc + 2.6]) this.buitenRaam(buitenX, 1.9, zr, 2.4, 1.6, binnenkant);

    // Plafond met witte systeemplaten en inbouwspots.
    this.plafond(xc, zc, 10, 10, MUURH, this.m({ map: tegelTextuur() }), [10 / 1.2, 10 / 1.2]);

    // Whiteboard aan de zijmuur.
    const wbX = kant * 9.5;
    doos(3.3, 1.4, 0.06, 0x9aa3ad, wbX, 1.75, zMin + DIK / 2 + 0.03, this.groep);
    const wb = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 1.25), this.m({ map: whiteboardTextuur(lokaal.id) }));
    wb.position.set(wbX, 1.75, zMin + DIK / 2 + 0.065);
    this.groep.add(wb);
    doos(3.1, 0.05, 0.12, 0x9aa3ad, wbX, 1.04, zMin + DIK / 2 + 0.09, this.groep); // pennenbakje

    // Vier tafelgroepjes in de hoeken; het midden blijft vrij voor de kraam (stap 2).
    for (const dx of [3.4, -3.0]) {
      for (const dz of [-3.3, 3.3]) this.tafelgroep(xc - kant * dx, zc + dz);
    }
    // Lage kast tegen de achtermuur, en een kast bij de deur.
    this.kast(buitenX - kant * 0.4, zc, kant > 0 ? -Math.PI / 2 : Math.PI / 2, { soort: 'bakken', breed: 2.4 });
    this.kast(binnenX + kant * 0.4, zMax - 1.3, kant > 0 ? Math.PI / 2 : -Math.PI / 2, { soort: 'open', breed: 1.4 });
    this.plant(buitenX - kant * 0.6, zMax - 0.7);
  }

  bouwIngang() {
    const zN = -1, zZ = BINNEN_GRENZEN.maxZ, rand = 10;
    // Muren rond de ingang. De linkerkant is blauw (nis met de U-werkplek), rechts ook een blauwe nis.
    this.buitenMuur(-rand, zN, -rand, zZ, MUURH, KLEUR.blauw, '+x');
    this.buitenMuur(rand, zN, rand, zZ, MUURH, KLEUR.blauw, '-x');
    this.buitenMuur(-rand, zZ, -DEUR / 2, zZ, MUURH, KLEUR.muur, '-z');
    this.buitenMuur(DEUR / 2, zZ, rand, zZ, MUURH, KLEUR.muur, '-z');
    this.buitenMuur(-DEUR / 2, zZ, DEUR / 2, zZ, MUURH - 2.4, KLEUR.muur, '-z', 2.4);
    // Blauwe achterwand van de nissen tegen de lokalen aan.
    for (const kant of [-1, 1]) this.wandVlak(kant * (HAL + rand) / 2, MUURH / 2, zN + DIK / 2 + 0.02, rand - HAL, MUURH, 0, KLEUR.blauw);
    this.plafond(0, (zN + zZ) / 2, rand * 2, zZ - zN, MUURH, this.m({ map: tegelTextuur() }), [rand * 2 / 1.2, (zZ - zN) / 1.2]);

    // De deur terug naar het schoolplein: daglicht in de opening, oranje kozijn en een bord.
    const daglicht = new THREE.Mesh(new THREE.PlaneGeometry(DEUR, 2.4), this.m({ color: 0xdff3ff }, THREE.MeshBasicMaterial));
    daglicht.position.set(0, 1.2, zZ + 0.16);
    daglicht.rotation.y = Math.PI;
    this.groep.add(daglicht);
    for (const dx of [-1, 1]) doos(0.14, 2.45, DIK + 0.1, KLEUR.oranje, dx * (DEUR / 2 + 0.07), 1.225, zZ, this.groep);
    doos(DEUR + 0.28, 0.14, DIK + 0.1, KLEUR.oranje, 0, 2.47, zZ, this.groep);
    const bord = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6),
      this.m({ map: tekstBordTextuur(`🌳 ${LEERGROEP.deurTerugBord}`, { rand: '#2f9e44' }) }));
    bord.position.set(0, 2.85, zZ - DIK / 2 - 0.02);
    bord.rotation.y = Math.PI;
    this.groep.add(bord);
    doos(2.2, 0.02, 1.2, 0x5c5f66, 0, 0.012, zZ - 0.9, this.groep); // deurmat
    // Groen nooduitgangbordje.
    const nood = doos(0.6, 0.22, 0.05, 0x2b8a3e, 0, 3.0, zZ - 1.5, this.groep);
    nood.material = this.m({ color: 0x2b8a3e, emissive: 0x1e6b2f });
    nood.castShadow = false;

    // Links: U-vormige werkplek van blauwe schotten met tafels erin.
    const ux1 = -9.2, ux2 = -5.4, uz1 = 0.8, uz2 = 4.6;
    const schot = (x1, z1, x2, z2) => this.muur(x1, z1, x2, z2, 1.15, KLEUR.blauwLicht);
    schot(ux1, uz1, ux2, uz1);
    schot(ux1, uz1, ux1, uz2);
    schot(ux2, uz1, ux2, uz2 - 1.4);
    for (const [x, z, lang] of [[(ux1 + ux2) / 2, uz1 + 0.5, true], [ux1 + 0.5, (uz1 + uz2) / 2 + 0.4, false]]) {
      this.tafel(x, z, lang ? 3.2 : 0.7, lang ? 0.7 : 2.6);
    }
    this.stoel(-7.8, uz1 + 1.3, Math.PI);
    this.stoel(-6.4, uz1 + 1.3, Math.PI);
    this.stoel(ux1 + 1.3, 3.4, -Math.PI / 2);
    // Kast met verfflessen en een kast met laatjes tegen de linker nis.
    this.verfkast(-rand + 0.35, 6.8, Math.PI / 2);
    // EHBO-koffer aan de muur.
    const ehbo = doos(0.6, 0.42, 0.16, 0xe8590c, -rand + DIK / 2 + 0.08, 1.75, 3.0, this.groep);
    ehbo.rotation.y = Math.PI / 2;
    doos(0.04, 0.2, 0.06, 0xffffff, -rand + DIK / 2 + 0.17, 1.75, 3.0, this.groep);
    doos(0.04, 0.06, 0.2, 0xffffff, -rand + DIK / 2 + 0.17, 1.75, 3.0, this.groep);

    // Rechts: blauwe nis met een ladekast, een open kast en een brandblusser.
    this.ladekast(rand - 0.45, 1.6, -Math.PI / 2);
    this.kast(rand - 0.4, 4.2, -Math.PI / 2, { soort: 'open', breed: 1.6 });
    cilinder(0.1, 0.55, 0xe03131, rand - 0.3, 0.4, 6.5, this.groep, 10);
    this.plant(6.2, 7.8);
    this.plant(-3.2, 7.8);
  }

  bouwMeubelsLeerplein() {
    const x = HAL - DIK / 2 - 0.4;
    // Lage kasten met groene bakjes langs beide wanden, tussen de deuren en ramen.
    for (let i = 0; i < 3; i++) {
      const { zc } = lokaalPlek(i);
      for (const kant of [-1, 1]) {
        this.kast(kant * x, zc + 3.7, kant > 0 ? -Math.PI / 2 : Math.PI / 2, { soort: i % 2 ? 'open' : 'bakken', breed: 1.6 });
        this.kast(kant * x, zc - 3.7, kant > 0 ? -Math.PI / 2 : Math.PI / 2, { soort: i % 2 ? 'bakken' : 'open', breed: 1.6 });
      }
    }
    // Losse kasten en lange tafels in het midden van het leerplein (zoals op de foto).
    this.kast(-1.7, -8.5, 0, { soort: 'open', breed: 1.4 });
    this.kast(1.6, -12.5, 0, { soort: 'open', breed: 1.4 });
    this.tafel(-1.4, -17.5, 0.8, 3.6);
    this.stoel(-0.6, -16.6, Math.PI / 2);
    this.stoel(-2.2, -18.4, -Math.PI / 2);
    this.tafel(1.5, -24, 0.8, 3.2);
    this.stoel(0.7, -23.2, -Math.PI / 2);
    this.kast(-1.6, -27.5, 0, { soort: 'bakken', breed: 1.4 });

    // Klok aan de gele wand.
    const klokX = HAL - DIK / 2 - 0.04;
    const klok = cilinder(0.32, 0.06, 0xffd43b, klokX, 2.85, -11, this.groep, 24);
    klok.rotation.z = Math.PI / 2;
    const wijzerplaat = cilinder(0.26, 0.07, 0xffffff, klokX - 0.01, 2.85, -11, this.groep, 24);
    wijzerplaat.rotation.z = Math.PI / 2;
    doos(0.02, 0.18, 0.03, 0x1d2b4f, klokX - 0.05, 2.92, -11, this.groep);
    doos(0.02, 0.03, 0.14, 0x1d2b4f, klokX - 0.05, 2.85, -11.06, this.groep);

    // Vrolijke vlaggetjes over het leerplein.
    const vorm = new THREE.Shape();
    vorm.moveTo(-0.16, 0); vorm.lineTo(0.16, 0); vorm.lineTo(0, -0.34); vorm.lineTo(-0.16, 0);
    const vlagGeo = new THREE.ShapeGeometry(vorm);
    const kleuren = [0xf783ac, 0x9775fa, 0xffd43b, 0x69db7c, 0x74c0fc].map((k) => this.m({ color: k, side: THREE.DoubleSide }));
    for (let z = -28; z <= -4; z += 6) {
      const lijn = cilinder(0.008, HAL * 2, 0x666666, 0, 4.25, z, this.groep, 3);
      lijn.rotation.z = Math.PI / 2;
      lijn.castShadow = false;
      for (let j = 0; j < 12; j++) {
        const v = new THREE.Mesh(vlagGeo, kleuren[(j + Math.abs(z)) % kleuren.length]);
        v.position.set(-HAL + 0.5 + j * 0.73, 4.25, z);
        v.userData.geenSchaduw = true;
        this.groep.add(v);
      }
    }
  }

  /* ---------- Meubels ---------- */

  /** Lage kast van licht hout. soort 'bakken' = groene bakjes, 'open' = planken met spullen. */
  kast(x, z, draai, { soort = 'bakken', breed = 1.6, hoog = 1.05 } = {}) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    this.groep.add(g);
    const diep = 0.5;
    doos(breed, hoog, diep, KLEUR.hout, 0, hoog / 2, 0, g);
    doos(breed + 0.02, 0.04, diep + 0.02, KLEUR.houtRand, 0, hoog, 0, g);
    if (soort === 'bakken') {
      const kolommen = Math.max(1, Math.round(breed / 0.42));
      for (let k = 0; k < kolommen; k++) {
        for (let r = 0; r < 4; r++) {
          doos(breed / kolommen - 0.06, 0.18, 0.04, KLEUR.groenBak, -breed / 2 + (k + 0.5) * (breed / kolommen), 0.16 + r * 0.23, diep / 2 + 0.01, g).castShadow = false;
        }
      }
    } else {
      doos(breed - 0.08, hoog - 0.1, 0.02, 0xc9b286, 0, hoog / 2, -diep / 2 + 0.05, g).castShadow = false; // achterwand
      for (const y of [0.36, 0.7]) doos(breed - 0.06, 0.03, diep - 0.04, KLEUR.houtRand, 0, y, 0.01, g);
      const spul = [0x4dabf7, 0xff6b6b, 0xffd43b, 0x9775fa, 0xffffff];
      for (let s = 0; s < 4; s++) {
        doos(0.22 + (s % 2) * 0.1, 0.16, 0.3, spul[s % spul.length], -breed / 2 + 0.25 + s * (breed - 0.4) / 3, 0.38 + 0.08 + (s % 2) * 0.34, 0.06, g).castShadow = false;
      }
    }
    // Botsing (de kast staat recht of een kwartslag gedraaid).
    const dwars = Math.abs(Math.sin(draai)) > 0.5;
    const hb = (dwars ? diep : breed) / 2, hd = (dwars ? breed : diep) / 2;
    this.botsing.voegDoosToe(x - hb, x + hb, z - hd, z + hd, hoog);
  }

  verfkast(x, z, draai) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    this.groep.add(g);
    doos(1.6, 1.8, 0.45, KLEUR.hout, 0, 0.9, 0, g);
    doos(1.5, 1.7, 0.02, 0xc9b286, 0, 0.9, 0.2, g);
    const verf = [0xe03131, 0x1c7ed6, 0xfab005, 0x2b8a3e, 0x7048e8, 0xf06595];
    for (const y of [0.62, 1.2]) {
      doos(1.5, 0.03, 0.4, KLEUR.houtRand, 0, y - 0.02, 0, g);
      for (let i = 0; i < 6; i++) cilinder(0.06, 0.26, verf[(i + Math.round(y * 3)) % 6], -0.6 + i * 0.24, y + 0.13, 0.05, g, 8).castShadow = false;
    }
    this.botsing.voegDoosToe(x - 0.25, x + 0.25, z - 0.8, z + 0.8, 1.8);
  }

  ladekast(x, z, draai) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    this.groep.add(g);
    doos(0.8, 1.3, 0.5, KLEUR.hout, 0, 0.65, 0, g);
    for (let r = 0; r < 6; r++) {
      doos(0.7, 0.17, 0.03, KLEUR.houtRand, 0, 0.17 + r * 0.2, 0.26, g);
      doos(0.12, 0.03, 0.03, 0x8a6a3c, 0, 0.17 + r * 0.2, 0.28, g);
    }
    this.botsing.voegDoosToe(x - 0.25, x + 0.25, z - 0.4, z + 0.4, 1.3);
  }

  /** Tafel: b = breedte in x, d = diepte in z. */
  tafel(x, z, b, d) {
    doos(b, 0.05, d, KLEUR.blad, x, 0.74, z, this.groep);
    for (const dx of [-1, 1]) {
      for (const dz of [-1, 1]) cilinder(0.025, 0.72, KLEUR.poot, x + dx * (b / 2 - 0.06), 0.36, z + dz * (d / 2 - 0.06), this.groep, 6);
    }
    this.botsing.voegDoosToe(x - b / 2, x + b / 2, z - d / 2, z + d / 2, 0.77);
  }

  /** Oranje schoolstoeltje. draai = waar de zitting naartoe kijkt. */
  stoel(x, z, draai) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    this.groep.add(g);
    doos(0.4, 0.05, 0.4, KLEUR.stoel, 0, 0.45, 0, g);
    const leuning = doos(0.4, 0.34, 0.05, KLEUR.stoel, 0, 0.7, -0.2, g);
    leuning.rotation.x = -0.12;
    for (const dx of [-0.17, 0.17]) {
      for (const dz of [-0.17, 0.17]) cilinder(0.015, 0.45, KLEUR.poot, dx, 0.225, dz, g, 5).castShadow = false;
    }
  }

  /** Twee tafels tegen elkaar met vier stoelen eromheen. */
  tafelgroep(x, z) {
    this.tafel(x, z, 1.5, 1.4);
    this.stoel(x - 0.4, z - 1.0, 0);
    this.stoel(x + 0.4, z - 1.0, 0);
    this.stoel(x - 0.4, z + 1.0, Math.PI);
    this.stoel(x + 0.4, z + 1.0, Math.PI);
  }

  plant(x, z) {
    cilinder(0.18, 0.3, 0x495057, x, 0.15, z, this.groep, 10);
    for (let i = 0; i < 4; i++) {
      const h = (i / 4) * Math.PI * 2;
      bol(0.16, 0x37b24d, x + Math.cos(h) * 0.1, 0.42 + (i % 2) * 0.08, z + Math.sin(h) * 0.1, this.groep);
    }
  }

  /* ---------- Per frame en opruimen ---------- */

  isBijDeurTerug(p) {
    return Math.hypot(p.x - this.deurTerug.x, p.z - this.deurTerug.z) < 2.0;
  }

  update(dt, t, spelerPos) {
    // Het licht (en dus de schaduw) beweegt mee met de speler.
    this.licht.position.set(spelerPos.x + 6, 22, spelerPos.z + 4);
    this.licht.target.position.copy(spelerPos);
    for (const k of this.kramen) k.update?.(dt, t, spelerPos);
  }

  dispose() {
    this.scene.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry?.dispose();
      const materialen = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of materialen) {
        m?.map?.dispose();
        if (this.eigenMaterialen.has(m)) m.dispose();
      }
    });
    this.licht.shadow.map?.dispose();
    this.scene.clear();
  }
}
