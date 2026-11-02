import { Minispel, el, kiesWillekeurig, VRAGEN_PER_RONDE } from '../minispellen/basis.js';
import { SPELLING_TEKSTEN as T, SPELLING_LOKALEN } from '../data/spelling.js';
import { spellingvoortgang } from '../spellingvoortgang.js';
import { woordenVan, woordGoed, zinMetWoord, foutVan, zinInStukjes } from './spellingwoorden.js';
import '../ui/minispellen.css';

/** De categorieën die meedoen (voor de Herhaalmix): alle lokalen behalve de mix zelf en lokalen die uit staan. */
export const MIX_CATEGORIEEN = SPELLING_LOKALEN.filter((l) => !l.uit && l.cat !== 'mix');

/** Kans dat bij Zilver alle drie de zinnen goed gespeld zijn (dan klik je op "Alles is goed gespeld"). */
const KANS_ALLES_GOED = 0.25;
const ZINNEN_PER_JACHT = 3;

/**
 * Het spel van de Spellingwereld (groep 7), voor alle lokalen:
 *   🥉 Brons  = foutenjacht: drie zinnen, in één staat een woord fout gespeld → klik het aan
 *   🥈 Zilver = foutenjacht + het woord goed typen; soms is alles goed gespeld
 *   🥇 Goud   = dictee: luister en typ het hele woord (ook lange samenstellingen), zonder de zin te zien
 * In de Herhaalmix kies je ook de categorie van het woord.
 */
export class SpellingSpel extends Minispel {
  constructor(opties) {
    super({ ...opties, voortgang: spellingvoortgang });
    this.lokaal = opties.kraam.data;
    this.isMix = this.lokaal.cat === 'mix';
  }

  niveauTeken(n) { return T.niveauNamen[n - 1] ?? ''; }

  /** Alle woorden van dit lokaal (of van alle lokalen bij de mix). */
  pool() {
    return this.isMix ? MIX_CATEGORIEEN.flatMap((l) => woordenVan(l.cat)) : woordenVan(this.lokaal.cat);
  }

  maakVragen() {
    const alle = this.pool();
    if (this.niveau === 3) {
      // Dictee: de helft lange woorden, de rest gewone.
      const lang = kiesWillekeurig(alle.filter((w) => w.lang), 4);
      const kort = kiesWillekeurig(alle.filter((w) => !w.lang), VRAGEN_PER_RONDE - lang.length);
      return kiesWillekeurig([...lang, ...kort], VRAGEN_PER_RONDE).map((w) => ({ soort: 'dictee', w }));
    }
    // Foutenjacht: steeds drie zinnen met elk een woord uit de lijst; meestal is er één fout gespeld.
    const kort = alle.filter((w) => !w.lang && w.fouten.length);
    const vragen = [];
    for (let i = 0; i < VRAGEN_PER_RONDE; i++) {
      const drie = kiesWillekeurig(kort, ZINNEN_PER_JACHT);
      const allesGoed = this.niveau === 2 && Math.random() < KANS_ALLES_GOED;
      const foutIndex = allesGoed ? -1 : Math.floor(Math.random() * drie.length);
      vragen.push({
        soort: 'jacht',
        zinnen: drie.map((w, j) => ({ w, getoond: j === foutIndex ? foutVan(w) : w.woord })),
        foutIndex,
      });
    }
    // Bij Zilver altijd minstens één ronde zonder fout, zodat de groene knop echt meedoet.
    if (this.niveau === 2 && !vragen.some((v) => v.foutIndex < 0)) {
      const v = vragen[Math.floor(Math.random() * vragen.length)];
      v.zinnen.forEach((z) => { z.getoond = z.w.woord; });
      v.foutIndex = -1;
    }
    return vragen;
  }

  beginRonde(niveau) {
    super.beginRonde(niveau);
    if (this.kiesModus || !this.opdrachtEl) return;
    this.opdrachtEl.textContent = this.isMix ? T.opdrachtMix : [T.opdrachtBrons, T.opdrachtZilver, T.opdrachtGoud][niveau - 1];
  }

