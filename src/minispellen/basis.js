import { SPEL_TEKSTEN } from '../data/oefeningen.js';
import { confetti } from '../ui/confetti.js';
import { voortgang } from '../voortgang.js';

export const VRAGEN_PER_RONDE = 8;

/** Kiest n willekeurige elementen uit een lijst (zonder dubbele). */
export function kiesWillekeurig(lijst, n) {
  const kopie = [...lijst];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie.slice(0, n);
}

export function willekeurig(lijst) {
  return lijst[Math.floor(Math.random() * lijst.length)];
}

export function sterren(n) {
  return '★'.repeat(n) + '☆'.repeat(3 - n);
}

/**
 * 8 vragen tot en met een niveau. Bij 2 of 3 sterren komt ongeveer 5/8 van het gekozen
 * niveau zelf en de rest van de makkelijkere niveaus.
 */
export function kiesOpNiveau(vragen, niveau) {
  const pool = vragen.filter((v) => (v.niveau ?? 1) <= niveau);
  const precies = pool.filter((v) => (v.niveau ?? 1) === niveau);
  const aantalPrecies = niveau === 1 ? VRAGEN_PER_RONDE : Math.min(precies.length, 5);
  const gekozen = kiesWillekeurig(precies, aantalPrecies);
  const rest = kiesWillekeurig(pool.filter((v) => !gekozen.includes(v)), VRAGEN_PER_RONDE - gekozen.length);
  return kiesWillekeurig([...gekozen, ...rest], VRAGEN_PER_RONDE);
}

/** Maakt van **tekst** een gekleurd stukje. */
export function opmaak(tekst) {
  return tekst.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>');
}

/** Maakt een element met klasse en (optioneel) inhoud. */
export function el(tag, klasse, html) {
  const e = document.createElement(tag);
  if (klasse) e.className = klasse;
  if (html != null) e.innerHTML = html;
  return e;
}

/**
 * Basis voor alle minispellen: het venster, de voortgangsbolletjes,
 * vriendelijke hints bij een fout en confetti bij een goed antwoord.
 *
 * Een spel maakt een subklasse en vult in:
 *   maakVragen()        → lijst met vragen voor deze ronde
 *   toonVraag(vraag)    → zet de vraag in this.inhoud
 *   toets(e)            → (optioneel) toetsenbord
 */
export class Minispel {
  constructor({ laag, kraam, data, opKlaar, opSluiten, geluid, voorlezen }) {
    this.voorlezen = voorlezen;
    this.laag = laag;
    this.kraam = kraam;
    this.data = data;
    this.opKlaar = opKlaar;
    this.opSluiten = opSluiten;
    this.geluid = geluid;
    this.toetsLuisteraar = (e) => this.verwerkToets(e);
  }

  /** Opent het spel met eerst het niveaukeuzescherm. */
  start() {
    window.addEventListener('keydown', this.toetsLuisteraar);
    this.toonNiveauKeuze();
  }

  /** Hoogste niveau dat open is: eerst 1 ster, dan 2, dan 3. */
  get hoogsteOpen() {
    return Math.min(3, voortgang.niveau(this.kraam.data.id) + 1);
  }

  toonNiveauKeuze() {
    this.kiesModus = true;
    this.wachtOpVolgende = false;
    const open = this.hoogsteOpen;
    let vorige = open;
    try { vorige = Number(localStorage.getItem(`staal-niveau-${this.kraam.data.id}`)) || open; } catch { /* geen opslag */ }
    vorige = Math.min(vorige, open);
    this.bouwVenster(false);
    this.opdrachtEl.textContent = SPEL_TEKSTEN.kiesNiveau;
    const rij = el('div', 'ms-niveaus');
    this.niveauKnoppen = [1, 2, 3].map((n) => {
      const opSlot = n > open;
      const tekst = opSlot
        ? SPEL_TEKSTEN.niveauOpSlot.replace('{sterren}', sterren(n - 1))
        : this.data.niveaus?.[n - 1] ?? '';
      const knop = el('button', `ms-niveau${n === vorige ? ' vorige' : ''}${opSlot ? ' op-slot' : ''}`, `
        <span class="ms-sterren">${sterren(n)}</span>
        <span class="ms-niveau-tekst">${tekst}</span>
        ${opSlot ? '<span class="ms-slot" aria-hidden="true">🔒</span>' : `<span class="sneltoets">${n}</span>`}`);
      knop.type = 'button';
      knop.disabled = opSlot;
      if (opSlot) knop.setAttribute('aria-label', `${n} sterren: ${tekst}`);
      knop.addEventListener('click', () => this.beginRonde(n));
      rij.appendChild(knop);
      return knop;
    });
    this.inhoud.appendChild(rij);
    this.niveauKnoppen[vorige - 1].focus({ preventScroll: true });
  }

