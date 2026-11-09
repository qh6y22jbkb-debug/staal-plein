import { Minispel, el, kiesWillekeurig, VRAGEN_PER_RONDE } from '../minispellen/basis.js';
import { BIEB_TEKSTEN as T } from '../data/bieb.js';
import { zinnenVoor } from './zinnen.js';

export { zinnenVoor };
import { biebvoortgang } from '../biebvoortgang.js';
import { blokjes, keuzeGoed, antwoordVan, antwoordTekst } from './ontleding.js';
import '../ui/minispellen.css';

/**
 * Het spel van de Bieb: de zin staat er als losse woordblokjes, het kind klikt de goede woorden aan en drukt op Klaar.
 *   🥉 Brons  = korte zinnen, één zinsdeel zoeken
 *   🥈 Zilver = langere zinnen (ook met inversie en meer werkwoorden); bij het lijdend voorwerp soms geen
 *   🥇 Goud   = lange zinnen, meerdere zinsdelen na elkaar (bijv. pv → ow → wg → lv)
 */
export class BiebSpel extends Minispel {
  constructor(opties) {
    super({ ...opties, voortgang: biebvoortgang });
    this.plek = opties.kraam.data;
  }

  niveauTeken(n) { return T.niveauNamen[n - 1] ?? ''; }

  maakVragen() {
    const pool = zinnenVoor(this.plek, this.niveau);
    return kiesWillekeurig(pool, Math.min(VRAGEN_PER_RONDE, pool.length));
  }

  beginRonde(niveau) {
    super.beginRonde(niveau);
    if (this.kiesModus || !this.opdrachtEl) return;
    const stappen = niveau === 3 ? this.plek.goud : [this.plek.zoek];
    this.opdrachtEl.textContent = stappen.length > 1
      ? `Zoek na elkaar: ${stappen.map((s) => T.namen[s]).join(' → ')}.`
      : T.zoek[this.plek.zoek];
  }

  toonVraag(zin) {
    this.zin = zin;
    this.stappen = this.niveau === 3 ? this.plek.goud : [this.plek.zoek];
    this.stapNr = 0;
    this.gemarkeerd = {}; // woordnummer → zinsdeel (van de stappen die al goed zijn)
    this.inhoud.innerHTML = '';
    this.stapEl = el('div', 'ww-stap');
    this.zinEl = el('div', 'bb-zin');
    this.knoppenRij = el('div', 'ww-keuzes bb-knoppen');
    this.inhoud.append(this.stapEl, this.zinEl, this.knoppenRij);
    // Woordblokjes.
    this.blokken = [];
    let nr = 0;
    for (const b of blokjes(zin.zin)) {
      if (!b.woord) { this.zinEl.append(el('span', 'bb-teken', b.tekst)); continue; }
      const knop = el('button', 'bb-woord', b.tekst);
      knop.type = 'button';
      const mijnNr = nr++;
      knop.addEventListener('click', () => this.wissel(mijnNr));
      this.zinEl.append(knop);
      this.blokken.push(knop);
    }
    this.toonStap();
  }

  get soort() { return this.stappen[this.stapNr]; }

  toonStap() {
    this.gekozen = new Set();
    this.fouten = 0;
    this.beantwoord = false;
    const s = this.soort;
    this.stapEl.textContent = this.stappen.length > 1
      ? `${T.stap.replace('{nr}', this.stapNr + 1).replace('{totaal}', this.stappen.length)}: ${T.zoek[s]}`
      : T.zoek[s];
    this.stapEl.dataset.zinsdeel = s;
    this.blokken.forEach((b) => { b.classList.remove('gekozen'); b.disabled = false; });
    this.knoppenRij.innerHTML = '';
    const klaar = el('button', 'ww-keuze bb-klaar', T.klaarKnop);
    klaar.type = 'button';
    klaar.addEventListener('click', () => this.controleer());
    this.knoppenRij.append(klaar);
    // Lijdend voorwerp (vanaf Zilver) en hoofdtelwoord (Goud): soms is er geen.
    if ((s === 'lv' && this.niveau >= 2) || s === 'ht') {
      const geen = el('button', 'ww-keuze bb-geen', s === 'lv' ? T.geenLv : T.geenHt);
      geen.type = 'button';
      geen.addEventListener('click', () => this.controleer(true));
      this.knoppenRij.append(geen);
    }
  }

  wissel(nr) {
    if (this.beantwoord) return;
    if (this.gekozen.has(nr)) this.gekozen.delete(nr); else this.gekozen.add(nr);
    this.blokken[nr].classList.toggle('gekozen', this.gekozen.has(nr));
    this.geluid?.plop?.();
  }

  voorleesTekst() { return this.zin?.zin ?? ''; }

  /** @param geen  true = het kind zegt: deze zin heeft geen lijdend voorwerp. */
  controleer(geen = false) {
    if (this.beantwoord) return;
    const s = this.soort;
    const goedeNrs = antwoordVan(this.zin, s) ?? [];
    let goed;
    if (geen) goed = goedeNrs.length === 0;
    else {
      if (!this.gekozen.size) { this.feedback.className = 'ms-feedback'; this.feedback.innerHTML = `<span>${T.nietsGekozen}</span>`; return; }
      goed = goedeNrs.length > 0 && keuzeGoed(this.zin, s, [...this.gekozen]);
    }
    if (!goed) {
      this.fouten++;
      const antwoord = goedeNrs.length ? antwoordTekst(this.zin, s) : (s === 'lv' ? T.geenLv : T.geenHt).toLowerCase();
      const hulp = this.fouten >= 2 ? `<br>${T.goedeAntwoord.replace('{antwoord}', `<b>${antwoord}</b>`)}` : '';
      this.fout(`${T.tip[s]}${hulp}`);
      return;
    }
    // Goed: de woorden krijgen de kleur van het zinsdeel.
    for (const n of goedeNrs) {
      this.gemarkeerd[n] = s;
      this.blokken[n].classList.add(`zd-${s}`);
    }
    this.blokken.forEach((b) => b.classList.remove('gekozen'));
    if (this.stapNr < this.stappen.length - 1) {
      this.beantwoord = true;
      this.geluid?.plop?.();
      this.feedback.className = 'ms-feedback ms-goed';
      this.feedback.innerHTML = `<span><b>Goed!</b> Op naar de volgende stap.</span>`;
      setTimeout(() => {
        if (!this.venster) return;
        this.feedback.className = 'ms-feedback';
        this.feedback.innerHTML = '';
        this.stapNr++;
        this.toonStap();
      }, 900);
      return;
    }
    this.beantwoord = true;
    this.blokken.forEach((b) => { b.disabled = true; });
    this.knoppenRij.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    const samen = this.stappen.map((st) => {
      const tekst = (antwoordVan(this.zin, st) ?? []).length ? antwoordTekst(this.zin, st) : 'geen';
      return `${T.namen[st]}: <mark>${tekst}</mark>`;
    }).join(' · ');
    this.goed(samen);
  }

  toets(e) {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && !this.beantwoord) {
      e.preventDefault();
      this.controleer();
    }
  }
}
