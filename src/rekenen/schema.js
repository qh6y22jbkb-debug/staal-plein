import { cijfersVan } from './sommen.js';

/*
 * Het verkorte DHTE-schema als gegevens (zonder scherm), voor plus, min en keer.
 *
 * Een schema bestaat uit:
 *  rijen   van boven naar beneden: onthoud-/inwisselvakjes, getallen, streep, tussenregels, uitkomst
 *  cellen  per rij en kolom (k = 0 is de E, 1 de T, 2 de H, ...). Een cel is vast (cijfer van de som)
 *          of een invulvakje met het juiste antwoord ('verwacht').
 *  stappen in de volgorde waarin je rekent: kolom voor kolom van rechts naar links.
 *          Elke stap weet welke vakjes erbij horen en wat Meester Koen erbij uitlegt.
 */

export const TEKEN = { plus: '+', min: '−', keer: '×' };

export function bouwSchema(som, instellingen, kolomNamen) {
  const b = new Bouwer(som, instellingen, kolomNamen);
  if (som.soort === 'plus') b.plus();
  else if (som.soort === 'min') b.min();
  else if (som.soort === 'keer') {
    if (som.getallen[1] >= 10) b.keerTweeCijfers();
    else b.keerEenCijfer();
  }
  return b.klaar();
}

class Bouwer {
  constructor(som, inst, kolomNamen) {
    this.som = som;
    this.inst = inst;
    this.kolomNamen = kolomNamen;
    this.rijen = [];
    this.stappen = [];
    this.cellen = [];
    this.breedte = String(som.antwoord).length;
    for (const g of som.getallen) this.breedte = Math.max(this.breedte, String(g).length);
  }

  kol(k) { return this.kolomNamen[k] ?? `kolom ${k + 1}`; }

  rij(id, soort, { teken = '', label = '' } = {}) {
    const r = { id, soort, teken, label, cellen: {} };
    this.rijen.push(r);
    return r;
  }

  /** Vast cijfer (uit de som). */
  vast(rij, k, waarde) {
    rij.cellen[k] = { id: `${rij.id}-${k}`, rij: rij.id, k, invoer: false, waarde: String(waarde) };
  }

  /** Invulvakje. soort: 'antwoord' (cijfer van een uitkomst of tussenregel), 'onthoud' of 'inwissel'. */
  vak(rij, k, soort, verwacht, { alsOok = [] } = {}) {
    const klein = soort !== 'antwoord';
    // Een leeg onthoud-vakje mag ook een 0 zijn. Als onthouden niet verplicht is, mag het altijd leeg blijven.
    const leegMag = verwacht === '' || (klein && !this.inst.onthoudVerplicht);
    const cel = { id: `${rij.id}-${k}`, rij: rij.id, k, invoer: true, soort, klein, verwacht: String(verwacht), leegMag, alsOok };
    rij.cellen[k] = cel;
    this.cellen.push(cel);
    return cel;
  }

  stap(fase, k, cellen, uitleg, regel) {
    const s = { nr: this.stappen.length, fase, k, kolom: this.kol(k), cellen, uitleg, regel };
    for (const c of cellen) c.stap = s.nr;
    this.stappen.push(s);
    return s;
  }

  getalRij(id, getal, opties) {
    const r = this.rij(id, 'getal', opties);
    cijfersVan(getal).forEach((d, k) => this.vast(r, k, d));
    return r;
  }

  /* ---------- Optellen ---------- */

  plus() {
    const G = this.som.getallen;
    const onthoud = this.rij('onthoud', 'onthoud');
    const getalRijen = G.map((g, i) => this.getalRij(`getal${i}`, g, { teken: i === G.length - 1 ? TEKEN.plus : '' }));
    if (this.inst.onthoudPlek === 'onder') this.verplaatsNaar(onthoud, getalRijen.at(-1));
    this.rij('lijn', 'lijn');
    const uitkomst = this.rij('uitkomst', 'uitkomst');
    this.plusStappen('plus', G, onthoud, uitkomst);
  }