  toonVraag(v) {
    this.v = v;
    this.w = v.soort === 'dictee' ? v.w : v.zinnen[v.foutIndex]?.w ?? null; // het woord waar het om draait
    this.fouten = 0;
    if (v.soort === 'dictee') this.stap = this.isMix ? 'categorie' : 'typen';
    else this.stap = 'zoeken';
    this.toonStap();
  }

  /** Het foute woord zoals het in de zin stond. */
  get foutGetoond() {
    return this.v.zinnen?.[this.v.foutIndex]?.getoond ?? '';
  }

  /* ---------- Opbouw per stap ---------- */

  toonStap() {
    this.inhoud.innerHTML = '';
    this.beantwoord = false;
    this.knoppen = [];
    this.catKnoppen = [];
    this.invoer = null;
    this.allesGoedKnop = null;
    if (this.stap === 'zoeken') this.toonJacht();
    else if (this.stap === 'categorie') this.toonCategorie();
    else this.toonTypen();
  }

  /** Foutenjacht: drie zinnen, elk woord is een knopje. */
  toonJacht() {
    const v = this.v;
    this.inhoud.append(el('div', 'ww-stap', T.welkWoordFout));
    const lijst = el('div', 'sp-jacht');
    v.zinnen.forEach((z, j) => {
      const zinEl = el('div', 'sp-jachtzin');
      for (const stuk of zinInStukjes(z.w.zin, z.getoond)) {
        if (!stuk.woord) { zinEl.append(stuk.tekst); continue; }
        if (zinEl.childNodes.length) zinEl.append(' ');
        const knop = el('button', 'sp-woordje', stuk.tekst);
        knop.type = 'button';
        knop.addEventListener('click', () => this.klikWoord(!!stuk.isHetWoord && j === v.foutIndex, knop));
        zinEl.append(knop);
        this.knoppen.push(knop);
      }
      lijst.append(zinEl);
    });
    this.inhoud.append(lijst);
    if (this.niveau === 2) {
      const knop = el('button', 'ww-keuze sp-allesgoed', T.allesGoed);
      knop.type = 'button';
      knop.addEventListener('click', () => this.klikAllesGoed(knop));
      this.inhoud.append(knop);
      this.allesGoedKnop = knop;
    }
  }

  /** Mix: bij welke categorie hoort het woord? */
  toonCategorie() {
    this.inhoud.append(el('div', 'ww-stap', T.welkeCategorie));
    if (this.v.soort === 'dictee') this.luisterKnop(true);
    else this.inhoud.append(el('div', 'sp-woord', `<s>${this.foutGetoond}</s>`));
    const rij = el('div', 'ww-keuzes sp-categorieen');
    this.catKnoppen = MIX_CATEGORIEEN.map((l, i) => {
      const knop = el('button', 'ww-keuze sp-cat', `<span class="sneltoets">${i + 1}</span>${l.icoon} ${l.label}`);
      knop.type = 'button';
      knop.addEventListener('click', () => this.kiesCategorie(l, knop));
      rij.appendChild(knop);
      return knop;
    });
    this.inhoud.appendChild(rij);
    if (this.v.soort === 'dictee') this.zegWoord();
  }

