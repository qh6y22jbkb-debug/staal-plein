import * as THREE from 'three';
import { mat, doos, cilinder, kegel, bol, canvasTextuur } from './wereld/helpers.js';

/**
 * De karakters achter de kramen. Elk karakter is opgebouwd uit simpele vormen
 * met eigen kleuren, haar, hoofddeksel en accessoires.
 */
export const STIJLEN = {
  kapitein: { huid: 0xe8b48f, shirt: 0xd9473e, haar: 0x5a3a22, hoed: 'piraat', extra: ['ooglap', 'baard', 'papegaai'] },
  tessa: { huid: 0xf2c29b, shirt: 0xf783ac, haar: 0x8a4b2a, kapsel: 'lang', hoed: 'koksmuts', extra: ['schort'] },
  dirk: { huid: 0xa86b45, shirt: 0x1c7ed6, haar: 0x222222, hoed: 'petAchter', petKleur: 0xffd43b, extra: ['stokken'] },
  vera: { huid: 0xf2c29b, shirt: 0x9c36b5, haar: 0x7048e8, kapsel: 'knot', extra: ['bril'] },
  peter: { huid: 0xf0c09a, shirt: 0xffffff, haar: 0xc08a3e, hoed: 'bakkerspet', petKleur: 0x2a4f8f, extra: ['snor', 'schort'] },
  olga: { huid: 0xd99a6c, shirt: 0xfd7e14, haar: 0x3b2314, kapsel: 'staartjes', extra: ['strik'] },
  gijs: { huid: 0xf2c29b, shirt: 0x12b886, haar: 0xe0a33a, hoed: 'ijsmuts', extra: ['vlinderdas'] },
  bo: { huid: 0xe8b48f, shirt: 0xf06595, haar: 0xe8590c, kapsel: 'knot', extra: ['bril', 'meetlint', 'bloem'] },
  // Leergroep 3: de rekenkarakters, elk met een badge op het shirt.
  pim: { huid: 0xf2c29b, shirt: 0x2f9e44, haar: 0x6b3e1f, hoed: 'petAchter', petKleur: 0x2f9e44, extra: ['badge'], badge: '+', badgeKleur: '#2f9e44' },
  mila: { huid: 0xd99a6c, shirt: 0xe03131, haar: 0x2b1a10, kapsel: 'staartjes', extra: ['badge', 'strik'], badge: '−', badgeKleur: '#e03131' },
  kees: { huid: 0xf0c09a, shirt: 0x1c7ed6, haar: 0xd9a441, extra: ['bril', 'badge'], badge: '×', badgeKleur: '#1c7ed6' },
  dina: { huid: 0xa86b45, shirt: 0x7048e8, haar: 0x111111, kapsel: 'knot', extra: ['badge'], badge: ':', badgeKleur: '#7048e8' },
  klaas: { huid: 0xe8b48f, shirt: 0xf59f00, haar: 0x9a9a9a, extra: ['snor', 'badge'], badge: 'klok', badgeKleur: '#e67700' },
  tijn: { huid: 0xf2c29b, shirt: 0x0ca678, haar: 0xe8590c, hoed: 'petAchter', petKleur: 0xffd43b, extra: ['badge', 'vlinderdas'], badge: '1×1', badgeKleur: '#0ca678' },
  lotte: { huid: 0xf2c29b, shirt: 0xc92a2a, haar: 0xf2c230, kapsel: 'staartjes', extra: ['zaklamp', 'strik'] },
};

export class Karakter {
  constructor(stijl) {
    this.stijl = stijl;
    this.groep = new THREE.Group();
    this.lijf = new THREE.Group(); // alles behalve de benen (wiebelt een beetje)
    this.groep.add(this.lijf);
    this.praat = false;
    this.zwaaien = 0;
    this.fase = Math.random() * 10;
    this.bouw();
    this.groep.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  }