  /** Optellen kolom voor kolom (ook gebruikt voor het optellen van de tussenregels). */
  plusStappen(fase, getallen, onthoudRij, uitkomstRij, voorvoegsel = '') {
    const L = Math.max(...getallen.map((g) => String(g).length));
    let c = 0;
    for (let k = 0; k < L; k++) {
      const ds = getallen.map((g) => cijfersVan(g)[k]).filter((d) => d !== undefined);
      const s = ds.reduce((x, y) => x + y, 0) + c;
      const som = `${ds.join(' + ')}${c ? ` + ${c} (onthouden)` : ''}`;
      const begin = `${voorvoegsel}${this.kol(k)}-kolom: `;
      const enkel = ds.length === 1 && !c;
      if (k < L - 1) {
        const ant = this.vak(uitkomstRij, k, 'antwoord', s % 10);
        const nieuw = Math.floor(s / 10);
        const ont = this.vak(onthoudRij, k + 1, 'onthoud', nieuw ? nieuw : '');
        const uitleg = enkel
          ? `${begin}alleen de ${ds[0]}. Schrijf ${s} op.`
          : `${begin}${som} = ${s}. ${nieuw ? `Schrijf ${s % 10} op en zet ${nieuw} als onthoud-cijfer boven de ${this.kol(k + 1)}.` : `Schrijf ${s} op.`}`;
        this.stap(fase, k, [ant, ont], uitleg, k === 0 ? `${fase}Eerste` : fase);
        c = nieuw;
      } else {
        // Laatste kolom: je schrijft het hele getal op.
        const cellen = cijfersVan(s).map((d, i) => this.vak(uitkomstRij, k + i, 'antwoord', d));
        const uitleg = enkel ? `${begin}alleen de ${ds[0]}. Schrijf ${s} op.` : `${begin}${som} = ${s}. Schrijf ${s} op.`;
        this.stap(fase, k, cellen, uitleg, L === 1 ? `${fase}Eerste` : `${fase}Laatste`);
      }
    }
  }

  /* ---------- Aftrekken ---------- */

  min() {
    const [a, b] = this.som.getallen;
    const ta = cijfersVan(a), tb = cijfersVan(b);
    const inwissel = this.rij('inwissel', 'inwissel');
    this.getalRij('getal0', a);
    this.getalRij('getal1', b, { teken: TEKEN.min });
    this.rij('lijn', 'lijn');
    const uitkomst = this.rij('uitkomst', 'uitkomst');
    const antwoordLengte = String(a - b).length;

    // Eerst uitrekenen waar ingewisseld wordt.
    const leent = [], krijgt = [], nieuw = [];
    for (let k = 0; k < ta.length; k++) {
      leent[k] = k > 0 && krijgt[k - 1];
      const eff = ta[k] - (leent[k] ? 1 : 0);
      krijgt[k] = eff < (tb[k] ?? 0);
      nieuw[k] = eff + (krijgt[k] ? 10 : 0);
    }

    for (let k = 0; k < ta.length; k++) {
      const onder = tb[k] ?? 0;
      const eff = ta[k] - (leent[k] ? 1 : 0);
      const veranderd = leent[k] || krijgt[k];
      const ant = nieuw[k] - onder;
      // Onveranderd: leeg laten (of het oude cijfer nog eens). Wordt een cijfer 0 door het inwisselen, dan mag leeg ook.
      const alsOok = veranderd ? (nieuw[k] === 0 ? [''] : []) : [String(ta[k])];
      const vak = this.vak(inwissel, k, 'inwissel', veranderd ? nieuw[k] : '', { alsOok });
      const leegVooraan = ant === 0 && k >= antwoordLengte;
      const antVak = this.vak(uitkomst, k, 'antwoord', leegVooraan ? '' : ant);
      const begin = `${this.kol(k)}-kolom: `;
      let uitleg;
      if (ta[k] === 0 && leent[k]) {
        uitleg = `${begin}de 0 is door het inwisselen een 9 geworden. 9 − ${onder} = ${ant}.`;
      } else if (krijgt[k]) {
        // Bij wie wissel je in? Bij de eerste kolom links die geen 0 is.
        let j = k + 1;
        while (ta[j] === 0) j++;
        const leenTekst = j === k + 1
          ? `de ${ta[j]} in de ${this.kol(j)} wordt ${ta[j] - 1}`
          : `de ${ta[j]} in de ${this.kol(j)} wordt ${ta[j] - 1}, de nullen ertussen worden 9`;
        const al = leent[k] ? ` (de ${ta[k]} was al ${eff} geworden)` : '';
        uitleg = `${begin}${eff} − ${onder} kan niet${al}. Wissel in: ${leenTekst}, en de ${eff} wordt ${nieuw[k]}. ${nieuw[k]} − ${onder} = ${ant}.`;
      } else if (leent[k]) {
        uitleg = `${begin}de ${ta[k]} is door het inwisselen ${eff} geworden. ${eff} − ${onder} = ${ant}.${leegVooraan ? ' Een 0 vooraan schrijf je niet op.' : ''}`;
      } else if (k >= tb.length) {
        uitleg = `${begin}onder staat niets, dus neem je de ${ta[k]} over.`;
      } else {
        uitleg = `${begin}${ta[k]} − ${onder} = ${ant}.${leegVooraan ? ' Een 0 vooraan schrijf je niet op.' : ''}`;
      }
      this.stap('min', k, [vak, antVak], uitleg, k === 0 ? 'minEerste' : 'min');
    }
  }

