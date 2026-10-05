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
| Kledingkast | K | knop 👕 |
| Camera | draait vanzelf mee achter de speler (slepen mag ook) | idem |
| Zoomen | scrollwiel | – |
| Praten met een karakter of kind | E (of klik op de kraam/het kind) | tik op het wolkje, de kraam of het kind |
| Keuzes in een gesprek | 1, 2, 3 of Esc | tik op de knop |

## Teksten aanpassen (voor leerkrachten)

Alle uitleg, begroetingen, knopteksten, **alle vragen van de minispellen** en wat de kinderen
op het plein zeggen staan in **`src/data/oefeningen.js`**. Bovenaan elk onderdeel staat uitgelegd hoe je
een vraag toevoegt. Per ronde kiest het spel willekeurig 8 vragen; zet er dus minstens 8 in.
Tussen `**sterretjes**` wordt een stukje tekst geel gemarkeerd, bijvoorbeeld `ik werk**te**`.
Gebruik bij de verleden tijd alleen **zwakke** werkwoorden (die volgen 't kofschip-x). Sterke werkwoorden
zoals zwemmen (zwom) of lopen (liep) horen niet in deze oefeningen.

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

Bij ★ klik je het antwoord aan. **Vanaf ★★ typ je zelf.**

| Spel | ★ (klikken) | ★★ (typen) | ★★★ (typen) |
|---|---|---|---|
| Kofschip | schatkist -te of -de | verleden tijd typen, ik-vorm als hulp | zonder hulp, ook strikvragen (leven, reizen…) |
| Tessa | -te of -tte kiezen | het ontbrekende stukje typen | het hele woord typen (alleen het hele werkwoord staat erbij) |
| Dirk | goede woorden vangen | werkwoord valt: typ de verleden tijd voor het de grond raakt | sneller, ook met wij (-den) |
| Vera | twee woorden kiezen | woord typen, ik-vorm als hulp | woord typen, alleen het hele werkwoord als hulp |
| Peter & Olga | persoonsvorm aanklikken | persoonsvorm en onderwerp typen | idem, met vraagzinnen en lange zinnen |
| Gijs | werkwoorden aanklikken | werkwoorden typen, je ziet hoeveel het er zijn | werkwoorden typen zonder teller, zelf op Klaar drukken |

In `src/data/oefeningen.js` heeft elke vraag een `niveau: 1, 2 of 3`. Bij 2 of 3 sterren komen
vooral vragen van dat niveau, aangevuld met makkelijkere vragen.

## Munten

Rechtsboven staat de muntenteller. Munten verdien je in de minispellen:

| | ★ | ★★ | ★★★ |
|---|---|---|---|
| Goed in één keer | 5 | 10 | 15 |
| Goed bij de 2e poging | de helft | de helft | de helft |

- Goed bij de 3e poging of later: geen munten (wel gewoon verder).
- **Reeks**: elke 3 goede antwoorden op rij (in één keer goed) = +5 extra.
- **Foutloze ronde**: +20.
- Een fout kost **nooit** munten.
- **Verstopte muntjes**: op het plein liggen 15 gouden muntjes verstopt (achter bomen, op de klimtoren,
  op een balanceerpaal…). Loop of spring eroverheen: +2 munten per muntje. Elke dag liggen ze er weer.
- Na elke ronde zie je een overzicht: goede antwoorden, munten, bonussen en je nieuwe totaal.

Alle bedragen staan in `src/data/oefeningen.js` bij `MUNTEN`.

## De Bunders Boetiek en de kledingkast

Bij de ingang staat **De Bunders Boetiek** met verkoopster **Bo Boetiek**. Druk op **E** om de winkel te openen.

- Categorieën: Hoofd, Shirt, Broek, Schoenen en Extra (22 items, 20 tot 300 munten; de kroon en de cape zijn het duurst).
- **Pas aan** laat je iets eerst proberen op het draaiende poppetje. Te duur? Dan staat er "Nog X munten nodig".
- Voor elke aankoop vraagt de winkel: "Weet je het zeker?"
- Gekochte kleding trek je meteen aan. In de **Kledingkast** (toets **K** of de knop 👕) trek je kleding aan en uit.

Alle kleding en prijzen staan in `src/data/oefeningen.js` bij `KLEDING`; hoe het eruitziet staat in `src/kleding.js`.

## De meesters op het plein

**Meester Jop**, **Meester Bram** en **Meester Koen** lopen rond op het plein. Heeft een meester een
geel **vraagteken** boven zijn hoofd? Dan heeft hij een vraag voor je over een van de zes onderwerpen.

- Druk op **E** (of klik/tik op de meester) en typ het antwoord. Bestaat het antwoord uit meer woorden
  (bijv. "heb gekocht" of "De kinderen"), dan krijg je voor elk woord een eigen vakje.
- Goed in één keer: **20 munten**. Bij de tweede poging: 10 munten. Twee keer fout? Dan legt de meester het uit.
- Daarna heeft die meester **5 minuten** pauze. Elke meester stelt **maximaal 5 vragen per dag**.
- De vragen komen uit de oefeningen van de minispellen (tot en met 2 sterren).

Bedragen, wachttijd en teksten staan in `src/data/oefeningen.js` bij `MEESTERS` en `MEESTER_VRAAG`.

## De Voetbalwereld

In het hek aan de oostkant van het plein (naast de klimtoren) staat een grote poort met het bord **Voetbalwereld**.

- Zolang je nog niet alle 6 stempels hebt, zit er een slot op. Het bordje vertelt hoeveel stempels je nog nodig hebt.
- Na het feest bij de laatste stempel valt het slot eraf, zwaait de poort open en glinstert er licht in de opening.
- Loop door de poort: het scherm wordt even wit en je bent in de Voetbalwereld. Daar staat een poort terug
  naar het schoolplein. Je kunt altijd heen en weer.
- De Voetbalwereld wordt pas geladen als je erheen gaat. Zolang je daar bent, staat het schoolplein stil
  (dat houdt het spel soepel op een Chromebook).
- In de Voetbalwereld staat een stadion met tribunes, juichend publiek, lichtmasten, reclameborden
  (zonder echte merken) en een groot scorebord. Je speelt in het blauw-gele tenue van **De Bunders**;
  je gekochte hoofddeksel, schoenen en extra's houd je aan.
- *In aanbouw:* teamgenoten, tegenstanders, de wedstrijd en het toernooi volgen in de volgende stappen.

| Actie in de Voetbalwereld | Toetsenbord | Touchscreen |
|---|---|---|
| Lopen | WASD of pijltjes (W = naar het doel van de tegenstander) | joystick |
| Sprinten | Shift (energiebalk onderin) | knop Sprint |
| Schieten | spatie vasthouden (krachtbalkje) en loslaten | knop Schiet vasthouden |
| Dribbelen | loop tegen de bal: hij blijft voor je voeten | idem |

### Testen met F9 (voor de leerkracht)

Druk op **F9** om meteen alle stempels te krijgen; daarna komen het feest, de oorkonde en gaat de poort open.
**Zet dit uit voordat de kinderen gaan spelen:** zet in `src/data/oefeningen.js` bij `TEST` de regel
`geheimeToetsF9: true` op `false`, en zet de nieuwe versie online met `npm run deploy`.

## Balans van de munten

Doorgerekend met een simulatie (`MUNTEN`, `KLEDING` en `MEESTER_VRAAG` in het databestand):

| Speler | Munten per ronde ★ / ★★ / ★★★ | Les van 45 minuten | Alle kleding (1690 munten) |
|---|---|---|---|
| Sterk | ~61 / 86 / 111 | ~1300 | na ~1,3 les |
| Gemiddeld | ~50 / 65 / 82 | ~1000 | na ~1,6 les |
| Zwakker | ~38 / 48 / 59 | ~775 | na ~2,2 lessen |

- Ongeveer een vijfde van de munten komt van de meesters (max. 5 vragen per meester per dag, 5 minuten pauze),
  de rest van het oefenen bij de kramen.
- Wil je dat kinderen langer sparen? Verhoog dan de prijzen in `KLEDING`, of verlaag `perNiveau` bij `MUNTEN`.

## Wat wordt er bewaard?

Alles wordt bewaard in de browser (localStorage) van het apparaat. Zie `src/opslag.js` voor de lijst:
stempels en niveaus, munten, gekochte en aangetrokken kleding, gevonden muntjes van vandaag, de vragen
van de meesters, het laatst gekozen niveau per kraam, en de instellingen voor geluid en voorlezen.

- Oudere opgeslagen voortgang (van vóór de munten) blijft gewoon werken.
- **↺ Opnieuw beginnen** wist na bevestiging alles, behalve de instellingen voor geluid en voorlezen.
- Op gedeelde Chromebooks met hetzelfde account delen kinderen dus dezelfde voortgang.

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
  munten.js            de munten van de speler (bewaard in de browser)
  winkel.js            De Bunders Boetiek (winkelvenster)
  kleding.js           hoe elk kledingstuk eruitziet op het poppetje
  kledingkast.js       gekochte en aangetrokken kleding (bewaard in de browser)
  ui/kastvenster.js    het venster van de kledingkast
  ui/paspop.js         het draaiende poppetje in winkel en kast
  wereld/pleinmuntjes.js  de 15 verstopte muntjes op het plein
  meesters.js          Meester Jop, Bram en Koen (rondlopen, vraagteken, wachttijd)
  meestervragen.js     maakt een vraag uit de oefeningen
  opslag.js            lijst van alles wat in de browser bewaard wordt
  poort.js             de poort (dicht/open, slot, glinsterend licht)
  voetbal/voetbalwereld.js  de Voetbalwereld (wordt pas geladen bij de poort)
  voetbal/stadion.js   veld, doelen, tribunes met publiek, scorebord, lichtmasten
  voetbal/bal.js       de bal met eigen natuurkunde (rollen, stuiteren, palen, net)
  voetbal/tenue.js     het tenue van De Bunders
  voetbal/voetbalhud.js  sprint- en krachtbalk, GOAL!, touchknoppen
  voetbal/voetbalstand.js   voortgang in de Voetbalwereld (bewaard in de browser)
  ui/overgang.js       witte overgang tussen de werelden
  ui/meestervraag.js   het vraagvenster van een meester
  wereld/
    schoolplein.js     gebouw, hek, natuurspeelplaats, bomen, buurt
    kramen.js          de zes marktkramen met versiering
    botsing.js         zorgt dat je niet door dingen heen loopt
    helpers.js         kleine bouwstenen (doos, cilinder, naambord)
  ui/hud.js            titel, hulpkaart en tekstwolkje
  ui/dialoog.js        gespreksvenster met de drie knoppen
  ui/confetti.js       confetti bij een goed antwoord
  ui/stempelkaart.js   de stempelkaart in beeld
  ui/muntenteller.js   muntenteller rechtsboven en vliegende muntjes
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
- [x] Munten, verstopte muntjes, De Bunders Boetiek, kledingkast en de meesters
