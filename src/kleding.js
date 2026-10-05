import * as THREE from 'three';
import { KLEDING } from './data/oefeningen.js';
import { mat, doos, cilinder, kegel, bol, canvasTextuur } from './wereld/helpers.js';

export const CATEGORIEEN = ['hoofd', 'shirt', 'broek', 'schoenen', 'extra'];
export const itemMetId = (id) => KLEDING.find((k) => k.id === id);

/** Lijst met id's van alles wat iemand aan heeft (uitrusting = { hoofd, shirt, broek, schoenen, extra: [] }). */
export function alleIds(uitrusting) {
  return [uitrusting.hoofd, uitrusting.shirt, uitrusting.broek, uitrusting.schoenen, ...(uitrusting.extra ?? [])].filter(Boolean);
}

/** Bewaart hoe het poppetje er zonder kleding uitzag (eenmalig). */
function onthoudOrigineel(speler) {
  if (speler._origineel) return;
  const d = speler.delen;
  const alle = [d.lijf, ...d.mouwen, ...d.broeken, ...d.schoenen, ...d.pet, ...d.rugzak];
  speler._origineel = alle.map((m) => ({ m, materiaal: m.material, schaal: m.scale.clone(), pos: m.position.clone() }));
  speler.kledingStukken = [];
}

function zetTerug(speler) {
  for (const o of speler._origineel) {
    o.m.material = o.materiaal;
    o.m.scale.copy(o.schaal);
    o.m.position.copy(o.pos);
    o.m.visible = true;
  }
  for (const stuk of speler.kledingStukken) stuk.parent?.remove(stuk);
  speler.kledingStukken = [];
  speler.cape = null;
}

function voegToe(speler, stuk, ouder) {
  stuk.traverse((o) => {
    if (o.isMesh) { o.castShadow = true; o.userData.geenKlik = true; }
  });
  ouder.add(stuk);
  speler.kledingStukken.push(stuk);
  return stuk;
}

const glim = (kleur) => mat(kleur, { emissive: new THREE.Color(kleur).multiplyScalar(0.25) });

/** Trekt de uitrusting aan op een Speler-poppetje (de speler zelf, of de paspop in de winkel). */
export function trekAan(speler, uitrusting) {
  onthoudOrigineel(speler);
  zetTerug(speler);
  for (const id of alleIds(uitrusting)) {
    const item = itemMetId(id);
    if (item) BOUWERS[item.categorie]?.(speler, item);
  }
}

/* ---------- Per categorie ---------- */

