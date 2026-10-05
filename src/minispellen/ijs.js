import { Minispel, el } from './basis.js';
import { SPEL_TEKSTEN } from '../data/oefeningen.js';

const SMAKEN = ['#f783ac', '#fff3bf', '#8b5a2b', '#69db7c', '#ffa94d', '#b197fc'];

/** 6. Gijs Gezegde: klik alle werkwoorden aan; elk werkwoord wordt een ijsbolletje. */
export class IjsSpel extends Minispel {
  toonVraag(v) {
    // Woorden met *sterretjes* zijn werkwoorden.
    this.woorden = v.zin.split(/\s+/).map((ruw) => {
      const werkwoord = /^\*.+\*[.?!,]?$/.test(ruw);
      const tekst = ruw.replace(/\*/g, '');
      return { tekst, kaal: tekst.replace(/[.?!,]/g, ''), werkwoord, gevonden: false };
    });
    this.aantal = this.woorden.filter((w) => w.werkwoord).length;
    this.gevonden = [];

    const opstelling = el('div', 'ijs-opstelling');
    const zin = el('div', 'ijs-zin');
    this.woorden.forEach((w, i) => {
      w.el = el('button', 'ijs-woord', w.tekst);
      w.el.type = 'button';
      w.el.addEventListener('click', () => this.kies(w));
      w.el.title = `Toets ${i + 1}`;
      zin.appendChild(w.el);
    });
    this.hoorntje = el('div', 'ijs-hoorntje', '<div class="ijs-bollen"></div><div class="ijs-hoorn"></div>');
    this.bollen = this.hoorntje.querySelector('.ijs-bollen');
    this.teller = el('div', 'ijs-teller');
    opstelling.append(zin, this.hoorntje);
    this.inhoud.append(opstelling, this.teller);
    this.zetTeller();
    // Bij 3 sterren geen teller: zelf bepalen wanneer je alle werkwoorden hebt.
    if (this.niveau === 3) {
      this.klaarKnop = el('button', 'ms-controleer', `${SPEL_TEKSTEN.klaarKnop} ✓`);
      this.klaarKnop.type = 'button';
      this.klaarKnop.addEventListener('click', () => this.controleer());
      this.inhoud.appendChild(this.klaarKnop);
    }
  }

  zetTeller() {
    if (this.niveau === 3) return;
    const nog = this.aantal - this.gevonden.length;
    this.teller.textContent = nog > 0 ? `Nog ${nog} ${nog === 1 ? 'werkwoord' : 'werkwoorden'} te vinden` : '';
  }

  voorleesTekst() {
    return this.woorden.map((w) => w.tekst).join(' ');
  }

  kies(w) {
    if (w.gevonden || this.gevonden.length === this.aantal) return;
    if (w.werkwoord) {
      w.gevonden = true;
      w.el.classList.add('gevonden');
      w.el.disabled = true;
      this.gevonden.push(w);
      const bol = el('div', 'ijs-bol', w.kaal);
      bol.style.background = SMAKEN[(this.gevonden.length - 1) % SMAKEN.length];
      this.bollen.appendChild(bol);
      this.zetTeller();
      if (this.niveau === 3) {
        this.feedback.className = 'ms-feedback';
        this.feedback.innerHTML = '';
      } else if (this.gevonden.length === this.aantal) {
        // In de volgorde van de zin.
        const gezegde = this.woorden.filter((x) => x.werkwoord).map((x) => x.kaal).join(' ');
        this.woorden.forEach((x) => { x.el.disabled = true; });
        this.goed(`Werkwoordelijk gezegde: <mark>${gezegde}</mark>`);
      } else {
        this.feedback.className = 'ms-feedback ms-goed';
        this.feedback.innerHTML = `<span><b>Ja!</b> <mark>${w.kaal}</mark> is een werkwoord. Zijn er nog meer?</span>`;
      }
    } else {
      w.el.classList.remove('wiebel');
      void w.el.offsetWidth;
      w.el.classList.add('wiebel');
      const tip = this.gevonden.length === 0
        ? 'Tip: zoek eerst de persoonsvorm.'
        : 'Tip: kijk ook naar het eind van de zin. Daar staan vaak nog werkwoorden.';
      this.fout(`<b>${w.kaal}</b> is geen werkwoord. ${tip}`);
    }
  }

  /** 3 sterren: heb je alle werkwoorden? */
  controleer() {
    if (this.gevonden.length === this.aantal) {
      this.klaarKnop.disabled = true;
      this.woorden.forEach((x) => { x.el.disabled = true; });
      const gezegde = this.woorden.filter((x) => x.werkwoord).map((x) => x.kaal).join(' ');
      this.goed(`Werkwoordelijk gezegde: <mark>${gezegde}</mark>`);
    } else {
      const nog = this.aantal - this.gevonden.length;
      this.fout(`Je mist nog ${nog === 1 ? 'een werkwoord' : `${nog} werkwoorden`}. Kijk ook naar het eind van de zin!`);
    }
  }

  toets(e) {
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.woorden.length) this.woorden[i].el.click();
  }
}
