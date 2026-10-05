import * as THREE from 'three';
import { mat, doos, cilinder, grondVlak, canvasTextuur, zaadRandom } from '../wereld/helpers.js';

/*
 * Het stadion van de Voetbalwereld. Het veld loopt langs de x-as:
 *   veld: x -20..20, z -12..12   doelen op x = ±20 (5 m breed, 2 m hoog)
 */
export const VELD = { lengte: 40, breedte: 24, doelBreedte: 5, doelHoogte: 2, doelDiepte: 1.3 };
export const HALF_L = VELD.lengte / 2;
export const HALF_B = VELD.breedte / 2;

/** Bouwt het hele stadion. Geeft { publiek, scorebord, update(dt) } terug. */
export function bouwStadion(scene) {
  bouwGras(scene);
  bouwLijnen(scene);
  const doelen = [-1, 1].map((kant) => bouwDoel(scene, kant));
  bouwReclameborden(scene);
  const publiek = bouwTribunes(scene);
  bouwLichtmasten(scene);
  const scorebord = new Scorebord(scene);
  return {
    doelen,
    publiek,
    scorebord,
    update(dt) { publiek.update(dt); },
  };
}

function bouwGras(scene) {
  grondVlak(300, 300, mat(0x5f9a46), 0, 0, 0, scene);
  grondVlak(64, 44, mat(0x8a7f74), 0, 0, 0.005, scene); // looppad rond het veld
  const stroken = canvasTextuur(512, 64, (ctx, b, h) => {
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = i % 2 ? '#4caf50' : '#43a047';
      ctx.fillRect((i * b) / 12, 0, b / 12 + 1, h);
    }
  });
  const veld = grondVlak(56, 36, new THREE.MeshLambertMaterial({ map: stroken }), 0, 0, 0.01, scene);
  veld.receiveShadow = true;
}

function bouwLijnen(scene) {
  const wit = mat(0xffffff);
  const lijn = (b, d, x, z) => grondVlak(b, d, wit, x, z, 0.02, scene);
  const dik = 0.15;
  lijn(VELD.lengte, dik, 0, -HALF_B); lijn(VELD.lengte, dik, 0, HALF_B);
  lijn(dik, VELD.breedte, -HALF_L, 0); lijn(dik, VELD.breedte, HALF_L, 0);
  lijn(dik, VELD.breedte, 0, 0);
  const ring = (rBinnen, x, z) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(rBinnen, rBinnen + dik, 48), wit);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.02, z);
    scene.add(m);
  };
  ring(3.3, 0, 0);
  const stip = new THREE.Mesh(new THREE.CircleGeometry(0.2, 16), wit);
  stip.rotation.x = -Math.PI / 2;
  stip.position.y = 0.021;
  scene.add(stip);
  for (const kant of [-1, 1]) {
    // Strafschopgebied en doelgebied.
    const x0 = kant * HALF_L;
    lijn(6, dik, x0 - kant * 3, -6); lijn(6, dik, x0 - kant * 3, 6); lijn(dik, 12, x0 - kant * 6, 0);
    lijn(2.2, dik, x0 - kant * 1.1, -3.5); lijn(2.2, dik, x0 - kant * 1.1, 3.5); lijn(dik, 7, x0 - kant * 2.2, 0);
    const pstip = new THREE.Mesh(new THREE.CircleGeometry(0.15, 12), wit);
    pstip.rotation.x = -Math.PI / 2;
    pstip.position.set(x0 - kant * 4.5, 0.021, 0);
    scene.add(pstip);
  }
}

/** Doel met palen, lat en net. kant = -1 (eigen doel, westkant) of 1 (doel van de tegenstander). */
function bouwDoel(scene, kant) {
  const g = new THREE.Group();
  g.position.x = kant * HALF_L;
  scene.add(g);
  const { doelBreedte: b, doelHoogte: h, doelDiepte: d } = VELD;
  for (const z of [-b / 2, b / 2]) {
    cilinder(0.08, h, 0xffffff, 0, h / 2, z, g, 10);
    cilinder(0.04, h, 0xdddddd, kant * d, h / 2, z, g, 6);
  }
  const lat = cilinder(0.08, b + 0.16, 0xffffff, 0, h, 0, g, 10);
  lat.rotation.x = Math.PI / 2;
  const netTex = canvasTextuur(64, 64, (ctx) => {
    ctx.clearRect(0, 0, 64, 64);
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 64, 64);
  });
  netTex.wrapS = netTex.wrapT = THREE.RepeatWrapping;
  const netMat = (rx, ry) => {
    const t = netTex.clone();
    t.needsUpdate = true;
    t.repeat.set(rx, ry);
    return new THREE.MeshBasicMaterial({ map: t, transparent: true, alphaTest: 0.4, side: THREE.DoubleSide });
  };
  const achter = new THREE.Mesh(new THREE.PlaneGeometry(b, h), netMat(b * 3, h * 3));
  achter.rotation.y = Math.PI / 2;
  achter.position.set(kant * d, h / 2, 0);
  g.add(achter);
  for (const z of [-b / 2, b / 2]) {
    const zij = new THREE.Mesh(new THREE.PlaneGeometry(d, h), netMat(d * 3, h * 3));
    zij.position.set((kant * d) / 2, h / 2, z);
    g.add(zij);
  }
  const dak = new THREE.Mesh(new THREE.PlaneGeometry(d, b), netMat(d * 3, b * 3));
  dak.rotation.x = Math.PI / 2;
  dak.position.set((kant * d) / 2, h, 0);
  g.add(dak);
  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

