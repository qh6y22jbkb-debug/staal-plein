import * as THREE from 'three';
import { Kind } from './kinderen.js';
import { MEESTERS, MEESTER_VRAAG } from './data/oefeningen.js';
import { mat, doos, bol, cilinder, canvasTextuur } from './wereld/helpers.js';

const SLEUTEL = 'staal-blok2-meesters'; // per meester: { wachttot, datum, aantal }

function vandaag() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function leesStand() {
  try {
    const data = JSON.parse(localStorage.getItem(SLEUTEL)) ?? {};
    // Oudere opslag bewaarde alleen een tijdstip per meester.
    for (const [id, w] of Object.entries(data)) if (typeof w === 'number') data[id] = { wachttot: w, datum: vandaag(), aantal: 1 };
    return data;
  } catch { return {}; }
}

/** Een meester: loopt rond zoals de kinderen, maar is groter en stelt een vraag. */
class Meester extends Kind {
  constructor(scene, botsing, info, start) {
    super(scene, botsing, info.naam, { ...info.uiterlijk, snelheid: 2 }, start);
    this.info = info;
    this.isMeester = true;
    this.vraagFase = Math.random() * 6; // vraagteken dobbert niet bij alle meesters tegelijk
    this.figuur.groep.scale.setScalar(1.12);
    this.bouwExtras();
    this.maakVraagteken();
  }

  bouwExtras() {
    const { hoofd, model } = this.figuur;
    const extra = this.info.extra ?? [];
    if (extra.includes('bril')) {
      for (const x of [-0.13, 0.13]) {
        const glas = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.016, 6, 16), mat(0x222222));
        glas.position.set(x, 0.06, 0.34);
        hoofd.add(glas);
      }
      doos(0.08, 0.02, 0.02, 0x222222, 0, 0.07, 0.35, hoofd);
    }
    if (extra.includes('keycord')) {
      // Keycord met naamkaartje.
      const koord = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 4, 16, Math.PI), mat(0xe03131));
      koord.rotation.z = Math.PI;
      koord.position.set(0, 1.55, 0.36);
      model.add(koord);
      doos(0.16, 0.2, 0.02, 0xffffff, 0, 1.3, 0.38, model);
    }
    if (extra.includes('baard')) {
      const baard = bol(0.27, this.info.uiterlijk.haar, 0, -0.22, 0.13, hoofd, 1);
      baard.scale.set(1.1, 0.8, 0.75);
      // Mond weer zichtbaar maken boven de baard.
      doos(0.12, 0.03, 0.02, 0xb03030, 0, -0.08, 0.36, hoofd);
    }
    if (extra.includes('vlinderdas')) {
      for (const s of [-1, 1]) {
        const lus = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.15, 6), mat(0xfab005));
        lus.rotation.z = (s * Math.PI) / 2;
        lus.position.set(s * 0.08, 1.56, 0.33);
        model.add(lus);
      }
    }
    if (extra.includes('fluitje')) {
      const koord = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.012, 4, 16, Math.PI), mat(0x1c7ed6));
      koord.rotation.z = Math.PI;
      koord.position.set(0, 1.55, 0.36);
      model.add(koord);
      cilinder(0.04, 0.12, 0xadb5bd, 0, 1.33, 0.39, model, 8).rotation.x = Math.PI / 2;
    }
    this.figuur.groep.traverse((o) => { if (o.isMesh) { o.userData.geenKlik = false; o.userData.kind = this; } });
  }

  /** Geel vraagteken boven het hoofd: deze meester heeft een vraag voor je. */
  maakVraagteken() {
    const textuur = canvasTextuur(64, 64, (ctx) => {
      ctx.fillStyle = '#ffd43b';
      ctx.beginPath(); ctx.arc(32, 32, 29, 0, Math.PI * 2); ctx.fill();
      ctx.lineWidth = 5; ctx.strokeStyle = '#1d2b4f'; ctx.stroke();
      ctx.fillStyle = '#1d2b4f';
      ctx.font = 'bold 40px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('?', 32, 35);
    });
    this.vraagteken = new THREE.Sprite(new THREE.SpriteMaterial({ map: textuur, depthTest: false }));
    this.vraagteken.scale.set(0.55, 0.55, 1);
    this.vraagteken.position.y = 2.75;
    this.vraagteken.renderOrder = 5;
    this.vraagteken.userData.geenKlik = true;
    this.figuur.groep.add(this.vraagteken);
  }

  /** Blijft staan en kijkt je aan zolang de vraag open is. */
  houVast(spelerPos) {
    this.toestand = 'praat';
    this.timer = 9999;
    this.kijkNaar(spelerPos);
  }

  laatLos() {
    this.toestand = 'wacht';
    this.timer = 1.5;
  }
}

