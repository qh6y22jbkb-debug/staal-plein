// Werkwoordenwereld: alle vragen van de vijf kramen nakijken.
// - Elke vraag is compleet (zin, gaten, keuzes, goed antwoord) en elk niveau heeft minstens 8 vragen.
// - Het goede antwoord staat altijd tussen de keuzes, en het foute antwoord wordt nooit goed gerekend.
// - 't Kofschip-x: bij de zwakke werkwoorden klopt -te/-de (verleden tijd) en -t/-d (voltooid deelwoord).
// - Gebiedende wijs en ik-vorm eindigen niet op een extra t; hij-vormen wel (behalve als de stam al op t eindigt).
import { WERKWOORD_KRAMEN, WERKWOORD_SPELLEN } from '../src/data/werkwoorden.js';
import { isGoed, delenVan, goedeAntwoorden, schoonAntwoord } from '../src/minispellen/werkwoordcontrole.js';

let fouten = 0, vragen = 0, controles = 0;
const meld = (...m) => { fouten++; console.log('FOUT', ...m); };
const KOFSCHIP = ['t', 'k', 'f', 's', 'ch', 'p', 'x'];
const laatste = (stuk) => (stuk.endsWith('ch') ? 'ch' : stuk.slice(-1));
const kofschip = (ww) => KOFSCHIP.includes(laatste(ww.replace(/en$/, '')));
const ZWAK = new Set(['werken', 'fietsen', 'bouwen', 'spelen', 'maken', 'wonen', 'poetsen', 'huilen', 'lachen', 'koken', 'schilderen',
  'stoppen', 'regenen', 'planten', 'branden', 'wachten', 'landen', 'praten', 'sturen', 'voetballen', 'schoppen', 'halen', 'zetten',
  'verplanten', 'verbranden', 'herhalen', 'betalen', 'ontdekken', 'verhuizen', 'gebeuren', 'versieren', 'beloven', 'verbeteren',
  'beleven', 'verzorgen', 'ontsnappen', 'repareren', 'dansen']);
const FOUT_GOK = ['', 'x', 'fout', 'gelopenn', 'werkde', 'liepte'];