  beginRonde(niveau) {
    if (niveau > this.hoogsteOpen) return; // nog op slot
    this.kiesModus = false;
    this.niveau = niveau;
    try { localStorage.setItem(`staal-niveau-${this.kraam.data.id}`, niveau); } catch { /* geen opslag */ }
    this.nr = 0;
    this.inEenKeer = 0;
    this.foutDezeVraag = false;
    this.wachtOpVolgende = false;
    this.vragen = this.maakVragen();
    this.bouwVenster(true);
    this.volgendeVraag();
  }

  /** Standaard: 8 vragen tot en met het gekozen niveau, met de nadruk op het gekozen niveau zelf. */
  maakVragen() {
    return kiesOpNiveau(this.data.vragen, this.niveau);
  }

  bouwVenster(metVoortgang) {
    this.venster?.remove();
    this.venster = el('div', 'minispel');
    this.venster.style.setProperty('--kraamkleur', this.kraam.stijl.bord);
    this.venster.innerHTML = `
      <div class="ms-kaart ms-${this.kraam.data.id}">
        <header class="ms-kop">
          <span class="ms-icoon">${this.kraam.data.icoon}</span>
          <h2>${this.data.titel}${metVoortgang ? ` <span class="ms-kop-sterren">${sterren(this.niveau)}</span>` : ''}</h2>
          ${this.voorlezen?.beschikbaar ? '<button type="button" class="ms-lees" title="Lees voor" aria-label="Lees voor">🔊</button>' : ''}
          <button type="button" class="ms-stop">✕ ${SPEL_TEKSTEN.stoppen}</button>
        </header>
        <div class="ms-voortgang">${metVoortgang ? '<span></span>'.repeat(VRAGEN_PER_RONDE) : ''}</div>
        <p class="ms-opdracht">${this.data.opdracht}</p>
        <div class="ms-inhoud"></div>
        <div class="ms-feedback" aria-live="polite"></div>
      </div>`;
    this.laag.appendChild(this.venster);
    this.kaart = this.venster.querySelector('.ms-kaart');
    this.inhoud = this.venster.querySelector('.ms-inhoud');
    this.feedback = this.venster.querySelector('.ms-feedback');
    this.opdrachtEl = this.venster.querySelector('.ms-opdracht');
    this.bolletjes = [...this.venster.querySelectorAll('.ms-voortgang span')];
    this.venster.querySelector('.ms-stop').addEventListener('click', () => this.sluit());
    this.venster.querySelector('.ms-lees')?.addEventListener('click', () => this.leesVraagVoor(true));
  }

  volgendeVraag() {
    if (this.nr >= VRAGEN_PER_RONDE) {
      this.klaar();
      return;
    }
    this.foutDezeVraag = false;
    this.wachtOpVolgende = false;
    this.feedback.className = 'ms-feedback';
    this.feedback.innerHTML = '';
    this.bolletjes.forEach((b, i) => b.classList.toggle('nu', i === this.nr));
    this.inhoud.innerHTML = '';
    this.toonVraag(this.vragen[this.nr], this.nr);
    // Eerste vraag: opdracht + vraag voorlezen. Daarna alleen de vraag.
    if (this.nr === 0) this.leesVraagVoor();
    else if (this.voorleesTekst()) this.voorlezen?.zeg(this.voorleesTekst());
  }

  /** Wat er voorgelezen wordt bij een vraag. Spellen kunnen dit aanpassen. */
  voorleesTekst() {
    return '';
  }

  /** Leest de opdracht en de vraag voor (de luidsprekerknop werkt ook als voorlezen uit staat). */
  leesVraagVoor(altijd = false) {
    const tekst = this.kiesModus ? SPEL_TEKSTEN.kiesNiveau : `${this.opdrachtEl.textContent} ${this.voorleesTekst()}`;
    this.voorlezen?.zeg(tekst, { altijd });
  }

  /** Goed antwoord: confetti, geluidje, korte uitleg en een knop "Volgende". */
  goed(uitlegHtml = '', { automatisch = false } = {}) {
    if (!this.foutDezeVraag) this.inEenKeer++;
    this.bolletjes[this.nr].classList.add('goed');
    this.bolletjes[this.nr].classList.remove('nu');
    this.nr++;
    this.geluid?.goed();
    confetti(automatisch ? 40 : 90);
    this.feedback.className = 'ms-feedback ms-goed';
    this.feedback.innerHTML = `<span><b>${willekeurig(SPEL_TEKSTEN.goed)}</b> ${uitlegHtml}</span>`;
    if (!automatisch) this.voorlezen?.zeg(this.feedback.querySelector('b').textContent);
    if (automatisch) return;
    const knop = el('button', 'ms-volgende', this.nr >= VRAGEN_PER_RONDE ? 'Klaar! ▶' : 'Volgende ▶');
    knop.type = 'button';
    knop.addEventListener('click', () => this.volgendeVraag());
    this.feedback.appendChild(knop);
    this.wachtOpVolgende = true;
    knop.focus({ preventScroll: true });
  }

