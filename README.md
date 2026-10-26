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

### Rekenen controleren

Heb je de regels in `src/data/rekenen.js` aangepast? Controleer dan of alle sommen en antwoorden nog kloppen:

```bash
npm test
```

Dit rekent tienduizenden willekeurige sommen na (plus, min, keer, staartdeling, klok en tafels) en controleert dat
er geen enkel fout antwoord goed gerekend wordt. Bij een fout zie je **FOUT** met de som erbij.

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
| Dansen | M (kort = je gekozen dansje, lang = dansmenu; M + 1–4 kiest een dansje) | knop Dans (lang = dansmenu) |
| Op- en afstappen (vervoer) | V | knop 🚲 (alleen als je vervoer hebt) |

### Muren en camera

- Muren, hekken, kasten en andere hoge dingen zijn **massief**: je kunt er niet doorheen lopen en er ook niet
  overheen springen. Alles van 2 meter of hoger is vanzelf massief (`MASSIEF_VANAF` in `src/wereld/botsing.js`).
- Je beweegt in kleine stapjes, zodat je ook bij hoge snelheid (of een haperende computer) niet door een muur schiet.
- De camera gaat nooit door een muur. Staat er een muur achter je, dan kantelt de camera omhoog en kijkt van bovenaf mee.

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

### Shirtkleur

In de kledingkast staat onder elk shirt een **kleurkiezer** met 12 kleuren (en de knop "Origineel").
Een kleur kiezen is gratis en trekt het shirt meteen aan. De kleur wordt bewaard en is ook te zien bij
**Pas aan** in de winkel. De kleuren staan in `src/data/oefeningen.js` bij `KLEURKIEZER_KLEUREN`.

### Dansjes

In de winkel staat het tabblad **💃 Dansjes**: Moonwalk (gratis), Juichdansje (40), Robotdans (60) en
Draaien op één been (80). Met **Bekijk** doet het poppetje het dansje voor. Op het plein druk je op **M**
(of de knop Dans) om te dansen; houd M lang ingedrukt voor het dansmenu. Dansen kan niet tijdens een gesprek,
in een minispel, op een vervoersmiddel of in het klimtouw. De dansjes staan bij `DANSJES` in het databestand.

### Vervoer: step, skateboard en fiets

In de winkel staat het tabblad **🚲 Vervoer**: step (80), skateboard (150) en fiets (250). Met **Bekijk**
staat het poppetje erop.

- Met **V** (of de knop 🚲 op een tablet) stap je op en af. Je gaat dan ongeveer **twee keer zo snel**.
  Springen kan niet zolang je rijdt.
- Op de fiets zit je en trap je (de wielen en trappers draaien mee); op de step en het skateboard zet je af met één been.
- Rijden kan **alleen op het schoolplein**. Je stapt vanzelf af bij een kraam (zodat je kunt praten), bij de deur
  van de school of de gymzaal en bij de poort naar de Voetbalwereld.
- In de **kledingkast** kies je waarmee je rijdt. De fiets en de step hebben ook de kleurkiezer.
- Prijzen en snelheden staan bij `VERVOER` in `src/data/oefeningen.js` (`snelheid: 2` = twee keer zo snel als lopen).

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
- Bij het bord **Kies je tegenstander** naast het veld (druk op E, of op de knop onderin) kies je een team.
  Daarna speel je een wedstrijd van **4 tegen 4**: een keeper en drie
  veldspelers per team. Jij bestuurt één veldspeler (geel ringetje); de rest doet de computer.
  Een wedstrijd duurt 3 minuten. Bal uit? Dan legt de computer hem terug (ingooi, hoekschop of doelschop).
- **Toernooi:** drie tegenstanders, van makkelijk naar moeilijk: **De Slakken**, **De Wervelwinden** en
  **De Bliksems**. Het tweede team gaat open als je van het eerste wint, het derde na winst op het tweede.
- Win je van alle drie, dan krijg je de **Bunders Beker**: een gouden beker in beeld, vuurwerk boven het
  stadion, en de beker komt op een sokkel midden tussen de kramen op het schoolplein te staan.

