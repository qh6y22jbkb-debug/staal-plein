/**
 * Voorlezen met de Web Speech API (Nederlandse stem, nl-NL).
 * Werkt offline als de computer een Nederlandse stem heeft (Chromebooks en Windows meestal wel).
 */
const synth = window.speechSynthesis;
let stem = null;
let aan = true;
try { aan = localStorage.getItem('staal-voorlezen') !== 'uit'; } catch { /* geen opslag */ }

function kiesStem() {
  if (!synth) return;
  const stemmen = synth.getVoices();
  stem = stemmen.find((s) => s.lang === 'nl-NL' && /google/i.test(s.name))
    ?? stemmen.find((s) => s.lang === 'nl-NL')
    ?? stemmen.find((s) => s.lang?.toLowerCase().startsWith('nl'))
    ?? null;
}
if (synth) {
  kiesStem();
  synth.addEventListener?.('voiceschanged', kiesStem);
}

/** Maakt van de schermtekst iets wat lekker uitgesproken wordt. */
function maakSpreekbaar(html) {
  const tijdelijk = document.createElement('div');
  tijdelijk.innerHTML = html.replace(/<br\s*\/?>/gi, '. ').replace(/<\/p>/gi, '. ');
  return tijdelijk.textContent
    .replace(/\*\*/g, '')
    .replace(/→/g, ', ')
    .replace(/[–—]/g, ', ')
    .replace(/(^|[\s(])-(\w)/g, '$1$2') // "-te" → "te"
    .replace(/'t kofschip-x/gi, "'t kofschip x")
    .replace(/\s+/g, ' ')
    .replace(/([.!?])(\s*\.)+/g, '$1') // "zin!.." → "zin!"
    .replace(/\s+,/g, ',')
    .trim();
}

export const voorlezen = {
  get beschikbaar() { return !!synth; },
  get aan() { return aan; },
  set aan(waarde) {
    aan = waarde;
    try { localStorage.setItem('staal-voorlezen', waarde ? 'aan' : 'uit'); } catch { /* geen opslag */ }
    if (!waarde) this.stop();
  },

  /**
   * Leest een tekst voor. Geeft een Promise die klaar is als het voorlezen stopt.
   * @param opties { toonhoogte, snelheid, altijd } — altijd = ook als voorlezen uit staat
   */
  zeg(html, { toonhoogte = 1, snelheid = 0.95, altijd = false } = {}) {
    if (!synth || (!aan && !altijd)) return Promise.resolve(false);
    synth.cancel();
    const tekst = maakSpreekbaar(html);
    if (!tekst) return Promise.resolve(false);
    return new Promise((klaar) => {
      const u = new SpeechSynthesisUtterance(tekst);
      u.lang = 'nl-NL';
      if (stem) u.voice = stem;
      u.pitch = toonhoogte;
      u.rate = snelheid;
      u.onend = () => klaar(true);
      u.onerror = () => klaar(false);
      synth.speak(u);
    });
  },

  stop() {
    synth?.cancel();
  },
};
