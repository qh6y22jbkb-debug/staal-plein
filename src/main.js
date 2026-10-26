import * as THREE from 'three';
import './style.css';
import { bouwSchoolplein, PLEIN, STARTPLEK, SCHOOLDEUR, GYMDEUR } from './wereld/schoolplein.js';
import { GYM, GYMTIJD } from './data/gym.js';
import { gymtijd, tijdInWoorden, tijdOpKlok } from './gymtijd.js';
import { LEERGROEP, LOKALEN, REKEN_TEKSTEN, REKEN_TEKSTEN_SPEL, REKENKAART } from './data/rekenen.js';
import { Rekenkaart } from './ui/rekenkaart.js';
import { Dansen, dansbezit } from './dansjes.js';
import { Dansmenu } from './ui/dansmenu.js';
import { Rijden, vervoerbezit, vervoerMetId } from './vervoer.js';
import { rekenvoortgang } from './rekenvoortgang.js';
import { Botsing } from './wereld/botsing.js';
import { Speler } from './speler.js';
import { VolgCamera } from './camera.js';
import { Besturing } from './besturing.js';
import { Hud } from './ui/hud.js';
import { Dialoog } from './ui/dialoog.js';
import { bouwKramen, bouwBoetiek, bouwLeeskraam } from './wereld/kramen.js';
import { Winkel } from './winkel.js';
import { Kastvenster } from './ui/kastvenster.js';
import { Leesvenster, LeesMelding } from './ui/leesvenster.js';
import { SchoolSlot } from './ui/schoolslot.js';
import { kledingkast } from './kledingkast.js';
import { trekAan } from './kleding.js';
import { VERVOER_TEKSTEN, TEKSTEN, MUNTEN, MUNT_TEKSTEN, WINKEL, MEESTER_VRAAG, VOETBAL, TEST, LEERKRACHT, KLEDING, VOETBAL_TEAMS } from './data/oefeningen.js';
import { startMinispel } from './minispellen/index.js';
import { Kinderen } from './kinderen.js';
import { Meesters } from './meesters.js';
import { Meestervraag } from './ui/meestervraag.js';
import { geluid } from './geluid.js';
import { voorlezen } from './voorlezen.js';
import { voortgang, NIVEAU_VOOR_STEMPEL } from './voortgang.js';
import { Stempelkaart } from './ui/stempelkaart.js';
import { Oorkonde } from './ui/oorkonde.js';
import { toonStartscherm } from './ui/startscherm.js';
import { confetti } from './ui/confetti.js';
import { Vuurwerk } from './wereld/vuurwerk.js';
import { wisSpelOpslag } from './opslag.js';
import { Poort } from './poort.js';
import { voetbalstand } from './voetbal/voetbalstand.js';
import { naarWit, vanWit } from './ui/overgang.js';
import { bouwBeker } from './wereld/beker.js';
import { munten } from './munten.js';
import { Muntenteller } from './ui/muntenteller.js';
import { PleinMuntjes } from './wereld/pleinmuntjes.js';

/* ---------- Renderer, scène en licht ---------- */

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // zuinig voor Chromebooks
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
document.getElementById('spel').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaee0ff);
scene.fog = new THREE.Fog(0xcfeaff, 70, 170);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 300);

scene.add(new THREE.HemisphereLight(0xdff1ff, 0x6f9a4f, 1.6));
const zon = new THREE.DirectionalLight(0xfff2d6, 2.6);
zon.castShadow = true;
zon.shadow.mapSize.set(1024, 1024);
Object.assign(zon.shadow.camera, { left: -28, right: 28, top: 28, bottom: -28, near: 1, far: 120 });
zon.shadow.bias = -0.0005;
zon.shadow.normalBias = 0.03;
scene.add(zon, zon.target);

/* ---------- Wereld, speler, camera, besturing ---------- */

const botsing = new Botsing(PLEIN);
const wereld = bouwSchoolplein(scene, botsing);
const kramen = bouwKramen(scene, botsing);
const boetiek = bouwBoetiek(scene, botsing);
const leeskraam = bouwLeeskraam(scene, botsing); // telt niet mee voor stempels en poort
const alleKramen = [...kramen, boetiek, leeskraam]; // de 6 leerkramen + de winkel + de Leeskraam

// Poort naar de Voetbalwereld in het oostelijke hek. Gaat open bij alle 6 stempels.
const poort = new Poort(scene, { x: 40, z: 0, draai: 0, bord: VOETBAL.poortBord, open: voetbalstand.poortOpen, botsing });
wereld.blokkers.push(poort.groep); // de camera gaat niet door de poort heen
const speler = new Speler(scene);
speler.positie.copy(STARTPLEK);
// Gekochte kleding aantrekken (en opnieuw als je iets aan- of uittrekt).
trekAan(speler, kledingkast.aan);
kledingkast.opVerandering(() => trekAan(speler, kledingkast.aan));

const volgCam = new VolgCamera(camera, wereld.blokkers);
const uiLaag = document.getElementById('ui');
const besturing = new Besturing(renderer.domElement, camera, scene, uiLaag);
const hud = new Hud(uiLaag, besturing.isTouch, { voorlezen, geluid });
const dialoog = new Dialoog(uiLaag, { voorlezen, geluid });
dialoog.opInstelling = () => hud.zetKnoppen();
const kinderen = new Kinderen(scene, botsing, uiLaag, camera, voorlezen);
const stempelkaart = new Stempelkaart(uiLaag, Object.fromEntries(kramen.map((k) => [k.data.id, k.stijl.bord])));
const rekenkaart = new Rekenkaart(uiLaag); // in Leergroep 3 zie je deze in plaats van de stempelkaart

/* ---------- Gymtijd: verdiend met stempels, te zien op de kaarten, loopt af in de gymzaal ---------- */
const gymtijdLabels = [stempelkaart.el, rekenkaart.el].map((kaart) => {
  const e = document.createElement('div');
  e.className = 'sk-gymtijd';
  kaart.appendChild(e);
  return e;
});
function toonGymtijd() {
  const tekst = GYMTIJD.menu.replace('{tijd}', tijdOpKlok(gymtijd.seconden));
  for (const e of gymtijdLabels) {
    if (e.textContent !== tekst) e.textContent = tekst;
    e.classList.toggle('leeg', !gymtijd.heeftTijd);
  }
  wereld.gymDeur?.zetOpen(gymtijd.heeftTijd);
}
gymtijd.opVerandering(toonGymtijd);
toonGymtijd();