/** Lage reclameborden rond het veld, met eigen (niet-bestaande) teksten. */
function bouwReclameborden(scene) {
  const teksten = ["'t kofschip-x!", 'Lezen is top', 'Groep 7 rockt', 'Basisschool De Bunders', 'Taal = winnen', 'Hup Bunders!'];
  const kleuren = ['#1c7ed6', '#e03131', '#2f9e44', '#f08c00', '#7048e8', '#0ca678'];
  let i = 0;
  const bord = (x, z, draai, lengte = 8) => {
    const tekst = teksten[i % teksten.length];
    const kleur = kleuren[i % kleuren.length];
    i++;
    const tex = canvasTextuur(512, 64, (ctx, b, h) => {
      ctx.fillStyle = kleur; ctx.fillRect(0, 0, b, h);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 40px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(tekst, b / 2, h / 2 + 2);
    });
    const m = new THREE.Mesh(new THREE.BoxGeometry(lengte, 0.8, 0.12), [mat(0x222222), mat(0x222222), mat(0x222222), mat(0x222222), new THREE.MeshLambertMaterial({ map: tex }), new THREE.MeshLambertMaterial({ map: tex })]);
    m.position.set(x, 0.4, z);
    m.rotation.y = draai;
    m.castShadow = true;
    scene.add(m);
  };
  for (let x = -24; x <= 24; x += 8) { bord(x, -16.4, 0); bord(x, 16.4, Math.PI); }
  for (const z of [-12, -6.5, 6.5, 12]) bord(27.4, z, -Math.PI / 2, 5);
  for (const z of [-12, -7.5, 7.5, 12]) bord(-27.4, z, Math.PI / 2, 4); // westkant: opening voor de poort
}

/** Tribunes met publiek (één InstancedMesh: snel op Chromebooks). */
function bouwTribunes(scene) {
  const rijen = 4;
  const stoelKleuren = [0x1c7ed6, 0xffffff];
  const plekken = [];
  // Lange zijden (z = ±), oplopend naar achteren.
  for (const kant of [-1, 1]) {
    for (let r = 0; r < rijen; r++) {
      const z = kant * (18.5 + r * 1.4);
      doos(56, 0.9 * (r + 1), 1.4, stoelKleuren[r % 2], 0, (0.9 * (r + 1)) / 2, z, scene).receiveShadow = true;
      for (let x = -26; x <= 26; x += 1.1) plekken.push([x, 0.9 * (r + 1) + 0.02, z, kant]); // op de trede
    }
    doos(58, 1.5, 0.5, 0x495057, 0, 0.9 * rijen + 0.75, kant * (18.5 + rijen * 1.4 + 0.2), scene);
  }
  // Oostkant achter het doel van de tegenstander.
  for (let r = 0; r < 3; r++) {
    const x = 30 + r * 1.4;
    doos(1.4, 0.9 * (r + 1), 30, stoelKleuren[r % 2], x, (0.9 * (r + 1)) / 2, 0, scene);
    for (let z = -14; z <= 14; z += 1.1) plekken.push([x, 0.9 * (r + 1) + 0.05, z, 0]);
  }
  // Westkant (met een opening voor de poort).
  for (const kant of [-1, 1]) {
    for (let r = 0; r < 3; r++) {
      const x = -30 - r * 1.4;
      doos(1.4, 0.9 * (r + 1), 11, stoelKleuren[r % 2], x, (0.9 * (r + 1)) / 2, kant * 9.5, scene);
      for (let z = 4.5; z <= 14.5; z += 1.1) plekken.push([x, 0.9 * (r + 1) + 0.05, kant * z, 0]);
    }
  }

  // Publiek: lijf + hoofd als InstancedMesh, met willekeurige kleuren.
  const rnd = zaadRandom(11);
  const lijfGeo = new THREE.BoxGeometry(0.5, 0.7, 0.4);
  lijfGeo.translate(0, 0.35, 0);
  const hoofdGeo = new THREE.SphereGeometry(0.2, 8, 6);
  hoofdGeo.translate(0, 0.92, 0);
  const lijven = new THREE.InstancedMesh(lijfGeo, new THREE.MeshLambertMaterial(), plekken.length);
  const hoofden = new THREE.InstancedMesh(hoofdGeo, new THREE.MeshLambertMaterial(), plekken.length);
  const shirt = [0x1c7ed6, 0xfab005, 0xe03131, 0x2f9e44, 0xffffff, 0x7048e8, 0xf06595, 0x1c7ed6, 0xfab005];
  const huid = [0xf2c29b, 0xe8b48f, 0xc68a5a, 0x8d5a3b, 0xf7d1b5];
  const kleur = new THREE.Color();
  const m = new THREE.Matrix4();
  const data = plekken.map(([x, y, z, kant], i) => {
    // Iedereen kijkt naar het veld.
    const draai = kant ? (kant > 0 ? Math.PI : 0) : (x > 0 ? -Math.PI / 2 : Math.PI / 2);
    lijven.setColorAt(i, kleur.setHex(shirt[Math.floor(rnd() * shirt.length)]));
    hoofden.setColorAt(i, kleur.setHex(huid[Math.floor(rnd() * huid.length)]));
    return { x, y, z, draai, fase: rnd() * 6, sprong: 0 };
  });
  const zet = (i, extraY) => {
    const d = data[i];
    m.makeRotationY(d.draai).setPosition(d.x, d.y + extraY, d.z);
    lijven.setMatrixAt(i, m);
    hoofden.setMatrixAt(i, m);
  };
  data.forEach((_, i) => zet(i, 0));
  scene.add(lijven, hoofden);

  let juichTijd = 0;
  let t = 0;
  return {
    /** Het publiek springt een tijdje van blijdschap. */
    juich(seconden = 3) { juichTijd = seconden; },
    update(dt) {
      t += dt;
      if (juichTijd <= 0 && !this.wasAanHetJuichen) return;
      juichTijd -= dt;
      const actief = juichTijd > 0;
      data.forEach((d, i) => zet(i, actief ? Math.abs(Math.sin(t * 7 + d.fase)) * 0.45 : 0));
      lijven.instanceMatrix.needsUpdate = true;
      hoofden.instanceMatrix.needsUpdate = true;
      this.wasAanHetJuichen = actief;
    },
  };
}

