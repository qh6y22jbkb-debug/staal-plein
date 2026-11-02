import { Minispel, el, kiesWillekeurig, VRAGEN_PER_RONDE } from '../minispellen/basis.js';
import { SPELLING_TEKSTEN as T, SPELLING_LOKALEN } from '../data/spelling.js';
import { spellingvoortgang } from '../spellingvoortgang.js';
import { woordenVan, gatGoed, woordGoed, zinMetWoord } from './spellingwoorden.js';
import '../ui/minispellen.css';

/** De categorieën die meedoen (voor de Herhaalmix): alle lokalen behalve de mix zelf en lokalen die uit staan. */
export const MIX_CATEGORIEEN = SPELLING_LOKALEN.filter((l) => !l.uit && l.cat !== 'mix');

/**
 * Het spel van de Spellingwereld, voor alle lokalen:
 *   🥉 Brons  = kies de goede schrijfwijze uit 2
 *   🥈 Zilver = vul de ontbrekende letters in
 *   🥇 Goud   = dictee: luister en typ het hele woord
 * In de Herhaalmix kies je eerst de categorie.
 */
export class SpellingSpel extends Minispel {
  constructor(opties) {
    super({ ...opties, voortgang: spellingvoortgang });
    this.lokaal = opties.kraam.data;
    this.isMix = this.lokaal.cat === 'mix';
  }

  niveauTeken(n) { return T.niveauNamen[n - 1] ?? ''; }

  maakVragen() {
    const pool = this.isMix
      ? MIX_CATEGORIEEN.flatMap((l) => woordenVan(l.cat))
      : woordenVan(this.lokaal.cat);
    // Brons heeft een foute schrijfwijze nodig; woorden zonder overslaan.
    const bruikbaar = this.niveau === 1 ? pool.filter((w) => w.fout && w.fout !== w.woord) : pool;
    return kiesWillekeurig(bruikbaar, VRAGEN_PER_RONDE);
  }

  beginRonde(niveau) {
    super.beginRonde(niveau);
    if (this.kiesModus || !this.opdrachtEl) return;
    this.opdrachtEl.textContent = this.isMix ? T.opdrachtMix : [T.opdrachtBrons, T.opdrachtZilver, T.opdrachtGoud][niveau - 1];
  }

  toonVraag(w) {
    this.w = w;
    this.fouten = 0;
    this.stap = this.isMix ? 'categorie' : 'woord';
    this.toonStap();
  }

  toonStap() {
    const w = this.w;
    this.inhoud.innerHTML = '';
    this.beantwoord = false;
    this.knoppen = [];
    this.invoer = null;

    if (this.stap === 'categorie') {
      this.inhoud.append(el('div', 'ww-stap', T.welkeCategorie));
      this.inhoud.append(el('div', 'sp-woord', `${w.voor}<span class="ww-gat">?</span>${w.na}`));
      this.luisterKnop();
      const rij = el('div', 'ww-keuzes sp-categorieen');
      this.knoppen = MIX_CATEGORIEEN.map((l, i) => {
        const knop = el('button', 'ww-keuze sp-cat', `<span class="sneltoets">${i + 1}</span>${l.icoon} ${l.label}`);
        knop.type = 'button';
        knop.addEventListener('click', () => this.kiesCategorie(l, knop));
        rij.appendChild(knop);
        return knop;
      });
      this.inhoud.appendChild(rij);
      this.zegWoord();
      return;
    }

    if (this.niveau === 1) {
      // Brons: kies uit 2 schrijfwijzen.
      this.inhoud.append(el('div', 'ww-zin', w.zin.replace('___', '<span class="ww-gat">?</span>')));
      this.luisterKnop();
      const opties = Math.random() < 0.5 ? [w.woord, w.fout] : [w.fout, w.woord];
      const rij = el('div', 'ww-keuzes');
      this.knoppen = opties.map((optie, i) => {
        const knop = el('button', 'ww-keuze', `<span class="sneltoets">${i + 1}</span>${optie}`);
        knop.type = 'button';
        knop.addEventListener('click', () => this.controleer(optie === w.woord, knop));
        rij.appendChild(knop);
        return knop;
      });
      this.inhoud.appendChild(rij);
    } else if (this.niveau === 2) {
      // Zilver: vul de ontbrekende letters in.
      this.inhoud.append(el('div', 'sp-woord', `${w.voor}<span class="ww-gat">?</span>${w.na}`));
      this.inhoud.append(el('div', 'sp-zin', w.zin));
      this.luisterKnop();
      this.invoer = this.maakInvoer((tekst) => this.controleer(gatGoed(w, tekst), this.invoer.invoer));
      this.inhoud.appendChild(this.invoer.rij);
    } else {
      // Goud: dictee. Het woord wordt voorgelezen; de zin staat erbij met een gat.
      this.inhoud.append(el('div', 'ww-zin', w.zin.replace('___', '<span class="ww-gat">?</span>')));
      this.luisterKnop(true);
      if (!this.voorlezen?.beschikbaar) this.inhoud.append(el('p', 'sp-geenstem', T.geenStem));
      this.invoer = this.maakInvoer((tekst) => this.controleer(woordGoed(w, tekst), this.invoer.invoer), true);
      this.inhoud.appendChild(this.invoer.rij);
    }
    if (!this.isMix || this.niveau === 3) this.zegWoord();
  }

