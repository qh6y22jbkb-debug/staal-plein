import * as THREE from 'three';
import { mat, doos, cilinder, bol, canvasTextuur } from './wereld/helpers.js';

/**
 * Een grote poort met twee hekdeuren, een bord erboven, een slot en een glinsterende opening.
 * Lokaal: de opening loopt langs de z-as, "binnen" is de -x kant, "buiten" (waar je heen gaat) de +x kant.
 */
export class Poort {
  /**
   * @param opties { x, z, draai, bord, open, botsing }
   *   draai = draaiing om de y-as (0 = binnenkant aan de -x kant)
   */
  constructor(scene, { x, z, draai = 0, bord, open = false, botsing = null }) {
    this.groep = new THREE.Group();
    this.groep.position.set(x, 0, z);
    this.groep.rotation.y = draai;
    scene.add(this.groep);
    this.open = false;
    this.animatie = null; // lopende open-animatie
    this.tijd = 0;

    const g = this.groep;
    // Stenen pilaren met een gouden bal erop.
    for (const pz of [-3.2, 3.2]) {
      doos(1.3, 5.2, 1.3, 0x9a8f86, 0, 2.6, pz, g);
      doos(1.5, 0.3, 1.5, 0x7d736b, 0, 5.35, pz, g);
      bol(0.4, mat(0xffc929, { emissive: 0x5a3c00 }), 0, 5.85, pz, g);
    }
    // Boog met het bord.
    doos(0.5, 0.5, 7.7, 0x2b2f33, 0, 4.6, 0, g);
    const bordTex = canvasTextuur(1024, 256, (ctx, b, h) => {
      ctx.fillStyle = '#1d6b2f';
      ctx.beginPath(); ctx.roundRect(0, 0, b, h, 40); ctx.fill();
      ctx.fillStyle = '#2f9e44';
      ctx.beginPath(); ctx.roundRect(14, 14, b - 28, h - 28, 30); ctx.fill();
      // Voetbal links en rechts.
      for (const bx of [120, b - 120]) {
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, h / 2, 70, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#1d1d1d';
        ctx.beginPath(); ctx.arc(bx, h / 2, 26, 0, Math.PI * 2); ctx.fill();
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath(); ctx.arc(bx + Math.cos(a) * 58, h / 2 + Math.sin(a) * 58, 16, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 110px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(bord, b / 2, h / 2 + 6);
    });
    const bordMat = new THREE.MeshLambertMaterial({ map: bordTex });
    const randMat = mat(0x1d6b2f);
    const bordMesh = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.6, 6.4), [randMat, randMat, randMat, randMat, randMat, randMat]);
    // Voorkant (naar binnen, -x) en achterkant (+x) met tekst: BoxGeometry-vlakken 0 = +x, 1 = -x.
    bordMesh.material = [bordMat, bordMat, randMat, randMat, randMat, randMat];
    bordMesh.position.set(0, 5.75, 0);
    bordMesh.castShadow = true;
    g.add(bordMesh);

    // Twee hekdeuren, elk draaiend om een scharnier bij de pilaar.
    this.deuren = [-1, 1].map((kant) => {
      const scharnier = new THREE.Group();
      scharnier.position.set(0, 0, kant * 2.55);
      g.add(scharnier);
      const lengte = 2.55;
      const richting = -kant; // deur loopt van de pilaar naar het midden
      doos(0.12, 0.12, lengte, 0x2b2f33, 0, 3.4, (richting * lengte) / 2, scharnier);
      doos(0.12, 0.12, lengte, 0x2b2f33, 0, 0.35, (richting * lengte) / 2, scharnier);
      doos(0.12, 0.12, lengte, 0x2b2f33, 0, 1.9, (richting * lengte) / 2, scharnier);
      for (let i = 0; i <= 8; i++) {
        const spijl = cilinder(0.04, 3.3, 0x2b2f33, 0, 1.85, richting * (i / 8) * lengte, scharnier, 5);
        if (i % 2 === 0) bol(0.08, mat(0xffc929, { emissive: 0x5a3c00 }), 0, 3.55, richting * (i / 8) * lengte, scharnier);
        spijl.castShadow = true;
      }
      scharnier.userData.kant = kant;
      return scharnier;
    });

    // Slot met een glimmend bordje.
    this.slot = new THREE.Group();
    this.slot.position.set(-0.2, 1.9, 0);
    g.add(this.slot);
    doos(0.3, 0.75, 0.7, mat(0xe6a800, { emissive: 0x4d3300 }), 0, 0, 0, this.slot);
    const beugel = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.07, 8, 16, Math.PI), mat(0xadb5bd));
    beugel.rotation.y = Math.PI / 2;
    beugel.position.y = 0.38;
    this.slot.add(beugel);
    bol(0.07, 0x1d1d1d, -0.16, -0.05, 0, this.slot);
    this.bordjeCanvas = document.createElement('canvas');
    this.bordjeCanvas.width = 512;
    this.bordjeCanvas.height = 192;
    this.bordjeTex = new THREE.CanvasTexture(this.bordjeCanvas);
    this.bordjeTex.colorSpace = THREE.SRGBColorSpace;
    this.bordje = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.9), new THREE.MeshLambertMaterial({ map: this.bordjeTex, emissive: 0x332200 }));
    this.bordje.rotation.y = -Math.PI / 2; // leesbaar vanaf de binnenkant
    this.bordje.position.set(-0.25, 0.85, 0);
    g.add(this.bordje);

    // Glinsterend licht in de opening (alleen als de poort open is).
    const glans = canvasTextuur(64, 256, (ctx, b, h) => {
      const v = ctx.createLinearGradient(0, 0, 0, h);
      v.addColorStop(0, 'rgba(255,255,255,0)');
      v.addColorStop(0.25, 'rgba(255,240,180,0.9)');
      v.addColorStop(0.8, 'rgba(255,255,255,0.9)');
      v.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = v;
      ctx.fillRect(0, 0, b, h);
    });
    this.licht = new THREE.Mesh(
      new THREE.PlaneGeometry(4.9, 3.6),
      new THREE.MeshBasicMaterial({ map: glans, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );
    this.licht.rotation.y = Math.PI / 2;
    this.licht.position.set(0.1, 1.85, 0);
    this.licht.visible = false;
    this.licht.userData.geenKlik = true;
    g.add(this.licht);
    this.vonken = this.maakVonken();
    g.add(this.vonken);

    g.traverse((o) => { if (o.isMesh) o.receiveShadow = true; });

    // Botsing: pilaren altijd, deuren alleen als de poort dicht is.
    if (botsing) {
      const p = new THREE.Vector3();
      for (const pz of [-3.2, 3.2]) {
        p.set(0, 0, pz).applyEuler(g.rotation).add(g.position);
        botsing.voegCirkelToe(p.x, p.z, 0.85, 6);
      }
      const lengte = 2.8;
      const a = new THREE.Vector3(-0.9, 0, -lengte).applyEuler(g.rotation).add(g.position);
      const b = new THREE.Vector3(0.6, 0, lengte).applyEuler(g.rotation).add(g.position);
      botsing.voegDoosToe(Math.min(a.x, b.x), Math.max(a.x, b.x), Math.min(a.z, b.z), Math.max(a.z, b.z), 4);
      this.deurBotsing = botsing.dozen[botsing.dozen.length - 1];
    }

    if (open) this.zetOpen(false);
  }

  maakVonken() {
    const n = 40;
    const pos = new Float32Array(n * 3);
    this.vonkData = [];
    for (let i = 0; i < n; i++) {
      this.vonkData.push({ z: (Math.random() - 0.5) * 4.4, y: Math.random() * 3.4, v: 0.4 + Math.random() * 0.6 });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const punten = new THREE.Points(geo, new THREE.PointsMaterial({
      color: 0xfff3bf, size: 0.12, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    punten.visible = false;
    punten.userData.geenKlik = true;
    return punten;
  }

  /** Tekst op het glimmende bordje: hoeveel stempels nog nodig. */
  zetBordje(regel1, regel2) {
    const ctx = this.bordjeCanvas.getContext('2d');
    const { width: b, height: h } = this.bordjeCanvas;
    ctx.clearRect(0, 0, b, h);
    const goud = ctx.createLinearGradient(0, 0, b, h);
    goud.addColorStop(0, '#ffe066'); goud.addColorStop(0.5, '#fff3bf'); goud.addColorStop(1, '#f2b705');
    ctx.fillStyle = '#b8860b';
    ctx.beginPath(); ctx.roundRect(0, 0, b, h, 28); ctx.fill();
    ctx.fillStyle = goud;
    ctx.beginPath(); ctx.roundRect(10, 10, b - 20, h - 20, 22); ctx.fill();
    ctx.fillStyle = '#5c3a00';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = 'bold 46px "Trebuchet MS", sans-serif';
    ctx.fillText(regel1, b / 2, h * 0.36);
    ctx.font = 'bold 54px "Trebuchet MS", sans-serif';
    ctx.fillStyle = '#c92a2a';
    ctx.fillText(regel2, b / 2, h * 0.72);
    this.bordjeTex.needsUpdate = true;
  }

  /** Poort openen. Met animatie: slot valt eraf, deuren zwaaien open, licht verschijnt. */
  zetOpen(animeer = true, geluid = null) {
    if (this.open) return;
    this.open = true;
    if (this.deurBotsing) this.deurBotsing.top = 0; // je kunt er nu doorheen
    if (!animeer) {
      this.slot.visible = false;
      this.bordje.visible = false;
      for (const d of this.deuren) d.rotation.y = -d.userData.kant * 1.7; // naar buiten (+x) open
      this.licht.visible = this.vonken.visible = true;
      this.licht.material.opacity = 0.45;
      return;
    }
    this.animatie = { t: 0, slotVy: 1.5 };
    geluid?.slotOpen();
  }

  /** Terug naar dicht (voor "Opnieuw beginnen"). */
  zetDicht() {
    this.open = false;
    this.animatie = null;
    if (this.deurBotsing) this.deurBotsing.top = 4;
    this.slot.visible = true;
    this.slot.position.set(-0.2, 1.9, 0);
    this.slot.rotation.set(0, 0, 0);
    this.bordje.visible = true;
    for (const d of this.deuren) d.rotation.y = 0;
    this.licht.visible = this.vonken.visible = false;
    this.licht.material.opacity = 0;
  }

  /** Staat iemand in de opening (en loopt hij naar buiten)? */
  isInOpening(wereldPos) {
    if (!this.open || this.animatie) return false;
    const lokaal = this.groep.worldToLocal(wereldPos.clone());
    return lokaal.x > -0.6 && Math.abs(lokaal.z) < 2.2;
  }

  /** Afstand van iemand tot de poort (voor het tekstwolkje). */
  afstandTot(wereldPos) {
    return Math.hypot(wereldPos.x - this.groep.position.x, wereldPos.z - this.groep.position.z);
  }

  update(dt) {
    this.tijd += dt;
    const a = this.animatie;
    if (a) {
      a.t += dt;
      // 1. Slot valt naar beneden en kantelt.
      if (this.slot.visible) {
        a.slotVy -= 12 * dt;
        this.slot.position.y += a.slotVy * dt;
        this.slot.position.x -= dt * 0.8;
        this.slot.rotation.z += dt * 4;
        this.bordje.position.y = Math.max(-1, this.bordje.position.y - dt * 1.5);
        if (this.slot.position.y < 0.25) { this.slot.visible = false; this.bordje.visible = false; }
      }
      // 2. Deuren zwaaien open (na een halve seconde).
      const d = THREE.MathUtils.clamp((a.t - 0.5) / 1.4, 0, 1);
      const zacht = d * d * (3 - 2 * d);
      for (const deur of this.deuren) deur.rotation.y = -deur.userData.kant * 1.7 * zacht;
      // 3. Licht verschijnt in de opening.
      if (a.t > 1.2) {
        this.licht.visible = this.vonken.visible = true;
        this.licht.material.opacity = Math.min(0.45, (a.t - 1.2) * 0.4);
      }
      if (a.t > 2.6) this.animatie = null;
    } else if (this.open) {
      this.licht.material.opacity = 0.4 + Math.sin(this.tijd * 1.2) * 0.08; // rustig, geen flikkering
    }
    if (this.vonken.visible) {
      const pos = this.vonken.geometry.attributes.position;
      this.vonkData.forEach((v, i) => {
        v.y += v.v * dt;
        if (v.y > 3.5) { v.y = 0; v.z = (Math.random() - 0.5) * 4.4; }
        pos.setXYZ(i, 0.15, v.y + 0.1, v.z);
      });
      pos.needsUpdate = true;
    }
  }
}
