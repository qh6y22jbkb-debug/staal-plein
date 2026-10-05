import { Minispel, el, willekeurig, kiesWillekeurig } from './basis.js';

/**
 * 3. Dirk de Drummer: woorden vallen uit de lucht.
 * Vang de goed gespelde woorden met de trommel, ontwijk de foute.
 * Elk goed gevangen woord telt als één vraag (8 per ronde).
 */
export class DrummerSpel extends Minispel {
  maakVragen() {
    return []; // dit spel heeft geen vaste vragen
  }

  volgendeVraag() {
    // Het spel loopt door; alleen aan het eind is de ronde klaar.
    if (this.nr >= 8) {
      this.stopSpel();
      this.klaar();
      return;
    }
    this.bolletjes.forEach((b, i) => b.classList.toggle('nu', i === this.nr));
    if (!this.veld) {
      if (this.niveau >= 2) this.bouwTypVeld();
      else this.bouwVeld();
    }
  }

  /* ---------- 2 en 3 sterren: typ de verleden tijd voordat het woord valt ---------- */

  bouwTypVeld() {
    this.veld = el('div', 'drum-veld drum-typveld');
    this.trommel = el('div', 'drum-trommel', '<span class="drum-vel"></span><span class="drum-romp"></span>');
    this.trommel.style.left = '50%';
    this.veld.appendChild(this.trommel);
    this.inhoud.appendChild(this.veld);
    this.invoer = this.maakInvoer((tekst) => this.controleerGetypt(tekst), true);
    this.inhoud.appendChild(this.invoer.rij);

    const lijst = this.data.typWoorden.filter((w) => (w.niveau ?? 2) <= this.niveau);
    this.typLijst = kiesWillekeurig(lijst, lijst.length);
    this.valDuur = this.niveau === 2 ? 15 : 10; // seconden om naar beneden te vallen
    this.tijd = 0;
    this.laatste = performance.now();
    this.nieuwTypWoord();

    this.loopt = true;
    const stap = (nu) => {
      if (!this.loopt) return;
      const dt = Math.min(0.05, (nu - this.laatste) / 1000);
      this.laatste = nu;
      this.updateTyp(dt);
      this.frame = requestAnimationFrame(stap);
    };
    this.frame = requestAnimationFrame(stap);
  }

  nieuwTypWoord() {
    if (!this.typLijst.length) {
      const lijst = this.data.typWoorden.filter((w) => (w.niveau ?? 2) <= this.niveau);
      this.typLijst = kiesWillekeurig(lijst, lijst.length);
    }
    const w = this.typLijst.pop();
    // 3 sterren: soms "wij" (dan -den).
    const wij = this.niveau === 3 && Math.random() < 0.5;
    this.typWoord = { ...w, wij, antwoord: w.ik + (wij ? 'den' : 'de') };
    this.typY = 0;
    this.typKaart?.remove();
    this.typKaart = el('div', 'drum-woord drum-typkaart', `${wij ? 'wij' : 'ik'} … <small>(${w.hele})</small>`);
    this.typKaart.style.left = '50%';
    this.veld.appendChild(this.typKaart);
    this.wachtNieuw = false;
    if (this.invoer) {
      this.invoer.invoer.disabled = false;
      this.invoer.knop.disabled = false;
      this.invoer.invoer.value = '';
      this.invoer.invoer.focus({ preventScroll: true });
    }
    this.voorlezen?.zeg(`${wij ? 'wij' : 'ik'}, ${w.hele}`);
  }

  updateTyp(dt) {
    if (this.wachtNieuw || this.nr >= 8 || !this.typKaart) return;
    const hoogte = this.veld.clientHeight;
    if (!hoogte) return;
    const bodem = hoogte - this.trommel.offsetHeight - this.typKaart.offsetHeight;
    this.typY += (bodem / this.valDuur) * dt;
    this.typKaart.style.transform = `translate(-50%, ${this.typY}px)`;
    if (this.typY >= bodem) {
      // Te laat: geen straf, wel het goede woord laten zien en een nieuw woord.
      this.wachtNieuw = true;
      this.typKaart.classList.add('te-laat');
      this.fout(`Te laat! Het was <mark>${this.typWoord.antwoord}</mark>. Hier komt een nieuw woord.`);
      this.pogingen = 0; // nieuw woord, nieuwe kans
      this.foutDezeVraag = false;
      setTimeout(() => { if (this.loopt) this.nieuwTypWoord(); }, 2200);
    }
  }