/** Nieuwe stempel: gymtijd erbij. Geeft de tekst voor het eindscherm (met een regel ervoor). */
function verdienGymtijd() {
  const minuten = gymtijd.verdien();
  const tekst = minuten > 0 ? GYMTIJD.verdiend.replace('{minuten}', minuten) : GYMTIJD.vol.replace('{max}', GYMTIJD.maxMinuten);
  return `<br>${tekst}`;
}

/* ---------- Vervoer (V, of de knop 🚲): alleen op het schoolplein ---------- */
const rijden = new Rijden(speler);
function werkVervoerKlassenBij() {
  document.body.classList.toggle('heeft-vervoer', vervoerbezit.gekocht.length > 0);
  document.body.classList.toggle('op-vervoer', rijden.actief);
}
function stapAf(tekst) {
  if (!rijden.afstappen()) return;
  werkVervoerKlassenBij();
  if (tekst) hud.toonMelding(tekst);
}
besturing.opVervoer = () => {
  if (rijden.actief) { stapAf(VERVOER_TEKSTEN.afgestapt); return; }
  if (!besturing.aan || dialoog.open || actiefSpel || actiefVenster || bezigMetWisselen) return;
  if (binnen || voetbal) { hud.toonMelding(VERVOER_TEKSTEN.nietHier); return; }
  if (!vervoerbezit.gekozen) { hud.toonMelding(VERVOER_TEKSTEN.geenVervoer); return; }
  dansen.stop();
  if (rijden.opstappen()) {
    const v = vervoerMetId(rijden.id);
    hud.toonMelding(VERVOER_TEKSTEN.opgestapt.replace('{icoon}', v.icoon).replace('{naam}', v.naam.toLowerCase()));
    geluid.plop();
  }
  werkVervoerKlassenBij();
};
// Andere keuze of kleur in de kledingkast: meteen zichtbaar als je erop staat.
vervoerbezit.opVerandering(() => { rijden.ververs(); werkVervoerKlassenBij(); });
werkVervoerKlassenBij();

/* ---------- Dansjes (M, of de knop Dans) ---------- */
const dansen = new Dansen(speler);
const dansmenu = new Dansmenu(uiLaag, { isTouch: besturing.isTouch });
let dansMenuTimer = null;
const magDansen = () => !rijden.actief && besturing.aan && !voetbal && !actiefSpel && !actiefVenster && !dialoog.open && !bezigMetWisselen && !startOpen && !binnen?.bezig && !binnen?.vastBal;
besturing.opDans = (wat) => {
  if (wat === 'omlaag') {
    if (!magDansen()) return;
    dansen.start(dansbezit.gekozen); // dansen zolang je M vasthoudt
    clearTimeout(dansMenuTimer);
    dansMenuTimer = setTimeout(() => { if (besturing.ingedrukt.has('KeyM') && dansen.actief) dansmenu.toon(); }, 700);
  } else {
    clearTimeout(dansMenuTimer);
    dansmenu.verberg();
    if (dansen.rest == null) dansen.stop(); // een dansje van de knop (3 seconden) loopt gewoon door
  }
};
besturing.opDansKeuze = (n) => {
  const id = dansmenu.dansBijCijfer(n);
  if (!id || !dansen.actief) return;
  dansbezit.kies(id);
  dansen.start(id);
  if (dansmenu.open) dansmenu.toon();
};
besturing.opDansKnop = (wat) => {
  if (!magDansen()) return;
  if (wat === 'tik') { dansmenu.verberg(); dansen.start(dansbezit.gekozen, 3); } // één tik: 3 seconden
  else dansmenu.toon();
};
dansmenu.opKies = (id) => {
  dansbezit.kies(id);
  dansmenu.verberg();
  if (magDansen()) dansen.start(id, besturing.ingedrukt.has('KeyM') ? null : 3);
};
const oorkonde = new Oorkonde(uiLaag);
const vuurwerk = new Vuurwerk(scene, geluid);
const muntenteller = new Muntenteller(geluid);
const meesters = new Meesters(scene, botsing, uiLaag, camera, voorlezen);
const meestervraag = new Meestervraag(uiLaag, { geluid, voorlezen, beloon: (a, v, l) => muntenteller.beloon(a, v, l) });

// Verstopte muntjes op het plein: eroverheen lopen = 2 munten.
const pleinMuntjes = new PleinMuntjes(scene);
pleinMuntjes.opOppakken = (gevonden, totaal, punt) => {
  muntenteller.beloon(MUNTEN.pleinMuntje, punt, `+${MUNTEN.pleinMuntje}`);
  const tekst = gevonden === totaal ? MUNT_TEKSTEN.pleinAlles : MUNT_TEKSTEN.pleinGevonden;
  hud.toonMelding(tekst.replace('{aantal}', gevonden).replace('{totaal}', totaal));
};

/* ---------- Praten met de karakters ---------- */

const PRAATAFSTAND = 3.2;
let dichtsteKraam = null;

function zoekDichtsteKraam() {
  let beste = null, besteAfstand = PRAATAFSTAND;
  for (const k of (binnen ? binnen.kramen : alleKramen)) {
    const d = Math.hypot(speler.positie.x - k.praatPunt.x, speler.positie.z - k.praatPunt.z);
    if (d < besteAfstand) { beste = k; besteAfstand = d; }
  }
  return beste;
}

function startGesprek(kraam, toestemming = false) {
  if (!kraam || dialoog.open) return;
  if (kraam.isWinkel) {
    openVenster(winkel);
    return;
  }
  // Leeskraam: eerst de melding dat Meester Jop het gezegd moet hebben.
  if (kraam.isLeeskraam && !toestemming) {
    leesMelding.opJa = () => startGesprek(kraam, true);
    openVenster(leesMelding);
    return;
  }
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  besturing.joystick.x = besturing.joystick.y = 0;
  document.body.classList.add('in-gesprek');
  hud.toonWolkje(null);
  kinderen.verbergBallon();

  // Speler kijkt naar de kraam, camera gaat er netjes achter staan.
  const dx = kraam.groep.position.x - speler.positie.x;
  const dz = kraam.groep.position.z - speler.positie.z;
  speler.richting = Math.atan2(dx, dz);
  volgCam.draaiNaar(Math.atan2(-dx, -dz), 0.38);
  volgCam.zetGesprek(kraam.groep, binnen ? { hoogte: 5.6 } : undefined); // binnen: over de lokaalmuur heen kijken

  const opSpelen = kraam.isLeeskraam ? pakKaartjes : kraam.isRekenkraam ? speelRekenspel : speelMinispel;
  dialoog.toon(kraam, { opSpelen, opSluiten: terugNaarPlein });
}

