import { KLEURKIEZER_KLEUREN, WINKEL } from '../data/oefeningen.js';

const hex = (k) => `#${k.toString(16).padStart(6, '0')}`;

/**
 * Kleurkiezer: 12 vaste vrolijke kleuren (KLEURKIEZER_KLEUREN in het databestand) en een knop "Origineel".
 * Gebruikt in de kledingkast voor shirts (en later voor fiets en step).
 * @param huidige   de kleur die nu gekozen is (of null = origineel)
 * @param opKies    (kleur | null) => void
 */
export function maakKleurkiezer({ huidige = null, opKies, label = WINKEL.kleurKiezen }) {
  const el = document.createElement('div');
  el.className = 'kleurkiezer';
  el.setAttribute('role', 'radiogroup');
  el.setAttribute('aria-label', label);
  el.innerHTML = `
    <span class="kk-label">${label}</span>
    ${KLEURKIEZER_KLEUREN.map((k) => `
      <button type="button" class="kk-kleur${huidige === k.kleur ? ' gekozen' : ''}" style="--kleur:${hex(k.kleur)}"
        data-kleur="${k.kleur}" role="radio" aria-checked="${huidige === k.kleur}" aria-label="${k.naam}" title="${k.naam}"></button>`).join('')}
    <button type="button" class="kk-origineel${huidige == null ? ' gekozen' : ''}" data-kleur="" role="radio" aria-checked="${huidige == null}">${WINKEL.kleurOrigineel}</button>`;
  el.addEventListener('click', (e) => {
    const knop = e.target.closest('button[data-kleur]');
    if (!knop) return;
    e.stopPropagation();
    const kleur = knop.dataset.kleur === '' ? null : Number(knop.dataset.kleur);
    for (const b of el.querySelectorAll('button')) {
      const aan = b === knop;
      b.classList.toggle('gekozen', aan);
      b.setAttribute('aria-checked', aan);
    }
    opKies?.(kleur);
  });
  return el;
}