const BOUWERS = {
  hoofd(speler, item) {
    const d = speler.delen;
    if (item.model === 'pet') {
      d.pet.forEach((m) => { m.material = mat(item.kleur); });
      return;
    }
    d.pet.forEach((m) => { m.visible = false; });
    const g = new THREE.Group();
    const k = item.kleur;
    switch (item.model) {
      case 'beanie': {
        const muts = new THREE.Mesh(new THREE.SphereGeometry(0.39, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), mat(k));
        muts.position.y = 0.02;
        g.add(muts);
        const rand = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.06, 6, 20), mat(new THREE.Color(k).multiplyScalar(0.75).getHex()));
        rand.rotation.x = Math.PI / 2;
        rand.position.y = 0.06;
        g.add(rand);
        bol(0.1, 0xffffff, 0, 0.43, 0, g);
        break;
      }
      case 'cowboy': {
        const rand = cilinder(0.64, 0.05, k, 0, 0.18, 0, g, 20);
        rand.scale.z = 0.85;
        const kroon = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.34, 14), mat(k));
        kroon.position.y = 0.36;
        g.add(kroon);
        cilinder(0.325, 0.06, 0x5c3a1a, 0, 0.24, 0, g, 14);
        break;
      }
      case 'piraat': {
        const rand = cilinder(0.56, 0.06, k, 0, 0.24, 0, g, 16);
        rand.scale.z = 0.75;
        cilinder(0.32, 0.3, k, 0, 0.4, 0, g, 12);
        doos(0.66, 0.05, 0.05, 0xf2c230, 0, 0.28, 0.4, g);
        bol(0.07, 0xffffff, 0, 0.42, 0.31, g);
        break;
      }
      case 'kroon': {
        const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.18, 18, 1, true), glim(k));
        ring.material.side = THREE.DoubleSide;
        ring.position.y = 0.34;
        g.add(ring);
        for (let i = 0; i < 6; i++) {
          const h = (i / 6) * Math.PI * 2;
          kegel(0.06, 0.16, glim(k), Math.sin(h) * 0.3, 0.5, Math.cos(h) * 0.3, g, 5);
          bol(0.035, i % 2 ? 0xe03131 : 0x1c7ed6, Math.sin(h) * 0.31, 0.34, Math.cos(h) * 0.31, g);
        }
        break;
      }
      default:
    }
    voegToe(speler, g, speler.hoofd);
  },

  shirt(speler, item) {
    const d = speler.delen;
    const k = item.kleur;
    d.mouwen.forEach((m) => { m.material = mat(k); });
    if (item.model === 'voetbal') {
      const strepen = canvasTextuur(128, 64, (ctx, b, h) => {
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = i % 2 ? '#ffffff' : '#e03131';
          ctx.fillRect((i * b) / 8, 0, b / 8 + 1, h);
        }
      });
      d.lijf.material = new THREE.MeshLambertMaterial({ map: strepen });
      // Rugnummer 7.
      const nummer = new THREE.Mesh(
        new THREE.PlaneGeometry(0.34, 0.34),
        new THREE.MeshLambertMaterial({
          map: canvasTextuur(64, 64, (ctx) => {
            ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 64, 64);
            ctx.fillStyle = '#1d2b4f'; ctx.font = 'bold 54px sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('7', 32, 36);
          }),
        }),
      );
      nummer.position.set(0, 1.25, -0.37);
      nummer.rotation.y = Math.PI;
      voegToe(speler, nummer, speler.model);
      d.rugzak.forEach((m) => { m.visible = false; }); // anders zie je het nummer niet
      return;
    }
    d.lijf.material = mat(k);
    if (item.model === 'held') {
      // Gele ster op de borst.
      const vorm = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 0.07 : 0.16;
        const h = (i / 10) * Math.PI * 2 + Math.PI / 2;
        if (i === 0) vorm.moveTo(Math.cos(h) * r, Math.sin(h) * r);
        else vorm.lineTo(Math.cos(h) * r, Math.sin(h) * r);
      }
      const ster = new THREE.Mesh(new THREE.ExtrudeGeometry(vorm, { depth: 0.03, bevelEnabled: false }), glim(0xffd43b));
      ster.position.set(0, 1.22, 0.35);
      voegToe(speler, ster, speler.model);
      const riem = cilinder(0.37, 0.1, 0xe03131, 0, 0.84, 0, null, 16);
      voegToe(speler, riem, speler.model);
    }
  },

  broek(speler, item) {
    const d = speler.delen;
    const k = item.kleur;
    if (item.model === 'kort') {
      d.broeken.forEach((m) => {
        m.material = mat(k);
        m.scale.y = 0.45;
        m.position.y = -0.14;
        const been = doos(0.2, 0.36, 0.22, speler.uiterlijk.huid, 0, -0.44, 0, null);
        voegToe(speler, been, m.parent);
      });
      return;
    }
    d.broeken.forEach((m) => { m.material = item.model === 'glim' ? glim(k) : mat(k); });
  },

  schoenen(speler, item) {
    const d = speler.delen;
    const k = item.kleur;
    d.schoenen.forEach((m) => {
      m.material = item.model === 'glim' ? glim(k) : mat(k);
      if (item.model === 'laars') {
        m.scale.set(1.05, 2.4, 1);
        m.position.y = -0.6;
      }
    });
  },

  extra(speler, item) {
    const d = speler.delen;
    const k = item.kleur;
    switch (item.model) {
      case 'zonnebril': {
        const g = new THREE.Group();
        for (const x of [-0.13, 0.13]) doos(0.15, 0.1, 0.03, k, x, 0.05, 0.355, g);
        doos(0.1, 0.025, 0.02, k, 0, 0.07, 0.36, g);
        voegToe(speler, g, speler.hoofd);
        break;
      }
      case 'vlinderdas': {
        const g = new THREE.Group();
        for (const s of [-1, 1]) {
          const lus = kegel(0.08, 0.15, k, s * 0.08, 1.56, 0.33, g, 6);
          lus.rotation.z = (s * Math.PI) / 2;
        }
        bol(0.04, k, 0, 1.56, 0.35, g);
        voegToe(speler, g, speler.model);
        break;
      }
      case 'rugzak':
        d.rugzak.forEach((m, i) => { m.material = mat(i === 0 ? k : new THREE.Color(k).multiplyScalar(0.8).getHex()); });
        break;
      case 'cape': {
        d.rugzak.forEach((m) => { m.visible = false; });
        const scharnier = new THREE.Group();
        scharnier.position.set(0, 1.6, -0.3);
        const doek = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.2), new THREE.MeshLambertMaterial({ color: k, side: THREE.DoubleSide }));
        doek.position.set(0, -0.6, -0.05);
        scharnier.add(doek);
        doos(0.7, 0.06, 0.06, 0xffd43b, 0, 0, 0, scharnier); // gouden sluiting
        scharnier.rotation.x = 0.12;
        voegToe(speler, scharnier, speler.model);
        speler.cape = scharnier;
        break;
      }
      default:
    }
  },
};
