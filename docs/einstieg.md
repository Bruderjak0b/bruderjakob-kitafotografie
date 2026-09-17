# Einstieg ins Projekt: Bruderjakob Kitafotografie

> Stand: 17.09.2026. Dieses Dokument hat zwei Teile:
> **Teil A** ist für dich als Mensch: was das Projekt ist, wie du es startest und wie du mit Claude Code daran arbeitest.
> **Teil B** ist für deinen AI-Agent (Claude Code): technische Regeln, Fallstricke und offene Aufgaben.
>
> Tipp: Sag Claude Code zu Beginn einer Sitzung einfach: *„Lies zuerst `docs/einstieg.md`.“*

---

## Teil A – Für dich

### Worum geht's?

Das ist die neue Website für Bruderjakob Kitafotografie. Sie wurde auf Basis eines Prototyps aus Claude Design gebaut. Fertig ist bisher die **Startseite**. Header, Footer, Farben, Schriften und Grundbausteine sind so angelegt, dass die weiteren Seiten (Über mich, Ablauf, Preise, Kontakt, Impressum, Datenschutz) darauf aufbauen können.

Die Technik in einfachen Worten:

| Begriff | Was es ist |
|---|---|
| **Next.js** | Das Framework, mit dem die Website gebaut ist. Jede Seite ist eine Datei unter `src/app/`. |
| **React / TSX** | Die Seiten bestehen aus „Komponenten“, also wiederverwendbaren Bausteinen wie Button, Header oder FAQ. Das sind die `.tsx`-Dateien. |
| **Tailwind CSS** | Das Styling passiert direkt über Klassen im Code, z. B. `text-terracotta-600` oder `py-20`. |
| **shadcn/ui** | Eine Sammlung fertiger UI-Bausteine, die in `src/components/ui/` liegen und an unsere Marke angepasst sind. |
| **pnpm** | Das Werkzeug, das Pakete installiert und Befehle startet. |
| **Git / GitHub** | Die Versionsverwaltung. Jede Änderung ist nachvollziehbar und kann rückgängig gemacht werden. |

### Einmalige Einrichtung

1. **Node.js** installieren (Version 24 oder neuer): https://nodejs.org
2. **pnpm** aktivieren: im Terminal `corepack enable` ausführen.
3. Repository klonen und Pakete installieren:
   ```bash
   git clone https://github.com/KoTTi97/bruderjakob-kitafotografie.git
   cd bruderjakob-kitafotografie
   pnpm install
   ```
4. **Den Prototyp-Ordner besorgen:** Der Ordner `prototype/` ist absichtlich *nicht* im Git. Er enthält die Entwürfe aus Claude Design, Screenshots aller geplanten Seiten und die Original-Fotos. Lass ihn dir separat schicken und leg ihn als `prototype/` in den Projektordner. Er ist die wichtigste Vorlage für die noch fehlenden Seiten.

### Website lokal starten

```bash
pnpm dev
```

Danach im Browser http://localhost:3000 öffnen. Änderungen am Code erscheinen automatisch, ohne Neuladen.

Weitere Befehle:

```bash
pnpm lint
```
prüft den Code auf Fehler und Formatierung.

```bash
pnpm build
```
baut die Website so, wie sie später live geht. Wenn das ohne Fehler durchläuft, ist alles in Ordnung.

### So arbeitest du gut mit Claude Code

- **Beschreibe das Ziel, nicht den Code.** Zum Beispiel: *„Baue die Seite /ablauf nach dem Screenshot `prototype/uploads/Ablauf.png`. Nutze die vorhandenen Bausteine.“*
- **Kleine Schritte.** Lieber eine Seite oder einen Abschnitt pro Auftrag als alles auf einmal.
- **Lass dir Pläne zeigen.** Bei größeren Sachen: *„Mach erst einen Plan, bevor du Code schreibst.“*
- **Selbst anschauen.** Prüfe das Ergebnis im Browser, auch auf dem Handy (oder mit schmalem Browserfenster). Claude kann auch selbst Screenshots machen, wenn du danach fragst.
- **Vor dem Speichern prüfen lassen:** *„Führe lint und build aus und prüfe, ob alles funktioniert.“*
- **Git nutzen:** Arbeite auf dem Branch `development`. `main` ist für den fertigen Stand. Lass Claude Commits erstellen (*„Committe das mit einer passenden Nachricht“*). So kannst du jederzeit zurück.
- **Bei Unsicherheit fragen:** *„Erklär mir, was du geändert hast und warum.“* Das ist ausdrücklich erwünscht.

