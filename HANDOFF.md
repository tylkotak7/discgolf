# Discgolf PL – przekazanie do nowej rozmowy

Plik dla Claude'a w nowym oknie. Przeczytaj w całości przed pracą.

## Projekt
- Gra: polski 2D discgolf w przeglądarce (telefon), widok z góry.
- Repo: `tylkotak7/discgolf` (GitHub Pages: https://tylkotak7.github.io/discgolf/)
- Firebase: projekt `discgolf-8c7ad` (Firestore; z sandboxa niedostępny – testy na mocku).
- Cała gra to jeden plik `index.html` (~1,3 MB). Poprawki dopisywane są jako bloki
  `<script>/* PNNN: opis */ ... </script>` przed ostatnim `</body>`, z wzorcem
  `const _x=fn; fn=function(){...}` (hooki). Ostatni numer: **P197**.
- `3d/index.html` – osobny test 3D (czysty WebGL2, własne shadery), kafelek „ZŁOTÓW 3D BETA”.

## Zasady pracy (od użytkownika)
- Odpowiadaj po polsku, krótko i konkretnie.
- Zawsze `git pull` przed edycją (użytkownik pracuje w kilku oknach).
- Każde wypchnięcie: podbij wersję w `sw.js` (`discgolf-vN`) i w
  `<meta name="dgv" content="N · dd.mm.yyyy">`. Ostatnia: **v221**.
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
  Mapowanie: współrzędne px ze zrzutu Google Maps → świat przez `mkP(K,X0,Y0)`. Dołki 6 Neptun/Club Wenus (jezioro `U.lake` → paski `h.rivers`), 7 Aquapark → rondo, 8 Leśniczówka, 9 Łakin (piramida `pyr`, kolumna `col`, pomnik `statue`). Tryb parkowy `U.park` (trawnik, `paths`, `dirt`, `courts`, las z bazowego wypełnienia + `noF`). Życie (live): przechodnie/rowery/auta z `U.roads`/`U.paths`/`U.walk`, pociąg na `U.rails[1]` (odbija dysk), kaczki `U.ducks`. Rynek: latarnie `U.lamps`, parasole `U.umb`, stragany `stall`; ulica na 1 nie jest OB.
- P197: **Orle Wągrowiec** – 13 dołków z discmap (WRC111), `OD=[...]` (len, par, punkty px, wm = szerokość w m,
  slope (używa wbudowanego h.slope .93/1.06 + slopeTxt), mound, bigTree, road, md = mando). Rundy beta nie liczą się do Top 5 / online.

## Zadania do zrobienia (stan 22.11.2026)
1. **Kałuże jesienią** – teraz wyglądają dziwnie; mają wyglądać jak woda (połysk, odbicie
   nieba, ciemniejszy brzeg, lekkie kręgi).
2. **Street Wągrowiec – 9 dołków gotowych (beta, kod 777)** – dalsze poprawki wg uwag użytkownika.
   Użytkownik prześle zrzuty z mapy; sprawdź też wygląd Wągrowca w internecie.
   1. Rynek – rzut po przekątnej rynku, kosz w rogu przy zejściu na Bydgoską.
      Przeszkody: zaparkowane samochody wokół rynku, fontanna (dysk może wpaść do wody).
   2. Z Bydgoskiej przy zejściu z rynku w dół na parking Biedronki – par 4.
   3. Start z Janowieckiej przy Shellu i Neeto, kosz na parkingu przy Kauflandzie.
   4. PKP – rzut przez tory z jednej strony na drugą, przy budynku dworca.
   5. Kościuszki – start na torach, kosz przy restauracji Smok po prawej, na parkingu – par 4.
   6. Nad jeziorem koło Neptuna.
   7. Przy aquaparku – kosz na rondzie.
   8. Leśniczówka – z parkingu do wiaty – par 4.
   9. Z parkingu na Łakinie koło piramidy.
3. **Grafika** – kierunek „malarski / złota godzina” (test: złote światło, chłodne cienie);
   rozważyć Three.js dla ładniejszej grafiki (w widoku z góry / 2.5D, nie pełne 3D).
   Test „złota godzina” istnieje jako plik testowy (nie w grze).
4. **Postać** – lepszy model postaci + wybór kolorów i koszulek w menu (zakładka Postać).
5. Pomysły odłożone: tygodniowe misje, Putting League, wskaźnik celności puttów,
   pojedynek z duchem znajomego, Liga Wągrowiec, sekcja „przerwane rundy” w panelu 6666,
   pasek „Aktualizacja · N nowości” zasłania logo w menu (do przesunięcia).
