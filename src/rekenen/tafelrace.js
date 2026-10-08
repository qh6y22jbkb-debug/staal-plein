import './dhte.css';
import './tafelrace.css';
import { Minispel, el } from '../minispellen/basis.js';
import { REKEN_INSTELLINGEN, REKEN_REGELS, REKEN_TEKSTEN_SPEL, REKEN_TIPS, TAFEL_TEKSTEN } from '../data/rekenen.js';
import { maakTafelSommen, antwoordGoed, uitlegTafel, tafelRij, Tempo } from './tafels.js';

const T = TAFEL_TEKSTEN;
const vul = (tekst, som) => tekst.replace(/\{tafel\}/g, som.tafel).replace(/\{getal\}/g, som.getal).replace(/\{som\}/g, som.vraag);

/**
 * Tijn Tafel: de tafelrace. Kies één tafel of "Alle tafels door elkaar".
 * Elk goed antwoord laat jouw renner een stuk verder rennen; Tijn rent ook, op een tempo dat
 * zich aanpast aan jou (zie Tempo in tafels.js). Bij een fout of een tip wacht Tijn even.
 */
export class TafelraceSpel extends Minispel {
  niveauTeken(n) { return REKEN_TEKSTEN_SPEL.niveauNamen[n - 1] ?? ''; }
  get aantalVragen() { return REKEN_INSTELLINGEN.tafelVragenPerRonde; }
  get regels() { return REKEN_REGELS.tafel[this.niveau]; }

  /* ---------- Eerst kiezen: één tafel of alles door elkaar ---------- */

  toonNiveauKeuze() {
    this.tafelKeuze = undefined;
    super.toonNiveauKeuze();
  }

  beginRonde(niveau) {
    if (this.tafelKeuze === undefined || this.keuzeNiveau !== niveau) {
      this.toonTafelKeuze(niveau);
      return;
    }
    super.beginRonde(niveau);
  }

  toonTafelKeuze(niveau) {
    if (niveau > this.hoogsteOpen) return;
    this.niveau = niveau;
    this.kiesModus = false;
    this.bouwVenster(false);
    this.opdrachtEl.textContent = T.kiesTafel;
    const r = REKEN_REGELS.tafel[niveau];
    const rij = el('div', 'tafel-keuzes');
    const kies = (keuze) => { this.tafelKeuze = keuze; this.keuzeNiveau = niveau; this.beginRonde(niveau); };
    for (const t of r.tafels) {
      const b = el('button', 'tafel-keuze', `<b>${t}</b><span>${T.tafelVan.replace('{tafel}', t)}</span>`);
      b.type = 'button';
      b.addEventListener('click', () => kies(t));
      rij.appendChild(b);
    }
    const alles = el('button', 'tafel-keuze alles', `<b>🔀</b><span>${T.alles}</span><small>${r.doorElkaar.length === 10 ? '1 t/m 10' : r.doorElkaar.join(', ')}</small>`);
    alles.type = 'button';
    alles.addEventListener('click', () => kies(null));
    rij.appendChild(alles);
    this.inhoud.appendChild(rij);
    rij.firstChild.focus({ preventScroll: true });
  }

  maakVragen() {
    return maakTafelSommen(this.regels, this.tafelKeuze, this.aantalVragen);
  }

  /* ---------- De race ---------- */

  bouwVenster(metVoortgang) {
    super.bouwVenster(metVoortgang);
    if (!metVoortgang) return;
    // Renbaan met twee banen, bovenaan in het venster.
    this.baan = el('div', 'race');
    this.baan.innerHTML = `
      <div class="race-baan jij"><span class="race-naam">${T.jij}</span><div class="race-spoor"><span class="race-renner jij" aria-hidden="true">🏃</span></div><span class="race-finish" aria-hidden="true">🏁</span></div>
      <div class="race-baan tijn"><span class="race-naam">${T.tegenstander}</span><div class="race-spoor"><span class="race-renner tijn" aria-hidden="true">🏃</span></div><span class="race-finish" aria-hidden="true">🏁</span></div>`;
    this.kaart.querySelector('.ms-voortgang').replaceWith(this.baan);
    this.bolletjes = []; // de renbaan vervangt de voortgangsbolletjes
    this.rennerJij = this.baan.querySelector('.race-renner.jij');
    this.rennerTijn = this.baan.querySelector('.race-renner.tijn');
    this.tempo = new Tempo(this.aantalVragen);
    this.gestart = false;
    this.winnaar = null;
    this.stopSpel?.();
    let vorige = performance.now();
    const lus = (nu) => {
      const dt = Math.min(0.1, (nu - vorige) / 1000);
      vorige = nu;
      if (this.gestart && !this.winnaar) {
        const pos = this.tempo.update(dt, this.nr);
        if (this.tempo.klaar && this.nr < this.aantalVragen) this.winnaar = 'tijn';
        this.zetRenner(this.rennerTijn, pos);
      }
      this.raf = requestAnimationFrame(lus);
    };
    this.raf = requestAnimationFrame(lus);
  }

  stopSpel() {
    cancelAnimationFrame(this.raf);
    clearTimeout(this.doorTimer);
  }

  sluit() {
    this.stopSpel();
    super.sluit();
  }

  zetRenner(renner, positie) {
    renner.style.left = `calc(${(positie / this.aantalVragen) * 100}% - ${(positie / this.aantalVragen) * 44}px)`;
  }

