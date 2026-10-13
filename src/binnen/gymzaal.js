import * as THREE from 'three';
import { mat, doos, cilinder, bol, canvasTextuur } from '../wereld/helpers.js';
import { Botsing } from '../wereld/botsing.js';
import { GYM, GYMTIJD } from '../data/gym.js';
import { tijdOpKlok } from '../gymtijd.js';

/*
 * De gymzaal: een lichte zaal met houten vloer en lijnen, wandrekken, banken, matten,
 * een trampoline, twee basketbalringen met ballen en klimtouwen met een bel.
 * Wordt pas gebouwd als je naar binnen gaat, en weer opgeruimd als je naar buiten gaat.
 *
 * Activiteiten:
 *  - klimtouw: E = pakken, ↑/↓ = klimmen, spatie bovenin = bel (munten, max. per dag), E = loslaten
 *  - trampoline: vanzelf stuiteren, spatie = hoge sprong, in de lucht nog eens spatie = salto
 *  - basketbal: E = bal pakken, spatie ingedrukt houden en loslaten = gooien (met krachtbalk)
 */

export const GYM_GRENZEN = { minX: -11, maxX: 11, minZ: -17, maxZ: 17 };
const HOOGTE = 8; // plafond
const DIK = 0.3;
const RING_HOOGTE = 2.75; // iets lager dan een echte ring: groep 7
const RING_STRAAL = 0.24;
const BAL_STRAAL = 0.15;
const ZWAARTE = 9.81;
const TOUWEN = [{ x: 7, z: -6 }, { x: 7, z: -2.5 }, { x: 7, z: 1 }];
const KLIM_TOP = 5.0; // zo hoog komen je voeten; dan kun je net bij de bel
const TRAMPOLINE = { x: 4.5, z: 9.5, r: 1.4, top: 0.38 };
const DEUR_X = -7; // de deur naar het plein (links in de achtermuur, niet achter de basketbalring)
const RINGEN = [{ x: 0, z: -15.2, kant: -1 }, { x: 0, z: 15.2, kant: 1 }];
const BEL_SLEUTEL = 'staal-blok2-gym';

function vandaag() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** Hoe vaak heb je vandaag al munten voor de bel gekregen? (bewaard in localStorage) */
export const belTeller = {
  lees() {
    try {
      const d = JSON.parse(localStorage.getItem(BEL_SLEUTEL));
      if (d?.datum === vandaag() && Number.isInteger(d.bellen)) return d.bellen;
    } catch { /* geen of kapotte opslag */ }
    return 0;
  },
  erbij() {
    const n = this.lees() + 1;
    try { localStorage.setItem(BEL_SLEUTEL, JSON.stringify({ datum: vandaag(), bellen: n })); } catch { /* geen opslag */ }
    return n;
  },
};

function houtTextuur() {
  const t = canvasTextuur(256, 256, (ctx, b, h) => {
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = ['#e8c48e', '#e2bb82', '#ecca96', '#dfb67c'][i % 4];
      ctx.fillRect(0, (i * h) / 8, b, h / 8);
      ctx.fillStyle = 'rgba(120,80,40,.18)';
      ctx.fillRect(0, (i * h) / 8, b, 2);
      ctx.fillRect(((i * 97) % b), (i * h) / 8, 2, h / 8);
    }
  });
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(6, 9);
  return t;
}

function bordTextuur(tekst, rand = '#2f9e44') {
  return canvasTextuur(512, 128, (ctx, b, h) => {
    ctx.fillStyle = rand; ctx.beginPath(); ctx.roundRect(0, 0, b, h, 24); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.roundRect(8, 8, b - 16, h - 16, 18); ctx.fill();
    ctx.fillStyle = '#1d2b4f'; ctx.font = 'bold 64px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(tekst, b / 2, h / 2 + 4);
  });
}

