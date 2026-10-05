import { TEKSTEN, LEERKRACHT, TEST } from '../data/oefeningen.js';
import { voortgang } from '../voortgang.js';

/**
 * Startscherm. De klik op "Spelen" zet ook geluid en voorlezen aan (browsers willen eerst een klik).
 * opCode(code) → true als de leerkrachtcode klopt.
 */
export function toonStartscherm(laag, opStart, opCode) {
  const el = document.createElement('div');
  el.className = 'startscherm';
  const verder = voortgang.aantal > 0;
  el.innerHTML = `
    <div class="ss-kaart">
      <div class="ss-iconen">🏴‍☠️ 🎂 🥁 🔤 🥞 🍦</div>
      <h1>${TEKSTEN.startTitel}</h1>
      <p class="ss-sub">${TEKSTEN.startOndertitel}</p>
      <p>${TEKSTEN.startUitleg}</p>
      <p class="ss-extra">${TEKSTEN.startExtra}</p>
      ${verder ? `<p class="ss-verder">${TEKSTEN.startVerder.replace('{aantal}', voortgang.aantal)}</p>` : ''}
      <button type="button" class="ss-knop">${verder ? TEKSTEN.startKnopVerder : TEKSTEN.startKnop} ▶</button>
      ${TEST.leerkrachtCode ? `
        <button type="button" class="ss-leerkracht">${LEERKRACHT.knop}</button>
        <form class="ss-code" hidden>
          <p>${LEERKRACHT.uitleg}</p>
          <input type="password" autocomplete="off" placeholder="${LEERKRACHT.plaatshouder}" aria-label="${LEERKRACHT.plaatshouder}">
          <button type="submit">${LEERKRACHT.ok}</button>
          <p class="ss-code-uitslag" aria-live="polite"></p>
        </form>` : ''}
    </div>`;
  laag.appendChild(el);
  document.body.classList.add('start-open');
  const knop = el.querySelector('.ss-knop');
  knop.focus({ preventScroll: true });
  const start = () => {
    el.classList.add('weg');
    document.body.classList.remove('start-open');
    setTimeout(() => el.remove(), 400);
    opStart();
  };
  knop.addEventListener('click', start);

  // Leerkrachtcode op het startscherm (handig op het digibord en tablets).
  const codeKnop = el.querySelector('.ss-leerkracht');
  const form = el.querySelector('.ss-code');
  if (codeKnop && form) {
    const invoer = form.querySelector('input');
    const uitslag = form.querySelector('.ss-code-uitslag');
    codeKnop.addEventListener('click', () => { form.hidden = !form.hidden; if (!form.hidden) invoer.focus(); });
    invoer.addEventListener('keydown', (e) => e.stopPropagation()); // niet als spelbesturing tellen
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const goed = opCode?.(invoer.value);
      uitslag.textContent = goed ? LEERKRACHT.goed : LEERKRACHT.fout;
      uitslag.classList.toggle('goed', !!goed);
      invoer.value = '';
      if (goed) knop.textContent = `${TEKSTEN.startKnopVerder} ▶`;
    });
  }
}
