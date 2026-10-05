import * as THREE from 'three';
import { HALF_L, HALF_B, VELD } from './stadion.js';

/*
 * De computerspelers. Simpel en eerlijk:
 * - veldspelers lopen naar de bal of naar een open plek, passen naar elkaar en schieten dichtbij het doel;
 * - de keeper beweegt mee met de bal en duikt naar schoten.
 */

const r = () => Math.random();

/** Plek in de opstelling, in wereldcoördinaten (team.richting = +1 of -1). */
export function wereldPlek(sp) {
  return { x: sp.plek.x * sp.team.richting, z: sp.plek.z };
}

/** Veldspeler zonder bal: waar moet ik heen? */
export function aiVeldspeler(ws, sp, dt) {
  const team = sp.team, inst = team.instellingen;
  const bal = ws.bal.pos;
  const eigenaar = ws.eigenaar;
  const plek = wereldPlek(sp);
  const vooruit = team.richting;

  // Heeft dit team de bal? Dan meelopen naar voren, op je eigen kant van het veld.
  if (eigenaar && eigenaar.team === team) {
    const doelX = THREE.MathUtils.clamp(plek.x + vooruit * 9 + (bal.x - plek.x) * 0.3, -HALF_L + 2, HALF_L - 2);
    const doelZ = THREE.MathUtils.clamp(plek.z * 1.3 + (bal.z - plek.z) * 0.2, -HALF_B + 1.5, HALF_B - 1.5);
    sp.loopNaar(dt, doelX, doelZ, inst.snelheid * 0.8, ws.botsing);
    return;
  }

  // Ben ik de dichtstbijzijnde van mijn team (en geen door het kind bestuurde speler dichterbij)? Dan naar de bal.
  if (ws.jager(team) === sp) {
    // Een beetje vooruit kijken waar de bal heen rolt.
    let doelX = bal.x + ws.bal.vel.x * 0.35;
    let doelZ = bal.z + ws.bal.vel.z * 0.35;
    if (eigenaar) {
      // De bal is van een ander: loop naar de voorkant van de bal (niet achter de speler blijven hangen).
      const vx = bal.x - eigenaar.pos.x, vz = bal.z - eigenaar.pos.z;
      const l = Math.hypot(vx, vz) || 1;
      doelX = bal.x + (vx / l) * 0.5;
      doelZ = bal.z + (vz / l) * 0.5;
    }
    sp.loopNaar(dt, doelX, doelZ, inst.snelheid * 1.12, ws.botsing); // achter de bal aan: een beetje sprinten
    return;
  }

  // Anders: terug naar je plek, een beetje opgeschoven richting de bal.
  const eigenDoelX = -vooruit * HALF_L;
  let doelX = plek.x + (bal.x - plek.x) * 0.35;
  let doelZ = plek.z + (bal.z - plek.z) * 0.35;
  // Verdediger: tussen de bal en het eigen doel blijven als de bal op onze helft is.
  if (sp.plek.x < -8 && Math.sign(bal.x) === Math.sign(eigenDoelX)) {
    const nx = eigenDoelX - bal.x, nz = -bal.z;
    const l = Math.hypot(nx, nz) || 1;
    doelX = bal.x + (nx / l) * 4;
    doelZ = bal.z + (nz / l) * 4;
  }
  sp.loopNaar(dt, doelX, doelZ, inst.snelheid * 0.75, ws.botsing);
}

