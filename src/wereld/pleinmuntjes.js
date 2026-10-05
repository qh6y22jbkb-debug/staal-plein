import * as THREE from 'three';

/**
 * 15 verstopte gouden muntjes op het plein. Oppakken door eroverheen te lopen (of te springen).
 * Elke dag liggen ze er weer: welke al gevonden zijn, wordt per datum bewaard.
 */
const SLEUTEL = 'staal-blok2-pleinmunten';

// Verstopplekjes: [x, z, hoogte boven de grond]. Sommige vind je alleen door te springen!
export const VERSTOPPLEKKEN = [
  { id: 'eik-fietsen', x: -33.5, z: -9.2, y: 0 }, // achter de eik bij de fietsen
  { id: 'keien', x: -6.4, z: -15.0, y: 0 }, // tussen de keien in het zand
  { id: 'klimtoren', x: 26, z: -12, y: 1.68 }, // boven op het platform van de klimtoren
  { id: 'glijbaan', x: 26, z: -6.3, y: 0 }, // onderaan de glijbaan
  { id: 'paal', x: 12.2, z: -15.5, y: 1.3 }, // op de hoogste balanceerpaal
  { id: 'palissade', x: 32.6, z: 12.4, y: 0 }, // achter het hutje in de palissade
  { id: 'hutje', x: 31, z: 10.5, y: 1.28 }, // in het hutje op palen
  { id: 'fietsenhok', x: -35, z: -24, y: 0 }, // achter het fietsenhok
  { id: 'schommel', x: -27, z: -8.4, y: 0 }, // bij de voet van de touwschommel
  { id: 'wilg', x: -25.6, z: -19.6, y: 0 }, // onder het wilgje bij de school
  { id: 'rode-struik', x: 19.4, z: 23.8, y: 0 }, // tussen de struiken bij de ingang
  { id: 'struik-school', x: -18, z: -21.3, y: 0 }, // achter de struik tegen de school
  { id: 'hinkelbaan', x: -9, z: 18.6, y: 0 }, // bovenaan de hinkelbaan
  { id: 'hoek', x: 39, z: 28.6, y: 0 }, // in de hoek achter de eik
  { id: 'eik-ingang', x: -14, z: 28.8, y: 0 }, // achter de eik bij het hek
];

function vandaag() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function leesOpgepakt() {
  try {
    const data = JSON.parse(localStorage.getItem(SLEUTEL));
    if (data?.datum === vandaag() && Array.isArray(data.opgepakt)) return new Set(data.opgepakt);
  } catch { /* geen opslag */ }
  return new Set();
}

export class PleinMuntjes {
  constructor(scene) {
    this.scene = scene;
    this.opgepakt = leesOpgepakt();
    this.muntjes = [];
    this.opOppakken = null; // (aantalGevonden, totaal, schermpunt) => void

    const geo = new THREE.CylinderGeometry(0.32, 0.32, 0.07, 24);
    geo.rotateX(Math.PI / 2); // plat, met de voorkant naar je toe
    const mat = new THREE.MeshLambertMaterial({ color: 0xffc929, emissive: 0x7a5200 });
    // Voor- en achterkant met een sterretje (getekend op canvas).
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#ffd43b';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#d99a00';
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const r = i % 2 ? 22 : 50;
      const h = (i / 10) * Math.PI * 2 - Math.PI / 2;
      ctx.lineTo(64 + Math.cos(h) * r, 64 + Math.sin(h) * r);
    }
    ctx.fill();
    const sterTex = new THREE.CanvasTexture(c);
    sterTex.colorSpace = THREE.SRGBColorSpace;
    const voorkant = new THREE.MeshLambertMaterial({ map: sterTex, emissive: 0x5a3c00 });
    const randMat = new THREE.MeshLambertMaterial({ color: 0xe6a800, emissive: 0x4d3300 });
    const randGeo = new THREE.TorusGeometry(0.32, 0.035, 6, 24);

    for (const plek of VERSTOPPLEKKEN) {
      const groep = new THREE.Group();
      const munt = new THREE.Mesh(geo, [mat, voorkant, voorkant]);
      munt.castShadow = true;
      groep.add(munt, new THREE.Mesh(randGeo, randMat));
      groep.position.set(plek.x, plek.y + 0.6, plek.z);
      groep.traverse((o) => { o.userData.geenKlik = true; });
      groep.visible = !this.opgepakt.has(plek.id);
      scene.add(groep);
      this.muntjes.push({ plek, groep, fase: Math.random() * 6 });
    }
  }

  get totaal() { return VERSTOPPLEKKEN.length; }
  get aantalGevonden() { return this.opgepakt.size; }

  bewaar() {
    try { localStorage.setItem(SLEUTEL, JSON.stringify({ datum: vandaag(), opgepakt: [...this.opgepakt] })); } catch { /* geen opslag */ }
  }

  /** Nieuwe dag (spel bleef open staan)? Dan liggen alle muntjes er weer. */
  controleerNieuweDag() {
    if (this.datum === vandaag()) return;
    this.datum = vandaag();
    const opgeslagen = leesOpgepakt();
    if (opgeslagen.size < this.opgepakt.size) {
      this.opgepakt = opgeslagen;
      for (const m of this.muntjes) m.groep.visible = !this.opgepakt.has(m.plek.id);
    }
  }

  update(dt, spelerPos, camera) {
    this.controleerNieuweDag();
    for (const m of this.muntjes) {
      if (!m.groep.visible) continue;
      m.fase += dt;
      m.groep.rotation.y += dt * 2.2;
      m.groep.position.y = m.plek.y + 0.6 + Math.sin(m.fase * 2) * 0.08;
      // Oppakken: er (bijna) overheen lopen, op ongeveer dezelfde hoogte.
      const dx = spelerPos.x - m.plek.x, dz = spelerPos.z - m.plek.z;
      if (dx * dx + dz * dz < 0.9 * 0.9 && Math.abs(spelerPos.y - m.plek.y) < 0.9) this.pak(m, camera);
    }
  }

  pak(m, camera) {
    m.groep.visible = false;
    this.opgepakt.add(m.plek.id);
    this.bewaar();
    const p = m.groep.position.clone().project(camera);
    const schermpunt = { x: ((p.x + 1) / 2) * window.innerWidth, y: ((1 - p.y) / 2) * window.innerHeight };
    this.opOppakken?.(this.aantalGevonden, this.totaal, schermpunt);
  }

  /** Voor "Opnieuw beginnen": alle muntjes weer neerleggen. */
  wis() {
    this.opgepakt.clear();
    this.bewaar();
    for (const m of this.muntjes) m.groep.visible = true;
  }
}
