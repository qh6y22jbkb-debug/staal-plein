import { VOETBAL } from '../data/oefeningen.js';

/**
 * Schermdelen in de Voetbalwereld: titel, stand + tijd, sprint- en krachtbalk, uitleg,
 * meldingen, GOAL!, startknop, eindscherm en touchknoppen.
 */
export class VoetbalHud {
  constructor(laag, isTouch) {
    this.el = document.createElement('div');
    this.el.className = 'voetbal-hud';
    this.el.innerHTML = `
      <div class="voetbal-titel">⚽ ${VOETBAL.poortBord}</div>
      <div class="vb-stand"></div>
      <div class="vb-uitleg">
        ${isTouch
          ? `🕹️ ${VOETBAL.uitlegJoystick}<br>⚽ ${VOETBAL.uitlegSchietKnop}<br>⚡ ${VOETBAL.uitlegSprintKnop}`
          : `⌨️ ${VOETBAL.uitlegLopen}<br>⚡ ${VOETBAL.uitlegSprint}<br>⚽ ${VOETBAL.uitlegSchiet}<br>➡️ ${VOETBAL.uitlegPass}<br>🔄 ${VOETBAL.uitlegWissel}`}
      </div>
      <button type="button" class="vb-start"></button>
      <button type="button" class="vb-stop">✕ ${VOETBAL.stoppen}</button>
      <div class="vb-melding"></div>
      <div class="vb-energie"><span>⚡</span><div class="vb-balk"><div class="vb-vulling"></div></div></div>
      <div class="vb-kracht"><div class="vb-balk"><div class="vb-vulling"></div></div><span>${VOETBAL.kracht}</span></div>
      <div class="vb-goal">GOAL!</div>
      <div class="vb-einde"></div>
      ${isTouch ? `
        <div class="vb-knoppen">
          <div class="vb-knoppen-kolom">
            <button type="button" data-knop="wissel">🔄<small>${VOETBAL.knopWissel}</small></button>
            <button type="button" data-knop="sprint">⚡<small>${VOETBAL.knopSprint}</small></button>
          </div>
          <div class="vb-knoppen-kolom">
            <button type="button" data-knop="pass">➡️<small>${VOETBAL.knopPass}</small></button>
            <button type="button" data-knop="schiet" class="groot">⚽<small>${VOETBAL.knopSchiet}</small></button>
          </div>
        </div>` : ''}`;
    laag.appendChild(this.el);
    this.energie = this.el.querySelector('.vb-energie .vb-vulling');
    this.krachtEl = this.el.querySelector('.vb-kracht');
    this.kracht = this.krachtEl.querySelector('.vb-vulling');
    this.goal = this.el.querySelector('.vb-goal');
    this.standEl = this.el.querySelector('.vb-stand');
    this.meldingEl = this.el.querySelector('.vb-melding');
    this.startKnop = this.el.querySelector('.vb-start');
    this.eindeEl = this.el.querySelector('.vb-einde');
    this.uitlegEl = this.el.querySelector('.vb-uitleg');
    this.opStart = null;

    // Touchknoppen: ingedrukt houden (sprint/schiet) of één keer tikken (pass/wissel).
    this.knop = { sprint: false, schiet: false, pass: false, wissel: false };
    this.getikt = { pass: false, wissel: false };
    for (const knop of this.el.querySelectorAll('.vb-knoppen button')) {
      const naam = knop.dataset.knop;
      const aan = (e) => {
        e.preventDefault();
        this.knop[naam] = true;
        if (naam in this.getikt) this.getikt[naam] = true;
        knop.classList.add('in');
      };
      const uit = () => { this.knop[naam] = false; knop.classList.remove('in'); };
      knop.addEventListener('pointerdown', aan);
      knop.addEventListener('pointerup', uit);
      knop.addEventListener('pointercancel', uit);
      knop.addEventListener('pointerleave', uit);
    }
    this.startKnop.addEventListener('click', () => this.opStart?.());
    this.stopKnop = this.el.querySelector('.vb-stop');
    this.opStop = null;
    this.stopKnop.addEventListener('click', () => this.opStop?.());
  }

  /** Eén keer getikt op Pass of Wissel? (wordt daarna weer op false gezet) */
  neemTik(naam) {
    const t = this.getikt[naam];
    this.getikt[naam] = false;
    return t;
  }

  zetEnergie(f) { this.energie.style.width = `${Math.round(f * 100)}%`; this.energie.classList.toggle('laag', f < 0.25); }

  zetKracht(f) {
    this.krachtEl.classList.toggle('zichtbaar', f > 0);
    this.kracht.style.width = `${Math.round(f * 100)}%`;
  }

  /** Stand en resterende tijd bovenin. Leeg = verbergen (oefenen). */
  zetStand(thuis, scoreThuis, uit, scoreUit, tijd) {
    if (!thuis) { this.standEl.classList.remove('zichtbaar'); return; }
    this.standEl.innerHTML = `<span class="vb-team thuis">${thuis}</span><b>${scoreThuis} - ${scoreUit}</b><span class="vb-team uit">${uit}</span><span class="vb-tijd">⏱ ${tijd}</span>`;
    this.standEl.classList.add('zichtbaar');
  }