| Actie in de Voetbalwereld | Toetsenbord | Touchscreen |
|---|---|---|
| Lopen | WASD of pijltjes (W = naar het doel van de tegenstander) | joystick |
| Sprinten | Shift (energiebalk onderin) | knop Sprint |
| Schieten | spatie vasthouden (krachtbalkje) en loslaten | knop Schiet vasthouden |
| Dribbelen | loop tegen de bal: hij blijft voor je voeten | idem |
| Passen | Q (naar de teamgenoot in je looprichting) | knop Pass |
| Wisselen | E (naar de veldspeler het dichtst bij de bal) | knop Wissel |
| Bal afpakken | loop tegen de tegenstander met de bal | idem |
| Wedstrijd stoppen | Esc of de knop Stoppen | knop Stoppen |

Krijgt een teamgenoot de bal (bijvoorbeeld na jouw pass), dan bestuur je hem meteen.
Wedstrijdduur, de computerspelers van De Bunders en de drie tegenstanders (snelheid, schieten, keeper,
afpakken, passen) staan in `src/data/oefeningen.js` bij `VOETBAL_WEDSTRIJD` en `VOETBAL_TEAMS`.

### Munten en voetbalspullen

| In de Voetbalwereld | Munten |
|---|---|
| Doelpunt van De Bunders | +5 |
| Gelijkspel | +10 |
| Winst tegen De Slakken / De Wervelwinden / De Bliksems | +20 / +30 / +40 |
| De eerste keer de Bunders Beker | +100 |
| Verlies | kost nooit munten |

Na elke wedstrijd zie je een overzicht met de uitslag, je doelpunten en de verdiende munten.
In De Bunders Boetiek staat onder **⚽ Voetbal**: oranje en neongroene voetbalschoenen, keepershandschoenen,
een aanvoerdersband en een **gouden bal** (alleen te koop na het winnen van de Bunders Beker).
In de Voetbalwereld draag je het teamshirt, maar je eigen hoofddeksel, schoenen en extra's houd je aan.
Alle bedragen staan in `src/data/oefeningen.js` bij `VOETBAL_MUNTEN` en `winstMunten` per team.

## Leergroep 3: rekenen in de school

Via de voordeur van de school (bord **Leergroep 3 - Rekenen**, druk op E) kom je in Leergroep 3, nagebouwd naar
foto's van de echte ruimte: een lang leerplein met een lichtstraat, links drie oranje en rechts drie gele lokalen,
en bij de ingang blauwe nissen. Binnen loop je terug naar buiten via de deur met het groene bord **Schoolplein**.
Leergroep 3 wordt pas geladen als je naar binnen gaat; het schoolplein staat dan stil (soepel op een Chromebook).

### Wachtwoord (de school is nog in aanbouw)

Bij de voordeur vraagt het spel om een wachtwoord: **Rekenenisleuk** (hoofdletters maken niet uit). Is het één
keer goed ingevuld, dan blijft de deur open tot de pagina opnieuw geladen wordt. De leerkrachtcode opent de school
ook. Het wachtwoord staat in `src/data/rekenen.js` bij `LEERGROEP.wachtwoord`; zet het op `''` als de school klaar
is, dan kan iedereen zonder wachtwoord naar binnen.

### De zes rekenkramen

In elk lokaal staat een kraam met een karakter. Praten met E, met de knoppen "Leg het nog eens uit", "Ik wil spelen!"
en "Doei!" (de uitleg wordt voorgelezen). Elk spel heeft drie niveaus: **🥉 Brons, 🥈 Zilver en 🥇 Goud** (eerst Brons,
dan Zilver, dan Goud). Munten werken zoals bij de taalkramen; een fout antwoord kost nooit munten.

