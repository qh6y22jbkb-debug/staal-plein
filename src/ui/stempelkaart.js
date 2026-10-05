import { KRAMEN } from '../data/oefeningen.js';
import { voortgang } from '../voortgang.js';
import { sterren } from '../minispellen/basis.js';

/**
 * De stempelkaart in beeld: 6 vakjes, één per kraam.
 * Onder elk vakje zie je hoeveel niveaus je al gehaald hebt; bij 3 van de 3 komt de stempel.
 */
export class Stempelkaart {
  constructor(laag, kleuren) {
    this.el = document.createElement('div');
    this.el.className = 'stempelkaart';
    this.el.innerHTML = `
      <div class="sk-kop">Stempelkaart <span class="sk-teller"></span></div>
      <div class="sk-vakjes">
        ${KRAMEN.map((k) => `
          <div class="sk-vak" data-id="${k.id}" data-naam="${k.kraamNaam}" style="--kleur:${kleuren[k.id]}">
            <span class="sk-icoon">${k.icoon}</span>
            <span class="sk-sterren"></span>
          </div>`).join('')}
      </div>
      <button type="button" class="sk-oorkonde">🏆 Bekijk je oorkonde</button>`;
    laag.appendChild(this.el);
    this.teller = this.el.querySelector('.sk-teller');
    this.oorkondeKnop = this.el.querySelector('.sk-oorkonde');
    this.opOorkonde = null;
    this.oorkondeKnop.addEventListener('click', () => this.opOorkonde?.());
    this.ververs();
  }

  ververs() {
    for (const vak of this.el.querySelectorAll('.sk-vak')) {
      const niveau = voortgang.niveau(vak.dataset.id);
      vak.classList.toggle('gestempeld', voortgang.heeftStempel(vak.dataset.id));
      vak.querySelector('.sk-sterren').textContent = niveau ? sterren(niveau) : '';
      vak.title = `${vak.dataset.naam}: ${niveau} van de 3 niveaus`;
    }
    this.teller.textContent = `${voortgang.aantal}/6`;
    this.oorkondeKnop.hidden = !voortgang.kampioen;
  }

  /** Een niveau gehaald (nog geen stempel): het vakje wipt even. */
  voortgangGemaakt(id) {
    this.ververs();
    const vak = this.el.querySelector(`.sk-vak[data-id="${id}"]`);
    vak.classList.remove('wip');
    void vak.offsetWidth;
    vak.classList.add('wip');
  }

  /** Stempel-animatie op één vakje. */
  stempel(id) {
    this.ververs();
    const vak = this.el.querySelector(`.sk-vak[data-id="${id}"]`);
    vak.classList.remove('stempelt');
    void vak.offsetWidth;
    vak.classList.add('stempelt');
  }
}