  zetStartKnop(tekst) {
    this.startKnop.textContent = tekst ? `▶ ${tekst}` : '';
    this.startKnop.classList.toggle('zichtbaar', !!tekst);
    this.stopKnop.classList.toggle('zichtbaar', !tekst); // tijdens een wedstrijd: stopknop
  }

  melding(tekst) {
    this.meldingEl.textContent = tekst;
    this.meldingEl.classList.remove('zichtbaar');
    void this.meldingEl.offsetWidth;
    this.meldingEl.classList.add('zichtbaar');
  }

  toonGoal(tekst = 'GOAL!') {
    this.goal.textContent = tekst;
    this.goal.classList.remove('zichtbaar');
    void this.goal.offsetWidth;
    this.goal.classList.add('zichtbaar');
  }

  /** Eindscherm na de wedstrijd. knoppen = [{ tekst, actie, hoofd }] */
  toonEinde(titel, uitslag, regels, knoppen) {
    this.stopKnop.classList.remove('zichtbaar');
    this.eindeEl.innerHTML = `
      <div class="vb-einde-kaart">
        <h2>${titel}</h2>
        <div class="vb-uitslag">${uitslag}</div>
        ${regels.map((r) => `<p>${r}</p>`).join('')}
        <div class="vb-einde-knoppen">${knoppen.map((k, i) => `<button type="button" data-i="${i}" class="${k.hoofd ? 'hoofd' : ''}">${k.tekst}</button>`).join('')}</div>
      </div>`;
    this.eindeEl.classList.add('zichtbaar');
    this.eindeEl.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => knoppen[Number(b.dataset.i)].actie()));
    this.eindeEl.querySelector('button.hoofd, button')?.focus({ preventScroll: true });
  }

  /**
   * Keuzescherm "Kies je tegenstander".
   * teams = [{ team, open, verslagen, slotTekst }]
   */
  toonKeuze(teams, opKies) {
    this.stopKnop.classList.remove('zichtbaar');
    const hex = (k) => k;
    this.eindeEl.innerHTML = `
      <div class="vb-einde-kaart vb-keuze">
        <h2>⚽ ${VOETBAL.kiesTegenstander}</h2>
        <div class="vb-keuze-lijst">
          ${teams.map((t, i) => `
            <button type="button" data-i="${i}" class="vb-team-kaart${t.open ? '' : ' op-slot'}${t.verslagen ? ' verslagen' : ''}" ${t.open ? '' : 'disabled'}>
              <span class="vb-shirtje" style="--shirt:${hex(t.team.tenue.shirt)};--streep:${hex(t.team.tenue.streep)}"></span>
              <span class="vb-team-info"><b>${i + 1}. ${t.team.naam}</b><small>${VOETBAL.niveaus[t.team.niveau] ?? ''}</small></span>
              <span class="vb-team-status">${t.verslagen ? VOETBAL.verslagen : t.open ? `▶ ${VOETBAL.spelen}` : `🔒 ${t.slotTekst}`}</span>
            </button>`).join('')}
        </div>
        <div class="vb-einde-knoppen"><button type="button" class="vb-keuze-sluit">${VOETBAL.sluiten}</button></div>
      </div>`;
    this.eindeEl.classList.add('zichtbaar');
    this.eindeEl.querySelectorAll('.vb-team-kaart').forEach((b) => b.addEventListener('click', () => opKies(teams[Number(b.dataset.i)].team)));
    this.eindeEl.querySelector('.vb-keuze-sluit').addEventListener('click', () => this.verbergEinde());
    (this.eindeEl.querySelector('.vb-team-kaart:not([disabled]):not(.verslagen)') ?? this.eindeEl.querySelector('.vb-team-kaart:not([disabled])'))?.focus({ preventScroll: true });
  }

  /** De Bunders Beker in beeld. */
  toonBeker(opSluit) {
    this.stopKnop.classList.remove('zichtbaar');
    this.eindeEl.innerHTML = `
      <div class="vb-einde-kaart vb-beker">
        <div class="vb-beker-icoon">🏆</div>
        <h2>${VOETBAL.bekerTitel}</h2>
        <p>${VOETBAL.bekerTekst}</p>
        <div class="vb-einde-knoppen"><button type="button" class="hoofd">${VOETBAL.bekerKnop}</button></div>
      </div>`;
    this.eindeEl.classList.add('zichtbaar');
    const knop = this.eindeEl.querySelector('button');
    knop.addEventListener('click', () => opSluit());
    knop.focus({ preventScroll: true });
  }

  verbergEinde() { this.eindeEl.classList.remove('zichtbaar'); this.eindeEl.innerHTML = ''; }
  get eindeOpen() { return this.eindeEl.classList.contains('zichtbaar'); }

  weg() { this.el.remove(); }
}