for (const kraam of WERKWOORD_KRAMEN) {
  const spel = WERKWOORD_SPELLEN[kraam.id];
  if (!spel) { meld('geen spel voor', kraam.id); continue; }
  if (!kraam.begroeting || !kraam.uitleg?.length) meld('kraam zonder uitleg', kraam.id);
  if (spel.tips?.length !== 3 || spel.niveaus?.length !== 3) meld('tips/niveaus niet compleet', kraam.id);
  for (const n of [1, 2, 3]) {
    const aantal = spel.vragen.filter((v) => v.niveau === n).length;
    if (aantal < 8) meld(kraam.id, `niveau ${n} heeft maar ${aantal} vragen`);
  }
  for (const v of spel.vragen) {
    vragen++;
    const delen = delenVan(v);
    const gatenNodig = delen.filter((d) => !d.zin).length;
    const gaten = (v.zin ?? '').split('___').length - 1;
    const heleZinKiezen = gaten === 0 && delen.length === 1 && delen[0].kies; // herkennen: de hele zin, zonder gat
    if (gatenNodig && gaten !== gatenNodig && !heleZinKiezen) meld(kraam.id, 'aantal gaten klopt niet', v.zin);
    for (const d of delen) {
      const goed = goedeAntwoorden(d);
      if (!goed.length || goed.some((g) => !g || g === 'undefined')) meld(kraam.id, 'geen goed antwoord', v.zin ?? d.zin);
      if (d.zin?.includes('___') === false && !d.kies) meld(kraam.id, 'typvraag zonder gat', d.zin);
      // Het goede antwoord wordt goed gerekend (ook met hoofdletter, punt of "ik" ervoor).
      for (const g of goed) {
        controles++;
        if (!isGoed(d, g) || !isGoed(d, `${g.toUpperCase()}!`) || !isGoed(d, ` ik ${g}. `)) meld(kraam.id, 'goed antwoord niet goed gerekend', g);
      }
      if (d.kies) {
        if (d.kies.length !== 2) meld(kraam.id, 'niet precies 2 keuzes', d.kies);
        if (!d.kies.some((k) => goed.includes(k))) meld(kraam.id, 'goede antwoord staat niet tussen de keuzes', d.kies, goed);
        for (const k of d.kies) {
          controles++;
          if (!goed.includes(k) && isGoed(d, k)) meld(kraam.id, 'foute keuze wordt goed gerekend', k);
        }
      }
      for (const gok of FOUT_GOK) {
        controles++;
        if (!goed.map(schoonAntwoord).includes(schoonAntwoord(gok)) && isGoed(d, gok)) meld(kraam.id, 'gok goed gerekend', gok);
      }
      // Bijna-goed (een letter te veel of te weinig) mag nooit goed zijn.
      for (const g of goed) {
        for (const bijna of [`${g}t`, `${g}d`, g.slice(0, -1), `${g}n`]) {
          controles++;
          if (!goed.map(schoonAntwoord).includes(schoonAntwoord(bijna)) && isGoed(d, bijna)) meld(kraam.id, 'bijna-goed wordt goed gerekend', bijna);
        }
      }
    }

    // Inhoud: 't kofschip-x bij de verleden tijd (zwak).
    if (kraam.id === 'verleden') {
      if (!ZWAK.has(v.ww)) meld('verleden: onbekend of sterk werkwoord', v.ww);
      const goed = goedeAntwoorden(delen[0])[0];
      const verwacht = kofschip(v.ww) ? 't' : 'd';
      controles++;
      if (!new RegExp(`${verwacht}en?$`).test(goed) && goed !== `${verwacht}e`) meld('verleden: te/de klopt niet', v.ww, goed);
    }
    // Voltooid deelwoord van zwakke werkwoorden: t of d (bij stam op t of d: niets erachter).
    if (kraam.id === 'voltooid' && ZWAK.has(v.ww)) {
      const vd = goedeAntwoorden(delen.at(-1))[0];
      const stuk = v.ww.replace(/en$/, '');
      const verwacht = /[td]$/.test(stuk) ? stuk.slice(-1) : kofschip(v.ww) ? 't' : 'd';
      controles++;
      if (!vd.endsWith(verwacht) || /(tt|dd|dt|td)$/.test(vd)) meld('voltooid: t/d klopt niet', v.ww, vd);
      if (/^(be|ge|ver|her|ont)/.test(v.ww) && vd.startsWith('ge') && !v.ww.startsWith('ge')) meld('voltooid: extra ge-', v.ww, vd);
    }
    // Gebiedende wijs: nooit een extra t aan het eind (behalve als de stam op t eindigt, zoals wacht).
    if (kraam.id === 'gebiedend' && v.niveau < 3) {
      const g = schoonAntwoord(goedeAntwoorden(delen[0])[0]);
      const stuk = v.ww.replace(/en$/, '');
      controles++;
      if (g.endsWith('t') && !/t$/.test(stuk) && !stuk.endsWith('tt')) meld('gebiedend: eindigt op t', v.ww, g);
    }
    // Tegenwoordige tijd: ik/jij-achter = stam; hij/zij/het/naam = stam + t (behalve stam op t).
    if (kraam.id === 'tegenwoordig') {
      const g = schoonAntwoord(goedeAntwoorden(delen[0])[0]);
      const zin = v.zin.toLowerCase();
      const ik = /^ik ___|___ (jij|je)\b|(^| )ik /.test(zin) && !/___ je (oma|broer|zus)/.test(zin);
      controles++;
      if (ik && g.endsWith('t') && !['zit', 'praat', 'zet', 'wacht', 'eet'].includes(g)) meld('tegenwoordig: ik/jij-achter met t', v.zin, g);
      if (!ik && !g.endsWith('t')) meld('tegenwoordig: hij-vorm zonder t', v.zin, g);
    }
  }
}

console.log(`${vragen} werkwoordvragen, ${controles} controles, ${fouten} fouten`);
if (fouten) process.exit(1);
