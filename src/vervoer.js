import * as THREE from 'three';
import { VERVOER } from './data/oefeningen.js';
import { mat, doos, cilinder } from './wereld/helpers.js';

/*
 * Vervoersmiddelen: step, skateboard en fiets.
 *  - vervoerbezit: wat je gekocht hebt, welk je gebruikt en de kleuren (bewaard in localStorage)
 *  - maakVervoerModel: het 3D-model (vastgemaakt aan het poppetje)
 *  - rijhouding: hoe het poppetje erop staat of zit (afzetten met een been, trappen)
 *  - Rijden: op- en afstappen en sneller gaan
 */

const SLEUTEL = 'staal-blok2-vervoer';
export const vervoerMetId = (id) => VERVOER.find((v) => v.id === id);

function leeg() { return { gekocht: [], gekozen: null, kleuren: {} }; }

function lees() {
  try {
    const d = JSON.parse(localStorage.getItem(SLEUTEL));
    if (d && Array.isArray(d.gekocht)) {
      const gekocht = d.gekocht.filter((id) => vervoerMetId(id));
      const kleuren = {};
      for (const [id, k] of Object.entries(d.kleuren ?? {})) if (vervoerMetId(id) && Number.isInteger(k)) kleuren[id] = k;
      return { gekocht, gekozen: gekocht.includes(d.gekozen) ? d.gekozen : (gekocht[0] ?? null), kleuren };
    }
  } catch { /* geen of kapotte opslag */ }
  return leeg();
}

let staat = lees();
const luisteraars = new Set();
function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
  for (const f of luisteraars) f();
}

export const vervoerbezit = {
  get gekocht() { return VERVOER.filter((v) => staat.gekocht.includes(v.id)); },
  get gekozen() { return staat.gekozen; },
  heeft(id) { return staat.gekocht.includes(id); },
  kleurVan(id) { return staat.kleuren[id] ?? vervoerMetId(id)?.kleur; },
  heeftEigenKleur(id) { return id in staat.kleuren; },
  koop(id) {
    if (!vervoerMetId(id) || this.heeft(id)) return;
    staat.gekocht.push(id);
    staat.gekozen = id; // net gekocht = meteen in gebruik
    bewaar();
  },
  kies(id) { if (this.heeft(id)) { staat.gekozen = id; bewaar(); } },
  /** Andere kleur (gratis). null = de originele kleur. */
  zetKleur(id, kleur) {
    if (!this.heeft(id)) return;
    if (kleur == null) delete staat.kleuren[id]; else staat.kleuren[id] = kleur;
    bewaar();
  },
  geefAlles() {
    for (const v of VERVOER) if (!this.heeft(v.id)) staat.gekocht.push(v.id);
    staat.gekozen ??= VERVOER[0].id;
    bewaar();
  },
  opVerandering(f) { luisteraars.add(f); },
  wis() { staat = leeg(); bewaar(); },
};

/* ---------- 3D-modellen (vooruit = +z, de grond = y 0) ---------- */

/** Hoe hoog het poppetje erop staat of zit. */
export const OPHOOGTE = { step: 0.14, skateboard: 0.16, fiets: 0.22 };

function wiel(r, dikte, kleur, x, y, z, ouder) {
  const w = cilinder(r, dikte, kleur, x, y, z, ouder, 14);
  w.rotation.z = Math.PI / 2; // as langs x
  return w;
}

export function maakVervoerModel(id, kleur) {
  const g = new THREE.Group();
  g.userData.wielen = [];
  const k = kleur ?? vervoerMetId(id)?.kleur ?? 0x888888;
  if (id === 'step') {
    doos(0.16, 0.05, 0.72, k, 0, 0.11, 0, g);
    g.userData.wielen.push(wiel(0.075, 0.05, 0x212529, 0, 0.075, 0.33, g), wiel(0.075, 0.05, 0x212529, 0, 0.075, -0.33, g));
    const stuur = cilinder(0.025, 1.0, k, 0, 0.6, 0.36, g, 8);
    stuur.rotation.x = -0.12;
    const handvat = cilinder(0.025, 0.55, 0x343a40, 0, 1.1, 0.42, g, 8);
    handvat.rotation.z = Math.PI / 2;
  } else if (id === 'skateboard') {
    const plank = doos(0.26, 0.04, 0.82, k, 0, 0.12, 0, g);
    plank.material = mat(k);
    doos(0.24, 0.005, 0.7, 0x212529, 0, 0.142, 0, g); // grip
    for (const z of [-0.28, 0.28]) {
      doos(0.2, 0.03, 0.05, 0xadb5bd, 0, 0.085, z, g);
      for (const x of [-0.1, 0.1]) g.userData.wielen.push(wiel(0.04, 0.035, 0xfff3bf, x, 0.045, z, g));
    }
  } else if (id === 'fiets') {
    for (const z of [-0.52, 0.52]) {
      // Wiel = groepje (band + spaken) dat om de x-as draait.
      const w = new THREE.Group();
      w.position.set(0, 0.34, z);
      g.add(w);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.035, 8, 22), mat(0x212529));
      band.rotation.y = Math.PI / 2;
      w.add(band);
      const as = cilinder(0.02, 0.1, 0xadb5bd, 0, 0, 0, w, 6);
      as.rotation.z = Math.PI / 2;
      for (let i = 0; i < 3; i++) doos(0.01, 0.6, 0.012, 0xced4da, 0, 0, 0, w).rotation.x = (i / 3) * Math.PI;
      g.userData.wielen.push(w);
    }
    // Frame in de eigen kleur.
    const stang = (x1, y1, z1, x2, y2, z2) => {
      const a = new THREE.Vector3(x1, y1, z1), b = new THREE.Vector3(x2, y2, z2);
      const m = cilinder(0.03, a.distanceTo(b), k, 0, 0, 0, g, 6);
      m.position.copy(a).add(b).multiplyScalar(0.5);
      m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
      return m;
    };
    stang(0, 0.34, -0.52, 0, 0.36, 0); // achtervork
    stang(0, 0.36, 0, 0, 0.82, -0.12); // zadelbuis
    stang(0, 0.36, 0, 0, 0.86, 0.38); // onderbuis
    stang(0, 0.82, -0.12, 0, 0.86, 0.38); // bovenbuis
    stang(0, 0.86, 0.38, 0, 0.34, 0.52); // voorvork
    stang(0, 0.82, -0.12, 0, 0.34, -0.52);
    doos(0.18, 0.06, 0.26, 0x212529, 0, 0.9, -0.14, g); // zadel
    const stuur = cilinder(0.025, 0.5, 0x343a40, 0, 1.0, 0.36, g, 8);
    stuur.rotation.z = Math.PI / 2;
    stang(0, 0.86, 0.38, 0, 1.0, 0.36);
    g.userData.trapper = new THREE.Group();
    g.userData.trapper.position.set(0, 0.36, 0);
    g.add(g.userData.trapper);
    for (const s of [-1, 1]) {
      const arm = doos(0.03, 0.18, 0.03, 0xadb5bd, s * 0.12, 0, 0, g.userData.trapper);
      arm.position.y = s * 0.09;
      doos(0.1, 0.03, 0.06, 0x343a40, s * 0.16, s * 0.18, 0, g.userData.trapper);
    }
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.userData.geenKlik = true; } });
  return g;
}