  controleerGetypt(tekst) {
    if (this.wachtNieuw || this.nr >= 8) return;
    const w = this.typWoord;
    const woord = tekst.replace(/^(ik|wij)\s+/, '');
    if (woord === w.antwoord) {
      this.wachtNieuw = true;
      this.invoer.invoer.disabled = true;
      this.typKaart.classList.add('gevangen');
      this.typKaart.innerHTML = `${w.wij ? 'wij' : 'ik'} <b>${w.antwoord}</b>`;
      this.trommel.classList.remove('boem');
      void this.trommel.offsetWidth;
      this.trommel.classList.add('boem');
      this.goed(`<mark>${w.antwoord}</mark> is goed!`, { automatisch: true });
      this.foutDezeVraag = false;
      setTimeout(() => {
        if (!this.loopt) return;
        if (this.nr >= 8) this.volgendeVraag();
        else { this.bolletjes.forEach((b, i) => b.classList.toggle('nu', i === this.nr)); this.nieuwTypWoord(); }
      }, 900);
      return;
    }
    this.invoer.invoer.classList.remove('wiebel');
    void this.invoer.invoer.offsetWidth;
    this.invoer.invoer.classList.add('wiebel');
    const dubbel = w.ik.endsWith('d') ? ' Let op: de ik-vorm eindigt al op een d!' : '';
    if (!woord.startsWith(w.ik)) {
      this.fout(`Begin met de ik-vorm: <b>ik ${w.ik}</b>.`);
    } else if (w.wij && !woord.endsWith('n')) {
      this.fout(`Bij <b>wij</b> komt er een <mark>n</mark> achter.${dubbel}`);
    } else if (!w.wij && woord.endsWith('n')) {
      this.fout('Bij <b>ik</b> komt er géén n achter.');
    } else {
      this.fout(`De ik-vorm is <b>ik ${w.ik}</b>. Daar komt <mark>-de</mark> achter.${dubbel}`);
    }
  }

  /** Snelheid en aantal foute woorden per niveau. */
  get instelling() {
    return [
      { val: 0.12, extra: 0.008, kansGoed: 0.65, tussen: 2.2 },
      { val: 0.17, extra: 0.012, kansGoed: 0.55, tussen: 1.9 },
      { val: 0.22, extra: 0.015, kansGoed: 0.45, tussen: 1.6 },
    ][this.niveau - 1];
  }

