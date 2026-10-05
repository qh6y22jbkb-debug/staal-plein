import { Minispel, el } from './basis.js';

const KOFSCHIP = ['t', 'k', 'f', 's', 'ch', 'p', 'x'];

/** Laatste letter na het weghalen van -en (ch telt als één letter). */
export function laatsteLetter(stuk) {
  return stuk.endsWith('ch') ? 'ch' : stuk.slice(-1);
}

/** 1. Kapitein Kofschip: kies de schatkist "-te" of "-de". */
export class KofschipSpel extends Minispel {
  toonVraag(v) {
    const zonderEn = v.hele.replace(/en$/, '');
    this.vraag = { ...v, zonderEn, letter: laatsteLetter(zonderEn) };
    this.beantwoord = false;

    this.inhoud.append(el('div', 'kof-woord', v.hele));
    // Bij 3 sterren geen geheugensteuntje.
    if (this.niveau < 3) {
      this.inhoud.append(el('div', 'kof-ezelsbrug', `'t kofschip-x: ${KOFSCHIP.map((l) => `<span>${l}</span>`).join('')}`));
    }
    const kisten = el('div', 'kof-kisten');
    this.kisten = ['te', 'de'].map((uitgang, i) => {
      const kist = el('button', 'kof-kist', `
        <span class="kof-deksel"></span>
        <span class="kof-bak"><span class="kof-slot"></span></span>
        <span class="kof-label"><span class="sneltoets">${i + 1}</span>-${uitgang}</span>`);
      kist.type = 'button';
      kist.addEventListener('click', () => this.kies(uitgang, kist));
      kisten.appendChild(kist);
      return kist;
    });
    this.inhoud.appendChild(kisten);
  }

  voorleesTekst() {
    return this.vraag.hele;
  }

  kies(uitgang, kist) {
    if (this.beantwoord) return;
    const v = this.vraag;
    if (uitgang === v.uitgang) {
      this.beantwoord = true;
      kist.classList.add('open');
      this.kisten.forEach((k) => { k.disabled = true; });
      this.goed(`ik ${v.ik}<mark>${v.uitgang}</mark> – wij ${v.ik}<mark>${v.uitgang}n</mark>`);
    } else {
      kist.classList.remove('wiebel');
      void kist.offsetWidth;
      kist.classList.add('wiebel');
      this.fout(`Haal -en eraf: <b>${v.zonderEn}</b>. De laatste letter is de <mark>${v.letter}</mark>. Zit die in 't kofschip-x?`);
    }
  }

  toets(e) {
    const i = Minispel.cijfer(e);
    const letter = { KeyT: 0, KeyD: 1 }[e.code];
    const keuze = i >= 0 ? i : letter;
    if (keuze === 0 || keuze === 1) this.kisten[keuze].click();
  }
}