export class Gymzaal {
  /**
   * @param ctx { speler, besturing, geluid, beloon(aantal, van, label), melding(tekst), uiLaag, isTouch,
   *              gymtijd (de opgespaarde gymtijd), opTijdOp() (gymtijd is op: terug naar het plein) }
   */
  constructor(ctx) {
    this.soort = 'gym';
    this.ctx = ctx;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xeef3f6);
    this.botsing = new Botsing(GYM_GRENZEN);
    this.blokkers = [];
    this.kramen = [];
    this.eigen = new Set();

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xe0d2b8, 2.0));
    this.licht = new THREE.DirectionalLight(0xffffff, 1.2);
    this.licht.castShadow = true;
    this.licht.shadow.mapSize.set(1024, 1024);
    Object.assign(this.licht.shadow.camera, { left: -14, right: 14, top: 14, bottom: -14, near: 1, far: 50 });
    this.licht.shadow.normalBias = 0.03;
    this.scene.add(this.licht, this.licht.target);

    this.groep = new THREE.Group();
    this.scene.add(this.groep);
    this.bouwZaal();
    this.bouwToestellen();
    this.bouwBasketbal();
    this.groep.traverse((o) => { if (o.isMesh && !o.userData.geenSchaduw) { o.receiveShadow = true; } });

    this.startPlek = new THREE.Vector3(DEUR_X, 0, 14.6);
    this.startRichting = Math.PI;
    this.deurTerug = new THREE.Vector3(DEUR_X, 0, 16.3);

    // Toestand van de activiteiten.
    this.klim = null; // { touw, glijden }
    this.salto = null; // { t }
    this.vastBal = null; // de bal die je vasthoudt
    this.laden = -1; // < 0: niet aan het laden; anders seconden ingedrukt
    this.gescoord = 0;
    this.maakSchermdelen();
  }

  m(opties, soort = THREE.MeshLambertMaterial) {
    const materiaal = new soort(opties);
    this.eigen.add(materiaal);
    return materiaal;
  }

  /** Muur met botsing (massief) en camera-blok. */
  muur(x1, z1, x2, z2, kleur) {
    const b = Math.max(Math.abs(x2 - x1), DIK), d = Math.max(Math.abs(z2 - z1), DIK);
    const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
    const mesh = doos(b, HOOGTE, d, kleur, cx, HOOGTE / 2, cz, this.groep);
    this.botsing.voegDoosToe(cx - b / 2, cx + b / 2, cz - d / 2, cz + d / 2, HOOGTE, { massief: true });
    this.blokkers.push(mesh);
    return mesh;
  }

  bouwZaal() {
    const { minX, maxX, minZ, maxZ } = GYM_GRENZEN;
    const W = maxX - minX, D = maxZ - minZ;
    // Houten vloer.
    const vloer = new THREE.Mesh(new THREE.PlaneGeometry(W, D), this.m({ map: houtTextuur() }));
    vloer.rotation.x = -Math.PI / 2;
    vloer.userData.grond = true;
    this.groep.add(vloer);
    // Lijnen op de vloer: buitenlijn, middenlijn, middencirkel en de vakken bij de ringen.
    const lijn = (b, d, x, z, kleur = 0xffffff) => {
      const l = new THREE.Mesh(new THREE.PlaneGeometry(b, d), mat(kleur));
      l.rotation.x = -Math.PI / 2;
      l.position.set(x, 0.006, z);
      l.userData.geenSchaduw = true;
      this.groep.add(l);
    };
    const bx = 8.8, bz = 15.4;
    lijn(bx * 2, 0.08, 0, -bz); lijn(bx * 2, 0.08, 0, bz); lijn(0.08, bz * 2, -bx, 0); lijn(0.08, bz * 2, bx, 0);
    lijn(bx * 2, 0.08, 0, 0);
    const cirkel = new THREE.Mesh(new THREE.RingGeometry(1.7, 1.78, 40), mat(0xffffff));
    cirkel.rotation.x = -Math.PI / 2; cirkel.position.y = 0.006; this.groep.add(cirkel);
    for (const k of [-1, 1]) {
      lijn(3.6, 0.08, 0, k * (bz - 4.6), 0xfab005); lijn(0.08, 4.6, -1.8, k * (bz - 2.3), 0xfab005); lijn(0.08, 4.6, 1.8, k * (bz - 2.3), 0xfab005);
    }
    lijn(0.08, 6, -10.2, 6, 0xe03131); // rode lijn langs de wandrekken

    // Muren: onder houten lambrisering, boven licht. Hoog lichte ramen langs de lange kanten.
    this.muur(minX, minZ, maxX, minZ, 0xf1f3f5);
    this.muur(minX, maxZ, DEUR_X - 1.2, maxZ, 0xf1f3f5);
    this.muur(DEUR_X + 1.2, maxZ, maxX, maxZ, 0xf1f3f5);
    this.muur(minX, minZ, minX, maxZ, 0xf1f3f5);
    this.muur(maxX, minZ, maxX, maxZ, 0xf1f3f5);
    // Boven de deur ook een stuk muur (alleen voor de camera en het zicht).
    const boven = doos(2.4, HOOGTE - 2.6, DIK, 0xf1f3f5, DEUR_X, 2.6 + (HOOGTE - 2.6) / 2, maxZ, this.groep);
    this.blokkers.push(boven);
    const deurBlok = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.6, DIK), mat(0xffffff));
    deurBlok.position.set(DEUR_X, 1.3, maxZ + 0.2); deurBlok.visible = false; this.groep.add(deurBlok); this.blokkers.push(deurBlok);
    for (const [x1, x2, z1, z2] of [[minX, maxX, minZ + DIK / 2, minZ + DIK / 2], [minX, maxX, maxZ - DIK / 2, maxZ - DIK / 2]]) {
      doos(x2 - x1 - 0.1, 2.4, 0.06, 0xd8b98c, (x1 + x2) / 2, 1.2, z1 + Math.sign(-z1) * 0.04, this.groep);
    }
    for (const x of [minX + DIK / 2 + 0.04, maxX - DIK / 2 - 0.04]) {
      doos(0.06, 2.4, maxZ - minZ - 0.1, 0xd8b98c, x, 1.2, 0, this.groep);
      for (let z = minZ + 3; z < maxZ - 2; z += 4) {
        const raam = doos(0.05, 1.6, 2.8, 0, x - Math.sign(x) * 0.03, 6.3, z, this.groep);
        raam.material = this.m({ color: 0xdff1ff, emissive: 0xa5d8ff, emissiveIntensity: 0.5 });
        raam.castShadow = false;
      }
    }
    // Deur terug naar het plein, met daglicht en een bord.
    const daglicht = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.6), this.m({ color: 0xdff3ff }, THREE.MeshBasicMaterial));
    daglicht.position.set(DEUR_X, 1.3, maxZ - DIK / 2 - 0.01); daglicht.rotation.y = Math.PI; this.groep.add(daglicht);
    for (const dx of [-1, 1]) doos(0.14, 2.65, DIK + 0.1, 0xfab005, DEUR_X + dx * 1.27, 1.32, maxZ, this.groep);
    const bord = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), this.m({ map: bordTextuur(`🌳 ${GYM.deurBord}`) }));
    bord.position.set(DEUR_X, 3.0, maxZ - DIK / 2 - 0.03); bord.rotation.y = Math.PI; this.groep.add(bord);

    // Plafond met lampen (alleen van onder zichtbaar) en een camera-blok erboven.
    const plafond = new THREE.Mesh(new THREE.PlaneGeometry(W, D), mat(0xf8f9fa));
    plafond.rotation.x = Math.PI / 2; plafond.position.y = HOOGTE; plafond.userData.geenSchaduw = true; this.groep.add(plafond);
    const plafondBlok = new THREE.Mesh(new THREE.BoxGeometry(W + 2, 0.4, D + 2), mat(0xffffff));
    plafondBlok.position.y = HOOGTE + 0.2; plafondBlok.visible = false; this.groep.add(plafondBlok); this.blokkers.push(plafondBlok);
    for (let x = -6; x <= 6; x += 6) {
      for (let z = -12; z <= 12; z += 6) {
        const lamp = doos(1.6, 0.08, 0.5, 0, x, HOOGTE - 0.05, z, this.groep);
        lamp.material = this.m({ color: 0xffffff, emissive: 0xfff9db });
        lamp.castShadow = false;
      }
    }
  }

  bouwToestellen() {
    const { minX } = GYM_GRENZEN;
    // Wandrekken langs de linkermuur.
    for (let i = 0; i < 4; i++) {
      const z = 1.5 + i * 2.2;
      const g = new THREE.Group();
      g.position.set(minX + DIK / 2 + 0.2, 0, z);
      this.groep.add(g);
      for (const dz of [-0.9, 0.9]) doos(0.12, 3.6, 0.12, 0xb07a3c, 0, 1.8, dz, g);
      for (let y = 0.35; y < 3.5; y += 0.3) {
        const sport = cilinder(0.03, 1.8, 0xd9a35a, 0, y, 0, g, 6);
        sport.rotation.x = Math.PI / 2;
      }
    }
    this.botsing.voegDoosToe(minX, minX + DIK / 2 + 0.35, 0.4, 9.2, 3.6, { massief: true });

    // Banken langs de rechtermuur.
    for (const z of [-12, 9]) {
      doos(0.3, 0.06, 4, 0xc68b45, 9.7, 0.45, z, this.groep);
      for (const dz of [-1.7, 1.7]) doos(0.25, 0.42, 0.1, 0x868e96, 9.7, 0.21, z + dz, this.groep);
      this.botsing.voegDoosToe(9.55, 9.85, z - 2, z + 2, 0.48);
    }

    // Blauwe matten onder de touwen en bij de wandrekken.
    for (const [x, z, b, d] of [[7, -2.5, 2.6, 10], [-8.6, 5, 2.4, 9]]) {
      doos(b, 0.12, d, 0x1c7ed6, x, 0.06, z, this.groep);
      this.botsing.voegDoosToe(x - b / 2, x + b / 2, z - d / 2, z + d / 2, 0.12);
    }

    // Klimtouwen aan een balk aan het plafond, met een bel bij elk touw.
    doos(0.3, 0.3, 9.5, 0x868e96, 7, HOOGTE - 0.35, -2.5, this.groep);
    this.bellen = TOUWEN.map((t) => {
      const touw = cilinder(0.045, HOOGTE - 0.85, 0xd2b48c, t.x, (HOOGTE - 0.5 + 0.35) / 2, t.z, this.groep, 8);
      touw.castShadow = false;
      for (let y = 0.8; y < HOOGTE - 1; y += 0.9) bol(0.07, 0xc4a170, t.x, y, t.z, this.groep).castShadow = false; // knopen
      const bel = new THREE.Group();
      bel.position.set(t.x - 0.55, HOOGTE - 0.5, t.z);
      this.groep.add(bel);
      cilinder(0.015, 0.4, 0x495057, 0, -0.2, 0, bel, 4);
      const kap = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), this.m({ color: 0xffd43b, emissive: 0x7a5a00, side: THREE.DoubleSide }));
      kap.position.y = -0.45;
      bel.add(kap);
      bol(0.05, 0x495057, 0, -0.62, 0, bel);
      return { ...t, bel, slinger: 0 };
    });

    // Trampoline: rond frame met zwart springdoek.
    const tr = TRAMPOLINE;
    const rand = new THREE.Mesh(new THREE.TorusGeometry(tr.r, 0.1, 8, 32), mat(0x1c7ed6));
    rand.rotation.x = Math.PI / 2; rand.position.set(tr.x, tr.top, tr.z); this.groep.add(rand);
    this.doek = cilinder(tr.r - 0.05, 0.03, 0x212529, tr.x, tr.top - 0.02, tr.z, this.groep, 32);
    for (let i = 0; i < 6; i++) {
      const h = (i / 6) * Math.PI * 2;
      cilinder(0.04, tr.top, 0x495057, tr.x + Math.cos(h) * tr.r, tr.top / 2, tr.z + Math.sin(h) * tr.r, this.groep, 6);
    }
    this.botsing.voegCirkelToe(tr.x, tr.z, tr.r + 0.05, tr.top);
  }

  bouwBasketbal() {
    this.ringen = RINGEN.map((r) => {
      const z = r.z, k = r.kant;
      cilinder(0.1, RING_HOOGTE + 0.9, 0x495057, r.x, (RING_HOOGTE + 0.9) / 2, z + k * 1.4, this.groep, 10);
      doos(0.12, 0.12, 1.4, 0x495057, r.x, RING_HOOGTE + 0.75, z + k * 0.7, this.groep);
      const bord = doos(1.8, 1.05, 0.06, 0xffffff, r.x, RING_HOOGTE + 0.45, z + k * 0.6, this.groep);
      bord.castShadow = false;
      doos(0.6, 0.45, 0.07, 0xe03131, r.x, RING_HOOGTE + 0.3, z + k * 0.6, this.groep).material = mat(0xe03131);
      doos(0.5, 0.35, 0.08, 0xffffff, r.x, RING_HOOGTE + 0.3, z + k * 0.6, this.groep);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(RING_STRAAL, 0.02, 6, 24), mat(0xff6b00));
      ring.rotation.x = Math.PI / 2; ring.position.set(r.x, RING_HOOGTE, z); this.groep.add(ring);
      const net = new THREE.Mesh(new THREE.CylinderGeometry(RING_STRAAL, RING_STRAAL * 0.6, 0.4, 12, 1, true),
        this.m({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.8 }));
      net.position.set(r.x, RING_HOOGTE - 0.2, z); this.groep.add(net);
      this.botsing.voegCirkelToe(r.x, z + k * 1.4, 0.25, RING_HOOGTE + 0.9, { massief: true });
      return { x: r.x, z, kant: k, bordZ: z + k * 0.6 };
    });

    // Ballen.
    const balTex = canvasTextuur(128, 64, (ctx, b, h) => {
      ctx.fillStyle = '#e8590c'; ctx.fillRect(0, 0, b, h);
      ctx.strokeStyle = '#212529'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(b, h / 2); ctx.moveTo(b / 4, 0); ctx.lineTo(b / 4, h); ctx.moveTo((3 * b) / 4, 0); ctx.lineTo((3 * b) / 4, h); ctx.stroke();
    });
    const balMat = this.m({ map: balTex });
    this.ballen = [[-1.5, 2], [1.5, 2], [-1.5, -2], [1.5, -2]].map(([x, z]) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(BAL_STRAAL, 16, 12), balMat);
      mesh.castShadow = true;
      this.groep.add(mesh);
      return { mesh, pos: new THREE.Vector3(x, BAL_STRAAL, z), vel: new THREE.Vector3(), vorigeY: BAL_STRAAL };
    });
  }

  /* ---------- Schermdelen: krachtbalk, teller en touchknoppen ---------- */

  maakSchermdelen() {
    const { uiLaag, isTouch } = this.ctx;
    this.ui = document.createElement('div');
    this.ui.className = 'gym-ui';
    this.ui.innerHTML = `
      <div class="gym-tijd" aria-live="off"></div>
      <div class="gym-teller" hidden></div>
      <div class="gym-kracht" hidden><div class="gym-doel"></div><div class="gym-vulling"></div></div>
      ${isTouch ? `
        <div class="gym-knoppen gym-klim" hidden>
          <button type="button" data-knop="op">▲</button>
          <button type="button" data-knop="neer">▼</button>
          <button type="button" data-knop="bel">🔔</button>
          <button type="button" data-knop="los">${GYM.knopLos}</button>
        </div>
        <div class="gym-knoppen gym-gooi" hidden><button type="button" data-knop="gooi" class="groot">🏀<small>${GYM.knopGooi}</small></button></div>` : ''}`;
    uiLaag.appendChild(this.ui);
    this.tellerEl = this.ui.querySelector('.gym-teller');
    this.tijdEl = this.ui.querySelector('.gym-tijd');
    this.gemeld30 = (this.ctx.gymtijd?.seconden ?? 99) <= 30;
    this.tijdOp = false;
    this.krachtEl = this.ui.querySelector('.gym-kracht');
    this.doelEl = this.ui.querySelector('.gym-doel');
    this.vullingEl = this.ui.querySelector('.gym-vulling');
    this.knop = { op: false, neer: false, gooi: false };
    for (const b of this.ui.querySelectorAll('button[data-knop]')) {
      const naam = b.dataset.knop;
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (naam === 'bel') this.luidBel();
        else if (naam === 'los') this.laatLos();
        else this.knop[naam] = true;
      });
      const uit = () => { if (naam in this.knop) this.knop[naam] = false; };
      b.addEventListener('pointerup', uit);
      b.addEventListener('pointercancel', uit);
      b.addEventListener('pointerleave', uit);
    }
  }

  /* ---------- Hulp ---------- */

  get speler() { return this.ctx.speler; }
  get bezig() { return !!this.klim; }

  dichtsteTouw() {
    const p = this.speler.positie;
    let beste = null, d = 1.3;
    for (const t of this.bellen) {
      const a = Math.hypot(p.x - t.x, p.z - t.z);
      if (a < d) { beste = t; d = a; }
    }
    return beste;
  }

  dichtsteBal() {
    const p = this.speler.positie;
    let beste = null, d = 1.4;
    for (const b of this.ballen) {
      if (b === this.vastBal) continue;
      const a = Math.hypot(p.x - b.pos.x, p.z - b.pos.z);
      if (a < d && b.pos.y < 1.2) { beste = b; d = a; }
    }
    return beste;
  }

  opTrampoline() {
    const p = this.speler.positie;
    return Math.hypot(p.x - TRAMPOLINE.x, p.z - TRAMPOLINE.z) < TRAMPOLINE.r - 0.15;
  }

  /** Bij de deur terug naar het plein? */
  isBijDeurTerug(p) {
    return Math.hypot(p.x - this.deurTerug.x, p.z - this.deurTerug.z) < 2.0 && !this.klim;
  }

  /* ---------- E: pakken en loslaten ---------- */

  /** Actie bij E (of tik op het wolkje). Geeft true als de gymzaal er iets mee deed. */
  actie() {
    if (this.klim) { this.laatLos(); return true; }
    if (this.vastBal) { this.laatBalVallen(); return true; }
    const touw = this.dichtsteTouw();
    if (touw && this.speler.opGrond) { this.pakTouw(touw); return true; }
    const bal = this.dichtsteBal();
    if (bal) { this.vastBal = bal; bal.vel.set(0, 0, 0); this.ctx.geluid?.plop(); return true; }
    return false;
  }

  pakTouw(touw) {
    const s = this.speler;
    this.klim = { touw, glijden: false };
    const dx = s.positie.x - touw.x, dz = s.positie.z - touw.z;
    const l = Math.hypot(dx, dz) || 1;
    s.positie.set(touw.x + (dx / l) * 0.38, Math.max(s.positie.y, 0.12), touw.z + (dz / l) * 0.38);
    s.richting = Math.atan2(-dx, -dz); // kijkt naar het touw
    s.vy = 0;
    this.ctx.geluid?.plop();
  }

  laatLos() {
    if (!this.klim) return;
    this.klim.glijden = true; // naar beneden glijden op de mat
  }

  luidBel() {
    if (!this.klim || this.klim.glijden || this.speler.positie.y < KLIM_TOP - 0.05) return;
    const t = this.klim.touw;
    t.slinger = 1;
    this.ctx.geluid?.bel();
    if (belTeller.lees() < GYM.belMaxPerDag) {
      belTeller.erbij();
      this.ctx.beloon?.(GYM.belMunten, null, `+${GYM.belMunten}`);
      this.ctx.melding?.(GYM.ding.replace('{munten}', GYM.belMunten));
    } else {
      this.ctx.melding?.(GYM.dingGenoeg.replace('{max}', GYM.belMaxPerDag));
    }
  }

  laatBalVallen() {
    const b = this.vastBal;
    if (!b) return;
    this.vastBal = null;
    this.laden = -1;
    b.vel.set(0, 0, 0);
  }

  /* ---------- Elke frame ---------- */

  /**
   * Neemt de gymzaal de besturing over? (bij klimmen). Dan loopt de gewone besturing niet.
   * Verder: Spatie onderscheppen voor de trampoline, de salto en het gooien.
   */
  besturingOvernemen(dt) {
    const s = this.speler, b = this.ctx.besturing;
    if (this.klim) {
      b.neemCamera();
      const k = (codes) => codes.some((c) => b.ingedrukt.has(c));
      const op = !this.klim.glijden && (k(['KeyW', 'ArrowUp']) || this.knop.op || b.joystick.y < -0.4);
      const neer = !this.klim.glijden && (k(['KeyS', 'ArrowDown']) || this.knop.neer || b.joystick.y > 0.4);
      if (b.neemSprong()) this.luidBel();
      let y = s.positie.y;
      if (this.klim.glijden) y -= 4 * dt;
      else if (op) y += GYM.klimSnelheid * dt;
      else if (neer) y -= GYM.klimSnelheid * 1.2 * dt;
      y = Math.min(KLIM_TOP, y);
      const klimTijd = (this.klimFase = (this.klimFase ?? 0) + (op || neer ? dt * 6 : 0));
      if (y <= 0.12) {
        // Weer op de mat.
        s.positie.y = 0.12;
        if (this.klim.glijden || neer) { this.klim = null; s.vy = 0; s.opGrond = true; s.animeer(dt, 0); return true; }
      }
      s.positie.y = Math.max(0.12, y);
      // Houding: armen om de beurt omhoog, benen een beetje gebogen.
      s.model.rotation.y = s.richting;
      const z = Math.sin(klimTijd);
      s.armen[0].rotation.set(-2.9 + z * 0.3, 0, 0);
      s.armen[1].rotation.set(-2.9 - z * 0.3, 0, 0);
      s.benen[0].rotation.x = -0.5 + z * 0.3;
      s.benen[1].rotation.x = -0.5 - z * 0.3;
      s.model.position.y = 0;
      return true;
    }
    // Basketbal vast: spatie is gooien (niet springen).
    if (this.vastBal) {
      b.neemSprong();
      const ingedrukt = b.ingedrukt.has('Space') || this.knop.gooi;
      if (ingedrukt) this.laden = this.laden < 0 ? 0 : this.laden + dt;
      else if (this.laden >= 0) { this.gooi(Math.min(1, this.laden / 1.1)); this.laden = -1; }
      return false;
    }
    // Trampoline: vanzelf stuiteren, spatie = hoog. In de lucht spatie = salto.
    if (this.opTrampoline() && s.opGrond && s.positie.y <= TRAMPOLINE.top + 0.05) {
      // Landen op de trampoline: hoog als je (net daarvoor) op spatie drukte, anders gewoon stuiteren.
      const hoog = b.neemSprong() || this.wilHoog;
      this.wilHoog = false;
      s.vy = hoog ? 15 : 6.5;
      s.opGrond = false;
      this.hoog = hoog;
      this.ctx.geluid?.boing();
    } else if (!s.opGrond && this.opTrampoline() && b.sprong) {
      b.neemSprong();
      if (!this.salto && this.hoog && s.positie.y > TRAMPOLINE.top + 1.2) {
        this.salto = { t: 0 }; // hoog in de lucht: salto!
        this.ctx.melding?.(GYM.salto);
      } else {
        this.wilHoog = true; // nog niet hoog genoeg: dan wordt de volgende sprong een hoge
      }
    }
    return false;
  }

  /** Gymtijd: loopt alleen af in de gymzaal. Bij 30 seconden een melding, bij 0 een fluitje en terug naar buiten. */
  updateGymtijd(dt) {
    const gt = this.ctx.gymtijd;
    if (!gt) { this.tijdEl.hidden = true; return; }
    if (this.ctx.besturing.aan && !this.tijdOp) gt.verbruik(dt);
    this.tijdEl.textContent = `⏱️ ${tijdOpKlok(gt.seconden)}`;
    this.tijdEl.classList.toggle('bijna', gt.seconden <= 30);
    if (!this.gemeld30 && gt.seconden <= 30) {
      this.gemeld30 = true;
      this.ctx.melding?.(GYMTIJD.nog30);
    }
    if (!this.tijdOp && gt.seconden <= 0) {
      this.tijdOp = true;
      this.klim = null;
      this.laatBalVallen();
      this.ctx.geluid?.fluit();
      this.ctx.melding?.(GYMTIJD.voorbij);
      setTimeout(() => this.ctx.opTijdOp?.(), 1600);
    }
  }

  /** Na het lopen: salto, plafond, ballen, gymtijd. */
  update(dt, tijd, spelerPos) {
    const s = this.speler;
    this.updateGymtijd(dt);
    // Nooit door het plafond (ook niet vanaf de trampoline).
    if (s.positie.y > HOOGTE - 2.3) { s.positie.y = HOOGTE - 2.3; s.vy = Math.min(s.vy, 0); }
    if (s.opGrond && !this.opTrampoline()) this.hoog = false;
    // Salto: één keer helemaal rond, om het midden van het lijf.
    if (this.salto) {
      this.salto.t += dt;
      const f = Math.min(1, this.salto.t / 0.75);
      const th = f * Math.PI * 2;
      const c = 1.0;
      s.model.rotation.x = -th;
      s.model.position.y = c - c * Math.cos(th);
      s.model.position.x = Math.sin(s.richting) * c * Math.sin(th);
      s.model.position.z = Math.cos(s.richting) * c * Math.sin(th);
      if (f >= 1 || s.opGrond) {
        this.salto = null;
        s.model.rotation.x = 0;
        s.model.position.set(0, 0, 0);
      }
    }
    // Bellen slingeren uit.
    for (const t of this.bellen) {
      t.slinger *= Math.exp(-dt * 2);
      t.bel.rotation.z = Math.sin(tijd * 12) * 0.5 * t.slinger;
    }
    this.updateBallen(dt);
    // Teller en krachtbalk.
    this.tellerEl.hidden = this.gescoord === 0 && !this.vastBal;
    this.tellerEl.textContent = GYM.gescoord.replace('{aantal}', this.gescoord);
    this.krachtEl.hidden = !(this.vastBal && this.laden >= 0);
    if (this.vastBal) {
      const ideaal = this.idealeKracht();
      this.doelEl.style.left = `${Math.max(0, (ideaal - Gymzaal.GROEN / 2) * 100)}%`;
      this.doelEl.style.width = `${Gymzaal.GROEN * 100}%`;
      this.doelEl.hidden = ideaal == null;
      if (this.laden >= 0) this.vullingEl.style.width = `${Math.min(1, this.laden / 1.1) * 100}%`;
    }
    const klim = this.ui.querySelector('.gym-klim');
    if (klim) klim.hidden = !this.klim;
    const gooi = this.ui.querySelector('.gym-gooi');
    if (gooi) gooi.hidden = !this.vastBal;
    // Licht beweegt mee.
    this.licht.position.set(spelerPos.x + 5, 20, spelerPos.z + 4);
    this.licht.target.position.copy(spelerPos);
  }

  /** Tekst voor het wolkje, of null. */
  wolkje() {
    const t = this.ctx.isTouch;
    if (this.klim) {
      if (this.speler.positie.y >= KLIM_TOP - 0.05 && !this.klim.glijden) return t ? GYM.belLuidenTik : GYM.belLuiden;
      return t ? GYM.klimmenTik : GYM.klimmen;
    }
    if (this.vastBal) return t ? GYM.balGooienTik : GYM.balGooien;
    if (this.dichtsteTouw()) return t ? GYM.touwPakkenTik : GYM.touwPakken;
    if (this.dichtsteBal()) return t ? GYM.balPakkenTik : GYM.balPakken;
    if (this.opTrampoline()) return t ? GYM.trampolineTik : GYM.trampoline;
    return null;
  }

  /* ---------- Basketbal ---------- */

  /** De ring waar je naar kijkt (binnen 60°), of null. */
  doelRing() {
    const s = this.speler;
    let beste = null, besteHoek = (60 * Math.PI) / 180;
    for (const r of this.ringen) {
      const dx = r.x - s.positie.x, dz = r.z - s.positie.z;
      const hoek = Math.abs(Math.atan2(Math.sin(Math.atan2(dx, dz) - s.richting), Math.cos(Math.atan2(dx, dz) - s.richting)));
      if (hoek < besteHoek && Math.hypot(dx, dz) < 13) { beste = r; besteHoek = hoek; }
    }
    return beste;
  }

  /** Beginpunt van een worp (de handen boven je hoofd). */
  worpStart() {
    const s = this.speler;
    return new THREE.Vector3(s.positie.x + Math.sin(s.richting) * 0.3, s.positie.y + 2.1, s.positie.z + Math.cos(s.richting) * 0.3);
  }

  static SNELHEID = { min: 4, max: 13 };
  /** Breedte van het groene vak op de krachtbalk: loslaten in het groen = raak. */
  static GROEN = 0.14;

  /** Dichtbij gooi je met een hogere boog (anders raak je de voorkant van de ring). */
  static hoekVoor(d) { return ((d < 3.5 ? 64 : 52) * Math.PI) / 180; }

  /** Waar de worp op mikt: het midden van de ring, een heel klein stukje naar achteren (naar het bord). */
  mikpunt(ring, start) {
    const r = Math.atan2(ring.x - start.x, ring.z - start.z);
    return { x: ring.x + Math.sin(r) * 0.03, z: ring.z + Math.cos(r) * 0.03, richting: r, d: Math.hypot(ring.x - start.x, ring.z - start.z) + 0.03 };
  }

  /** Snelheid die precies in de ring komt, of null. */
  idealeSnelheid(ring) {
    const start = this.worpStart();
    const { d } = this.mikpunt(ring, start);
    const h = RING_HOOGTE + 0.05 - start.y;
    const th = Gymzaal.hoekVoor(d);
    const noemer = 2 * Math.cos(th) ** 2 * (d * Math.tan(th) - h);
    if (noemer <= 0) return null;
    return Math.sqrt((ZWAARTE * d * d) / noemer);
  }

  /** Waar op de krachtbalk het groene vak zit (0..1), of null als je niet naar een ring kijkt. */
  idealeKracht() {
    const ring = this.doelRing();
    if (!ring) return null;
    const v = this.idealeSnelheid(ring);
    if (v == null) return null;
    const { min, max } = Gymzaal.SNELHEID;
    return Math.min(1, Math.max(0, (v - min) / (max - min)));
  }

  gooi(kracht) {
    const bal = this.vastBal;
    if (!bal) return;
    this.vastBal = null;
    const s = this.speler;
    const { min, max } = Gymzaal.SNELHEID;
    let v = min + kracht * (max - min);
    bal.pos.copy(this.worpStart());
    // Kijk je naar een ring? Dan gaat de bal die kant op. Losgelaten in het groene vak = precies goed.
    const ring = this.doelRing();
    let richting = s.richting, hoek = Gymzaal.hoekVoor(99);
    if (ring) {
      const mik = this.mikpunt(ring, bal.pos);
      richting = mik.richting;
      hoek = Gymzaal.hoekVoor(mik.d);
      const ideaal = this.idealeKracht();
      if (ideaal != null && Math.abs(kracht - ideaal) <= Gymzaal.GROEN / 2) v = this.idealeSnelheid(ring);
    }
    bal.vel.set(Math.sin(richting) * Math.cos(hoek) * v, Math.sin(hoek) * v, Math.cos(richting) * Math.cos(hoek) * v);
    bal.vorigeY = bal.pos.y;
    this.ctx.geluid?.plop();
  }

  updateBallen(dt) {
    const s = this.speler;
    for (const b of this.ballen) {
      if (b === this.vastBal) {
        // In je handen, voor je buik (of boven je hoofd tijdens het laden).
        const hoog = this.laden >= 0 ? 2.1 : 1.15;
        b.pos.set(s.positie.x + Math.sin(s.richting) * 0.45, s.positie.y + hoog, s.positie.z + Math.cos(s.richting) * 0.45);
        b.mesh.position.copy(b.pos);
        continue;
      }
      const stappen = 4;
      const h = dt / stappen;
      for (let i = 0; i < stappen; i++) this.balStap(b, h);
      b.mesh.position.copy(b.pos);
      b.mesh.rotation.x += b.vel.z * dt * 4;
      b.mesh.rotation.z -= b.vel.x * dt * 4;
    }
  }

  balStap(b, dt) {
    const { minX, maxX, minZ, maxZ } = GYM_GRENZEN;
    const r = BAL_STRAAL;
    b.vorigeY = b.pos.y;
    b.vel.y -= ZWAARTE * dt;
    b.pos.addScaledVector(b.vel, dt);
    // Vloer
    if (b.pos.y < r) {
      b.pos.y = r;
      if (b.vel.y < -1) this.ctx.geluid?.stuiter(Math.min(1, -b.vel.y / 8));
      b.vel.y = Math.abs(b.vel.y) < 0.6 ? 0 : -b.vel.y * 0.7;
      b.vel.x *= 0.985; b.vel.z *= 0.985;
      if (b.vel.y === 0) { b.vel.x *= 0.96; b.vel.z *= 0.96; }
    }
    // Muren en plafond
    const lx = minX + DIK / 2 + r, hx = maxX - DIK / 2 - r, lz = minZ + DIK / 2 + r, hz = maxZ - DIK / 2 - r;
    if (b.pos.x < lx) { b.pos.x = lx; b.vel.x = Math.abs(b.vel.x) * 0.6; }
    if (b.pos.x > hx) { b.pos.x = hx; b.vel.x = -Math.abs(b.vel.x) * 0.6; }
    if (b.pos.z < lz) { b.pos.z = lz; b.vel.z = Math.abs(b.vel.z) * 0.6; }
    if (b.pos.z > hz) { b.pos.z = hz; b.vel.z = -Math.abs(b.vel.z) * 0.6; }
    if (b.pos.y > HOOGTE - r) { b.pos.y = HOOGTE - r; b.vel.y = -Math.abs(b.vel.y) * 0.5; }
    for (const ring of this.ringen) {
      // Bord
      const bz = ring.bordZ;
      if (Math.abs(b.pos.x - ring.x) < 0.9 + r && b.pos.y > RING_HOOGTE - 0.1 && b.pos.y < RING_HOOGTE + 1.0) {
        const voorkant = bz - ring.kant * (0.03 + r);
        if ((ring.kant > 0 && b.pos.z > voorkant && b.pos.z < bz + 0.2) || (ring.kant < 0 && b.pos.z < voorkant && b.pos.z > bz - 0.2)) {
          b.pos.z = voorkant;
          b.vel.z = -b.vel.z * 0.55;
        }
      }
      // Rand van de ring: 16 puntjes rondom
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2;
        const px = ring.x + Math.cos(a) * RING_STRAAL, pz = ring.z + Math.sin(a) * RING_STRAAL;
        const dx = b.pos.x - px, dy = b.pos.y - RING_HOOGTE, dz = b.pos.z - pz;
        const d = Math.hypot(dx, dy, dz);
        const min = r + 0.02;
        if (d < min && d > 1e-5) {
          const nx = dx / d, ny = dy / d, nz = dz / d;
          b.pos.set(px + nx * min, RING_HOOGTE + ny * min, pz + nz * min);
          const vn = b.vel.x * nx + b.vel.y * ny + b.vel.z * nz;
          if (vn < 0) { b.vel.x -= 1.6 * vn * nx; b.vel.y -= 1.6 * vn * ny; b.vel.z -= 1.6 * vn * nz; }
        }
      }
      // Raak: van boven door de ring naar beneden.
      if (b.vorigeY >= RING_HOOGTE && b.pos.y < RING_HOOGTE && b.vel.y < 0
        && Math.hypot(b.pos.x - ring.x, b.pos.z - ring.z) < RING_STRAAL - r * 0.4) {
        this.gescoord++;
        b.vel.x *= 0.3; b.vel.z *= 0.3;
        this.ctx.geluid?.swish();
        this.ctx.melding?.(`${GYM.raak} ${GYM.gescoord.replace('{aantal}', this.gescoord)}`);
      }
    }
    // Loop je tegen een bal aan, dan rolt hij een stukje weg.
    const s = this.speler;
    const dx = b.pos.x - s.positie.x, dz = b.pos.z - s.positie.z;
    const d = Math.hypot(dx, dz);
    if (d < 0.45 + r && b.pos.y < s.positie.y + 1 && d > 1e-4) {
      b.pos.x = s.positie.x + (dx / d) * (0.45 + r);
      b.pos.z = s.positie.z + (dz / d) * (0.45 + r);
      b.vel.x += (dx / d) * 1.5; b.vel.z += (dz / d) * 1.5;
    }
  }

  /* ---------- Opruimen ---------- */

  dispose() {
    this.ui.remove();
    const s = this.speler;
    s.model.rotation.x = 0;
    s.model.position.set(0, 0, 0);
    this.scene.traverse((o) => {
      if (!o.isMesh) return;
      o.geometry?.dispose();
      const materialen = Array.isArray(o.material) ? o.material : [o.material];
      for (const m of materialen) {
        if (m?.map) { m.map.dispose(); m.dispose(); } else if (this.eigen.has(m)) m.dispose();
      }
    });
    this.licht.shadow.map?.dispose();
    this.scene.clear();
  }
}
