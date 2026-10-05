import * as THREE from 'three';
import { Speler } from '../speler.js';
import { Botsing } from '../wereld/botsing.js';
import { Poort } from '../poort.js';
import { VOETBAL } from '../data/oefeningen.js';
import { confetti } from '../ui/confetti.js';
import { bouwStadion, HALF_L } from './stadion.js';
import { Bal, BAL_STRAAL } from './bal.js';
import { trekTenueAan, TENUES } from './tenue.js';
import { VoetbalHud } from './voetbalhud.js';

// Eigen speler.
const LOOPSNELHEID = 6;
const SPRINT_FACTOR = 1.55;
const ENERGIE_OP = 0.45; // per seconde sprinten
const ENERGIE_BIJ = 0.22; // per seconde bijvullen
const LAADTIJD = 1.0; // seconden tot een vol schot
const SCHOT_MIN = 9, SCHOT_MAX = 24;
const SPELER_STRAAL = 0.45;

// Het speelgebied (waar spelers en bal kunnen komen), binnen de reclameborden.
const GRENZEN = { minX: -27, maxX: 27, minZ: -16, maxZ: 16 };

const TOETSEN = {
  vooruit: ['KeyW', 'ArrowUp'], achteruit: ['KeyS', 'ArrowDown'],
  links: ['KeyA', 'ArrowLeft'], rechts: ['KeyD', 'ArrowRight'],
  sprint: ['ShiftLeft', 'ShiftRight'], schiet: ['Space'],
};

/**
 * De Voetbalwereld. Wordt pas gemaakt als je door de poort loopt,
 * en weer helemaal opgeruimd (dispose) als je teruggaat naar het schoolplein.
 * Stap 2: stadion, bal en de eigen speler (rondlopen, dribbelen, schieten op een leeg doel).
 */
export class VoetbalWereld {
  constructor({ camera, besturing, uiLaag, geluid, kleding, opTerug, toonWolkje }) {
    this.camera = camera;
    this.besturing = besturing;
    this.geluid = geluid;
    this.opTerug = opTerug;
    this.toonWolkje = toonWolkje;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x8fd0ff);
    this.scene.fog = new THREE.Fog(0xcfeaff, 90, 220);

    this.scene.add(new THREE.HemisphereLight(0xe3f4ff, 0x5f9a46, 1.7));
    this.zon = new THREE.DirectionalLight(0xfff2d6, 2.6);
    this.zon.castShadow = true;
    this.zon.shadow.mapSize.set(1024, 1024);
    Object.assign(this.zon.shadow.camera, { left: -26, right: 26, top: 26, bottom: -26, near: 1, far: 120 });
    this.zon.shadow.normalBias = 0.03;
    this.scene.add(this.zon, this.zon.target);

    this.stadion = bouwStadion(this.scene);
    this.stadion.scorebord.zet({ thuis: VOETBAL.thuisTeam, uit: VOETBAL.oefenen, scoreThuis: 0, scoreUit: 0, tijd: '--:--' });

    // Poort terug naar het schoolplein, achter het eigen doel; binnenkant = het veld (+x).
    this.botsing = new Botsing(GRENZEN);
    this.poort = new Poort(this.scene, { x: -26.8, z: 0, draai: Math.PI, bord: VOETBAL.terugBord, open: true, botsing: this.botsing });

    this.bal = new Bal(this.scene, GRENZEN);

    this.speler = new Speler(this.scene, { snelheid: LOOPSNELHEID });
    trekTenueAan(this.speler, TENUES.bunders, kleding);
    this.speler.positie.set(-6, 0, 0);
    this.speler.richting = Math.PI / 2; // kijkt naar het doel van de tegenstander (+x)

