import { BIEB_PLEKKEN, BIEBKAART, BIEB_TEKSTEN } from '../data/bieb.js';
import { biebvoortgang } from '../biebvoortgang.js';

/** De zeven leesplekken. */
export const BIEB_ACTIEF = BIEB_PLEKKEN;

/**
 * De Biebkaart (in de Bieb, op de plek van de stempelkaart): één vakje per leesplek,
 * met een medaille voor het hoogste gehaalde niveau: 🥉 Brons, 🥈 Zilver of 🥇 Goud.
 */
export class Biebkaart {
  constructor(laag) {
    this.el = document.createElement('div');
    this.el.className = 'stempelkaart biebkaart'; // zelfde plek en opmaak als de stempelkaart
    this.el.innerHTML = `
      <div class="sk-kop">${BIEBKAART.titel} <span class="sk-teller"></span></div>
      <div class="sk-vakjes">
        ${BIEB_ACTIEF.map((l) => `
          <div class="sk-vak" data-id="${l.id}" data-naam="${l.naam}">
            <span class="sk-icoon">${l.icoon}</span>
            <span class="sk-sterren"></span>
          </div>`).join('')}
      </div>
      <div class="rk-kampioen">${BIEBKAART.kampioen}</div>`;
    laag.appendChild(this.el);
    this.teller = this.el.querySelector('.sk-teller');
    this.kampioenEl = this.el.querySelector('.rk-kampioen');
    this.ververs();
  }

  static get aantalGoud() {
    return BIEB_ACTIEF.filter((l) => biebvoortgang.niveau(l.id) >= 3).length;
  }

  static get vol() {
    return Biebkaart.aantalGoud === BIEB_ACTIEF.length;
  }

  ververs() {
    for (const vak of this.el.querySelectorAll('.sk-vak')) {
      const niveau = biebvoortgang.niveau(vak.dataset.id);
      vak.classList.remove('brons', 'zilver', 'goud');
      if (niveau) vak.classList.add(['brons', 'zilver', 'goud'][niveau - 1]);
      vak.querySelector('.sk-sterren').textContent = BIEBKAART.medailles[niveau] ?? '';
      vak.title = niveau ? `${vak.dataset.naam}: ${BIEB_TEKSTEN.niveauNamen[niveau - 1]}` : vak.dataset.naam;
    }
    this.teller.textContent = BIEBKAART.teller.replace('{aantal}', Biebkaart.aantalGoud).replace('{totaal}', BIEB_ACTIEF.length);
    this.kampioenEl.hidden = !biebvoortgang.kampioen;
  }

  /** Nieuwe medaille: het vakje wordt gestempeld. */
  stempel(id) {
    this.ververs();
    const vak = this.el.querySelector(`.sk-vak[data-id="${id}"]`);
    if (!vak) return;
    vak.classList.remove('stempelt');
    void vak.offsetWidth;
    vak.classList.add('stempelt');
  }
}
