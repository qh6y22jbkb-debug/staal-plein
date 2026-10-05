import { MEESTER_VRAAG } from '../data/oefeningen.js';
import { maakMeesterVraag } from '../meestervragen.js';
import { willekeurig } from '../minispellen/basis.js';

/**
 * Het vraagvenster van een meester: één vraag, zelf typen.
 * Goed in één keer = 20 munten, bij de tweede poging = 10. Daarna legt de meester het uit.
 */
export class Meestervraag {
  constructor(laag, { geluid, voorlezen, beloon }) {
    this.laag = laag;
    this.geluid = geluid;
    this.voorlezen = voorlezen;
    this.beloon = beloon;
    this.el = null;
    this.opSluiten = null;
    this.toetsen = (e) => { if (e.code === 'Escape') { e.preventDefault(); this.sluit(); } };
  }

  get open() { return !!this.el; }

  toon(meester) {
    if (this.el) return;
    this.meester = meester;
    this.vraag = maakMeesterVraag();
    this.pogingen = 0;
    this.klaar = false;
    const T = MEESTER_VRAAG;
    this.el = document.createElement('div');
    this.el.className = 'dialoog meestervraag zichtbaar';
    this.el.setAttribute('role', 'dialog');
    this.el.innerHTML = `
      <div class="dialoog-kop"><span class="dialoog-icoon">🧑‍🏫</span><span class="dialoog-naam">${meester.info.naam}</span></div>
      <div class="dialoog-tekst">
        <p>${meester.info.begroeting} ${this.vraag.intro}</p>
        <p><b>${this.vraag.vraag}</b></p>
        <div class="voorbeeld mv-vraag">${this.vraag.voorbeeld}</div>
      </div>
      <form class="ms-invoer-rij mv-invoer">
        <div class="mv-vakken">${Array.from({ length: this.vraag.vakken }, (_, i) =>
          `<input class="ms-invoer${this.vraag.vakken === 1 ? ' breed' : ' mv-vak'}" type="text" autocomplete="off" spellcheck="false" aria-label="Woord ${i + 1}" placeholder="${this.vraag.vakken === 1 ? 'Typ hier…' : `woord ${i + 1}`}">`).join('')}</div>
        <button type="submit" class="ms-controleer">${T.controleer} ✓</button>
      </form>
      <div class="ms-feedback mv-feedback" aria-live="polite"></div>
      <div class="dialoog-knoppen"><button type="button" class="knop-doei mv-doei">${T.doei}</button></div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('in-gesprek');
    this.vakken = [...this.el.querySelectorAll('.ms-invoer')];
    this.invoer = this.vakken[0];
    this.vakken.forEach((vak, i) => {
      vak.setAttribute('autocapitalize', 'off');
      // Spatie typen = naar het volgende vak (geen twee woorden in één vak).
      vak.addEventListener('keydown', (e) => {
        if (e.key === ' ' && i < this.vakken.length - 1) {
          e.preventDefault();
          if (vak.value.trim()) this.vakken[i + 1].focus();
        } else if (e.key === 'Backspace' && !vak.value && i > 0) {
          e.preventDefault();
          this.vakken[i - 1].focus();
        }
      });
    });
    this.feedback = this.el.querySelector('.mv-feedback');
    this.doeiKnop = this.el.querySelector('.mv-doei');
    this.el.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      const woorden = this.vakken.map((v) => v.value.trim());
      const leeg = this.vakken.find((v) => !v.value.trim());
      if (leeg) { leeg.focus(); return; } // eerst alle vakken invullen
      this.controleer(woorden.join(' '));
    });
    this.doeiKnop.addEventListener('click', () => this.sluit());
    window.addEventListener('keydown', this.toetsen);
    setTimeout(() => this.invoer?.focus({ preventScroll: true }), 60);
    this.geluid?.plop();
    this.voorlezen?.zeg(this.el.querySelector('.dialoog-tekst').innerHTML.replace(/…/g, ', puntje puntje, '), { toonhoogte: meester.info.stem });
  }

  controleer(tekst) {
    if (this.klaar) return;
    const T = MEESTER_VRAAG;
    if (this.vraag.controleer(tekst)) {
      this.klaar = true;
      const munten = this.pogingen === 0 ? T.beloning : T.tweedePoging;
      const zin = willekeurig(T.goed);
      this.feedback.className = 'ms-feedback mv-feedback ms-goed';
      this.feedback.innerHTML = `<span><b>${zin}</b> ${this.vraag.uitleg} <span class="ms-munt-badge"><span class="munt" aria-hidden="true"></span>+${munten}</span></span>`;
      this.geluid?.goed();
      this.beloon?.(munten, this.feedback.querySelector('.ms-munt-badge'), `+${munten}`);
      this.voorlezen?.zeg(zin, { toonhoogte: this.meester.info.stem });
      this.rondAf();
      return;
    }
    this.pogingen++;
    for (const vak of this.vakken) {
      vak.classList.remove('wiebel');
      void vak.offsetWidth;
      vak.classList.add('wiebel');
    }
    if (this.pogingen === 1) {
      const hint = this.vraag.hint ? ` ${this.vraag.hint}` : '';
      this.feedback.className = 'ms-feedback mv-feedback ms-bijna';
      this.feedback.innerHTML = `<span><b>${T.nogEens}</b>${hint}</span>`;
      this.geluid?.bijna();
      this.voorlezen?.zeg(this.feedback.textContent, { toonhoogte: this.meester.info.stem });
      this.vakken[0].focus();
      this.vakken[0].select();
      return;
    }
    // Twee keer fout: de meester legt het uit (geen munten, wel een nieuwe kans later).
    this.klaar = true;
    const tekst2 = T.helaas.replace('{antwoord}', `<mark>${this.vraag.antwoord}</mark>`);
    this.feedback.className = 'ms-feedback mv-feedback ms-bijna';
    this.feedback.innerHTML = `<span>${tekst2}<br>${this.vraag.uitleg}</span>`;
    this.voorlezen?.zeg(this.feedback.textContent, { toonhoogte: this.meester.info.stem });
    this.rondAf();
  }

  rondAf() {
    for (const vak of this.vakken) vak.disabled = true;
    this.el.querySelector('.ms-controleer').disabled = true;
    this.doeiKnop.textContent = MEESTER_VRAAG.bedankt;
    this.doeiKnop.classList.add('mv-bedankt');
    this.doeiKnop.focus({ preventScroll: true });
  }

  sluit() {
    if (!this.el) return;
    window.removeEventListener('keydown', this.toetsen);
    this.voorlezen?.stop();
    this.el.remove();
    this.el = null;
    document.body.classList.remove('in-gesprek');
    this.opSluiten?.(this.meester);
  }
}