/* ---------- Rekenkramen in Leergroep 3 ---------- */

async function speelRekenspel(kraam) {
  // De rekenspellen worden pas geladen als je er een start.
  const { startRekenspel, heeftRekenspel } = await import('./rekenen/index.js');
  if (!heeftRekenspel(kraam.data.id)) {
    dialoog.zeg(REKEN_TEKSTEN.spelKomtEraan); // dit spel komt nog
    return;
  }
  dialoog.acties = null; // dialoog dicht zonder terug te gaan naar het plein
  dialoog.sluit();
  actiefSpel = startRekenspel(kraam, {
    laag: uiLaag,
    beloon: (aantal, van, label) => muntenteller.beloon(aantal, van, label),
    // Ronde gehaald: Brons, Zilver of Goud (apart van de taalstempels, telt niet mee voor de poort).
    opKlaar: (k, { niveau }) => {
      const nieuw = rekenvoortgang.rondeGehaald(k.data.id, niveau);
      if (!nieuw) return '';
      nieuweMedaille = k.data.id;
      // Gymtijd alleen voor de hele stempel: Goud (alle 3 niveaus).
      return REKEN_TEKSTEN_SPEL.niveauGehaald.replace('{medaille}', REKEN_TEKSTEN_SPEL.niveauNamen[nieuw - 1]).replace('{naam}', k.data.naam) + (nieuw === 3 ? verdienGymtijd() : '');
    },
    opSluiten: () => {
      actiefSpel = null;
      klok.update();
      terugNaarPlein();
      if (!nieuweMedaille) return;
      const id = nieuweMedaille;
      nieuweMedaille = null;
      // Medaille op de Rekenkaart; alle zes op Goud = feest.
      setTimeout(() => {
        rekenkaart.stempel(id);
        geluid.stempel();
        if (Rekenkaart.vol && !rekenvoortgang.kampioen) setTimeout(startRekenFeest, 900);
      }, 350);
    },
  });
}

let nieuweMedaille = null;

/** Feest in Leergroep 3: alle zes de rekenkramen op Goud. */
function startRekenFeest() {
  rekenvoortgang.zetKampioen();
  rekenkaart.ververs();
  geluid.feestmuziek();
  confetti(220);
  hud.toonWolkje(null);
  toonBanner(REKENKAART.feestTitel);
  voorlezen.zeg(REKENKAART.feestTekst);
  // De rekenkarakters praten en zwaaien even mee.
  for (const k of binnen?.kramen ?? []) for (const c of k.karakters) { c.praat = true; setTimeout(() => { c.praat = false; }, 4000); }
  setTimeout(() => hud.toonMelding(REKENKAART.nieuwItem), 5200);
}

/* ---------- Leeskraam: vragenkaartjes voor maatjeslezen ---------- */

function pakKaartjes() {
  dialoog.acties = null; // dialoog dicht zonder terug te gaan naar het plein
  dialoog.sluit();
  actiefVenster = leesvenster;
  leesvenster.opSluiten = () => {
    actiefVenster = null;
    klok.update(); // geen sprong in de tijd
    terugNaarPlein();
  };
  leesvenster.toon();
}

function terugNaarPlein() {
  besturing.aan = true;
  volgCam.zetGesprek(null);
  document.body.classList.remove('in-gesprek');
}

/* ---------- Winkel en kledingkast ---------- */

const winkel = new Winkel(uiLaag, { geluid, voorlezen });
const kastvenster = new Kastvenster(uiLaag, { geluid });
const leesMelding = new LeesMelding(uiLaag, { geluid });
const schoolSlot = new SchoolSlot(uiLaag, { geluid });
const leesvenster = new Leesvenster(uiLaag, { geluid, voorlezen, beloon: (a, v, l) => muntenteller.beloon(a, v, l) });
let actiefVenster = null;

function openVenster(venster) {
  if (actiefVenster || dialoog.open || actiefSpel || startOpen || voetbal) return;
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  kinderen.verbergBallon();
  actiefVenster = venster;
  venster.opSluiten = () => {
    actiefVenster = null;
    klok.update(); // geen sprong in de tijd
    besturing.aan = true;
  };
  venster.toon();
}
besturing.opKast = () => openVenster(kastvenster);
hud.opKast = () => openVenster(kastvenster);

/* ---------- Minispellen ---------- */

let actiefSpel = null;
let nieuweStempel = null;

function speelMinispel(kraam) {
  dialoog.acties = null; // dialoog dicht zonder terug te gaan naar het plein
  dialoog.sluit();
  actiefSpel = startMinispel(kraam, {
    laag: uiLaag,
    beloon: (aantal, van, label) => muntenteller.beloon(aantal, van, label),
    // Ronde gehaald: een niveau verder. Alle 3 de niveaus gehaald = stempel.
    opKlaar: (k, { niveau }) => {
      const wat = voortgang.rondeGehaald(k.data.id, niveau);
      if (wat) nieuweStempel = { id: k.data.id, stempel: wat === 'stempel' };
      if (wat === 'stempel') return TEKSTEN.stempelErbij + verdienGymtijd();
      if (wat === 'niveau') {
        const nog = NIVEAU_VOOR_STEMPEL - niveau;
        return TEKSTEN.stempelNog.replace('{aantal}', nog === 1 ? '1 niveau' : `${nog} niveaus`); // gymtijd pas bij de hele stempel
      }
      return '';
    },
    opSluiten: () => {
      actiefSpel = null;
      klok.update(); // geen grote sprong in de tijd na het spel
      terugNaarPlein();
      if (nieuweStempel) {
        const { id, stempel } = nieuweStempel;
        nieuweStempel = null;
        setTimeout(() => {
          if (!stempel) {
            stempelkaart.voortgangGemaakt(id); // sterretje erbij, nog geen stempel
            return;
          }
          stempelkaart.stempel(id);
          geluid.stempel();
          zetKraamSterren();
          werkPoortBordjeBij();
          if (voortgang.aantal === KRAAM_AANTAL && !voortgang.kampioen) setTimeout(startFeest, 900);
        }, 350);
      }
    },
  });
}

/* ---------- Stempels: gouden ster boven elke gehaalde kraam ---------- */

