import { Minispel, el } from '../minispellen/basis.js';
import { REKEN_INSTELLINGEN, REKEN_REGELS, REKEN_TEKSTEN_SPEL, REKEN_TIPS, REKEN_FOUT } from '../data/rekenen.js';
import { maakSommen } from './sommen.js';
import { bouwSchema, kijkNa, TEKEN } from './schema.js';
import { DhteSchema } from './dhte.js';

const T = REKEN_TEKSTEN_SPEL;
const GESPROKEN = { plus: 'plus', min: 'min', keer: 'keer' };

/** Rekentekens uitspreekbaar maken voor de voorleesstem. */
export function spreekbaar(tekst) {
  return tekst.replace(/−/g, ' min ').replace(/×/g, ' keer ').replace(/(\d) : (\d)/g, '$1 gedeeld door $2');
}

/**
 * Rekenspel met het verkorte DHTE-schema: Pim Plus, Mila Min en Kees Keer.
 * Gebouwd op hetzelfde minispel als de taalkramen (niveaus, munten, hints, overzicht),
 * met Brons/Zilver/Goud en de tips van Meester Jop, Bram en Koen.
 */
export class DhteSpel extends Minispel {
  get soort() { return this.kraam.data.id; }
  niveauTeken(n) { return T.niveauNamen[n - 1] ?? ''; }
  get aantalVragen() { return REKEN_INSTELLINGEN.sommenPerRonde; }

  maakVragen() {
    return maakSommen(this.soort, REKEN_REGELS[this.soort][this.niveau], this.aantalVragen);
  }

  somTekst(som) {
    return som.getallen.join(` ${TEKEN[som.soort]} `);
  }

  voorleesTekst() {
    return this.som ? this.som.getallen.join(` ${GESPROKEN[this.som.soort]} `) : '';
  }

  toonVraag(som) {
    this.som = som;
    this.schema = bouwSchema(som, REKEN_INSTELLINGEN, T.kolommen);
    const wrap = el('div', 'reken-spel');
    const links = el('div', 'reken-links');
    links.appendChild(el('p', 'reken-som', `${this.somTekst(som)} = ?`));
    this.dhte = new DhteSchema(this.schema, { kolomNamen: T.kolommen, opControleer: () => this.controleer() });
    links.appendChild(this.dhte.el);
    links.appendChild(el('p', 'reken-uitleg', som.soort === 'min' ? T.overslaanInwissel : T.overslaanOnthoud));
    const rechts = el('div', 'reken-rechts');
    const controleer = el('button', 'reken-controleer', '✓ Controleer');
    controleer.type = 'button';
    controleer.addEventListener('click', () => this.controleer());
    const tips = el('div', 'reken-tips');
    for (const id of ['jop', 'bram', 'koen']) {
      const t = REKEN_TIPS[id];
      const knop = el('button', `reken-tip-knop tip-${id}`, `<span aria-hidden="true">${t.icoon}</span>${t.knop}`);
      knop.type = 'button';
      knop.addEventListener('click', () => this.tip(id));
      tips.appendChild(knop);
    }
    this.tipEl = el('div', 'reken-tip');
    this.tipEl.setAttribute('aria-live', 'polite');
    rechts.append(controleer, tips, this.tipEl);
    this.rechts = rechts;
    wrap.append(links, rechts);
    this.inhoud.appendChild(wrap);
    this.dhte.focusEerste();
  }

  controleer() {
    if (this.wachtOpVolgende || !this.dhte) return;
    const kijk = kijkNa(this.schema, (c) => this.dhte.waarde(c));
    this.dhte.toonResultaat(kijk);
    if (kijk.allesGoed) {
      this.dhte.blokkeerAlles();
      this.rechts.hidden = true; // knoppen weg: zo staan de felicitatie en "Volgende" goed in beeld
      this.goed(`${this.somTekst(this.som)} = <b>${this.som.antwoord}</b>`);
      this.toonFeedback();
      return;
    }
    // Alleen nog lege vakjes, niets fout ingevuld? Dan is dat geen fout: eerst alles invullen.
    const foutIngevuld = kijk.cellenFout.some((c) => this.dhte.waarde(c) !== '');
    if (kijk.onvolledig && !foutIngevuld) {
      this.feedback.className = 'ms-feedback ms-bijna';
      this.feedback.innerHTML = `<span>${T.vulAlles}</span>`;
      this.voorlezen?.zeg(T.vulAlles);
      this.toonFeedback();
      return;
    }
    this.fout(this.hint(kijk));
    this.toonFeedback();
  }

  /** Zorg dat de melding onder het schema in beeld is (ook op een klein scherm). */
  toonFeedback() {
    requestAnimationFrame(() => this.feedback.scrollIntoView({ block: 'nearest', behavior: 'smooth' }));
  }

  /** Vriendelijke hint over de eerste kolom (van rechts) waar het misgaat. */
  hint(kijk) {
    const stap = this.schema.stappen.find((s) => !kijk.goedPerStap[s.nr]);
    const fouteCel = kijk.cellenFout.find((c) => c.stap === stap.nr);
    const fase = { keer: this.som.getallen[1] >= 10 ? REKEN_FOUT.regel1 : '', keerRegel2: REKEN_FOUT.regel2, keerOptellen: REKEN_FOUT.optellen }[stap.fase] ?? '';
    let tekst;
    if (fouteCel?.soort === 'onthoud') tekst = REKEN_FOUT.onthoud.replace('{kolom}', T.kolommen[fouteCel.k]);
    else if (fouteCel?.soort === 'inwissel') tekst = REKEN_FOUT.inwissel.replace('{kolom}', T.kolommen[fouteCel.k]);
    else {
      const uitleg = stap.fase === 'min' ? REKEN_FOUT.min : stap.fase === 'plus' || stap.fase === 'keerOptellen' ? REKEN_FOUT.plus : REKEN_FOUT.keer;
      tekst = `${REKEN_FOUT.kolom.replace('{kolom}', stap.kolom)} ${uitleg}`;
    }
    if (fase) tekst = fase + tekst.charAt(0).toLowerCase() + tekst.slice(1);
    if (this.pogingen >= 1) tekst += ` ${T.koenTip}`; // vanaf de tweede fout
    return tekst;
  }

  /** De tips van de drie meesters. */
  tip(id) {
    if (this.wachtOpVolgende || !this.dhte) return;
    this.geluid?.plop?.();
    const stap = this.dhte.huidigeStap();
    const meester = REKEN_TIPS[id];
    if (!stap) { this.zetTip(meester, T.alles); return; }
    if (id === 'jop') {
      const regel = REKEN_TIPS.jop.regels[stap.regel] ?? REKEN_TIPS.jop.regels[stap.fase] ?? '';
      this.zetTip(meester, regel.replace('{kolom}', stap.kolom));
    } else if (id === 'bram') {
      this.dhte.markeerStap(stap);
      this.zetTip(meester, meester.tekst);
    } else if (id === 'koen') {
      // Samen rekenen: Meester Koen vult deze kolom in en legt uit hoe het gaat.
      // Daarna is de som niet meer "in één keer goed" en geeft hij minder munten (nooit minder dan 0).
      this.dhte.vulStap(stap);
      this.foutDezeVraag = true;
      this.pogingen = Math.max(this.pogingen, 1);
      this.zetTip(meester, stap.uitleg);
    }
  }

  zetTip(meester, tekst) {
    if (!meester) { this.tipEl.innerHTML = ''; return; }
    this.tipEl.innerHTML = `<b>${meester.icoon} ${meester.naam}</b>${tekst}`;
    this.voorlezen?.zeg(spreekbaar(tekst));
  }
}
