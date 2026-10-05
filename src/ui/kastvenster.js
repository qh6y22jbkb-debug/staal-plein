import { WINKEL } from '../data/oefeningen.js';
import { CATEGORIEEN, itemMetId } from '../kleding.js';
import { kledingkast } from '../kledingkast.js';
import { Paspop } from './paspop.js';

const hex = (k) => `#${k.toString(16).padStart(6, '0')}`;

/** De kledingkast: je draaiende poppetje en al je gekochte kleding om aan en uit te trekken. */
export class Kastvenster {
  constructor(laag, { geluid }) {
    this.laag = laag;
    this.geluid = geluid;
    this.el = null;
    this.opSluiten = null;
    this.toetsen = (e) => {
      if (e.code === 'Escape' || e.code === 'KeyK') {
        e.preventDefault();
        this.sluit();
      }
    };
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond';
    this.el.innerHTML = `
      <div class="winkel kast" role="dialog" aria-label="${WINKEL.kast}">
        <header class="wk-kop">
          <span class="wk-logo">🚪</span>
          <h2>${WINKEL.kast}</h2>
          <button type="button" class="wk-sluit">✕ ${WINKEL.sluiten}</button>
        </header>
        <div class="wk-inhoud">
          <div class="wk-paspop"><div class="wk-canvas"></div></div>
          <div class="wk-rechts"><p class="kast-uitleg"></p><div class="kast-lijst"></div></div>
        </div>
      </div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    this.paspop = new Paspop(this.el.querySelector('.wk-canvas'));
    this.paspop.kleed(kledingkast.aan);
    this.el.querySelector('.wk-sluit').addEventListener('click', () => this.sluit());
    // Even wachten met de K-toets, anders sluit hij meteen weer.
    setTimeout(() => window.addEventListener('keydown', this.toetsen), 50);
    this.teken();
    this.el.querySelector('.wk-sluit').focus({ preventScroll: true });
  }

  teken() {
    const lijst = this.el.querySelector('.kast-lijst');
    const uitleg = this.el.querySelector('.kast-uitleg');
    const gekocht = kledingkast.gekocht.map(itemMetId).filter(Boolean);
    if (!gekocht.length) {
      uitleg.textContent = '';
      lijst.innerHTML = `<p class="wk-binnenkort">👕 ${WINKEL.kastLeeg}</p>`;
      return;
    }
    uitleg.textContent = WINKEL.kastUitleg;
    lijst.innerHTML = '';
    for (const cat of CATEGORIEEN) {
      const items = gekocht.filter((i) => i.categorie === cat);
      if (!items.length) continue;
      const rij = document.createElement('div');
      rij.className = 'kast-rij';
      rij.innerHTML = `<h3>${WINKEL.categorieen[cat]}</h3>`;
      const vakken = document.createElement('div');
      vakken.className = 'kast-vakken';
      for (const item of items) {
        const aan = kledingkast.heeftAan(item.id);
        const knop = document.createElement('button');
        knop.type = 'button';
        knop.className = `kast-item${aan ? ' aan' : ''}`;
        knop.innerHTML = `<span class="wk-icoon" style="--kleur:${hex(item.kleur)}">${item.icoon}</span><span>${item.naam}</span><small>${aan ? WINKEL.uittrekken : WINKEL.aantrekken}</small>`;
        knop.addEventListener('click', () => {
          kledingkast.wissel(item.id);
          this.paspop.kleed(kledingkast.aan);
          this.geluid?.plop();
          this.teken();
        });
        vakken.appendChild(knop);
      }
      rij.appendChild(vakken);
      lijst.appendChild(rij);
    }
  }

  sluit() {
    if (!this.el) return;
    window.removeEventListener('keydown', this.toetsen);
    this.paspop.sluit();
    this.el.remove();
    this.el = null;
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
  }
}
