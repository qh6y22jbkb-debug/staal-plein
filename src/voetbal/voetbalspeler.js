import * as THREE from 'three';
import { Speler } from '../speler.js';
import { trekTenueAan } from './tenue.js';
import { mat } from '../wereld/helpers.js';

const HAAR = [0x3b2314, 0xe0a33a, 0x1d1d1d, 0x7a4a24, 0xc92a2a, 0x5c3a1a];
const HUID = [0xf2c29b, 0xe8b48f, 0xc68a5a, 0x8d5a3b, 0xf7d1b5];

/**
 * Een speler in de wedstrijd: het bekende poppetje plus team, rol (keeper/veld) en een vaste plek.
 */
export class VoetbalSpeler {
  /**
   * @param figuur  bestaande Speler (de eigen speler) of null (dan wordt er een nieuw poppetje gemaakt)
   */
  constructor(scene, { team, rol, plek, tenue, nummer, figuur = null }) {
    this.team = team;
    this.rol = rol; // 'keeper' of 'veld'
    this.plek = plek; // { x, z }: plek in de opstelling (eigen helft, aanvalsrichting +x)
    this.nummer = nummer;
    this.eigenFiguur = !!figuur;
    if (figuur) {
      this.figuur = figuur;
    } else {
      const k = nummer * 7 + team.richting * 3;
      this.figuur = new Speler(scene, {
        snelheid: 1, pet: null, rugzak: null,
        haar: HAAR[Math.abs(k) % HAAR.length], huid: HUID[Math.abs(k + 2) % HUID.length],
        kapsel: ['kort', 'krullen', 'kort', 'paardenstaart'][Math.abs(k) % 4],
      });
      trekTenueAan(this.figuur, tenue);
      if (rol === 'keeper') {
        // Keeper: ander shirt en handschoenen.
        const kleur = team.richting > 0 ? 0xff922b : 0x868e96;
        this.figuur.delen.lijf.material = mat(kleur);
        this.figuur.delen.mouwen.forEach((m) => { m.material = mat(kleur); });
        this.figuur.armen.forEach((arm) => { arm.children[1].material = mat(0xffffff); arm.children[1].scale.setScalar(1.35); });
      }
    }
    this.figuur.uiterlijk.snelheid = 1; // we geven de snelheid zelf mee (in meter per seconde)
    this.snelheidNu = new THREE.Vector3();
    this.beslisTimer = Math.random() * 0.3;
    this.duik = 0; // keeper-duik animatie
  }

  get pos() { return this.figuur.positie; }
  get richting() { return this.figuur.richting; }
  get kijk() { return new THREE.Vector3(Math.sin(this.figuur.richting), 0, Math.cos(this.figuur.richting)); }

  /** Loop met een snelheid (m/s) in een richting (genormaliseerd of 0). */
  loop(dt, richtingX, richtingZ, snelheid, botsing, draaiMee = true) {
    const oud = this.pos.clone();
    this.figuur.update(dt, { x: richtingX * snelheid, z: richtingZ * snelheid }, false, botsing, { draaiMee });
    this.snelheidNu.copy(this.pos).sub(oud).divideScalar(Math.max(dt, 1e-4));
  }

  /** Loop naar een punt; vlak bij het punt rustig afremmen. Geeft de afstand terug. */
  loopNaar(dt, doelX, doelZ, snelheid, botsing) {
    const dx = doelX - this.pos.x, dz = doelZ - this.pos.z;
    const afst = Math.hypot(dx, dz);
    if (afst < 0.15) { this.loop(dt, 0, 0, 0, botsing); return afst; }
    const f = Math.min(1, afst / 1.5);
    this.loop(dt, dx / afst, dz / afst, snelheid * f, botsing);
    return afst;
  }

  /** Draai naar een punt zonder te lopen. */
  kijkNaar(x, z) {
    this.figuur.richting = Math.atan2(x - this.pos.x, z - this.pos.z);
  }

  /** Keeper-duik: even schuin vallen naar links of rechts. */
  update(dt) {
    if (this.duik !== 0) {
      const teken = Math.sign(this.duik);
      this.duik -= teken * dt * 1.6;
      if (Math.sign(this.duik) !== teken) this.duik = 0;
      this.figuur.model.rotation.z = this.duik * 1.1;
      this.figuur.model.position.y = -Math.abs(this.duik) * 0.4;
    } else if (this.figuur.model.rotation.z) {
      this.figuur.model.rotation.z = 0;
    }
  }

  verwijder() {
    if (!this.eigenFiguur) this.figuur.groep.removeFromParent();
  }
}
