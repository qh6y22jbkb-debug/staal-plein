/* Nakijken van de Werkwoordenwereld (los bestand, zodat de tests het ook kunnen gebruiken). */

/** Getypt antwoord netjes maken: kleine letters, geen punt of uitroepteken, geen "ik"/"wij" ervoor. */
export function schoonAntwoord(tekst) {
  return String(tekst ?? '')
    .toLowerCase()
    .replace(/[.!?,;:"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(ik|jij|je|hij|zij|ze|wij|we|jullie|het)\s+/, '');
}

/** Alle goede antwoorden van een vraagdeel (goed mag een woord of een lijstje zijn). */
export function goedeAntwoorden(deel) {
  return (Array.isArray(deel.goed) ? deel.goed : [deel.goed]).map((g) => String(g));
}

export function isGoed(deel, tekst) {
  const t = schoonAntwoord(tekst);
  return goedeAntwoorden(deel).some((g) => schoonAntwoord(g) === t);
}

/** Een vraag als lijstje delen (een gewone vraag is één deel). */
export function delenVan(vraag) {
  return vraag.delen ?? [{ kies: vraag.kies, goed: vraag.goed, tip: vraag.tip }];
}
