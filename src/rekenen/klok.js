import './klok.css';

const NS = 'http://www.w3.org/2000/svg';
const maak = (tag, attrs = {}, ouder) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  ouder?.appendChild(e);
  return e;
};

/**
 * Analoge klok (SVG) met een korte wijzer (uren) en een lange wijzer (minuten).
 * Met sleepbaar = true kun je de wijzers verslepen met de muis of met een vinger (pointer events).
 * Sleep je de lange wijzer over de 12 heen, dan schuift het uur mee, net als op een echte klok.
 */
export class AnalogeKlok {
  constructor({ tijd = { h: 0, m: 0 }, sleepbaar = false, sleepStap = 1, klein = false, opVerandering } = {}) {
    this.h = tijd.h % 12;
    this.m = tijd.m;
    this.sleepStap = sleepStap;
    this.opVerandering = opVerandering;
    this.svg = maak('svg', { viewBox: '0 0 200 200', class: `klok${klein ? ' klein' : ''}${sleepbaar ? ' sleepbaar' : ''}`, role: 'img' });
    const svg = this.svg;
    maak('circle', { cx: 100, cy: 100, r: 96, class: 'klok-rand' }, svg);
    maak('circle', { cx: 100, cy: 100, r: 88, class: 'klok-plaat' }, svg);
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const groot = i % 5 === 0;
      const r1 = groot ? 76 : 81, r2 = 86;
      maak('line', {
        x1: 100 + Math.sin(a) * r1, y1: 100 - Math.cos(a) * r1, x2: 100 + Math.sin(a) * r2, y2: 100 - Math.cos(a) * r2,
        class: groot ? 'klok-streep groot' : 'klok-streep',
      }, svg);
    }
    if (!klein) {
      for (let u = 1; u <= 12; u++) {
        const a = (u / 12) * Math.PI * 2;
        const t = maak('text', { x: 100 + Math.sin(a) * 63, y: 100 - Math.cos(a) * 63 + 7, class: 'klok-getal', 'data-uur': u }, svg);
        t.textContent = u;
      }
    }
    // Wijzers (met een brede onzichtbare rand, zodat je ze makkelijk pakt).
    this.kort = maak('g', { class: 'wijzer kort' }, svg);
    maak('line', { x1: 100, y1: 112, x2: 100, y2: 52, class: 'wijzer-lijn' }, this.kort);
    maak('line', { x1: 100, y1: 100, x2: 100, y2: 46, class: 'wijzer-pak' }, this.kort);
    this.lang = maak('g', { class: 'wijzer lang' }, svg);
    maak('line', { x1: 100, y1: 116, x2: 100, y2: 24, class: 'wijzer-lijn' }, this.lang);
    maak('line', { x1: 100, y1: 100, x2: 100, y2: 18, class: 'wijzer-pak' }, this.lang);
    maak('circle', { cx: 100, cy: 100, r: 7, class: 'klok-as' }, svg);

    if (sleepbaar) this.maakSleepbaar();
    this.teken();
  }

  get tijd() { return { h: this.h, m: this.m }; }

  zet({ h, m }) {
    this.h = ((h % 12) + 12) % 12;
    this.m = m;
    this.teken();
  }

  teken() {
    const kortHoek = (this.h % 12) * 30 + this.m * 0.5; // de korte wijzer schuift mee met de minuten
    this.kort.setAttribute('transform', `rotate(${kortHoek} 100 100)`);
    this.lang.setAttribute('transform', `rotate(${this.m * 6} 100 100)`);
    this.svg.setAttribute('aria-label', `Klok: ${this.h || 12} uur en ${this.m} minuten`);
  }

  /** Hoek (0-360, 12 uur = 0) van een punt op het scherm. */
  hoekVan(e) {
    const r = this.svg.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
    return ((Math.atan2(x, -y) * 180) / Math.PI + 360) % 360;
  }

  maakSleepbaar() {
    let welke = null;
    const start = (e, wijzer) => {
      e.preventDefault();
      e.stopPropagation();
      welke = wijzer;
      try { this.svg.setPointerCapture?.(e.pointerId); } catch { /* geen echte aanwijzer: slepen werkt dan ook zonder */ }
      this.svg.classList.add('slepen');
      (welke === 'lang' ? this.lang : this.kort).classList.add('vast');
    };
    this.lang.addEventListener('pointerdown', (e) => start(e, 'lang'));
    this.kort.addEventListener('pointerdown', (e) => start(e, 'kort'));
    // Ergens anders op de klok tikken: pak de wijzer die het dichtst bij die hoek staat.
    this.svg.addEventListener('pointerdown', (e) => {
      if (welke) return;
      const hoek = this.hoekVan(e);
      const verschil = (a, b) => Math.abs(((a - b + 540) % 360) - 180);
      const kortHoek = (this.h % 12) * 30 + this.m * 0.5;
      start(e, verschil(hoek, this.m * 6) <= verschil(hoek, kortHoek) ? 'lang' : 'kort');
      this.sleep(e, welke);
    });
    this.svg.addEventListener('pointermove', (e) => { if (welke) this.sleep(e, welke); });
    const stop = () => {
      if (!welke) return;
      (welke === 'lang' ? this.lang : this.kort).classList.remove('vast');
      welke = null;
      this.svg.classList.remove('slepen');
    };
    this.svg.addEventListener('pointerup', stop);
    this.svg.addEventListener('pointercancel', stop);
  }

  sleep(e, welke) {
    const hoek = this.hoekVan(e);
    if (welke === 'lang') {
      const stap = this.sleepStap;
      const m = (Math.round(hoek / 6 / stap) * stap) % 60;
      // Over de 12 heen? Dan gaat het uur mee (vooruit of terug).
      if (this.m >= 45 && m < 15) this.h = (this.h + 1) % 12;
      else if (this.m < 15 && m >= 45) this.h = (this.h + 11) % 12;
      this.m = m;
    } else {
      // Korte wijzer: het dichtstbijzijnde uur (rekening houdend met de minuten).
      this.h = ((Math.round((hoek - this.m * 0.5) / 30) % 12) + 12) % 12;
    }
    this.teken();
    this.opVerandering?.(this.tijd);
  }

  /** Knopjes: lange wijzer ±stap, korte wijzer ±1 uur. */
  verschuif(welke, richting) {
    if (welke === 'lang') {
      const totaal = (this.h * 60 + this.m + richting * this.sleepStap + 720) % 720;
      this.h = Math.floor(totaal / 60);
      this.m = totaal % 60;
    } else {
      this.h = (this.h + richting + 12) % 12;
    }
    this.teken();
    this.opVerandering?.(this.tijd);
  }

  /** Meester Bram: een wijzer geel kleuren. */
  markeer(welke) {
    this.lang.classList.toggle('bram', welke === 'lang');
    this.kort.classList.toggle('bram', welke === 'kort');
  }
}
