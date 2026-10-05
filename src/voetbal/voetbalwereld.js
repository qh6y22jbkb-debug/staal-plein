import * as THREE from 'three';
import { Speler } from '../speler.js';
import { Botsing } from '../wereld/botsing.js';
import { Poort } from '../poort.js';
import { VOETBAL, VOETBAL_TEAMS, VOETBAL_MUNTEN } from '../data/oefeningen.js';
import { Wedstrijd } from './wedstrijd.js';
import { toernooi, Toernooibord } from './toernooi.js';
import { Vuurwerk } from '../wereld/vuurwerk.js';
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
  pass: ['KeyQ'], wissel: ['KeyE'], start: ['Enter', 'NumpadEnter'],
};

/**
 * De Voetbalwereld. Wordt pas gemaakt als je door de poort loopt,
 * en weer helemaal opgeruimd (dispose) als je teruggaat naar het schoolplein.
 * Zonder wedstrijd: vrij oefenen op een leeg doel. Met de startknop begint een wedstrijd van 4 tegen 4.
 */
export class VoetbalWereld {
  constructor({ camera, besturing, uiLaag, geluid, kleding, opTerug, toonWolkje, beloon, muntenTotaal }) {
    this.beloon = beloon; // (aantal, vanElement, label): munten naar de teller
    this.muntenTotaal = muntenTotaal;
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

    // Bord "Kies je tegenstander" naast het veld.
    this.bord = new Toernooibord(this.scene, -8, -14.6);
    this.botsing.voegDoosToe(-10.7, -5.3, -14.9, -14.3, 5);
    this.vuurwerk = new Vuurwerk(this.scene, geluid);

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
    this.wedstrijd = null;
    this.vorigeToets = {};
    this.tegenstander = toernooi.volgendeTeam();
    this.hud.opStart = () => this.openKeuze();
    this.hud.opStop = () => this.stopWedstrijd(true);
    this.hud.zetStartKnop(VOETBAL.kiesTegenstander);
  }

  /** Keuzescherm met de drie tegenstanders (van makkelijk naar moeilijk). */
  openKeuze() {
    if (this.wedstrijd) this.stopWedstrijd(true);
    const teams = VOETBAL_TEAMS.map((team, i) => ({
      team,
      open: toernooi.isOpen(i),
      verslagen: toernooi.isVerslagen(team),
      slotTekst: i > 0 ? VOETBAL.opSlot.replace('{team}', VOETBAL_TEAMS[i - 1].naam) : '',
    }));
    this.hud.toonKeuze(teams, (team) => this.startWedstrijd(team));
  }

  /** Toets net ingedrukt (niet vastgehouden)? */
  netIngedrukt(naam) {
    const nu = this.toets(naam);
    const was = this.vorigeToets[naam];
    this.vorigeToets[naam] = nu;
    return nu && !was;
  }

  /* ---------- Wedstrijd ---------- */

  startWedstrijd(tegenstander) {
    this.tegenstander = tegenstander;
    this.stopWedstrijd();
    this.hud.verbergEinde();
    this.hud.zetStartKnop(null);
    this.goalTimer = 0;
    this.doelpuntenDezeWedstrijd = 0;
    this.wedstrijd = new Wedstrijd({
      scene: this.scene, bal: this.bal, botsing: this.botsing, eigenFiguur: this.speler,
      tegenstander, scorebord: this.stadion.scorebord, hud: this.hud, publiek: this.stadion.publiek, geluid: this.geluid,
      opGoal: (eigen, team) => {
        this.hud.toonGoal(eigen ? VOETBAL.goal : VOETBAL.goalTegen.replace('{team}', team.naam));
        this.geluid?.juichen?.();
        if (eigen) {
          confetti(150);
          this.doelpuntenDezeWedstrijd++;
          this.beloon?.(VOETBAL_MUNTEN.doelpunt, this.hud.goal, `+${VOETBAL_MUNTEN.doelpunt}`);
        }
      },
      opEinde: (uitslag) => this.toonEinde(uitslag),
    });
  }

