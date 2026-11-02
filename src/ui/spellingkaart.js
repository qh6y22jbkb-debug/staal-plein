import { SPELLING_LOKALEN, SPELLINGKAART, SPELLING_TEKSTEN } from '../data/spelling.js';
import { spellingvoortgang } from '../spellingvoortgang.js';

/** De lokalen die meedoen (lokaal 5 kan uit staan). */
export const SPELLING_ACTIEF = SPELLING_LOKALEN.filter((l) => !l.uit);

/**
 * De Spellingkaart (in de Spellingwereld, op de plek van de stempelkaart): één vakje per lokaal,
 * met een medaille voor het hoogste gehaalde niveau: 🥉 Brons, 🥈 Zilver of 🥇 Goud.
 */
export class Spellingkaart {
  constructor(laag) {
    this.el = document.createElement('div');
    this.el.className = 'stempelkaart rekenkaart spellingkaart'; // zelfde plek en opmaak als de Rekenkaart
    this.el.innerHTML = `
      <div class="sk-kop">${SPELLINGKAART.titel} <span class="sk-teller"></span></div>
      <div class="sk-vakjes">
        ${SPELLING_ACTIEF.map((l) => `
          <div class="sk-vak" data-id="${l.id}" data-naam="${l.naam}">
            <span class="sk-icoon">${l.icoon}</span>
            <span class="sk-sterren"></span>
          </div>`).join('')}
      </div>
      <div class="rk-kampioen">${SPELLINGKAART.kampioen}</div>`;
    laag.appendChild(this.el);
    this.teller = this.el.querySelector('.sk-teller');
    this.kampioenEl = this.el.querySelector('.rk-kampioen');
    this.ververs();
  }

  static get aantalGoud() {
    return SPELLING_ACTIEF.filter((l) => spellingvoortgang.niveau(l.id) >= 3).length;
  }

  static get vol() {
    return Spellingkaart.aantalGoud === SPELLING_ACTIEF.length;
  }

  ververs() {
    for (const vak of this.el.querySelectorAll('.sk-vak')) {
      const niveau = spellingvoortgang.niveau(vak.dataset.id);
      vak.classList.remove('brons', 'zilver', 'goud');
      if (niveau) vak.classList.add(['brons', 'zilver', 'goud'][niveau - 1]);
      vak.querySelector('.sk-sterren').textContent = SPELLINGKAART.medailles[niveau] ?? '';
      vak.title = niveau ? `${vak.dataset.naam}: ${SPELLING_TEKSTEN.niveauNamen[niveau - 1]}` : vak.dataset.naam;
    }
    this.teller.textContent = SPELLINGKAART.teller.replace('{aantal}', Spellingkaart.aantalGoud).replace('{totaal}', SPELLING_ACTIEF.length);
    this.kampioenEl.hidden = !spellingvoortgang.kampioen;
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
