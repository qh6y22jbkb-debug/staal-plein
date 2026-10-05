import { LEESKRAAM, LEESKAARTJES, LEES_MUNTEN } from '../data/leeskaartjes.js';

const T = LEESKRAAM;
const MUNT_SLEUTEL = 'staal-blok2-leesmunten';

/** Kleine spotlight (lamp met lichtbundel) voor onderaan het kaartje. */
function spotIcoon(kleur) {
  return `<svg viewBox="0 0 64 48" aria-hidden="true">
    <path d="M20 14 L62 34 L62 46 L28 26 Z" fill="${kleur}" opacity=".25"/>
    <rect x="6" y="8" width="20" height="14" rx="4" transform="rotate(25 16 15)" fill="${kleur}"/>
    <rect x="12" y="24" width="4" height="16" fill="${kleur}"/>
    <rect x="6" y="40" width="16" height="4" rx="2" fill="${kleur}"/>
  </svg>`;
}

/** Donkere of witte tekst op de gekleurde balk, net wat het best leesbaar is. */
function tekstKleurOp(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return (1.05 / (l + 0.05)) >= 4.5 ? '#ffffff' : '#1d2b4f';
}

function schud(lijst) {
  const a = [...lijst];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function vandaag() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/**
 * Het venster met de vragenkaartjes van de Leeskraam.
 * Stap 1: soort boek. Stap 2: categorie (of "Verras me!"). Dan het kaartje, met omdraai-animatie.
 * Kaartjes komen uit een geschudde stapel per categorie: hetzelfde kaartje komt pas terug als de stapel op is.
 */
export class Leesvenster {
  constructor(laag, { geluid, voorlezen, beloon }) {
    this.laag = laag;
    this.geluid = geluid;
    this.voorlezen = voorlezen;
    this.beloon = beloon;
    this.el = null;
    this.opSluiten = null;
    this.stapels = new Map();
    this.toetsen = (e) => {
      if (e.code === 'Escape') { e.preventDefault(); this.sluit(); }
    };
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond';
    this.el.innerHTML = `
      <div class="winkel lees" role="dialog" aria-label="${T.kraamNaam}">
        <header class="wk-kop">
          <span class="wk-logo">${T.icoon}</span>
          <h2>${T.kraamNaam}</h2>
          <button type="button" class="wk-sluit">✕ ${T.klaar}</button>
        </header>
        <div class="lees-inhoud"></div>
      </div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    this.inhoud = this.el.querySelector('.lees-inhoud');
    this.el.querySelector('.wk-sluit').addEventListener('click', () => this.sluit());
    window.addEventListener('keydown', this.toetsen);
    this.beurt = 'B'; // het eerste kaartje is voor maatje A
    this.toonSoort();
  }

  sluit() {
    if (!this.el) return;
    this.voorlezen?.stop();
    window.removeEventListener('keydown', this.toetsen);
    this.el.remove();
    this.el = null;
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
  }

  knop(html, klasse, actie, stijl = '') {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = klasse;
    b.innerHTML = html;
    if (stijl) b.style.cssText = stijl;
    b.addEventListener('click', () => { this.geluid?.plop(); actie(); });
    return b;
  }

  /** Stap 1: Verhalenboek of Informatieboek. */
  toonSoort() {
    this.voorlezen?.stop();
    this.inhoud.innerHTML = `<h3 class="lees-vraag-titel">${T.kiesBoek}</h3><div class="lees-soorten"></div>`;
    const rij = this.inhoud.querySelector('.lees-soorten');
    rij.append(
      this.knop(`<span>📖</span>${LEESKAARTJES.verhaal.naam}`, 'lees-soort verhaal', () => this.toonCategorieen('verhaal')),
      this.knop(`<span>🔎</span>${LEESKAARTJES.info.naam}`, 'lees-soort info', () => this.toonCategorieen('info')),
    );
    rij.firstChild.focus({ preventScroll: true });
  }

  /** Stap 2: een categorie kiezen, of "Verras me!". */
  toonCategorieen(soort) {
    this.voorlezen?.stop();
    this.soort = soort;
    const boek = LEESKAARTJES[soort];
    const meer = boek.categorieen.length > 1;
    this.inhoud.innerHTML = `<h3 class="lees-vraag-titel">${meer ? T.kiesCategorie : T.kiesInfo}</h3><div class="lees-categorieen"></div><div class="lees-onder"></div>`;
    const rij = this.inhoud.querySelector('.lees-categorieen');
    if (meer) {
      boek.categorieen.forEach((c, i) => {
        rij.append(this.knop(c.naam, 'lees-categorie', () => this.trek({ soort, cat: i }),
          `background:${c.kleur};color:${tekstKleurOp(c.kleur)}`));
      });
    } else {
      const c = boek.categorieen[0];
      rij.append(this.knop(`🃏 ${T.pakKaartje}`, 'lees-categorie groot', () => this.trek({ soort, cat: 0 }),
        `background:${c.kleur};color:${tekstKleurOp(c.kleur)}`));
    }
    rij.append(this.knop(`🎲 ${T.verrasMe}`, 'lees-categorie verras', () => this.trek({ soort, cat: null })));
    this.inhoud.querySelector('.lees-onder').append(this.knop(`← ${T.anderBoek}`, 'lees-terug', () => this.toonSoort()));
    rij.firstChild.focus({ preventScroll: true });
  }

  /** Alle kaartjes van een categorie (of van het hele boek bij "Verras me!"). */
  kaartjesVan({ soort, cat }) {
    const boek = LEESKAARTJES[soort];
    const cats = cat === null ? boek.categorieen : [boek.categorieen[cat]];
    return cats.flatMap((c) => c.vragen.map((vraag) => ({ vraag, naam: c.naam, kleur: c.kleur })));
  }

  /** Volgende kaartje uit de geschudde stapel; is hij op, dan opnieuw schudden (zonder hetzelfde kaartje meteen weer). */
  volgendeUit(keuze) {
    const sleutel = `${keuze.soort}-${keuze.cat ?? 'verras'}`;
    const alle = this.kaartjesVan(keuze);
    let stapel = this.stapels.get(sleutel);
    if (!stapel || !stapel.length) {
      stapel = schud(alle.map((_, i) => i));
      if (alle.length > 1 && stapel[stapel.length - 1] === this.laatste?.[sleutel]) {
        [stapel[0], stapel[stapel.length - 1]] = [stapel[stapel.length - 1], stapel[0]];
      }
      this.stapels.set(sleutel, stapel);
    }
    const i = stapel.pop();
    this.laatste = { ...this.laatste, [sleutel]: i };
    return alle[i];
  }

  /** Een nieuw kaartje pakken en tonen. */
  trek(keuze) {
    this.voorlezen?.stop();
    this.keuze = keuze;
    this.kaart = this.volgendeUit(keuze);
    this.beurt = this.beurt === 'A' ? 'B' : 'A';
    this.toonKaart();
    this.geefMunten();
  }

  toonKaart() {
    const k = this.kaart;
    const kleurTekst = tekstKleurOp(k.kleur);
    this.inhoud.innerHTML = `
      <div class="lees-beurt beurt-${this.beurt.toLowerCase()}">👥 ${this.beurt === 'A' ? T.beurtA : T.beurtB}</div>
      <div class="lees-kaart-plek">
        <div class="lees-kaart" style="--kaartkleur:${k.kleur};--balktekst:${kleurTekst}">
          <div class="lees-kant lees-achter"><span>${T.icoon}</span><b>Spot aan!</b></div>
          <div class="lees-kant lees-voor">
            <div class="lees-balk">${k.naam}</div>
            <p class="lees-tekst">${k.vraag}</p>
            <div class="lees-spot">${spotIcoon(k.kleur)}</div>
          </div>
        </div>
      </div>
      <div class="lees-knoppen"></div>`;
    const knoppen = this.inhoud.querySelector('.lees-knoppen');
    const lees = this.knop('🔊', 'lees-luid', () => this.leesVoor());
    lees.title = T.voorlezen;
    lees.setAttribute('aria-label', T.voorlezen);
    if (!this.voorlezen?.beschikbaar) lees.hidden = true;
    const volgend = this.knop(`${T.volgend} ▶`, 'lees-volgend', () => this.trek(this.keuze));
    knoppen.append(
      lees,
      volgend,
      this.knop(T.andereCategorie, 'lees-terug', () => (this.soort === 'info' ? this.toonSoort() : this.toonCategorieen(this.soort))),
      this.knop(T.klaar, 'lees-terug klaar', () => this.sluit()),
    );
    // Omdraaien: eerst de achterkant, dan draait het kaartje om.
    const kaart = this.inhoud.querySelector('.lees-kaart');
    requestAnimationFrame(() => requestAnimationFrame(() => kaart.classList.add('omgedraaid')));
    volgend.focus({ preventScroll: true });
  }

  leesVoor() {
    if (!this.kaart) return;
    this.voorlezen?.zeg(this.kaart.vraag, { toonhoogte: 1.2, altijd: true });
  }

  /** Munten staan standaard uit (zie LEES_MUNTEN in src/data/leeskaartjes.js). */
  geefMunten() {
    if (!LEES_MUNTEN.aan || !this.beloon) return;
    let stand = { datum: vandaag(), aantal: 0 };
    try {
      const d = JSON.parse(localStorage.getItem(MUNT_SLEUTEL));
      if (d?.datum === stand.datum) stand = d;
    } catch { /* geen opslag */ }
    const ruimte = LEES_MUNTEN.maxPerDag - stand.aantal;
    if (ruimte <= 0) return;
    const aantal = Math.min(LEES_MUNTEN.perKaartje, ruimte);
    stand.aantal += aantal;
    try { localStorage.setItem(MUNT_SLEUTEL, JSON.stringify(stand)); } catch { /* geen opslag */ }
    this.beloon(aantal, this.inhoud.querySelector('.lees-kaart'), `+${aantal}`);
  }
}

/** Korte melding vóór de Leeskraam: "Ga pas naar deze kraam als Meester Jop het heeft gezegd." */
export class LeesMelding {
  constructor(laag, { geluid }) {
    this.laag = laag;
    this.geluid = geluid;
    this.el = null;
    this.opSluiten = null;
    this.opJa = null;
    this.toetsen = (e) => {
      if (e.code === 'Escape') { e.preventDefault(); this.sluit(false); }
    };
  }

  get open() { return !!this.el; }

  toon() {
    if (this.el) return;
    this.el = document.createElement('div');
    this.el.className = 'winkel-achtergrond';
    this.el.innerHTML = `
      <div class="winkel lees lees-melding" role="alertdialog" aria-label="${T.kraamNaam}">
        <div class="lees-melding-icoon">✋</div>
        <p class="lees-melding-tekst">${T.eerstVragen}</p>
        <div class="lees-knoppen">
          <button type="button" class="lees-volgend" data-ja>✓ ${T.eerstVragenJa}</button>
          <button type="button" class="lees-terug" data-nee>${T.eerstVragenNee}</button>
        </div>
      </div>`;
    this.laag.appendChild(this.el);
    document.body.classList.add('venster-open');
    this.el.querySelector('[data-ja]').addEventListener('click', () => this.sluit(true));
    this.el.querySelector('[data-nee]').addEventListener('click', () => this.sluit(false));
    // Even wachten, anders telt de E-toets of klik waarmee je hier kwam meteen mee.
    setTimeout(() => window.addEventListener('keydown', this.toetsen), 50);
    this.geluid?.plop();
    this.el.querySelector('[data-nee]').focus({ preventScroll: true });
  }

  sluit(ja) {
    if (!this.el) return;
    window.removeEventListener('keydown', this.toetsen);
    this.el.remove();
    this.el = null;
    document.body.classList.remove('venster-open');
    this.opSluiten?.();
    if (ja) this.opJa?.();
  }
}