| Lokaal | Kraam | Wat oefen je? |
|---|---|---|
| 1 | Pim Plus | optellen onder elkaar (verkort DHTE-schema, met onthoud-cijfers) |
| 2 | Mila Min | aftrekken onder elkaar (inwisselen, ook over een nul heen) |
| 3 | Kees Keer | vermenigvuldigen onder elkaar (Goud: 2 × 2 cijfers met twee tussenregels) |
| 4 | Dina Deel | de staartdeling stap voor stap (antwoord bovenaan, keer-getal, aftrekken, cijfer naar beneden, rest) |
| 5 | Klaas Klok | klokkijken: kiezen uit 3, en zelf de wijzers verslepen (ook met een vinger); Goud: 24-uursklok en tijdsduur |
| 6 | Tijn Tafel | tafelrace tegen Tijn: kies één tafel of "Alle tafels door elkaar"; Tijn past zijn tempo aan |

- **DHTE-schema en staartdeling:** het kind vult zelf alle cijfers in, van rechts naar links (bij de staartdeling
  van boven naar beneden). Elke kolom of stap wordt apart nagekeken: goed wordt groen, alleen het foute vakje wordt rood.
- **Tips van de meesters:** Meester Jop noemt de regel of de eerste stap, Meester Bram kleurt waar je moet kijken
  (of streept een fout antwoord weg), Meester Koen doet de stap samen met je (daarna minder munten voor die som,
  nooit minder dan 0).
- Alle sommen worden steeds willekeurig gemaakt. Ze zijn met tienduizenden sommen nagerekend: er wordt geen enkel
  fout antwoord goed gerekend.

### Regels per niveau aanpassen (voor leerkrachten)

Alles staat in **`src/data/rekenen.js`**:

- `REKEN_REGELS`: per kraam en per niveau de regels, bijvoorbeeld de grootte van de getallen (`min`, `max`),
  hoe vaak je moet onthouden of inwisselen, of een deling een rest heeft, welke klokvragen er komen en welke tafels.
- `REKEN_INSTELLINGEN`: het aantal sommen per ronde, en hoe je noteert, zodat het past bij de rekenmethode:
  `onthoudPlek` (`'boven'` of `'onder'`), `onthoudVerplicht` (moeten de onthoud-vakjes ingevuld worden?) en
  `nulZelfInvullen` (typt het kind de 0 in de tweede keerregel zelf?).
- `LOKALEN`: de namen, begroetingen en uitleg van de karakters. `REKEN_SPELLEN`, `REKEN_TIPS`, `REKEN_FOUT`,
  `KLOK_TEKSTEN` en `TAFEL_TEKSTEN`: alle andere teksten.

### Rekenkaart en beloning

In de school zie je linksboven de **Rekenkaart** (op het plein de gewone stempelkaart): zes vakjes met een medaille
voor het hoogste niveau per kraam. Staan alle zes op Goud, dan volgt een feest in Leergroep 3 (confetti en muziek),
de titel **Rekenkampioen van Leergroep 3!**, en gaat in De Bunders Boetiek de **gouden rekenmachine-rugzak** open
(150 munten). De Rekenkaart telt **niet** mee voor de poort naar de Voetbalwereld.

## De gymzaal

Rechts naast de school staat de **gymzaal** (deur met het bord 🏀 Gymzaal). Binnen:

- **Klimtouw met bel**: druk op E bij een touw, klim met ↑ en ↓, en luid bovenin de bel met spatie.
  De bel geeft 3 munten, maximaal 3 keer per dag.
- **Trampoline**: spring met spatie en druk in de lucht nog eens op spatie voor een **salto**.
- **Basketbal**: pak de bal met E, houd spatie ingedrukt en laat los als de krachtbalk in het groene vak staat.
  Je ziet hoe vaak je gescoord hebt.

De gymzaal wordt pas geladen als je naar binnen gaat. Alle teksten en instellingen staan in `src/data/gym.js` bij `GYM`.

### Gymtijd

Naar de gymzaal mag je alleen met **gymtijd**. Die verdien je met stempels:

- Elke **nieuwe of betere stempel** (op het plein of een medaille in Leergroep 3) geeft **3 minuten** gymtijd.
- Je kunt maximaal **15 minuten** opsparen.
- Je gymtijd zie je onder de stempelkaart en bij de deur van de gymzaal. Zonder gymtijd is de deur dicht.
- In de gymzaal loopt de tijd af (rechtsboven). Bij nog 30 seconden komt er een melding; bij 0 klinkt een fluitje,
  verschijnt **"De gymles is voorbij!"** en sta je weer op het schoolplein.
