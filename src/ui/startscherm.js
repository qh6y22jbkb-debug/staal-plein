import { TEKSTEN } from '../data/oefeningen.js';
import { voortgang } from '../voortgang.js';

/** Startscherm. De klik op "Spelen" zet ook geluid en voorlezen aan (browsers willen eerst een klik). */
export function toonStartscherm(laag, opStart) {
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
}
