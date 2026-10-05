import * as THREE from 'three';
import { Speler } from '../speler.js';
import { trekAan } from '../kleding.js';

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