    this.hud = new VoetbalHud(uiLaag, besturing.isTouch);
    this.energie = 1;
    this.laden = -1; // < 0: niet aan het laden; anders tijd sinds ingedrukt
    this.schietToetsVorige = false;
    this.balVrijTot = 0; // na een schot even geen balcontrole
    this.tijd = 0;
    this.doelpunten = 0;
    this.goalTimer = 0;
    this.camFocus = new THREE.Vector3(-4, 0, 0);
    this.weg = false;
  }

  /** Is een toets (of touchknop) ingedrukt? */
  toets(naam) {
    return TOETSEN[naam].some((c) => this.besturing.ingedrukt.has(c)) || !!this.hud.knop[naam];
  }

  /** Richting in de wereld: W = naar het doel van de tegenstander (+x), D = naar rechts (+z). */
  invoer() {
    const b = this.besturing;
    let x = (this.toets('vooruit') ? 1 : 0) - (this.toets('achteruit') ? 1 : 0) - b.joystick.y;
    let z = (this.toets('rechts') ? 1 : 0) - (this.toets('links') ? 1 : 0) + b.joystick.x;
    const l = Math.hypot(x, z);
    if (l > 1) { x /= l; z /= l; }
    return { x, z, actief: l > 0.12 };
  }

  update(dt) {
    if (this.weg) return;
    this.tijd += dt;
    this.besturing.neemSprong(); // spatie is hier schieten, niet springen
    this.besturing.neemCamera();

    // Lopen en sprinten.
    const inv = this.besturing.aan ? this.invoer() : { x: 0, z: 0, actief: false };
    const wilSprinten = this.toets('sprint') && inv.actief && this.energie > 0.02;
    this.energie = THREE.MathUtils.clamp(this.energie + (wilSprinten ? -ENERGIE_OP : ENERGIE_BIJ) * dt, 0, 1);
    const factor = wilSprinten ? SPRINT_FACTOR : 1;
    const beweging = inv.actief ? { x: inv.x * factor, z: inv.z * factor } : { x: 0, z: 0 };
    const oud = this.speler.positie.clone();
    this.speler.update(dt, beweging, false, this.botsing);
    const spelerVel = this.speler.positie.clone().sub(oud).divideScalar(Math.max(dt, 1e-4));
    this.hud.zetEnergie(this.energie);

    this.updateBal(dt, spelerVel);
    this.updateSchieten(dt);

    this.bal.update(dt);
    this.controleerDoel(dt);
    this.stadion.update(dt);
    this.poort.update(dt);
    this.updateCamera(dt);

    this.zon.position.set(this.camFocus.x + 20, 40, this.camFocus.z + 18);
    this.zon.target.position.copy(this.camFocus);

    this.toonWolkje?.(this.poort.afstandTot(this.speler.positie) < 6 ? VOETBAL.wolkjeTerug : null);
    if (this.poort.isInOpening(this.speler.positie)) {
      this.weg = true;
      this.opTerug?.();
    }
  }

  /** Dribbelen: dichtbij en op de grond? Dan blijft de bal voor je voeten. */
  updateBal(dt, spelerVel) {
    const s = this.speler.positie, b = this.bal.pos;
    const kijk = new THREE.Vector3(Math.sin(this.speler.richting), 0, Math.cos(this.speler.richting));
    const afst = Math.hypot(b.x - s.x, b.z - s.z);
    this.heeftBal = false;
    if (this.tijd > this.balVrijTot && b.y < 0.8 && afst < 1.0) {
      this.heeftBal = true;
      const doel = s.clone().addScaledVector(kijk, 0.75);
      b.x += (doel.x - b.x) * Math.min(1, dt * 14);
      b.z += (doel.z - b.z) * Math.min(1, dt * 14);
      this.bal.vel.x = spelerVel.x;
      this.bal.vel.z = spelerVel.z;
    } else if (b.y < 1.2) {
      // Botsen tegen de speler zonder de bal te hebben.
      this.bal.botsCirkel(s.x, s.z, SPELER_STRAAL + BAL_STRAAL, 0.3);
    }
  }

  /** Spatie (of de Schiet-knop) vasthouden = kracht opbouwen, loslaten = schieten. */
  updateSchieten(dt) {
    const ingedrukt = this.besturing.aan && this.toets('schiet');
    if (ingedrukt && !this.schietToetsVorige) this.laden = 0;
    if (ingedrukt && this.laden >= 0) this.laden += dt;
    const kracht = this.laden >= 0 ? Math.min(1, this.laden / LAADTIJD) : 0;
    this.hud.zetKracht(kracht);
    if (!ingedrukt && this.schietToetsVorige && this.laden >= 0) {
      this.schiet(Math.max(0.15, kracht));
      this.laden = -1;
    }
    this.schietToetsVorige = ingedrukt;
  }

  schiet(kracht) {
    const s = this.speler.positie, b = this.bal.pos;
    const afst = Math.hypot(b.x - s.x, b.z - s.z);
    if (afst > 1.4 || b.y > 1.2) return; // te ver weg
    const richting = new THREE.Vector3(Math.sin(this.speler.richting), 0, Math.cos(this.speler.richting));
    this.bal.trap(richting, SCHOT_MIN + (SCHOT_MAX - SCHOT_MIN) * kracht, 1.5 + kracht * 5.5);
    this.balVrijTot = this.tijd + 0.35;
    this.geluid?.trap?.(kracht);
  }

  controleerDoel(dt) {
    if (this.goalTimer > 0) {
      this.goalTimer -= dt;
      if (this.goalTimer <= 0) {
        // Bal terug naar de middenstip.
        this.bal.zetOp(0, 0);
        this.balVrijTot = this.tijd + 0.2;
      }
      return;
    }
    const kant = this.bal.inDoel();
    if (!kant) return;
    this.goalTimer = 2.2;
    if (kant === 1) {
      this.doelpunten++;
      this.stadion.scorebord.zet({ thuis: VOETBAL.thuisTeam, uit: VOETBAL.oefenen, scoreThuis: this.doelpunten, scoreUit: 0, tijd: '--:--' });
      this.hud.toonGoal(VOETBAL.goal);
      this.stadion.publiek.juich(3);
      this.geluid?.juichen?.();
      confetti(140);
    } else {
      this.hud.toonGoal('Oeps! Eigen doel 😄');
    }
  }

  /** Camera schuin achter en boven de speler; de bal blijft goed in beeld. */
  updateCamera(dt) {
    const s = this.speler.positie, b = this.bal.pos;
    const doel = new THREE.Vector3().lerpVectors(s, b, Math.min(0.35, 6 / Math.max(6, s.distanceTo(b))));
    doel.x = THREE.MathUtils.clamp(doel.x, -HALF_L - 2, HALF_L + 2);
    this.camFocus.lerp(doel, Math.min(1, dt * 4));
    const f = this.camFocus;
    this.camera.position.set(f.x - 11, 10.5, f.z * 0.85);
    this.camera.lookAt(f.x + 2.5, 0.5, f.z);
  }

  /** Alles opruimen (geheugen van de grafische kaart vrijgeven). */
  dispose() {
    this.hud.weg();
    this.scene.traverse((o) => {
      o.geometry?.dispose?.();
      const materialen = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      for (const m of materialen) {
        m.map?.dispose?.();
        m.dispose?.();
      }
    });
    this.scene.clear();
  }
}
