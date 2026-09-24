# Bilder für die E-Mail-Signatur

Diese Dateien werden unverändert unter
`https://www.bruderjakob-kitafotografie.de/signatur/…` ausgeliefert und von der
E-Mail-Signatur verlinkt (siehe `docs/akquise/signatur.html`).

Sie liegen bewusst in `public/` statt in `src/assets/`: Mailprogramme brauchen eine
feste, unveränderliche URL. Die Bildoptimierung von Next.js erzeugt wechselnde
Adressen und ist hier deshalb nicht brauchbar.

**Diese Dateien nicht umbenennen und nicht löschen.** Jede bereits verschickte Mail
lädt das Bild von genau dieser Adresse, auch Monate später. Wenn sich das Logo
ändert, die Datei am selben Pfad ersetzen.

Quellen: `docs/akquise/bilder/logo-signatur.png` und `portrait-signatur.jpg`.
