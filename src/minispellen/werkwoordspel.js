import { Minispel, el, opmaak } from './basis.js';
import { WERKWOORD_NIVEAUS } from '../data/werkwoorden.js';

import { schoonAntwoord, goedeAntwoorden, isGoed, delenVan } from './werkwoordcontrole.js';

export { schoonAntwoord, goedeAntwoorden, isGoed, delenVan };

const GAT = '___';

/**
 * Het minispel van de Werkwoordenwereld. Werkt voor alle vijf de kramen:
 * Brons = kiezen uit 2, Zilver = typen, Goud = in stappen (zie src/data/werkwoorden.js).
 */
export class WerkwoordSpel extends Minispel {
  niveauTeken(n) { return WERKWOORD_NIVEAUS[n - 1] ?? ''; }

  beginRonde(niveau) {
    super.beginRonde(niveau);
    // Alleen als de ronde echt begonnen is (een niveau op slot opent geen ronde).
    if (!this.kiesModus && this.niveau === 3 && this.data.opdrachtGoud && this.opdrachtEl) this.opdrachtEl.textContent = this.data.opdrachtGoud;
  }

  toonVraag(v) {
    this.vraag = v;
    this.delen = delenVan(v);
    this.deelNr = 0;
    this.ingevuld = []; // antwoorden van de delen die al goed zijn
    this.fouten = 0;
    this.toonDeel();
  }

  /** De zin van een deel: een eigen zin, of de zin van de vraag (met de gaten die al ingevuld zijn). */
  zinVan(nr) {
    const deel = this.delen[nr];
    if (deel.zin) return { zin: deel.zin, eigen: true };
    return { zin: this.vraag.zin, eigen: false };
  }

  /** Welk gat in de zin van de vraag hoort bij dit deel? (alleen delen zonder eigen zin tellen mee) */
  gatNummer(nr) {
    let n = 0;
    for (let i = 0; i < nr; i++) if (!this.delen[i].zin) n++;
    return n;
  }

  /** HTML van de zin: ingevulde gaten in kleur, het huidige gat als vakje. */
  zinHtml(nr, { klaar = false } = {}) {
    const { zin, eigen } = this.zinVan(nr);
    const tekst = opmaak(zin);
    if (!tekst.includes(GAT)) return tekst;
    // Antwoorden van eerdere delen die in déze zin horen.
    const eerder = eigen ? [] : this.delen.map((d, i) => (!d.zin && i < nr ? this.ingevuld[i] : null)).filter((x) => x != null);
    const huidig = eigen ? 0 : this.gatNummer(nr);
    let i = 0;
    // Staat het gat vooraan in de zin? Dan begint het woord met een hoofdletter (Wees stil!).
    const netjes = (woord, j, html) => (j === 1 && !html.trim() ? String(woord).charAt(0).toUpperCase() + String(woord).slice(1) : woord);
    return tekst.split(GAT).reduce((html, stuk, j) => {
      if (j === 0) return stuk;
      const gat = i++;
      let vak;
      if (gat < huidig) vak = `<mark>${netjes(eerder[gat] ?? '', j, html)}</mark>`;
      else if (gat === huidig) vak = klaar ? `<mark>${netjes(this.ingevuld[nr], j, html)}</mark>` : '<span class="ww-gat">?</span>';
      else vak = '<span class="ww-gat leeg">…</span>';
      return `${html}${vak}${stuk}`;
    }, '');
  }

