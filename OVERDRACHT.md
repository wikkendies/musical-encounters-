# Musical Encounters – overdracht voor een andere AI (bv. Copilot)

_Laatst bijgewerkt: 30 september 2026._

Website met muziekoefeningen (ritme en melodie) voor leerlingen van de 1ste graad secundair (12–14 jaar), in het Nederlands.
Online via Netlify: https://letsmakerhythm.netlify.app (updaten: map slepen in Netlify > Deploys).
Werkversie (altijd de nieuwste): Claude Artifact https://claude.ai/artifact/1vWT1oCGwAjmt915copGCt — Netlify loopt soms achter.

De site heet nu **Musical Encounters** en heeft drie onderdelen: **Let's Make Rhythm** (ritme), **Let's Make Melodies** (melodie) en **Let's Make Dynamics** (dynamiek). Plan: één deur per bouwsteen uit de cursus (Ritme, Melodie, Dynamiek, Tempo, Klankkleur, Samenklank, Vorm); ritme en melodie krijgen de volle leerlijn (6 niveaus), de andere bouwstenen enkel wat zinvol is (1–3 niveaus).

## Status in het kort (voor wie snel wil weten waar dit staat)
1. ✅ Ritme-onderdeel (`ritme.html`, 10 tegels): Hold That Note, Rhythm Sequence, Missing Beat, Follow the Score, Bar Line Hunter, Rhythm Builder, Find the Bass (enkel niveau 1), Drum Detective (4 delen), Tap It Back + hulpmiddel Beat Maker.
2. ✅ Melodie-onderdeel (`melodie.html`, 7 tegels): hulpmiddel Piano + Mind the Gap, Melodiepuzzel, Melody Lines, Mission Impossible, Melody Builder, Sharp Ears.
   Elke melodie-oefening heeft het pianoklavier (piano.js) als hulpmiddel, altijd zichtbaar (ook in testmodus).
   Alle zes melodie-oefeningen hebben een testmodus. Melodietest = `test.html?deel=melodie` met samenstelling in `TESTS_MEL` (niveaus 1–4, voorstel).
   De melodietest werkt voorlopig **enkel als demo** (`test.html?deel=melodie&demo=1`, link onderaan de intro van `melodie.html`); zonder `demo=1` is aanmelden geblokkeerd.
   Reden: het Apps Script kent maar één test per ronde + e-mailadres, dus een echte melodietest zou botsen met de ritmetest. Om te koppelen moet het script een veld `deel` (ritme/melodie) meekrijgen en per deel apart controleren.
3. ✅ Testsysteem af en werkend: `test.html` + Google Apps Script `lets-make-rhythm-test.gs` (aanmelden met klas + schoolmail + testcode, test per niveau, resultaten in Google Sheet, leerling ziet score niet).
   Het script staat in de Google Sheet van de leerkracht en `API_URL` in `test.html` is ingevuld. Het .gs-bestand zit niet in deze map.
4. ✅ Hub-structuur af: `index.html` = voorpagina "Musical Encounters" met twee vensters → `ritme.html` en `melodie.html`.
5. ✅ Herbruikbaar pianoklavier af (2 octaven, C tot C''): `piano.js` + hulpmiddelpagina `piano.html` (zie "Pianoklavier" hieronder).
6. ⏳ Nog te doen:
   - Melodie-oefeningen verder uitbreiden (niveaus, kruisen/mollen/herstellingstekens).
   - Melodietest koppelen aan de Google Sheet (zie hierboven) en `TESTS_MEL` laten goedkeuren door de leerkracht.
   - Introtekst op `melodie.html` bijwerken: die zegt nog "Hier komen binnenkort oefeningen rond melodie".
   - "Tussenweg"-pagina: niveau-overzicht voor het ritme-onderdeel (op termijn per hoofdniveau, 6 niveaus = 2 per schooljaar).
   - Find the Bass uitbreiden naar meer niveaus.
   - Beluisterlimiet per niveau afhankelijk maken van de moeilijkheidsgraad.
   - Niveau invullen voor de overige klassen in tabblad Klassen (lage prioriteit).
   - Anonieme gebruiksteller (na de niveau-aanpassingen): bij elk afgewerkt niveau stuurt de oefening oefening + niveau + score + datum naar een tabblad "Gebruik" in de Google Sheet van de testen (zelfde Apps Script). Geen naam of mail, geen aanmelden. Overzicht in de Sheet: meest gebruikte oefeningen, per niveau, schooluren vs. thuis.
     Optioneel (nog te beslissen): leerling kiest één keer zijn klas (zonder naam), onthouden in localStorage, zodat je ook per klas ziet wie oefent. Doel: interesse/bijsturen van de site, niet voor punten.