const KRAAM_AANTAL = kramen.length;
const sterVorm = new THREE.Shape();
for (let i = 0; i < 10; i++) {
  const r = i % 2 ? 0.22 : 0.5;
  const h = (i / 10) * Math.PI * 2 + Math.PI / 2;
  if (i === 0) sterVorm.moveTo(Math.cos(h) * r, Math.sin(h) * r);
  else sterVorm.lineTo(Math.cos(h) * r, Math.sin(h) * r);
}
const sterGeo = new THREE.ExtrudeGeometry(sterVorm, { depth: 0.12, bevelEnabled: false });
sterGeo.center();
const sterMat = new THREE.MeshLambertMaterial({ color: 0xffd43b, emissive: 0x7a5a00 });

function zetKraamSterren() {
  for (const k of kramen) {
    const heeft = voortgang.heeftStempel(k.data.id);
    if (heeft && !k.ster) {
      k.ster = new THREE.Mesh(sterGeo, sterMat);
      k.ster.position.set(0, 5.05, 1.2);
      k.ster.castShadow = true;
      k.groep.add(k.ster);
    }
    if (k.ster) k.ster.visible = heeft;
  }
}
zetKraamSterren();

/* ---------- Poort naar de Voetbalwereld ---------- */

function stempelsNog() { return KRAAM_AANTAL - voortgang.aantal; }
function nogTekst() { return stempelsNog() === 1 ? VOETBAL.nogEenStempel : VOETBAL.nogStempels.replace('{aantal}', stempelsNog()); }
function werkPoortBordjeBij() { poort.zetBordje(VOETBAL.slotTekst, nogTekst()); }
werkPoortBordjeBij();

/** Na het feest (of meteen bij oude opslag met alle stempels): de poort gaat open. */
function openPoortMetMelding() {
  if (poort.open || voortgang.aantal < KRAAM_AANTAL) return;
  voetbalstand.zetPoortOpen();
  poort.zetOpen(true, geluid);
  toonBanner(`🔓 ${VOETBAL.poortOpen}`);
  hud.toonMelding(VOETBAL.poortOpenUitleg);
  voorlezen.zeg(`${VOETBAL.poortOpen} ${VOETBAL.poortOpenUitleg}`);
}

/* ---------- De Bunders Beker op het schoolplein (na het winnen van het toernooi) ---------- */

let bekerOpPlein = null;
let bekerBotsing = null;
function zetBekerOpPlein() {
  if (bekerOpPlein || !voetbalstand.beker) return false;
  bekerOpPlein = bouwBeker(VOETBAL.bekerBord);
  bekerOpPlein.position.set(0, 0, 4); // midden tussen de kramen
  scene.add(bekerOpPlein);
  if (bekerBotsing) bekerBotsing.top = 3;
  else { botsing.voegCirkelToe(0, 4, 1.0, 3); bekerBotsing = botsing.cirkels[botsing.cirkels.length - 1]; }
  return true;
}
function haalBekerWeg() {
  bekerOpPlein?.removeFromParent();
  bekerOpPlein = null;
  if (bekerBotsing) bekerBotsing.top = 0;
}
zetBekerOpPlein();

/* ---------- Wisselen tussen schoolplein en Voetbalwereld ---------- */

let voetbal = null; // de Voetbalwereld (alleen als je er bent)
let bezigMetWisselen = false;

async function naarVoetbal() {
  if (bezigMetWisselen || voetbal) return;
  stapAf(); // door de poort: afstappen
  dansen.stop();
  bezigMetWisselen = true;
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  kinderen.verbergBallon();
  meesters.verbergBallon();
  geluid.woesj();
  await naarWit();
  // Pas nu laden: de code van de Voetbalwereld wordt pas opgehaald als je door de poort gaat.
  const { VoetbalWereld } = await import('./voetbal/voetbalwereld.js');
  voetbal = new VoetbalWereld({
    camera, besturing, uiLaag, geluid,
    kleding: kledingkast.aan,
    opTerug: naarPlein,
    toonWolkje: (t) => hud.toonWolkje(t),
    beloon: (a, v, l) => muntenteller.beloon(a, v, l),
    muntenTotaal: () => munten.totaal,
  });
  document.body.classList.add('in-voetbal');
  klok.update();
  besturing.aan = true;
  await vanWit();
  hud.toonMelding(VOETBAL.welkom);
  bezigMetWisselen = false;
}

async function naarPlein() {
  if (bezigMetWisselen || !voetbal) return;
  bezigMetWisselen = true;
  besturing.aan = false;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  geluid.woesj();
  await naarWit();
  voetbal.dispose();
  voetbal = null;
  hud.verbergMelding();
  document.body.classList.remove('in-voetbal');
  // Terug op het plein, vlak voor de poort, met de rug naar het hek.
  speler.positie.set(33.5, 0, 0);
  speler.richting = -Math.PI / 2;
  volgCam.yaw = speler.richting + Math.PI;
  volgCam.doelYaw = volgCam.doelPitch = null;
  volgCam.eersteKeer = true;
  const nieuweBeker = zetBekerOpPlein();
  klok.update();
  besturing.aan = true;
  await vanWit();
  if (nieuweBeker) { hud.toonMelding(VOETBAL.bekerOpPlein); voorlezen.zeg(VOETBAL.bekerOpPlein); }
  bezigMetWisselen = false;
}

/* ---------- Wisselen tussen schoolplein en een gebouw: Leergroep 3 (school) of de gymzaal ---------- */

let binnen = null; // Leergroep 3 of de gymzaal (alleen als je binnen bent); binnen.soort = 'school' of 'gym'
const pleinCamera = { pitch: 0.42, afstand: 10 };

function isBijSchooldeur() {
  return Math.hypot(speler.positie.x - SCHOOLDEUR.x, speler.positie.z - SCHOOLDEUR.z) < 2.6;
}

function isBijGymdeur() {
  return Math.hypot(speler.positie.x - GYMDEUR.x, speler.positie.z - GYMDEUR.z) < 2.4;
}

/* Per gebouw: titel, camera, welkomsttekst, deur buiten en waar je weer buiten komt. */
const GEBOUWEN = {
  school: { titel: LEERGROEP.naam, welkom: LEERGROEP.welkom, klasse: 'in-school', camera: { pitch: 0.78, afstand: 8.5 },
    buiten: { x: SCHOOLDEUR.x, z: SCHOOLDEUR.z + 3.4, richting: 0 }, deurTekst: LEERGROEP },
  gym: { titel: GYM.naam, welkom: GYM.welkom, klasse: 'in-gym', camera: { pitch: 0.6, afstand: 9 },
    buiten: { x: GYMDEUR.x - 3, z: GYMDEUR.z, richting: -Math.PI / 2 }, deurTekst: GYM },
};