  bouw() {
    const s = this.stijl;
    const g = this.lijf;

    for (const x of [-0.17, 0.17]) {
      doos(0.24, 0.75, 0.26, 0x3b4a6b, x, 0.38, 0, this.groep);
    }
    const romp = new THREE.Mesh(new THREE.CapsuleGeometry(0.4, 0.5, 4, 10), mat(s.shirt));
    romp.position.y = 1.2;
    g.add(romp);
    if (s.extra?.includes('schort')) doos(0.6, 0.75, 0.1, 0xffffff, 0, 1.05, 0.36, g);

    this.armen = [-0.52, 0.52].map((x) => {
      const schouder = new THREE.Group();
      schouder.position.set(x, 1.5, 0);
      doos(0.2, 0.58, 0.22, s.shirt, 0, -0.26, 0, schouder);
      bol(0.13, s.huid, 0, -0.6, 0, schouder);
      if (s.extra?.includes('stokken')) {
        const stok = cilinder(0.025, 0.7, 0xf1d6a0, 0, -0.62, 0.3, schouder, 5);
        stok.rotation.x = Math.PI / 2;
      }
      if (x > 0 && s.extra?.includes('zaklamp')) {
        // Zaklamp in de hand, met de lamp naar voren.
        const lamp = new THREE.Group();
        lamp.position.set(0, -0.62, 0.12);
        lamp.rotation.x = Math.PI / 2;
        schouder.add(lamp);
        cilinder(0.06, 0.34, 0x343a40, 0, 0, 0, lamp, 10);
        cilinder(0.1, 0.1, 0xfab005, 0, 0.2, 0, lamp, 12);
        cilinder(0.085, 0.02, 0xfff9db, 0, 0.26, 0, lamp, 12).material = mat(0xfff3bf, { emissive: 0xffe066 });
      }
      g.add(schouder);
      return schouder;
    });

    const hoofd = new THREE.Group();
    hoofd.position.y = 2.0;
    g.add(hoofd);
    this.hoofd = hoofd;
    hoofd.add(new THREE.Mesh(new THREE.SphereGeometry(0.38, 16, 12), mat(s.huid)));

    const oog = new THREE.SphereGeometry(0.06, 8, 6);
    for (const x of [-0.14, 0.14]) {
      const o = new THREE.Mesh(oog, mat(0x1d1d1d));
      o.position.set(x, 0.06, 0.34);
      hoofd.add(o);
    }
    for (const x of [-0.24, 0.24]) {
      const wang = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 6), mat(0xff9e9e));
      wang.position.set(x, -0.06, 0.31);
      wang.scale.z = 0.4;
      hoofd.add(wang);
    }
    // Mond: gaat open en dicht als het karakter praat.
    this.mond = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 6), mat(0x9c2a2a));
    this.mond.position.set(0, -0.14, 0.34);
    this.mond.scale.set(1.5, 0.45, 0.5);
    hoofd.add(this.mond);

    this.bouwHaar(hoofd);
    this.bouwHoed(hoofd);
    this.bouwExtras(hoofd);
  }

  bouwHaar(hoofd) {
    const s = this.stijl;
    if (s.hoed === 'piraat' || s.hoed === 'koksmuts' || s.hoed === 'bakkerspet') {
      // Een randje haar onder het hoofddeksel.
      const rand = new THREE.Mesh(new THREE.SphereGeometry(0.395, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.42), mat(s.haar));
      rand.rotation.x = -0.35;
      hoofd.add(rand);
    } else if (s.hoed !== 'petAchter') {
      const kap = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), mat(s.haar));
      kap.rotation.x = -0.25;
      hoofd.add(kap);
    }
    if (s.kapsel === 'lang') {
      doos(0.7, 0.6, 0.2, s.haar, 0, -0.22, -0.28, hoofd);
    }
    if (s.kapsel === 'knot') {
      bol(0.2, s.haar, 0, 0.38, -0.25, hoofd);
    }
    if (s.kapsel === 'staartjes') {
      for (const x of [-0.42, 0.42]) {
        const staart = bol(0.15, s.haar, x, -0.05, -0.1, hoofd);
        staart.scale.y = 1.6;
      }
    }
  }

  bouwHoed(hoofd) {
    const s = this.stijl;
    switch (s.hoed) {
      case 'piraat': {
        const rand = cilinder(0.55, 0.06, 0x1d1d1d, 0, 0.28, 0, hoofd, 16);
        rand.scale.z = 0.75;
        cilinder(0.32, 0.32, 0x1d1d1d, 0, 0.45, 0, hoofd, 12);
        bol(0.07, 0xffffff, 0, 0.45, 0.3, hoofd); // doodshoofdje
        doos(0.66, 0.05, 0.05, 0xf2c230, 0, 0.31, 0.4, hoofd); // gouden randje
        break;
      }
      case 'koksmuts':
        cilinder(0.3, 0.32, 0xffffff, 0, 0.42, 0, hoofd, 14);
        bol(0.38, 0xffffff, 0, 0.7, 0, hoofd, 2).scale.y = 0.65;
        break;
      case 'petAchter': {
        const pet = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(s.petKleur));
        pet.position.y = 0.06;
        hoofd.add(pet);
        doos(0.5, 0.05, 0.32, s.petKleur, 0, 0.1, -0.44, hoofd);
        break;
      }
      case 'bakkerspet': {
        const pet = cilinder(0.42, 0.14, s.petKleur, 0, 0.36, -0.02, hoofd, 14);
        pet.rotation.x = -0.15;
        doos(0.46, 0.04, 0.24, s.petKleur, 0, 0.3, 0.4, hoofd);
        break;
      }
      case 'ijsmuts': {
        const muts = doos(0.62, 0.22, 0.32, 0xffffff, 0, 0.42, 0, hoofd);
        muts.rotation.x = -0.1;
        doos(0.64, 0.06, 0.34, 0xf06595, 0, 0.33, 0, hoofd);
        break;
      }
      default:
        break;
    }
  }

  bouwExtras(hoofd) {
    const extra = this.stijl.extra ?? [];
    if (extra.includes('ooglap')) {
      doos(0.16, 0.13, 0.04, 0x111111, 0.14, 0.07, 0.36, hoofd);
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.012, 4, 24), mat(0x111111));
      band.rotation.set(0, 0, -0.5);
      band.rotation.y = Math.PI / 2;
      band.rotation.z = 0.35;
      hoofd.add(band);
    }
    if (extra.includes('baard')) {
      const baard = bol(0.3, this.stijl.haar, 0, -0.28, 0.12, hoofd, 1);
      baard.scale.set(1.05, 0.8, 0.8);
      this.mond.position.z = 0.4;
    }
    if (extra.includes('snor')) {
      for (const k of [-1, 1]) {
        const snor = bol(0.09, this.stijl.haar, k * 0.08, -0.06, 0.36, hoofd);
        snor.scale.set(1.3, 0.55, 0.6);
      }
    }
    if (extra.includes('bril')) {
      for (const x of [-0.14, 0.14]) {
        const glas = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.018, 6, 16), mat(0x222222));
        glas.position.set(x, 0.06, 0.37);
        hoofd.add(glas);
      }
      doos(0.08, 0.02, 0.02, 0x222222, 0, 0.08, 0.38, hoofd);
    }
    if (extra.includes('strik')) {
      for (const k of [-1, 1]) {
        const lus = kegel(0.1, 0.18, 0xf2c230, k * 0.1, 0.38, -0.05, hoofd, 6);
        lus.rotation.z = (k * Math.PI) / 2;
      }
    }
    if (extra.includes('vlinderdas')) {
      for (const k of [-1, 1]) {
        const lus = kegel(0.09, 0.16, 0xd9473e, k * 0.08, 1.62, 0.36, this.lijf, 6);
        lus.rotation.z = (k * Math.PI) / 2;
      }
    }
    if (extra.includes('meetlint')) {
      // Geel meetlint om de nek, met twee hangende uiteinden.
      for (const x of [-0.16, 0.16]) doos(0.07, 0.5, 0.02, 0xffd43b, x, 1.38, 0.38, this.lijf);
      const kraag = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 4, 16), mat(0xffd43b));
      kraag.rotation.x = Math.PI / 2;
      kraag.position.y = 1.68;
      this.lijf.add(kraag);
    }
    if (extra.includes('badge')) {
      // Rond buttonnetje op de borst met een rekenteken (of een klokje).
      const teken = this.stijl.badge;
      const kleur = this.stijl.badgeKleur ?? '#1d2b4f';
      const tex = canvasTextuur(128, 128, (ctx, b, h) => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(b / 2, h / 2, 62, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = kleur; ctx.lineWidth = 10;
        ctx.beginPath(); ctx.arc(b / 2, h / 2, 54, 0, Math.PI * 2); ctx.stroke();
        if (teken === 'klok') {
          ctx.lineWidth = 9; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(b / 2, h / 2); ctx.lineTo(b / 2, h / 2 - 34); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(b / 2, h / 2); ctx.lineTo(b / 2 + 24, h / 2 + 8); ctx.stroke();
        } else {
          ctx.fillStyle = kleur;
          ctx.font = `bold ${teken.length > 1 ? 46 : 92}px "Trebuchet MS", sans-serif`;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText(teken, b / 2, h / 2 + (teken.length > 1 ? 3 : 6));
        }
      });
      const badge = new THREE.Mesh(new THREE.CircleGeometry(0.15, 20), new THREE.MeshLambertMaterial({ map: tex }));
      badge.position.set(0.16, 1.42, 0.405);
      this.lijf.add(badge);
    }
    if (extra.includes('bloem')) {
      const bloem = new THREE.Group();
      bloem.position.set(0.3, 0.28, 0.12);
      hoofd.add(bloem);
      for (let i = 0; i < 5; i++) {
        const h = (i / 5) * Math.PI * 2;
        bol(0.06, 0xffffff, Math.cos(h) * 0.07, Math.sin(h) * 0.07, 0, bloem);
      }
      bol(0.05, 0xfab005, 0, 0, 0.02, bloem);
    }
    if (extra.includes('papegaai')) {
      const p = new THREE.Group();
      p.position.set(-0.55, 1.75, 0);
      this.lijf.add(p);
      bol(0.14, 0x37b24d, 0, 0.12, 0, p).scale.y = 1.3;
      bol(0.1, 0x37b24d, 0, 0.34, 0.03, p);
      const snavel = kegel(0.04, 0.1, 0xff922b, 0, 0.32, 0.14, p, 5);
      snavel.rotation.x = Math.PI / 2;
      doos(0.08, 0.25, 0.04, 0xe03131, 0, -0.05, -0.12, p).rotation.x = -0.4;
      for (const x of [-0.04, 0.04]) bol(0.02, 0x111111, x, 0.37, 0.09, p);
      this.papegaai = p;
    }
  }

  /** Per frame: ademen, kijken naar de speler, zwaaien, praten. */
  update(dt, t, spelerPos) {
    this.fase += dt;
    const f = this.fase;
    this.lijf.position.y = Math.sin(f * 2) * 0.02;

    // Hoofd draait (een beetje) naar de speler.
    const wereld = new THREE.Vector3();
    this.groep.getWorldPosition(wereld);
    const afstand = Math.hypot(spelerPos.x - wereld.x, spelerPos.z - wereld.z);
    let doelDraai = 0;
    if (afstand < 10) {
      const hoekWereld = Math.atan2(spelerPos.x - wereld.x, spelerPos.z - wereld.z);
      const eigen = this.groep.getWorldQuaternion(new THREE.Quaternion());
      const eigenHoek = new THREE.Euler().setFromQuaternion(eigen, 'YXZ').y;
      doelDraai = Math.atan2(Math.sin(hoekWereld - eigenHoek), Math.cos(hoekWereld - eigenHoek));
      doelDraai = THREE.MathUtils.clamp(doelDraai, -0.9, 0.9);
    }
    this.hoofd.rotation.y += (doelDraai - this.hoofd.rotation.y) * Math.min(1, dt * 4);

    // Zwaaien als de speler dichtbij komt (niet tijdens het praten).
    const wilZwaaien = afstand < 6 && !this.praat;
    this.zwaaien += ((wilZwaaien ? 1 : 0) - this.zwaaien) * Math.min(1, dt * 4);

    const [links, rechts] = this.armen;
    if (this.stijl.extra?.includes('stokken')) {
      // Dirk drumt altijd een beetje.
      const tempo = this.praat ? 6 : 9;
      links.rotation.x = -1.2 + Math.sin(f * tempo) * 0.3;
      rechts.rotation.x = -1.2 + Math.sin(f * tempo + Math.PI) * 0.3;
      rechts.rotation.z = 0;
    } else {
      links.rotation.x = Math.sin(f * 1.5) * 0.05;
      rechts.rotation.x = Math.sin(f * 1.5 + 1) * 0.05;
      rechts.rotation.z = this.zwaaien * (2.6 + Math.sin(f * 8) * 0.35);
      if (this.praat) {
        links.rotation.x = -0.4 + Math.sin(f * 3) * 0.25;
        rechts.rotation.x = -0.3 + Math.sin(f * 2.5 + 1) * 0.25;
      }
    }

    this.mond.scale.y = this.praat ? 0.45 + Math.abs(Math.sin(f * 11)) * 0.6 : 0.45;
    if (this.papegaai) this.papegaai.rotation.y = Math.sin(f * 1.3) * 0.6;
  }
}
