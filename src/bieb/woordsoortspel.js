import { Minispel, el, kiesWillekeurig, willekeurig, VRAGEN_PER_RONDE } from '../minispellen/basis.js';
import { BIEB_TEKSTEN as T, WOORDSOORTEN, WOORDSOORTEN_MEERVOUD, WOORDSOORT_TIPS } from '../data/bieb.js';
import { biebvoortgang } from '../biebvoortgang.js';
import { ontleedWoordsoorten, nummersVan, woordsoortZinnen, BASIS_SOORTEN, EXTRA_SOORTEN } from './woordsoorten.js';
import '../ui/minispellen.css';

const GOUD_STAPPEN = 3; // bij Goud: drie woorden per zin benoemen

/**
 * Wanda Woordsoort (in de Bieb): de 11 woordsoorten van de klassenkaart.
 *   🥉 Brons  = klik op álle woorden van één woordsoort (lidwoord, zn, bn, werkwoord, voorzetsel, telwoord)
 *   🥈 Zilver = idem, ook hulpwerkwoord, voltooid deelwoord, voegwoord, stoffelijk bn en rangtelwoord
 *   🥇 Goud   = drie woorden lichten na elkaar op: kies zelf de woordsoort (uit alle 11)
 */
export class WoordsoortSpel extends Minispel {
  constructor(opties) {
    super({ ...opties, voortgang: biebvoortgang });
  }

  niveauTeken(n) { return T.niveauNamen[n - 1] ?? ''; }

  maakVragen() {
    const zinnen = kiesWillekeurig(woordsoortZinnen(this.niveau), VRAGEN_PER_RONDE);
    return zinnen.map((z) => {
      const tokens = ontleedWoordsoorten(z.zin);
      const aanwezig = [...new Set(tokens.filter((t) => t.soort).map((t) => t.soort))];
      if (this.niveau === 3) {
        // Drie woorden van verschillende woordsoorten. Eerst de lastige (hulpwerkwoord, voltooid deelwoord …),
        // dan de rest; een lidwoord alleen als er niets anders is (te makkelijk voor Goud).
        const woorden = tokens.filter((t) => t.woord).map((t, i) => ({ ...t, i })).filter((t) => t.soort);
        const volgorde = [
          ...kiesWillekeurig(aanwezig.filter((x) => EXTRA_SOORTEN.includes(x)), 2),
          ...kiesWillekeurig(aanwezig.filter((x) => !EXTRA_SOORTEN.includes(x) && x !== 'lw'), GOUD_STAPPEN),
          ...aanwezig.filter((x) => x === 'lw'),
        ];
        const perSoort = volgorde.slice(0, GOUD_STAPPEN).map((x) => willekeurig(woorden.filter((w) => w.soort === x)));
        return { zin: z, tokens, doelen: perSoort.sort((a, b) => a.i - b.i) };
      }
      // Brons: een basiswoordsoort. Zilver: liefst een van de extra woordsoorten.
      const kies = this.niveau === 1 ? aanwezig.filter((s) => BASIS_SOORTEN.includes(s)) : aanwezig.filter((s) => EXTRA_SOORTEN.includes(s));
      return { zin: z, tokens, soort: willekeurig(kies.length ? kies : aanwezig) };
    });
  }

  beginRonde(niveau) {
    super.beginRonde(niveau);
    if (this.kiesModus || !this.opdrachtEl) return;
    this.opdrachtEl.textContent = niveau === 3 ? 'Welke woordsoort is het woord in het geel? Kies het goede antwoord.' : 'Klik op alle woorden van de woordsoort die gevraagd wordt.';
  }

  toonVraag(v) {
    this.v = v;
    this.stapNr = 0;
    this.inhoud.innerHTML = '';
    this.stapEl = el('div', 'ww-stap');
    this.zinEl = el('div', 'bb-zin');
    this.knoppenRij = el('div', 'ww-keuzes bb-knoppen');
    this.inhoud.append(this.stapEl, this.zinEl, this.knoppenRij);
    this.blokken = [];
    let nr = 0;
    for (const t of v.tokens) {
      if (!t.woord) { this.zinEl.append(el('span', 'bb-teken', t.tekst)); continue; }
      const knop = el('button', 'bb-woord', t.tekst);
      knop.type = 'button';
      const mijnNr = nr++;
      knop.addEventListener('click', () => this.wissel(mijnNr));
      this.zinEl.append(knop);
      this.blokken.push(knop);
    }
    this.toonStap();
  }