/** Veldspeler mét bal: dribbelen, passen of schieten. */
export function aiMetBal(ws, sp, dt) {
  const team = sp.team, inst = team.instellingen;
  const vooruit = team.richting;
  const doelX = vooruit * HALF_L;
  const afstDoel = Math.hypot(doelX - sp.pos.x, sp.pos.z);

  sp.beslisTimer -= dt;
  if (sp.beslisTimer <= 0 && ws.balVrij(sp)) {
    sp.beslisTimer = 0.35 + r() * 0.35;
    // Dichtbij het doel: schieten (ook vanuit een schuine hoek).
    const voorDeLijn = vooruit * (doelX - sp.pos.x);
    if (afstDoel < 11 && voorDeLijn > 0.4 && Math.abs(sp.pos.z) < 8) {
      const fout = (1 - inst.schot) * (r() * 2 - 1) * 4.5; // slecht team schiet vaker naast
      const mikZ = THREE.MathUtils.clamp((r() * 2 - 1) * 1.9, -2, 2) + fout;
      const richting = new THREE.Vector3(doelX - sp.pos.x, 0, mikZ - sp.pos.z).normalize();
      ws.trap(sp, richting, 14 + inst.schot * 7 + r() * 3, 1.2 + r() * 2.2, 'schot');
      return;
    }
    // Een tegenstander vlak voor me? Of zomaar af en toe: passen.
    const druk = ws.tegenstanderDichtbij(sp, 2.6);
    if ((druk && r() < inst.passen + 0.2) || r() < inst.passen * 0.18) {
      const ontvanger = ws.vrijeTeamgenoot(sp);
      if (ontvanger) { ws.pass(sp, ontvanger); return; }
    }
  }
  // Dribbelen richting het doel, een beetje slingerend.
  // Te dicht bij de achterlijn? Dan naar binnen, richting de strafschopstip.
  const bijLijn = vooruit * (doelX - sp.pos.x) < 4;
  const slinger = Math.sin(ws.tijd * 1.3 + sp.nummer) * 3;
  const mikX = bijLijn ? doelX - vooruit * 6 : doelX;
  const mikZ = bijLijn ? 0 : THREE.MathUtils.clamp(sp.pos.z * 0.6 + slinger, -HALF_B + 2, HALF_B - 2);
  const dx = mikX - sp.pos.x, dz = mikZ - sp.pos.z;
  const l = Math.hypot(dx, dz) || 1;
  sp.loop(dt, dx / l, dz / l, inst.snelheid * 0.88, ws.botsing);
}

/** De keeper. */
export function aiKeeper(ws, sp, dt) {
  const team = sp.team, inst = team.instellingen;
  const vooruit = team.richting;
  const lijnX = -vooruit * HALF_L;
  const basisX = lijnX + vooruit * 0.9;
  const bal = ws.bal.pos, v = ws.bal.vel;

  // Keeper heeft de bal: even vasthouden en dan uitgooien naar een teamgenoot.
  if (ws.eigenaar === sp) {
    sp.kijkNaar(0, sp.pos.z);
    sp.vasthouden = (sp.vasthouden ?? 0) + dt;
    if (sp.vasthouden > 1.1) {
      sp.vasthouden = 0;
      const ontvanger = ws.vrijeTeamgenoot(sp, true);
      if (ontvanger) ws.pass(sp, ontvanger, true);
      else ws.trap(sp, new THREE.Vector3(vooruit, 0, 0), 16, 4, 'uittrap');
    }
    return;
  }

  // Tegenstander met de bal vlak bij het doel: uitkomen en de bal afpakken.
  const eig = ws.eigenaar;
  if (eig && eig.team !== team && Math.abs(bal.x - lijnX) < 6 && Math.abs(bal.z) < 7) {
    sp.loopNaar(dt, bal.x, bal.z, inst.snelheid * 0.9 + 1, ws.botsing);
    return;
  }

  // Losse bal vlakbij in het strafschopgebied: eropaf.
  const inGebied = Math.abs(bal.x - lijnX) < 5.5 && Math.abs(bal.z) < 6;
  if (!ws.eigenaar && inGebied && ws.bal.snelheid < 7 && ws.dichtsteSpeler(bal, sp.team) === sp) {
    sp.loopNaar(dt, bal.x, bal.z, inst.snelheid * 1.05 + 1, ws.botsing);
    return;
  }

  // Komt er een schot aan? Voorspel waar de bal de doellijn bereikt.
  let doelZ = THREE.MathUtils.clamp(bal.z * 0.45, -VELD.doelBreedte / 2 + 0.4, VELD.doelBreedte / 2 - 0.4);
  let snelheid = 4 + inst.keeper * 2;
  const naarDoel = Math.sign(v.x) === -vooruit && Math.abs(v.x) > 5;
  if (!ws.eigenaar && naarDoel) {
    const t = (basisX - bal.x) / v.x;
    if (t > 0 && t < 1.6) {
      const zVoorspeld = bal.z + v.z * t;
      if (Math.abs(zVoorspeld) < VELD.doelBreedte / 2 + 1.2) {
        doelZ = THREE.MathUtils.clamp(zVoorspeld, -VELD.doelBreedte / 2 - 0.3, VELD.doelBreedte / 2 + 0.3);
        snelheid = 5 + inst.keeper * 7; // duiken
        if (Math.abs(doelZ - sp.pos.z) > 0.9 && sp.duik === 0 && t < 0.6) sp.duik = Math.sign(doelZ - sp.pos.z) * -vooruit * 1;
      }
    }
  }
  sp.loopNaar(dt, basisX, doelZ, snelheid, ws.botsing);
  sp.kijkNaar(bal.x, bal.z);
}