/** De drie meesters, met hun wachttijden en het tekstballonnetje. */
export class Meesters {
  constructor(scene, botsing, uiLaag, camera, voorlezen) {
    this.camera = camera;
    this.voorlezen = voorlezen;
    this.stand = leesStand();
    const starts = [[-14, 20], [16, 6], [-4, -12]];
    this.lijst = MEESTERS.map((info, i) => {
      const [x, z] = starts[i % starts.length];
      return new Meester(scene, botsing, info, new THREE.Vector3(x, 0, z));
    });
    this.ballon = document.createElement('div');
    this.ballon.className = 'tekstballon meester';
    uiLaag.appendChild(this.ballon);
    this.ballonMeester = null;
    this.ballonTijd = 0;
    this._v = new THREE.Vector3();
  }

  /** Stand van een meester voor vandaag (een nieuwe dag begint weer bij 0 vragen). */
  standVan(m) {
    const st = this.stand[m.info.id];
    if (!st || st.datum !== vandaag()) return { wachttot: 0, datum: vandaag(), aantal: 0 };
    return st;
  }

  genoegVandaag(m) { return this.standVan(m).aantal >= MEESTER_VRAAG.maxPerDag; }

  heeftVraag(m) { return !this.genoegVandaag(m) && this.standVan(m).wachttot <= Date.now(); }

  /** Na een vraag: even pauze voor deze meester, en één vraag minder voor vandaag. */
  startWachttijd(m) {
    const st = this.standVan(m);
    this.stand[m.info.id] = { wachttot: Date.now() + MEESTER_VRAAG.wachtMinuten * 60000, datum: vandaag(), aantal: st.aantal + 1 };
    try { localStorage.setItem(SLEUTEL, JSON.stringify(this.stand)); } catch { /* geen opslag */ }
  }

  minutenTeGaan(m) {
    return Math.max(1, Math.ceil((this.standVan(m).wachttot - Date.now()) / 60000));
  }

  dichtsteBij(p, max) {
    let beste = null, besteAfstand = max;
    for (const m of this.lijst) {
      const d = Math.hypot(m.positie.x - p.x, m.positie.z - p.z);
      if (d < besteAfstand) { beste = m; besteAfstand = d; }
    }
    return beste;
  }

  /** Korte zin in een wolkje boven de meester (bijv. "kom straks terug"). */
  zeg(m, tekst, spelerPos) {
    m.praat(spelerPos);
    m.springNu = false;
    this.ballon.innerHTML = `<b>${m.info.naam}</b>${tekst}`;
    this.ballon.classList.add('zichtbaar');
    this.ballonMeester = m;
    this.ballonTijd = 4.5;
    this.voorlezen?.zeg(tekst, { toonhoogte: m.info.stem });
  }

  verbergBallon() {
    this.ballonMeester = null;
    this.ballon.classList.remove('zichtbaar');
  }

  wis() {
    this.stand = {};
    try { localStorage.removeItem(SLEUTEL); } catch { /* geen opslag */ }
  }

  update(dt, speler) {
    for (const m of this.lijst) {
      m.update(dt, speler.positie);
      m.vraagteken.visible = this.heeftVraag(m) && m.toestand !== 'praat';
      m.vraagteken.position.y = 2.75 + Math.sin(performance.now() / 400 + m.vraagFase) * 0.06;
      const dx = m.positie.x - speler.positie.x, dz = m.positie.z - speler.positie.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.95 && d > 1e-4) {
        m.positie.x = speler.positie.x + (dx / d) * 0.95;
        m.positie.z = speler.positie.z + (dz / d) * 0.95;
      }
    }
    if (this.ballonMeester) {
      this.ballonTijd -= dt;
      const m = this.ballonMeester;
      if (this.ballonTijd <= 0) this.verbergBallon();
      else {
        this._v.set(m.positie.x, m.positie.y + 2.9, m.positie.z).project(this.camera);
        this.ballon.style.left = `${((this._v.x + 1) / 2) * window.innerWidth}px`;
        this.ballon.style.top = `${((1 - this._v.y) / 2) * window.innerHeight}px`;
        this.ballon.style.visibility = this._v.z > 1 ? 'hidden' : '';
      }
    }
  }
}
