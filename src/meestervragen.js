import { SPELLEN, MEESTER_VRAAG } from './data/oefeningen.js';
import { willekeurig } from './minispellen/basis.js';

/** Kleine letters, zonder leestekens, zonder "ik"/"wij" ervoor. */
function schoon(t) {
  return t.toLowerCase().replace(/[.?!,]/g, ' ').replace(/\s+/g, ' ').trim();
}
const zonderPersoon = (t) => schoon(t).replace(/^(ik|wij|jij|hij|zij|jullie)\s+/, '');

/** Vragen tot en met 2 sterren (eerlijk voor iedereen). */
const makkelijk = (lijst) => lijst.filter((v) => (v.niveau ?? 1) <= 2);

/**
 * Maakt een willekeurige vraag over een van de zes onderwerpen.
 * Geeft: { onderwerp, intro, vraag, voorbeeld (html), vakken, controleer(tekst), antwoord, uitleg, hint }
 * vakken = aantal invulvakken (één per woord van het antwoord).
 */
export function maakMeesterVraag() {
  const vraag = maakVraag();
  return { vakken: 1, ...vraag };
}

function maakVraag() {
  const onderwerp = willekeurig(Object.keys(MEESTER_VRAAG.onderwerpen));
  const info = MEESTER_VRAAG.onderwerpen[onderwerp];
  const basis = { onderwerp, intro: info.intro, hint: info.hint };

  switch (onderwerp) {
    case 'kofschip': {
      const v = willekeurig(makkelijk(SPELLEN.kofschip.vragen));
      const antwoord = v.ik + v.uitgang;
      return {
        ...basis,
        vraag: MEESTER_VRAAG.vraagVerleden,
        voorbeeld: `ik … <span class="mv-werkwoord">(${v.hele})</span>`,
        controleer: (t) => zonderPersoon(t) === antwoord,
        antwoord: `ik ${antwoord}`,
        uitleg: `${v.hele} → ${v.hele.replace(/en$/, '')} → ik ${v.ik} + ${v.uitgang} = <mark>${antwoord}</mark>`,
      };
    }
    case 'taarten': {
      const v = willekeurig(SPELLEN.taarten.vragen);
      const antwoord = `${v.ik}te${v.meer ? 'n' : ''}`;
      const zin = v.zin.replace(/\S*__/, '…');
      return {
        ...basis,
        vraag: MEESTER_VRAAG.vraagZin,
        voorbeeld: `${zin} <span class="mv-werkwoord">(${v.hele})</span>`,
        controleer: (t) => zonderPersoon(t) === antwoord,
        antwoord,
        uitleg: `ik ${v.ik} + te${v.meer ? 'n' : ''} = <mark>${antwoord}</mark>`,
      };
    }
    case 'drummer': {
      const v = willekeurig(SPELLEN.drummer.typWoorden);
      const antwoord = `${v.ik}de`;
      return {
        ...basis,
        vraag: MEESTER_VRAAG.vraagVerleden,
        voorbeeld: `ik … <span class="mv-werkwoord">(${v.hele})</span>`,
        controleer: (t) => zonderPersoon(t) === antwoord,
        antwoord: `ik ${antwoord}`,
        uitleg: `ik ${v.ik} + de = <mark>${antwoord}</mark>`,
      };
    }
    case 'voorvoegsel': {
      const v = willekeurig(SPELLEN.voorvoegsel.vragen);
      const uitgang = v.goed.slice(v.ik.length);
      return {
        ...basis,
        vraag: MEESTER_VRAAG.vraagZin,
        voorbeeld: `${v.zin.replace('___', '…')} <span class="mv-werkwoord">(${v.hele})</span>`,
        controleer: (t) => zonderPersoon(t) === v.goed,
        antwoord: v.goed,
        uitleg: `ik ${v.ik} + ${uitgang} = <mark>${v.goed}</mark>`,
      };
    }
    case 'poffertjes': {
      const v = willekeurig(makkelijk(SPELLEN.poffertjes.vragen));
      const delen = v.zin.split('|').map((d) => d.trim());
      const zin = delen.join(' ');
      const pv = delen[v.pv].replace(/[.?!,]/g, '');
      const ow = delen[v.ow].replace(/[.?!,]/g, '');
      const vraagOw = Math.random() < 0.5;
      return {
        ...basis,
        hint: vraagOw ? MEESTER_VRAAG.hintOw : MEESTER_VRAAG.hintPv,
        vraag: vraagOw ? MEESTER_VRAAG.vraagOw : MEESTER_VRAAG.vraagPv,
        voorbeeld: zin,
        vakken: (vraagOw ? ow : pv).split(/\s+/).length,
        controleer: (t) => schoon(t) === schoon(vraagOw ? ow : pv),
        antwoord: vraagOw ? ow : pv,
        uitleg: vraagOw ? `Wie of wat ${pv.toLowerCase()}? → <mark>${ow}</mark>` : `De persoonsvorm is <mark>${pv}</mark>.`,
      };
    }
    case 'ijs':
    default: {
      const v = willekeurig(makkelijk(SPELLEN.ijs.vragen));
      const werkwoorden = (v.zin.match(/\*([^*]+)\*/g) ?? []).map((w) => w.replace(/\*/g, '').toLowerCase());
      const zin = v.zin.replace(/\*/g, '');
      const sorteer = (l) => [...l].sort().join(' ');
      return {
        ...basis,
        vraag: MEESTER_VRAAG.vraagWwg,
        voorbeeld: zin,
        vakken: werkwoorden.length,
        controleer: (t) => sorteer(schoon(t).split(' ')) === sorteer(werkwoorden),
        antwoord: werkwoorden.join(' '),
        uitleg: `Werkwoordelijk gezegde: <mark>${werkwoorden.join(' ')}</mark>`,
      };
    }
  }
}