### Wo ändere ich was? (Kurzübersicht)

| Ich möchte… | Datei |
|---|---|
| Texte der Startseite ändern | `src/components/home/<abschnitt>-section.tsx` |
| FAQ-Fragen ändern oder ergänzen | `src/content/faq.ts` |
| Kundenstimmen ändern | `src/content/testimonials.ts` |
| Menüpunkte, E-Mail-Adresse oder externe Links ändern | `src/config/site.ts` |
| Ein Foto austauschen | Datei in `src/assets/images/` ersetzen (gleicher Name) oder neu ablegen und im Abschnitt importieren |
| Farben oder Schriftgrößen global ändern | `src/app/globals.css` |
| Header oder Footer ändern | `src/components/layout/site-header.tsx` / `site-footer.tsx` |

**Fotos:** Bitte keine Kamera-Originale (5–12 MB) ins Projekt legen. Vorher auf ca. 2400px Breite verkleinern. Den Rest optimiert die Website automatisch.

### Offene Punkte vor dem Livegang

- [ ] **Kundenstimmen sind erfunden** (Platzhalter aus dem Prototyp) → durch echte ersetzen oder den Abschnitt entfernen.
- [ ] FAQ „Was kosten die Fotos?“ enthält noch **„X €“ und „Y €“**.
- [ ] Links zu **Bruderimfokus** und zum **Onlineshop** fehlen (stehen auf `#` in `src/config/site.ts`).
- [ ] Unterseiten fehlen noch: `/ueber-mich`, `/ablauf`, `/preise`, `/kontakt`, `/impressum`, `/datenschutz`.
- [ ] Kontaktformular auf `/kontakt` inkl. E-Mail-Versand (Anbieter muss noch gewählt werden).
- [ ] Ein eigenes Favicon, falls gewünscht (aktuell das Faultier).

---

## Teil B – Für den AI-Agent

### Pflichtlektüre

1. `AGENTS.md`: **Next.js 16** (APIs können von deinem Trainingswissen abweichen) und die **verbindlichen Projektregeln** inkl. Definition of Done.
2. `prototype/` (lokal, gitignored): Designvorlage.
   - `Kitafotografie Standalone.dc.html`: Startseite (Referenz für den umgesetzten Stand)
   - `ablauf.dc.html`, `preise.dc.html`, `kontakt.dc.html`, `ueber-mich.dc.html`: Unterseiten
   - `uploads/*.png`: Screenshots der Seiten (1440px breit)
   - `_ds/*/readme.md`: Design-System inkl. Tonalität und Content-Regeln (**unbedingt lesen**)
   - Die Prototyp-Dateien sind inline-gestylte HTML-Mockups mit festem 1440px-Layout. Übernimm Inhalt und Anmutung, **nicht** das Markup. Zum Ansehen: `python3 -m http.server 4400 -d prototype`, dann die `.dc.html` im Browser öffnen (Konfiguration „prototype“ in `.claude/launch.json`).

### Stack

- Next.js 16.3 (App Router, Turbopack, React Compiler aktiv), React 19.2, TypeScript strict
- Tailwind CSS v4 (CSS-first, keine `tailwind.config`), `tw-animate-css`
- shadcn/ui (Style `radix-nova`, Radix-Primitives, lucide-Icons), `components.json`
- Biome für Lint und Format (kein ESLint/Prettier)
- pnpm 11. `pnpm-workspace.yaml` → `allowBuilds: sharp: false`
- Import-Alias: `~/*` → `src/*`

### Verzeichnisstruktur