  /* ---------- Vermenigvuldigen ---------- */

  keerEenCijfer() {
    const [a, m] = this.som.getallen;
    const onthoud = this.rij('onthoud', 'onthoud');
    this.getalRij('getal0', a);
    const onderRij = this.getalRij('getal1', m, { teken: TEKEN.keer });
    if (this.inst.onthoudPlek === 'onder') this.verplaatsNaar(onthoud, onderRij);
    this.rij('lijn', 'lijn');
    const uitkomst = this.rij('uitkomst', 'uitkomst');
    this.keerStappen('keer', a, m, onthoud, uitkomst, 0);
  }

  /** a × één cijfer, kolom voor kolom. verschuif = 1 voor de tweede regel (rekenen met het tiental). */
  keerStappen(fase, a, m, onthoudRij, uitkomstRij, verschuif, voorvoegsel = '') {
    const ta = cijfersVan(a);
    let c = 0;
    for (let j = 0; j < ta.length; j++) {
      const k = j + verschuif;
      const p = ta[j] * m + c;
      const begin = `${voorvoegsel}${this.kol(k)}-kolom: `;
      const reken = `${m} × ${ta[j]} = ${ta[j] * m}${c ? `, plus ${c} onthouden is ${p}` : ''}`;
      const regel = j === 0 ? `${fase}Eerste` : fase;
      if (j < ta.length - 1) {
        const ant = this.vak(uitkomstRij, k, 'antwoord', p % 10);
        const nieuw = Math.floor(p / 10);
        const ont = this.vak(onthoudRij, k + 1, 'onthoud', nieuw ? nieuw : '');
        this.stap(fase, k, [ant, ont], `${begin}${reken}. ${nieuw ? `Schrijf ${p % 10} op en onthoud ${nieuw} boven de ${this.kol(k + 1)}.` : `Schrijf ${p} op.`}`, regel);
        c = nieuw;
      } else {
        const cellen = cijfersVan(p).map((d, i) => this.vak(uitkomstRij, k + i, 'antwoord', d));
        this.stap(fase, k, cellen, `${begin}${reken}. Schrijf ${p} op.`, ta.length === 1 ? `${fase}Eerste` : `${fase}Laatste`);
      }
    }
  }

