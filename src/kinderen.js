import * as THREE from 'three';
import { Speler } from './speler.js';
import { KINDEREN } from './data/oefeningen.js';
import { PLEIN } from './wereld/schoolplein.js';
import { kiesWillekeurig } from './minispellen/basis.js';

// Ieder kind ziet er anders uit.
const UITERLIJKEN = [
  { shirt: 0x37b24d, broek: 0x343a40, pet: 0xe03131, rugzak: null },
  { shirt: 0xf06595, broek: 0x5c7cfa, pet: null, haar: 0x3b2314, kapsel: 'staartjes', rugzak: 0x74c0fc },
  { shirt: 0xffd43b, broek: 0x495057, pet: null, haar: 0xe0a33a, kapsel: 'kort', huid: 0xf7d1b5 },
  { shirt: 0x845ef7, broek: 0x212529, pet: null, haar: 0x7a4a24, kapsel: 'paardenstaart', rugzak: null },
  { shirt: 0x15aabf, broek: 0x868e96, pet: 0x212529, huid: 0xc68a5a, rugzak: 0xff922b },
  { shirt: 0xff922b, broek: 0x1864ab, pet: null, haar: 0x1d1d1d, kapsel: 'krullen', huid: 0x8d5a3b, rugzak: null },
  { shirt: 0xe64980, broek: 0x343a40, pet: null, haar: 0xc92a2a, kapsel: 'staartjes', rugzak: null },
  { shirt: 0x228be6, broek: 0x495057, pet: null, haar: 0x2b1a10, kapsel: 'kort', huid: 0xb07850, rugzak: 0x40c057 },
  { shirt: 0xfa5252, broek: 0x2b8a3e, pet: 0x1971c2, rugzak: 0xfcc419 },
  { shirt: 0x20c997, broek: 0x5f3dc4, pet: null, haar: 0xf2c94c, kapsel: 'paardenstaart', huid: 0xf7d1b5 },
  { shirt: 0xadb5bd, broek: 0x1864ab, pet: null, haar: 0x5c3a1a, kapsel: 'krullen', rugzak: 0xe03131 },
  { shirt: 0xcc5de8, broek: 0x343a40, pet: null, haar: 0x1d1d1d, kapsel: 'staartjes', huid: 0xa0694a },
];

const WANDELSNELHEID = 2.4;

class Kind {
  constructor(scene, botsing, naam, uiterlijk, start) {
    this.naam = naam;
    this.botsing = botsing;
    this.figuur = new Speler(scene, { ...uiterlijk, snelheid: WANDELSNELHEID });
    this.figuur.groep.scale.setScalar(0.88);
    this.figuur.positie.copy(start);
    this.figuur.richting = Math.random() * Math.PI * 2;
    // Kinderen zijn wél aan te klikken (de speler zelf niet).
    this.figuur.groep.traverse((o) => {
      if (o.isMesh) o.userData.geenKlik = false;
      o.userData.kind = this;
    });
    this.toestand = 'wacht';
    this.timer = Math.random() * 3;
    this.doel = null;
    this.vastTijd = 0;
    this.uitspraken = [];
    this.springNu = false;
  }

  get positie() { return this.figuur.positie; }

  kiesDoel() {
    for (let poging = 0; poging < 30; poging++) {
      // Meestal een plekje in de buurt, soms ver weg.
      const ver = Math.random() < 0.3;
      const bereik = ver ? 40 : 12;
      const x = ver ? THREE.MathUtils.randFloat(PLEIN.minX + 3, PLEIN.maxX - 3) : this.positie.x + THREE.MathUtils.randFloatSpread(bereik);
      const z = ver ? THREE.MathUtils.randFloat(-18, PLEIN.maxZ - 3) : this.positie.z + THREE.MathUtils.randFloatSpread(bereik);
      if (z < -19) continue; // niet tegen de school aan
      if (this.botsing.isVrij(x, z, 0.8)) return new THREE.Vector3(x, 0, z);
    }
    return null;
  }

  /** Zegt iets grappigs en kijkt naar de speler. */
  praat(spelerPos) {
    if (!this.uitspraken.length) this.uitspraken = kiesWillekeurig(KINDEREN.uitspraken, KINDEREN.uitspraken.length);
    this.toestand = 'praat';
    this.timer = 4.5;
    this.springNu = true; // vrolijk sprongetje
    this.kijkNaar(spelerPos);
    return this.uitspraken.pop();
  }

  kijkNaar(p) {
    this.figuur.richting = Math.atan2(p.x - this.positie.x, p.z - this.positie.z);
  }

