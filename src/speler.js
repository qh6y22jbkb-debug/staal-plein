import * as THREE from 'three';
import { mat, doos, bol } from './wereld/helpers.js';

const SNELHEID = 6.5;
const ZWAARTEKRACHT = 28;
const SPRONGKRACHT = 10;
export const SPELER_STRAAL = 0.45;
const STAPHOOGTE = 0.4;

const STANDAARD = {
  huid: 0xf2c29b, shirt: 0xff7a29, broek: 0x2a4f8f, schoen: 0x333333,
  pet: 0x2a6fb5, // null = geen pet, dan haar
  haar: 0x4a2f1b, kapsel: 'kort', // 'kort', 'staartjes', 'krullen', 'paardenstaart'
  rugzak: 0xffd43b, // null = geen rugzak
  snelheid: 6.5,
};

/** Een blokkig kind (de speler, of een van de kinderen op het plein). */
export class Speler {
  constructor(scene, uiterlijk = {}) {
    this.uiterlijk = { ...STANDAARD, ...uiterlijk };
    this.groep = new THREE.Group();
    this.model = new THREE.Group();
    this.groep.add(this.model);
    scene.add(this.groep);
    this.positie = this.groep.position;

    this.vy = 0;
    this.opGrond = true;
    this.richting = Math.PI; // kijkt naar de school
    this.loopFase = 0;
    this.huidigeSnelheid = 0;
    this.model.rotation.y = this.richting;

    this.bouwModel();
    this.groep.traverse((o) => { if (o.isMesh) o.userData.geenKlik = true; });
  }

