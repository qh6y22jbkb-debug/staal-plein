import { VOETBAL } from '../data/oefeningen.js';

/** Schermdelen in de Voetbalwereld: titel, sprint- en krachtbalk, uitleg, GOAL! en touchknoppen. */
export class VoetbalHud {
  constructor(laag, isTouch) {
    this.el = document.createElement('div');
    this.el.className = 'voetbal-hud';
    this.el.innerHTML = `
      <div class="voetbal-titel">⚽ ${VOETBAL.poortBord}</div>
      <div class="vb-uitleg">
        ${isTouch
          ? `🕹️ ${VOETBAL.uitlegJoystick}<br>⚽ ${VOETBAL.uitlegSchietKnop}<br>⚡ ${VOETBAL.uitlegSprintKnop}`
          : `⌨️ ${VOETBAL.uitlegLopen}<br>⚡ ${VOETBAL.uitlegSprint}<br>⚽ ${VOETBAL.uitlegSchiet}`}
      </div>
      <div class="vb-energie"><span>⚡</span><div class="vb-balk"><div class="vb-vulling"></div></div></div>
      <div class="vb-kracht"><div class="vb-balk"><div class="vb-vulling"></div></div><span>${VOETBAL.kracht}</span></div>
      <div class="vb-goal">GOAL!</div>
      ${isTouch ? `
        <div class="vb-knoppen">
          <button type="button" data-knop="sprint">⚡<small>${VOETBAL.knopSprint}</small></button>
          <button type="button" data-knop="schiet" class="groot">⚽<small>${VOETBAL.knopSchiet}</small></button>
        </div>` : ''}`;
    laag.appendChild(this.el);
    this.energie = this.el.querySelector('.vb-energie .vb-vulling');
    this.krachtEl = this.el.querySelector('.vb-kracht');
    this.kracht = this.krachtEl.querySelector('.vb-vulling');
    this.goal = this.el.querySelector('.vb-goal');
    // Touchknoppen: ingedrukt houden.
    this.knop = { sprint: false, schiet: false };
    for (const knop of this.el.querySelectorAll('.vb-knoppen button')) {
      const naam = knop.dataset.knop;
      const aan = (e) => { e.preventDefault(); this.knop[naam] = true; knop.classList.add('in'); };
      const uit = () => { this.knop[naam] = false; knop.classList.remove('in'); };
      knop.addEventListener('pointerdown', aan);
      knop.addEventListener('pointerup', uit);
      knop.addEventListener('pointercancel', uit);
      knop.addEventListener('pointerleave', uit);
    }
  }

  zetEnergie(f) { this.energie.style.width = `${Math.round(f * 100)}%`; this.energie.classList.toggle('laag', f < 0.25); }

  zetKracht(f) {
    this.krachtEl.classList.toggle('zichtbaar', f > 0);
    this.kracht.style.width = `${Math.round(f * 100)}%`;
  }

  toonGoal(tekst = 'GOAL!') {
    this.goal.textContent = tekst;
    this.goal.classList.remove('zichtbaar');
    void this.goal.offsetWidth;
    this.goal.classList.add('zichtbaar');
  }

  weg() { this.el.remove(); }
}
