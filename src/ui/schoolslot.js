import { LEERGROEP } from '../data/rekenen.js';

/**
 * Venster bij de schooldeur: de school is nog in aanbouw, dus eerst het wachtwoord.
 * opJa wordt aangeroepen als het wachtwoord goed is (na het sluiten van het venster).
 */
export class SchoolSlot {
  constructor(laag, { geluid }) {
    this.laag = laag;
    this.geluid = geluid;
    this.el = null;
    this.opSluiten = null;
    this.opJa = null;
    this.toetsen = (e) => {
      if (e.code === 'Escape') { e.preventDefault(); this.sluit(false); }
    };
  }

  get open() { return !!this.el; }

  /** Klopt het wachtwoord? Hoofdletters en spaties ervoor/erachter maken niet uit. */
  static klopt(tekst) {
    return !!LEERGROEP.wachtwoord && String(tekst ?? '').trim().toLowerCase() === LEERGROEP.wachtwoord.toLowerCase();
  }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond';
    this.el.innerHTML = `
      <form class="winkel lees lees-melding school-slot" role="dialog" aria-label="${LEERGROEP.slotTitel}">
        <div class="lees-melding-icoon">🚧</div>
        <h2 class="school-slot-titel">${LEERGROEP.slotTitel}</h2>
        <p class="lees-melding-tekst">${LEERGROEP.slotTekst}</p>
        <input class="school-slot-invoer" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${LEERGROEP.slotPlaatshouder}" aria-label="${LEERGROEP.slotPlaatshouder}">
        <p class="school-slot-fout" aria-live="polite"></p>
        <div class="lees-knoppen">
          <button type="submit" class="lees-volgend">🔓 ${LEERGROEP.slotKnop}</button>
          <button type="button" class="lees-terug" data-terug>${LEERGROEP.slotTerug}</button>
        </div>
      </form>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    const form = this.el.querySelector('form');
    this.invoer = this.el.querySelector('input');
    this.foutEl = this.el.querySelector('.school-slot-fout');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (SchoolSlot.klopt(this.invoer.value)) {
        this.geluid?.klaar?.();
        this.sluit(true);
        return;
      }
      this.geluid?.bijna?.();
      this.foutEl.textContent = LEERGROEP.slotFout;
      this.invoer.select();
      form.classList.remove('ms-wiebel');
      void form.offsetWidth;
      form.classList.add('ms-wiebel');
    });
    this.el.querySelector('[data-terug]').addEventListener('click', () => this.sluit(false));
    // Even wachten, anders telt de E-toets waarmee je hier kwam als eerste letter.
    setTimeout(() => {
      window.addEventListener('keydown', this.toetsen);
      this.invoer?.focus({ preventScroll: true });
    }, 60);
    this.geluid?.plop?.();
  }

  sluit(goed) {
    if (!this.el) return;
    window.removeEventListener('keydown', this.toetsen);
    this.el.remove();
    this.el = null;
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
    if (goed) this.opJa?.();
  }
}