  /** Knop om het woord (nog eens) te horen. */
  luisterKnop(groot = false) {
    if (!this.voorlezen?.beschikbaar) return;
    const knop = el('button', `sp-luister${groot ? ' groot' : ''}`, T.luister);
    knop.type = 'button';
    knop.addEventListener('click', () => this.zegWoord());
    this.inhoud.append(knop);
  }

  /** Woord, zin, woord: zoals bij een dictee. Ook als voorlezen uit staat (het hoort bij de opdracht). */
  zegWoord() {
    const w = this.w;
    if (!w) return;
    this.voorlezen?.zeg(`${w.woord}. ${zinMetWoord(w)} ${w.woord}.`, { altijd: true });
  }

  /** Bij een vraag lezen we het woord voor (de 🔊-knop bovenin doet hetzelfde). */
  voorleesTekst() { return ''; }

  leesVraagVoor(altijd = false) {
    if (this.kiesModus) { super.leesVraagVoor(altijd); return; }
    this.zegWoord();
  }

  kiesCategorie(lokaal, knop) {
    if (this.beantwoord) return;
    if (lokaal.cat !== this.w.cat) {
      knop.disabled = true;
      knop.classList.add('wiebel');
      this.fout(T.categorieFout);
      return;
    }
    this.beantwoord = true;
    knop.classList.add('goed');
    this.knoppen.forEach((k) => { k.disabled = true; });
    this.geluid?.plop?.();
    this.feedback.className = 'ms-feedback ms-goed';
    this.feedback.innerHTML = `<span><b>${T.nogEenStap}</b></span>`;
    setTimeout(() => {
      if (!this.venster) return;
      this.feedback.className = 'ms-feedback';
      this.feedback.innerHTML = '';
      this.stap = 'woord';
      this.fouten = 0;
      this.toonStap();
    }, 900);
  }

  controleer(goed, bron) {
    if (this.beantwoord) return;
    const w = this.w;
    if (!goed) {
      this.fouten++;
      if (bron) {
        bron.classList.remove('wiebel');
        void bron.offsetWidth;
        bron.classList.add('wiebel');
      }
      if (bron?.classList.contains('ww-keuze')) bron.disabled = true;
      const lokaal = SPELLING_LOKALEN.find((l) => l.cat === w.cat);
      const hulp = this.fouten >= 2 && this.niveau > 1 ? `<br>${T.goedeAntwoord.replace('{woord}', `<b>${w.woord}</b>`)}` : '';
      this.fout(`${lokaal?.tip ?? ''}${hulp}`);
      return;
    }
    this.beantwoord = true;
    this.knoppen.forEach((k) => { k.disabled = true; });
    bron?.classList?.add('goed');
    if (this.invoer) { this.invoer.invoer.disabled = true; this.invoer.knop.disabled = true; }
    // Het vraagteken wordt het goede woord (of het goede stukje).
    for (const gat of this.inhoud.querySelectorAll('.ww-zin .ww-gat')) gat.outerHTML = `<mark>${w.woord}</mark>`;
    for (const gat of this.inhoud.querySelectorAll('.sp-woord .ww-gat')) gat.outerHTML = `<mark>${w.gat}</mark>`;
    this.goed(`${w.voor}<mark>${w.gat}</mark>${w.na}`);
  }

  toets(e) {
    if (!this.knoppen.length || this.beantwoord) return;
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.knoppen.length && !this.knoppen[i].disabled) this.knoppen[i].click();
  }
}

/** Mag de Herhaalmix al? Alle andere lokalen minstens Brons. */
export function mixOpen() {
  return MIX_CATEGORIEEN.every((l) => spellingvoortgang.niveau(l.id) >= 1);
}
