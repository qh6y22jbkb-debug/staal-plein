import * as THREE from 'three';

/**
 * Eenvoudige botsingen (plein, Leergroep 3, Voetbalwereld, ...).
 * - Dozen (rechthoeken van bovenaf) en cirkels, elk met een hoogte ('top').
 * - Lage dingen (lager dan de staphoogte) kun je op stappen; op wat hogere dingen kun je springen
 *   (bijv. de klimtoren en het hutje op het plein).
 * - MASSIEF (muren, kasten, grote meubels, en alles vanaf 2 meter hoog): daar kun je nooit op staan
 *   en nooit overheen springen, hoe hoog je ook springt. Een sprong komt maximaal ±1,8 m hoog.
 */
export const MASSIEF_VANAF = 2; // meter: alles wat zo hoog of hoger is, is automatisch massief
export class Botsing {
  constructor(grenzen) {
    this.grenzen = grenzen; // { minX, maxX, minZ, maxZ }
    this.dozen = [];
    this.cirkels = [];
    this._box = new THREE.Box3();
  }

  /** @param opties { massief } — true = er nooit op of overheen (standaard: vanaf MASSIEF_VANAF meter hoog) */
  voegDoosToe(minX, maxX, minZ, maxZ, top, { massief } = {}) {
    this.dozen.push({ minX, maxX, minZ, maxZ, top, massief: massief ?? top >= MASSIEF_VANAF });
  }

  /** Neemt de omhullende doos van een 3D-object over. */
  voegObjectToe(object, marge = 0, top, opties) {
    object.updateWorldMatrix(true, true);
    const b = this._box.setFromObject(object);
    this.voegDoosToe(b.min.x - marge, b.max.x + marge, b.min.z - marge, b.max.z + marge, top ?? b.max.y, opties);
  }

  voegCirkelToe(x, z, r, top, { massief } = {}) {
    this.cirkels.push({ x, z, r, top, massief: massief ?? top >= MASSIEF_VANAF });
  }

  /** Is er op deze plek ruimte (geen obstakel hoger dan een stapje)? */
  isVrij(x, z, r = 0.6) {
    const g = this.grenzen;
    if (x < g.minX + r || x > g.maxX - r || z < g.minZ + r || z > g.maxZ - r) return false;
    for (const d of this.dozen) {
      if (d.top <= 0.45) continue;
      if (x > d.minX - r && x < d.maxX + r && z > d.minZ - r && z < d.maxZ + r) return false;
    }
    for (const c of this.cirkels) {
      if (c.top <= 0.45) continue;
      if (Math.hypot(x - c.x, z - c.z) < c.r + r) return false;
    }
    return true;
  }

  /** Duwt de speler uit obstakels en geeft de grondhoogte onder de speler terug. */
  losOp(pos, straal, stap) {
    for (let ronde = 0; ronde < 4; ronde++) { // een paar rondes: ook tussen twee dingen in klopt het dan
      for (const d of this.dozen) {
        if (!d.massief && pos.y >= d.top - stap) continue; // massief: altijd tegenhouden, ook in de lucht
        const px = Math.max(d.minX, Math.min(pos.x, d.maxX));
        const pz = Math.max(d.minZ, Math.min(pos.z, d.maxZ));
        let dx = pos.x - px, dz = pos.z - pz;
        const afst = Math.hypot(dx, dz);
        if (afst >= straal) continue;
        if (afst > 1e-5) {
          pos.x = px + (dx / afst) * straal;
          pos.z = pz + (dz / afst) * straal;
        } else {
          // Midden in de doos: kortste weg naar buiten.
          const opties = [
            [d.minX - straal - pos.x, 0], [d.maxX + straal - pos.x, 0],
            [0, d.minZ - straal - pos.z], [0, d.maxZ + straal - pos.z],
          ].sort((a, b) => Math.abs(a[0] + a[1]) - Math.abs(b[0] + b[1]));
          pos.x += opties[0][0];
          pos.z += opties[0][1];
        }
      }
      for (const c of this.cirkels) {
        if (!c.massief && pos.y >= c.top - stap) continue;
        const dx = pos.x - c.x, dz = pos.z - c.z;
        const afst = Math.hypot(dx, dz);
        const min = c.r + straal;
        if (afst >= min) continue;
        const nx = afst > 1e-5 ? dx / afst : 1, nz = afst > 1e-5 ? dz / afst : 0;
        pos.x = c.x + nx * min;
        pos.z = c.z + nz * min;
      }
    }

    const g = this.grenzen;
    pos.x = Math.max(g.minX + straal, Math.min(g.maxX - straal, pos.x));
    pos.z = Math.max(g.minZ + straal, Math.min(g.maxZ - straal, pos.z));

    // Grondhoogte: hoogste 'top' waar de speler boven staat.
    let grond = 0;
    const r = straal * 0.5;
    for (const d of this.dozen) {
      if (d.massief || d.top > pos.y + stap) continue; // op iets massiefs kun je nooit staan
      if (pos.x > d.minX - r && pos.x < d.maxX + r && pos.z > d.minZ - r && pos.z < d.maxZ + r) {
        grond = Math.max(grond, d.top);
      }
    }
    for (const c of this.cirkels) {
      if (c.massief || c.top > pos.y + stap) continue;
      if (Math.hypot(pos.x - c.x, pos.z - c.z) < c.r + r) grond = Math.max(grond, c.top);
    }
    return grond;
  }
}
