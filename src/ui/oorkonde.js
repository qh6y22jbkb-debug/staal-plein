import { KRAMEN, TEKSTEN } from '../data/oefeningen.js';
import { voortgang } from '../voortgang.js';
import { sterren } from '../minispellen/basis.js';

/** "Staal Blok 2 Kampioen!" – oorkonde op het scherm (en af te drukken). */
export class Oorkonde {
  constructor(laag) {
    this.laag = laag;
    this.el = null;
    this.opSluiten = null;
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    const datum = new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    this.el = document.createElement('div');
    this.el.className = 'oorkonde-achtergrond';
    this.el.innerHTML = `
      <div class="oorkonde" role="dialog" aria-label="Oorkonde">
        <div class="ok-binnen">
          <div class="ok-beker">🏆</div>
          <h2>${TEKSTEN.oorkondeTitel}</h2>
          <p class="ok-school">${TEKSTEN.oorkondeSchool}</p>
          <p>${TEKSTEN.oorkondeVoor}</p>
          <input class="ok-naam" type="text" maxlength="30" placeholder="${TEKSTEN.oorkondeNaam}" value="${voortgang.naam.replace(/"/g, '&quot;')}" autocomplete="off" spellcheck="false">
          <p>${TEKSTEN.oorkondeTekst}</p>
          <div class="ok-kramen">
            ${KRAMEN.map((k) => `<div><span>${k.icoon}</span><small>${sterren(Math.max(1, voortgang.niveau(k.id)))}</small></div>`).join('')}
          </div>
          <div class="ok-onder">
            <span>${datum}</span>
            <span class="ok-handtekening">${TEKSTEN.oorkondeHandtekening}</span>
          </div>
        </div>
        <div class="ok-knoppen">
          <button type="button" class="ok-print">🖨️ ${TEKSTEN.oorkondePrint}</button>
          <button type="button" class="ok-verder">${TEKSTEN.oorkondeVerder} ▶</button>
        </div>
      </div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('oorkonde-open');
    const naam = this.el.querySelector('.ok-naam');
    naam.addEventListener('input', () => { voortgang.naam = naam.value; });
    naam.addEventListener('keydown', (e) => e.stopPropagation());
    this.el.querySelector('.ok-print').addEventListener('click', () => window.print());
    this.el.querySelector('.ok-verder').addEventListener('click', () => this.sluit());
    setTimeout(() => (voortgang.naam ? this.el?.querySelector('.ok-verder') : naam)?.focus({ preventScroll: true }), 300);
  }

  sluit() {
    this.el?.remove();
    this.el = null;
    document.body.classList.remove('oorkonde-open');
    this.opSluiten?.();
  }
}
