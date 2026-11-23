# Narzędzia budowania Discgolf PL

`index.html` powstaje z **`base_v214.html`** (stan gry z 22.11.2026 rano) + łatek z `patches/`.

## Nowa wersja
```
python3 tools/release.py 250 "Tytuł" "🔧 linia Co nowego" "🎯 druga linia"
git add -A && git commit -m "v250: …" && git push
```
`release.py` buduje grę, dopisuje wpis „Co nowego” (stare wpisy przenosi z obecnego `index.html`), ustawia wersję (`meta dgv`, `sw.js`, HANDOFF) i **uruchamia test**. Gdy test nie przejdzie, `index.html` zostaje bez zmian.
Poprawka bez wpisu: `python3 tools/release.py 250 --no-chg`.

## Sam test
`python3 tools/test.py index.html` – start bez błędów JS, każde pole i dołek się ładuje, tło lato/zima na każdym polu, fizyka rzutu (wzorzec 403 j.), okno pokoju online. Wymaga Playwright + Chromium.

## Kolejność łatek
1. `build.py` – wstawki w `build3_` + łatki JS: p195–p204, p206–p208, p210, p212, p213 (lista w `release.py`, `JS=[…]`).
2. Łatki Pythona na gotowym pliku: p90patch → g2 → g3 → g4 → g5 → g6 → g7 → g8 (`PY=[…]`).
Nowa łatka = nowy plik w `patches/` + dopisanie do listy w `release.py`.
