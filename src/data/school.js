/*
 * Welke wereld zit er in de school (Leergroep 3)? Dat volgt uit src/data/onderdelen.js:
 *   rekenwereld aan   → de rekenwereld (src/data/rekenen.js)
 *   anders, spellingwereld aan → de Spellingwereld (src/data/spelling.js)
 *   allebei uit       → de school is dicht
 */
import { ONDERDELEN, VARIANT } from './onderdelen.js';
import { LEERGROEP as REKEN_LEERGROEP, LOKALEN as REKEN_LOKALEN } from './rekenen.js';
import { SPELLING_LEERGROEP, SPELLING_LOKALEN } from './spelling.js';

export const SCHOOL_SOORT = ONDERDELEN.rekenwereld ? 'rekenen' : ONDERDELEN.spellingwereld ? 'spelling' : null;

/** Teksten van de school (deurbord, titel, welkom, wachtwoord). */
// In de bouwvariant Rekenplein zet de leerkracht het spel zelf aan: dan geen wachtwoord op de school.
export const LEERGROEP = SCHOOL_SOORT === 'spelling'
  ? { ...REKEN_LEERGROEP, ...SPELLING_LEERGROEP }
  : VARIANT === 'rekenen' ? { ...REKEN_LEERGROEP, wachtwoord: '' } : REKEN_LEERGROEP;

/** De zes lokalen (borden boven de deuren). */
export const LOKALEN = SCHOOL_SOORT === 'spelling' ? SPELLING_LOKALEN : REKEN_LOKALEN;
