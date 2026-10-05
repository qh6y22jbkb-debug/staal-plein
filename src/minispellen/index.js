import { SPELLEN } from '../data/oefeningen.js';
import { KofschipSpel } from './kofschip.js';
import { TaartenSpel } from './taarten.js';
import { DrummerSpel } from './drummer.js';
import { VoorvoegselSpel } from './voorvoegsel.js';
import { PoffertjesSpel } from './poffertjes.js';
import { IjsSpel } from './ijs.js';
import '../ui/minispellen.css';
import { geluid } from '../geluid.js';
import { voorlezen } from '../voorlezen.js';

const SPEL_PER_KRAAM = {
  kofschip: KofschipSpel,
  taarten: TaartenSpel,
  drummer: DrummerSpel,
  voorvoegsel: VoorvoegselSpel,
  poffertjes: PoffertjesSpel,
  ijs: IjsSpel,
};

/** Start het minispel van een kraam. */
export function startMinispel(kraam, opties) {
  const Spel = SPEL_PER_KRAAM[kraam.data.id];
  const spel = new Spel({ geluid, voorlezen, ...opties, kraam, data: SPELLEN[kraam.data.id] });
  spel.start();
  return spel;
}
