# Akquise- und Korrespondenz-Unterlagen im Website-CI

Hier liegen die Druckunterlagen für die Kita-Akquise und die E-Mail-Vorlagen. Sie nutzen dieselben Farben,
Schriften und Bausteine wie die Website, sind aber eigenständige HTML-Dateien –
ohne Next.js, ohne Build. Öffnen, anschauen, als PDF speichern.

| Datei | Was drin ist | Seiten |
|---|---|---|
| `akquise-mappe.html` | Die Mappe für die Kita-Leitung: Titel, Vorstellung, Ablauf, Nutzen, Kosten, Preise, Datenschutz, Portfolio (2 Seiten mit QR-Code), Kontakt | 8 |
| `elternbrief-und-faq.html` | Vorlage für den Elternbrief (die Kita verschickt ihn) plus FAQ-Handout für Eltern | 3 |
| `email-vorlagen.html` | 14 E-Mail-Vorlagen für Kitas und Eltern, mit Kopieren-Knopf je Vorlage | – |
| `email-vorlagen.md` | Quelltext der E-Mail-Vorlagen, hier werden die Texte bearbeitet | – |
| `email-vorlagen-html.mjs` | Baut aus der `.md` die `.html` | – |
| `ci.css` | Gemeinsames Stylesheet mit den Design-Tokens der Website | – |
| `bilder/` | Verkleinerte Fotos, Logos und der QR-Code für den Druck | – |
| `pdf/` | Die fertigen PDFs zum Verschicken (werden erzeugt, nicht in Git) | – |

## Anschauen

Die Dateien brauchen einen kleinen lokalen Server, weil sie Bilder und das
Stylesheet nachladen. Ein Doppelklick im Finder reicht nicht.

```bash
python3 -m http.server 4500 -d docs/akquise
```

Dann http://localhost:4500/akquise-mappe.html im Browser öffnen.
In Claude Code gibt es dafür die Launch-Konfiguration `akquise`.

## E-Mail-Vorlagen ändern

Die Texte stehen in `email-vorlagen.md`, die HTML-Datei wird daraus erzeugt. Nach jeder
Textänderung im Projektordner einmal:

```bash
node docs/akquise/email-vorlagen-html.mjs
```

Dann http://localhost:4500/email-vorlagen.html öffnen. Jede Vorlage hat einen
Kopieren-Knopf, der den Text in die Zwischenablage legt.

## PDF erzeugen

Der einfache Weg, ein Befehl für beide Dokumente:

```bash
./scripts/akquise-pdf.sh
```

Das legt `pdf/akquise-mappe.pdf` und `pdf/elternbrief-und-faq.pdf` an: A4, randlos,
mit allen Farbflächen und Fotos. Dafür wird Google Chrome im Hintergrund gestartet,
ohne dass ein Fenster aufgeht und ohne das eigene Chrome-Profil anzufassen. Nach jeder
Textänderung am HTML den Befehl erneut laufen lassen.

Die PDFs liegen bewusst **nicht in Git**: Sie entstehen jedes Mal neu aus dem HTML und
wären als mehrere Megabyte große Dateien nur Ballast in der Versionsverwaltung. Das HTML
ist die Quelle, das PDF das Ergebnis.

**Von Hand geht es auch:** Datei im Browser öffnen, **Drucken** (Strg/Cmd + P), Ziel
**Als PDF sichern**, Papierformat **A4**, Ränder **keine**, **Hintergrundgrafiken**
aktivieren. Der Hinweiskasten oben auf der Seite wird nicht mitgedruckt.

## QR-Code

`bilder/qr-galerie.svg` zeigt auf die Online-Galerie
(`https://marius-jakob-202.fotograf.de/login`). Wenn die Adresse sich ändert, neu erzeugen:

```bash
python3 scripts/make-qr.py "https://neue-adresse.de" docs/akquise/bilder/qr-galerie.svg
```

Das Skript `scripts/make-qr.py` erzeugt den Code selbst, damit das Projekt dafür kein
zusätzliches Paket braucht. Es nutzt Fehlerkorrektur-Stufe Q: Der Code bleibt lesbar,
auch wenn etwa ein Viertel davon verschmutzt oder verknickt ist. Nach einer Änderung
den neuen Code einmal mit dem Handy scannen.

## Was noch fehlt

Im Quelltext als `TODO Marius` markiert:

- Prüfen, ob das erweiterte Führungszeugnis schon vorliegt oder nur beantragt ist
- Google-Bewertungslink (`https://g.page/r/…`) für die E-Mail-Vorlagen 4 und 7
- Anmeldelink bzw. QR-Code von Fotograf.de für E-Mail-Vorlage 8
- Feste Laufzeit der Galerien festlegen (E-Mail-Vorlagen 5 und 6)

## Ansprache

- **Mappe**: „Sie“ – sie geht an die Kita-Leitung, oft beim Erstkontakt.
- **Hinweis an das Kita-Team** im Elternbrief: „ihr“, wie auf der Website.
- **Elternbrief**: „Sie“ – den Brief verschickt die Kita an ihre Eltern, nicht Marius.
- **FAQ-Handout**: „du“, weil Marius direkt zu den Eltern spricht, wie im FAQ der Website.
- **E-Mail-Vorlagen**: „Sie“ an Kita-Leitungen und Elternbeiräte (erster geschäftlicher
  Kontakt), „du“ an Eltern.

## Änderungen

Inhalte, die es auch auf der Website gibt (Ablauf, Preise, FAQ, Kontaktdaten), stehen
in `src/content/` und `src/config/site.ts`. Wenn sich dort etwas ändert, muss es hier
von Hand nachgezogen werden – die Dateien teilen keinen Code mit der Website, nur das
Design. Die alten Unterlagen im anderen CI liegen weiterhin unter `prototype/akquise/`.
