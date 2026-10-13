import { DANSJES } from './data/oefeningen.js';

/*
 * Dansjes: welke je hebt (bewaard in localStorage), hoe ze bewegen, en een speler die danst.
 * De moonwalk heb je altijd (gratis). Andere dansjes koop je in De Bunders Boetiek.
 */

const SLEUTEL = 'staal-blok2-dansjes';
export const dansMetId = (id) => DANSJES.find((d) => d.id === id);
const GRATIS = DANSJES.filter((d) => !d.prijs).map((d) => d.id);

function lees() {
  try {
    const d = JSON.parse(localStorage.getItem(SLEUTEL));
    if (d && Array.isArray(d.gekocht)) {
      const gekocht = [...new Set([...GRATIS, ...d.gekocht.filter((id) => dansMetId(id))])];
      return { gekocht, gekozen: gekocht.includes(d.gekozen) ? d.gekozen : GRATIS[0] };
    }
  } catch { /* geen of kapotte opslag */ }
  return { gekocht: [...GRATIS], gekozen: GRATIS[0] };
}

let staat = lees();
const luisteraars = new Set();
function bewaar() {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
  for (const f of luisteraars) f();
}

export const dansbezit = {
  get gekocht() { return DANSJES.filter((d) => staat.gekocht.includes(d.id)); },
  get gekozen() { return staat.gekozen; },
  heeft(id) { return staat.gekocht.includes(id); },
  koop(id) {
    if (!dansMetId(id) || this.heeft(id)) return;
    staat.gekocht.push(id);
    staat.gekozen = id; // net gekocht = meteen je dansje
    bewaar();
  },
  kies(id) {
    if (!this.heeft(id)) return;
    staat.gekozen = id;
    bewaar();
  },
  /** Leerkrachtmodus: alle dansjes. */
  geefAlles() {
    for (const d of DANSJES) if (!this.heeft(d.id)) staat.gekocht.push(d.id);
    bewaar();
  },
  opVerandering(f) { luisteraars.add(f); },
  wis() {
    staat = { gekocht: [...GRATIS], gekozen: GRATIS[0] };
    bewaar();
  },
};

/* ---------- Hoe de dansjes bewegen ---------- */

/** Zet het poppetje weer in de gewone houding (na het dansen). */
export function zetHoudingTerug(speler) {
  const m = speler.model;
  m.rotation.x = m.rotation.z = 0;
  m.position.y = 0;
  for (const been of speler.benen) { been.rotation.set(0, 0, 0); been.position.y = 0.75; }
  for (const arm of speler.armen) arm.rotation.set(0, 0, 0);
  speler.hoofd.rotation.set(0, 0, 0);
}

/**
 * De houding op tijdstip t (seconden sinds het begin), bovenop de gewone animatie.
 * richting = de kijkrichting van de speler (dansjes mogen daar iets bij optellen).
 */
export function danshouding(speler, id, t, richting) {
  const m = speler.model;
  const [benL, benR] = speler.benen;
  const [armL, armR] = speler.armen;
  zetHoudingTerug(speler);
  m.rotation.y = richting;
  switch (id) {
    case 'moonwalk': {
      // De benen "lopen" vooruit, maar je glijdt achteruit. Om en om gaat een hiel omhoog.
      const f = t * 7;
      const s = Math.sin(f);
      benL.rotation.x = s * 0.4;
      benR.rotation.x = -s * 0.4;
      benL.position.y = 0.75 + Math.max(0, s) * 0.08;
      benR.position.y = 0.75 + Math.max(0, -s) * 0.08;
      armL.rotation.x = -s * 0.2;
      armR.rotation.x = s * 0.2;
      m.rotation.x = 0.1; // een beetje voorover
      speler.hoofd.rotation.y = Math.sin(t * 2) * 0.15;
      break;
    }
    case 'robot': {
      // Houterig van houding naar houding springen, elke 0,45 seconde.
      const stap = Math.floor(t / 0.45) % 4;
      armL.rotation.x = [-1.57, 0, -1.57, -3.0][stap];
      armR.rotation.x = [0, -1.57, -3.0, -1.57][stap];
      speler.hoofd.rotation.y = [0.6, -0.6, 0, 0.6][stap];
      m.rotation.y = richting + [0, 0.5, 0, -0.5][stap];
      benL.rotation.x = [0.25, 0, -0.25, 0][stap];
      benR.rotation.x = [0, 0.25, 0, -0.25][stap];
      break;
    }
    case 'juichen': {
      // Huppelen met je armen in de lucht.
      const hup = Math.abs(Math.sin(t * 6));
      m.position.y = hup * 0.35;
      armL.rotation.z = -2.7 + Math.sin(t * 12) * 0.3;
      armR.rotation.z = 2.7 - Math.sin(t * 12) * 0.3;
      benL.rotation.z = -0.15 * hup;
      benR.rotation.z = 0.15 * hup;
      break;
    }
    case 'draaien': {
      // Op één been rondtollen, armen samen boven je hoofd.
      m.rotation.y = richting + t * 9;
      benR.rotation.z = 0.9;
      benR.position.y = 0.85;
      armL.rotation.z = -2.9;
      armR.rotation.z = 2.9;
      m.position.y = 0.04;
      break;
    }
    default:
      break;
  }
}

/** Hoe snel je beweegt tijdens een dansje (meters per seconde achteruit; alleen de moonwalk). */
export const ACHTERUIT = { moonwalk: 1.6 };

/**
 * Een speler die danst. start() → het dansje begint; stop() → klaar.
 * duur = null: dansen tot stop(); anders stopt het vanzelf na zoveel seconden.
 */
export class Dansen {
  constructor(speler) {
    this.speler = speler;
    this.id = null;
    this.t = 0;
    this.rest = null;
  }

  get actief() { return !!this.id; }

  start(id, duur = null) {
    if (!dansbezit.heeft(id)) id = dansbezit.gekozen;
    if (this.id !== id) this.t = 0;
    this.id = id;
    this.rest = duur;
  }

  stop() {
    if (!this.id) return;
    this.id = null;
    this.rest = null;
    zetHoudingTerug(this.speler);
  }

  /** Beweging voor deze frame (moonwalk = achteruit glijden), of null. */
  beweging() {
    const v = ACHTERUIT[this.id];
    if (!v) return { x: 0, z: 0 };
    const r = this.speler.richting;
    return { x: -Math.sin(r) * (v / this.speler.uiterlijk.snelheid), z: -Math.cos(r) * (v / this.speler.uiterlijk.snelheid) };
  }

  /** Na speler.update(): de danshouding eroverheen. */
  update(dt) {
    if (!this.id) return;
    this.t += dt;
    if (this.rest != null) {
      this.rest -= dt;
      if (this.rest <= 0) { this.stop(); return; }
    }
    danshouding(this.speler, this.id, this.t, this.speler.richting);
  }
}