  bouwModel() {
    const m = this.model;
    const { huid, shirt, broek, schoen, pet, haar, kapsel, rugzak } = this.uiterlijk;

    // Benen (draaien om de heup).
    this.benen = [-0.17, 0.17].map((x) => {
      const heup = new THREE.Group();
      heup.position.set(x, 0.75, 0);
      doos(0.24, 0.62, 0.26, broek, 0, -0.33, 0, heup);
      doos(0.26, 0.14, 0.38, schoen, 0, -0.68, 0.05, heup);
      m.add(heup);
      return heup;
    });

    // Lijf.
    const lijf = new THREE.Mesh(new THREE.CapsuleGeometry(0.36, 0.45, 4, 10), mat(shirt));
    lijf.position.y = 1.15;
    lijf.castShadow = true;
    m.add(lijf);
    if (rugzak != null) {
      doos(0.5, 0.55, 0.22, rugzak, 0, 1.2, -0.38, m);
      doos(0.4, 0.2, 0.05, new THREE.Color(rugzak).multiplyScalar(0.8).getHex(), 0, 1.08, -0.5, m);
    }

    // Armen (draaien om de schouder).
    this.armen = [-0.5, 0.5].map((x) => {
      const schouder = new THREE.Group();
      schouder.position.set(x, 1.45, 0);
      doos(0.18, 0.55, 0.2, shirt, 0, -0.25, 0, schouder);
      bol(0.12, huid, 0, -0.58, 0, schouder);
      m.add(schouder);
      return schouder;
    });

    // Hoofd met gezichtje en pet.
    const hoofd = new THREE.Group();
    hoofd.position.y = 1.92;
    m.add(hoofd);
    const kop = new THREE.Mesh(new THREE.SphereGeometry(0.36, 16, 12), mat(huid));
    kop.castShadow = true;
    hoofd.add(kop);
    const oog = new THREE.SphereGeometry(0.055, 8, 6);
    for (const x of [-0.13, 0.13]) {
      const o = new THREE.Mesh(oog, mat(0x1d1d1d));
      o.position.set(x, 0.05, 0.32);
      hoofd.add(o);
    }
    const lach = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 6, 12, Math.PI), mat(0xb03030));
    lach.rotation.z = Math.PI;
    lach.position.set(0, -0.08, 0.33);
    hoofd.add(lach);
    for (const x of [-0.22, 0.22]) {
      const wang = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), mat(0xff9e9e));
      wang.position.set(x, -0.06, 0.29);
      wang.scale.z = 0.4;
      hoofd.add(wang);
    }
    if (pet != null) {
      const petBol = new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(pet));
      petBol.position.y = 0.06;
      petBol.castShadow = true;
      hoofd.add(petBol);
      doos(0.5, 0.05, 0.3, pet, 0, 0.1, 0.42, hoofd);
    } else {
      const kap = new THREE.Mesh(new THREE.SphereGeometry(0.385, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), mat(haar));
      kap.rotation.x = -0.3;
      kap.castShadow = true;
      hoofd.add(kap);
      if (kapsel === 'staartjes') {
        for (const x of [-0.4, 0.4]) bol(0.14, haar, x, -0.02, -0.12, hoofd).scale.y = 1.5;
      } else if (kapsel === 'paardenstaart') {
        bol(0.15, haar, 0, 0.0, -0.42, hoofd).scale.set(0.9, 1.8, 0.9);
      } else if (kapsel === 'krullen') {
        for (let i = 0; i < 7; i++) {
          const h = (i / 7) * Math.PI * 2;
          bol(0.12, haar, Math.cos(h) * 0.3, 0.22 + Math.sin(i * 2) * 0.05, Math.sin(h) * 0.3 - 0.05, hoofd, 0);
        }
      }
    }
    this.hoofd = hoofd;
  }

  /**
   * @param beweging {x, z} in wereldrichting, lengte 0..1
   * @returns afgelegde afstand (handig om te zien of de speler vastzit)
   */
  update(dt, beweging, springen, botsing, { draaiMee = true } = {}) {
    const pos = this.positie;
    const oudX = pos.x, oudZ = pos.z;
    const sterkte = Math.min(1, Math.hypot(beweging.x, beweging.z));

    if (sterkte > 0.05) {
      pos.x += beweging.x * this.uiterlijk.snelheid * dt;
      pos.z += beweging.z * this.uiterlijk.snelheid * dt;
      if (draaiMee) {
        // Draai in de looprichting (bij klikken op de grond of bij de kinderen).
        const doelRichting = Math.atan2(beweging.x, beweging.z);
        let verschil = doelRichting - this.richting;
        verschil = Math.atan2(Math.sin(verschil), Math.cos(verschil));
        this.richting += verschil * Math.min(1, dt * 12);
      }
    }

    if (springen && this.opGrond) {
      this.vy = SPRONGKRACHT;
      this.opGrond = false;
    }

    const grond = botsing.losOp(pos, SPELER_STRAAL, STAPHOOGTE);
    this.vy -= ZWAARTEKRACHT * dt;
    pos.y += this.vy * dt;
    if (pos.y <= grond) {
      pos.y = grond;
      this.vy = 0;
      this.opGrond = true;
    } else if (this.opGrond && pos.y - grond < STAPHOOGTE && this.vy <= 0) {
      pos.y = grond; // netjes van een randje af stappen
      this.vy = 0;
    } else {
      this.opGrond = false;
    }

    const afstand = Math.hypot(pos.x - oudX, pos.z - oudZ);
    this.animeer(dt, afstand / Math.max(dt, 1e-4));
    return afstand;
  }

  animeer(dt, snelheid) {
    this.model.rotation.y = this.richting;
    this.huidigeSnelheid += (snelheid - this.huidigeSnelheid) * Math.min(1, dt * 10);
    const s = this.huidigeSnelheid / SNELHEID;

    if (!this.opGrond) {
      // In de lucht: armen omhoog, benen een beetje gebogen.
      this.benen[0].rotation.x = -0.5;
      this.benen[1].rotation.x = 0.3;
      this.armen[0].rotation.z = -2.4;
      this.armen[1].rotation.z = 2.4;
      this.armen[0].rotation.x = this.armen[1].rotation.x = 0;
      return;
    }
    this.armen[0].rotation.z = this.armen[1].rotation.z = 0;
    this.loopFase += dt * (4 + 8 * s) * (s > 0.05 ? 1 : 0);
    const zwaai = Math.sin(this.loopFase) * 0.75 * Math.min(1, s);
    this.benen[0].rotation.x = zwaai;
    this.benen[1].rotation.x = -zwaai;
    this.armen[0].rotation.x = -zwaai;
    this.armen[1].rotation.x = zwaai;
    this.model.position.y = Math.abs(Math.sin(this.loopFase)) * 0.08 * Math.min(1, s);
    // Stilstaan: rustig ademen.
    if (s < 0.05) this.hoofd.position.y = 1.92 + Math.sin(performance.now() / 500) * 0.015;
  }
}