  /** Fout antwoord: nooit straffen, wel een vriendelijke hint. Daarna nog een poging. */
  fout(hintHtml) {
    this.foutDezeVraag = true;
    this.geluid?.bijna();
    this.feedback.className = 'ms-feedback ms-bijna';
    void this.feedback.offsetWidth;
    this.feedback.classList.add('ms-wiebel');
    this.feedback.innerHTML = `<span><b>${SPEL_TEKSTEN.bijna}</b> ${hintHtml}</span>`;
    this.voorlezen?.zeg(this.feedback.innerHTML.replace(/<s>.*?<\/s>/g, 'dat woord'));
  }

  klaar() {
    this.wachtOpVolgende = false;
    this.geluid?.klaar();
    this.voorlezen?.zeg(SPEL_TEKSTEN.klaarTitel);
    confetti(160);
    const tekst = (this.data.klaarTekst ?? SPEL_TEKSTEN.klaarTekst).replace('{aantal}', this.inEenKeer);
    this.kaart.querySelector('.ms-opdracht')?.remove();
    this.inhoud.innerHTML = `
      <div class="ms-klaar">
        <div class="ms-klaar-icoon">${this.kraam.data.icoon}</div>
        <h3>${SPEL_TEKSTEN.klaarTitel}</h3>
        <p>${tekst}</p>
        <div class="ms-klaar-knoppen">
          <button type="button" class="ms-opnieuw">↻ ${SPEL_TEKSTEN.opnieuw}</button>
          <button type="button" class="ms-ander">${sterren(this.niveau)} ${SPEL_TEKSTEN.anderNiveau}</button>
          <button type="button" class="ms-terug">${SPEL_TEKSTEN.terug} ▶</button>
        </div>
      </div>`;
    this.feedback.className = 'ms-feedback';
    this.feedback.innerHTML = '';
    this.inhoud.querySelector('.ms-opnieuw').addEventListener('click', () => this.opnieuw());
    this.inhoud.querySelector('.ms-ander').addEventListener('click', () => { this.stopSpel?.(); this.toonNiveauKeuze(); });
    const terug = this.inhoud.querySelector('.ms-terug');
    terug.addEventListener('click', () => this.sluit());
    terug.focus({ preventScroll: true });
    const openVoor = this.hoogsteOpen;
    let extra = this.opKlaar?.(this.kraam, { niveau: this.niveau, inEenKeer: this.inEenKeer }) ?? '';
    if (this.hoogsteOpen > openVoor) {
      extra = `${SPEL_TEKSTEN.niveauVrij.replace('{sterren}', sterren(this.hoogsteOpen))}${extra ? `<br>${extra}` : ''}`;
    }
    if (extra) this.inhoud.querySelector('.ms-klaar p').insertAdjacentHTML('afterend', `<p class="ms-stempel-bericht">${extra}</p>`);
  }

  opnieuw() {
    this.stopSpel?.();
    this.beginRonde(this.niveau);
  }

  sluit() {
    this.voorlezen?.stop();
    this.stopSpel?.();
    window.removeEventListener('keydown', this.toetsLuisteraar);
    this.venster?.remove();
    this.venster = null;
    this.opSluiten?.();
  }

  verwerkToets(e) {
    if (e.code === 'Escape') {
      e.preventDefault();
      this.sluit();
      return;
    }
    if (this.kiesModus) {
      const n = Minispel.cijfer(e);
      if (n >= 0 && n < 3) this.niveauKnoppen[n].click();
      return;
    }
    if (this.wachtOpVolgende && (e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter')) {
      e.preventDefault();
      this.volgendeVraag();
      return;
    }
    if (e.target?.tagName === 'INPUT') return; // tijdens het typen geen sneltoetsen
    this.toets?.(e);
  }

  /** Invoerveld met knop "Controleer" (voor de 3-sterrenniveaus). */
  maakInvoer(opControleer, breed = false) {
    const rij = el('form', 'ms-invoer-rij');
    const invoer = el('input', `ms-invoer${breed ? ' breed' : ''}`);
    Object.assign(invoer, { type: 'text', autocomplete: 'off', spellcheck: false, placeholder: SPEL_TEKSTEN.typHier });
    invoer.setAttribute('autocapitalize', 'off');
    invoer.setAttribute('autocorrect', 'off');
    const knop = el('button', 'ms-controleer', `${SPEL_TEKSTEN.controleer} ✓`);
    knop.type = 'submit';
    rij.append(invoer, knop);
    rij.addEventListener('submit', (e) => {
      e.preventDefault();
      const waarde = invoer.value.trim().toLowerCase().replace(/^-/, '');
      if (waarde) opControleer(waarde);
      if (!invoer.disabled) invoer.focus();
    });
    setTimeout(() => invoer.focus({ preventScroll: true }), 50);
    return { rij, invoer, knop };
  }

  /** Toets 1, 2, 3, 4 → index 0..3 (of -1). */
  static cijfer(e) {
    const m = /^(?:Digit|Numpad)([1-9])$/.exec(e.code);
    return m ? Number(m[1]) - 1 : -1;
  }
}