  toonDeel() {
    const deel = this.delen[this.deelNr];
    this.inhoud.innerHTML = '';
    this.beantwoord = false;
    this.knoppen = [];
    this.invoer = null;
    if (this.delen.length > 1) {
      this.inhoud.append(el('div', 'ww-stap', `Stap ${this.deelNr + 1} van ${this.delen.length}`));
    }
    const { zin } = this.zinVan(this.deelNr);
    const metWerkwoord = this.vraag.ww && zin.includes(GAT);
    this.zinEl = el('div', 'ww-zin', `${this.zinHtml(this.deelNr)}${metWerkwoord ? ` <span class="ww-hele">(${this.vraag.ww})</span>` : ''}`);
    this.inhoud.append(this.zinEl);

    if (deel.kies) {
      const rij = el('div', 'ww-keuzes');
      this.knoppen = deel.kies.map((keuze, i) => {
        const knop = el('button', 'ww-keuze', `<span class="sneltoets">${i + 1}</span>${keuze}`);
        knop.type = 'button';
        knop.addEventListener('click', () => this.controleer(keuze, knop));
        rij.appendChild(knop);
        return knop;
      });
      this.inhoud.appendChild(rij);
      return;
    }
    this.invoer = this.maakInvoer((tekst) => this.controleer(tekst, this.invoer.invoer), true);
    this.inhoud.appendChild(this.invoer.rij);
  }

  voorleesTekst() {
    if (!this.vraag) return '';
    const { zin } = this.zinVan(this.deelNr ?? 0);
    return zin.replace(/\*\*/g, '').replace(/_{3}/g, ' … ') + (this.vraag.ww ? ` (${this.vraag.ww})` : '');
  }

  controleer(antwoord, bron) {
    if (this.beantwoord) return;
    const deel = this.delen[this.deelNr];
    if (!isGoed(deel, antwoord)) {
      this.fouten++;
      if (bron) {
        bron.classList.remove('wiebel');
        void bron.offsetWidth;
        bron.classList.add('wiebel');
      }
      if (bron?.classList.contains('ww-keuze')) bron.disabled = true; // dit was het niet: wegstrepen
      const tip = opmaak(deel.tip ?? this.vraag.tip ?? this.data.tips?.[this.niveau - 1] ?? '');
      // Na twee keer fout: het goede antwoord laten zien, zodat niemand vast blijft zitten.
      const hulp = this.fouten >= 2 && !deel.kies ? `<br>Het goede antwoord is: <b>${goedeAntwoorden(deel)[0]}</b>` : '';
      this.fout(`${tip}${hulp}`);
      return;
    }
    // Goed! Het antwoord zoals het in de data staat (met de goede hoofdletter).
    const netjes = goedeAntwoorden(deel).find((g) => schoonAntwoord(g) === schoonAntwoord(antwoord)) ?? goedeAntwoorden(deel)[0];
    this.ingevuld[this.deelNr] = netjes;
    this.beantwoord = true;
    for (const k of this.knoppen) k.disabled = true;
    if (this.invoer) { this.invoer.invoer.disabled = true; this.invoer.knop.disabled = true; }
    bron?.classList?.add('goed');
    this.zinEl.innerHTML = this.zinHtml(this.deelNr, { klaar: true });

    if (this.deelNr < this.delen.length - 1) {
      // Volgende stap van deze vraag (geen munten tussendoor).
      this.geluid?.plop?.();
      this.feedback.className = 'ms-feedback ms-goed';
      this.feedback.innerHTML = `<span><b>Goed!</b> Op naar de volgende stap.</span>`;
      setTimeout(() => {
        if (!this.venster) return;
        this.feedback.className = 'ms-feedback';
        this.feedback.innerHTML = '';
        this.deelNr++;
        this.fouten = 0;
        this.toonDeel();
      }, 900);
      return;
    }
    this.goed(this.uitlegNaGoed());
  }

  /** Wat er na een goed antwoord staat: de hele zin ingevuld, of de eigen uitleg van de vraag. */
  uitlegNaGoed() {
    if (this.vraag.uitleg) return this.vraag.uitleg;
    const laatste = this.delen.length - 1;
    if (this.delen[laatste].zin) return '';
    return this.zinHtml(laatste, { klaar: true }).replace(/<span class="ww-gat[^"]*">[^<]*<\/span>/g, '');
  }

  toets(e) {
    if (!this.knoppen.length || this.beantwoord) return;
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.knoppen.length && !this.knoppen[i].disabled) this.knoppen[i].click();
  }
}
