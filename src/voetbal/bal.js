import * as THREE from 'three';
import { HALF_L, VELD } from './stadion.js';
import { canvasTextuur } from '../wereld/helpers.js';

export const BAL_STRAAL = 0.3;
const ZWAARTEKRACHT = 18;
const PAAL_STRAAL = 0.08;

/**
 * De voetbal met eigen, eenvoudige natuurkunde:
 * rollen, stuiteren, wrijving, botsen tegen palen, lat, net en de randen.
 */
export class Bal {
  constructor(scene, grenzen) {
    this.grenzen = grenzen; // { minX, maxX, minZ, maxZ } waar de bal tegen de rand stuitert
    const tex = canvasTextuur(256, 128, (ctx, b, h) => {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, b, h);
      ctx.fillStyle = '#1d1d1d';
      // Vlakjes (equirectangulair: dat geeft op de bol het bekende voetbalpatroon).
      const vlak = (x, y, r) => {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
        ctx.fill();
      };
      for (let i = 0; i < 6; i++) { vlak(i * 43 + 10, 30, 13); vlak(i * 43 + 31, 92, 13); }
      ctx.fillRect(0, 0, b, 6); ctx.fillRect(0, h - 6, b, 6);
    });
    this.mesh = new THREE.Mesh(new THREE.SphereGeometry(BAL_STRAAL, 20, 14), new THREE.MeshLambertMaterial({ map: tex }));
    this.mesh.castShadow = true;
    this.mesh.userData.geenKlik = true;
    scene.add(this.mesh);
    this.pos = this.mesh.position;
    this.vel = new THREE.Vector3();
    this._as = new THREE.Vector3();
    this.zetOp(0, 0);
  }

  zetOp(x, z) {
    this.pos.set(x, BAL_STRAAL, z);
    this.vel.set(0, 0, 0);
  }

  /** Trap de bal (richting = genormaliseerde horizontale richting). */
  trap(richting, snelheid, omhoog = 0) {
    this.vel.set(richting.x * snelheid, omhoog, richting.z * snelheid);
  }

  get snelheid() { return Math.hypot(this.vel.x, this.vel.z); }
  get opDeGrond() { return this.pos.y < BAL_STRAAL + 0.05; }

  update(dt) {
    const stappen = 3; // kleine stapjes: zo vliegt de bal niet door een paal heen
    const h = dt / stappen;
    for (let i = 0; i < stappen; i++) this.stap(h);
    // Draaien terwijl hij rolt.
    const v = this.snelheid;
    if (v > 0.01) {
      this._as.set(this.vel.z, 0, -this.vel.x).normalize();
      this.mesh.rotateOnWorldAxis(this._as, (v * dt) / BAL_STRAAL);
    }
  }

  stap(dt) {
    const p = this.pos, v = this.vel, r = BAL_STRAAL;
    const vorigeX = p.x, vorigeZ = p.z, vorigeY = p.y;
    v.y -= ZWAARTEKRACHT * dt;
    p.addScaledVector(v, dt);

    // Grond: stuiteren en rollen met wrijving.
    if (p.y < r) {
      p.y = r;
      v.y = v.y < -1.2 ? -v.y * 0.5 : 0;
      const wrijving = Math.exp(-1.3 * dt);
      v.x *= wrijving; v.z *= wrijving;
      if (Math.hypot(v.x, v.z) < 0.05) { v.x = 0; v.z = 0; }
    } else {
      const lucht = Math.exp(-0.15 * dt);
      v.x *= lucht; v.z *= lucht;
    }

    // Randen (reclameborden / tribunes).
    const g = this.grenzen;
    if (p.x < g.minX + r) { p.x = g.minX + r; v.x = Math.abs(v.x) * 0.55; }
    if (p.x > g.maxX - r) { p.x = g.maxX - r; v.x = -Math.abs(v.x) * 0.55; }
    if (p.z < g.minZ + r) { p.z = g.minZ + r; v.z = Math.abs(v.z) * 0.55; }
    if (p.z > g.maxZ - r) { p.z = g.maxZ - r; v.z = -Math.abs(v.z) * 0.55; }

    // Doelen: palen, lat en net.
    const { doelBreedte: b, doelHoogte: hoogte, doelDiepte: diepte } = VELD;
    for (const kant of [-1, 1]) {
      const lijnX = kant * HALF_L;
      // Palen (verticaal).
      for (const pz of [-b / 2, b / 2]) {
        if (p.y < hoogte + r) this.botsCirkel(lijnX, pz, PAAL_STRAAL + r, 0.75);
      }
      // Lat (horizontaal, langs z).
      if (Math.abs(p.z) < b / 2) {
        const dx = p.x - lijnX, dy = p.y - hoogte;
        const afst = Math.hypot(dx, dy);
        if (afst < PAAL_STRAAL + r && afst > 1e-4) {
          const nx = dx / afst, ny = dy / afst;
          p.x = lijnX + nx * (PAAL_STRAAL + r);
          p.y = hoogte + ny * (PAAL_STRAAL + r);
          const vn = v.x * nx + v.y * ny;
          if (vn < 0) { v.x -= 1.7 * vn * nx; v.y -= 1.7 * vn * ny; }
        }
      }
      // Net: binnen de diepte van het doel.
      const voorbij = kant * p.x > HALF_L;
      const wasVoorbij = kant * vorigeX > HALF_L;
      const inDiepte = kant * p.x < HALF_L + diepte + r;
      if ((voorbij || wasVoorbij) && kant * p.x < HALF_L + diepte + 0.6) {
        // Achternet.
        if (Math.abs(p.z) < b / 2 + r && p.y < hoogte && kant * p.x > HALF_L + diepte - r) {
          p.x = kant * (HALF_L + diepte - r);
          v.x *= -0.15; v.z *= 0.4;
        }
        // Zijnetten (van binnen en van buiten).
        for (const zn of [-b / 2, b / 2]) {
          const kruist = (vorigeZ - zn) * (p.z - zn) < 0 || Math.abs(p.z - zn) < r;
          if (kruist && p.y < hoogte && inDiepte) {
            const binnen = Math.abs(vorigeZ) < Math.abs(zn);
            p.z = zn + (binnen ? -Math.sign(zn) : Math.sign(zn)) * r;
            v.z *= -0.2; v.x *= 0.5;
          }
        }
        // Dak van het net.
        if (Math.abs(p.z) < b / 2 && inDiepte && (vorigeY - hoogte) * (p.y - hoogte) < 0) {
          p.y = vorigeY < hoogte ? hoogte - r : hoogte + r;
          v.y *= -0.2;
        }
      }
    }
  }

  /** Botsen tegen een verticale cilinder (paal, speler). */
  botsCirkel(cx, cz, minAfstand, terugkaats = 0.6) {
    const p = this.pos, v = this.vel;
    const dx = p.x - cx, dz = p.z - cz;
    const afst = Math.hypot(dx, dz);
    if (afst >= minAfstand || afst < 1e-4) return false;
    const nx = dx / afst, nz = dz / afst;
    p.x = cx + nx * minAfstand;
    p.z = cz + nz * minAfstand;
    const vn = v.x * nx + v.z * nz;
    if (vn < 0) { v.x -= (1 + terugkaats) * vn * nx; v.z -= (1 + terugkaats) * vn * nz; }
    return true;
  }

  /** Zit de bal helemaal over de doellijn, tussen de palen en onder de lat? Geeft -1, 1 of 0. */
  inDoel() {
    const p = this.pos;
    if (Math.abs(p.z) > VELD.doelBreedte / 2 || p.y > VELD.doelHoogte) return 0;
    // Alleen binnen het net telt (een bal die over het doel ging en erachter landt niet).
    const diep = HALF_L + VELD.doelDiepte + 0.1;
    if (p.x > HALF_L + BAL_STRAAL && p.x < diep) return 1;
    if (p.x < -HALF_L - BAL_STRAAL && p.x > -diep) return -1;
    return 0;
  }
}