- De instellingen staan in `src/data/gym.js` bij `GYMTIJD` (`minutenPerStempel` en `maxMinuten`).

## Voor de leerkracht

### Leerkrachtcode: alles vrijspelen

Typ **Themamuur** ergens in het spel (gewoon op het toetsenbord, zonder invulvak; hoofdletters maken niet uit), of klik op het startscherm
op **🔑 Leerkracht** en vul de code daar in (handig op het digibord). Dan wordt alles vrijgespeeld: alle stempels
en niveaus, de oorkonde, de poort naar de Voetbalwereld, alle tegenstanders, de Bunders Beker, de school
(Leergroep 3) met alle rekenkramen op Goud, alle kleding (ook de gouden rekenmachine-rugzak), alle dansjes,
alle vervoersmiddelen en 15 minuten gymtijd.
De code staat in `src/data/oefeningen.js` bij `TEST.leerkrachtCode`; zet hem op `''` om dit uit te zetten.
Met **↺ Opnieuw beginnen** zet je alles weer terug.

### Testen met F9 (voor de leerkracht)

Druk op **F9** om meteen alle stempels te krijgen, ook alle rekenstempels (Goud). Op het plein komen daarna het feest,
de oorkonde en gaat de poort open; in Leergroep 3 komt het rekenfeest (sta je op het plein, dan komt het rekenfeest
zodra je de school in gaat). F9 geeft ook 15 minuten gymtijd.
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
stempels en niveaus, munten, gekochte en aangetrokken kleding (ook de voetbalspullen), gevonden muntjes
van vandaag, de vragen van de meesters, of de poort open is, welke tegenstanders verslagen zijn, of de
Bunders Beker gewonnen is, de Rekenkaart (Brons/Zilver/Goud per rekenkraam en of je Rekenkampioen bent),
het laatst gekozen niveau per kraam, de gekochte dansjes en welk dansje je gekozen hebt, de shirtkleuren,
de gekochte vervoersmiddelen (welk je gebruikt en de kleuren), je gymtijd, hoe vaak je vandaag munten kreeg
voor de bel in de gymzaal, en de instellingen voor geluid en voorlezen.

| Sleutel | Wat |
|---|---|
| `staal-blok2-dansjes` | gekochte dansjes en het gekozen dansje |
| `staal-blok2-vervoer` | gekochte vervoersmiddelen, welk je gebruikt en de kleuren |
| `staal-blok2-gymtijd` | opgespaarde gymtijd (in seconden) |
| `staal-blok2-gym` | hoe vaak je vandaag munten kreeg voor de bel |
| `staal-blok2-kleding` | gekochte en aangetrokken kleding, nu ook met de shirtkleuren |

