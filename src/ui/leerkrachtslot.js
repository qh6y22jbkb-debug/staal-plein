import { LEERKRACHT, TEST } from '../data/oefeningen.js';

/*
 * Venster voor de leerkrachtcode. Gaat alleen open met de sneltoets (zie TEST in het databestand),
 * zodat kinderen de code niet zomaar kunnen raden. Na TEST.leerkrachtPogingen foute pogingen is het
 * venster TEST.leerkrachtBlokkeerMinuten minuten geblokkeerd.
 * De blokkade staat in localStorage, maar NIET bij de spelgegevens: "Opnieuw beginnen" heft hem dus niet op.
 */
const SLEUTEL = 'staal-leerkracht-slot';

function lees() {
  try {
    const d = JSON.parse(localStorage.getItem(SLEUTEL));
    const fouten = Number.isInteger(d?.fouten) && d.fouten > 0 ? d.fouten : 0;
    const tot = Number.isFinite(d?.tot) ? d.tot : 0;
    // Een blokkade die (door een verkeerde klok) heel ver in de toekomst ligt, tellen we niet langer dan de normale tijd.
    return { fouten, tot: Math.min(tot, Date.now() + TEST.leerkrachtBlokkeerMinuten * 60000) };
  } catch { return { fouten: 0, tot: 0 }; }
}
function bewaar(staat) {
  try { localStorage.setItem(SLEUTEL, JSON.stringify(staat)); } catch { /* geen opslag */ }
}

/** Hoeveel milliseconden het venster nog geblokkeerd is (0 = niet geblokkeerd). */
export function blokkadeRest() {
  return Math.max(0, lees().tot - Date.now());
}

/** Is dit toetsenbord-event de sneltoets voor de leerkrachtcode? */
export function isLeerkrachtSneltoets(e) {
  const t = TEST.leerkrachtSneltoets;
  if (!t || !TEST.leerkrachtCode) return false;
  return e.code === t.code && !e.repeat && !!e.altKey === !!t.alt && !!e.shiftKey === !!t.shift && (e.ctrlKey || e.metaKey);
}

export class LeerkrachtSlot {
  /** @param opCode(code) → true als de code klopt (en alles is vrijgespeeld). */
  constructor(laag, { geluid, opCode }) {
    this.laag = laag;
    this.geluid = geluid;
    this.opCode = opCode;
    this.el = null;
    this.opSluiten = null;
    this.toetsen = (e) => {
      if (e.code === 'Escape') { e.preventDefault(); this.sluit(); }
    };
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond leerkracht-achtergrond';
    this.el.innerHTML = `
      <form class="winkel lees lees-melding school-slot leerkracht-slot" role="dialog" aria-label="${LEERKRACHT.titel}">
        <div class="lees-melding-icoon">🔑</div>
        <h2 class="school-slot-titel">${LEERKRACHT.titel}</h2>
        <p class="lees-melding-tekst">${LEERKRACHT.uitleg}</p>
        <input class="school-slot-invoer" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${LEERKRACHT.plaatshouder}" aria-label="${LEERKRACHT.plaatshouder}">
        <p class="school-slot-fout" aria-live="polite"></p>
        <div class="lees-knoppen">
          <button type="submit" class="lees-volgend">🔓 ${LEERKRACHT.ok}</button>
          <button type="button" class="lees-terug" data-terug>${LEERKRACHT.sluiten}</button>
        </div>
      </form>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    this.form = this.el.querySelector('form');
    this.invoer = this.el.querySelector('input');
    this.foutEl = this.el.querySelector('.school-slot-fout');
    this.knop = this.el.querySelector('[type=submit]');
    this.invoer.addEventListener('keydown', (e) => { if (e.code !== 'Escape') e.stopPropagation(); }); // niet als spelbesturing tellen
    this.form.addEventListener('submit', (e) => { e.preventDefault(); this.probeer(); });
    this.el.querySelector('[data-terug]').addEventListener('click', () => this.sluit());
    window.addEventListener('keydown', this.toetsen);
    this.werkBlokkadeBij();
    this.klok = setInterval(() => this.werkBlokkadeBij(), 1000);
    if (!blokkadeRest()) this.invoer.focus({ preventScroll: true });
    this.geluid?.plop?.();
  }

  /** Geblokkeerd? Dan kun je niets invullen en zie je hoe lang het nog duurt. */
  werkBlokkadeBij() {
    if (!this.el) return;
    const rest = blokkadeRest();
    const dicht = rest > 0;
    const wasDicht = this.invoer.disabled;
    this.invoer.disabled = this.knop.disabled = dicht;
    if (dicht) {
      const min = Math.ceil(rest / 60000);
      this.foutEl.textContent = LEERKRACHT.geblokkeerd.replace('{tijd}', min === 1 ? '1 minuut' : `${min} minuten`);
    } else if (wasDicht) {
      this.foutEl.textContent = '';
      this.invoer.focus({ preventScroll: true });
    }
  }

  probeer() {
    if (blokkadeRest() > 0) return;
    const code = this.invoer.value;
    this.invoer.value = '';
    if (!code.trim()) return;
    if (this.opCode(code)) {
      bewaar({ fouten: 0, tot: 0 });
      this.sluit();
      return;
    }
    const staat = lees();
    staat.fouten += 1;
    if (staat.fouten >= TEST.leerkrachtPogingen) {
      staat.fouten = 0;
      staat.tot = Date.now() + TEST.leerkrachtBlokkeerMinuten * 60000;
    }
    bewaar(staat);
    this.geluid?.bijna?.();
    this.form.classList.remove('ms-wiebel');
    void this.form.offsetWidth;
    this.form.classList.add('ms-wiebel');
    if (staat.tot > Date.now()) { this.werkBlokkadeBij(); return; }
    const nog = TEST.leerkrachtPogingen - staat.fouten;
    this.foutEl.textContent = LEERKRACHT.fout.replace('{nog}', nog === 1 ? 'nog 1 poging' : `nog ${nog} pogingen`);
    this.invoer.focus({ preventScroll: true });
  }

  sluit() {
    if (!this.el) return;
    clearInterval(this.klok);
    window.removeEventListener('keydown', this.toetsen);
    this.el.remove();
    this.el = null;
    // Op het startscherm hoort venster-open niet te blijven staan; elders zet opSluiten het spel weer aan.
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
  }
}
