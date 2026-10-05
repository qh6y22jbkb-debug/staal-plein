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
    this.kisten = [];
    this.invoer = null;
    if (this.niveau >= 2) {
      // Zelf typen: de verleden tijd van de ik-vorm.
      if (this.niveau === 2) this.inhoud.append(el('div', 'ms-hulpje', `ik-vorm: <b>ik ${v.ik}</b>`));
      const rij = el('div', 'kof-typrij', '<span class="kof-gisteren">Gisteren … ik</span>');
      this.invoer = this.maakInvoer((tekst) => this.controleerGetypt(tekst), true);
      rij.appendChild(this.invoer.rij);
      this.inhoud.appendChild(rij);
      return;
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

  /** 2 en 3 sterren: getypt woord nakijken. */
  controleerGetypt(tekst) {
    if (this.beantwoord) return;
    const v = this.vraag;
    const woord = tekst.replace(/^ik\s+/, '');
    const goed = v.ik + v.uitgang;
    if (woord === goed) {
      this.beantwoord = true;
      this.invoer.invoer.disabled = true;
      this.invoer.knop.disabled = true;
      this.goed(`ik ${v.ik}<mark>${v.uitgang}</mark> – wij ${v.ik}<mark>${v.uitgang}n</mark>`);
      return;
    }
    this.wiebel(this.invoer.invoer);
    const uitgang = woord.slice(-2);
    if (uitgang !== 'te' && uitgang !== 'de') {
      this.fout('In de verleden tijd eindigt het woord op <b>-te</b> of <b>-de</b>. Bijvoorbeeld: ik werk<mark>te</mark>.');
    } else if (woord.slice(0, -2) !== v.ik) {
      this.fout(`Kijk goed naar de ik-vorm: <b>ik ${v.ik}</b>. Schrijf die op en zet er -te of -de achter.`);
    } else {
      this.fout(`Haal -en eraf: <b>${v.zonderEn}</b>. De laatste letter is de <mark>${v.letter}</mark>. Zit die in 't kofschip-x?`);
    }
  }

  wiebel(e) {
    e.classList.remove('wiebel');
    void e.offsetWidth;
    e.classList.add('wiebel');
  }

  toets(e) {
    if (!this.kisten.length) return;
    const i = Minispel.cijfer(e);
    const letter = { KeyT: 0, KeyD: 1 }[e.code];
    const keuze = i >= 0 ? i : letter;
    if (keuze === 0 || keuze === 1) this.kisten[keuze].click();
  }
}
