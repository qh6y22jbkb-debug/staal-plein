import { LOKALEN, REKENKAART, REKEN_TEKSTEN_SPEL } from '../data/rekenen.js';
import { rekenvoortgang } from '../rekenvoortgang.js';

/**
 * De Rekenkaart (in Leergroep 3, op de plek van de stempelkaart): 6 vakjes, één per rekenkraam.
 * Elk vakje krijgt een medaille voor het hoogste gehaalde niveau: 🥉 Brons, 🥈 Zilver of 🥇 Goud.
 * Alle zes op Goud = Rekenkampioen. Telt niet mee voor de poort naar de Voetbalwereld.
 */
export class Rekenkaart {
  constructor(laag) {
    this.el = document.createElement('div');
    this.el.className = 'stempelkaart rekenkaart';
    this.el.innerHTML = `
      <div class="sk-kop">${REKENKAART.titel} <span class="sk-teller"></span></div>
      <div class="sk-vakjes">
        ${LOKALEN.map((l) => `
          <div class="sk-vak" data-id="${l.id}" data-naam="${l.naam}">
            <span class="sk-icoon">${l.icoon}</span>
            <span class="sk-sterren"></span>
          </div>`).join('')}
      </div>
      <div class="rk-kampioen">${REKENKAART.kampioenKnop}</div>`;
    laag.appendChild(this.el);
    this.teller = this.el.querySelector('.sk-teller');
    this.kampioenEl = this.el.querySelector('.rk-kampioen');
    this.ververs();
  }

  /** Aantal rekenkramen op Goud. */
  static get aantalGoud() {
    return LOKALEN.filter((l) => rekenvoortgang.niveau(l.id) >= 3).length;
  }

  static get vol() {
    return Rekenkaart.aantalGoud === LOKALEN.length;
  }

  ververs() {
    for (const vak of this.el.querySelectorAll('.sk-vak')) {
      const niveau = rekenvoortgang.niveau(vak.dataset.id);
      vak.classList.remove('brons', 'zilver', 'goud');
      if (niveau) vak.classList.add(['brons', 'zilver', 'goud'][niveau - 1]);
      vak.querySelector('.sk-sterren').textContent = REKENKAART.medailles[niveau] ?? '';
      vak.title = niveau ? `${vak.dataset.naam}: ${REKEN_TEKSTEN_SPEL.niveauNamen[niveau - 1]}` : vak.dataset.naam;
    }
    this.teller.textContent = REKENKAART.teller.replace('{aantal}', Rekenkaart.aantalGoud);
    this.kampioenEl.hidden = !rekenvoortgang.kampioen;
  }

  /** Nieuwe medaille: het vakje wordt gestempeld. */
  stempel(id) {
    this.ververs();
    const vak = this.el.querySelector(`.sk-vak[data-id="${id}"]`);
    vak.classList.remove('stempelt');
    void vak.offsetWidth;
    vak.classList.add('stempelt');
  }
}