function zetSpelerIn(doelScene) {
  doelScene.add(speler.groep, doelRing);
  besturing.scene = doelScene;
}

// De school is nog in aanbouw: eerst het wachtwoord (LEERGROEP.wachtwoord). Eén keer goed = open tot herladen.
let schoolOpen = !LEERGROEP.wachtwoord;

function probeerNaarBinnen() {
  if (schoolOpen) { naarBinnen(); return; }
  schoolSlot.opJa = () => { schoolOpen = true; naarBinnen(); };
  openVenster(schoolSlot);
}

async function naarBinnen(soort = 'school') {
  if (bezigMetWisselen || binnen || voetbal) return;
  dansen.stop();
  stapAf(); // in een gebouw rijd je niet
  bezigMetWisselen = true;
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  kinderen.verbergBallon();
  meesters.verbergBallon();
  geluid.woesj();
  await naarWit();
  // Pas nu laden: het gebouw wordt pas gebouwd als je naar binnen gaat. Het plein staat dan stil.
  if (soort === 'gym') {
    const { Gymzaal } = await import('./binnen/gymzaal.js');
    binnen = new Gymzaal({
      speler, besturing, geluid, uiLaag, isTouch: besturing.isTouch,
      beloon: (a, v, l) => muntenteller.beloon(a, v ?? hud.wolkje, l),
      melding: (t) => hud.toonMelding(t),
      gymtijd,
      opTijdOp: () => naarBuiten(), // gymtijd op: fluitje en terug naar het plein
    });
  } else {
    const { Leergroep3 } = await import('./binnen/leergroep3.js');
    binnen = new Leergroep3();
  }
  const gebouw = GEBOUWEN[binnen.soort];
  zetSpelerIn(binnen.scene);
  speler.positie.copy(binnen.startPlek);
  speler.richting = binnen.startRichting;
  volgCam.blokkers = binnen.blokkers;
  Object.assign(pleinCamera, { pitch: volgCam.pitch, afstand: volgCam.afstand });
  volgCam.pitch = gebouw.camera.pitch; // binnen kijk je wat meer van boven
  volgCam.afstand = gebouw.camera.afstand;
  volgCam.yaw = speler.richting + Math.PI;
  volgCam.doelYaw = volgCam.doelPitch = null;
  volgCam.eersteKeer = true;
  hud.zetTitel(gebouw.titel);
  document.body.classList.add(gebouw.klasse);
  klok.update();
  besturing.aan = true;
  await vanWit();
  hud.toonMelding(gebouw.welkom);
  bezigMetWisselen = false;
  if (binnen?.soort === 'school' && Rekenkaart.vol && !rekenvoortgang.kampioen) setTimeout(startRekenFeest, 1500);
}

/** Leergroep 3 opruimen en de speler terug op het plein zetten (zonder overgang). */
function ruimBinnenOp() {
  if (!binnen) return;
  binnen.dispose();
  binnen = null;
  zetSpelerIn(scene);
  volgCam.blokkers = wereld.blokkers;
  volgCam.pitch = pleinCamera.pitch;
  volgCam.afstand = pleinCamera.afstand;
  hud.zetTitel(null);
  document.body.classList.remove('in-school', 'in-gym');
}

async function naarBuiten() {
  if (bezigMetWisselen || !binnen) return;
  bezigMetWisselen = true;
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  geluid.woesj();
  await naarWit();
  gymtijd.bewaarNu(); // de rest van je gymtijd houd je
  const terug = GEBOUWEN[binnen.soort].buiten;
  ruimBinnenOp();
  hud.verbergMelding();
  // Terug op het plein, vlak voor de deur, met de rug naar het gebouw.
  speler.positie.set(terug.x, 0, terug.z);
  speler.richting = terug.richting;
  volgCam.yaw = terug.richting + Math.PI;
  volgCam.doelYaw = volgCam.doelPitch = null;
  volgCam.eersteKeer = true;
  klok.update();
  besturing.aan = true;
  await vanWit();
  bezigMetWisselen = false;
}

/* ---------- Feest bij alle 6 stempels ---------- */

function startFeest() {
  voortgang.zetKampioen();
  stempelkaart.ververs();
  // Vuurwerk vóór de camera, en de camera kijkt even wat meer omhoog.
  const kijkrichting = new THREE.Vector3(-Math.sin(volgCam.yaw), 0, -Math.cos(volgCam.yaw));
  vuurwerk.start(14, speler.positie.clone().addScaledVector(kijkrichting, 4));
  vuurwerk.richting = kijkrichting;
  volgCam.draaiNaar(volgCam.yaw, 0.15);
  geluid.feestmuziek();
  confetti(220);
  kinderen.juich(10);
  hud.toonWolkje(null);
  toonBanner(TEKSTEN.feestTekst);
  voorlezen.zeg(TEKSTEN.feestTekst);
  setTimeout(toonOorkonde, 4500);
}

function toonOorkonde() {
  besturing.aan = false;
  oorkonde.toon();
}
oorkonde.opSluiten = () => {
  besturing.aan = !startOpen;
  setTimeout(openPoortMetMelding, 600); // na het feest gaat de poort open
};
stempelkaart.opOorkonde = toonOorkonde;

function toonBanner(tekst) {
  const b = document.createElement('div');
  b.className = 'feestbanner';
  b.textContent = tekst;
  uiLaag.appendChild(b);
  setTimeout(() => b.remove(), 5000);
}

/* ---------- Opnieuw beginnen ---------- */

hud.opOpnieuw = () => {
  ruimBinnenOp(); // opnieuw beginnen gebeurt altijd op het schoolplein
  // Eerst de modules (die houden ook dingen in het geheugen bij), dan alle opslag.
  voortgang.wis();
  rekenvoortgang.wis();
  munten.wis();
  pleinMuntjes.wis();
  kledingkast.wis();
  dansbezit.wis();
  dansen.stop();
  stapAf();
  vervoerbezit.wis();
  gymtijd.wis();
  meesters.wis();
  wisSpelOpslag();
  stempelkaart.ververs();
  rekenkaart.ververs();
  zetKraamSterren();
  voetbalstand.wis();
  poort.zetDicht();
  haalBekerWeg();
  werkPoortBordjeBij();
  speler.positie.copy(STARTPLEK);
  speler.richting = Math.PI;
  volgCam.yaw = 0;
};

