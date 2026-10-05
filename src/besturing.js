import * as THREE from 'three';

const TOETSEN = {
  vooruit: ['KeyW', 'ArrowUp'],
  achteruit: ['KeyS', 'ArrowDown'],
  links: ['KeyA', 'ArrowLeft'],
  rechts: ['KeyD', 'ArrowRight'],
};

/**
 * Alle invoer: toetsenbord, klikken/tikken op de grond, slepen om te draaien,
 * scrollen om te zoomen en een joystick op touchscreens.
 */
export class Besturing {
  constructor(canvas, camera, scene, uiLaag) {
    this.canvas = canvas;
    this.camera = camera;
    this.scene = scene;
    this.aan = true; // uit tijdens een gesprek of minispel
    this.ingedrukt = new Set();
    this.sprong = false;
    this.doel = null; // plek waar de speler naartoe loopt na een klik
    this.draaiX = 0;
    this.draaiY = 0;
    this.zoomDelta = 0;
    this.joystick = { x: 0, y: 0 };
    this.opPraten = null;
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.raycaster = new THREE.Raycaster();
    this.muis = new THREE.Vector2();

    window.addEventListener('keydown', (e) => this.toetsOmlaag(e));
    window.addEventListener('keyup', (e) => this.ingedrukt.delete(e.code));
    window.addEventListener('blur', () => this.ingedrukt.clear());
    this.koppelAanwijzer();
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoomDelta += Math.sign(e.deltaY) * 1.2;
    }, { passive: false });

    if (this.isTouch) this.maakTouchKnoppen(uiLaag);
  }

  toetsOmlaag(e) {
    if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
    if (!this.aan) return;
    this.ingedrukt.add(e.code);
    if (e.code === 'Space' && !e.repeat) this.sprong = true;
    if (e.code === 'KeyE' && !e.repeat && this.opPraten) this.opPraten();
  }

  koppelAanwijzer() {
    const aanwijzers = new Map();
    this.canvas.addEventListener('pointerdown', (e) => {
      this.canvas.setPointerCapture(e.pointerId);
      aanwijzers.set(e.pointerId, { x: e.clientX, y: e.clientY, startX: e.clientX, startY: e.clientY, sleept: false });
    });
    this.canvas.addEventListener('pointermove', (e) => {
      const p = aanwijzers.get(e.pointerId);
      if (!p) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (Math.hypot(e.clientX - p.startX, e.clientY - p.startY) > 8) p.sleept = true;
      if (p.sleept && this.aan) {
        this.draaiX += dx;
        this.draaiY += dy;
      }
      p.x = e.clientX; p.y = e.clientY;
    });
    const loslaten = (e) => {
      const p = aanwijzers.get(e.pointerId);
      aanwijzers.delete(e.pointerId);
      if (p && !p.sleept && this.aan) this.klikOpGrond(e.clientX, e.clientY);
    };
    this.canvas.addEventListener('pointerup', loslaten);
    this.canvas.addEventListener('pointercancel', (e) => aanwijzers.delete(e.pointerId));
  }

  klikOpGrond(x, y) {
    const r = this.canvas.getBoundingClientRect();
    this.muis.set(((x - r.left) / r.width) * 2 - 1, -((y - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.muis, this.camera);
    const raak = this.raycaster.intersectObjects(this.scene.children, true)
      .find((h) => !h.object.userData.geenKlik);
    if (!raak) return;
    if (raak.object.userData.kind && this.opKlikKind) {
      this.opKlikKind(raak.object.userData.kind);
      return;
    }
    if (raak.object.userData.grond) {
      this.doel = raak.point.clone().setY(0);
      this.doelIsKraam = false;
      return;
    }
    // Klik op een kraam of karakter: loop naar de praatplek van die kraam.
    for (let o = raak.object; o; o = o.parent) {
      if (o.userData.loopDoel) {
        this.doel = o.userData.loopDoel.clone();
        this.doelIsKraam = true;
        return;
      }
    }
  }

  maakTouchKnoppen(uiLaag) {
    const basis = document.createElement('div');
    basis.className = 'joystick';
    const knop = document.createElement('div');
    knop.className = 'joystick-knop';
    basis.appendChild(knop);
    uiLaag.appendChild(basis);

    const straal = 55;
    let actief = null;
    const zet = (e) => {
      const r = basis.getBoundingClientRect();
      let dx = e.clientX - (r.left + r.width / 2);
      let dy = e.clientY - (r.top + r.height / 2);
      const l = Math.hypot(dx, dy);
      if (l > straal) { dx *= straal / l; dy *= straal / l; }
      knop.style.transform = `translate(${dx}px, ${dy}px)`;
      this.joystick.x = dx / straal;
      this.joystick.y = dy / straal;
    };
    basis.addEventListener('pointerdown', (e) => {
      actief = e.pointerId;
      basis.setPointerCapture(e.pointerId);
      zet(e);
    });
    basis.addEventListener('pointermove', (e) => { if (e.pointerId === actief) zet(e); });
    const stop = (e) => {
      if (e.pointerId !== actief) return;
      actief = null;
      knop.style.transform = '';
      this.joystick.x = this.joystick.y = 0;
    };
    basis.addEventListener('pointerup', stop);
    basis.addEventListener('pointercancel', stop);

    const spring = document.createElement('button');
    spring.className = 'springknop';
    spring.textContent = 'Spring';
    spring.addEventListener('pointerdown', (e) => { e.preventDefault(); if (this.aan) this.sprong = true; });
    uiLaag.appendChild(spring);
  }

  /** Bewegingsrichting in de wereld, gezien vanuit de camera. */
  beweging(yaw) {
    if (!this.aan) return { x: 0, z: 0, actief: false };
    const k = (lijst) => lijst.some((c) => this.ingedrukt.has(c));
    let vooruit = (k(TOETSEN.vooruit) ? 1 : 0) - (k(TOETSEN.achteruit) ? 1 : 0) - this.joystick.y;
    let opzij = (k(TOETSEN.rechts) ? 1 : 0) - (k(TOETSEN.links) ? 1 : 0) + this.joystick.x;
    const l = Math.hypot(vooruit, opzij);
    if (l > 1) { vooruit /= l; opzij /= l; }
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    return {
      x: -sin * vooruit + cos * opzij,
      z: -cos * vooruit - sin * opzij,
      actief: l > 0.1,
    };
  }

  neemSprong() { const s = this.sprong; this.sprong = false; return s; }

  neemCamera() {
    const d = { x: this.draaiX, y: this.draaiY, zoom: this.zoomDelta };
    this.draaiX = this.draaiY = this.zoomDelta = 0;
    return d;
  }
}