```
src/
  app/                 Routen (layout.tsx = Header/Main/Footer, page.tsx = Startseite), globals.css, icon.svg
  assets/brand/        logo.svg, faultier.svg
  assets/images/       Fotos (statisch importiert → next/image mit Blur-Placeholder)
  components/
    ui/                shadcn-Komponenten (button, sheet) – an die Marke angepasst
    layout/            site-header, site-footer, mobile-nav, nav-link, logo, container, section (Section, SectionHeader, Eyebrow)
    home/              ein File pro Startseiten-Abschnitt
    faq/faq-list.tsx   FAQ (native <details>) + FAQPage-JSON-LD
    seo/json-ld.tsx    generischer, XSS-sicherer JSON-LD-Renderer
  config/site.ts       siteConfig, mainNav, contactNavItem, legalNav
  content/             Daten, die seitenübergreifend genutzt werden (faq, testimonials)
  lib/utils.ts         cn()
```

Konvention für neue Seiten: `src/app/<route>/page.tsx` setzt die Abschnitte aus `src/components/<route>/` zusammen. Jede Seite exportiert `metadata` mit `title` (das Template `%s | Bruderjakob Kitafotografie` sitzt im Root-Layout). Seitenübergreifende Inhalte gehören nach `src/content/`.

### Design-Tokens (`src/app/globals.css`)

- **Farben:** nur zwei Paletten: `ink-{100,200,500,600,700,800,900}` und `terracotta-{100…800}`. Keine neuen Farbtöne einführen.
- **Semantische Farben für shadcn:** `primary` = terracotta-500, `muted-foreground` = ink-700 (ink-600 ist auf Weiß nicht AA-konform), `border` = ink-200, `secondary`/`accent` = terracotta-100.
- **Typo:** `font-heading` (Libre Franklin) für Überschriften, `font-sans` (Work Sans) für Text. Größen `text-h1`/`text-h2`/`text-h3`/`text-label` sind Desktopwerte, mobil kleiner, z. B. `text-3xl lg:text-h2`.
- **Layout:** `<Section tone="default|warm">` liefert den vertikalen Rhythmus (`py-20 lg:py-section`). `<Container size="default|narrow|prose">` liefert Breite und Seitenabstand.
- **Radien:** `rounded-sm` (4px) für Controls, `rounded-2xl` (16px) für Karten und Bilder. **Schatten:** `shadow-card`.
- **Button-Varianten:** `default`, `outline`, `secondary`, `ghost`, `link`. Größen: `default`, `lg`, `sm`, `icon`, `icon-sm`. Links immer über `<Button asChild><Link/></Button>`.
- **Brand-Regeln aus dem Design-System:** kein Dark Mode, keine Verläufe als Deko (Ausnahme: Overlay im Hero-Bild), kein Blur/Glassmorphism, keine Emojis, dezente Hover-Effekte (150ms Farbwechsel), keine Bounce- oder Scale-Animationen.

### Content- und Ton-Regeln

- Deutsch, **„du/ihr“**, Ich-Perspektive des Fotografen (Einzelunternehmer, kein „wir“).
- Ruhig und konkret: beschreiben, was passiert, statt mit Adjektiven zu verkaufen. Keine Superlative.
- Keine erfundenen Fakten, Preise, Kundenstimmen oder Adressen. Fehlende Infos als `// TODO` markieren und beim Menschen nachfragen.

### Fallstricke (bereits einmal passiert)

1. **shadcn-CLI und `~`-Alias:** Beim `init` hat das CLI `import { cn } from "cn"` generiert und das fremde npm-Paket `cn` installiert. Nach jedem `pnpm dlx shadcn@latest add …` prüfen:
   - Imports auf `~/lib/utils` umstellen
   - sicherstellen, dass kein Paket `cn` in `package.json` landet
   - danach `pnpm exec biome check --write` (sortiert Imports)
   - neue Komponenten an die Brand-Tokens anpassen: shadcn-Defaults sind `rounded-lg`/`text-sm`, Overlays mit Blur
