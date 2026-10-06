import '../ui/minispellen.css';
import { REKEN_SPELLEN, REKEN_TEKSTEN_SPEL } from '../data/rekenen.js';
import { DhteSpel } from './dhtespel.js';
import { geluid } from '../geluid.js';
import { voorlezen } from '../voorlezen.js';
import { munten } from '../munten.js';
import { rekenvoortgang } from '../rekenvoortgang.js';

/* De rekenspellen van Leergroep 3. Deze code wordt pas geladen als je een rekenspel start. */
const SPEL_PER_KRAAM = {
  plus: DhteSpel,
  min: DhteSpel,
  keer: DhteSpel,
};

export function heeftRekenspel(id) {
  return !!SPEL_PER_KRAAM[id];
}

export function startRekenspel(kraam, opties) {
  const Spel = SPEL_PER_KRAAM[kraam.data.id];
  const data = { ...REKEN_SPELLEN[kraam.data.id], klaarTekst: REKEN_TEKSTEN_SPEL.klaarTekst, terugTekst: REKEN_TEKSTEN_SPEL.terug };
  const spel = new Spel({ geluid, voorlezen, muntenTotaal: () => munten.totaal, voortgang: rekenvoortgang, ...opties, kraam, data });
  spel.start();
  return spel;
}