  volgendeVraag() {
    clearTimeout(this.doorTimer); // (Enter kan ook al "Volgende" zijn)
    super.volgendeVraag();
  }

  voorleesTekst() {
    if (!this.som) return '';
    return this.som.soort === 'deel' ? `${this.som.getal} gedeeld door ${this.som.tafel}` : `${this.som.a} keer ${this.som.tafel}`;
  }

  toonVraag(som) {
    this.som = som;
    this.vraagStart = performance.now();
    this.gestart = true;
    const wrap = el('div', 'reken-spel');
    const links = el('div', 'tafel-links');
    links.appendChild(el('div', 'tafel-teller', T.teller.replace('{nr}', this.nr + 1).replace('{totaal}', this.aantalVragen)));
    links.appendChild(el('div', 'tafel-som', `${som.vraag} = ?`));
    this.invoerDeel = this.maakInvoer((tekst) => this.controleer(tekst));
    this.invoerDeel.invoer.inputMode = 'numeric';
    this.invoerDeel.invoer.setAttribute('pattern', '[0-9]*');
    this.invoerDeel.invoer.placeholder = '?';
    this.invoerDeel.invoer.maxLength = 3;
    this.invoerDeel.invoer.classList.add('tafel-invoer');
    links.appendChild(this.invoerDeel.rij);
    this.rijEl = el('div', 'tafel-rij');
    links.appendChild(this.rijEl);

    const rechts = el('div', 'reken-rechts');
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
    wrap.append(links, rechts);
    this.inhoud.appendChild(wrap);
  }

  controleer(tekst) {
    if (this.wachtOpVolgende || this.nr >= this.aantalVragen) return;
    if (antwoordGoed(this.som, tekst)) {
      this.tempo.registreer((performance.now() - this.vraagStart) / 1000);
      this.invoerDeel.invoer.disabled = true;
      this.invoerDeel.knop.disabled = true;
      this.goed(`${this.som.vraag} = <b>${this.som.antwoord}</b>`, { automatisch: true });
      this.zetRenner(this.rennerJij, this.nr);
      this.rennerJij.classList.remove('sprint');
      void this.rennerJij.offsetWidth;
      this.rennerJij.classList.add('sprint');
      if (this.nr >= this.aantalVragen && !this.winnaar) this.winnaar = 'jij';
      this.wachtOpVolgende = true; // even de felicitatie laten zien, dan vanzelf door
      clearTimeout(this.doorTimer);
      this.doorTimer = setTimeout(() => this.volgendeVraag(), 900);
      return;
    }
    this.tempo.wacht(3); // Tijn wacht even: geen straf voor een fout
    this.invoerDeel.invoer.select();
    this.fout(this.metKoenTip(`${T.fout} ${vul(this.som.soort === 'deel' ? T.foutDeel : T.foutKeer, this.som)}`));
  }

  metKoenTip(tekst) {
    return this.pogingen >= 2 ? `${tekst} ${REKEN_TEKSTEN_SPEL.koenTip}` : tekst;
  }

  tip(id) {
    if (this.wachtOpVolgende) return;
    this.geluid?.plop?.();
    const som = this.som;
    const meester = REKEN_TIPS[id];
    this.tempo.wacht(5); // Tijn wacht terwijl je de tip leest
    if (id === 'jop') {
      this.zetTip(meester, vul(som.soort === 'deel' ? T.jopDeel : T.jopKeer, som));
    } else if (id === 'bram') {
      // De tafelrij tot aan het antwoord; het laatste (gele) vakje is het antwoord.
      const rij = tafelRij(som);
      this.rijEl.innerHTML = rij.map((g, i) => {
        const laatste = i === rij.length - 1;
        if (som.soort === 'deel') return `<span class="${laatste ? 'doel' : ''}"><small>${i + 1}×</small>${g}</span>`;
        return `<span class="${laatste ? 'doel' : ''}"><small>${i + 1}×</small>${laatste ? '?' : g}</span>`;
      }).join('');
      this.zetTip(meester, vul(som.soort === 'deel' ? T.bramDeel : T.bramKeer, som));
    } else if (id === 'koen') {
      // Samen met Meester Koen: hij rekent het voor en zet het antwoord in het vakje (minder munten, nooit minder dan 0).
      this.foutDezeVraag = true;
      this.pogingen = Math.max(this.pogingen, 1);
      this.tempo.wacht(8);
      this.invoerDeel.invoer.value = String(som.antwoord);
      this.invoerDeel.invoer.focus({ preventScroll: true });
      this.zetTip(meester, uitlegTafel(som));
    }
    this.invoerDeel.invoer.focus({ preventScroll: true });
  }

  zetTip(meester, tekst) {
    this.tipEl.innerHTML = `<b>${meester.icoon} ${meester.naam}</b>${tekst}`;
    this.voorlezen?.zeg(tekst.replace(/×/g, ' keer ').replace(/ : /g, ' gedeeld door ').replace(/−/g, ' min '));
  }

  /** Einde: wie was het eerst bij de finish? */
  klaar() {
    super.klaar();
    const tekst = this.winnaar === 'tijn' ? T.verloren : T.gewonnen;
    this.inhoud.querySelector('.ms-klaar p')?.insertAdjacentHTML('beforebegin', `<p class="race-uitslag ${this.winnaar === 'tijn' ? 'tijn' : 'jij'}">${tekst}</p>`);
  }
}
