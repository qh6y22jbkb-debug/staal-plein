import './dhte.css';
import { Minispel, el } from '../minispellen/basis.js';
import { REKEN_INSTELLINGEN, REKEN_REGELS, REKEN_TEKSTEN_SPEL, REKEN_TIPS, KLOK_TEKSTEN } from '../data/rekenen.js';
import { maakKlokVragen, gelijk12 } from './tijd.js';
import { AnalogeKlok } from './klok.js';

const T = KLOK_TEKSTEN;

/**
 * Klaas Klok: klokkijken. Twee spelvormen:
 *  - kies: kies de juiste tijd (of klok) uit 3 opties
 *  - versleep: zet zelf de wijzers van een grote klok goed (muis, vinger of knopjes)
 * Met Brons/Zilver/Goud, munten en de tips van Meester Jop, Bram en Koen.
 */
export class KlokSpel extends Minispel {
  niveauTeken(n) { return REKEN_TEKSTEN_SPEL.niveauNamen[n - 1] ?? ''; }
  get aantalVragen() { return REKEN_INSTELLINGEN.klokVragenPerRonde; }

  maakVragen() {
    return maakKlokVragen(REKEN_REGELS.klok[this.niveau], this.aantalVragen, T);
  }

  voorleesTekst() {
    return this.vraag?.vraag ?? '';
  }

  toonVraag(v) {
    this.vraag = v;
    this.klok = null;
    const wrap = el('div', 'reken-spel');
    const links = el('div', 'klok-spel');
    links.appendChild(el('p', 'klok-vraag', v.vraag));
    if (v.toonKlok) {
      links.appendChild(new AnalogeKlok({ tijd: v.toonKlok }).svg);
    } else if (v.toonTekst && v.soort === 'kies') {
      links.appendChild(el('div', `klok-toon${/[a-z]/.test(v.toonTekst) ? ' woorden' : ''}`, v.toonTekst));
    }

    const rechts = el('div', 'reken-rechts');
    if (v.soort === 'kies') {
      const opties = el('div', 'klok-opties');
      this.optieKnoppen = v.opties.map((o, i) => {
        const knop = el('button', `klok-optie${o.klok ? ' met-klok' : /^\d/.test(o.label) ? ' digitaal' : ''}`);
        knop.type = 'button';
        if (o.klok) {
          knop.appendChild(new AnalogeKlok({ tijd: o.tijd, klein: true }).svg);
          knop.setAttribute('aria-label', `Klok ${i + 1}`);
          knop.appendChild(el('span', 'klok-optie-nr', String(i + 1)));
        } else {
          knop.textContent = o.label;
        }
        knop.addEventListener('click', () => this.kies(o, knop));
        opties.appendChild(knop);
        return knop;
      });
      links.appendChild(opties);
    } else {
      // Grote klok om zelf goed te zetten, met knopjes voor wie liever klikt.
      this.klok = new AnalogeKlok({ tijd: { h: 0, m: 0 }, sleepbaar: true, sleepStap: v.sleepStap, opVerandering: () => this.klok.markeer(null) });
      links.appendChild(this.klok.svg);
      const knoppen = el('div', 'klok-knoppen');
      const knop = (tekst, actie, label) => {
        const b = el('button', '', tekst);
        b.type = 'button';
        b.setAttribute('aria-label', label);
        b.addEventListener('click', actie);
        return b;
      };
      knoppen.append(
        knop('◀', () => this.klok.verschuif('lang', -1), `${T.langeWijzer} terug`), el('span', 'lang-label', T.langeWijzer), knop('▶', () => this.klok.verschuif('lang', 1), `${T.langeWijzer} vooruit`),
        knop('◀', () => this.klok.verschuif('kort', -1), `${T.korteWijzer} terug`), el('span', '', T.korteWijzer), knop('▶', () => this.klok.verschuif('kort', 1), `${T.korteWijzer} vooruit`),
      );
      links.append(knoppen, el('p', 'klok-sleep-uitleg', T.sleepUitleg));
      const controleer = el('button', 'reken-controleer', T.controleer);
      controleer.type = 'button';
      controleer.addEventListener('click', () => this.controleer());
      rechts.appendChild(controleer);
    }

    const tips = el('div', 'reken-tips');
    for (const id of ['jop', 'bram', 'koen']) {
      const t = REKEN_TIPS[id];
      const b = el('button', `reken-tip-knop tip-${id}`, `<span aria-hidden="true">${t.icoon}</span>${t.knop}`);
      b.type = 'button';
      b.addEventListener('click', () => this.tip(id));
      tips.appendChild(b);
    }
    this.tipEl = el('div', 'reken-tip');
    this.tipEl.setAttribute('aria-live', 'polite');
    rechts.append(tips, this.tipEl);
    this.rechts = rechts;
    wrap.append(links, rechts);
    this.inhoud.appendChild(wrap);
    (this.optieKnoppen?.[0] ?? this.klok?.svg)?.focus?.({ preventScroll: true });
  }

