import * as THREE from 'three';
import { VOETBAL, VOETBAL_WEDSTRIJD } from '../data/oefeningen.js';
import { HALF_L, HALF_B } from './stadion.js';
import { BAL_STRAAL } from './bal.js';
import { VoetbalSpeler } from './voetbalspeler.js';
import { TENUES } from './tenue.js';
import { aiVeldspeler, aiMetBal, aiKeeper, wereldPlek } from './voetbalai.js';

// Opstelling (eigen helft, aanvalsrichting +x): keeper, verdediger, twee aanvallers.
const OPSTELLING = [
  { rol: 'keeper', plek: { x: -19.1, z: 0 } },
  { rol: 'veld', plek: { x: -11, z: 0 } },
  { rol: 'veld', plek: { x: -3.5, z: -5 } },
  { rol: 'veld', plek: { x: -3.5, z: 5 } },
];
const BAL_AFSTAND = 0.75; // bal voor de voeten van de eigenaar
const OPPAK_AFSTAND = 0.95;
const SPELER_STRAAL = 0.45;

/**
 * Een wedstrijd van 4 tegen 4. De Bunders (thuis) spelen naar +x, de tegenstander naar -x.
 * Het kind bestuurt één veldspeler van De Bunders; de rest doet de computer.
 */
export class Wedstrijd {
  constructor({ scene, bal, botsing, eigenFiguur, tegenstander, scorebord, hud, publiek, geluid, opGoal, opEinde }) {
    this.scene = scene;
    this.bal = bal;
    this.botsing = botsing;
    this.scorebord = scorebord;
    this.hud = hud;
    this.publiek = publiek;
    this.geluid = geluid;
    this.opGoal = opGoal;
    this.opEinde = opEinde;
    this.tegenstanderInfo = tegenstander;

    this.thuis = { naam: 'De Bunders', kort: VOETBAL.thuisTeam, richting: 1, instellingen: VOETBAL_WEDSTRIJD.eigenTeam, spelers: [], score: 0 };
    this.uit = { naam: tegenstander.naam, kort: tegenstander.kort, richting: -1, instellingen: tegenstander, spelers: [], score: 0 };

    OPSTELLING.forEach((o, i) => {
      // De eigen speler (met gekochte kleding) is aanvaller nummer 1.
      const figuur = i === 2 ? eigenFiguur : null;
      this.thuis.spelers.push(new VoetbalSpeler(scene, { team: this.thuis, rol: o.rol, plek: o.plek, tenue: TENUES.bunders, nummer: i + 1, figuur }));
      this.uit.spelers.push(new VoetbalSpeler(scene, { team: this.uit, rol: o.rol, plek: o.plek, tenue: tegenstander.tenue, nummer: i + 1 }));
    });
    this.spelers = [...this.thuis.spelers, ...this.uit.spelers];
    this.gebruiker = this.thuis.spelers[2];

    // Ringetje onder de speler die je bestuurt.
    this.ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.75, 28), new THREE.MeshBasicMaterial({ color: 0xffd43b, transparent: true, opacity: 0.9 }));
    this.ring.rotation.x = -Math.PI / 2;
    scene.add(this.ring);

    this.eigenaar = null;
    this.laatsteTeam = null;
    this.vrijVoor = new Map(); // speler → tijd tot hij de bal weer mag pakken
    this.beschermdTot = 0; // na een herstart even niet afpakken
    this.tijd = 0;
    this.tijdOver = VOETBAL_WEDSTRIJD.duurMinuten * 60;
    this.fase = 'aftrap';
    this.faseTimer = 1.5;
    this.aftrapVoor = this.thuis;
    this.zetAftrap(this.thuis);
    this.werkScorebordBij();
  }

  /* ---------- Hulpjes voor de AI ---------- */

  ander(team) { return team === this.thuis ? this.uit : this.thuis; }

  /** Mag deze speler de bal (weer) aanraken? */
  balVrij(sp) { return this.tijd >= (this.vrijVoor.get(sp) ?? 0); }

  dichtsteSpeler(punt, team, alleenVeld = false) {
    let beste = null, besteAfst = Infinity;
    for (const sp of team.spelers) {
      if (alleenVeld && sp.rol === 'keeper') continue;
      const d = Math.hypot(sp.pos.x - punt.x, sp.pos.z - punt.z);
      if (d < besteAfst) { beste = sp; besteAfst = d; }
    }
    return beste;
  }

  /**
   * Welke computerspeler van dit team gaat achter de bal aan?
   * Bij De Bunders niet als het kind het dichtst bij is — behalve als de bal op onze eigen helft is:
   * dan helpt de dichtstbijzijnde computerspeler ook mee verdedigen.
   */
  jager(team) {
    const j = this.dichtsteSpeler(this.bal.pos, team, true);
    if (team !== this.thuis || j !== this.gebruiker) return j;
    if (this.bal.pos.x > -2) return null;
    let beste = null, besteAfst = Infinity;
    for (const sp of team.spelers) {
      if (sp.rol === 'keeper' || sp === this.gebruiker) continue;
      const d = sp.pos.distanceTo(this.bal.pos);
      if (d < besteAfst) { beste = sp; besteAfst = d; }
    }
    return beste;
  }

  tegenstanderDichtbij(sp, afstand) {
    return this.ander(sp.team).spelers.some((t) => Math.hypot(t.pos.x - sp.pos.x, t.pos.z - sp.pos.z) < afstand);
  }

  /** Een teamgenoot die vrij staat (en het liefst vooruit). */
  vrijeTeamgenoot(sp, ookAchteruit = false) {
    let beste = null, besteScore = -Infinity;
    for (const t of sp.team.spelers) {
      if (t === sp || t.rol === 'keeper') continue;
      const vooruit = (t.pos.x - sp.pos.x) * sp.team.richting;
      if (!ookAchteruit && vooruit < -6) continue;
      const vrij = Math.min(...this.ander(sp.team).spelers.map((o) => Math.hypot(o.pos.x - t.pos.x, o.pos.z - t.pos.z)));
      const afst = Math.hypot(t.pos.x - sp.pos.x, t.pos.z - sp.pos.z);
      const score = vrij * 1.2 + vooruit * 0.3 - Math.abs(afst - 9) * 0.3;
      if (score > besteScore) { besteScore = score; beste = t; }
    }
    return beste;
  }

  /* ---------- Acties ---------- */

  /** Trap de bal weg (schot, pass of uittrap). */
  trap(sp, richting, snelheid, omhoog, soort) {
    this.eigenaar = null;
    this.laatsteTeam = sp.team;
    this.bal.pos.x = sp.pos.x + richting.x * 0.6;
    this.bal.pos.z = sp.pos.z + richting.z * 0.6;
    this.bal.trap(richting, snelheid, omhoog);
    this.vrijVoor.set(sp, this.tijd + 0.4);
    this.laatsteSoort = soort;
    this.geluid?.trap?.(Math.min(1, snelheid / 24));
  }

  /** Pass naar een teamgenoot: mik een beetje voor hem uit. */
  pass(sp, naar, hoog = false) {
    const doel = naar.pos.clone().addScaledVector(naar.snelheidNu, 0.35);
    const richting = doel.sub(sp.pos).setY(0);
    const afst = richting.length();
    richting.normalize();
    const snelheid = THREE.MathUtils.clamp(6 + afst * 0.95, 8, 19);
    this.trap(sp, richting, snelheid, hoog ? 3 + afst * 0.15 : afst > 12 ? 2 : 0.4, 'pass');
  }

  /** Het kind wisselt naar de veldspeler die het dichtst bij de bal is. */
  wissel() {
    let beste = null, besteAfst = Infinity;
    for (const sp of this.thuis.spelers) {
      if (sp.rol === 'keeper' || sp === this.gebruiker) continue;
      const d = sp.pos.distanceTo(this.bal.pos);
      if (d < besteAfst) { beste = sp; besteAfst = d; }
    }
    if (beste && this.eigenaar !== this.gebruiker) this.gebruiker = beste;
  }

  /* ---------- Herstarts ---------- */

  /** Alle spelers op hun plek, bal op de middenstip, het team dat aftrapt heeft de bal. */
  zetAftrap(team) {
    for (const sp of this.spelers) {
      const p = wereldPlek(sp);
      sp.pos.set(p.x, 0, p.z);
      sp.kijkNaar(0, sp.pos.z);
    }
    const nemer = team.spelers[2];
    nemer.pos.set(-team.richting * 0.9, 0, 0);
    nemer.kijkNaar(team.richting * 10, 0);
    this.bal.zetOp(0, 0);
    this.eigenaar = nemer;
    this.laatsteTeam = team;
    if (team === this.thuis) this.gebruiker = nemer;
    this.beschermdTot = this.tijd + 2.5;
  }

  /** Bal uit: na een korte pauze legt de computer hem terug en speelt het juiste team verder. */
  herstart(team, punt, soort) {
    this.fase = 'uit';
    this.faseTimer = 1.3;
    this.eigenaar = null;
    this.bal.vel.set(0, 0, 0);
    this.herstartInfo = { team, punt, soort };
    const tekst = { uit: VOETBAL.uitBal, hoek: VOETBAL.hoekschop, doel: VOETBAL.doelschop }[soort].replace('{team}', team.naam);
    this.hud.melding(tekst);
  }

  voerHerstartUit() {
    const { team, punt, soort } = this.herstartInfo;
    const nemer = soort === 'doel' ? team.spelers[0] : this.dichtsteSpeler(punt, team, true);
    nemer.pos.set(punt.x, 0, punt.z);
    nemer.kijkNaar(0, 0);
    this.bal.zetOp(punt.x, punt.z);
    this.eigenaar = nemer;
    this.laatsteTeam = team;
    this.beschermdTot = this.tijd + 1.5;
    if (team === this.thuis && nemer.rol !== 'keeper') this.gebruiker = nemer;
    this.fase = 'spel';
  }

  /* ---------- Per frame ---------- */

  /**
   * @param invoer { x, z, actief, sprint, schot (kracht of null), pass, wissel } van het kind
   */
  update(dt, invoer) {
    this.tijd += dt;
    const bezig = this.fase === 'spel';

    if (this.fase === 'aftrap' || this.fase === 'uit' || this.fase === 'goal') {
      this.faseTimer -= dt;
      if (this.faseTimer <= 0) {
        if (this.fase === 'aftrap') { this.fase = 'spel'; this.hud.melding(VOETBAL.aftrap); }
        else if (this.fase === 'uit') this.voerHerstartUit();
        else if (this.fase === 'goal') { this.zetAftrap(this.aftrapVoor); this.fase = 'aftrap'; this.faseTimer = 1.2; }
      }
    }
    if (this.fase === 'einde') return;

    if (bezig) {
      const voor = Math.ceil(this.tijdOver);
      this.tijdOver -= dt;
      if (Math.ceil(this.tijdOver) !== voor) this.werkScorebordBij();
      if (this.tijdOver <= 0) { this.eindig(); return; }
    }

    // Vangnet: het kind bestuurt altijd een veldspeler, nooit de keeper.
    if (this.gebruiker.rol === 'keeper') this.gebruiker = this.dichtsteSpeler(this.bal.pos, this.thuis, true);

    // Spelers bewegen (alleen tijdens het spel; bij een herstart staat iedereen even stil).
    if (bezig) {
      for (const sp of this.spelers) {
        if (sp === this.gebruiker) this.stuurGebruiker(dt, sp, invoer);
        else if (sp.rol === 'keeper') aiKeeper(this, sp, dt);
        else if (this.eigenaar === sp) aiMetBal(this, sp, dt);
        else aiVeldspeler(this, sp, dt);
      }
      if (invoer.wissel) this.wissel();
      this.houSpelersUitElkaar();
    }
    for (const sp of this.spelers) sp.update(dt);

    this.updateBal(dt, bezig);
    if (bezig) this.controleerUitEnDoel();

    // Ringetje onder de bestuurde speler.
    this.ring.position.set(this.gebruiker.pos.x, 0.04, this.gebruiker.pos.z);
  }

  stuurGebruiker(dt, sp, inv) {
    const snelheid = 6 * (inv.sprint ? 1.55 : 1);
    const sterkte = Math.min(1, Math.hypot(inv.x, inv.z));
    if (inv.actief) sp.loop(dt, inv.x / sterkte, inv.z / sterkte, snelheid * sterkte, this.botsing);
    else sp.loop(dt, 0, 0, 0, this.botsing);

    const heeftBal = this.eigenaar === sp;
    const balDichtbij = !this.eigenaar && sp.pos.distanceTo(this.bal.pos) < 1.4 && this.bal.pos.y < 1.2;
    if (inv.pass && heeftBal) {
      const ontvanger = this.passDoelVoorGebruiker(sp);
      if (ontvanger) this.pass(sp, ontvanger);
    } else if (inv.schot != null && (heeftBal || balDichtbij)) {
      // Schot in de kijkrichting, met een klein beetje hulp richting het doel.
      const kijk = sp.kijk;
      const naarDoel = new THREE.Vector3(HALF_L - sp.pos.x, 0, THREE.MathUtils.clamp(-sp.pos.z, -2, 2) * 0.6).normalize();
      if (kijk.dot(naarDoel) > 0.7 && HALF_L - sp.pos.x < 20) kijk.lerp(naarDoel, 0.35).normalize();
      this.trap(sp, kijk, 9 + 15 * inv.schot, 1.5 + inv.schot * 5, 'schot');
    }
  }

  /** Q: de dichtstbijzijnde teamgenoot in je looprichting (anders gewoon de dichtstbijzijnde). */
  passDoelVoorGebruiker(sp) {
    const kijk = sp.kijk;
    let beste = null, besteScore = Infinity;
    for (const t of this.thuis.spelers) {
      if (t === sp || t.rol === 'keeper') continue;
      const naar = t.pos.clone().sub(sp.pos).setY(0);
      const afst = naar.length();
      const hoek = kijk.dot(naar.normalize());
      const score = afst * (hoek > 0.4 ? 1 : 3);
      if (score < besteScore) { besteScore = score; beste = t; }
    }
    return beste;
  }

  houSpelersUitElkaar() {
    for (let i = 0; i < this.spelers.length; i++) {
      for (let j = i + 1; j < this.spelers.length; j++) {
        const a = this.spelers[i].pos, b = this.spelers[j].pos;
        const dx = b.x - a.x, dz = b.z - a.z;
        const d = Math.hypot(dx, dz), min = SPELER_STRAAL * 2;
        if (d < min && d > 1e-4) {
          const duw = (min - d) / 2;
          a.x -= (dx / d) * duw; a.z -= (dz / d) * duw;
          b.x += (dx / d) * duw; b.z += (dz / d) * duw;
        }
      }
    }
  }

  updateBal(dt, bezig) {
    const bal = this.bal;
    if (this.eigenaar) {
      // Dribbelen: bal voor de voeten van de eigenaar.
      const e = this.eigenaar;
      const doel = e.pos.clone().addScaledVector(e.kijk, BAL_AFSTAND);
      bal.pos.x += (doel.x - bal.pos.x) * Math.min(1, dt * 14);
      bal.pos.z += (doel.z - bal.pos.z) * Math.min(1, dt * 14);
      bal.pos.y = BAL_STRAAL;
      bal.vel.set(e.snelheidNu.x, 0, e.snelheidNu.z);
      bal.rol(dt); // alleen laten draaien
      if (bezig) this.probeerAfpakken(dt);
      return;
    }
    bal.update(dt);
    if (!bezig) return;
    // Botsen tegen spelers en oppakken.
    for (const sp of this.spelers) {
      const d = Math.hypot(bal.pos.x - sp.pos.x, bal.pos.z - sp.pos.z);
      if (bal.pos.y > 2.2 || d > 1.6) continue;
      if (sp.rol === 'keeper') { if (this.keeperPakt(sp, d)) return; continue; }
      if (d < OPPAK_AFSTAND && bal.pos.y < 0.9 && this.balVrij(sp)) {
        this.eigenaar = sp;
        this.laatsteTeam = sp.team;
        // Krijgt een teamgenoot de bal? Dan bestuur je hem meteen.
        if (sp.team === this.thuis) this.gebruiker = sp;
        return;
      }
      if (bal.pos.y < 1.3) bal.botsCirkel(sp.pos.x, sp.pos.z, SPELER_STRAAL + BAL_STRAAL, 0.35);
    }
  }

  /** Keeper: rollende ballen pakt hij altijd, harde schoten soms (afhankelijk van hoe goed hij is). */
  keeperPakt(sp, d) {
    const bal = this.bal;
    const bereik = 1.25 + (sp.duik ? 0.6 : 0);
    if (d > bereik || bal.pos.y > 2.3 || !this.balVrij(sp)) return false;
    const snelheid = bal.snelheid;
    let pakt = snelheid < 7.5;
    if (!pakt) {
      const kans = THREE.MathUtils.clamp(sp.team.instellingen.keeper * 1.15 - (snelheid - 14) * 0.025, 0.05, 0.95);
      pakt = Math.random() < kans;
      if (!pakt) {
        this.vrijVoor.set(sp, this.tijd + 0.6); // mis: even niet nog een keer proberen
        return false;
      }
    }
    this.eigenaar = sp;
    this.laatsteTeam = sp.team;
    sp.vasthouden = 0;
    this.beschermdTot = this.tijd + 1.2;
    return true;
  }

  /** Afpakken: een tegenstander die naast de balbezitter staat, kan de bal afpakken. */
  probeerAfpakken(dt) {
    if (this.tijd < this.beschermdTot) return;
    const e = this.eigenaar;
    if (e.rol === 'keeper') return;
    for (const t of this.ander(e.team).spelers) {
      if (t.rol === 'keeper' && Math.abs(t.pos.x) < HALF_L - 6) continue;
      const d = Math.hypot(t.pos.x - this.bal.pos.x, t.pos.z - this.bal.pos.z);
      if (d > 1.15) continue;
      // Het kind pakt de bal makkelijk af; de computer afhankelijk van het team.
      const perSeconde = t === this.gebruiker ? VOETBAL_WEDSTRIJD.kindAfpakken : t.team.instellingen.afpakken;
      if (Math.random() < perSeconde * dt) {
        this.eigenaar = t;
        this.laatsteTeam = t.team;
        this.beschermdTot = this.tijd + 0.8;
        if (t.rol === 'keeper') t.vasthouden = 0;
        else if (t.team === this.thuis) this.gebruiker = t; // een keeper bestuur je nooit zelf
        return;
      }
    }
  }

  controleerUitEnDoel() {
    const p = this.bal.pos;
    const kant = this.bal.inDoel();
    if (kant) { this.doelpunt(kant === 1 ? this.thuis : this.uit); return; }
    const laatste = this.laatsteTeam ?? this.thuis;
    // Zijlijn: ingooi voor het andere team.
    if (Math.abs(p.z) > HALF_B + BAL_STRAAL) {
      this.herstart(this.ander(laatste), { x: THREE.MathUtils.clamp(p.x, -HALF_L + 1, HALF_L - 1), z: Math.sign(p.z) * (HALF_B - 0.7) }, 'uit');
      return;
    }
    // Achterlijn (naast het doel): hoekschop of doelschop.
    if (Math.abs(p.x) > HALF_L + BAL_STRAAL) {
      const s = Math.sign(p.x);
      const verdediger = s > 0 ? this.uit : this.thuis; // wiens doel staat hier?
      if (laatste === verdediger) {
        this.herstart(this.ander(verdediger), { x: s * (HALF_L - 0.7), z: Math.sign(p.z || 1) * (HALF_B - 0.7) }, 'hoek');
      } else {
        this.herstart(verdediger, { x: s * (HALF_L - 1.2), z: 0 }, 'doel');
      }
    }
  }

  doelpunt(team) {
    team.score++;
    this.fase = 'goal';
    this.faseTimer = 2.6;
    this.eigenaar = null;
    this.aftrapVoor = this.ander(team);
    this.werkScorebordBij();
    this.publiek.juich(3);
    this.opGoal?.(team === this.thuis, team);
  }

  eindig() {
    this.fase = 'einde';
    this.tijdOver = 0;
    this.werkScorebordBij();
    this.opEinde?.({ thuis: this.thuis.score, uit: this.uit.score, tegenstander: this.tegenstanderInfo });
  }

  tijdTekst() {
    const s = Math.max(0, Math.ceil(this.tijdOver));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  werkScorebordBij() {
    this.scorebord.zet({ thuis: this.thuis.kort, uit: this.uit.kort, scoreThuis: this.thuis.score, scoreUit: this.uit.score, tijd: this.tijdTekst() });
    this.hud.zetStand(this.thuis.naam, this.thuis.score, this.uit.naam, this.uit.score, this.tijdTekst());
  }

  /** Spelers opruimen (de eigen speler blijft). */
  verwijder() {
    for (const sp of this.spelers) sp.verwijder();
    this.ring.removeFromParent();
  }
}
