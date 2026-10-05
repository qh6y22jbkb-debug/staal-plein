# Staal Plein – De Bunders

Een 3D-leerspel voor groep 7 van basisschool De Bunders. Je loopt over het schoolplein, praat met de karakters achter de marktkramen en oefent de leerdoelen van **Staal blok 2** (werkwoordspelling en zinsontleding).

## Direct spelen

👉 **https://qh6y22jbkb-debug.github.io/staal-plein/**

Werkt in Chrome op Chromebook, laptop en digibord. Er hoeft niets geïnstalleerd te worden.

## Starten (voor wie aan het spel wil werken)

Je hebt [Node.js](https://nodejs.org) nodig (versie 20 of nieuwer).

```bash
npm install
npm run dev
```

Open daarna het adres dat in beeld verschijnt (meestal http://localhost:5200).

Voor gebruik zonder ontwikkelserver (bijv. op een schoolserver):

```bash
npm run build
```

De map `dist/` bevat dan het complete spel. Het spel gebruikt geen internet, plaatjes of externe 3D-modellen.

### Nieuwe versie online zetten

Na een aanpassing (bijvoorbeeld nieuwe vragen in `src/data/oefeningen.js`):

```bash
npm run deploy
```

Dit bouwt het spel en zet het op de `gh-pages`-tak. Na een minuutje staat de nieuwe versie op de link hierboven.

## Besturing

| Actie | Toetsenbord / muis | Tablet / digibord |
|---|---|---|
| Vooruit lopen | ↑ of W | joystick omhoog |
| Draaien | ← → of A D | joystick naar links/rechts |
| Achteruit | ↓ of S | joystick omlaag |
| Ergens heen lopen | klik op de grond | tik op de grond |
| Springen | spatie | Spring-knop |
| Camera | draait vanzelf mee achter de speler (slepen mag ook) | idem |
| Zoomen | scrollwiel | – |
| Praten met een karakter of kind | E (of klik op de kraam/het kind) | tik op het wolkje, de kraam of het kind |
| Keuzes in een gesprek | 1, 2, 3 of Esc | tik op de knop |

## Teksten aanpassen (voor leerkrachten)

Alle uitleg, begroetingen, knopteksten, **alle vragen van de minispellen** en wat de kinderen
op het plein zeggen staan in **`src/data/oefeningen.js`**. Bovenaan elk onderdeel staat uitgelegd hoe je
een vraag toevoegt. Per ronde kiest het spel willekeurig 8 vragen; zet er dus minstens 8 in.
Tussen `**sterretjes**` wordt een stukje tekst geel gemarkeerd, bijvoorbeeld `ik werk**te**`.

## De minispellen

| Kraam | Spel |
|---|---|
| Kapitein Kofschip | kies de schatkist **-te** of **-de** |
| Tante Tessa | vul het stukje in: -te, -ten, -tte of -tten |
| Dirk de Drummer | vang de goed geschreven woorden met je trommel, ontwijk de foute |
| Vera Voorvoegsel | kies het goed geschreven woord in de zin |
| Peter & Olga | klik eerst de persoonsvorm, dan het onderwerp |
| Gijs Gezegde | klik alle werkwoorden aan; ze worden ijsbolletjes op een hoorntje |

Elke ronde heeft 8 vragen. Bij een fout krijg je een vriendelijke hint en mag je het opnieuw proberen.
Toetsen: 1–4 om te kiezen, Enter voor de volgende vraag, Esc om te stoppen.

### Niveaus (1, 2 of 3 sterren)

Voor elk spel kies je eerst een niveau. De niveaus gaan één voor één open: eerst 1 ster;
haal je daar een ronde, dan gaat 2 sterren open, en daarna 3 sterren. Dit geldt per kraam.
Met **↺ Opnieuw beginnen** gaan alle niveaus weer op slot.

| Spel | ★ | ★★ | ★★★ |
|---|---|---|---|
| Kofschip | gewone werkwoorden, 't kofschip-x in beeld | ook dubbele letters, ch, x | strikvragen (leven, reizen, praten…), zonder geheugensteun |
| Tessa | alleen ik/hij/zij, kies -te of -tte | ook meervoud, vier keuzes | zelf het stukje typen |
| Dirk | langzaam, makkelijke foute woorden | sneller, alle foute woorden | snel, veel foute woorden |
| Vera | twee keuzes | drie keuzes | zelf het hele woord typen |
| Peter & Olga | alleen de persoonsvorm | persoonsvorm + onderwerp, ook omgedraaide zinnen | ook vraagzinnen en lange zinnen |
| Gijs | 1–2 werkwoorden, met teller | lastigere zinnen, met teller | 3 werkwoorden, zonder teller: zelf op Klaar drukken |

In `src/data/oefeningen.js` heeft elke vraag een `niveau: 1, 2 of 3`. Bij 2 of 3 sterren komen
vooral vragen van dat niveau, aangevuld met makkelijkere vragen.

## Stempelkaart, geluid en voorlezen

- Een kraam krijgt pas een **stempel** op de stempelkaart (linksboven) als alle **3 niveaus** gehaald zijn.
  Onder elk vakje zie je hoeveel niveaus je al hebt (★☆☆, ★★☆, ★★★). Bij een stempel verschijnt er
  ook een gouden ster boven de kraam.
- Bij alle 6 stempels: **feest** op het plein (vuurwerk, muziekje, juichende kinderen) en de oorkonde
  **"Staal Blok 2 Kampioen!"**. Het kind typt zijn of haar naam erop; de oorkonde kan worden afgedrukt.
- De voortgang wordt bewaard in de browser (localStorage). Met de knop **↺** rechtsboven begin je opnieuw.
- **🗣️ Voorlezen**: karakters, kinderen en de minispellen lezen hun tekst voor met een Nederlandse stem
  (Web Speech API). Aan/uit met de knop rechtsboven of de luidspreker in het gespreksvenster.
  In elk minispel staat ook een 🔊-knop om de vraag nog eens te laten voorlezen.
- **🔊 Geluid**: vrolijke geluidjes, gemaakt met de Web Audio API (geen geluidsbestanden). Aan/uit rechtsboven.

Let op: voorlezen werkt alleen als de computer een Nederlandse stem heeft. Op Chromebooks en
Windows-laptops is die er meestal; anders blijft het spel gewoon werken, zonder stem.

## Mappen

```
src/
  data/oefeningen.js   ALLE teksten en oefeningen (hier pas je dingen aan)
  main.js              start het spel en de spellus
  speler.js            het poppetje: lopen, springen, animatie
  camera.js            camera die meeloopt en niet door muren gaat
  besturing.js         toetsenbord, klikken, joystick
  karakters.js         de karakters achter de kramen
  kinderen.js          rondlopende kinderen met grappige uitspraken
  minispellen/         de zes minispellen (basis.js = gedeeld venster en niveaus)
  geluid.js            alle geluidjes (Web Audio API)
  voorlezen.js         voorlezen met een Nederlandse stem (Web Speech API)
  voortgang.js         stempels bewaren in de browser
  wereld/
    schoolplein.js     gebouw, hek, natuurspeelplaats, bomen, buurt
    kramen.js          de zes marktkramen met versiering
    botsing.js         zorgt dat je niet door dingen heen loopt
    helpers.js         kleine bouwstenen (doos, cilinder, naambord)
  ui/hud.js            titel, hulpkaart en tekstwolkje
  ui/dialoog.js        gespreksvenster met de drie knoppen
  ui/confetti.js       confetti bij een goed antwoord
  ui/stempelkaart.js   de stempelkaart in beeld
  ui/oorkonde.js       de kampioensoorkonde
  ui/startscherm.js    het startscherm
  wereld/vuurwerk.js   vuurwerk bij het feest
```

## Bouwstappen

- [x] Stap 1: schoolplein, lopende speler en camera
- [x] Stap 2: kramen, karakters en dialoogvenster
- [x] Stap 3: de zes minispellen + kinderen op het plein
- [x] Niveaus: 1, 2 of 3 sterren per spel
- [x] Stap 4: stempelkaart, geluid, voorlezen en afwerking