/* Kinderen op het plein: aanspreken met E, of door erop te klikken/tikken. */
const KIND_PRAATAFSTAND = 2.4;
let dichtsteKind = null;

function spreekKindAan(kind) {
  if (!kind || dialoog.open || actiefSpel) return;
  speler.richting = Math.atan2(kind.positie.x - speler.positie.x, kind.positie.z - speler.positie.z);
  kinderen.spreekAan(kind, speler.positie);
}

/* Meesters: stellen een vraag (20 munten bij een goed antwoord). */
const MEESTER_PRAATAFSTAND = 2.6;
let dichtsteMeester = null;

function spreekMeesterAan(m) {
  if (!m || dialoog.open || actiefSpel || actiefVenster || meestervraag.open || startOpen) return;
  speler.richting = Math.atan2(m.positie.x - speler.positie.x, m.positie.z - speler.positie.z);
  if (meesters.genoegVandaag(m)) {
    meesters.zeg(m, MEESTER_VRAAG.genoegVandaag, speler.positie);
    return;
  }
  if (!meesters.heeftVraag(m)) {
    meesters.zeg(m, MEESTER_VRAAG.wachten.replace('{minuten}', meesters.minutenTeGaan(m) === 1 ? '1 minuut' : `${meesters.minutenTeGaan(m)} minuten`), speler.positie);
    return;
  }
  besturing.aan = false;
  besturing.doel = null;
  besturing.ingedrukt.clear();
  hud.toonWolkje(null);
  kinderen.verbergBallon();
  meesters.verbergBallon();
  m.houVast(speler.positie);
  meesters.startWachttijd(m); // meteen: weglopen en terugkomen geeft geen nieuwe vraag
  meestervraag.opSluiten = (meester) => {
    meester.laatLos();
    klok.update();
    besturing.aan = true;
  };
  meestervraag.toon(m);
}

/** Praat met een figuur op het plein: kind of meester. */
function praatMetFiguur(f) {
  if (f?.isMeester) spreekMeesterAan(f);
  else spreekKindAan(f);
}

function praatMetDichtste() {
  if (voetbal || bezigMetWisselen) return; // op het voetbalveld is E iets anders
  if (binnen) {
    if (binnen.actie?.()) return; // gymzaal: touw pakken/loslaten, bal pakken
    if (dichtsteKraam) startGesprek(dichtsteKraam);
    else if (binnen.isBijDeurTerug(speler.positie)) naarBuiten();
    return;
  }
  if (dichtsteKraam) startGesprek(dichtsteKraam);
  else if (dichtsteMeester) spreekMeesterAan(dichtsteMeester);
  else if (dichtsteKind) spreekKindAan(dichtsteKind);
  else if (isBijSchooldeur()) probeerNaarBinnen();
  else if (isBijGymdeur()) {
    if (gymtijd.heeftTijd) naarBinnen('gym');
    else { hud.toonMelding(GYMTIJD.deurDicht); geluid.bijna(); } // zonder gymtijd is de deur dicht
  }
}

besturing.opPraten = praatMetDichtste;
hud.opWolkjeKlik = () => (voetbal ? voetbal.wolkjeKlik?.() : praatMetDichtste());
besturing.opKlikKind = (kind) => {
  const d = Math.hypot(kind.positie.x - speler.positie.x, kind.positie.z - speler.positie.z);
  if (d < 3.5) praatMetFiguur(kind);
  else {
    besturing.doel = kind.positie.clone().setY(0);
    besturing.doelIsKraam = false;
    kindDoel = kind; // achter het kind aan lopen
  }
};
let kindDoel = null;

function volgKind() {
  if (!kindDoel) return;
  if (!besturing.doel) { kindDoel = null; return; } // speler is zelf gaan lopen
  besturing.doel.set(kindDoel.positie.x, 0, kindDoel.positie.z);
  if (Math.hypot(kindDoel.positie.x - speler.positie.x, kindDoel.positie.z - speler.positie.z) < 2) {
    besturing.doel = null;
    praatMetFiguur(kindDoel);
    kindDoel = null;
  }
}

// Ringetje op de plek waar je hebt geklikt.
const doelRing = new THREE.Mesh(
  new THREE.RingGeometry(0.35, 0.55, 24),
  new THREE.MeshBasicMaterial({ color: 0xffd43b, transparent: true, opacity: 0.9 }),
);
doelRing.rotation.x = -Math.PI / 2;
doelRing.userData.geenKlik = true;
doelRing.visible = false;
scene.add(doelRing);

/* ---------- Spellus ---------- */

const klok = new THREE.Timer();
const DRAAISNELHEID = 2.6; // radialen per seconde bij ← → / A D
let tijd = 0;
let vastTijd = 0;

