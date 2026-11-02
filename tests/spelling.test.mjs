// Spellingwereld: alle woorden nakijken.
// - Elk woord heeft precies één [moeilijk stukje], een zin met precies één ___ en een foute schrijfwijze.
// - De foute schrijfwijze is echt anders dan het goede woord en wordt nooit goed gerekend.
// - Het moeilijke stukje past bij de categorie (c bij cent- en colawoorden, heid/teit, isch(e), tie).
// - Geen woord staat twee keer in een lijst, en elke categorie heeft minstens 8 woorden.
import { SPELLING_WOORDEN, SPELLING_LOKALEN } from '../src/data/spelling.js';
import { woordenVan, gatGoed, woordGoed, zinMetWoord } from '../src/spelling/spellingwoorden.js';

let fouten = 0, woorden = 0, controles = 0;
const meld = (...m) => { fouten++; console.log('FOUT', ...m); };
const STUKJE = { centwoord: /^c$/, colawoord: /^c$/, heidteit: /^(heid|teit)$/, isch: /^ische?$/, tie: /^tie$/ };

for (const [cat, lijst] of Object.entries(SPELLING_WOORDEN)) {
  const ontleed = woordenVan(cat);
  if (ontleed.length !== lijst.length) meld(cat, 'niet elk woord heeft precies één [stukje]');
  if (ontleed.length < 8) meld(cat, `maar ${ontleed.length} woorden`);
  const gezien = new Set();
  for (const w of ontleed) {
    woorden++;
    if (gezien.has(w.woord)) meld(cat, 'dubbel woord', w.woord);
    gezien.add(w.woord);
    if (!STUKJE[cat]?.test(w.gat)) meld(cat, 'stukje past niet bij de categorie', w.woord, w.gat);
    if ((w.zin.match(/___/g) ?? []).length !== 1) meld(cat, 'zin heeft niet precies één ___', w.zin);
    if (!/[.!?]$/.test(w.zin)) meld(cat, 'zin eindigt niet met een leesteken', w.zin);
    if (!/^[a-z]+$/.test(w.woord)) meld(cat, 'woord met rare tekens', w.woord);
    controles += 6;
    if (!w.fout || w.fout === w.woord) meld(cat, 'geen echte foute schrijfwijze', w.woord, w.fout);
    if (w.fout && woordGoed(w, w.fout)) meld(cat, 'fout woord wordt goed gerekend', w.fout);
    if (!woordGoed(w, w.woord) || !woordGoed(w, ` ${w.woord.toUpperCase()}. `)) meld(cat, 'goed woord wordt niet goed gerekend', w.woord);
    if (!gatGoed(w, w.gat)) meld(cat, 'goed stukje wordt niet goed gerekend', w.gat);
    for (const bijna of ['s', 'k', 'heit', 'hijd', 'tijt', 'ies', 'iese', 'sie', 'tsie', `${w.gat}${w.gat}`]) {
      controles++;
      if (bijna !== w.gat && gatGoed(w, bijna)) meld(cat, 'fout stukje goed gerekend', w.woord, bijna);
    }
    for (const bijna of [w.voor + w.na, `${w.woord}e`, w.woord.slice(0, -1)]) {
      controles++;
      if (bijna !== w.woord && woordGoed(w, bijna)) meld(cat, 'bijna-goed woord goed gerekend', bijna);
    }
    if (!zinMetWoord(w).includes(w.woord)) meld(cat, 'zin zonder woord', w.zin);
  }
}
for (const l of SPELLING_LOKALEN) {
  if (l.uit) continue;
  if (!l.begroeting || !l.uitleg?.length || !l.tip) meld('lokaal zonder tekst', l.id);
  if (l.cat !== 'mix' && !SPELLING_WOORDEN[l.cat]) meld('lokaal zonder woordenlijst', l.id);
}

console.log(`${woorden} spellingwoorden, ${controles} controles, ${fouten} fouten`);
if (fouten) process.exit(1);
