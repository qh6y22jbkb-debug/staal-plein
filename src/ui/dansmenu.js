import { DANS_TEKSTEN, DANSJES } from '../data/oefeningen.js';
import { dansbezit } from '../dansjes.js';

/**
 * Klein dansmenu onderin: je gekochte dansjes, met een cijfer ervoor.
 * Toetsenbord: M vasthouden en een cijfer indrukken. Touchscreen: tik op een dansje.
 */
export class Dansmenu {
  constructor(laag, { isTouch }) {
    this.isTouch = isTouch;
    this.el = document.createElement('div');
    this.el.className = 'dansmenu';
    this.el.setAttribute('role', 'menu');
    laag.appendChild(this.el);
    this.opKies = null;
    this.el.addEventListener('pointerdown', (e) => {
      const knop = e.target.closest('button[data-id]');
      if (!knop) return;
      e.preventDefault();
      e.stopPropagation();
      this.opKies?.(knop.dataset.id);
    });
  }

  get open() { return this.el.classList.contains('zichtbaar'); }

  toon() {
    const eigen = dansbezit.gekocht;
    this.el.innerHTML = `
      <div class="dm-titel">💃 ${DANS_TEKSTEN.menuTitel}</div>
      <div class="dm-knoppen">
        ${eigen.map((d, i) => `<button type="button" data-id="${d.id}" class="${d.id === dansbezit.gekozen ? 'gekozen' : ''}">${this.isTouch ? '' : `<span class="sneltoets">${i + 1}</span>`}<span class="dm-icoon">${d.icoon}</span>${d.naam}</button>`).join('')}
      </div>
      <div class="dm-uitleg">${eigen.length < DANSJES.length ? DANS_TEKSTEN.menuMeer : (this.isTouch ? DANS_TEKSTEN.menuUitlegTouch : DANS_TEKSTEN.menuUitleg)}</div>`;
    this.el.classList.add('zichtbaar');
  }

  verberg() {
    this.el.classList.remove('zichtbaar');
  }

  /** Dansje bij cijfertoets n (0 = eerste), of null. */
  dansBijCijfer(n) {
    return dansbezit.gekocht[n]?.id ?? null;
  }
}