function frame() {
  klok.update();
  if (voetbal) {
    // In de Voetbalwereld: het schoolplein staat helemaal stil en wordt niet getekend.
    const dtV = Math.min(klok.getDelta(), 0.05);
    voetbal.update(dtV);
    if (voetbal) renderer.render(voetbal.scene, camera);
    return;
  }
  if (actiefSpel || actiefVenster || bezigMetWisselen) return; // plein staat stil tijdens een spel of winkel (scheelt rekenkracht)
  const dt = Math.min(klok.getDelta(), 0.05);
  tijd += dt;
  if (binnen) { frameBinnen(dt); return; }

  beweegSpeler(dt, botsing);

  // De zon (en dus de schaduw) beweegt mee met de speler.
  zon.position.set(speler.positie.x + 20, 40, speler.positie.z + 18);
  zon.target.position.copy(speler.positie);

  // Dicht bij een kraam of een kind? Dan verschijnt het tekstwolkje.
  if (!dialoog.open && besturing.aan) {
    dichtsteKraam = zoekDichtsteKraam();
    if (dichtsteKraam && rijden.actief) stapAf(VERVOER_TEKSTEN.afgestaptKraam); // bij een kraam stap je af om te praten
    dichtsteKind = kinderen.dichtsteBij(speler.positie, KIND_PRAATAFSTAND);
    dichtsteMeester = meesters.dichtsteBij(speler.positie, MEESTER_PRAATAFSTAND);
    // Wie staat het dichtst bij: de kraam, een meester of een kind? Alleen die blijft over.
    const afstand = (p) => Math.hypot(p.x - speler.positie.x, p.z - speler.positie.z);
    const kandidaten = [
      dichtsteKraam && ['kraam', afstand(dichtsteKraam.praatPunt)],
      dichtsteMeester && ['meester', afstand(dichtsteMeester.positie)],
      dichtsteKind && ['kind', afstand(dichtsteKind.positie)],
    ].filter(Boolean).sort((a, b) => a[1] - b[1]);
    const winnaar = kandidaten[0]?.[0];
    if (winnaar !== 'kraam') dichtsteKraam = null;
    if (winnaar !== 'meester') dichtsteMeester = null;
    if (winnaar !== 'kind') dichtsteKind = null;
    if (dichtsteKraam?.isWinkel) hud.toonWolkje(besturing.isTouch ? WINKEL.openTik : WINKEL.openToets);
    else if (dichtsteKraam) hud.toonWolkje(besturing.isTouch ? TEKSTEN.praatTik : TEKSTEN.praatToets);
    else if (dichtsteMeester && meesters.ballonMeester !== dichtsteMeester) {
      const tekst = meesters.heeftVraag(dichtsteMeester)
        ? (besturing.isTouch ? MEESTER_VRAAG.wolkjeTik : MEESTER_VRAAG.wolkjeToets)
        : MEESTER_VRAAG.wolkjeWacht;
      hud.toonWolkje(tekst.replace('{naam}', dichtsteMeester.info.naam));
    } else if (dichtsteKind && kinderen.ballonKind !== dichtsteKind) {
      hud.toonWolkje((besturing.isTouch ? TEKSTEN.kindTik : TEKSTEN.kindToets).replace('{naam}', dichtsteKind.naam));
    } else if (isBijSchooldeur()) {
      hud.toonWolkje(besturing.isTouch ? LEERGROEP.naarBinnenTik : LEERGROEP.naarBinnenToets);
    } else if (isBijGymdeur()) {
      const tijd = tijdInWoorden(gymtijd.seconden);
      hud.toonWolkje(!gymtijd.heeftTijd ? GYMTIJD.deurDicht : (besturing.isTouch ? GYMTIJD.deurOpenTik : GYMTIJD.deurOpen).replace('{tijd}', tijd));
    } else if (poort.afstandTot(speler.positie) < 5.5) {
      hud.toonWolkje(poort.open ? VOETBAL.wolkjeOpen : VOETBAL.wolkjeDicht.replace('{nog}', nogTekst()));
    } else hud.toonWolkje(null);
  } else if (!besturing.aan) hud.toonWolkje(null);
  poort.update(dt);
  if (bekerOpPlein) bekerOpPlein.userData.beker.rotation.y += dt * 0.6;
  if (besturing.aan && poort.isInOpening(speler.positie)) naarVoetbal();
  kinderen.update(dt, speler);
  meesters.update(dt, speler);
  for (const k of alleKramen) k.update(dt, tijd, speler.positie);

  wereld.update(dt, tijd);
  pleinMuntjes.update(dt, speler.positie, camera);
  vuurwerk.update(dt);
  for (const k of kramen) if (k.ster) k.ster.rotation.y += dt * 0.8;
  volgCam.update(dt, speler.positie);
  renderer.render(scene, camera);
}

/** Lopen, draaien en springen (plein en Leergroep 3 gebruiken hetzelfde). */
function beweegSpeler(dt, bots) {
  const cam = besturing.neemCamera();
  volgCam.draai(cam.x, cam.y);
  if (cam.zoom) volgCam.zoom(cam.zoom);

  // Dansen: lopen staat even stil (alleen de moonwalk glijdt achteruit). Een dansje van de knop stopt als je gaat lopen.
  if (dansen.actief && (!besturing.aan || (dansen.rest != null && besturing.beweging().actief))) { dansen.stop(); dansmenu.verberg(); }
  if (dansen.actief) {
    besturing.doel = null;
    besturing.neemSprong();
    speler.update(dt, dansen.beweging(), false, bots, { draaiMee: false });
    dansen.update(dt);
    doelRing.visible = false;
    return;
  }

  volgKind();
  // Toetsen/joystick: vooruit lopen en draaien. De camera draait vanzelf mee.
  const invoer = besturing.beweging();
  let beweging = { x: 0, z: 0 };
  let achteruit = false;
  if (invoer.actief) {
    besturing.doel = null;
    speler.richting -= invoer.draai * DRAAISNELHEID * dt;
    achteruit = invoer.vooruit < 0;
    const v = invoer.vooruit * (achteruit ? 0.6 : 1);
    beweging = { x: Math.sin(speler.richting) * v, z: Math.cos(speler.richting) * v };
  } else if (besturing.doel) {
    beweging = naarDoel(besturing.doel);
  }

  const sprong = besturing.neemSprong() && !rijden.actief; // op een vervoersmiddel spring je niet
  const afgelegd = speler.update(dt, beweging, sprong, bots, { draaiMee: !invoer.actief });
  rijden.update(dt);
  if (!achteruit && (afgelegd > 0.002 || invoer.draai)) {
    volgCam.volgAchter(speler.richting + Math.PI, dt, invoer.draai ? 5 : 2.5);
  }

  // Loopt de speler tegen iets aan op weg naar het doel? Dan stoppen.
  if (besturing.doel) {
    vastTijd = afgelegd < 0.01 ? vastTijd + dt : 0;
    if (vastTijd > 0.4) besturing.doel = null;
  }
  doelRing.visible = !!besturing.doel;
  if (besturing.doel) {
    doelRing.position.set(besturing.doel.x, 0.05, besturing.doel.z);
    doelRing.scale.setScalar(1 + Math.sin(tijd * 6) * 0.12);
  }

}

let klimCamera = false;

