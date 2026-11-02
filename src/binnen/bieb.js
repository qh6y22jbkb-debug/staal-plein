import * as THREE from 'three';
import { mat, doos, cilinder, bol, canvasTextuur, tekstTextuur } from '../wereld/helpers.js';
import { Botsing } from '../wereld/botsing.js';
import { Karakter, STIJLEN } from '../karakters.js';
import { BIEB, BIEB_PLEKKEN } from '../data/bieb.js';

/*
 * De Bieb: een ruimte in het schoolgebouw, nagebouwd naar de foto's van de echte bieb van De Bunders
 * (alleen als voorbeeld; geen foto's en geen personen in het spel):
 *  - okergele muren, lichte vloer, een plafond met lichtbakken, witte vlaggetjes en een slinger met boekomslagen
 *  - berkenhouten boekenkasten op wieltjes, lage bakken met rode zijkanten vol prentenboeken
 *  - een leeshoek met een rond kleed, een groene bank en gebreide poefs
 *  - lichte houten tafels met stoelen en plantjes, een balie met een laptop en een wereldbol
 *  - het groene bord "De boekenwereld" en de letters "Griezelboeken"
 * Vijf leesplekken, elk met een karakter: daar oefen je zinsontleding.
 * Wordt pas gebouwd als je naar binnen gaat, en weer opgeruimd als je naar buiten gaat.
 */

export const BIEB_GRENZEN = { minX: -12, maxX: 12, minZ: -9, maxZ: 11 };
const HOOGTE = 3.4;
const DIK = 0.3;
const DEUR = 2.8; // breedte van de deuropening (zuidmuur)

const KLEUR = {
  oker: 0xd9a12b, wit: 0xf1f3f5, vloer: 0xd6d8d4, berk: 0xe6cfa6, berkDonker: 0xc9ad80,
  rood: 0xe8590c, bank: 0x6f8f4a, poef: 0xa9a68c, kozijn: 0x3a3f44, glas: 0xbfe3f2, plant: 0x4f9a3c, pot: 0xc08a50,
};

/** Rijen boekruggen in allerlei kleuren (voor de planken van de kasten). */
function boekenTextuur(zaad) {
  let s = zaad * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const kleuren = ['#c92a2a', '#1864ab', '#2b8a3e', '#f59f00', '#7048e8', '#e64980', '#0c8599', '#343a40', '#f8f9fa', '#e8590c', '#5c940d'];
  return canvasTextuur(256, 64, (ctx, w, h) => {
    ctx.fillStyle = '#5b4636';
    ctx.fillRect(0, 0, w, h);
    let x = 2;
    while (x < w - 4) {
      const b = 6 + Math.floor(rnd() * 10);
      const hoog = h * (0.7 + rnd() * 0.3);
      ctx.fillStyle = kleuren[Math.floor(rnd() * kleuren.length)];
      ctx.fillRect(x, h - hoog, b - 1, hoog);
      ctx.fillStyle = 'rgba(255,255,255,.35)';
      ctx.fillRect(x + 1, h - hoog * 0.7, b - 3, 2);
      x += b;
    }
  });
}

/** Rond kleed met ringen (zoals in de leeshoek). */
function kleedTextuur() {
  return canvasTextuur(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    for (let r = 124, i = 0; r > 6; r -= 10, i++) {
      ctx.fillStyle = i % 2 ? '#d8d2c2' : '#f1ece0';
      ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.strokeStyle = '#8c8574';
    ctx.lineWidth = 3;
    for (let r = 118; r > 20; r -= 26) { ctx.beginPath(); ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2); ctx.stroke(); }
  });
}

/** Plat bord met tekst (één kant). */
function bordMesh(tekst, b, h, rand, grootte = 110) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(b, h), new THREE.MeshLambertMaterial({ map: tekstTextuur(tekst, { rand, grootte }) }));
  m.userData.geenKlik = true;
  return m;
}

