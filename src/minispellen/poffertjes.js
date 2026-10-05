import { Minispel, el } from './basis.js';

/** 5. Peter & Olga: klik eerst de persoonsvorm, daarna het onderwerp. */
export class PoffertjesSpel extends Minispel {
  toonVraag(v) {
    this.vraag = v;
    this.fase = 'pv';
    this.delen = v.zin.split('|').map((d) => d.trim());
    this.pvTekst = this.delen[v.pv].replace(/[.?!,]/g, '');
    this.wieOfWat = v.wieOfWat ?? `Wie of wat ${this.pvTekst.toLowerCase()}?`;
    this.zetOpdracht();

    const rij = el('div', 'pof-zin');
    this.blokken = this.delen.map((deel, i) => {
      const blok = el('button', 'pof-blok', `<span class="pof-label"></span>${deel}`);
      blok.type = 'button';
      blok.addEventListener('click', () => this.kies(i, blok));
      rij.appendChild(blok);
      return blok;
    });
    this.inhoud.appendChild(rij);
    this.inhoud.appendChild(el('div', 'pof-pan', '<span></span><span></span><span></span><span></span><span></span>'));
  }

  zetOpdracht() {
    if (this.niveau === 1) {
      this.opdrachtEl.innerHTML = 'Klik op de <b>persoonsvorm</b>.';
      return;
    }
    this.opdrachtEl.innerHTML = this.fase === 'pv'
      ? '<span class="pof-stap pv">Stap 1</span> Klik op de <b>persoonsvorm</b>.'
      : `<span class="pof-stap ow">Stap 2</span> Klik op het <b>onderwerp</b>. Vraag: <i>${this.wieOfWat}</i>`;
  }

  voorleesTekst() {
    return this.delen.join(' ');
  }

  kies(i, blok) {
    const v = this.vraag;
    if (this.fase === 'klaar') return;

    if (this.fase === 'pv') {
      if (i === v.pv) {
        blok.classList.add('is-pv');
        blok.querySelector('.pof-label').textContent = 'persoonsvorm';
        if (this.niveau === 1) {
          // Bij 1 ster is de persoonsvorm genoeg.
          this.fase = 'klaar';
          this.blokken.forEach((b) => { b.disabled = true; });
          this.goed(`<mark>${this.pvTekst}</mark> is de persoonsvorm.`);
          return;
        }
        this.fase = 'ow';
        this.zetOpdracht();
        this.feedback.className = 'ms-feedback ms-goed';
        this.feedback.innerHTML = `<span><b>Goed!</b> <mark>${this.pvTekst}</mark> is de persoonsvorm. Zoek nu het onderwerp.</span>`;
      } else {
        this.wiebel(blok);
        this.fout(v.pv === 0
          ? 'Doe de tijdproef: zet de zin in een andere tijd. Welk woord verandert dan?'
          : 'Doe de vraagproef: maak van de zin een vraag. Welk woord komt dan vooraan?');
      }
      return;
    }

    // Fase: onderwerp
    if (i === v.pv) {
      this.feedback.className = 'ms-feedback ms-bijna';
      this.feedback.innerHTML = '<span>Dat is de persoonsvorm al. Zoek nu het <b>onderwerp</b>.</span>';
      return;
    }
    if (i === v.ow) {
      this.fase = 'klaar';
      blok.classList.add('is-ow');
      blok.querySelector('.pof-label').textContent = 'onderwerp';
      this.blokken.forEach((b) => { b.disabled = true; });
      const ow = this.delen[v.ow].replace(/[.?!,]/g, '');
      this.goed(`Persoonsvorm: <mark>${this.pvTekst}</mark> · Onderwerp: <mark class="ow">${ow}</mark>`);
    } else {
      this.wiebel(blok);
      this.fout(`Vraag het jezelf: <b>${this.wieOfWat}</b> Het antwoord is het onderwerp.`);
    }
  }

  wiebel(blok) {
    blok.classList.remove('wiebel');
    void blok.offsetWidth;
    blok.classList.add('wiebel');
  }

  toets(e) {
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.blokken.length) this.blokken[i].click();
  }
}
