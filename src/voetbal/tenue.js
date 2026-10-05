import * as THREE from 'three';
import { trekAan } from '../kleding.js';
import { mat, canvasTextuur } from '../wereld/helpers.js';

/** Tenue van een team: shirt (met streep), broek en sokken-kleur. */
export const TENUES = {
  bunders: { shirt: '#1c7ed6', streep: '#ffd43b', broek: 0xffffff, nummerKleur: '#ffffff' },
};

const shirtCache = new Map();
function shirtMateriaal(t) {
  const sleutel = t.shirt + t.streep;
  if (!shirtCache.has(sleutel)) {
    const tex = canvasTextuur(128, 64, (ctx, b, h) => {
      ctx.fillStyle = t.shirt; ctx.fillRect(0, 0, b, h);
      ctx.fillStyle = t.streep; ctx.fillRect(0, h * 0.42, b, h * 0.16); // brede band over de borst
    });
    shirtCache.set(sleutel, new THREE.MeshLambertMaterial({ map: tex }));
  }
  return shirtCache.get(sleutel);
}

/**
 * Trekt het teamtenue aan. De speler houdt zijn gekochte hoofddeksel, schoenen en extra's;
 * het shirt en de broek worden die van het team.
 */
export function trekTenueAan(speler, tenue, kleding = null) {
  if (kleding) trekAan(speler, { ...kleding, shirt: null, broek: null });
  const d = speler.delen;
  d.lijf.material = shirtMateriaal(tenue);
  d.mouwen.forEach((m) => { m.material = mat(new THREE.Color(tenue.shirt).getHex()); });
  d.broeken.forEach((m) => { m.material = mat(tenue.broek); });
  // Geen gewone schooltas op het veld (een gekochte rugzak of cape mag wel).
  const eigenRugzak = kleding?.extra?.includes('rugzak-paars') || kleding?.extra?.includes('cape');
  if (!eigenRugzak) d.rugzak.forEach((m) => { m.visible = false; });
}
