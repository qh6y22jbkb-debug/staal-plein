import { TEKSTEN } from '../data/oefeningen.js';
import { ONDERDELEN, VARIANT } from '../data/onderdelen.js';
import { REKENPLEIN_START } from '../data/rekenen.js';
import { voortgang } from '../voortgang.js';

/**
 * Startscherm. De klik op "Spelen" zet ook geluid en voorlezen aan (browsers willen eerst een klik).
 * (De leerkrachtcode staat hier niet meer: die vul je in via de sneltoets, zie ui/leerkrachtslot.js.)
 */
export function toonStartscherm(laag, opStart) {
  const el = document.createElement('div');
  el.className = 'startscherm';
  if (VARIANT === 'rekenen') return toonRekenpleinStart(laag, el, opStart);
  const verder = voortgang.aantal > 0;
  el.innerHTML = `
    <div class="ss-kaart">
      <div class="ss-iconen">🏴‍☠️ 🎂 🥁 🔤 🥞 🍦</div>
      <h1>${TEKSTEN.startTitel}</h1>
      <p class="ss-sub">${TEKSTEN.startOndertitel}</p>
      <p>${TEKSTEN.startUitleg}</p>
      <p class="ss-extra">${TEKSTEN.startExtra}${ONDERDELEN.voetbalwereld ? TEKSTEN.startPoort : ''}</p>
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

/** Startscherm van de bouwvariant Rekenplein (teksten in src/data/rekenen.js). Alleen textContent. */
function toonRekenpleinStart(laag, el, opStart) {
  const T = REKENPLEIN_START;
  const kaart = document.createElement('div');
  kaart.className = 'ss-kaart';
  const regel = (tag, klasse, tekst) => {
    const e = document.createElement(tag);
    if (klasse) e.className = klasse;
    e.textContent = tekst;
    kaart.appendChild(e);
    return e;
  };
  regel('div', 'ss-iconen', T.iconen);
  regel('h1', '', T.titel);
  regel('p', 'ss-sub', T.ondertitel);
  regel('p', '', T.uitleg);
  regel('p', 'ss-extra', T.extra);
  const knop = regel('button', 'ss-knop', `${T.knop} ▶`);
  knop.type = 'button';
  el.appendChild(kaart);
  laag.appendChild(el);
  document.body.classList.add('start-open');
  knop.focus({ preventScroll: true });
  knop.addEventListener('click', () => {
    el.classList.add('weg');
    document.body.classList.remove('start-open');
    setTimeout(() => el.remove(), 400);
    opStart();
  });

}
