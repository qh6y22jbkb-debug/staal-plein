import { Minispel, el } from './basis.js';

/** Kleine letters, zonder leestekens en dubbele spaties. */
function schoon(t) {
  return t.toLowerCase().replace(/[.?!,]/g, '').replace(/\s+/g, ' ').trim();
}

/** 5. Peter & Olga: klik eerst de persoonsvorm, daarna het onderwerp. */
export class PoffertjesSpel extends Minispel {
  toonVraag(v) {
    this.vraag = v;
    this.fase = 'pv';
    this.delen = v.zin.split('|').map((d) => d.trim());
    this.pvTekst = this.delen[v.pv].replace(/[.?!,]/g, '');
    this.wieOfWat = v.wieOfWat ?? `Wie of wat ${this.pvTekst.toLowerCase()}?`;
    this.zetOpdracht();

    if (this.niveau >= 2) {
      this.toonTypVraag();
      return;
    }
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
    const doe = this.niveau >= 2 ? 'Typ' : 'Klik op';
    this.opdrachtEl.innerHTML = this.fase === 'pv'
      ? `<span class="pof-stap pv">Stap 1</span> ${doe} de <b>persoonsvorm</b>.`
      : `<span class="pof-stap ow">Stap 2</span> ${doe} het <b>onderwerp</b>. Vraag: <i>${this.wieOfWat}</i>`;
  }

  /* ---------- 2 en 3 sterren: zelf typen ---------- */

  toonTypVraag() {
    const rij = el('div', 'pof-zin pof-zin-tekst');
    this.blokken = this.delen.map((deel) => {
      const stuk = el('span', 'pof-stuk', `<span class="pof-label"></span>${deel}`);
      rij.appendChild(stuk);
      return stuk;
    });
    this.inhoud.appendChild(rij);
    this.invoer = this.maakInvoer((tekst) => this.controleerGetypt(tekst), true);
    this.inhoud.appendChild(this.invoer.rij);
    this.inhoud.appendChild(el('div', 'pof-pan', '<span></span><span></span><span></span><span></span><span></span>'));
  }

  controleerGetypt(tekst) {
    const v = this.vraag;
    if (this.fase === 'klaar') return;
    const getypt = schoon(tekst);
    const alleWoorden = this.delen.flatMap((d) => schoon(d).split(' '));

    if (this.fase === 'pv') {
      if (getypt === schoon(this.pvTekst)) {
        this.markeer(v.pv, 'is-pv', 'persoonsvorm');
        this.fase = 'ow';
        this.zetOpdracht();
        this.invoer.invoer.value = '';
        this.feedback.className = 'ms-feedback ms-goed';
        this.feedback.innerHTML = `<span><b>Goed!</b> <mark>${this.pvTekst}</mark> is de persoonsvorm. Typ nu het onderwerp.</span>`;
        return;
      }
      this.wiebelInvoer();
      if (!alleWoorden.includes(getypt)) {
        this.fout('Typ één woord uit de zin: de persoonsvorm.');
      } else {
        this.fout(v.pv === 0
          ? 'Doe de tijdproef: zet de zin in een andere tijd. Welk woord verandert dan?'
          : 'Doe de vraagproef: maak van de zin een vraag. Welk woord komt dan vooraan?');
      }
      return;
    }

    // Onderwerp
    const ow = schoon(this.delen[v.ow]);
    if (getypt === ow) {
      this.fase = 'klaar';
      this.markeer(v.ow, 'is-ow', 'onderwerp');
      this.invoer.invoer.disabled = true;
      this.invoer.knop.disabled = true;
      this.goed(`Persoonsvorm: <mark>${this.pvTekst}</mark> · Onderwerp: <mark class="ow">${this.delen[v.ow].replace(/[.?!,]/g, '')}</mark>`);
      return;
    }
    this.wiebelInvoer();
    if (getypt === schoon(this.pvTekst)) {
      this.fout('Dat is de persoonsvorm al. Typ nu het <b>onderwerp</b>.');
    } else if (getypt && ow.includes(getypt)) {
      this.fout('Bijna! Het onderwerp is langer. Welke woorden horen er nog bij?');
    } else if (getypt.includes(ow)) {
      this.fout('Je hebt te veel woorden getypt. Typ alleen het onderwerp.');
    } else {
      this.fout(`Vraag het jezelf: <b>${this.wieOfWat}</b> Het antwoord is het onderwerp.`);
    }
  }

  markeer(i, klasse, label) {
    this.blokken[i].classList.add(klasse);
    this.blokken[i].querySelector('.pof-label').textContent = label;
  }

  wiebelInvoer() {
    this.invoer.invoer.classList.remove('wiebel');
    void this.invoer.invoer.offsetWidth;
    this.invoer.invoer.classList.add('wiebel');
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
    if (this.niveau >= 2) return;
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.blokken.length) this.blokken[i].click();
  }
}
