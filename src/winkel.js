import { KLEDING, WINKEL, DANSJES, DANS_TEKSTEN, VERVOER, VERVOER_TEKSTEN } from './data/oefeningen.js';
import { vervoerbezit } from './vervoer.js';
import { dansbezit } from './dansjes.js';
import { rekenvoortgang } from './rekenvoortgang.js';
import { CATEGORIEEN, itemMetId } from './kleding.js';
import { kledingkast } from './kledingkast.js';
import { munten } from './munten.js';
import { voetbalstand } from './voetbal/voetbalstand.js';
import { Paspop } from './ui/paspop.js';

const hex = (k) => `#${k.toString(16).padStart(6, '0')}`;

/** De Bunders Boetiek: kleding kopen en passen. */
export class Winkel {
  constructor(laag, { geluid, voorlezen }) {
    this.laag = laag;
    this.geluid = geluid;
    this.voorlezen = voorlezen;
    this.el = null;
    this.opSluiten = null;
    this.categorie = 'hoofd';
    this.tab = 'kleding';
    this.toetsen = (e) => {
      if (e.code === 'Escape') {
        e.preventDefault();
        if (this.bevestig) this.sluitBevestig();
        else this.sluit();
      }
    };
    munten.opVerandering(() => this.el && this.tekenItems());
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond';
    this.el.innerHTML = `
      <div class="winkel" role="dialog" aria-label="${WINKEL.naam}">
        <header class="wk-kop">
          <span class="wk-logo">👗</span>
          <h2>${WINKEL.naam}</h2>
          <button type="button" class="wk-sluit">✕ ${WINKEL.sluiten}</button>
        </header>
        <div class="wk-welkom"><span class="wk-bo" aria-hidden="true">👩‍🦰</span><span><b>${WINKEL.verkoper}:</b> ${WINKEL.welkom}</span></div>
        <div class="wk-inhoud">
          <div class="wk-paspop"><div class="wk-canvas"></div><div class="wk-pasmelding"></div></div>
          <div class="wk-rechts">
            <div class="wk-categorieen"></div>
            <div class="wk-items"></div>
          </div>
        </div>
      </div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    this.itemsEl = this.el.querySelector('.wk-items');
    this.categorieEl = this.el.querySelector('.wk-categorieen');
    this.pasmelding = this.el.querySelector('.wk-pasmelding');
    this.paspop = new Paspop(this.el.querySelector('.wk-canvas'));
    this.paspop.kleed(kledingkast.aan);
    this.pasId = null;

    this.el.querySelector('.wk-sluit').addEventListener('click', () => this.sluit());
    window.addEventListener('keydown', this.toetsen);
    this.kiesTab('kleding');
    this.voorlezen?.zeg(`${WINKEL.welkom}`, { toonhoogte: 1.3 });
    this.el.querySelector('.wk-sluit').focus({ preventScroll: true });
  }

  kiesTab(tab) {
    this.tab = tab;
    this.categorieEl.innerHTML = [...CATEGORIEEN, 'voetbal', 'dansjes', 'vervoer'].map((c) => `<button type="button" data-cat="${c}" class="${c === this.categorie ? 'actief' : ''}">${WINKEL.categorieen[c]}</button>`).join('');
    this.categorieEl.onclick = (e) => {
      const knop = e.target.closest('button[data-cat]');
      if (!knop) return;
      this.categorie = knop.dataset.cat;
      this.kiesTab('kleding');
    };
    this.tekenItems();
  }

  tekenItems() {
    if (this.tab !== 'kleding') return;
    if (this.categorie === 'dansjes') { this.tekenDansjes(); return; }
    if (this.categorie === 'vervoer') { this.tekenVervoer(); return; }
    if (this.paspop.vervoerId) this.paspop.toonVervoer(null);
    // Het knopje "Voetbal" toont de voetbalitems; de andere knopjes de gewone kleding.
    const items = this.categorie === 'voetbal'
      ? KLEDING.filter((k) => k.groep === 'voetbal')
      : KLEDING.filter((k) => k.categorie === this.categorie && !k.groep);
    this.itemsEl.innerHTML = '';
    for (const item of items) {
      const heeft = kledingkast.heeft(item.id);
      const aan = kledingkast.heeftAan(item.id);
      const tekort = item.prijs - munten.totaal;
      // Sommige items gaan pas open na een prestatie: de Bunders Beker of een volle Rekenkaart.
      const slot = { beker: [!voetbalstand.beker, WINKEL.vereistBeker], rekenkampioen: [!rekenvoortgang.kampioen, WINKEL.vereistRekenkaart] }[item.vereist];
      const opSlot = !!slot?.[0];
      const kaart = document.createElement('div');
      kaart.className = `wk-item${this.pasId === item.id ? ' past' : ''}${heeft ? ' heeft' : ''}`;
      kaart.innerHTML = `
        <div class="wk-icoon" style="--kleur:${hex(heeft ? kledingkast.kleurVan(item.id) : item.kleur)}">${item.icoon}</div>
        <div class="wk-naam">${item.naam}</div>
        <div class="wk-prijs"><span class="munt klein" aria-hidden="true"></span> ${item.prijs}</div>
        <div class="wk-knoppen">
          <button type="button" class="wk-pas">👀 ${WINKEL.pasAan}</button>
          ${heeft
            ? `<button type="button" class="wk-draag${aan ? ' aan' : ''}">${aan ? WINKEL.aan : WINKEL.aantrekken}</button>`
            : opSlot
              ? `<button type="button" class="wk-koop" disabled>${slot[1]}</button>`
              : `<button type="button" class="wk-koop" ${tekort > 0 ? 'disabled' : ''}>${tekort > 0 ? WINKEL.nogNodig.replace('{aantal}', tekort) : `🛒 ${WINKEL.kopen}`}</button>`}
        </div>`;
      kaart.querySelector('.wk-pas').addEventListener('click', () => this.pas(item.id));
      kaart.querySelector('.wk-koop')?.addEventListener('click', () => this.vraagKopen(item));
      kaart.querySelector('.wk-draag')?.addEventListener('click', () => {
        kledingkast.wissel(item.id);
        this.pasId = null;
        this.paspop.kleed(kledingkast.aan);
        this.pasmelding.textContent = '';
        this.tekenItems();
      });
      this.itemsEl.appendChild(kaart);
    }
  }

  /** Tabblad Dansjes: bekijken (het poppetje doet het voor), kopen en kiezen. */
  tekenDansjes() {
    this.itemsEl.innerHTML = `<p class="wk-dans-uitleg">${DANS_TEKSTEN.winkelUitleg}</p>`;
    for (const dans of DANSJES) {
      const heeft = dansbezit.heeft(dans.id);
      const gekozen = dansbezit.gekozen === dans.id;
      const tekort = dans.prijs - munten.totaal;
      const kaart = document.createElement('div');
      kaart.className = `wk-item${heeft ? ' heeft' : ''}`;
      kaart.innerHTML = `
        <div class="wk-icoon" style="--kleur:#f783ac">${dans.icoon}</div>
        <div class="wk-naam">${dans.naam}</div>
        <div class="wk-prijs">${dans.prijs ? `<span class="munt klein" aria-hidden="true"></span> ${dans.prijs}` : DANS_TEKSTEN.gratis}</div>
        <div class="wk-knoppen">
          <button type="button" class="wk-pas">👀 ${DANS_TEKSTEN.bekijk}</button>
          ${heeft
            ? `<button type="button" class="wk-draag${gekozen ? ' aan' : ''}" ${gekozen ? 'disabled' : ''}>${gekozen ? DANS_TEKSTEN.gekozen : DANS_TEKSTEN.kiezen}</button>`
            : `<button type="button" class="wk-koop" ${tekort > 0 ? 'disabled' : ''}>${tekort > 0 ? WINKEL.nogNodig.replace('{aantal}', tekort) : `🛒 ${WINKEL.kopen}`}</button>`}
        </div>`;
      kaart.querySelector('.wk-pas').addEventListener('click', () => { this.paspop.dans(dans.id); this.geluid?.plop(); });
      kaart.querySelector('.wk-koop')?.addEventListener('click', () => this.vraagKopen({ ...dans, kleur: 0xf783ac, soort: 'dans' }));
      kaart.querySelector('.wk-draag')?.addEventListener('click', () => { dansbezit.kies(dans.id); this.paspop.dans(dans.id); this.tekenItems(); });
      this.itemsEl.appendChild(kaart);
    }
  }

  /** Tabblad Vervoer: bekijken (het poppetje staat erop), kopen en kiezen. */
  tekenVervoer() {
    this.itemsEl.innerHTML = `<p class="wk-dans-uitleg">${VERVOER_TEKSTEN.winkelUitleg}</p>`;
    for (const v of VERVOER) {
      const heeft = vervoerbezit.heeft(v.id);
      const gekozen = vervoerbezit.gekozen === v.id;
      const tekort = v.prijs - munten.totaal;
      const kaart = document.createElement('div');
      kaart.className = `wk-item${heeft ? ' heeft' : ''}${this.paspop.vervoerId === v.id ? ' past' : ''}`;
      kaart.innerHTML = `
        <div class="wk-icoon" style="--kleur:${hex(vervoerbezit.kleurVan(v.id))}">${v.icoon}</div>
        <div class="wk-naam">${v.naam}</div>
        <div class="wk-prijs"><span class="munt klein" aria-hidden="true"></span> ${v.prijs}</div>
        <div class="wk-knoppen">
          <button type="button" class="wk-pas">👀 ${VERVOER_TEKSTEN.bekijk}</button>
          ${heeft
            ? `<button type="button" class="wk-draag${gekozen ? ' aan' : ''}" ${gekozen ? 'disabled' : ''}>${gekozen ? VERVOER_TEKSTEN.gekozen : VERVOER_TEKSTEN.kiezen}</button>`
            : `<button type="button" class="wk-koop" ${tekort > 0 ? 'disabled' : ''}>${tekort > 0 ? WINKEL.nogNodig.replace('{aantal}', tekort) : `🛒 ${WINKEL.kopen}`}</button>`}
        </div>`;
      kaart.querySelector('.wk-pas').addEventListener('click', () => {
        // Nog een keer klikken = er weer af.
        this.paspop.toonVervoer(this.paspop.vervoerId === v.id ? null : v.id, vervoerbezit.kleurVan(v.id));
        this.geluid?.plop();
        this.tekenItems();
      });
      kaart.querySelector('.wk-koop')?.addEventListener('click', () => this.vraagKopen({ ...v, kleur: vervoerbezit.kleurVan(v.id), soort: 'vervoer' }));
      kaart.querySelector('.wk-draag')?.addEventListener('click', () => {
        vervoerbezit.kies(v.id);
        this.paspop.toonVervoer(v.id, vervoerbezit.kleurVan(v.id));
        this.tekenItems();
      });
      this.itemsEl.appendChild(kaart);
    }
  }

  /** Even passen (nog niet kopen). Nog een keer klikken = weer uit. */
  pas(id) {
    if (this.pasId === id) {
      this.pasId = null;
      this.paspop.kleed(kledingkast.aan);
      this.pasmelding.textContent = '';
    } else {
      this.pasId = id;
      this.paspop.kleed(kledingkast.metPasItem(id));
      this.pasmelding.textContent = WINKEL.uitproberen.replace('{naam}', itemMetId(id).naam);
      this.geluid?.plop();
    }
    this.tekenItems();
  }

  vraagKopen(item) {
    this.bevestig = document.createElement('div');
    this.bevestig.className = 'bevestig-achtergrond';
    this.bevestig.innerHTML = `
      <div class="bevestig" role="alertdialog">
        <div class="wk-icoon groot" style="--kleur:${hex(item.kleur)}">${item.icoon}</div>
        <p>${WINKEL.zekerVraag.replace('{naam}', `<b>${item.naam}</b>`).replace('{prijs}', item.prijs)}</p>
        <div>
          <button type="button" class="nee">${WINKEL.nee}</button>
          <button type="button" class="ja ja-groen">${WINKEL.ja}</button>
        </div>
      </div>`;
    this.el.appendChild(this.bevestig);
    this.bevestig.querySelector('.nee').addEventListener('click', () => this.sluitBevestig());
    this.bevestig.querySelector('.ja').addEventListener('click', () => { this.sluitBevestig(); this.koop(item); });
    this.bevestig.querySelector('.ja').focus();
    this.voorlezen?.zeg(this.bevestig.querySelector('p').textContent);
  }

  sluitBevestig() {
    this.bevestig?.remove();
    this.bevestig = null;
  }

  koop(item) {
    if (!munten.geefUit(item.prijs)) return;
    if (item.soort === 'vervoer') {
      vervoerbezit.koop(item.id);
      this.paspop.toonVervoer(item.id, vervoerbezit.kleurVan(item.id));
      this.geluid?.klaar();
      const tekst = VERVOER_TEKSTEN.gekocht.replace('{naam}', item.naam.toLowerCase());
      this.pasmelding.textContent = `🎉 ${tekst}`;
      this.voorlezen?.zeg(tekst, { toonhoogte: 1.3 });
      this.tekenItems();
      return;
    }
    if (item.soort === 'dans') {
      dansbezit.koop(item.id);
      this.paspop.dans(item.id);
      this.geluid?.klaar();
      const tekst = DANS_TEKSTEN.gekocht.replace('{naam}', item.naam);
      this.pasmelding.textContent = `🎉 ${tekst}`;
      this.voorlezen?.zeg(tekst, { toonhoogte: 1.3 });
      this.tekenItems();
      return;
    }
    kledingkast.koop(item.id);
    this.pasId = null;
    this.paspop.kleed(kledingkast.aan);
    this.paspop.juich();
    this.geluid?.klaar();
    const tekst = WINKEL.bedankt.replace('{naam}', item.naam);
    this.pasmelding.textContent = `🎉 ${tekst}`;
    this.voorlezen?.zeg(tekst, { toonhoogte: 1.3 });
    this.tekenItems();
  }

  sluit() {
    if (!this.el) return;
    this.sluitBevestig();
    this.voorlezen?.stop();
    window.removeEventListener('keydown', this.toetsen);
    this.paspop.sluit();
    this.el.remove();
    this.el = null;
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
  }
}
