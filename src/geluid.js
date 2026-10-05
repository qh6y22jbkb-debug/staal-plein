/**
 * Alle geluidjes worden live gemaakt met de Web Audio API (geen geluidsbestanden nodig).
 */
let ctx = null;
let hoofd = null;
let aan = true;
try { aan = localStorage.getItem('staal-geluid') !== 'uit'; } catch { /* geen opslag */ }

function context() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    hoofd = ctx.createGain();
    hoofd.gain.value = 0.35;
    hoofd.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// Browsers starten geluid pas na een klik of toets.
for (const soort of ['pointerdown', 'keydown']) {
  window.addEventListener(soort, () => { if (aan) context(); }, { once: true, capture: true });
}

const NOOT = (n) => 440 * 2 ** ((n - 69) / 12); // MIDI-nummer → frequentie

/** Eén toon met een zachte aanzet en uitsterving. */
function toon(freq, start, duur, { type = 'triangle', volume = 0.5, glijNaar } = {}) {
  const c = context();
  if (!c) return;
  const t = c.currentTime + start;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (glijNaar) osc.frequency.exponentialRampToValueAtTime(glijNaar, t + duur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(volume, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duur);
  osc.connect(g).connect(hoofd);
  osc.start(t);
  osc.stop(t + duur + 0.05);
}

/** Korte ruisstoot (voor trommel en vuurwerk). */
function ruis(start, duur, { volume = 0.4, filter = 1200 } = {}) {
  const c = context();
  if (!c) return;
  const t = c.currentTime + start;
  const buffer = c.createBuffer(1, Math.ceil(c.sampleRate * duur), c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const bron = c.createBufferSource();
  bron.buffer = buffer;
  const f = c.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = filter;
  const g = c.createGain();
  g.gain.value = volume;
  bron.connect(f).connect(g).connect(hoofd);
  bron.start(t);
}

export const geluid = {
  get aan() { return aan; },
  set aan(waarde) {
    aan = waarde;
    try { localStorage.setItem('staal-geluid', waarde ? 'aan' : 'uit'); } catch { /* geen opslag */ }
    if (waarde) context();
  },

  /** Vrolijk oplopend loopje. */
  goed() {
    if (!aan) return;
    [72, 76, 79, 84].forEach((n, i) => toon(NOOT(n), i * 0.08, 0.25, { volume: 0.35 }));
  },

  /** Zacht en vriendelijk (geen "fout"-zoemer). */
  bijna() {
    if (!aan) return;
    toon(NOOT(67), 0, 0.18, { type: 'sine', volume: 0.3 });
    toon(NOOT(64), 0.14, 0.28, { type: 'sine', volume: 0.3 });
  },

  /** Klein fanfaretje aan het eind van een ronde. */
  klaar() {
    if (!aan) return;
    const melodie = [[72, 0], [72, 0.12], [72, 0.24], [76, 0.36], [79, 0.6], [84, 0.84]];
    melodie.forEach(([n, t]) => toon(NOOT(n), t, n === 84 ? 0.6 : 0.2, { type: 'square', volume: 0.15 }));
    toon(NOOT(48), 0.84, 0.6, { volume: 0.3 });
  },

  /** Stempel: doffe klap met een plopje. */
  stempel() {
    if (!aan) return;
    ruis(0, 0.12, { volume: 0.6, filter: 600 });
    toon(160, 0, 0.18, { type: 'sine', volume: 0.6, glijNaar: 60 });
    toon(NOOT(88), 0.12, 0.15, { type: 'sine', volume: 0.2 });
  },

  /** "Kling": een muntje komt binnen. */
  kling() {
    if (!aan) return;
    toon(NOOT(88), 0, 0.12, { type: 'sine', volume: 0.22 });
    toon(NOOT(95), 0.05, 0.3, { type: 'sine', volume: 0.18 });
  },

  /** Slot springt open: metalen klik, plof en een vrolijk loopje. */
  slotOpen() {
    if (!aan) return;
    toon(1400, 0, 0.06, { type: 'square', volume: 0.12 });
    toon(900, 0.05, 0.08, { type: 'square', volume: 0.1 });
    ruis(0.45, 0.15, { volume: 0.5, filter: 500 });
    [72, 76, 79, 84, 88].forEach((n, i) => toon(NOOT(n), 0.7 + i * 0.1, 0.35, { type: 'triangle', volume: 0.25 }));
  },

  /** Trap tegen de bal: doffe plof, harder bij meer kracht. */
  trap(kracht = 0.5) {
    if (!aan) return;
    toon(180 + kracht * 60, 0, 0.12, { type: 'sine', volume: 0.35 + kracht * 0.25, glijNaar: 70 });
    ruis(0, 0.06, { volume: 0.3 + kracht * 0.3, filter: 900 });
  },

  /** Juichend publiek (ruis die aanzwelt) met een toeter. */
  juichen() {
    if (!aan) return;
    for (let i = 0; i < 6; i++) ruis(i * 0.25, 0.5, { volume: 0.18, filter: 1500 + i * 200 });
    [67, 72, 76, 79].forEach((n, i) => toon(NOOT(n), 0.2 + i * 0.12, 0.3, { type: 'square', volume: 0.12 }));
  },

  /** Zacht "woesj" bij de overgang naar een andere wereld. */
  woesj() {
    if (!aan) return;
    ruis(0, 0.6, { volume: 0.25, filter: 1800 });
    toon(300, 0, 0.6, { type: 'sine', volume: 0.12, glijNaar: 900 });
  },

  /** Plopje bij het openen van een gesprek of knop. */
  plop() {
    if (!aan) return;
    toon(500, 0, 0.1, { type: 'sine', volume: 0.25, glijNaar: 900 });
  },

  /** Vuurpijl: fluitje omhoog en een knal. */
  vuurwerk(vertraging = 0) {
    if (!aan) return;
    toon(400, vertraging, 0.5, { type: 'sine', volume: 0.08, glijNaar: 1600 });
    ruis(vertraging + 0.5, 0.6, { volume: 0.5, filter: 2500 });
  },

  /** Vrolijk feestmuziekje (ongeveer 8 seconden). */
  feestmuziek() {
    if (!aan) return;
    const tempo = 0.2;
    const melodie = [
      72, 74, 76, 72, 76, 77, 79, 0, 79, 81, 79, 77, 76, 72, 74, 0,
      72, 74, 76, 72, 76, 77, 79, 0, 81, 79, 77, 76, 74, 76, 72, 0,
    ];
    const bas = [48, 0, 55, 0, 48, 0, 55, 0, 53, 0, 55, 0, 48, 0, 55, 0];
    melodie.forEach((n, i) => { if (n) toon(NOOT(n), i * tempo, tempo * 0.9, { type: 'square', volume: 0.12 }); });
    for (let herhaal = 0; herhaal < 2; herhaal++) {
      bas.forEach((n, i) => { if (n) toon(NOOT(n), (herhaal * 16 + i) * tempo, tempo * 1.6, { volume: 0.35 }); });
    }
    for (let i = 0; i < 32; i += 2) ruis(i * tempo, 0.05, { volume: 0.25, filter: 5000 });
  },
};