  update(dt, spelerPos) {
    let beweging = { x: 0, z: 0 };
    this.timer -= dt;

    if (this.toestand === 'praat') {
      this.kijkNaar(spelerPos);
      if (this.timer <= 0) { this.toestand = 'wacht'; this.timer = 1 + Math.random() * 2; }
    } else if (this.toestand === 'wacht') {
      if (this.timer <= 0) {
        this.doel = this.kiesDoel();
        if (this.doel) { this.toestand = 'loop'; this.vastTijd = 0; } else this.timer = 1;
      }
    } else if (this.toestand === 'loop') {
      const dx = this.doel.x - this.positie.x, dz = this.doel.z - this.positie.z;
      const afstand = Math.hypot(dx, dz);
      // Even wachten als de speler vlak voor je staat.
      const spelerDichtbij = Math.hypot(spelerPos.x - this.positie.x, spelerPos.z - this.positie.z) < 1.3;
      if (afstand < 0.4) {
        this.toestand = 'wacht';
        this.timer = 1.5 + Math.random() * 4;
      } else if (!spelerDichtbij) {
        beweging = { x: dx / afstand, z: dz / afstand };
      }
    }

    const afgelegd = this.figuur.update(dt, beweging, this.springNu, this.botsing);
    this.springNu = false;
    if (this.toestand === 'loop' && (beweging.x || beweging.z)) {
      this.vastTijd = afgelegd < 0.01 ? this.vastTijd + dt : 0;
      if (this.vastTijd > 0.6) { this.toestand = 'wacht'; this.timer = 0.3; } // vast: ander doel kiezen
    }
  }
}

/** Alle kinderen op het plein, plus het tekstballonnetje boven hun hoofd. */
export class Kinderen {
  constructor(scene, botsing, uiLaag, camera, voorlezen) {
    this.voorlezen = voorlezen;
    this.camera = camera;
    this.lijst = [];
    const namen = KINDEREN.namen;
    for (let i = 0; i < namen.length; i++) {
      let start = null;
      for (let p = 0; p < 50 && !start; p++) {
        const x = THREE.MathUtils.randFloat(-34, 34), z = THREE.MathUtils.randFloat(-17, 27);
        if (botsing.isVrij(x, z, 1) && Math.hypot(x, z - 22) > 5) start = new THREE.Vector3(x, 0, z);
      }
      this.lijst.push(new Kind(scene, botsing, namen[i], UITERLIJKEN[i % UITERLIJKEN.length], start ?? new THREE.Vector3(i * 3 - 12, 0, 18)));
    }

    this.ballon = document.createElement('div');
    this.ballon.className = 'tekstballon';
    uiLaag.appendChild(this.ballon);
    this.ballonKind = null;
    this.ballonTijd = 0;
    this._v = new THREE.Vector3();
  }

  /** Dichtstbijzijnde kind binnen een afstand (of null). */
  dichtsteBij(p, max) {
    let beste = null, besteAfstand = max;
    for (const k of this.lijst) {
      const d = Math.hypot(k.positie.x - p.x, k.positie.z - p.z);
      if (d < besteAfstand) { beste = k; besteAfstand = d; }
    }
    return beste;
  }

  spreekAan(kind, spelerPos) {
    const tekst = kind.praat(spelerPos);
    this.voorlezen?.zeg(tekst, { toonhoogte: 1.5, snelheid: 1.05 });
    this.ballon.innerHTML = `<b>${kind.naam}</b>${tekst}`;
    this.ballon.classList.add('zichtbaar');
    this.ballonKind = kind;
    this.ballonTijd = 4.5;
  }

  verbergBallon() {
    this.ballonKind = null;
    this.ballon.classList.remove('zichtbaar');
  }

  /** Alle kinderen springen een tijdje van blijdschap (feest!). */
  juich(seconden) {
    this.juichTijd = seconden;
  }

  update(dt, speler) {
    if (this.juichTijd > 0) {
      this.juichTijd -= dt;
      for (const k of this.lijst) if (Math.random() < dt * 1.6) k.springNu = true;
    }
    for (const k of this.lijst) {
      k.update(dt, speler.positie);
      // Niet door de speler heen lopen.
      const dx = k.positie.x - speler.positie.x, dz = k.positie.z - speler.positie.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.85 && d > 1e-4) {
        k.positie.x = speler.positie.x + (dx / d) * 0.85;
        k.positie.z = speler.positie.z + (dz / d) * 0.85;
      }
    }

    // Tekstballon boven het hoofd van het kind dat praat.
    if (this.ballonKind) {
      this.ballonTijd -= dt;
      const k = this.ballonKind;
      const ver = Math.hypot(k.positie.x - speler.positie.x, k.positie.z - speler.positie.z) > 8;
      if (this.ballonTijd <= 0 || ver) {
        this.verbergBallon();
      } else {
        this._v.set(k.positie.x, k.positie.y + 2.4, k.positie.z).project(this.camera);
        const achter = this._v.z > 1;
        this.ballon.style.left = `${((this._v.x + 1) / 2) * window.innerWidth}px`;
        this.ballon.style.top = `${((1 - this._v.y) / 2) * window.innerHeight}px`;
        this.ballon.style.visibility = achter ? 'hidden' : '';
      }
    }
  }
}
