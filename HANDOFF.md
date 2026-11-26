# Discgolf PL – przekazanie do nowej rozmowy

Plik dla Claude'a w nowym oknie. Przeczytaj w całości przed pracą.

## Projekt
- Gra: polski 2D discgolf w przeglądarce (telefon), widok z góry.
- Repo: `tylkotak7/discgolf` (GitHub Pages: https://tylkotak7.github.io/discgolf/)
- Firebase: projekt `discgolf-8c7ad` (Firestore; z sandboxa niedostępny – testy na mocku).
- Cała gra to jeden plik `index.html` (~1,3 MB). Poprawki dopisywane są jako bloki
  `<script>/* PNNN: opis */ ... </script>` przed ostatnim `</body>`, z wzorcem
  `const _x=fn; fn=function(){...}` (hooki). Ostatni numer: **P203** (P203: miejska mini mapka Street; płotki `U.fences`/`U.gates` bez kolizji; ścieżka rowerowa = road z `bike:1` (OB, czerwona, rowerzyści, dymek `__say`) – drawDGPMap/karta). P202 (P202: Street – uderzenie w dom/latarnię/parasol/Neptuna → dymek mieszkańca zamiast ptaków; hak w treeFX przez build.py) (P201: Street – wypychanie dysku z budynków; Top 5 na Start ma WRC Street przez wpis w LS w build.py) (P200: naprawa kariery – stare C.div spoza DIVS, który ma teraz tylko 'Open').
- `3d/index.html` – osobny test 3D (czysty WebGL2, własne shadery), kafelek „ZŁOTÓW 3D BETA”.

## Zasady pracy (od użytkownika)
- Odpowiadaj po polsku, krótko i konkretnie.
- Zawsze `git pull` przed edycją (użytkownik pracuje w kilku oknach).
- Każde wypchnięcie: podbij wersję w `sw.js` (`discgolf-vN`) i w
  `<meta name="dgv" content="N · dd.mm.yyyy">`. Ostatnia: **v275**.
- „Co nowego” (`const CHG=[...]`): własne, krótkie zdania, bez procentów. Nie wpisuj tam
  rzeczy, o które użytkownik prosił, by ich nie ogłaszać (np. ukryty panel 6666, teksty NPC).
- Eksperymenty / duże zmiany grafiki → najpierw plik TESTOWY (np. `discgolf_TEST_x.html`)
  + screen przed/po; wypychamy dopiero po akceptacji. Drobne poprawki map – od razu.
- Zrzuty użytkownika: czerwone = dodaj drzewa, żółte = usuń, niebieskie = ścieżka.
- Weryfikacja: Playwright (Chromium jest w sandboxie), zrzuty 390×845.
- Commit kończy się linijkami Co-Authored-By / Claude-Session z przypomnienia systemowego.

## Kluczowe elementy kodu
- Świat W=360×H=560, `h.M` = metry/piksel, `KSf()`.
- Tło dołka: `build3(h,wn)` (raytraced heightfield, RS=2), cache `BGC`, `bgOf(h,wn)`,
  `ensureBG`. Jesień: `AUT3`. Woda rysowana w `water3(h,wn)` + P186 (kaustyka, piana, kręgi).
- Pola: `ZL` (Złotów 12), `Z22`, `MZ` (Międzybłocie), `window.LB` (Luboń, dane w bloku
  „const D=[...]”), `TRN`. Event `noc` = Złotów nocą (P183–P185).
- Kafelki pól: `CARDS`, `renderCards()`, miniatury `window.THB` (lato) + P192 (jesień/zima liczone).
- Dyski: `discs[0..2]`, sklep `LTD` (pola: v=zasięg, st=stabilność, t, p=cena, ev, led).
  Plecak: do 3 kupionych na rodzaj + dysk firmy (`__bag2`, P178). Fade zależy od `D.st`.
- Roller: `rollPlan` – do +10 m vs zwykły rzut.
- OB poza mapą: rzut z miejsca wylotu (P182).
- Ciemna plansza: strażnik pętli (P191), tryb zgodności `dg_cpu` (P188–P190), diagnostyka
  `__dgDiag()` w zgłoszeniach.
- Online: `window.__ONX`, pokoje w `pokoje`, wyniki `sc_<layout>`, auto-powrót do pokoju (P179).
- Ukryty panel: Opcje → kod **6666** (statystyki, zgłoszenia z kolekcji `bugi`).
- Archiwum rankingu: `ARCH_T = 17.11.2026` (Top 5 „nowy sezon”).

## Pola w Wągrowcu (v215, beta, kod **777**)
- P195: kałuże jesienią (woda, nie pod drzewami; w mieście brak kałuż).
- P196: **Street Wągrowiec** – silnik miejski w `build3_` (hook `h.urb`, elewacje SIDE 7–12, bruk, asfalt,
  parkingi `U.lots`, trawniki `U.grass`, kamienice `rowHouses`, `bRect`, auta `parkRow`). Ulica = OB (poza `noOB`),
  ściany odbijają (`_col` z flagą `w`), fontanna = woda. Dołki 1 Rynek, 2 Bydgoska → parking Biedronki, 3 Janowiecka (Łąkowa → Netto), 4 PKP nad torami → Makaronowy Raj, 5 Kościuszki → bar Latający Smok (+ paczkomat). Tory: `U.rails`, OB-strefy: `U.obp`, napisy: `U.labels`, auta zawsze w skali rynku (`U.cs=1/U.sc`), obrócony teepad `teeA`, schody `U.stairs`, podpisy budynków `lbl`.
  Mapowanie: współrzędne px ze zrzutu Google Maps → świat przez `mkP(K,X0,Y0)`. Dołki 6 Neptun/Club Wenus (jezioro `U.lake` → paski `h.rivers`), 7 Aquapark → rondo, 8 Leśniczówka, 9 Łakin (piramida `pyr`, kolumna `col`, pomnik `statue`). Tryb parkowy `U.park` (trawnik, `paths`, `dirt`, `courts`, las z bazowego wypełnienia + `noF`). Życie (live): przechodnie/rowery/auta z `U.roads`/`U.paths`/`U.walk`, pociąg na `U.rails[1]` (odbija dysk), kaczki `U.ducks`. Rynek: latarnie `U.lamps`, parasole `U.umb`, stragany `stall`; ulica na 1 nie jest OB. v222: OB w locie `U.flyOB` (nieużywane – na 2 zamiast tego budynki), ekran ładowania Street: tabliczka „WRC Wągrowiec” z własnym emblematem, `cleanRows` usuwa kamienice wchodzące na ulice/inne budynki, kolory dachów `rc`, myjnia `wash`, dystrybutory `pump`, wigwam `wig`, ognisko `U.fire`, pomosty `U.piers`, jezioro malowane z `U.lake` (rivers tylko do gry), pomnik Neptuna i kolejka do Pączkarni rysowane na żywo, piramida schodkowa.
- P197: **Orle Wągrowiec** – 13 dołków z discmap (WRC111), `OD=[...]` (len, par, punkty px, wm = szerokość w m,
  slope (używa wbudowanego h.slope .93/1.06 + slopeTxt), mound, bigTree, road, md = mando). Rundy beta nie liczą się do Top 5 / online.

## Zadania do zrobienia (stan 22.11.2026)
1. ✅ Kałuże jesienią – zrobione (P195, v215).
2. ✅ WRC Street (Wągrowiec) – 9 dołków, od v225 bez bety, ranking od v239 od nowa: layout 'wrc' (stary 'street' migrowany), lokalnie `dg_topwrc`, online `sc_wrc` (stare sc_street/dg_topsw nieużywane). Orle Wągrowiec – 13 dołków, UKRYTE w menu (kod w P197 zostaje), opis wyżej
   w „Pola w Wągrowcu”. Dalsze poprawki wg uwag użytkownika; gdy wyjdą z bety → własny Top 5 i ranking online.
3. **Grafika** – kierunek „malarski / złota godzina” (test: złote światło, chłodne cienie);
   rozważyć Three.js dla ładniejszej grafiki (w widoku z góry / 2.5D, nie pełne 3D).
   Test „złota godzina” istnieje jako plik testowy (nie w grze).
4. ✅ **Postać** – P198 (v227): nowy model `__draw2` dla menu i gry (gra przez `__draw2v` wpięte w P90 po translate), fryzury 0–8, `ss` styl koszulki, `num`, `eye`; mruganie, miny, chód, reakcje. Patche P90 w `p90patch.py` (sesja 22.11).
5. Pomysły odłożone: tygodniowe misje, Putting League, wskaźnik celności puttów,
   pojedynek z duchem znajomego, Liga Wągrowiec, sekcja „przerwane rundy” w panelu 6666,
   (✅ v228: pasek „Aktualizacja” przeniesiony nad dolne menu, mały avatar z nowego modelu, emblemat WRC na tabliczce Street – P199).


### P204 – grafika (v242)
W build3_ (g2patch.py, nakładany po p90patch): źdźbła trawy po h.urb (wykrycie trawy po kolorze, fairway jaśniejszy i krótko skoszony), chłodne cienie (poza TREEM), saturacja + split-toning przed tone-mappingiem, słabsza nakładka złotej godziny. Wyłącznik: window.__G2=false.

### v243–v244
- p204.js: granica 'za mocno' w koszu z tee +2%.
- g3patch.py (w build3_, wyłącznik window.__G3=false): pod koronami widać pień (brzoza biała) i zacienioną trawę zamiast pionowej ściany liści.
- p206.js + g4patch.py: lądowanie wg podłoża (window.__surf: trawa/śnieg/asfalt/ziemia), bez konfetti 'puff', plusk z kręgami, ślad sunięcia (d.gnd).
- Kolejność budowy: build.py (p195–p204, p206) → p90patch → g2patch → g3patch → g4patch, potem CHG + dgv + sw.js. Przed pushem zawsze test, czy strona się ładuje (smoke.py).

### v245
- g5patch.py (wyłącznik window.__G5=false): wyostrzenie tła (unsharp luma), mocniejsza i szersza wydeptana ścieżka (WRm), przetarta trawa przy koszu (2–9 m) i przed tee, maska trawy bg._gm.
- p207.js: fale wiatru na trawie (soft-light, kierunek/siła z wa/ws), bez zimy, wieczoru i pola noc. Tylko obraz – kolizje bez zmian.
- Kolejność: build.py (p195–p204, p206, p207) → p90 → g2 → g3 → g4 → g5.

### v246
- p208.js: okno pokoju (#onsh .rm2) – kod z Kopiuj/Wyślij (link ?pokoj=KOD dołącza automatycznie), 4 miejsca graczy, własny przycisk startu #onplay2 (oryginalny #onplay ukryty), ✕ w rogu. Znajomi (#onfr, #frs): avatar ze statusem, bilans z dg_ohist (w–l), w pokoju „Zaproś”, usuwanie po przytrzymaniu.
- Kolejność: build.py (p195–p204, p206–p208) → p90 → g2 → g3 → g4 → g5.

### v247
- g6patch.py: Luboń 5 (wpis /* 5 */ w P163) – droga (roads w:8), bez drzewa [205,300], kosz innego dołka (deco bkx 58,432), kłoda logArt, teepad oldTee(46,100) w stronę kosza, przerzedzony korytarz tamtego dołka (filtr h.trees + h.noF). Kolejność: … → g5 → g6.

### v248
- g7patch.py (P209): dyski kolegów online (LV w P132) – kolor wg kolejności w ON.peers, nick, smuga (window.__PTR). Kolejność: … → g6 → g7.

### v249
- p210.js: dźwięki otoczenia (window.__AMB: kos, zięba, rudzik, kukułka, dzięcioł, wrony, wróble, gołębie, kaczki, klakson, pociąg), sfx.bird zależny od miejsca/pory, zima: wrony/dzięcioł, Street: szum miasta + pociąg (window.__trainOn z p196). p206: przywrócony sfx.land przy lądowaniu.
- Kolejność: build.py (p195–p204, p206–p208, p210) → p90 → g2 → g3 → g4 → g5 → g6 → g7.

## ⚙️ Budowanie (od v249)
Źródła łatek są w repo: `tools/` (base_v214.html, patches/, build.py, release.py, test.py, README.md). Nowa wersja: `python3 tools/release.py NNN "Tytuł" "linia"…` – buduje, testuje i dopiero wtedy podmienia index.html. Nie edytuj index.html ręcznie, bo następne zbudowanie to nadpisze – zmiany rób w łatkach.

### v252
- p213.js: następny dołek budowany w tle (asynchroniczna kopia build3_ z przerwami co ~22 ms; wynik identyczny z build3 – sprawdza test.py krok 6). Start 2,5 s po wczytaniu dołka. ensureBG czeka na trwające budowanie tego samego dołka. Przejście na kolejny dołek ~0,15 s zamiast ~5 s.

### v253
- p213: budowanie następnego dołka startuje dopiero w hole() (po trafieniu, w czasie gratulacji), kawałki po ~45 ms – w trakcie gry brak spadku FPS (zgłoszenie po v252).

### v258
- p215: rewanż z akceptacją (ON.rv {t,s:want|no,by} wysyłane w stanie gracza – g11patch dopisuje rv do send()), okienko #onrv, start przez hosta gdy wszyscy ✅ i nikt ❌.
- g11patch: wolniejsze cienie chmur (live3).
- p216: opcja „Zapamiętuj mapy w telefonie” (dg_mapcache, domyślnie off) – IndexedDB dg_maps, webp .9 + _col/_fill/_sil (RLE), max 100 dołków, klucz wersja|pole|dołek|zima|pora|pogoda.
- p213: usunięte budowanie po trafieniu (zamulało animację ACE); zostaje __b3a i __prebuild.