  keerTweeCijfers() {
    const [a, b] = this.som.getallen;
    const m0 = b % 10, m1 = Math.floor(b / 10);
    const r1 = a * m0, r2 = a * m1 * 10;
    const onthoud2 = this.rij('onthoud2', 'onthoud', { label: '2e' });
    const onthoud1 = this.rij('onthoud1', 'onthoud', { label: '1e' });
    this.getalRij('getal0', a);
    const onderRij = this.getalRij('getal1', b, { teken: TEKEN.keer });
    if (this.inst.onthoudPlek === 'onder') {
      this.verplaatsNaar(onthoud2, onderRij);
      this.verplaatsNaar(onthoud1, onthoud2);
    }
    this.rij('lijn', 'lijn');
    const onthoud3 = this.rij('onthoud3', 'onthoud', { label: '+' });
    const regel1 = this.rij('regel1', 'tussen');
    const regel2 = this.rij('regel2', 'tussen', { teken: TEKEN.plus });
    if (this.inst.onthoudPlek === 'onder') this.verplaatsNaar(onthoud3, regel2);
    this.rij('lijn2', 'lijn');
    const uitkomst = this.rij('uitkomst', 'uitkomst');

    // Regel 1: a × de eenheden van b.
    this.keerStappen('keer', a, m0, onthoud1, regel1, 0, 'Regel 1, ');
    // Regel 2: a × de tientallen van b; je rekent met een tiental, dus eerst een 0 bij de E.
    if (this.inst.nulZelfInvullen) {
      const nul = this.vak(regel2, 0, 'antwoord', 0);
      this.stap('keerRegel2', 0, [nul], `Regel 2: je rekent nu met ${m1 * 10}. Zet eerst een 0 bij de E.`, 'keerRegel2Nul');
    } else {
      this.vast(regel2, 0, 0);
    }
    this.keerStappen('keerRegel2', a, m1, onthoud2, regel2, 1, 'Regel 2, ');
    // Optellen: regel 1 + regel 2.
    this.plusStappen('keerOptellen', [r1, r2], onthoud3, uitkomst, 'Optellen, ');
  }

  /** Zet een rij direct onder een andere rij (voor onthoud-vakjes 'onder'). */
  verplaatsNaar(rij, onder) {
    this.rijen.splice(this.rijen.indexOf(rij), 1);
    this.rijen.splice(this.rijen.indexOf(onder) + 1, 0, rij);
  }

  klaar() {
    // Lege rijen (bijv. geen enkel onthoud-vakje) weglaten.
    this.rijen = this.rijen.filter((r) => r.soort === 'lijn' || Object.keys(r.cellen).length > 0);
    const breedte = Math.max(this.breedte, ...this.cellen.map((c) => c.k + 1));
    // Volgorde van invullen: stap voor stap.
    const volgorde = this.stappen.flatMap((s) => s.cellen);
    return { som: this.som, rijen: this.rijen, stappen: this.stappen, cellen: this.cellen, volgorde, breedte };
  }
}

/* ---------- Nakijken ---------- */

export function celGoed(cel, waarde) {
  const v = String(waarde ?? '').trim();
  if (cel.alsOok?.includes(v)) return true;
  if (cel.verwacht === '') return v === '' || v === '0';
  if (v === '' && cel.leegMag) return true;
  return v === cel.verwacht;
}

/**
 * Kijkt het hele schema na. waarden: (cel) => ingevulde tekst.
 * Geeft: { onvolledig, goedPerStap: [bool], cellenFout: [cel], allesGoed }
 */
export function kijkNa(schema, waarden) {
  const onvolledig = schema.cellen.some((c) => c.soort === 'antwoord' && c.verwacht !== '' && String(waarden(c) ?? '').trim() === '');
  const cellenFout = schema.cellen.filter((c) => !celGoed(c, waarden(c)));
  const fouteStappen = new Set(cellenFout.map((c) => c.stap));
  const goedPerStap = schema.stappen.map((s) => !fouteStappen.has(s.nr));
  return { onvolledig, goedPerStap, cellenFout, allesGoed: cellenFout.length === 0 };
}