  /* ---------- Kiezen uit 3 ---------- */

  kies(optie, knop) {
    if (this.wachtOpVolgende || knop.disabled) return;
    if (optie.goed) {
      knop.classList.add('goed');
      for (const b of this.optieKnoppen) b.disabled = true;
      this.klaarMetVraag(optie.label);
      return;
    }
    knop.classList.add('fout');
    knop.disabled = true;
    this.fout(this.metKoenTip(this.vraag.hint));
    this.toonFeedback();
  }

  /* ---------- Wijzers verslepen ---------- */

  controleer() {
    if (this.wachtOpVolgende || !this.klok) return;
    const t = this.klok.tijd, doel = this.vraag.doel;
    if (gelijk12(t, doel)) {
      this.klaarMetVraag(this.vraag.toonTekst);
      return;
    }
    let hint;
    if (t.m !== doel.m) hint = T.foutLang;
    else hint = `${T.foutKort}${doel.m >= 30 ? ` ${T.foutKortHalf}` : ''}`;
    this.fout(this.metKoenTip(hint));
    this.toonFeedback();
  }

  /* ---------- Gemeenschappelijk ---------- */

  klaarMetVraag(antwoord) {
    this.rechts.hidden = true;
    this.klok?.markeer(null);
    if (this.klok) this.klok.svg.style.pointerEvents = 'none';
    this.goed(`<b>${antwoord}</b>`);
    this.toonFeedback();
  }

  metKoenTip(tekst) {
    return this.pogingen >= 1 ? `${tekst} ${REKEN_TEKSTEN_SPEL.koenTip}` : tekst;
  }

  toonFeedback() {
    requestAnimationFrame(() => this.feedback.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  tip(id) {
    if (this.wachtOpVolgende) return;
    this.geluid?.plop?.();
    const v = this.vraag;
    const meester = REKEN_TIPS[id];
    if (id === 'jop') {
      this.zetTip(meester, { regel: T.jopRegel, 24: T.jop24, duur: T.jopDuur }[v.jop] ?? T.jopRegel);
    } else if (id === 'bram') {
      if (v.soort === 'kies') {
        // Streep een fout antwoord weg.
        const fout = this.optieKnoppen.find((b, i) => !v.opties[i].goed && !b.disabled);
        if (fout) { fout.classList.add('weg'); fout.disabled = true; }
        this.zetTip(meester, T.bramKies);
      } else {
        const t = this.klok.tijd;
        if (t.m !== v.doel.m) { this.klok.markeer('lang'); this.zetTip(meester, T.bramLang); }
        else if (t.h % 12 !== v.doel.h) { this.klok.markeer('kort'); this.zetTip(meester, T.bramKort); }
        else this.zetTip(meester, T.bramKlaar);
      }
    } else if (id === 'koen') {
      // Samen met Meester Koen: hij legt het stap voor stap uit en wijst het antwoord aan.
      // Daarna is de vraag niet meer "in één keer goed" (minder munten, maar nooit minder dan 0).
      if (v.soort === 'kies') {
        const i = v.opties.findIndex((o) => o.goed);
        this.optieKnoppen[i].classList.add('koen');
        this.optieKnoppen[i].focus({ preventScroll: true });
      } else {
        this.klok.zet(v.doel);
        this.klok.markeer(null);
      }
      this.foutDezeVraag = true;
      this.pogingen = Math.max(this.pogingen, 1);
      this.zetTip(meester, v.uitleg);
    }
  }

  zetTip(meester, tekst) {
    this.tipEl.innerHTML = `<b>${meester.icoon} ${meester.naam}</b>${tekst}`;
    this.voorlezen?.zeg(tekst);
  }

  /** Toetsen: 1/2/3 = een antwoord kiezen; pijltjes = wijzers; Enter = controleren. */
  toets(e) {
    const v = this.vraag;
    if (!v) return;
    if (v.soort === 'kies') {
      const n = Minispel.cijfer(e);
      if (n >= 0 && n < this.optieKnoppen.length) this.optieKnoppen[n].click();
      return;
    }
    const acties = { ArrowRight: ['lang', 1], ArrowLeft: ['lang', -1], ArrowUp: ['kort', 1], ArrowDown: ['kort', -1] };
    if (acties[e.code] && e.target?.tagName !== 'BUTTON') {
      e.preventDefault();
      this.klok.verschuif(...acties[e.code]);
    } else if ((e.code === 'Enter' || e.code === 'NumpadEnter') && e.target?.tagName !== 'BUTTON') {
      e.preventDefault();
      this.controleer();
    }
  }
}
