import * as THREE from 'three';
import { mat, doos, canvasTextuur } from './helpers.js';

const goud = () => mat(0xffc929, { emissive: 0x6b4a00 });

/** De Bunders Beker: gouden beker met twee oren op een sokkel met een bordje. */
export function bouwBeker(bordTekst) {
  const g = new THREE.Group();
  // Sokkel.
  doos(1.5, 0.25, 1.5, 0x495057, 0, 0.125, 0, g);
  doos(1.2, 1.1, 1.2, 0x343a40, 0, 0.8, 0, g);
  doos(1.4, 0.15, 1.4, 0x495057, 0, 1.42, 0, g);
  const bordje = new THREE.Mesh(
    new THREE.PlaneGeometry(1.05, 0.32),
    new THREE.MeshLambertMaterial({
      map: canvasTextuur(256, 80, (ctx, b, h) => {
        ctx.fillStyle = '#e6a800'; ctx.fillRect(0, 0, b, h);
        ctx.fillStyle = '#fff3bf'; ctx.fillRect(5, 5, b - 10, h - 10);
        ctx.fillStyle = '#5c3a00'; ctx.font = 'bold 34px "Trebuchet MS", sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(bordTekst, b / 2, h / 2 + 2);
      }),
    }),
  );
  // Bordje aan alle vier de kanten.
  for (let i = 0; i < 4; i++) {
    const b = bordje.clone();
    const h = (i / 4) * Math.PI * 2;
    b.position.set(Math.sin(h) * 0.605, 0.85, Math.cos(h) * 0.605);
    b.rotation.y = h;
    g.add(b);
  }

  // Beker (draait langzaam).
  const beker = new THREE.Group();
  beker.position.y = 1.5;
  g.add(beker);
  const profiel = [
    [0, 0], [0.42, 0], [0.42, 0.1], [0.14, 0.18], [0.1, 0.55], [0.16, 0.7],
    [0.5, 0.9], [0.62, 1.25], [0.64, 1.55], [0.58, 1.56], [0.55, 1.28], [0.42, 1.0], [0, 0.95],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const kelk = new THREE.Mesh(new THREE.LatheGeometry(profiel, 28), goud());
  kelk.material.side = THREE.DoubleSide;
  beker.add(kelk);
  for (const kant of [-1, 1]) {
    const oor = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 8, 20, Math.PI * 1.3), goud());
    oor.position.set(kant * 0.66, 1.2, 0);
    oor.rotation.z = kant > 0 ? -Math.PI * 0.65 : Math.PI * 0.35;
    beker.add(oor);
  }
  // Ster op de beker.
  const vorm = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? 0.07 : 0.16;
    const h = (i / 10) * Math.PI * 2 + Math.PI / 2;
    if (i === 0) vorm.moveTo(Math.cos(h) * r, Math.sin(h) * r);
    else vorm.lineTo(Math.cos(h) * r, Math.sin(h) * r);
  }
  for (const kant of [1, -1]) {
    const ster = new THREE.Mesh(new THREE.ExtrudeGeometry(vorm, { depth: 0.04, bevelEnabled: false }), mat(0xe03131));
    ster.position.set(0, 1.18, kant * 0.6);
    if (kant < 0) ster.rotation.y = Math.PI;
    beker.add(ster);
  }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  g.userData.beker = beker;
  return g;
}
