import * as THREE from 'three';
import { Speler } from '../speler.js';
import { VolgCamera } from '../camera.js';
import { Botsing } from '../wereld/botsing.js';
import { Poort } from '../poort.js';
import { trekAan } from '../kleding.js';
import { grondVlak, mat, canvasTextuur } from '../wereld/helpers.js';
import { VOETBAL } from '../data/oefeningen.js';

const DRAAISNELHEID = 2.6;

/**
 * De Voetbalwereld. Wordt pas gemaakt als je door de poort loopt,
 * en weer helemaal opgeruimd (dispose) als je teruggaat naar het schoolplein.
 * Stap 1: grasveld met lijnen en een poort terug. Het stadion volgt in stap 2.
 */
export class VoetbalWereld {
  constructor({ camera, besturing, uiLaag, geluid, kleding, opTerug, toonWolkje }) {
    this.camera = camera;
    this.besturing = besturing;
    this.geluid = geluid;
    this.opTerug = opTerug;
    this.toonWolkje = toonWolkje;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x9fd8ff);
    this.scene.fog = new THREE.Fog(0xcfeaff, 80, 200);

    this.scene.add(new THREE.HemisphereLight(0xe3f4ff, 0x5f9a46, 1.7));
    this.zon = new THREE.DirectionalLight(0xfff2d6, 2.6);
    this.zon.castShadow = true;
    this.zon.shadow.mapSize.set(1024, 1024);
    Object.assign(this.zon.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 120 });
    this.zon.shadow.normalBias = 0.03;
    this.scene.add(this.zon, this.zon.target);

    this.bouwVeld();

    // Poort terug naar het schoolplein, aan de westkant; binnenkant = het veld (+x).
    this.botsing = new Botsing({ minX: -30, maxX: 30, minZ: -21, maxZ: 21 });
    this.poort = new Poort(this.scene, { x: -29.6, z: 0, draai: Math.PI, bord: VOETBAL.terugBord, open: true, botsing: this.botsing });

    this.speler = new Speler(this.scene);
    trekAan(this.speler, kleding);
    this.speler.positie.set(-17, 0, 0); // een stukje van de poort af, zodat de camera er niet in staat
    this.speler.richting = Math.PI / 2; // kijkt naar het veld (+x)
    this.volgCam = new VolgCamera(camera, [this.poort.groep]); // camera blijft aan de veldkant van de poort
    this.volgCam.yaw = this.speler.richting + Math.PI;

    this.titel = document.createElement('div');
    this.titel.className = 'voetbal-titel';
    this.titel.textContent = `⚽ ${VOETBAL.poortBord}`;
    uiLaag.appendChild(this.titel);
    this.weg = false;
  }

  bouwVeld() {
    const s = this.scene;
    grondVlak(260, 260, mat(0x6fae4a), 0, 0, 0, s);
    // Grasveld met maaistroken.
    const stroken = canvasTextuur(256, 64, (ctx, b, h) => {
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = i % 2 ? '#4caf50' : '#43a047';
        ctx.fillRect((i * b) / 8, 0, b / 8 + 1, h);
      }
    });
    const veld = grondVlak(46, 30, new THREE.MeshLambertMaterial({ map: stroken }), 0, 0, 0.01, s);
    veld.receiveShadow = true;
    // Witte lijnen.
    const wit = mat(0xffffff);
    const lijn = (b, d, x, z) => grondVlak(b, d, wit, x, z, 0.02, s);
    lijn(40, 0.15, 0, -12); lijn(40, 0.15, 0, 12);
    lijn(0.15, 24, -20, 0); lijn(0.15, 24, 20, 0);
    lijn(0.15, 24, 0, 0);
    const cirkel = new THREE.Mesh(new THREE.RingGeometry(3.3, 3.45, 48), wit);
    cirkel.rotation.x = -Math.PI / 2;
    cirkel.position.y = 0.02;
    s.add(cirkel);
  }

  /** Per frame: lopen, camera, en kijken of je door de poort terugloopt. */
  update(dt) {
    if (this.weg) return;
    const invoer = this.besturing.beweging();
    let beweging = { x: 0, z: 0 };
    let achteruit = false;
    if (invoer.actief) {
      this.speler.richting -= invoer.draai * DRAAISNELHEID * dt;
      achteruit = invoer.vooruit < 0;
      const v = invoer.vooruit * (achteruit ? 0.6 : 1);
      beweging = { x: Math.sin(this.speler.richting) * v, z: Math.cos(this.speler.richting) * v };
    }
    const afgelegd = this.speler.update(dt, beweging, this.besturing.neemSprong(), this.botsing, { draaiMee: false });
    if (!achteruit && (afgelegd > 0.002 || invoer.draai)) {
      this.volgCam.volgAchter(this.speler.richting + Math.PI, dt, invoer.draai ? 5 : 2.5);
    }
    const cam = this.besturing.neemCamera();
    this.volgCam.draai(cam.x, cam.y);
    if (cam.zoom) this.volgCam.zoom(cam.zoom);

    this.poort.update(dt);
    this.zon.position.set(this.speler.positie.x + 20, 40, this.speler.positie.z + 18);
    this.zon.target.position.copy(this.speler.positie);
    this.volgCam.update(dt, this.speler.positie);

    this.toonWolkje?.(this.poort.afstandTot(this.speler.positie) < 6 ? VOETBAL.wolkjeTerug : null);
    if (this.poort.isInOpening(this.speler.positie)) {
      this.weg = true;
      this.opTerug?.();
    }
  }

  /** Alles opruimen (geheugen van de grafische kaart vrijgeven). */
  dispose() {
    this.titel.remove();
    this.scene.traverse((o) => {
      o.geometry?.dispose?.();
      const materialen = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of materialen) {
        m.map?.dispose?.();
        m.dispose?.();
      }
    });
    this.scene.clear();
  }
}