  bouwVeld() {
    this.veld = el('div', 'drum-veld');
    this.trommel = el('div', 'drum-trommel', '<span class="drum-vel"></span><span class="drum-romp"></span>');
    this.veld.appendChild(this.trommel);
    this.inhoud.appendChild(this.veld);
    this.inhoud.appendChild(el('p', 'drum-tip', '← → of A en D om te bewegen. Of beweeg met je muis of vinger over het veld.'));

    this.woorden = [];
    this.trommelX = 0.5; // 0..1
    this.doelX = null;
    this.links = this.rechts = false;
    this.pauzeTot = 0;
    this.volgendeWoord = 0.6;
    this.tijd = 0;
    this.laatste = performance.now();

    const zetDoel = (e) => {
      const r = this.veld.getBoundingClientRect();
      this.doelX = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    };
    this.veld.addEventListener('pointerdown', (e) => { this.veld.setPointerCapture(e.pointerId); zetDoel(e); });
    this.veld.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || e.buttons) zetDoel(e); });
    this.toetsLos = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.links = false;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.rechts = false;
    };
    window.addEventListener('keyup', this.toetsLos);

    this.loopt = true;
    const stap = (nu) => {
      if (!this.loopt) return;
      const dt = Math.min(0.05, (nu - this.laatste) / 1000);
      this.laatste = nu;
      this.update(dt);
      this.frame = requestAnimationFrame(stap);
    };
    this.frame = requestAnimationFrame(stap);
  }

  toets(e) {
    if (this.niveau >= 2) return;
    if (['ArrowLeft', 'KeyA'].includes(e.code)) { this.links = true; this.doelX = null; e.preventDefault(); }
    if (['ArrowRight', 'KeyD'].includes(e.code)) { this.rechts = true; this.doelX = null; e.preventDefault(); }
  }

  update(dt) {
    const breedte = this.veld.clientWidth, hoogte = this.veld.clientHeight;
    if (!breedte) return;
    this.tijd += dt;

    // Trommel bewegen.
    const snelheid = 1.3; // veldbreedtes per seconde
    if (this.links) this.trommelX -= snelheid * dt;
    if (this.rechts) this.trommelX += snelheid * dt;
    if (this.doelX != null) this.trommelX += (this.doelX - this.trommelX) * Math.min(1, dt * 12);
    this.trommelX = Math.min(0.93, Math.max(0.07, this.trommelX));
    this.trommel.style.left = `${this.trommelX * 100}%`;

    // Ronde klaar, of even pauze na een fout gevangen woord (zodat je de hint rustig kunt lezen).
    if (this.nr >= 8 || this.tijd < this.pauzeTot) return;

    // Nieuwe woorden laten vallen.
    this.volgendeWoord -= dt;
    if (this.volgendeWoord <= 0 && this.woorden.length < 4) {
      this.laatWoordVallen(breedte);
      this.volgendeWoord = this.instelling.tussen - Math.min(0.6, this.nr * 0.06);
    }

    const valSnelheid = hoogte * (this.instelling.val + this.nr * this.instelling.extra);
    const trommelBreed = this.trommel.offsetWidth;
    const trommelTop = hoogte - this.trommel.offsetHeight;
    const trommelMidden = this.trommelX * breedte;

    for (const w of [...this.woorden]) {
      w.y += valSnelheid * dt;
      w.el.style.transform = `translate(-50%, ${w.y}px)`;
      const onder = w.y + w.el.offsetHeight;
      if (onder >= trommelTop + 10 && onder < trommelTop + 40 && Math.abs(w.x * breedte - trommelMidden) < trommelBreed / 2 + 10) {
        this.gevangen(w);
      } else if (w.y > hoogte) {
        this.verwijder(w);
      }
    }
  }

  laatWoordVallen(breedte) {
    const isGoed = Math.random() < this.instelling.kansGoed;
    // 1 ster: alleen de makkelijke foute woorden.
    const fouten = this.niveau === 1 ? this.data.fout.filter((f) => (f.niveau ?? 1) === 1) : this.data.fout;
    const woord = isGoed ? willekeurig(this.data.goed) : willekeurig(fouten);
    const tekst = isGoed ? woord : woord.woord;
    // Kies een plek die niet te dicht bij het vorige woord ligt.
    let x;
    do { x = 0.1 + Math.random() * 0.8; } while (this.vorigeX != null && Math.abs(x - this.vorigeX) < 0.22);
    this.vorigeX = x;
    const e = el('div', 'drum-woord', tekst);
    e.style.left = `${x * 100}%`;
    this.veld.appendChild(e);
    this.woorden.push({ el: e, x, y: -50, goed: isGoed, info: woord, breedte });
  }

  gevangen(w) {
    this.verwijder(w);
    this.trommel.classList.remove('boem');
    void this.trommel.offsetWidth;
    this.trommel.classList.add('boem');
    if (w.goed) {
      this.goed(`<mark>${w.info}</mark> is goed geschreven!`, { automatisch: true });
      this.foutDezeVraag = false;
      if (this.nr >= 8) setTimeout(() => this.volgendeVraag(), 900);
      else this.volgendeVraag();
    } else {
      const goedWoord = w.info.goed;
      const ik = goedWoord.replace(/den?$/, '');
      this.fout(`<s>${w.info.woord}</s> is fout. Het is <mark>${goedWoord}</mark>: ik ${ik} + de.`);
      // Even pauzeren en alle woorden weghalen, dan rustig verder.
      this.pauzeTot = this.tijd + 2.2;
      for (const ander of [...this.woorden]) this.verwijder(ander);
      this.volgendeWoord = 0.4;
    }
  }

  verwijder(w) {
    w.el.remove();
    this.woorden = this.woorden.filter((x) => x !== w);
  }

  stopSpel() {
    this.loopt = false;
    this.typKaart = null;
    cancelAnimationFrame(this.frame);
    if (this.toetsLos) window.removeEventListener('keyup', this.toetsLos);
    this.veld = null;
  }
}
