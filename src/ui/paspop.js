import * as THREE from 'three';
import { Speler } from '../speler.js';
import { trekAan } from '../kleding.js';
import { danshouding, zetHoudingTerug } from '../dansjes.js';
import { maakVervoerModel, rijhouding, OPHOOGTE } from '../vervoer.js';

/**
 * Een draaiend poppetje in een klein venster (winkel en kledingkast).
 * Gebruikt een eigen kleine renderer die weer wordt opgeruimd bij sluiten.
 */
export class Paspop {
  constructor(houder) {
    this.houder = houder;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    houder.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x8899aa, 2.2));
    const licht = new THREE.DirectionalLight(0xffffff, 1.8);
    licht.position.set(2, 4, 3);
    this.scene.add(licht);
    // Rond plateautje om op te staan.
    const plateau = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.95, 0.12, 32), new THREE.MeshLambertMaterial({ color: 0xffd8e8 }));
    plateau.position.y = -0.06;
    this.scene.add(plateau);

    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
    this.camera.position.set(0, 1.55, 5.2);
    this.camera.lookAt(0, 1.15, 0);

    this.pop = new Speler(this.scene);
    this.pop.richting = 0;
    this.pop.model.rotation.y = 0;
    this.hoek = 0.4;
    this.slepen = null;

    // Zelf draaien met muis of vinger.
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', (e) => { this.slepen = e.clientX; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => {
      if (this.slepen == null) return;
      this.hoek += (e.clientX - this.slepen) * 0.012;
      this.slepen = e.clientX;
    });
    el.addEventListener('pointerup', () => { this.slepen = null; });

    this.formaat();
    this.resize = () => this.formaat();
    window.addEventListener('resize', this.resize);
    this.loopt = true;
    let vorige = performance.now();
    const stap = (nu) => {
      if (!this.loopt) return;
      const dt = Math.min(0.05, (nu - vorige) / 1000);
      vorige = nu;
      if (this.slepen == null) this.hoek += dt * 0.7;
      this.pop.richting = this.hoek; // animeer() zet de draaiing van het model
      this.pop.animeer(dt, 0);
      if (this.dansje) {
        // Het poppetje doet een dansje voor (in de winkel bij "Bekijk").
        this.dansje.t += dt;
        if (this.dansje.t > 3.5) { this.dansje = null; zetHoudingTerug(this.pop); }
        else danshouding(this.pop, this.dansje.id, this.dansje.t, this.hoek);
      } else if (this.vervoer) {
        // Op een vervoersmiddel (winkel "Bekijk" en kledingkast): doen alsof je rijdt.
        const v = this.vervoer;
        v.fase += dt * 5;
        for (const w of v.model.userData.wielen) w.rotation.x += dt * (v.id === 'fiets' ? 9 : 30);
        if (v.model.userData.trapper) v.model.userData.trapper.rotation.x = v.fase;
        rijhouding(this.pop, v.id, v.fase, 0.6);
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(stap);
    };
    requestAnimationFrame(stap);
  }

  formaat() {
    const b = this.houder.clientWidth || 260, h = this.houder.clientHeight || 320;
    this.renderer.setSize(b, h);
    this.camera.aspect = b / h;
    this.camera.updateProjectionMatrix();
  }

  /** Een dansje voordoen (3,5 seconde). */
  dans(id) {
    this.dansje = { id, t: 0 };
  }

  /** Op een vervoersmiddel zetten (null = er weer af). */
  toonVervoer(id, kleur) {
    if (this.vervoer) {
      this.vervoer.model.parent?.remove(this.vervoer.model);
      this.vervoer.model.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
      this.vervoer = null;
      zetHoudingTerug(this.pop);
      this.pop.model.position.y = 0;
      for (const been of this.pop.benen) been.position.y = 0.75;
    }
    if (!id) return;
    const model = maakVervoerModel(id, kleur);
    model.position.y = -(OPHOOGTE[id] ?? 0);
    this.pop.model.add(model);
    this.vervoer = { id, model, fase: 0 };
  }

  get vervoerId() { return this.vervoer?.id ?? null; }

  kleed(uitrusting) {
    trekAan(this.pop, uitrusting);
  }

  /** Klein sprongetje van blijdschap (na een aankoop). */
  juich() {
    const start = performance.now();
    const hop = () => {
      const t = (performance.now() - start) / 500;
      this.pop.groep.position.y = t < 1 ? Math.sin(t * Math.PI) * 0.4 : 0;
      if (t < 1 && this.loopt) requestAnimationFrame(hop);
    };
    hop();
  }

  sluit() {
    this.loopt = false;
    window.removeEventListener('resize', this.resize);
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.renderer.domElement.remove();
  }
}
