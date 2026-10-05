import { munten } from '../munten.js';

/**
 * Muntenteller rechtsboven met een draaiend muntje.
 * Bij een beloning vliegen muntjes naar de teller, met een "kling".
 */
export class Muntenteller {
  constructor(geluid) {
    this.geluid = geluid;
    this.el = document.createElement('div');
    this.el.className = 'muntenteller';
    this.el.setAttribute('aria-live', 'polite');
    this.el.innerHTML = '<span class="munt draait" aria-hidden="true"></span><span class="mt-getal">0</span>';
    document.body.appendChild(this.el);
    this.getalEl = this.el.querySelector('.mt-getal');
    this.getoond = munten.totaal;
    this.toon(this.getoond);
    this.title();
    // Als er van buitenaf iets verandert (winkel, opnieuw beginnen): meteen bijwerken.
    this.onderweg = 0;
    munten.opVerandering((n) => { if (!this.onderweg) { this.getoond = n; this.toon(n); } this.title(); });
  }

  title() {
    this.el.title = `Je hebt ${munten.totaal} munten`;
  }

  toon(n) {
    this.getalEl.textContent = n;
  }

  /**
   * Geeft munten en laat ze naar de teller vliegen.
   * @param aantal  aantal munten
   * @param van     element (of {x, y}) waar de muntjes vandaan komen
   * @param label   korte tekst die even zweeft, bijv. "+10"
   */
  beloon(aantal, van, label) {
    if (aantal <= 0) return;
    this.onderweg++; // eerst ophogen: dan telt het getal mee met de vliegende muntjes
    munten.voegToe(aantal);
    const start = this.punt(van);
    const doel = this.punt(this.el.querySelector('.munt'));
    this.zweefLabel(label ?? `+${aantal}`, start);

    const aantalMuntjes = Math.min(8, Math.max(2, Math.round(aantal / 3)));
    let aangekomen = 0;
    for (let i = 0; i < aantalMuntjes; i++) {
      const m = document.createElement('span');
      m.className = 'munt vliegend';
      document.body.appendChild(m);
      const dx = (Math.random() - 0.5) * 80, dy = (Math.random() - 0.5) * 50;
      const anim = m.animate([
        { transform: `translate(${start.x - 14}px, ${start.y - 14}px) scale(.6)`, opacity: 0 },
        { transform: `translate(${start.x - 14 + dx}px, ${start.y - 14 + dy}px) scale(1.1)`, opacity: 1, offset: 0.25 },
        { transform: `translate(${doel.x - 14}px, ${doel.y - 14}px) scale(.8)`, opacity: 1 },
      ], { duration: 700 + i * 70, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' });
      anim.onfinish = () => {
        m.remove();
        aangekomen++;
        // Getal telt op terwijl de muntjes binnenkomen.
        const deel = Math.round((aantal * aangekomen) / aantalMuntjes);
        this.toon(this.getoond + deel);
        if (aangekomen % 2 === 1 || aangekomen === aantalMuntjes) this.geluid?.kling();
        this.el.classList.remove('hup');
        void this.el.offsetWidth;
        this.el.classList.add('hup');
        if (aangekomen === aantalMuntjes) {
          this.getoond += aantal;
          this.onderweg--;
          if (!this.onderweg) { this.getoond = munten.totaal; this.toon(this.getoond); }
        }
      };
    }
  }

  punt(van) {
    // Geen startpunt, of het element staat niet meer in beeld: vanuit het midden.
    if (!van || (van instanceof Element && !van.isConnected)) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    if ('x' in van && 'y' in van && !(van instanceof Element)) return van;
    const r = van.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  zweefLabel(tekst, p) {
    const l = document.createElement('div');
    l.className = 'munt-label';
    l.textContent = tekst;
    l.style.left = `${p.x}px`;
    l.style.top = `${p.y}px`;
    document.body.appendChild(l);
    setTimeout(() => l.remove(), 1300);
  }
}
