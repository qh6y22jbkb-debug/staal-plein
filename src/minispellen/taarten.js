import { Minispel, el, kiesWillekeurig, VRAGEN_PER_RONDE } from './basis.js';

const OPTIES = ['te', 'ten', 'tte', 'tten'];

/**
 * 2. Tante Tessa: welk stukje (-te, -ten, -tte, -tten) hoort op de lege plek?
 * 1 ster: alleen enkelvoud, kies uit -te / -tte. 2 sterren: vier keuzes. 3 sterren: zelf typen.
 */
export class TaartenSpel extends Minispel {
  maakVragen() {
    const lijst = this.niveau === 1 ? this.data.vragen.filter((v) => !v.meer) : this.data.vragen;
    return kiesWillekeurig(lijst, VRAGEN_PER_RONDE);
  }

  toonVraag(v) {
    const eindigtOpT = v.ik.endsWith('t');
    const antwoord = (eindigtOpT ? 'tte' : 'te') + (v.meer ? 'n' : '');
    this.vraag = { ...v, eindigtOpT, antwoord, woord: `${v.ik}te${v.meer ? 'n' : ''}` };
    this.beantwoord = false;

    const [voor, na] = v.zin.split('__');
    this.zinEl = el('div', 'taart-zin');
    this.zinEl.append(document.createTextNode(voor), el('span', 'taart-gat', '?'), document.createTextNode(na));
    this.inhoud.appendChild(this.zinEl);

    this.knoppen = [];
    this.invoer = null;
    if (this.niveau === 3) {
      this.invoer = this.maakInvoer((tekst) => this.kies(tekst, null));
      this.inhoud.appendChild(this.invoer.rij);
      return;
    }
    const taarten = el('div', 'taart-knoppen');
    const opties = this.niveau === 1 ? ['te', 'tte'] : OPTIES;
    this.knoppen = opties.map((optie, i) => {
      const knop = el('button', 'taart-knop', `<span class="taart-kers"></span><span class="taart-tekst">-${optie}</span><span class="sneltoets">${i + 1}</span>`);
      knop.type = 'button';
      knop.addEventListener('click', () => this.kies(optie, knop));
      taarten.appendChild(knop);
      return knop;
    });
    this.inhoud.appendChild(taarten);
  }

  voorleesTekst() {
    return this.vraag.zin.replace(/\S*__/, (stuk) => stuk.replace(/\w*__$/, '') + this.vraag.woord);
  }

  kies(optie, knop) {
    if (this.beantwoord) return;
    const v = this.vraag;
    if (optie === v.antwoord) {
      this.beantwoord = true;
      this.knoppen.forEach((k) => { k.disabled = true; });
      knop?.classList.add('gekozen');
      if (this.invoer) { this.invoer.invoer.disabled = true; this.invoer.knop.disabled = true; }
      const gat = this.zinEl.querySelector('.taart-gat');
      gat.textContent = optie;
      gat.classList.add('gevuld');
      this.goed(`ik ${v.ik} + te${v.meer ? 'n' : ''} = <mark>${v.woord}</mark>`);
      return;
    }
    const doel = knop ?? this.invoer?.invoer;
    doel.classList.remove('wiebel');
    void doel.offsetWidth;
    doel.classList.add('wiebel');

    if (!/^t{1,2}en?$/.test(optie)) {
      this.fout('Typ alleen het stukje dat op de lege plek hoort, bijvoorbeeld <b>te</b> of <b>tte</b>.');
      return;
    }
    const dubbelGekozen = optie.startsWith('tt');
    if (dubbelGekozen !== v.eindigtOpT) {
      this.fout(v.eindigtOpT
        ? `De ik-vorm is <b>ik ${v.ik}</b>. Die eindigt al op een t. Daar komt nog <mark>-te</mark> achter!`
        : `De ik-vorm is <b>ik ${v.ik}</b>. Daar komt gewoon <mark>-te</mark> achter. Geen extra t!`);
    } else {
      this.fout(v.meer
        ? 'Het gaat om meer personen of dingen. Dan komt er een <mark>n</mark> achter.'
        : 'Het gaat om één persoon of ding. Dan komt er géén n achter.');
    }
  }

  toets(e) {
    const i = Minispel.cijfer(e);
    if (i >= 0 && i < this.knoppen.length) this.knoppen[i].click();
  }
}