  toonStap() {
    this.gekozen = new Set();
    this.fouten = 0;
    this.beantwoord = false;
    this.knoppenRij.innerHTML = '';
    this.blokken.forEach((b) => b.classList.remove('gekozen', 'bb-doel'));
    if (this.niveau === 3) {
      const doel = this.v.doelen[this.stapNr];
      this.stapEl.textContent = `Stap ${this.stapNr + 1} van ${this.v.doelen.length}: welke woordsoort is "${doel.tekst}"?`;
      this.blokken.forEach((b) => { b.disabled = true; });
      this.blokken[doel.i].classList.add('bb-doel');
      this.keuzeKnoppen = Object.entries(WOORDSOORTEN).map(([code, naam]) => {
        const knop = el('button', 'ww-keuze ws-keuze', naam);
        knop.type = 'button';
        knop.addEventListener('click', () => this.kiesSoort(code, knop));
        this.knoppenRij.append(knop);
        return knop;
      });
      return;
    }
    this.stapEl.textContent = `Klik op alle ${WOORDSOORTEN_MEERVOUD[this.v.soort]}.`;
    const klaar = el('button', 'ww-keuze bb-klaar', T.klaarKnop);
    klaar.type = 'button';
    klaar.addEventListener('click', () => this.controleerKlik());
    this.knoppenRij.append(klaar);
  }

  wissel(nr) {
    if (this.beantwoord || this.niveau === 3) return;
    if (this.gekozen.has(nr)) this.gekozen.delete(nr); else this.gekozen.add(nr);
    this.blokken[nr].classList.toggle('gekozen', this.gekozen.has(nr));
    this.geluid?.plop?.();
  }

  voorleesTekst() { return this.v ? this.v.tokens.map((t) => t.tekst).join(' ') : ''; }

  /** Brons en Zilver: zijn precies alle woorden van die woordsoort gekozen? */
  controleerKlik() {
    if (this.beantwoord) return;
    if (!this.gekozen.size) { this.feedback.className = 'ms-feedback'; this.feedback.innerHTML = `<span>${T.nietsGekozen}</span>`; return; }
    const goed = nummersVan(this.v.zin.zin, this.v.soort);
    const keuze = [...this.gekozen].sort((a, b) => a - b);
    if (keuze.length !== goed.length || keuze.some((n, i) => n !== goed[i])) {
      this.fouten++;
      const hulp = this.fouten >= 2 ? `<br>${T.goedeAntwoord.replace('{antwoord}', `<b>${goed.map((n) => this.blokken[n].textContent).join(', ')}</b>`)}` : '';
      this.fout(`${WOORDSOORT_TIPS[this.v.soort]}${hulp}`);
      return;
    }
    this.beantwoord = true;
    this.blokken.forEach((b, i) => { b.disabled = true; b.classList.remove('gekozen'); if (goed.includes(i)) b.classList.add('zd-ow'); });
    this.knoppenRij.querySelectorAll('button').forEach((b) => { b.disabled = true; });
    this.goed(`${WOORDSOORTEN_MEERVOUD[this.v.soort]}: <mark>${goed.map((n) => this.blokken[n].textContent).join(', ')}</mark>`);
  }

  /** Goud: de woordsoort van het gele woord kiezen. */
  kiesSoort(code, knop) {
    if (this.beantwoord) return;
    const doel = this.v.doelen[this.stapNr];
    if (code !== doel.soort) {
      this.fouten++;
      knop.disabled = true;
      knop.classList.add('wiebel');
      const hulp = this.fouten >= 2 ? `<br>${WOORDSOORT_TIPS[doel.soort]}` : '';
      this.fout(`"${doel.tekst}" is geen ${WOORDSOORTEN[code]}.${hulp}`);
      return;
    }
    this.beantwoord = true;
    knop.classList.add('goed');
    this.keuzeKnoppen.forEach((k) => { k.disabled = true; });
    this.blokken[doel.i].classList.remove('bb-doel');
    this.blokken[doel.i].classList.add('zd-ow');
    this.blokken[doel.i].title = WOORDSOORTEN[code];
    if (this.stapNr < this.v.doelen.length - 1) {
      this.geluid?.plop?.();
      this.feedback.className = 'ms-feedback ms-goed';
      this.feedback.innerHTML = `<span><b>Goed!</b> "${doel.tekst}" is een ${WOORDSOORTEN[code]}.</span>`;
      setTimeout(() => {
        if (!this.venster) return;
        this.feedback.className = 'ms-feedback';
        this.feedback.innerHTML = '';
        this.stapNr++;
        this.toonStap();
      }, 900);
      return;
    }
    this.goed(this.v.doelen.map((d) => `${d.tekst}: <mark>${WOORDSOORTEN[d.soort]}</mark>`).join(' · '));
  }

  toets(e) {
    if ((e.code === 'Enter' || e.code === 'NumpadEnter') && !this.beantwoord && this.niveau < 3) {
      e.preventDefault();
      this.controleerKlik();
    }
  }
}