  toonEinde({ thuis, uit, tegenstander }) {
    const gewonnen = thuis > uit;
    const resultaat = gewonnen ? VOETBAL.gewonnen : thuis === uit ? VOETBAL.gelijk : VOETBAL.verloren;
    const regels = [resultaat];
    let beker = false;
    let nieuwVrij = null;
    if (gewonnen) {
      confetti(200);
      this.geluid?.klaar?.();
      const winst = toernooi.registreerWinst(tegenstander);
      this.bord.teken();
      nieuwVrij = winst.nieuwVrij;
      beker = winst.beker;
    }

    // Munten: doelpunten (al gekregen tijdens de wedstrijd) + uitslag + eventueel de beker.
    const M = VOETBAL_MUNTEN;
    const doelpuntMunten = this.doelpuntenDezeWedstrijd * M.doelpunt;
    const uitslagMunten = gewonnen ? (tegenstander.winstMunten ?? 20) : thuis === uit ? M.gelijk : 0;
    const bekerMunten = beker ? M.beker : 0;
    const rij = (tekst, munten) => `<span class="vb-munt-rij"><span>${tekst}</span><b>${munten ? `+${munten}` : '–'}</b></span>`;
    const overzicht = [];
    if (this.doelpuntenDezeWedstrijd) overzicht.push(rij(VOETBAL.overzichtDoelpunten.replace('{aantal}', this.doelpuntenDezeWedstrijd).replace('{per}', M.doelpunt), doelpuntMunten));
    if (gewonnen) overzicht.push(rij(VOETBAL.overzichtWinst.replace('{team}', tegenstander.naam), uitslagMunten));
    else if (thuis === uit) overzicht.push(rij(VOETBAL.overzichtGelijk, uitslagMunten));
    if (bekerMunten) overzicht.push(rij(VOETBAL.overzichtBeker, bekerMunten));
    const totaal = doelpuntMunten + uitslagMunten + bekerMunten;
    const totaalNa = (this.muntenTotaal?.() ?? 0) + uitslagMunten + bekerMunten;
    regels.push(`<span class="vb-munten-overzicht">${overzicht.join('')}${totaal
      ? `<span class="vb-munt-rij totaal"><span>💰 ${VOETBAL.overzichtTotaal.replace('{aantal}', totaal)}</span><b><span class="munt klein"></span> ${totaalNa}</b></span>`
      : `<span class="vb-munt-rij"><span>${VOETBAL.overzichtVerlies}</span></span>`}</span>`);
    if (nieuwVrij) regels.push(`<span class="vb-nieuw">${VOETBAL.nieuwVrij.replace('{team}', nieuwVrij.naam)}</span>`);
    const geefMunten = () => {
      const plek = document.querySelector('.vb-munten-overzicht') ?? null;
      if (uitslagMunten) this.beloon?.(uitslagMunten, plek, `+${uitslagMunten}`);
      if (bekerMunten) setTimeout(() => this.beloon?.(bekerMunten, plek, `+${bekerMunten}`), 600);
    };
    const eindscherm = () => this.hud.toonEinde(VOETBAL.eindeTitel, `De Bunders ${thuis} - ${uit} ${tegenstander.naam}`, regels, [
      { tekst: `↻ ${VOETBAL.nogEenKeer}`, actie: () => this.startWedstrijd(tegenstander), hoofd: !gewonnen },
      { tekst: `⚽ ${VOETBAL.andereTegenstander}`, actie: () => this.openKeuze(), hoofd: gewonnen },
      { tekst: `🏫 ${VOETBAL.terugSchoolplein}`, actie: () => this.terugNaarSchoolplein() },
    ]);
    if (beker) this.vierBeker(() => { eindscherm(); geefMunten(); });
    else { eindscherm(); geefMunten(); }
  }

  /** Alle drie de teams verslagen: de Bunders Beker! Vuurwerk boven het stadion. */
  vierBeker(daarna) {
    this.hud.toonBeker(daarna);
    this.vuurwerk.richting = new THREE.Vector3(1, 0, 0);
    this.vuurwerk.start(14, new THREE.Vector3(this.camFocus.x - 4, 0, 0));
    this.stadion.publiek.juich(12);
    this.geluid?.feestmuziek?.();
    confetti(250);
  }

  /** Tikken op het tekstwolkje (touchscreen): bij het bord het keuzescherm openen. */
  wolkjeKlik() {
    if (!this.wedstrijd && !this.hud.eindeOpen && this.bord.afstandTot(this.speler.positie) < 4.5) this.openKeuze();
  }

