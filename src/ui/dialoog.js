import { TEKSTEN } from '../data/oefeningen.js';

/** Maakt van **tekst** een gekleurd stukje. De teksten komen uit ons eigen databestand. */
function opmaak(tekst) {
  return tekst.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>');
}

/**
 * Het gespreksvenster met een karakter.
 * Knoppen: "Leg het nog eens uit", "Ik wil spelen!" en "Doei!".
 */
export class Dialoog {
  constructor(laag, { voorlezen, geluid } = {}) {
    this.voorlezen = voorlezen;
    this.geluid = geluid;
    this.el = document.createElement('div');
    this.el.className = 'dialoog';
    this.el.setAttribute('role', 'dialog');
    this.el.innerHTML = `
      <div class="dialoog-kop">
        <span class="dialoog-icoon"></span>
        <span class="dialoog-naam"></span>
      </div>
      <button type="button" class="dialoog-luidspreker"></button>
      <div class="dialoog-tekst" aria-live="polite"></div>
      <div class="dialoog-knoppen">
        <button type="button" data-knop="uitleg"><span class="sneltoets">1</span>${TEKSTEN.knopUitleg}</button>
        <button type="button" data-knop="spelen" class="knop-spelen"><span class="sneltoets">2</span>${TEKSTEN.knopSpelen}</button>
        <button type="button" data-knop="doei" class="knop-doei"><span class="sneltoets">3</span>${TEKSTEN.knopDoei}</button>
      </div>`;
    laag.appendChild(this.el);
    this.icoon = this.el.querySelector('.dialoog-icoon');
    this.naam = this.el.querySelector('.dialoog-naam');
    this.tekst = this.el.querySelector('.dialoog-tekst');
    this.knopUitleg = this.el.querySelector('[data-knop="uitleg"]');
    this.luidspreker = this.el.querySelector('.dialoog-luidspreker');
    this.luidspreker.addEventListener('click', (e) => {
      e.stopPropagation();
      this.voorlezen.aan = !this.voorlezen.aan;
      this.zetLuidspreker();
      if (this.voorlezen.aan) this.leesVoor();
      this.opInstelling?.();
    });
    if (!voorlezen?.beschikbaar) this.luidspreker.hidden = true;

    this.open = false;
    this.kraam = null;
    this.pagina = -1; // -1 = begroeting, 0.. = uitlegpagina's

    this.el.addEventListener('click', (e) => {
      const knop = e.target.closest('button[data-knop]');
      if (knop) this.kies(knop.dataset.knop);
    });
    window.addEventListener('keydown', (e) => {
      if (!this.open) return;
      const keuze = { Digit1: 'uitleg', Numpad1: 'uitleg', Digit2: 'spelen', Numpad2: 'spelen', Digit3: 'doei', Numpad3: 'doei', Escape: 'doei' }[e.code];
      if (keuze) {
        e.preventDefault();
        this.kies(keuze);
      }
    });
  }

  /** @param kraam  een kraam uit bouwKramen()
   *  @param acties { opSpelen(kraam), opSluiten() } */
  toon(kraam, acties) {
    this.kraam = kraam;
    this.acties = acties;
    this.open = true;
    this.el.style.setProperty('--kraamkleur', kraam.stijl.bord);
    this.icoon.textContent = kraam.data.icoon;
    this.pagina = -1;
    this.zetTekst(kraam.data.karakterNaam, opmaak(kraam.data.begroeting));
    this.knopUitleg.lastChild.textContent = TEKSTEN.knopUitleg;
    this.el.classList.add('zichtbaar');
    this.zetLuidspreker();
    this.geluid?.plop();
    this.zetPraten(true);
    this.knopUitleg.focus({ preventScroll: true });
  }

  sluit() {
    if (!this.open) return;
    this.open = false;
    this.voorlezen?.stop();
    this.zetPraten(false);
    this.el.classList.remove('zichtbaar');
    this.acties?.opSluiten?.();
  }

  kies(keuze) {
    if (!this.open) return;
    if (keuze === 'uitleg') this.volgendeUitleg();
    else if (keuze === 'spelen') this.acties?.opSpelen?.(this.kraam, this);
    else if (keuze === 'doei') this.sluit();
  }

  volgendeUitleg() {
    const uitleg = this.kraam.data.uitleg;
    this.pagina = (this.pagina + 1) % uitleg.length;
    const p = uitleg[this.pagina];
    const naam = p.spreker ?? this.kraam.data.karakterNaam;
    this.spreker = p.spreker;
    this.zetTekst(naam, `<p>${opmaak(p.tekst)}</p>${p.voorbeeld ? `<div class="voorbeeld">${opmaak(p.voorbeeld)}</div>` : ''}`);
    // Is er nog een pagina? Dan wordt de knop "Verder".
    const meer = this.pagina < uitleg.length - 1;
    this.knopUitleg.lastChild.textContent = meer ? TEKSTEN.knopVerder : TEKSTEN.knopUitleg;
    this.zetPraten(true);
  }

  /** Korte mededeling van het karakter (bijv. "spel komt eraan"). */
  zeg(tekst) {
    this.zetTekst(this.kraam.data.karakterNaam, opmaak(tekst));
    this.zetPraten(true);
  }

  zetTekst(naam, html) {
    if (naam === this.kraam.data.karakterNaam) this.spreker = null;
    this.naam.textContent = naam;
    this.tekst.innerHTML = html;
    this.tekst.classList.remove('nieuw');
    void this.tekst.offsetWidth; // animatie opnieuw starten
    this.tekst.classList.add('nieuw');
  }

  zetLuidspreker() {
    const aan = this.voorlezen?.aan;
    this.luidspreker.textContent = aan ? '🔊' : '🔈';
    this.luidspreker.title = aan ? 'Voorlezen staat aan (klik om uit te zetten)' : 'Voorlezen staat uit (klik om aan te zetten)';
    this.luidspreker.setAttribute('aria-pressed', !!aan);
    this.luidspreker.classList.toggle('uit', !aan);
  }

  /** Toonhoogte van de stem: elk karakter klinkt een beetje anders. */
  toonhoogte() {
    const stemmen = this.kraam.stijl.stemmen ?? {};
    return stemmen[this.spreker] ?? this.kraam.stijl.stem ?? 1;
  }

  leesVoor() {
    if (!this.open || !this.voorlezen?.aan) return null;
    return this.voorlezen.zeg(this.tekst.innerHTML, { toonhoogte: this.toonhoogte() });
  }

  /** Mond beweegt zolang er voorgelezen wordt (of een paar seconden als voorlezen uit staat). */
  zetPraten(aan) {
    clearTimeout(this.praatTimer);
    for (const k of this.kraam?.karakters ?? []) k.praat = aan;
    if (!aan) return;
    const nummer = (this.praatNummer = (this.praatNummer ?? 0) + 1);
    const spraak = this.leesVoor();
    if (spraak) {
      spraak.then(() => { if (nummer === this.praatNummer) this.zetPraten(false); });
      this.praatTimer = setTimeout(() => this.zetPraten(false), 20000); // vangnet
    } else {
      const duur = Math.min(6000, 600 + this.tekst.textContent.length * 45);
      this.praatTimer = setTimeout(() => this.zetPraten(false), duur);
    }
  }
}
