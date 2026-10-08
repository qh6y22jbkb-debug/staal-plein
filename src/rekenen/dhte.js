import './dhte.css';

/**
 * Het DHTE-schema op het scherm: kolomkoppen (TD D H T E), de getallen, kleine vakjes voor
 * onthoud- en inwisselcijfers, en grote vakjes voor de uitkomst.
 * Werkt voor plus, min en keer (het schema zelf komt uit schema.js).
 * - Na het typen van een cijfer spring je vanzelf naar het volgende vakje (van rechts naar links).
 * - Backspace in een leeg vakje gaat terug, Enter = controleren.
 * - Op een touchscreen verschijnt een cijfertoetsenbord (inputmode="numeric").
 */
export class DhteSchema {
  constructor(schema, { kolomNamen, opControleer, restTekst = 'rest' }) {
    this.schema = schema;
    this.kolomNamen = kolomNamen;
    this.restTekst = restTekst;
    this.opControleer = opControleer;
    this.invoer = new Map(); // cel → <input>
    this.el = document.createElement('div');
    this.el.className = 'dhte';
    this.bouw();
  }

  /** Zet een element op een plek in het raster. */
  zet(tag, klasse, css, tekst) {
    const e = document.createElement(tag);
    e.className = klasse;
    e.style.cssText = css;
    if (tekst != null) e.textContent = tekst;
    this.el.appendChild(e);
    return e;
  }

  /** Invulvakje voor een cel (zelfde gedrag in het DHTE-schema en de staartdeling). */
  maakVak(cel, css, klasse, label) {
    const inp = this.zet('input', `dhte-vak ${cel.klein ? 'klein' : 'groot'} ${cel.soort} ${klasse}`, css);
    Object.assign(inp, { type: 'text', inputMode: 'numeric', autocomplete: 'off', spellcheck: false });
    inp.setAttribute('pattern', '[0-9]*');
    inp.setAttribute('enterkeyhint', 'done');
    inp.maxLength = cel.soort === 'inwissel' || cel.soort === 'rest' ? 2 : 1;
    inp.setAttribute('aria-label', label);
    inp.addEventListener('input', () => this.bijInvoer(cel, inp));
    inp.addEventListener('keydown', (e) => this.bijToets(e, cel, inp));
    inp.addEventListener('focus', () => inp.select());
    this.invoer.set(cel, inp);
    return inp;
  }

  /** Kolomkoppen en gekleurde kolommen op de achtergrond. kolom(k) = rasterkolom, rijen = laatste rij. */
  bouwKolommen(n, kolom, rijen) {
    for (let k = n - 1; k >= 0; k--) {
      this.zet('div', `dhte-kop k${k}`, `grid-row: 1; grid-column: ${kolom(k)};`, this.kolomNamen[k]);
      const band = this.zet('div', `dhte-band k${k}`, `grid-row: 1 / ${rijen + 1}; grid-column: ${kolom(k)};`);
      band.dataset.k = k;
    }
  }

  bouw() {
    const schema = this.schema;
    const kolomNamen = this.kolomNamen;
    const n = schema.breedte;
    this.el.style.setProperty('--kolommen', n);
    const kolom = (k) => n - k + 1;
    const plek = (rijNr, k) => `grid-row: ${rijNr}; grid-column: ${kolom(k)};`;
    this.bouwKolommen(n, kolom, schema.rijen.length + 1);

    schema.rijen.forEach((rij, i) => {
      const rijNr = i + 2;
      this.zet('div', `dhte-label ${rij.teken ? 'teken' : ''}`, `grid-row: ${rijNr}; grid-column: 1;`, rij.teken || rij.label || '');
      if (rij.soort === 'lijn') {
        this.zet('div', 'dhte-lijn', `grid-row: ${rijNr}; grid-column: 1 / ${n + 2};`);
        return;
      }
      for (let k = n - 1; k >= 0; k--) {
        const cel = rij.cellen[k];
        if (!cel) continue;
        if (!cel.invoer) {
          this.zet('div', `dhte-cijfer${rij.soort === 'tussen' || rij.soort === 'uitkomst' ? ' vast-invul' : ''}`, plek(rijNr, k), cel.waarde);
          continue;
        }
        const soortNaam = cel.soort === 'antwoord' ? 'cijfer' : cel.soort === 'onthoud' ? 'onthoud-cijfer' : 'nieuw getal na inwisselen';
        this.maakVak(cel, plek(rijNr, k), `rij-${rij.soort}`, `${kolomNamen[k]}-kolom, ${soortNaam}`);
      }
    });
  }

  /** De invulvakjes in de volgorde van rekenen (die nog niet vastliggen). */
  get open() {
    return this.schema.volgorde.filter((c) => !this.invoer.get(c).disabled);
  }