  terugNaarSchoolplein() {
    this.stopWedstrijd(true);
    this.hud.verbergEinde();
    this.weg = true;
    this.opTerug?.();
  }

  /** Terug naar vrij oefenen. */
  stopWedstrijd(naarVeld = false) {
    if (!this.wedstrijd) return;
    this.wedstrijd.verwijder();
    this.wedstrijd = null;
    this.speler.uiterlijk.snelheid = LOOPSNELHEID;
    if (naarVeld) {
      this.hud.verbergEinde();
      this.speler.positie.set(-6, 0, 0);
      this.speler.richting = Math.PI / 2;
      this.bal.zetOp(0, 0);
      this.stadion.scorebord.zet({ thuis: VOETBAL.thuisTeam, uit: VOETBAL.oefenen, scoreThuis: 0, scoreUit: 0, tijd: '--:--' });
      this.hud.zetStand(null);
      this.hud.zetStartKnop(VOETBAL.kiesTegenstander);
    }
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
    this.vuurwerk.update(dt);
    if (this.wedstrijd) { this.updateWedstrijd(dt); return; }
    const bijBord = this.bord.afstandTot(this.speler.positie) < 4.5;
    const eKnop = this.netIngedrukt('wissel');
    if (this.hud.eindeOpen) {
      if (this.besturing.ingedrukt.has('Escape') && !this.wedstrijd) this.hud.verbergEinde();
    } else if (this.netIngedrukt('start') || (bijBord && eKnop)) {
      this.openKeuze();
    }

    // Lopen en sprinten.
    const inv = this.besturing.aan && !this.hud.eindeOpen ? this.invoer() : { x: 0, z: 0, actief: false };
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

    const bordTekst = this.besturing.isTouch ? VOETBAL.bordTik : VOETBAL.bordWolkje;
    this.toonWolkje?.(this.hud.eindeOpen ? null
      : this.bord.afstandTot(this.speler.positie) < 4.5 ? bordTekst
        : this.poort.afstandTot(this.speler.positie) < 6 ? VOETBAL.wolkjeTerug : null);
    if (this.poort.isInOpening(this.speler.positie)) {
      this.weg = true;
      this.opTerug?.();
    }
  }

  updateWedstrijd(dt) {
    const ws = this.wedstrijd;
    if (this.besturing.ingedrukt.has('Escape') && !this.hud.eindeOpen) { this.stopWedstrijd(true); return; }
    const inv = this.besturing.aan && !this.hud.eindeOpen ? this.invoer() : { x: 0, z: 0, actief: false };
    const wilSprinten = this.toets('sprint') && inv.actief && this.energie > 0.02;
    this.energie = THREE.MathUtils.clamp(this.energie + (wilSprinten ? -ENERGIE_OP : ENERGIE_BIJ) * dt, 0, 1);
    this.hud.zetEnergie(this.energie);
    // Schot: kracht opbouwen met spatie / Schiet-knop, loslaten = schieten.
    const ingedrukt = this.besturing.aan && this.toets('schiet');
    if (ingedrukt && !this.schietToetsVorige) this.laden = 0;
    if (ingedrukt && this.laden >= 0) this.laden += dt;
    const kracht = this.laden >= 0 ? Math.min(1, this.laden / LAADTIJD) : 0;
    this.hud.zetKracht(kracht);
    let schot = null;
    if (!ingedrukt && this.schietToetsVorige && this.laden >= 0) { schot = Math.max(0.15, kracht); this.laden = -1; }
    this.schietToetsVorige = ingedrukt;

    ws.update(dt, {
      ...inv,
      sprint: wilSprinten,
      schot,
      pass: this.netIngedrukt('pass') || this.hud.neemTik('pass'),
      wissel: this.netIngedrukt('wissel') || this.hud.neemTik('wissel'),
    });
    this.stadion.update(dt);
    this.poort.update(dt);
    this.updateCamera(dt, ws.gebruiker.pos);
    this.zon.position.set(this.camFocus.x + 20, 40, this.camFocus.z + 18);
    this.zon.target.position.copy(this.camFocus);
    this.toonWolkje?.(null);
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
  updateCamera(dt, volg = this.speler.positie) {
    const s = volg, b = this.bal.pos;
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