- Oudere opgeslagen voortgang (van vóór de munten, Leergroep 3, de dansjes, de shirtkleuren, het vervoer of de gymtijd)
  blijft gewoon werken. Kapotte of onbekende gegevens worden overgeslagen.
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
  voetbal/voetbalhud.js  stand, tijd, sprint- en krachtbalk, GOAL!, eindscherm, touchknoppen
  voetbal/wedstrijd.js  de wedstrijd: balbezit, afpakken, uitballen, doelpunten, aftrap, tijd
  voetbal/voetbalai.js  de computerspelers en keepers
  voetbal/voetbalspeler.js  een speler in de wedstrijd (team, rol, plek)
  voetbal/toernooi.js  het toernooi (welke teams open zijn) en het bord "Kies je tegenstander"
  wereld/beker.js      de Bunders Beker op zijn sokkel
  voetbal/voetbalstand.js   voortgang in de Voetbalwereld (bewaard in de browser)
  ui/overgang.js       witte overgang tussen de werelden
  ui/meestervraag.js   het vraagvenster van een meester
  wereld/
    schoolplein.js     gebouw, hek, natuurspeelplaats, bomen, buurt
    kramen.js          de zes marktkramen met versiering
    botsing.js         zorgt dat je niet door dingen heen loopt (massief: ook niet eroverheen springen)
    helpers.js         kleine bouwstenen (doos, cilinder, naambord)
  ui/hud.js            titel, hulpkaart en tekstwolkje
  ui/dialoog.js        gespreksvenster met de drie knoppen
  ui/confetti.js       confetti bij een goed antwoord
  ui/stempelkaart.js   de stempelkaart in beeld
  ui/muntenteller.js   muntenteller rechtsboven en vliegende muntjes
  ui/oorkonde.js       de kampioensoorkonde
  ui/startscherm.js    het startscherm
  wereld/vuurwerk.js   vuurwerk bij het feest
  data/rekenen.js      ALLE teksten en regels van Leergroep 3 (hier pas je het rekenen aan)
  data/leeskaartjes.js de vragenkaartjes van de Leeskraam
  binnen/leergroep3.js de binnenwereld: Leergroep 3 met de zes lokalen (wordt pas geladen bij de deur)
  binnen/rekenkramen.js de zes rekenkramen met versiering
  rekenen/sommen.js    willekeurige sommen volgens de regels per niveau
  rekenen/schema.js    het DHTE-schema als gegevens (plus, min, keer) en het nakijken per kolom
  rekenen/dhte.js      het DHTE-schema op het scherm (vakjes, typen, nakijken, tips)
  rekenen/dhtespel.js  het rekenspel met het DHTE-schema (Pim, Mila, Kees)
  rekenen/staartdeling.js  de staartdeling als gegevens; staartdelingschema.js = op het scherm; deelspel.js = Dina
  rekenen/tijd.js      klokkijken: tijden in woorden, 24-uurs, tijdsduur en de klokvragen
  rekenen/klok.js      de analoge klok met versleepbare wijzers; klokspel.js = Klaas
  rekenen/tafels.js    tafelsommen en het tempo van Tijn; tafelrace.js = de race
  rekenvoortgang.js    Brons/Zilver/Goud per rekenkraam (bewaard in de browser)
  ui/rekenkaart.js     de Rekenkaart in beeld
  ui/schoolslot.js     het wachtwoordvenster bij de schooldeur
  ui/leesvenster.js    de vragenkaartjes van de Leeskraam
  dansjes.js           de dansjes: bezit (bewaard in de browser), houdingen en het dansen zelf
  ui/dansmenu.js       het dansmenu (M lang ingedrukt of de knop Dans)
  ui/kleurkiezer.js    de kleurkiezer met 12 kleuren (shirts, fiets en step)
  vervoer.js           step, skateboard en fiets: bezit, 3D-modellen, rijhouding, op- en afstappen
  gymtijd.js           de gymtijd: verdienen, aftellen en bewaren
  data/gym.js          ALLE teksten en instellingen van de gymzaal en de gymtijd
  binnen/gymzaal.js    de gymzaal: klimtouw, trampoline, basketbal (wordt pas geladen bij de deur)
  (opslaan: opslag.js; botsing: wereld/botsing.js)
```

## Bouwstappen

- [x] Stap 1: schoolplein, lopende speler en camera
- [x] Stap 2: kramen, karakters en dialoogvenster
- [x] Stap 3: de zes minispellen + kinderen op het plein
- [x] Niveaus: 1, 2 of 3 sterren per spel
- [x] Stap 4: stempelkaart, geluid, voorlezen en afwerking
- [x] Munten, verstopte muntjes, De Bunders Boetiek, kledingkast en de meesters
- [x] De Voetbalwereld: poort, stadion, wedstrijd 4 tegen 4, toernooi, Bunders Beker, munten en voetbalspullen
- [x] De Leeskraam (Spot aan!): vragenkaartjes voor maatjeslezen
- [x] Leergroep 3: de school in, zes rekenkramen (DHTE-schema, staartdeling, klok, tafelrace), Rekenkaart en beloning
- [x] Verbeteringen: massieve muren en camera, dansjes (moonwalk), shirtkleur, gymzaal, gymtijd en vervoer (step, skateboard, fiets)