  /** Typen: het foute woord verbeteren (Zilver) of het dictee (Goud). */
  toonTypen() {
    const w = this.w;
    if (this.v.soort === 'dictee') {
      this.inhoud.append(el('div', 'ww-stap', T.luisterOpdracht));
      this.luisterKnop(true);
      // Zonder stem kan het dictee niet: dan staat de zin er wel bij (met een gat).
      if (!this.voorlezen?.beschikbaar) {
        this.inhoud.append(el('p', 'sp-geenstem', T.geenStem));
        this.inhoud.append(el('div', 'ww-zin', w.zin.replace('___', '<span class="ww-gat">?</span>')));
      }
      if (!this.isMix) this.zegWoord();
    } else {
      this.inhoud.append(el('div', 'ww-stap', T.verbeter));
      this.inhoud.append(el('div', 'sp-woord', `<s>${this.foutGetoond}</s>`));
      this.inhoud.append(el('div', 'sp-zin', w.zin.replace('___', '…')));
    }
    this.invoer = this.maakInvoer((tekst) => this.controleerWoord(tekst), true);
    this.inhoud.appendChild(this.invoer.rij);
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

  voorleesTekst() { return ''; }

  leesVraagVoor(altijd = false) {
    if (this.kiesModus) { super.leesVraagVoor(altijd); return; }
    if (this.v?.soort === 'dictee') this.zegWoord();
    else this.voorlezen?.zeg(this.opdrachtEl?.textContent ?? '', { altijd });
  }

  /* ---------- Nakijken ---------- */

  tipVoor(w) {
    return SPELLING_LOKALEN.find((l) => l.cat === w?.cat)?.tip ?? '';
  }

  wiebel(knop) {
    knop.classList.remove('wiebel');
    void knop.offsetWidth;
    knop.classList.add('wiebel');
  }

  klikWoord(isHetFouteWoord, knop) {
    if (this.beantwoord) return;
    if (!isHetFouteWoord) {
      knop.disabled = true;
      this.wiebel(knop);
      this.fouten++;
      // Na twee keer mis: de tip van de categorie van het foute woord als hulp.
      const hulp = this.fouten >= 2 && this.w ? `<br>${this.tipVoor(this.w)}` : '';
      this.fout(`${T.nietFout}${hulp}`);
      return;
    }
    knop.classList.add('gevonden');
    this.beantwoord = true;
    this.knoppen.forEach((k) => { k.disabled = true; });
    if (this.allesGoedKnop) this.allesGoedKnop.disabled = true;
    if (this.isMix) this.naarStap('categorie');
    else if (this.niveau === 2) this.naarStap('typen');
    else this.klaarMetVraag();
  }

  klikAllesGoed(knop) {
    if (this.beantwoord) return;
    if (this.v.foutIndex >= 0) {
      knop.disabled = true;
      this.wiebel(knop);
      this.fout(T.welFout);
      return;
    }
    this.beantwoord = true;
    this.knoppen.forEach((k) => { k.disabled = true; });
    knop.classList.add('goed');
    this.klaarMetVraag(T.geenFout);
  }

  kiesCategorie(lokaal, knop) {
    if (this.beantwoord) return;
    if (lokaal.cat !== this.w.cat) {
      knop.disabled = true;
      this.wiebel(knop);
      this.fout(T.categorieFout);
      return;
    }
    this.beantwoord = true;
    knop.classList.add('goed');
    this.catKnoppen.forEach((k) => { k.disabled = true; });
    // Daarna typen (dictee of Zilver). Bij Brons in de mix is het woord gevonden + categorie genoeg.
    if (this.v.soort === 'dictee' || this.niveau === 2) this.naarStap('typen');
    else this.klaarMetVraag();
  }

  naarStap(stap) {
    this.geluid?.plop?.();
    this.feedback.className = 'ms-feedback ms-goed';
    this.feedback.innerHTML = `<span><b>${T.nogEenStap}</b></span>`;
    setTimeout(() => {
      if (!this.venster) return;
      this.feedback.className = 'ms-feedback';
      this.feedback.innerHTML = '';
      this.stap = stap;
      this.toonStap();
    }, 800);
  }

  controleerWoord(tekst) {
    if (this.beantwoord) return;
    const w = this.w;
    if (!woordGoed(w, tekst)) {
      this.fouten++;
      this.wiebel(this.invoer.invoer);
      const hulp = this.fouten >= 2 ? `<br>${T.goedeAntwoord.replace('{woord}', `<b>${w.woord}</b>`)}` : '';
      this.fout(`${this.tipVoor(w)}${hulp}`);
      return;
    }
    this.beantwoord = true;
    this.invoer.invoer.disabled = true;
    this.invoer.knop.disabled = true;
    this.klaarMetVraag();
  }

  /** Vraag goed: munten en de uitleg (het goede woord, met het lastige stukje in kleur). */
  klaarMetVraag(tekst) {
    this.beantwoord = true;
    const w = this.w;
    this.goed(tekst ?? (w ? `${w.voor}<mark>${w.gat}</mark>${w.na}` : ''));
  }

  toets(e) {
    if (this.beantwoord || this.stap !== 'categorie') return;
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.catKnoppen.length && !this.catKnoppen[i].disabled) this.catKnoppen[i].click();
  }
}

/** Mag de Herhaalmix al? Alle andere lokalen minstens Brons. */
export function mixOpen() {
  return MIX_CATEGORIEEN.every((l) => spellingvoortgang.niveau(l.id) >= 1);
}
