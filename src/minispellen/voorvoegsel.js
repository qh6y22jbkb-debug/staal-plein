import { Minispel, el, kiesWillekeurig } from './basis.js';
import { laatsteLetter } from './kofschip.js';

/** 4. Vera Voorvoegsel: kies het goed geschreven woord in de zin. */
export class VoorvoegselSpel extends Minispel {
  toonVraag(v) {
    this.vraag = v;
    this.beantwoord = false;
    const [voor, na] = v.zin.split('___');
    this.zinEl = el('div', 'vv-zin');
    this.zinEl.append(document.createTextNode(voor), el('span', 'vv-gat', '…'), document.createTextNode(na));
    this.inhoud.appendChild(this.zinEl);

    this.knoppen = [];
    this.invoer = null;
    if (this.niveau >= 2) {
      // 2 sterren: de ik-vorm als hulp. 3 sterren: alleen het hele werkwoord.
      this.inhoud.appendChild(el('div', 'ms-hulpje', this.niveau === 2 ? `ik-vorm: <b>ik ${v.ik}</b>` : `werkwoord: <b>${v.hele}</b>`));
      this.invoer = this.maakInvoer((tekst) => this.kies(tekst, null), true);
      this.inhoud.appendChild(this.invoer.rij);
      return;
    }
    // 1 ster: alleen het goede woord en één fout woord (met hetzelfde aantal personen).
    let opties = v.opties;
    if (this.niveau === 1) {
      const fout = v.opties.find((o) => o !== v.goed && o.endsWith('n') === v.goed.endsWith('n'))
        ?? v.opties.find((o) => o !== v.goed);
      opties = [v.goed, fout];
    }
    const rij = el('div', 'vv-opties');
    this.knoppen = kiesWillekeurig(opties, opties.length).map((optie, i) => {
      const knop = el('button', 'vv-blok', `<span class="sneltoets">${i + 1}</span>${optie}`);
      knop.type = 'button';
      knop.addEventListener('click', () => this.kies(optie, knop));
      rij.appendChild(knop);
      return knop;
    });
    this.inhoud.appendChild(rij);
  }

  voorleesTekst() {
    return this.vraag.zin.replace('___', this.vraag.goed);
  }

  kies(optie, knop) {
    if (this.beantwoord) return;
    const v = this.vraag;
    const uitgang = v.goed.slice(v.ik.length); // te, de, ten of den
    if (optie === v.goed) {
      this.beantwoord = true;
      this.knoppen.forEach((k) => { k.disabled = true; });
      knop?.classList.add('gekozen');
      if (this.invoer) { this.invoer.invoer.disabled = true; this.invoer.knop.disabled = true; }
      const gat = this.zinEl.querySelector('.vv-gat');
      gat.textContent = v.goed;
      gat.classList.add('gevuld');
      this.goed(`ik ${v.ik} + ${uitgang} = <mark>${v.goed}</mark>`);
      return;
    }
    const doel = knop ?? this.invoer.invoer;
    doel.classList.remove('wiebel');
    void doel.offsetWidth;
    doel.classList.add('wiebel');

    // Getypt woord dat niet met de ik-vorm begint? Dan eerst daarop wijzen.
    if (!optie.startsWith(v.ik.slice(0, -1))) {
      this.fout(`Kijk nog eens goed naar het begin van het woord. De ik-vorm is <b>ik ${v.ik}</b>.`);
      return;
    }
    const meerGekozen = optie.endsWith('n');
    const meerGoed = v.goed.endsWith('n');
    if (meerGekozen !== meerGoed) {
      this.fout(meerGoed
        ? 'Het gaat om meer personen of dingen. Dan komt er een <mark>n</mark> achter.'
        : 'Het gaat om één persoon of ding. Dan komt er géén n achter.');
    } else {
      const letter = laatsteLetter(v.ik);
      const extra = v.ik.endsWith('t') || v.ik.endsWith('d')
        ? ` Let op: de ik-vorm eindigt al op een ${letter}!`
        : '';
      this.fout(`De ik-vorm is <b>ik ${v.ik}</b>. De laatste letter is de <mark>${letter}</mark>. Zit die in 't kofschip-x? Dan -te, anders -de.${extra}`);
    }
  }

  toets(e) {
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.knoppen.length) this.knoppen[i].click();
  }
}