/** In een gebouw (Leergroep 3 of de gymzaal): lopen, wolkjes, activiteiten en tekenen. Het plein staat stil. */
function frameBinnen(dt) {
  // De gymzaal neemt de besturing over tijdens het klimmen; verder gewoon lopen.
  const overgenomen = besturing.aan && binnen.besturingOvernemen?.(dt);
  if (!overgenomen) beweegSpeler(dt, binnen.botsing);
  if (!binnen) return;
  // Tijdens het klimmen kijkt de camera van iets lager mee (anders zit hij bovenin tegen het plafond).
  if (binnen.bezig && !klimCamera) { klimCamera = true; volgCam.draaiNaar(speler.richting + Math.PI, -0.05); }
  else if (!binnen.bezig && klimCamera) { klimCamera = false; volgCam.draaiNaar(volgCam.yaw, GEBOUWEN[binnen.soort].camera.pitch); }
  if (!dialoog.open && besturing.aan) {
    dichtsteKraam = zoekDichtsteKraam();
    const eigen = binnen.wolkje?.();
    const deur = GEBOUWEN[binnen.soort].deurTekst;
    if (dichtsteKraam) hud.toonWolkje(besturing.isTouch ? TEKSTEN.praatTik : TEKSTEN.praatToets);
    else if (eigen) hud.toonWolkje(eigen);
    else if (binnen.isBijDeurTerug(speler.positie)) hud.toonWolkje(besturing.isTouch ? deur.naarBuitenTik : deur.naarBuitenToets);
    else hud.toonWolkje(null);
  } else if (!besturing.aan) hud.toonWolkje(null);
  binnen.update(dt, tijd, speler.positie);
  volgCam.update(dt, speler.positie);
  renderer.render(binnen.scene, camera);
}

function naarDoel(doel) {
  const dx = doel.x - speler.positie.x, dz = doel.z - speler.positie.z;
  const afstand = Math.hypot(dx, dz);
  if (afstand < 0.25) {
    besturing.doel = null;
    // Op een kraam geklikt en aangekomen? Dan meteen praten.
    if (besturing.doelIsKraam) startGesprek(zoekDichtsteKraam());
    return { x: 0, z: 0 };
  }
  const f = Math.min(1, afstand / 1.2) / afstand; // afremmen vlak voor het doel
  return { x: dx * f, z: dz * f };
}

renderer.setAnimationLoop(frame);

// Startscherm: pas na een klik kan de browser geluid en voorlezen gebruiken.
let startOpen = true;
besturing.aan = false;
/* ---------- Leerkrachtmodus: alles vrijspelen met de code ---------- */

function speelAllesVrij() {
  schoolOpen = true; // de leerkrachtcode opent ook de school
  for (const k of kramen) voortgang.rondeGehaald(k.data.id, 3); // alle stempels en niveaus
  voortgang.zetKampioen();
  stempelkaart.ververs();
  zetKraamSterren();
  werkPoortBordjeBij();
  voetbalstand.zetPoortOpen();
  for (const t of VOETBAL_TEAMS) voetbalstand.zetVerslagen(t.id);
  voetbalstand.zetBeker();
  if (!poort.open) poort.zetOpen(true, geluid);
  zetBekerOpPlein();
  for (const l of LOKALEN) rekenvoortgang.rondeGehaald(l.id, 3); // alle rekenkramen op Goud
  rekenvoortgang.zetKampioen();
  rekenkaart.ververs();
  kledingkast.geefAlles(KLEDING.map((k) => k.id));
  dansbezit.geefAlles();
  vervoerbezit.geefAlles();
  gymtijd.vul();
  voetbal?.bord?.teken();
  hud.toonMelding(LEERKRACHT.melding);
  geluid.klaar();
}

function controleerCode(code) {
  if (!TEST.leerkrachtCode || code.trim().toLowerCase() !== TEST.leerkrachtCode.toLowerCase()) return false;
  speelAllesVrij();
  return true;
}

// De code kan ook gewoon getypt worden (zonder invulvak).
if (TEST.leerkrachtCode) {
  let getypt = '';
  window.addEventListener('keydown', (e) => {
    if (e.target?.tagName === 'INPUT' || e.key.length !== 1) return;
    getypt = (getypt + e.key.toLowerCase()).slice(-TEST.leerkrachtCode.length);
    if (getypt === TEST.leerkrachtCode.toLowerCase()) {
      getypt = '';
      // De laatste letter (k) opent anders ook de kledingkast.
      setTimeout(() => { if (kastvenster.open) kastvenster.sluit(); }, 0);
      speelAllesVrij();
    }
  });
}

toonStartscherm(uiLaag, () => {
  startOpen = false;
  besturing.aan = true;
  geluid.plop();
  // Al alle stempels (bijv. van vóór de Voetbalwereld)? Dan gaat de poort nu open.
  if (voortgang.aantal === KRAAM_AANTAL && !poort.open) setTimeout(openPoortMetMelding, 1200);
}, controleerCode);

/* Geheime testtoets F9: alle stempels (uitzetten in src/data/oefeningen.js bij TEST). */
if (TEST.geheimeToetsF9) {
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'F9' || startOpen || voetbal) return;
    e.preventDefault();
    // Ook alle rekenstempels (Goud) en volle gymtijd. Het rekenfeest komt in Leergroep 3.
    gymtijd.vul();
    setTimeout(() => hud.toonMelding(GYMTIJD.testtoets.replace('{max}', GYMTIJD.maxMinuten)), 2800);
    for (const l of LOKALEN) rekenvoortgang.rondeGehaald(l.id, 3);
    rekenkaart.ververs();
    if (binnen?.soort === 'school') {
      hud.toonMelding(REKENKAART.testtoets);
      for (const k of kramen) voortgang.rondeGehaald(k.data.id, 3);
      stempelkaart.ververs();
      zetKraamSterren();
      werkPoortBordjeBij();
      if (!rekenvoortgang.kampioen) setTimeout(startRekenFeest, 600);
      return;
    }
    for (const k of kramen) voortgang.rondeGehaald(k.data.id, 3);
    stempelkaart.ververs();
    zetKraamSterren();
    werkPoortBordjeBij();
    hud.toonMelding('🧪 Testtoets: alle stempels gegeven');
    if (!voortgang.kampioen) setTimeout(startFeest, 600);
    else setTimeout(openPoortMetMelding, 600);
  });
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handig voor testen in de console.
window.__spel = { rijden, vervoerbezit, gymtijd, naarGym: () => naarBinnen('gym'), dansen, dansbezit, dansmenu, rekenkaart, startRekenFeest, schoolSlot, probeerNaarBinnen, get schoolOpen() { return schoolOpen; }, rekenvoortgang, get binnen() { return binnen; }, naarBinnen, naarBuiten, leeskraam, leesvenster, leesMelding, speler, besturing, volgCam, hud, botsing, frame, kramen, boetiek, poort, naarVoetbal, naarPlein, get voetbal() { return voetbal; }, meesters, meestervraag, winkel, kastvenster, kledingkast, kinderen, dialoog, munten, muntenteller, pleinMuntjes, voortgang, stempelkaart, startFeest, oorkonde, vuurwerk, startGesprek, speelMinispel, get actiefSpel() { return actiefSpel; }, renderer, scene, camera };
