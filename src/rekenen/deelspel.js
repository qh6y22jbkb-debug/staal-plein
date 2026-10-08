import { DhteSpel } from './dhtespel.js';
import { REKEN_TEKSTEN_SPEL, REKEN_FOUT } from '../data/rekenen.js';
import { bouwStaartdeling } from './staartdeling.js';
import { StaartdelingSchema } from './staartdelingschema.js';

const T = REKEN_TEKSTEN_SPEL;

/**
 * Dina Deel: de staartdeling, stap voor stap. Zelfde spel als het DHTE-schema
 * (niveaus, munten, per stap nakijken, tips van de meesters), met een eigen schema.
 */
export class DeelSpel extends DhteSpel {
  bouwModel(som) { return bouwStaartdeling(som); }

  maakWeergave(model) {
    return new StaartdelingSchema(model, { kolomNamen: T.kolommen, opControleer: () => this.controleer(), restTekst: T.rest });
  }

  uitlegTekst() { return T.uitlegDeel; }

  goedTekst(som) {
    return `${this.somTekst(som)} = <b>${som.antwoord}${som.rest ? ` ${T.rest} ${som.rest}` : ''}</b>`;
  }

  /** Vriendelijke hint bij de eerste stap waar het misgaat. */
  hint(kijk) {
    const stap = this.schema.stappen.find((s) => !kijk.goedPerStap[s.nr]);
    const fouteCel = kijk.cellenFout.find((c) => c.stap === stap.nr);
    const sjabloon = {
      antwoord: REKEN_FOUT.deelAntwoord, keer: REKEN_FOUT.deelKeer, aftrek: REKEN_FOUT.deelAftrekken,
      omlaag: REKEN_FOUT.deelOmlaag, rest: REKEN_FOUT.deelRest,
    }[fouteCel?.soort] ?? REKEN_FOUT.deelAntwoord;
    let tekst = sjabloon.replace('{stukje}', stap.stukje).replace('{deler}', stap.deler);
    if (this.pogingen >= 1) tekst += ` ${T.koenTip}`;
    return tekst;
  }
}