/* ---------- Houding op het vervoer ---------- */

/**
 * @param fase   loopt op met de snelheid (voor afzetten/trappen)
 * @param snel   0..1: hoe hard je gaat (0 = stil)
 */
export function rijhouding(speler, id, fase, snel) {
  const [benL, benR] = speler.benen;
  const [armL, armR] = speler.armen;
  speler.model.position.y = OPHOOGTE[id] ?? 0;
  benL.position.y = benR.position.y = 0.75;
  benL.rotation.set(0, 0, 0); benR.rotation.set(0, 0, 0);
  armL.rotation.set(0, 0, 0); armR.rotation.set(0, 0, 0);
  speler.model.rotation.x = 0;
  if (id === 'fiets') {
    // Zitten en trappen; handen aan het stuur.
    const t = Math.sin(fase);
    benL.rotation.x = -1.0 + t * 0.45;
    benR.rotation.x = -1.0 - t * 0.45;
    armL.rotation.x = armR.rotation.x = -1.25;
  } else {
    // Step en skateboard: op één been staan, met het andere been afzetten (als je rijdt).
    const zet = snel > 0.15 ? Math.max(0, Math.sin(fase)) : 0;
    benR.rotation.x = zet * 0.8 - zet * 0.2;
    benR.position.y = 0.75 + zet * 0.06;
    if (id === 'step') {
      armL.rotation.x = armR.rotation.x = -1.15; // handen aan het stuur
    } else {
      armL.rotation.z = -0.6; armR.rotation.z = 0.6; // armen opzij voor je evenwicht
      speler.model.rotation.x = 0.05;
    }
  }
}

/* ---------- Rijden ---------- */

export class Rijden {
  constructor(speler) {
    this.speler = speler;
    this.id = null;
    this.model = null;
    this.fase = 0;
    this.basisSnelheid = speler.uiterlijk.snelheid;
  }

  get actief() { return !!this.id; }

  opstappen(id = vervoerbezit.gekozen) {
    if (!id || !vervoerbezit.heeft(id)) return false;
    if (this.id) this.afstappen();
    this.id = id;
    this.model = maakVervoerModel(id, vervoerbezit.kleurVan(id));
    this.model.position.y = -(OPHOOGTE[id] ?? 0); // het model hangt aan het poppetje, maar staat op de grond
    this.speler.model.add(this.model);
    this.speler.uiterlijk.snelheid = this.basisSnelheid * (vervoerMetId(id)?.snelheid ?? 2);
    return true;
  }

  afstappen() {
    if (!this.id) return false;
    this.model.parent?.remove(this.model);
    this.model.traverse((o) => { if (o.isMesh) { o.geometry.dispose(); } });
    this.model = null;
    this.id = null;
    this.speler.uiterlijk.snelheid = this.basisSnelheid;
    const s = this.speler;
    s.model.position.y = 0;
    s.model.rotation.x = 0;
    for (const been of s.benen) { been.rotation.set(0, 0, 0); been.position.y = 0.75; }
    for (const arm of s.armen) arm.rotation.set(0, 0, 0);
    return true;
  }

  /** Kleur of keuze veranderd in de kledingkast: model opnieuw maken. */
  ververs() {
    if (!this.id) return;
    const id = vervoerbezit.heeft(vervoerbezit.gekozen) ? vervoerbezit.gekozen : this.id;
    this.afstappen();
    this.opstappen(id);
  }

  /** Na speler.update(): wielen laten draaien en de houding erop zetten. */
  update(dt) {
    if (!this.id) return;
    const s = this.speler;
    const snelheid = s.huidigeSnelheid; // meter per seconde
    const snel = Math.min(1, snelheid / (this.basisSnelheid * 1.5));
    this.fase += dt * (this.id === 'fiets' ? snelheid * 1.6 : 5 * snel);
    for (const w of this.model.userData.wielen) {
      if (this.id === 'fiets') w.rotation.x += (snelheid / 0.31) * dt;
      else w.rotation.x += (snelheid / 0.06) * dt;
    }
    if (this.model.userData.trapper) this.model.userData.trapper.rotation.x = this.fase;
    rijhouding(s, this.id, this.fase, snel);
  }
}
