import * as THREE from 'three';

const KLEUREN = [0xf03e3e, 0xfab005, 0x2f9e44, 0x1c7ed6, 0xae3ec9, 0xf76707, 0xe64980];

/** Vuurwerk boven het plein (zachte vonkjes, geen flitsen over het hele scherm). */
export class Vuurwerk {
  constructor(scene, geluid) {
    this.scene = scene;
    this.geluid = geluid;
    this.pijlen = [];
    this.bursts = [];
    this.tijdOver = 0;
    this.volgende = 0;
    this.pijlGeo = new THREE.SphereGeometry(0.15, 6, 4);
    // Rond vonkje (anders zijn punten vierkantjes).
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const ctx = c.getContext('2d');
    const verloop = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    verloop.addColorStop(0, '#fff');
    verloop.addColorStop(0.5, '#fff');
    verloop.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = verloop;
    ctx.fillRect(0, 0, 32, 32);
    this.vonk = new THREE.CanvasTexture(c);
  }

  /** @param midden plek waar het vuurwerk omheen komt (de speler); het gaat de lucht in vóór de camera. */
  start(duur = 12, midden = null) {
    this.midden = midden;
    this.tijdOver = duur;
    this.volgende = 0;
  }

  get bezig() { return this.tijdOver > 0 || this.pijlen.length || this.bursts.length; }

  lanceer() {
    const kleur = KLEUREN[Math.floor(Math.random() * KLEUREN.length)];
    const pijl = new THREE.Mesh(this.pijlGeo, new THREE.MeshBasicMaterial({ color: kleur }));
    // Rond de speler, zodat je het vuurwerk vanaf elke plek op het plein ziet.
    const midden = this.midden ?? new THREE.Vector3();
    const vooruit = this.richting ?? new THREE.Vector3(0, 0, -1);
    const opzij = new THREE.Vector3(-vooruit.z, 0, vooruit.x);
    pijl.position.copy(midden)
      .addScaledVector(vooruit, THREE.MathUtils.randFloat(12, 24))
      .addScaledVector(opzij, THREE.MathUtils.randFloatSpread(26))
      .setY(1);
    pijl.userData = { vy: THREE.MathUtils.randFloat(13, 16), kleur, hoogte: THREE.MathUtils.randFloat(7, 11) };
    this.scene.add(pijl);
    this.pijlen.push(pijl);
    this.geluid?.vuurwerk();
  }

  ontplof(pos, kleur) {
    const n = 110;
    const posities = new Float32Array(n * 3);
    const snelheden = [];
    for (let i = 0; i < n; i++) {
      posities.set([pos.x, pos.y, pos.z], i * 3);
      const v = new THREE.Vector3().randomDirection().multiplyScalar(THREE.MathUtils.randFloat(5, 9));
      snelheden.push(v);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posities, 3));
    const materiaal = new THREE.PointsMaterial({
      color: kleur, size: 1.6, map: this.vonk, alphaTest: 0.3, transparent: true, opacity: 1, depthWrite: false,
    });
    const punten = new THREE.Points(geo, materiaal);
    punten.userData = { snelheden, leven: 1.8 };
    this.scene.add(punten);
    this.bursts.push(punten);
  }

  update(dt) {
    if (this.tijdOver > 0) {
      this.tijdOver -= dt;
      this.volgende -= dt;
      if (this.volgende <= 0) {
        this.lanceer();
        this.volgende = THREE.MathUtils.randFloat(0.35, 0.8);
      }
    }
    for (const p of [...this.pijlen]) {
      p.position.y += p.userData.vy * dt;
      p.userData.vy *= 0.985;
      if (p.position.y >= p.userData.hoogte) {
        this.ontplof(p.position, p.userData.kleur);
        this.scene.remove(p);
        p.material.dispose();
        this.pijlen.splice(this.pijlen.indexOf(p), 1);
      }
    }
    for (const b of [...this.bursts]) {
      const d = b.userData;
      d.leven -= dt;
      const pos = b.geometry.attributes.position;
      d.snelheden.forEach((v, i) => {
        v.y -= 6 * dt;
        v.multiplyScalar(0.985);
        pos.array[i * 3] += v.x * dt;
        pos.array[i * 3 + 1] += v.y * dt;
        pos.array[i * 3 + 2] += v.z * dt;
      });
      pos.needsUpdate = true;
      b.material.opacity = Math.max(0, d.leven / 1.8);
      if (d.leven <= 0) {
        this.scene.remove(b);
        b.geometry.dispose();
        b.material.dispose();
        this.bursts.splice(this.bursts.indexOf(b), 1);
      }
    }
  }
}