export class Bieb {
  constructor() {
    this.soort = 'bieb';
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe9eef1);
    this.botsing = new Botsing(BIEB_GRENZEN);
    this.blokkers = [];
    this.kramen = []; // de vijf leesplekken (werken als kramen: praten met E)
    this.eigen = new Set();
    this.boekTex = [1, 2, 3].map((z) => boekenTextuur(z));

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xd9d2c4, 2.0));
    this.licht = new THREE.DirectionalLight(0xfff6e6, 1.3);
    this.licht.castShadow = true;
    this.licht.shadow.mapSize.set(1024, 1024);
    Object.assign(this.licht.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 60 });
    this.licht.shadow.normalBias = 0.03;
    this.scene.add(this.licht, this.licht.target);

    this.groep = new THREE.Group();
    this.scene.add(this.groep);
    this.bouwRuimte();
    this.bouwLeeshoek();
    this.bouwMeubels();
    this.bouwVersiering();
    this.bouwLeesplekken();
    this.groep.traverse((o) => { if (o.isMesh && !o.userData.geenSchaduw) { o.castShadow = true; o.receiveShadow = true; } });

    const { maxZ } = BIEB_GRENZEN;
    this.startPlek = new THREE.Vector3(0, 0, maxZ - 4.2); // een stuk naar binnen, dan heeft de camera ruimte
    this.startRichting = Math.PI; // kijkt de bieb in
    this.deurTerug = new THREE.Vector3(0, 0, maxZ - 0.7);
  }

  m(opties) {
    const materiaal = new THREE.MeshLambertMaterial(opties);
    this.eigen.add(materiaal);
    return materiaal;
  }

  /** Massief blok (kast, tafel, bank): niet doorheen en niet overheen. Werkt ook gedraaid (in stappen van 90°). */
  massief(cx, cz, b, d, top, draai = 0) {
    const kwart = Math.abs(Math.round(draai / (Math.PI / 2))) % 2 === 1;
    const bb = kwart ? d : b, dd = kwart ? b : d;
    this.botsing.voegDoosToe(cx - bb / 2, cx + bb / 2, cz - dd / 2, cz + dd / 2, top, { massief: true });
  }

  /** Muur met botsing en een hoog onzichtbaar blok, zodat de camera binnen blijft. */
  muur(x1, z1, x2, z2, kleur, h = HOOGTE, y0 = 0) {
    const b = Math.max(Math.abs(x2 - x1), DIK), d = Math.max(Math.abs(z2 - z1), DIK);
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    const mesh = doos(b, h, d, kleur, cx, y0 + h / 2, cz, this.groep);
    if (y0 < 1) this.botsing.voegDoosToe(cx - b / 2, cx + b / 2, cz - d / 2, cz + d / 2, y0 + h, { massief: true });
    const blok = new THREE.Mesh(new THREE.BoxGeometry(b, 14, d), mat(0xffffff));
    blok.position.set(cx, 7, cz);
    blok.visible = false;
    this.groep.add(blok);
    this.blokkers.push(blok);
    return mesh;
  }

  bouwRuimte() {
    const { minX, maxX, minZ, maxZ } = BIEB_GRENZEN;
    // Vloer.
    const vloer = new THREE.Mesh(new THREE.PlaneGeometry(maxX - minX, maxZ - minZ), this.m({ color: KLEUR.vloer }));
    vloer.rotation.x = -Math.PI / 2;
    vloer.userData.grond = true;
    this.groep.add(vloer);
    // Muren: noord en west okergeel (zoals op de foto's), oost en zuid wit.
    this.muur(minX, minZ, maxX, minZ, KLEUR.oker);
    this.muur(minX, minZ, minX, maxZ, KLEUR.oker);
    this.muur(maxX, minZ, maxX, maxZ, KLEUR.wit);
    this.muur(minX, maxZ, -DEUR / 2, maxZ, KLEUR.wit);
    this.muur(DEUR / 2, maxZ, maxX, maxZ, KLEUR.wit);
    this.muur(-DEUR / 2, maxZ, DEUR / 2, maxZ, KLEUR.wit, HOOGTE - 2.5, 2.5); // boven de deur
    // Deurkozijn en bord terug naar het plein.
    for (const x of [-DEUR / 2, DEUR / 2]) doos(0.12, 2.5, 0.4, KLEUR.kozijn, x, 1.25, maxZ, this.groep);
    doos(DEUR + 0.2, 0.12, 0.4, KLEUR.kozijn, 0, 2.5, maxZ, this.groep);
    const terug = bordMesh(`🌳 ${BIEB.deurTerugBord}`, 2.6, 0.55, '#2f9e44', 90);
    terug.position.set(0, 2.95, maxZ - DIK / 2 - 0.02);
    terug.rotation.y = Math.PI;
    this.groep.add(terug);
    // Ramen in de oostmuur (met bomen erachter, zoals op de foto).
    for (const z of [-5, -1, 3, 7]) {
      doos(0.1, 1.7, 2.8, KLEUR.kozijn, maxX - DIK / 2 - 0.02, 1.85, z, this.groep);
      doos(0.12, 1.5, 2.6, KLEUR.glas, maxX - DIK / 2 - 0.04, 1.85, z, this.groep).userData.geenSchaduw = true;
      bol(0.55, 0x8fbf5a, maxX - DIK / 2 - 0.06, 2.05, z + 0.5, this.groep, 1).scale.x = 0.05; // boom achter het glas
    }
    // Plafond met lichtbakken (alleen van onderen te zien, dus de camera kijkt er van boven doorheen).
    const plafond = new THREE.Mesh(new THREE.PlaneGeometry(maxX - minX, maxZ - minZ), this.m({ color: 0xf8f9fa }));
    plafond.rotation.x = Math.PI / 2;
    plafond.position.y = HOOGTE;
    plafond.userData.geenSchaduw = true;
    this.groep.add(plafond);
    for (const x of [-7, 0, 7]) {
      for (const z of [-5, 1, 7]) {
        const lamp = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 3), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        this.eigen.add(lamp.material);
        lamp.rotation.x = Math.PI / 2;
        lamp.position.set(x, HOOGTE - 0.02, z);
        lamp.userData.geenSchaduw = true;
        this.groep.add(lamp);
      }
    }
  }

  /** Berkenhouten boekenkast op wieltjes, gevuld met boeken. Voorkant = lokaal +z. */
  kast(x, z, draai = 0, { b = 2.0, h = 1.9, d = 0.5, ouder = this.groep, botsing = true } = {}) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    ouder.add(g);
    const y0 = 0.12; // op wieltjes
    doos(b, 0.05, d, KLEUR.berk, 0, y0, 0, g);
    doos(b, 0.05, d, KLEUR.berk, 0, y0 + h, 0, g);
    for (const kx of [-b / 2, b / 2]) doos(0.05, h, d, KLEUR.berk, kx, y0 + h / 2, 0, g);
    doos(b, h, 0.03, KLEUR.berkDonker, 0, y0 + h / 2, -d / 2 + 0.02, g);
    const planken = 4;
    for (let i = 0; i < planken; i++) {
      const y = y0 + 0.05 + (i * (h - 0.05)) / planken;
      if (i > 0) doos(b - 0.06, 0.04, d - 0.04, KLEUR.berk, 0, y, 0, g);
      const rij = new THREE.Mesh(new THREE.PlaneGeometry(b - 0.12, (h / planken) * 0.8), new THREE.MeshLambertMaterial({ map: this.boekTex[(i + Math.round(x)) % 3] }));
      this.eigen.add(rij.material);
      rij.position.set(0, y + (h / planken) * 0.42, d / 2 - 0.12);
      g.add(rij);
    }
    for (const kx of [-b / 2 + 0.12, b / 2 - 0.12]) cilinder(0.05, 0.1, 0x343a40, kx, 0.05, 0, g, 8).rotation.z = Math.PI / 2;
    if (botsing) {
      const p = new THREE.Vector3(0, 0, 0).applyEuler(g.rotation).add(g.position);
      this.massief(p.x, p.z, b + 0.1, d + 0.1, y0 + h, draai);
    }
    return g;
  }

  /** Lage bak met rode zijkanten vol prentenboeken (open bovenkant). */
  boekenbak(x, z, draai = 0, b = 1.8, ouder = this.groep, botsing = true) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = draai;
    ouder.add(g);
    const h = 0.8, d = 0.7;
    doos(b, h, d, KLEUR.berk, 0, h / 2, 0, g);
    for (const kx of [-b / 2, b / 2]) doos(0.06, h + 0.02, d + 0.02, KLEUR.rood, kx, h / 2, 0, g);
    // Prentenboeken met de voorkant naar boven/voren.
    const kleuren = [0x1c7ed6, 0xf59f00, 0x2f9e44, 0xe64980, 0x7048e8, 0x0c8599];
    for (let i = 0; i < 6; i++) {
      const boek = doos(0.24, 0.32, 0.03, kleuren[i], -b / 2 + 0.2 + i * ((b - 0.4) / 5), h + 0.08, 0.05 + (i % 2) * 0.12, g);
      boek.rotation.x = -0.35;
    }
    if (botsing) {
      const p = new THREE.Vector3().applyEuler(g.rotation).add(g.position);
      this.massief(p.x, p.z, b + 0.1, d + 0.1, h, draai);
    }
    return g;
  }

  bouwLeeshoek() {
    // Rond kleed.
    const kleed = new THREE.Mesh(new THREE.CircleGeometry(2.5, 40), this.m({ map: kleedTextuur(), transparent: true }));
    kleed.rotation.x = -Math.PI / 2;
    kleed.position.set(0, 0.01, 0.6);
    kleed.userData.geenSchaduw = true;
    this.groep.add(kleed);
    // Groene bank (met de rug naar het noorden).
    const g = new THREE.Group();
    g.position.set(0, 0, -1.0);
    this.groep.add(g);
    doos(2.4, 0.45, 0.9, KLEUR.bank, 0, 0.225, 0, g);
    doos(2.4, 0.55, 0.25, KLEUR.bank, 0, 0.7, -0.33, g);
    for (const x of [-1.15, 1.15]) doos(0.22, 0.65, 0.9, KLEUR.bank, x, 0.325, 0, g);
    for (const x of [-0.6, 0.6]) doos(1.0, 0.12, 0.7, 0x7fa05a, x, 0.5, 0.05, g);
    this.massief(0, -1.0, 2.5, 1.0, 1.0);
    // Gebreide poefs (laag: je kunt erop stappen).
    for (const [x, z] of [[-1.5, 1.4], [1.5, 1.4], [0, 2.3]]) {
      const p = cilinder(0.4, 0.38, KLEUR.poef, x, 0.19, z, this.groep, 18);
      p.scale.set(1, 1, 1);
      this.botsing.voegCirkelToe(x, z, 0.42, 0.38);
    }
  }

  bouwMeubels() {
    const { minX, maxX, minZ, maxZ } = BIEB_GRENZEN;
    // Twee lichte houten tafels met stoelen en plantjes (zoals vooraan op de foto's).
    for (const tx of [-6.2, 6.2]) {
      const tz = maxZ - 4.4;
      doos(2.6, 0.06, 1.3, KLEUR.berk, tx, 0.76, tz, this.groep);
      for (const [lx, lz] of [[-1.15, -0.5], [1.15, -0.5], [-1.15, 0.5], [1.15, 0.5]]) cilinder(0.04, 0.74, KLEUR.berkDonker, tx + lx, 0.37, tz + lz, this.groep, 6);
      this.massief(tx, tz, 2.7, 1.4, 0.8);
      for (const k of [-1, 1]) {
        for (const sx of [-0.6, 0.6]) {
          const sz = tz + k * 1.0;
          doos(0.45, 0.05, 0.45, KLEUR.berk, tx + sx, 0.46, sz, this.groep);
          doos(0.45, 0.45, 0.05, KLEUR.berk, tx + sx, 0.72, sz + k * 0.22, this.groep);
          for (const [px, pz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) cilinder(0.025, 0.45, KLEUR.berkDonker, tx + sx + px, 0.22, sz + pz, this.groep, 5);
        }
      }
      // Plantje in een rieten potje.
      cilinder(0.16, 0.18, KLEUR.pot, tx - 0.5, 0.88, tz, this.groep, 10);
      bol(0.24, KLEUR.plant, tx - 0.5, 1.08, tz, this.groep, 1);
    }
    // Balie met laptop (noordoosthoek).
    const bz = minZ + 1.6; // balie in de noordoosthoek
    doos(1.8, 0.06, 0.8, KLEUR.berk, 9.6, 0.76, bz, this.groep);
    for (const [lx, lz] of [[-0.8, -0.3], [0.8, -0.3], [-0.8, 0.3], [0.8, 0.3]]) cilinder(0.04, 0.74, KLEUR.berkDonker, 9.6 + lx, 0.37, bz + lz, this.groep, 6);
    doos(0.5, 0.03, 0.35, 0x868e96, 9.4, 0.8, bz + 0.05, this.groep);
    const scherm = doos(0.5, 0.32, 0.03, 0x343a40, 9.4, 0.96, bz - 0.13, this.groep);
    scherm.rotation.x = -0.2;
    doos(0.5, 0.45, 0.5, 0x212529, 9.6, 0.5, bz + 0.8, this.groep); // bureaustoel
    this.massief(9.6, bz + 0.2, 1.9, 1.4, 0.8);
    // Laag kastje met een wereldbol (noordwesthoek).
    const wz = minZ + 0.8; // kastje met wereldbol in de noordwesthoek
    doos(1.2, 0.8, 0.6, KLEUR.berk, -10.9, 0.4, wz, this.groep);
    cilinder(0.03, 0.25, 0x8a6a3c, -10.9, 0.92, wz, this.groep, 6);
    const wereld = bol(0.28, 0x3b8fd1, -10.9, 1.25, wz, this.groep, 2);
    wereld.rotation.z = 0.4;
    bol(0.12, 0x6ca04a, -10.75, 1.32, wz + 0.2, this.groep, 1);
    this.massief(-10.9, wz, 1.3, 0.7, 0.8);
    // Extra boekenkasten langs de muren en twee bakken met prentenboeken.
    this.kast(minX + 0.45, -4.2, Math.PI / 2);
    this.kast(minX + 0.45, 6.0, Math.PI / 2);
    this.kast(maxX - 0.45, 6.6, -Math.PI / 2, { b: 1.6 });
    this.kast(-8.6, maxZ - 0.45, Math.PI);
    this.kast(8.6, maxZ - 0.45, Math.PI);
    this.boekenbak(-3.9, 2.6, 0.25);
    this.boekenbak(3.9, 2.6, -0.25);
    // Plantjes bovenop een paar kasten.
    for (const [x, z] of [[minX + 0.45, -4.2], [minX + 0.45, 6.0], [8.6, maxZ - 0.45]]) {
      cilinder(0.15, 0.18, KLEUR.pot, x, 2.12, z, this.groep, 10);
      bol(0.26, KLEUR.plant, x, 2.34, z, this.groep, 1);
    }
  }

  bouwVersiering() {
    const { minX, maxX, minZ } = BIEB_GRENZEN;
    // Witte papieren vlaggetjes dwars door de bieb.
    for (const z of [-3.5, 3.5]) {
      const lijn = cilinder(0.01, maxX - minX - 1, 0xadb5bd, 0, 3.05, z, this.groep, 4);
      lijn.rotation.z = Math.PI / 2;
      lijn.userData.geenSchaduw = true;
      for (let x = minX + 1; x <= maxX - 1; x += 0.7) {
        const vlag = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.45), this.m({ color: 0xffffff, side: THREE.DoubleSide }));
        vlag.position.set(x, 2.8, z);
        vlag.userData.geenSchaduw = true;
        this.groep.add(vlag);
      }
    }
    // Slinger met boekomslagen langs de westmuur.
    const kleuren = [0xe03131, 0x1c7ed6, 0xfab005, 0x2f9e44, 0x7048e8, 0xf06595, 0x0c8599];
    for (let z = minZ + 1, i = 0; z < BIEB_GRENZEN.maxZ - 1; z += 0.75, i++) {
      const kaft = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.5), this.m({ color: kleuren[i % kleuren.length] }));
      kaft.position.set(minX + DIK / 2 + 0.03, 3.0, z);
      kaft.rotation.y = Math.PI / 2;
      kaft.userData.geenSchaduw = true;
      this.groep.add(kaft);
    }
    // Groen bord "De boekenwereld" op de westmuur en de letters "Griezelboeken" op de noordmuur.
    const wereldBord = bordMesh(BIEB.wandBord, 3.2, 0.7, '#2f9e44', 100);
    wereldBord.position.set(minX + DIK / 2 + 0.03, 2.35, 0.6);
    wereldBord.rotation.y = Math.PI / 2;
    this.groep.add(wereldBord);
    const griezel = bordMesh(`🎃 ${BIEB.griezelBord}`, 3.4, 0.6, '#5f3dc4', 100);
    griezel.position.set(-3.6, 2.7, minZ + DIK / 2 + 0.03);
    this.groep.add(griezel);
  }

  /**
   * Vijf leesplekken: een boekenkast met daarvoor een lage bak, een karakter ertussen en een bord met de naam.
   * Drie tegen de noordmuur, één tegen de westmuur en één tegen de oostmuur.
   */
  bouwLeesplekken() {
    const { minX, maxX, minZ } = BIEB_GRENZEN;
    const plekken = [
      { x: -7, z: minZ + 1.6, draai: 0 },
      { x: 0, z: minZ + 1.6, draai: 0 },
      { x: 7, z: minZ + 1.6, draai: 0 },
      { x: minX + 1.6, z: 1.2, draai: Math.PI / 2 },
      { x: maxX - 1.6, z: 1.0, draai: -Math.PI / 2 },
    ];
    const STEM = { peter: 0.75, olga: 1.35, gijs: 1.1, lies: 1.2, bob: 0.9 };
    BIEB_PLEKKEN.forEach((plek, i) => {
      const { x, z, draai } = plekken[i];
      const g = new THREE.Group();
      g.position.set(x, 0, z);
      g.rotation.y = draai;
      this.groep.add(g);
      // Kast achter het karakter, lage bak ervoor.
      this.kast(0, -1.0, 0, { b: 2.4, ouder: g, botsing: false });
      this.boekenbak(0, 0.75, 0, 1.8, g, false);
      const achter = new THREE.Vector3(0, 0, -1.0).applyEuler(g.rotation).add(g.position);
      const voor = new THREE.Vector3(0, 0, 0.75).applyEuler(g.rotation).add(g.position);
      this.massief(achter.x, achter.z, 2.5, 0.6, 2.1, draai);
      this.massief(voor.x, voor.z, 1.9, 0.8, 0.85, draai);
      // Karakter tussen kast en bak.
      const k = new Karakter(STIJLEN[plek.karakter]);
      k.groep.position.set(0, 0, -0.15);
      g.add(k.groep);
      // Bord met de naam boven de kast.
      const bord = bordMesh(`${plek.icoon} ${plek.naam}`, 2.6, 0.6, plek.kleur, 90);
      bord.position.set(0, 2.55, -0.95);
      g.add(bord);
      const praatPunt = new THREE.Vector3(0, 0, 2.3).applyEuler(g.rotation).add(g.position);
      g.userData.loopDoel = praatPunt;
      const data = {
        ...plek, kraamNaam: plek.naam, karakterNaam: plek.naam, leerdoel: plek.onderwerp,
      };
      this.kramen.push({
        data,
        stijl: { bord: plek.kleur, stem: STEM[plek.karakter] ?? 1 },
        groep: g,
        praatPunt,
        karakters: [k],
        isBiebplek: true,
        update(dt, t, spelerPos) { k.update(dt, t, spelerPos); },
      });
    });
  }

  /** Bij de deur terug naar het plein? */
  isBijDeurTerug(p) {
    return Math.hypot(p.x - this.deurTerug.x, p.z - this.deurTerug.z) < 2.0;
  }

  update(dt, t, spelerPos) {
    this.licht.position.set(spelerPos.x + 6, 22, spelerPos.z + 4);
    this.licht.target.position.copy(spelerPos);
    for (const k of this.kramen) k.update(dt, t, spelerPos);
  }

  dispose() {
    this.scene.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry?.dispose();
      const materialen = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of materialen) {
        if (m?.map) { m.map.dispose(); m.dispose(); } else if (this.eigen.has(m)) m.dispose();
      }
    });
    for (const t of this.boekTex) t.dispose();
    this.licht.shadow.map?.dispose();
    this.scene.clear();
  }
}