## Bestanden (altijd samen in één map houden)
- `index.html` – hub "Musical Encounters": zeven deuren = de zeven bouwstenen uit de cursus, in de volgorde van de bundel (4 kolommen). Actief: Ritme (`ritme.html`), Melodie (`melodie.html`), Dynamiek (`dynamics.html`). Vorm is actief (`form.html`, groenblauwe accentkleur `--accent4` #0E8A7E / donker #4FD1C1). Tempo is actief (`tempo.html`, oranje `--accent5` #D97F06 / donker #F5B84F). Nog "binnenkort" (`div.door.soon`): Klankkleur (Let's Make Colours), Samenklank (Let's Make Harmony). Elke deur toont de bouwsteen in het Nederlands + de kernwoorden uit de bundel (bv. Kort – lang).
- Voorstellen voor 2 nieuwe oefeningen per bouwsteen staan in het Claude-document "Musical Encounters – oefenvoorstellen per bouwsteen" (nog te beoordelen door de leerkracht).
  Ritme gebruikt de blauwe accentkleur `--accent`, melodie de terracotta `--accent2` (#B5472C, donker #FF9B7A).
- `ritme.html` – overzicht "Let's Make Rhythm" (de vroegere voorpagina): balk "Test maken" (→ `test.html`, plus demolink) en 9 tegels (`<a class="tile">`):
  Hold That Note, Rhythm Sequence, Missing Beat, Follow the Score, Bar Line Hunter, Rhythm Builder, Find the Bass, Drum Detective, Beat Maker.
  Op dit moment geen lege tegels; de stijl `div.tile.soon` ("binnenkort") staat klaar in de CSS voor later. Terugknop `← Musical Encounters` naar `index.html`.
- `melodie.html` – overzicht "Let's Make Melodies": 7 tegels – **Piano** (hulpmiddel), **Mind the Gap**, **Melodiepuzzel**, **Melody Lines**, **Mission Impossible**, **Melody Builder**, **Sharp Ears**.
  Op dit moment geen lege tegels; de stijl `div.tile.soon` staat klaar in de CSS. Terugknop naar `index.html`.
- `piano.html` – hulpmiddelpagina met het pianoklavier. Terugknop naar `melodie.html`.
- `piano.js` – herbruikbare pianocomponent (enige gedeelde JS-file van de site).
- `melodiepuzzel.html` – Melodiepuzzel (melodisch dictee, 3 rondes): melodie uit 3 fragmenten van 4 noten, leerling tikt de fragmenten in de juiste volgorde. Per ronde meerdere oefeningen in `ROUNDS[i].sets` (ronde 1: 5, ronde 2: 4, ronde 3: 5); elke set = 3 fragmenten in de juiste melodievolgorde, knop "Nieuwe oefening" gaat naar de volgende set. Ronde 1 "Hoog of laag": laag/midden/hoog in wisselende volgorde. Pianoklank zoals piano.js; volledige melodie max. 3× beluisteren per ronde (`MAXPLAY`, reset bij "Opnieuw schudden"); fragmenten niet apart te beluisteren en lichten niet op tijdens het afspelen (bewust). Pianoklavier (piano.js) onderaan als hulpmiddel. Staat naast Mind the Gap op `melodie.html`. Terugknop naar `melodie.html`.
- `mission-impossible.html` – Mission Impossible: melodie van 4 kwartnoten (80 BPM, pianoklank), start altijd op A, daarna 3 willekeurige noten (nooit 2× dezelfde na elkaar). Niveaus in `LEVELS`: 1 = D E G A B C', 2 = + F, 3 = volledige toonladder C–C' (gekozen niveau in localStorage `mi-level`). Leerling tikt de 3 noten aan op notenknoppen; pianoklavier (piano.js) als hulpmiddel met bolletjes op de 6 mogelijke noten. Reeks van 10 verschillende opdrachten (`COUNT`), max. 3× beluisteren (`MAXPLAY`, na Controleer onbeperkt), na Controleer juiste melodie op notenbalk, daarna uitslag x/10. Nog geen testmodus.
- `melody-lines.html` – Melody Lines: 4 pianomelodieën (`MELODIES`: Boog, Golf, Stijgend, Dalend, elk met SVG-lijn `path` en `notes`) klinken na elkaar in willekeurige volgorde, snel (`GAP` .3 s per noot) en zonder pauze ertussen (`PAUSE`=0), zonder aanduiding welk stukje speelt. Leerling zet de 4 lijnkaartjes in de gehoorde volgorde (tikken: kaartje, dan vakje). Max. 3× beluisteren (`MAXPLAY`, na Controleer onbeperkt), knoppen Nieuwe volgorde / Toon oplossing. Niveaus in `LEVELS` (gekozen niveau in localStorage `ml-level`): niveau 1 = Boog, Golf, Stijgend, Dalend · niveau 2 = Dal, Sprong en dalen, Trap omhoog, Zigzag omhoog. Pianoklavier (piano.js) onderaan als hulpmiddel. Nog geen testmodus.
- `melody-builder.html` – Melody Builder: melodisch dictee naar het model van Rhythm Builder. Kwartnoten in 4/4, eerst 4 tikken aftellen, pianoklank. Eerste noot staat er al. Leerling tikt per tel op de notenbalk (lijn/tussenruimte; zelfde plek = wissen), noot klinkt bij plaatsen; enkel noten binnen het bereik van het niveau (`low`/`high`). Oefeningen in `LEVELS[n].exercises` als tekst, bv. `"C D E F | G F E D"` (C = C4, C' = C5; 1 maat = 4 noten). Niveau 1: 1 maat, enkel C D E, 70 BPM · 2: 2 maten C–G stapjes · 3: C–C' + tertsen · 4: grotere sprongen (80 BPM, optioneel `bpm` per niveau). Max. 5× beluisteren (`MAXPLAY`). Knoppen Speel mijn antwoord, Notennamen tonen, Toon oplossing. Pianoklavier met bolletjes op de noten van het niveau. Voortgang in localStorage `mb-done2`, niveau `mb-level`. Nog geen testmodus.
- `sharp-ears.html` – Sharp Ears (kruisen, mollen, herstellingstekens): 4 melodietjes van 6 kwartnoten per niveau op een vrije notenbalk (geen maatsoort, geen maatstrepen), C4–C5, 80 BPM, pianoklank. Twee knoppen: **Origineel** (onbeperkt) en **Mysterie-melodie** (max. 5× = `MAXPLAY`, na Controleer onbeperkt). Leerling tikt op de notenbalk de noot aan die het teken krijgt. Niveaus in `LEVELS` (gekozen niveau in localStorage `se-level`): 1 = kruis, 2 = mol, 3 = herstellingsteken (er staat al een kruis/mol op de balk via `given`, één latere noot met dezelfde naam klinkt weer gewoon). Oefening = `{notes:'G4 F4 G4 F4 G4 F4', pos:3}` (pos 0–5 = noot met het teken). Regel in de code (`pitches`): een teken geldt voor die noot en alle volgende noten met dezelfde naam; daarom moet het antwoord altijd de EERSTE noot zijn die anders klinkt. Eerste poging telt, daarna verbeteren of Toon oplossing; uitslag x/4 met de regel uitgelegd. Pianoklavier 1 octaaf, namen kruis/mol volgens het niveau. Nog geen testmodus.
- `dynamics.html` – overzicht "Let's Make Dynamics" (3de deur op `index.html`, paarse accentkleur `--accent3` #7A4BD0 / donker #B79BFF): tegel Whisper or Roar + lege tegel "Binnenkort meer".
- `whisper-or-roar.html` – Whisper or Roar (eerste dynamiek-oefening): zelfgeschreven pianostukjes van 4 maten (4/4) op twee balken (sol- en fasleutel). Leerling sleept of tikt de dynamiekkaartjes naar het vakje tussen de balken onder elke maat (elk teken mag meermaals). Niveaus in `LEVELS` (gekozen niveau in localStorage `vc-level`, afgewerkte stukjes in `vc-done`), elk 3 stukjes: niveau 1 = p, f, crescendo · 2 = + decrescendo · 3 = + pp, ff. Stukje = `{bpm, rh, lh, dyn}` (rh/lh als tekst per maat, bv. `'C4q E4q G4q E4q | …'`, akkoord `C3w+G3`, duur q/h/w; `dyn` = juiste teken per maat). Volume via een gain na de compressor (`LEVEL`: pp .07, p .2, f .6, ff 1) + luider = helderdere klank; crescendo/decrescendo lopen naar het teken van de volgende maat (`curve`). Max. 3× beluisteren (na Controleer onbeperkt), knop "Speel met mijn tekens", Controleer = enkel hoeveel juist, Toon oplossing, Volgende stukje. Nog geen testmodus.
- `tap-it-back.html` – Tap It Back (ritme naspelen): 1 maat aftellen → ritme (woodblock) → 1 maat aftellen → leerling tikt na op de grote knop of spatiebalk; metronoom tikt de hele tijd mee (tel 1 hoger). Tiktijd gecorrigeerd voor luidsprekervertraging (`getOutputTimestamp`). Beoordeling per noot: op tijd (±0,11 s of kleiner bij snelle noten) / iets te vroeg of te laat / gemist, plus extra tikken; daarna notenschrift met gekleurde noten + lijn "jij" met de tikken. Niveaus in `LEVELS` (localStorage `tib-level`): 1 kwart/halve/2 achtsten/kwartrust 72 BPM · 2 + halve rust, gepunteerde halve, 3/4 en 2/4 · 3 + gepunteerde kwart, losse achtste (76 BPM) · 4 + zestienden, syncope (66 BPM). Ritmes als tekst per maat in `pool` (tekens: w h dh q ee qr hr dq e1 er s4 es se, maatsoort vooraan bv. `'3/4 h q'`). Reeks van 5 willekeurige ritmes, eerste poging telt, "Nog eens proberen" onbeperkt, uitslag x/5. Schakelaar "Toon het ritme vooraf" (lezen + spelen, localStorage `tib-show`). Nog geen testmodus; niveau 5–6 (triolen, 6/8) nog te maken.
- `form.html` – overzicht "Let's Make Structure": tegels Form Finder, Hip-Hop Sandwich + lege tegel.
- `form-finder.html` – Form Finder (vorm lezen): partituur met één muzikale zin per regel (4 maten 4/4, C groot, eigen composities in `BANK`, 12 zinnen, allemaal eindigend op do). Leerling leest en kiest de vorm uit 4 meerkeuzeknoppen. Niveaus in `LEVELS` (localStorage `ff-level`): 1 = A en B (ABA, AABB, ABAB, ABBA, AABA, ABAA) · 2 = A, B en C (ABAC, ABCA, AABC, ABCB, ABACA, ABCBA, AABA, ABBA). Elke opdracht kiest willekeurig zinnen uit de bank. Eerst lezen: beluisteren (piano, 96 BPM, de zin die klinkt licht op) pas na de eerste controle. Na juist antwoord/oplossing kleuren de regels per letter (A rood, B groen, C blauw). Reeks van 6, eerste poging telt, uitslag x/6. Nog geen testmodus.
  Idee voor later: de Badinerie (Bach, vorm AABB) toevoegen, zelf uitgeschreven (niet de afbeelding uit het handboek Boost, auteursrecht).
- `hiphop-sandwich.html` – Hip-Hop Sandwich (makkelijke luisteroefening vorm ABA): zelfgemaakte hiphop-beat (88 BPM, a klein), alles met Web Audio (geen opnames). Deel A (8 maten): drums (kick/snare/hi-hat met swing), synthbas, lo-fi piano (Am7–Fmaj7–C–G), viool-melodie. Deel B (8 maten): nieuwe beat met handklappen en 16de hi-hats, lopende baslijn, piano-stabs (Dm7–G7–Cmaj7–E7), trompet-melodie. Daarna A exact terug + slotakkoord (~66 s). Muziek in objecten `A` en `B` (akkoorden, bas, melodie als [toon, tel, duur]); klanken in functies kick/snare/clap/hat/bass/piano/violin/trumpet. 3 meerkeuzevragen: vorm (ABA), melodie-instrument deel 1 (viool) en deel 2 (trompet). Tijdlijn met 3 delen licht op tijdens het afspelen; na juist/oplossing: letters A-B-A + instrumenten, en elk deel apart te beluisteren. Max. 3× beluisteren vóór de eerste controle. Nog geen testmodus.
- `tempo.html` – overzicht "Let's Make Tempo": tegels Keep Up! en Hold the Beat + lege tegel. (Tempo DJ is verwijderd: te saai.)
- `keep-up.html` – Keep Up! (tempo-spel): drumbeat (kick op elke tel, snare 2 en 4, hi-hats, bas) waarvan het tempo per tel verandert volgens `LEVELS[n].curve` ([tel, BPM]-punten, lineair). Leerling tikt op elke tel (knop/spatiebalk, tiktijd gecorrigeerd voor luidsprekervertraging); raak = figuurtje zet een stap + punten (vermenigvuldiger bij lange reeks); naast de tel tikken of een tel missen = struikelen, hartje kwijt (5 hartjes). Tempowoord (accelerando, ritardando, subito …) verschijnt live. Levels: 1 opwarmen 80 · 2 accelerando 80→124 · 3 ritardando 124→72 · 4 sneller én trager (zonder lampje) · 5 verrassing: plotse tempowissels. Sterren per level in localStorage `ku-best`.
- `hold-the-beat.html` – Hold the Beat (tempo vasthouden): metronoom tikt X tellen, valt stil, leerling tikt Y tellen alleen verder. Resultaat: score /100 (tempo-afwijking, onregelmatigheid, afdrijven), metronoomtempo → eigen tempo, sneller/trager, afwijking laatste tik, grafiek per tik (te vroeg/te laat). Niveaus: 1 = 8 tikken metronoom + 8 alleen (80–100 BPM) · 2 = 6 + 12 (trage en snelle tempo's) · 3 = 4 + 16. 5 rondes, gemiddelde + persoonlijk record per niveau (localStorage `htb-record-N`).
- `mind-the-gap.html` – Mind the Gap (eerste melodische oefening): 3 kaartjes met telkens 2 noten, leerling legt ze in de gehoorde volgorde.
- `rhythm-builder.html` – Rhythm Builder: ritmedictee, leerling sleept noten op de notenbalk.
- `drum-detective.html` – Drum Detective (luisteroefening op basis van Beat Maker): 4 delen van makkelijk naar moeilijk, elk met niveaus en een reeks van 5 opdrachten + uitslag. Deel 1 Kies de beat (3 rasters, 1 juist), deel 2 Zoek de fout (1/2/3 fouten aanduiden), deel 3 Vul aan (1 instrument invullen: baskick → snare → hi-hat), deel 4 Bouw na (niv. 1: hi-hat + snare staan er al, baskick bouwen → niv. 2: hi-hat staat er al, snare + baskick bouwen → niv. 3: alle drie → niv. 4: met 16den). Beats worden willekeurig gemaakt (`gen(d)`, d = 1–3, patronen in `HATS`, `KICKPOS`, `GHOST`). Aftellen 4 tikken, beat speelt 2×; max. 3× beluisteren (deel 4: 5×), na Controleer onbeperkt. Tempo per niveau in `TEMPO`. Laatste deel/niveau in localStorage `dd-pos`.
- `beat-maker.html` – Beat Maker (hulpmiddel, tegel op `ritme.html`): 1 maat 4/4, 16 blokjes (4 per tel, telwoorden 1 e + a), rijen hi-hat (boven), snare (midden), baskick (onder). Tikken = aan/uit, speelt in een lus, tempo 60–140 BPM, voorbeelden in `PRESETS` (x = aan, . = uit). Drumklanken met Web Audio (`SOUNDS`).
- `hold-that-note.html` – Hold That Note: melodie van 13 kwartnoten, leerling kruist aan welke noten anders klinken.
- `rhythm-sequence.html` – Rhythm Sequence: 4 stukjes van 1 maat (zelfde melodie do-sol-mi'-re'-do', 2 achtsten telkens op een andere tel).
- `missing-beat.html` – Missing Beat: één maat 4/4, één lege tel invullen (3 niveaus).
- `follow-the-score.html` – Follow the Score: melodie van 8/12/16 maten (per niveau), leerling duidt aan waar fragmenten stoppen (1, 2) en beginnen (3, 4).
- `find-the-bass.html` – Find the Bass (proefversie, enkel niveau 1): drum + bas + piano spelen 2 maten, leerling kiest welk van 3 genoteerde ritmes de bas speelt.
- `test.html` – Testpagina: aanmelden (klas + schoolmail + testcode van de klas), daarna alle onderdelen van het niveau van de klas na elkaar, indienen zonder score te tonen. `test.html?demo=1` = demoversie zonder Google Sheet.
- `bar-line-hunter.html` – Bar Line Hunter: melodie van 8 maten zonder maatstrepen, leerling zet de 7 maatstrepen (6 niveaus).
- Elke pagina is volledig zelfstandig: alle CSS en JavaScript staan inline, geen bibliotheken, geen build-stap.
  Uitzondering: pagina's met het pianoklavier laden `piano.js` (zelfde map).
  Enige externe bron: Google Fonts (Bricolage Grotesque + Figtree).

## Controleren en verbeteren (afspraak, sinds 29/09/2026)
- Na "Controleer" krijgt de leerling enkel te horen HOEVEEL juist is (bv. "2 van de 4 juist"), NIET welke: geen groen/rood per antwoord (anders te makkelijk).
- Alles blijft aanpasbaar; knop wordt "Controleer opnieuw" (pas actief na een wijziging). Groen verschijnt pas als alles juist is of bij "Toon oplossing".
- Na de eerste controle mag je onbeperkt opnieuw luisteren.
- Oefeningen met een reeks en uitslag (Mission Impossible x/10, Find the Bass x/5, Drum Detective x/5): alleen de eerste poging telt voor de score; daarna mag je verbeteren; knop "Toon oplossing" toegevoegd.
- Uitzondering Melody Builder (sinds 29/09/2026): na Controleer worden de juiste noten groen en liggen ze vast (niet meer aan te passen, ook niet met Wis); foute noten blijven neutraal (niet rood).
- Rhythm Builder: "x van y maten juist" + nog wel de melding als een maat niet vol is (tellen, geen luisteren).
- Eindoverzichten na een reeks (bv. Rhythm Sequence deel 1, uitslagen) tonen wel wat juist/fout was.
- Testmodus (test.html) ongewijzigd: één poging per vraag, geen feedback.
- Toegepast in alle oefeningen.

## Vormgeving (gebruik dezelfde stijl voor nieuwe oefeningen)
- Kleuren als CSS-variabelen op `:root` (licht) + donkere versie via `prefers-color-scheme` en `[data-theme="dark"]`.
  Belangrijkste: `--bg #EAEEF5`, `--surface #FFF`, `--ink #16203A`, `--accent #3257E0`, `--ok #1C8757`, `--bad #C43D2B`.
- Titels in Bricolage Grotesque (800), tekst in Figtree. Kaarten: `.panel` (wit, afgerond 18px, zachte schaduw).
- Elke ritme-oefening (en test.html) heeft bovenaan een link `← Let's Make Rhythm` naar `ritme.html`.
  Melodie-pagina's linken terug naar `melodie.html`.
- Noten worden als inline SVG getekend (notenbalk: lijnen 12px uit elkaar, noothoofd = gedraaide ellips).
  De solsleutel in hold-that-note.html is een SVG-pad (constante `GCLEF`).

## Geluid
- Geen audiobestanden: de browser maakt het geluid met de Web Audio API.
- `piano(t, duur, ...)` = pianoachtige toon (sinus-boventonen + envelope), `click()` = metronoomtik.
- Altijd eerst 1 maat aftellen (tikken), daarna het ritme. Geluid start pas na een klik (browserregel).

## Pianoklavier (piano.js + piano.html)
- Standaard twee octaven C4–C6 (15 witte, 10 zwarte toetsen; optie `octaves: 1` geeft één octaaf C4–C5).
  Namen: onderste octaaf C D E F G A B, hoogste octaaf met afkappingsteken C' D' E' … B', laatste toets C'' (functie `oct(m)`).
  Zwarte toetsen krijgen hetzelfde teken (C♯', D♭'). Het hoge octaaf heeft een licht warmere tint.
  Welk klavier waar: 2 octaven in Mind the Gap, Melody Lines en piano.html; 1 octaaf (`octaves:1`) in Melodiepuzzel, Mission Impossible, Melody Builder en Sharp Ears (hun noten liggen tussen C en C').
  Zwarte toetsen: `names` = `'sharp'` (C♯), `'flat'` (D♭) of `'both'` (C♯ boven, D♭ onder; standaard).
- Inbouwen in een pagina:
  ```html
  <div id="piano"></div>
  <script src="piano.js"></script>
  <script>
    const piano = MEPiano.mount(document.getElementById('piano'), {
      names: 'both',               // 'sharp' | 'flat' | 'both'
      low: 60,                     // laagste toets (MIDI), 60 = C4
      octaves: 2,                  // 1 of 2 (standaard 2)
      computerKeys: true,          // spelen met A W S E D F T G Y H U J K (onderste octaaf + C')
      onNote: (midi, label) => {}  // wordt opgeroepen bij elke aangeslagen toets
    });
    piano.setNames('flat');        // namen wisselen
    piano.play(64, .6);            // toets E4 zelf laten klinken (0,6 s) en oplichten
    piano.mark([60, 64, 67]);      // bolletje op toetsen (bv. hint); mark([]) wist
    piano.destroy();               // verwijderen
  </script>
  ```
- Geluid: eigen Web Audio-synth (sinus-boventonen, lichte inharmoniciteit, korte hamertik, natuurlijke uitsterving; loslaten = demping).
  Eigen AudioContext, los van de oefeningen.
- Bediening: tikken, meerdere vingers tegelijk, glijden over de toetsen, muis, Enter/Spatie op een toets met focus, computertoetsenbord.
  De CSS wordt één keer in de pagina gezet (`#me-piano-css`), alles onder `.me-piano`; formaat past zich aan de breedte aan (container query).
- `piano.html`: keuzeknoppen ♯ kruisen / ♭ mollen / beide (keuze onthouden in localStorage `me-piano-names`),
  vak "Je speelde" (bij een zwarte toets in modus beide: "C♯ = D♭ – Eén toets, twee namen."), tip koptelefoon + toetsenbordtip (enkel op computer).
- Mag later ook in de test gebruikt worden.

## Mind the Gap (mind-the-gap.html)
- Eerste melodische oefening, gebouwd op het model van Rhythm Sequence (deel 2): slepen/tikken van kaartjes in 3 vakjes, max 3× beluisteren (`MAXPLAY`), testmodus aanwezig.
- Drie kaartjes met elk 2 noten (sprongen in `state.jumps`; niveau 1–2: zelfde noot, kwint, octaaf). De 3 stukjes klinken in willekeurige volgorde met een pauze ertussen (`NOTE_DUR`, `NOTE_GAP`, `FRAG_GAP`).
- Niveaus in `LEVELS`: niveau 1 = altijd starten op C4; niveau 2 = elk kaartje start op een andere noot (3 verschillende uit C4, D4, E4, F4, G4); niveau 3 = andere startnoot + 3 sprongen gekozen uit zelfde noot/terts/kwint/octaaf (`pool`); niveau 4 = andere startnoot + 3 sprongen uit secunde/terts/kwart/kwint/sext/octaaf. Sprongen in `INTERVALS`, toonladdersprongen in C groot (`SCALE`, geen kruisen/mollen), F + kwart wordt vermeden. Enkel sprongen omhoog.
- Pianoklavier (piano.js) onderaan als hulpmiddel, ook in testmodus. Gekozen niveau in localStorage `mtg-level`. Nog niet opgenomen in `TESTS` van test.html.

## Rhythm Builder (rhythm-builder.html)
- Nootwaarden in object `TYPES` (code → duur in tellen, naam, rust ja/nee, `hits` voor groepjes zoals 2 achtsten/16den).
  Codes: W hele, DH gep. halve, H halve, DQ gep. kwart, Q kwart, E 2 achtsten, E1 achtste, S4 tiritiri, S816 ti-tiri,
  S168 tiri-ti, RW/RH/RQ/RE rusten.
- Niveaus in object `LEVELS` (1: basis + achtsten, 2: + rusten, 3: + gepunteerd, achtste noot/rust, 2/4 en 3/4,
  4: + zestienden, keuze 2 of 4 maten). Elke oefening is een string, bv. `'3/4 DH|Q Q Q'` (maten gescheiden door `|`).
- Nieuwe oefening toevoegen = een string toevoegen aan `LEVELS[n].exercises`. Elke maat moet exact vol zijn.
- Tempo standaard 80 BPM (60–110). Voortgang (vinkjes) in localStorage.
- Inloggen + punten zitten al in de code maar staan UIT: `LOGIN_ON=false`, `SCORE_URL=''`.
  (Dit oude puntensysteem wordt niet meer gebruikt: de oefenpagina werkt zonder punten; testen lopen via test.html.)

## Hold That Note (hold-that-note.html)
- Melodieën in array `MELODIES`: `notes` = 13 noten als tekst (`'C4 D4 E4 ...'`), `ops` = 4 opdrachten (A–D) met
  de posities (0–12) van de noten die veranderen.
- Opdracht A en B: 3 noten klinken 2 tellen (worden halve noten). Opdracht C en D: 4 noten dubbel zo snel (achtste noten).
  Zie functie `kind(op)`.
- Noten lichten tijdens het afspelen NIET op (bewust, anders te makkelijk). Tempo vast per niveau (zie hieronder).

## Rhythm Sequence (rhythm-sequence.html)
- Melodie in array `MEL` (5 noten); stukje k (0–3) heeft de twee achtste noten op tel k+1 (functie `events(k)`).
- Deel 1 Opwarmer: 4 rondes, telkens 1 stukje (willekeurige volgorde, elk stukje 1 keer), leerling kiest een kaartje. Pas na ronde 4 zien ze wat juist/fout was (overzicht).
- Deel 2 Oefening: de 4 stukjes na elkaar in willekeurige volgorde; leerling sleept/tikt kaartjes in 4 vakjes. Tempo vast per niveau (zie hieronder).

## Missing Beat (missing-beat.html)
- Hergebruikt `TYPES`/`glyph()`/geluid van Rhythm Builder. Extra 1-tel-types: `RE1` (achtste rust + achtste), `E1R` (achtste + achtste rust).
- Oefeningen in `LEVELS[n].exercises` als één maat, de lege tel tussen [ ], bv. `'DQ E1 [S816] Q'`. De lege tel is altijd precies 1 tel en valt op een tel.
- Niveau 1: makkelijk ritme + makkelijke tel; 2: moeilijk ritme + makkelijke tel (ook kwartrust); 3: moeilijk ritme + moeilijke tel (zestienden, rusten).

## Follow the Score (follow-the-score.html)
- Melodieën in array `MELODIES` (1 per niveau, 1 string per maat): toonhoogte + duur, bv. `'E4e F4e G4q C5q B4q'` (w/h/q/e), rust = `Rq`/`Rh`.
  Achtsten altijd per twee. `loadMelody(niveau)` zet `MELODY`/`NOTES` klaar; aantal maten moet een veelvoud van 4 zijn (4 maten per regel).
- Niveau 1: 8 maten, enkel fragment 1 en 2 (waar stopt het?) · 90 BPM. Niveau 2: 12 maten, fragment 1–4 · 110 BPM. Niveau 3: 16 maten, fragment 1–4 · 130 BPM.
  Welke nummers actief zijn: functie `active()`.
- Vakjes onder elke noot. Fragment 1 en 2 starten bij het begin en stoppen (2 verder dan 1); leerling zet 1/2 onder de laatste gehoorde noot.
  Fragment 3 en 4 beginnen midden in het stuk (altijd op een tel) en spelen tot het einde; leerling zet 3/4 onder de eerste gehoorde noot.
- Stop-/startpunten worden willekeurig gekozen (`makeTask()`), knop "Nieuwe opdracht" maakt nieuwe fragmenten. Max 3× per fragment.

## Bar Line Hunter (bar-line-hunter.html)
- Melodieën worden automatisch gemaakt (`makeMelody`): 8 maten uit maatpatronen `P[maatsoort][set]` + willekeurige, vooral stapsgewijze toonhoogtes, eindigt op do.
- Niveaus in `LEVELS`: 1 kwart/halve (4/4) · 2 + achtsten · 3 + rusten/gepunteerde halve · 4 ook 3/4 · 5 + gepunteerde kwart, ook 2/4 · 6 + zestienden.
- Noten op gelijke afstand (geen hint). Tikzones tussen elementen; eerste tel klinkt zwaarder (`acc` per niveau, minder in hogere niveaus); metronoom accentueert tel 1 enkel in niveau 1–3.

## Find the Bass (find-the-bass.html)
- Reeks van 5 opdrachten, daarna uitslag (x/5). Max 3× beluisteren per opdracht; na Controleer onbeperkt + knop "bas alleen".
- Ritmes: maatpatronen in `BARS` (W/H/Q/E = hele, halve, kwart, 2 achtsten). 3 keuzes die minstens 3 aanslagen verschillen (`diff`).
- Akkoorden in `CH`, progressies in `PROG`. Mix per instrument in `MIX` (niveau 1: bas ca. 4–5 dB luider dan drum en piano). Drum: kick 1+3, snare 2+4, hihat achtsten; piano halve noten.
- Volgende niveaus (nog te maken): bas zachter in de mix, drukkere piano/drum, keuzes die meer op elkaar lijken, rusten/gepunteerd/syncopen.

## Niveaus via tempo (Hold That Note, Rhythm Sequence)
- 3 niveaus die enkel verschillen in afspeeltempo (vast, geen schuifregelaar): constante `TEMPI`.
  Hold That Note 100/120/140 · Rhythm Sequence 80/100/120 BPM. (Follow the Score: zie hierboven, daar verschilt ook de lengte.) Gekozen niveau onthouden in localStorage.
- Nergens nog een tempo-schuifregelaar (bewust: anders te makkelijk). Vast tempo per niveau via `applyTempo()`:
  Rhythm Builder 80/80/75/70 · Missing Beat 80/75/70 · Bar Line Hunter 90/90/85/85/80/75 BPM.

## Beluisterlimiet
- Hold That Note, Rhythm Sequence en Missing Beat: elk fragment max. 3 keer beluisteren (constante `MAXPLAY`). Teller reset bij een nieuwe opdracht/ronde/volgorde.
- Idee voor later (nog niet gebouwd): beluisterlimiet per niveau – makkelijkste niveaus 3 keer, moeilijkere niveaus 5 keer.

## Wensen van de leerkracht (om rekening mee te houden)
- Alles in het Nederlands, eenvoudig voor 12–14-jarigen, werkt op laptop, Chromebook en tablet (slepen + tikken).
- Oefeningen draaien rond ritme, eventueel met melodie.
- Inloggen/punten pas toevoegen als de site af is.

## Plannen (nog niet gebouwd)
- **Indeling per niveau:** voorpagina toont niveaus; per niveau alle oefeningen op dat niveau (niveau 1 = niveau 1 van elke oefening, enz.).
  Op termijn **6 hoofdniveaus = 2 per schooljaar**. Oefeningen die niet passen op een niveau mogen daar ontbreken.
  Technisch idee: oefening openen met `?niveau=N` in de URL → dat niveau laden en de niveauknoppen verbergen.
- **Oefenpagina (zonder punten):** alle niveaus open (niet afgesloten), zodat leerlingen met muzikale voorkennis op hun eigen niveau kunnen oefenen.
  Na elk afgewerkt niveau meteen de uitslag tonen.
- **Melodische oefeningen:** een nieuwe reeks, ook in niveaus, met kruisen, mollen en herstellingstekens.
  Het pianoklavier (`piano.js`) is klaar en wordt in deze oefeningen als hulpmiddel ingebouwd; het mag ook tijdens de test gebruikt worden.
- **Find the Bass:** niveau 1 staat er als proef; hogere niveaus nog maken.
- Later: beluisterlimiet per niveau (3× makkelijk, 5× moeilijk).

## Testsysteem (test.html + lets-make-rhythm-test.gs)
- Inloggen gebeurt met schoolmail i.p.v. een leerlingenlijst met codes (eenvoudiger voor de leerkracht, geen lijst bijhouden).
- Oefenpagina (ritme.html / melodie.html + oefeningen) = vrij oefenen, alle niveaus open, geen punten, meteen feedback.
- Test = test.html. Backend = Google Apps Script `lets-make-rhythm-test.gs` in een Google Sheet van de leerkracht
  (tabbladen Klassen, Resultaten, Overzicht per klas, Testcodes, Per klas; menu "Let's Make Rhythm"). URL van de web-app in `API_URL` in test.html.
  Backend werkt volledig. Let op: deze spreadsheet gebruikt de komma als decimaalteken, dus formules hebben puntkomma's
  als scheidingsteken nodig (en `\` i.p.v. `,` tussen kolommen in matrix-formules zoals `{A1\B1}`).
- Aanmelden: klas + schoolmail (voornaam.achternaam@stludgardis.be, domein in constante `EMAIL_DOMAIN`) + testcode (4 letters,
  per klas, nieuw bij elke testronde). Geen leerlingenlijst meer nodig: voornaam/achternaam worden automatisch uit de mail gehaald.
  Uniek per testronde = combinatie ronde + e-mailadres (niet meer per code).
- Niveau van de test = niveau van de klas in tabblad Klassen (6 niveaus = 2 per schooljaar). 1 poging per e-mailadres per testronde;
  vrijgeven = rij in Resultaten verwijderen. Leerlingen zien hun score niet. Resultaten bevatten het e-mailadres, handig om manueel
  over te nemen in Smartschool.
- Samenstelling per niveau: constante `TESTS` in test.html (`ex` = oefening, `lvl` = niveau binnen die oefening, `n` = aantal vragen).
  Niveaus 4–6 zijn een voorlopig voorstel (nog geen extra niveaus in HTN/RS/FTS/FTB).
- Testmodus in elke oefening: URL `?test=1&lvl=N&n=M&o=K`. Code-blok "testmodus" bovenaan het script (TEST, testRecord, testCheck)
  + een blok onderaan per oefening. De oefening meldt resultaten aan test.html via `postMessage({lmr:'test',type:'progress'|'done',score,max})`.
  Bij herladen gaat de test verder waar hij was (localStorage `lmr-test-v1`); al beantwoorde vragen blijven tellen.
- Nieuwe oefening testklaar maken: kopieer het testmodus-blok, verberg oplossing/nieuwe-opdracht-knoppen in testmodus,
  en roep in de Controleer-knop `testRecord(juist, maximum)` op.

## Gepland: stap-of-sprong-oefening (nog niet gebouwd)
- Begint simpel: twee noten na elkaar, leerling kiest stap of sprong. Latere niveaus (voorstel): zelfde/stap/sprong, met richting, tertsen als kleine sprong, melodie van 4 noten.
- Titel nog te kiezen: Watch Your Step, Step or Leap?, One Small Step, Hop, Step & Jump.