function bouwLichtmasten(scene) {
  for (const [x, z] of [[-27, -24], [27, -24], [-27, 24], [27, 24]]) {
    cilinder(0.25, 16, 0x868e96, x, 8, z, scene, 8);
    const kop = doos(3, 1.4, 0.4, 0x495057, x, 16.3, z, scene);
    kop.lookAt(0, 16, 0);
    const lamp = doos(2.6, 1.0, 0.1, mat(0xfffbe6, { emissive: 0xfff3bf }), x, 16.3, z, scene);
    lamp.lookAt(0, 16, 0);
    lamp.translateZ(0.22);
  }
}

/** Groot scorebord achter het doel van de tegenstander. */
export class Scorebord {
  constructor(scene) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 384;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const g = new THREE.Group();
    g.position.set(35.5, 0, 0);
    scene.add(g);
    for (const z of [-5, 5]) cilinder(0.3, 9, 0x495057, 0, 4.5, z, g, 8);
    doos(0.6, 5.2, 13.2, 0x212529, 0, 9.6, 0, g);
    const scherm = new THREE.Mesh(new THREE.PlaneGeometry(12.4, 4.6), new THREE.MeshBasicMaterial({ map: this.tex }));
    scherm.rotation.y = -Math.PI / 2;
    scherm.position.set(-0.31, 9.6, 0);
    g.add(scherm);
    this.zet({ thuis: 'DE BUNDERS', uit: 'OEFENEN', scoreThuis: 0, scoreUit: 0, tijd: '--:--' });
  }

  zet({ thuis, uit, scoreThuis, scoreUit, tijd }) {
    const ctx = this.canvas.getContext('2d');
    const { width: b, height: h } = this.canvas;
    ctx.fillStyle = '#101418'; ctx.fillRect(0, 0, b, h);
    ctx.fillStyle = '#1c7ed6'; ctx.fillRect(0, 0, b / 2, 70);
    ctx.fillStyle = '#c92a2a'; ctx.fillRect(b / 2, 0, b / 2, 70);
    ctx.fillStyle = '#fff'; ctx.font = 'bold 44px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(thuis, b / 4, 37);
    ctx.fillText(uit, (b * 3) / 4, 37);
    ctx.fillStyle = '#ffd43b'; ctx.font = 'bold 170px "Trebuchet MS", sans-serif';
    ctx.fillText(`${scoreThuis} - ${scoreUit}`, b / 2, 205);
    ctx.fillStyle = '#69db7c'; ctx.font = 'bold 70px "Trebuchet MS", monospace';
    ctx.fillText(tijd, b / 2, 335);
    this.tex.needsUpdate = true;
  }
}