  bijInvoer(cel, inp) {
    inp.value = inp.value.replace(/\D/g, '').slice(0, inp.maxLength);
    inp.classList.remove('fout', 'mist');
    // Vol? Dan door naar het volgende vakje. Een inwisselvakje kan 2 cijfers hebben (bijv. 12):
    // na een 1 wachten we nog even, na een 2 t/m 9 kan er niets meer achter.
    // Een rest kan ook 2 cijfers hebben (bij delen door een getal van 2 cijfers): daar wachten we na elk eerste cijfer.
    const tweeMogelijk = cel.soort === 'rest' && this.schema.som.getallen[1] >= 10;
    const vol = inp.value.length >= inp.maxLength
      || (cel.soort === 'inwissel' && inp.value.length === 1 && inp.value !== '1')
      || (cel.soort === 'rest' && !tweeMogelijk && inp.value.length === 1);
    if (vol) this.focusNa(cel, 1);
  }

  bijToets(e, cel, inp) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation(); // anders telt dezelfde Enter ook als "Volgende"
      this.opControleer?.();
    } else if ((e.key === ' ' || e.code === 'Space') && (cel.klein || cel.soort === 'aftrek')) {
      // Niets te onthouden of in te wisselen: spatiebalk = vakje leeg laten en door.
      e.preventDefault();
      this.focusNa(cel, 1);
    } else if (e.key === 'Backspace' && inp.value === '') {
      e.preventDefault();
      this.focusNa(cel, -1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focusNa(cel, 1); // links = verder (we rekenen van rechts naar links)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      this.focusNa(cel, -1);
    }
  }

  /** Focus naar het volgende (+1) of vorige (-1) open vakje in de rekenvolgorde. */
  focusNa(cel, richting) {
    const volgorde = this.schema.volgorde;
    let i = volgorde.indexOf(cel) + richting;
    while (i >= 0 && i < volgorde.length && this.invoer.get(volgorde[i]).disabled) i += richting;
    if (i >= 0 && i < volgorde.length) this.focusVak(this.invoer.get(volgorde[i]));
  }

  /** Focus op een vakje en zorg dat het in beeld is (een lange staartdeling past niet altijd helemaal). */
  focusVak(inp) {
    inp.focus({ preventScroll: true });
    inp.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  focusEerste() {
    const eerste = this.open[0];
    if (eerste) setTimeout(() => this.invoer.get(eerste).focus({ preventScroll: true }), 60);
  }

  waarde(cel) {
    return this.invoer.get(cel)?.value ?? '';
  }

  /** Na het nakijken: goede kolommen worden groen en liggen vast, foute vakjes worden rood. */
  toonResultaat(kijk) {
    this.wisMarkering();
    this.schema.stappen.forEach((stap, i) => {
      const goed = kijk.goedPerStap[i];
      const ingevuld = stap.cellen.some((c) => this.waarde(c) !== '');
      if (goed && (ingevuld || stap.cellen.every((c) => c.verwacht === ''))) {
        for (const c of stap.cellen) this.zetVast(c);
      }
    });
    for (const c of kijk.cellenFout) {
      // Fout ingevuld: rood. Leeg maar moest wel iets in (bijv. een onthoud-cijfer): rood stippellijntje.
      this.invoer.get(c).classList.add(this.waarde(c) !== '' ? 'fout' : 'mist');
    }
    // Cursor op het eerste vakje dat nog niet klopt (in rekenvolgorde).
    const eerste = this.open.find((c) => kijk.cellenFout.includes(c)) ?? this.open[0];
    if (eerste) this.focusVak(this.invoer.get(eerste));
  }

  zetVast(cel) {
    const inp = this.invoer.get(cel);
    inp.classList.remove('fout', 'mist');
    inp.classList.add('goed');
    inp.disabled = true;
  }

  /** De eerste kolom (stap) die nog niet klaar is. */
  huidigeStap() {
    return this.schema.stappen.find((s) => s.cellen.some((c) => !this.invoer.get(c).disabled)) ?? null;
  }

  /** Meester Bram: kleur de vakjes en de kolom van deze stap. */
  markeerStap(stap) {
    this.wisMarkering();
    this.el.querySelector(`.dhte-band[data-k="${stap.k}"]`)?.classList.add('bram');
    for (const c of stap.cellen) this.invoer.get(c).classList.add('bram');
    const eerste = stap.cellen.find((c) => !this.invoer.get(c).disabled);
    if (eerste) this.invoer.get(eerste).focus({ preventScroll: true });
  }

  wisMarkering() {
    this.el.querySelectorAll('.bram').forEach((e) => e.classList.remove('bram'));
  }

  /** Meester Koen: vul deze stap samen in. */
  vulStap(stap) {
    this.wisMarkering();
    for (const c of stap.cellen) {
      const inp = this.invoer.get(c);
      inp.value = c.verwacht;
      inp.classList.add('koen');
      this.zetVast(c);
    }
    const eerste = this.open[0];
    if (eerste) this.invoer.get(eerste).focus({ preventScroll: true });
  }

  blokkeerAlles() {
    for (const inp of this.invoer.values()) inp.disabled = true;
    this.wisMarkering();
  }
}
