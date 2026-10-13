import { GYMTIJD } from './data/gym.js';

/**
 * Gymtijd (in seconden), bewaard in localStorage.
 * Verdienen: per nieuwe of betere stempel GYMTIJD.minutenPerStempel minuten, tot GYMTIJD.maxMinuten.
 * Verbruiken: alleen in de gymzaal.
 */
const SLEUTEL = 'staal-blok2-gymtijd';
const MAX = () => GYMTIJD.maxMinuten * 60;

function lees() {
  try {
    const n = Number(JSON.parse(localStorage.getItem(SLEUTEL))?.seconden);
    if (Number.isFinite(n)) return Math.max(0, Math.min(MAX(), n));
  } catch { /* geen of kapotte opslag */ }
  return 0;
}

let seconden = lees();
let laatstBewaard = seconden;
const luisteraars = new Set();

function bewaar() {
  laatstBewaard = seconden;
  try { localStorage.setItem(SLEUTEL, JSON.stringify({ seconden: Math.round(seconden) })); } catch { /* geen opslag */ }
}
function meld() { for (const f of luisteraars) f(seconden); }

/** "6 minuten", "1 minuut", "2 minuten en 30 seconden", "45 seconden". */
export function tijdInWoorden(s) {
  const t = Math.ceil(s);
  const m = Math.floor(t / 60), sec = t % 60;
  const min = m === 1 ? '1 minuut' : `${m} minuten`;
  if (!m) return `${sec} seconden`;
  return sec ? `${min} en ${sec} seconden` : min;
}

/** "5:42" */
export function tijdOpKlok(s) {
  const t = Math.max(0, Math.ceil(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

export const gymtijd = {
  get seconden() { return seconden; },
  get heeftTijd() { return seconden > 0; },

  /** Een nieuwe of betere stempel: er komt gymtijd bij. Geeft het aantal minuten dat erbij kwam (0 = al vol). */
  verdien() {
    const voor = seconden;
    seconden = Math.min(MAX(), seconden + GYMTIJD.minutenPerStempel * 60);
    bewaar();
    meld();
    return Math.round((seconden - voor) / 60);
  },

  /** Tijd in de gymzaal. */
  verbruik(dt) {
    if (seconden <= 0) return;
    seconden = Math.max(0, seconden - dt);
    if (Math.abs(laatstBewaard - seconden) >= 5 || seconden === 0) bewaar(); // niet elke frame opslaan
    meld();
  },

  /** Testtoets / leerkracht: helemaal vol. */
  vul() { seconden = MAX(); bewaar(); meld(); },
  bewaarNu() { bewaar(); },
  opVerandering(f) { luisteraars.add(f); },
  wis() { seconden = 0; bewaar(); meld(); },
};
