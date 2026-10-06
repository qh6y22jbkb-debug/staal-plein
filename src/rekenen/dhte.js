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
  constructor(schema, { kolomNamen, opControleer }) {
    this.schema = schema;
    this.opControleer = opControleer;
    this.invoer = new Map(); // cel → <input>
    this.el = document.createElement('div');
    this.el.className = 'dhte';
    const n = schema.breedte;
    this.el.style.setProperty('--kolommen', n);

    const kolommen = [...Array(n).keys()].reverse(); // links de grootste kolom, rechts de E
    const plek = (rijNr, k) => `grid-row: ${rijNr}; grid-column: ${n - k + 1};`;

    // Kolomkoppen.
    kolommen.forEach((k) => {
      const kop = document.createElement('div');
      kop.className = `dhte-kop k${k}`;
      kop.textContent = kolomNamen[k];
      kop.style.cssText = plek(1, k);
      this.el.appendChild(kop);
    });
    // Gekleurde kolommen op de achtergrond.
    kolommen.forEach((k) => {
      const band = document.createElement('div');
      band.className = `dhte-band k${k}`;
      band.dataset.k = k;
      band.style.cssText = `grid-row: 1 / ${schema.rijen.length + 2}; grid-column: ${n - k + 1};`;
      this.el.appendChild(band);
    });

    schema.rijen.forEach((rij, i) => {
      const rijNr = i + 2;
      const label = document.createElement('div');
      label.className = `dhte-label ${rij.teken ? 'teken' : ''}`;
      label.textContent = rij.teken || rij.label || '';
      label.style.cssText = `grid-row: ${rijNr}; grid-column: 1;`;
      this.el.appendChild(label);
      if (rij.soort === 'lijn') {
        const lijn = document.createElement('div');
        lijn.className = 'dhte-lijn';
        lijn.style.cssText = `grid-row: ${rijNr}; grid-column: 1 / ${n + 2};`;
        this.el.appendChild(lijn);
        return;
      }
      for (const k of kolommen) {
        const cel = rij.cellen[k];
        if (!cel) continue;
        if (!cel.invoer) {
          const c = document.createElement('div');
          c.className = `dhte-cijfer${rij.soort === 'tussen' || rij.soort === 'uitkomst' ? ' vast-invul' : ''}`;
          c.textContent = cel.waarde;
          c.style.cssText = plek(rijNr, k);
          this.el.appendChild(c);
          continue;
        }
        const inp = document.createElement('input');
        inp.className = `dhte-vak ${cel.klein ? 'klein' : 'groot'} ${cel.soort} rij-${rij.soort}`;
        Object.assign(inp, { type: 'text', inputMode: 'numeric', autocomplete: 'off', spellcheck: false });
        inp.setAttribute('pattern', '[0-9]*');
        inp.setAttribute('enterkeyhint', 'done');
        inp.maxLength = cel.soort === 'inwissel' ? 2 : 1;
        inp.setAttribute('aria-label', `${kolomNamen[k]}-kolom, ${cel.soort === 'antwoord' ? 'cijfer' : cel.soort === 'onthoud' ? 'onthoud-cijfer' : 'nieuw getal na inwisselen'}`);
        inp.style.cssText = plek(rijNr, k);
        inp.addEventListener('input', () => this.bijInvoer(cel, inp));
        inp.addEventListener('keydown', (e) => this.bijToets(e, cel, inp));
        inp.addEventListener('focus', () => inp.select());
        this.el.appendChild(inp);
        this.invoer.set(cel, inp);
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
    const vol = inp.value.length >= inp.maxLength || (cel.soort === 'inwissel' && inp.value.length === 1 && inp.value !== '1');
    if (vol) this.focusNa(cel, 1);
  }

  bijToets(e, cel, inp) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation(); // anders telt dezelfde Enter ook als "Volgende"
      this.opControleer?.();
    } else if ((e.key === ' ' || e.code === 'Space') && cel.klein) {
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
    if (i >= 0 && i < volgorde.length) this.invoer.get(volgorde[i]).focus({ preventScroll: true });
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
    const eerste = this.open[0];
    if (eerste) this.invoer.get(eerste).focus({ preventScroll: true });
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
