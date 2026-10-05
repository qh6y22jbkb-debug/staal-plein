import { TEKSTEN } from '../data/oefeningen.js';

/**
 * Vaste schermelementen: titel, knoppen rechtsboven (voorlezen, geluid, opnieuw, hulp),
 * de hulpkaart en het tekstwolkje onderin.
 */
export class Hud {
  constructor(laag, isTouch, { voorlezen, geluid }) {
    this.voorlezen = voorlezen;
    this.geluid = geluid;
    laag.insertAdjacentHTML('beforeend', `
      <div class="titel">Schoolplein De Bunders</div>
      <div class="hud-rechts">
        <div class="hud-knoppen">
          <button type="button" class="rond" data-knop="voorlezen"></button>
          <button type="button" class="rond" data-knop="geluid"></button>
          <button type="button" class="rond" data-knop="opnieuw" title="${TEKSTEN.opnieuwKnop}" aria-label="${TEKSTEN.opnieuwKnop}">↺</button>
          <button type="button" class="rond" data-knop="hulp" title="Hulp" aria-label="Hulp">?</button>
        </div>
        <div class="hulp">
          <h2>Zo speel je</h2>
          <ul>
            ${isTouch
              ? '<li>🕹️ Lopen en draaien: <b>joystick</b></li>'
              : '<li>🚶 Lopen: <b>↑</b> of <b>W</b> (terug: <b>↓</b>)</li><li>↪️ Draaien: <b>← →</b> of <b>A D</b></li>'}
            <li>⬆️ Springen: <b>${isTouch ? 'Spring-knop' : 'spatie'}</b></li>
            <li>💬 Praten: <b>${isTouch ? 'tik op het wolkje' : 'E'}</b></li>
            <li>👆 ${isTouch ? 'Tik' : 'Klik'} op de grond: loop erheen</li>
          </ul>
        </div>
      </div>
      <div class="wolkje"></div>
    `);
    this.hulp = laag.querySelector('.hulp');
    this.wolkje = laag.querySelector('.wolkje');
    this.knopVoorlezen = laag.querySelector('[data-knop="voorlezen"]');
    this.knopGeluid = laag.querySelector('[data-knop="geluid"]');
    this.opWolkjeKlik = null;
    this.opOpnieuw = null;
    this.wolkje.setAttribute('role', 'button');
    this.wolkje.addEventListener('click', () => this.opWolkjeKlik?.());

    // Hulpkaart staat open bij de start en gaat vanzelf dicht na 25 seconden.
    this.hulpTimer = setTimeout(() => this.hulp.classList.add('dicht'), 25000);

    laag.querySelector('.hud-knoppen').addEventListener('click', (e) => {
      const knop = e.target.closest('button');
      if (!knop) return;
      switch (knop.dataset.knop) {
        case 'voorlezen':
          this.voorlezen.aan = !this.voorlezen.aan;
          if (this.voorlezen.aan) this.voorlezen.zeg('Voorlezen staat aan.');
          break;
        case 'geluid':
          this.geluid.aan = !this.geluid.aan;
          this.geluid.plop();
          break;
        case 'opnieuw':
          this.vraagOpnieuw(laag);
          break;
        case 'hulp':
          clearTimeout(this.hulpTimer);
          this.hulp.classList.toggle('dicht');
          break;
        default:
      }
      this.zetKnoppen();
      knop.blur(); // anders vangt de knop de spatiebalk
    });
    if (!this.voorlezen.beschikbaar) this.knopVoorlezen.hidden = true;
    this.zetKnoppen();
  }

  zetKnoppen() {
    const v = this.voorlezen.aan;
    this.knopVoorlezen.textContent = v ? '🗣️' : '🤐';
    this.knopVoorlezen.title = v ? TEKSTEN.voorlezenAan : TEKSTEN.voorlezenUit;
    this.knopVoorlezen.setAttribute('aria-pressed', v);
    this.knopVoorlezen.classList.toggle('uit', !v);
    const g = this.geluid.aan;
    this.knopGeluid.textContent = g ? '🔊' : '🔇';
    this.knopGeluid.title = g ? TEKSTEN.geluidAan : TEKSTEN.geluidUit;
    this.knopGeluid.setAttribute('aria-pressed', g);
    this.knopGeluid.classList.toggle('uit', !g);
  }

  /** Vraagt eerst of je het echt zeker weet. */
  vraagOpnieuw(laag) {
    const el = document.createElement('div');
    el.className = 'bevestig-achtergrond';
    el.innerHTML = `
      <div class="bevestig" role="alertdialog">
        <p>${TEKSTEN.opnieuwVraag}</p>
        <div>
          <button type="button" class="nee">${TEKSTEN.opnieuwNee}</button>
          <button type="button" class="ja">${TEKSTEN.opnieuwJa}</button>
        </div>
      </div>`;
    laag.appendChild(el);
    document.body.classList.add('bevestig-open');
    const sluit = () => { el.remove(); document.body.classList.remove('bevestig-open'); };
    el.querySelector('.nee').addEventListener('click', sluit);
    el.querySelector('.ja').addEventListener('click', () => { sluit(); this.opOpnieuw?.(); });
    el.querySelector('.nee').focus();
  }

  toonWolkje(tekst) {
    if (tekst === this.wolkjeTekst) return;
    this.wolkjeTekst = tekst;
    if (tekst) {
      this.wolkje.textContent = tekst;
      this.wolkje.classList.add('zichtbaar');
    } else {
      this.wolkje.classList.remove('zichtbaar');
    }
  }
}