2. **SEO-relevante, aufklappbare Inhalte:** Radix Accordion/Collapsible rendern geschlossene Inhalte **nicht** ins Server-HTML. Die FAQ nutzt deshalb bewusst `<details name="…">`. Diese Anforderung kommt ausdrücklich vom Auftraggeber: Frage und vollständige Antwort müssen im initialen HTML stehen. Nicht auf Radix zurückbauen. FAQ auf anderen Seiten mit `<FaqList items={…} />` einbinden (bringt JSON-LD mit). **Nur einmal pro Seite** einbinden, sonst doppelte FAQPage-Daten.
3. **next/image in Next 16** (verbindliche Bildregeln stehen in `AGENTS.md`): `priority` ist deprecated. Für das LCP-Bild `loading="eager" fetchPriority="high"` nutzen. `sizes` bei `fill`-Bildern immer setzen. Statische Imports bevorzugen (liefern Maße und Blur-Placeholder).
4. **Ungültiges HTML vermeiden:** z. B. kein `<div>` direkt in `<ol>`/`<ul>`.
5. **Rich Results:** Google zeigt FAQ-Rich-Results seit 2023 kaum noch für normale Websites an. Das Markup bleibt trotzdem sinnvoll. Dem Menschen keine sichtbaren FAQ-Snippets bei Google versprechen. Weitere sinnvolle Schemas später: `LocalBusiness`/`ProfessionalService` (braucht echte Adresse und Einzugsgebiet, beim Menschen erfragen).
6. **Dev-Server:** Läuft ggf. schon, vorher Port 3000 prüfen. Der Auftraggeber startet ihn gern in tmux (`tmux new-session -d -s bruderjakob-dev 'pnpm dev'`).

### Workflow für jede Änderung

Die verbindlichen Regeln (Next.js/React, SEO, Barrierefreiheit, Code, Bilder, Git) und die **Definition of Done** stehen in `AGENTS.md`. Kurz:

1. Relevante Next-Docs in `node_modules/next/dist/docs/` lesen, falls Next-APIs betroffen sind.
2. Mit vorhandenen Bausteinen und Tokens umsetzen.
3. Checks, Browser-Prüfung und ggf. Bild- und `curl`-Check laut Definition of Done.
4. Dem Menschen verständlich erklären, was geändert wurde. Er hat wenig Coding-Erfahrung.

### Nächste sinnvolle Aufgaben

1. Unterseiten nach Prototyp bauen, in dieser Reihenfolge: `/ablauf` (hat eigene FAQ, dann FAQ ggf. von der Startseite entfernen oder aufteilen, um doppelten Inhalt zu vermeiden), `/preise`, `/ueber-mich`, `/kontakt`.
2. `/kontakt` mit Formular: shadcn `input`, `textarea`, `label` hinzufügen (Fallstrick 1 beachten), Server Action. Den E-Mail-Versanddienst mit dem Menschen abstimmen, keine Attrappe bauen.
3. `/impressum` und `/datenschutz`: Inhalte muss der Mensch liefern, **keine Rechtstexte erfinden**.
4. SEO-Basics: `metadataBase` (sobald die Domain feststeht), `sitemap.ts`, `robots.ts`, Open-Graph-Bild.
5. Offene TODOs aus Teil A abarbeiten, sobald die Infos vorliegen (`grep -rn TODO src`).

### Empfohlene Skills

Rufe bei passender Aufgabe das Skill-Tool mit diesen Skills auf, sofern sie in der Umgebung installiert sind:

- **`run`**: App starten und Änderungen im echten Browser verifizieren.
- **`code-review`**: vor einem Commit oder PR die Änderungen auf Fehler prüfen.
- **`simplify`**: nach größeren Umsetzungen Code aufräumen und vereinfachen.
- **`design:ux-copy`**: Texte, Button-Beschriftungen und Fehlermeldungen (z. B. im Kontaktformular) formulieren.
- **`design:accessibility-review`**: neue Seiten auf Barrierefreiheit prüfen (Kontraste, Tastatur, Screenreader).
- **`design:design-critique`**: Feedback zu Layout und Hierarchie neuer Seiten im Vergleich zum Prototyp.
- **`mattpocock-skills:grilling`**: wenn eine Anforderung unklar ist, gezielt nachfragen, bevor gebaut wird.
