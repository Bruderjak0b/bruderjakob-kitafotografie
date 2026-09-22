# Einstieg ins Projekt: Bruderjakob Kitafotografie

> Stand: 22.09.2026. Dieses Dokument hat zwei Teile:
> **Teil A** ist für dich als Mensch: was das Projekt ist, wie du es startest und wie du mit Claude Code daran arbeitest.
> **Teil B** ist für deinen AI-Agent (Claude Code): technische Regeln, Fallstricke und offene Aufgaben.
>
> Tipp: Sag Claude Code zu Beginn einer Sitzung einfach: *„Lies zuerst `docs/einstieg.md`.“*

---

## Teil A – Für dich

### Worum geht's?

Das ist die neue Website für Bruderjakob Kitafotografie. Sie wurde auf Basis eines Prototyps aus Claude Design gebaut. **Alle Seiten stehen**: Startseite, Über mich, Ablauf, Preise, Kontakt (mit Formular), Impressum und Datenschutz. Was vor dem Livegang noch fehlt, steht weiter unten unter „Offene Punkte vor dem Livegang“.

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

Das Projekt nutzt **nvm** (Node Version Manager). nvm installiert genau die Node-Version, die in der Datei `.nvmrc` steht, und schaltet pro Projekt darauf um. So musst du dir die Version nie merken. Mit einer falschen Node- oder pnpm-Version bricht `pnpm install` mit einer Fehlermeldung ab.

1. **nvm installieren** (macOS/Linux). Im Terminal:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.7/install.sh | bash
   ```
   Danach das Terminal **schließen und neu öffnen**. Prüfen mit `nvm --version`.
   Unter Windows gibt es stattdessen [nvm-windows](https://github.com/coreybutler/nvm-windows). Es liest `.nvmrc` nicht automatisch, dort die Version aus `.nvmrc` von Hand angeben (`nvm install 24`, `nvm use 24`).
2. **Repository klonen:**
   ```bash
   git clone https://github.com/KoTTi97/bruderjakob-kitafotografie.git
   cd bruderjakob-kitafotografie
   git checkout development
   ```
3. **Node installieren und aktivieren.** Im Projektordner:
   ```bash
   nvm install
   ```
   nvm liest `.nvmrc`, installiert die passende Version und aktiviert sie. Prüfen mit `node -v`, die Ausgabe muss zur Zahl in `.nvmrc` passen.
   Damit neue Terminals direkt diese Version nutzen: `nvm alias default` ausführen, dann ist sie die Standardversion.
4. **pnpm 10 installieren** (gehört zur gerade aktiven Node-Version, deshalb erst nach Schritt 3):
   ```bash
   npm install -g pnpm@10
   ```
   Prüfen mit `pnpm -v`, die Ausgabe muss mit `10` beginnen.
5. **Pakete installieren:**
   ```bash
   pnpm install
   ```
6. **Den Prototyp-Ordner besorgen:** Der Ordner `prototype/` ist absichtlich *nicht* im Git. Er enthält die Entwürfe aus Claude Design, Screenshots aller geplanten Seiten und die Original-Fotos. Lass ihn dir separat schicken und leg ihn als `prototype/` in den Projektordner. Er ist die Vorlage, an der sich die gebauten Seiten orientieren.

### Website lokal starten

```bash
nvm use
pnpm dev
```

`nvm use` stellt sicher, dass die richtige Node-Version aktiv ist (nötig in jedem neuen Terminal, außer du hast sie mit `nvm alias default` als Standard gesetzt). Danach im Browser http://localhost:3000 öffnen. Änderungen am Code erscheinen automatisch, ohne Neuladen.

Weitere Befehle:

```bash
pnpm format
```
formatiert den Code automatisch.

```bash
pnpm check
```
prüft Formatierung, Code-Regeln und Typen, ohne die Website zu bauen. Schnell, gut für zwischendurch.

```bash
pnpm build
```
macht dieselben Prüfungen und baut danach die Website so, wie sie später live geht. **Genau das passiert auch bei Vercel.** Läuft es bei dir durch, klappt auch das Deployment.

### E-Mails testen mit Mailpit

Das Kontaktformular verschickt echte E-Mails über SMTP. Damit beim Ausprobieren niemand Post bekommt, läuft lokal **Mailpit**: ein kleiner Mailserver, der jede Nachricht annimmt, aber **nichts nach außen schickt**. Stattdessen sammelt er alles und zeigt es in einem Postfach im Browser.

Einmalig installiert (schon erledigt):

```bash
brew install mailpit
```

Starten, sodass er auch nach einem Neustart des Macs wieder läuft:

```bash
brew services start mailpit
```

Danach:

- **Postfach ansehen:** http://localhost:8025 im Browser öffnen. Jede über das Formular verschickte Nachricht taucht dort sofort auf, mit Absender, Empfänger, Betreff und Text.
- **Stoppen:** `brew services stop mailpit`
- **Läuft er?** `brew services list` zeigt den Status.

Wenn du das Formular auf http://localhost:3000/kontakt absendest und in Mailpit nichts ankommt, läuft Mailpit vermutlich nicht.

### E-Mail-Einstellungen (`.env.local`)

Die Zugangsdaten für den Mailversand stehen in `.env.local`. Diese Datei ist **nicht im Git** und darf es auch nie sein.

| Variable | Lokal (Mailpit) | Später live |
|---|---|---|
| `SMTP_HOST` | `localhost` | Mailserver deines Anbieters |
| `SMTP_PORT` | `1025` | meist `587` |
| `SMTP_SECURE` | `false` | `false` bei Port 587, `true` bei Port 465 |
| `SMTP_USER` | leer | Benutzername des Postfachs |
| `SMTP_PASSWORD` | leer | Passwort des Postfachs |
| `MAIL_FROM` | beliebig | Absenderadresse, muss zu deiner Domain gehören |
| `MAIL_TO` | beliebig | Adresse, an die die Anfragen gehen sollen |

Für den Livebetrieb müssen dieselben Variablen bei **Vercel** unter *Settings → Environment Variables* eingetragen werden, sonst kann die Live-Website keine Mails verschicken. Das ist bereits erledigt, für Production und Preview.

### Veröffentlichen mit Vercel

Die Website wird bei Vercel gehostet. Vercel ist direkt mit dem GitHub-Repo verknüpft, es gibt keine eigenen Deploy-Skripte.

- **Push auf `main`** → Vercel baut und veröffentlicht die Live-Website. `main` ist der **Production Branch** und ändert sich nur über Releases und Hotfixes (Git Flow).
- **Push auf jeden anderen Branch** (z. B. `development`, `kotti`) → Vercel baut eine **Vorschau** mit eigener Adresse. Die Adresse steht im Vercel-Dashboard und bei GitHub am Commit. Vorschauen sperrt `src/app/robots.ts` für Google, damit sie nicht im Index landen.
- **Schlägt der Build fehl** (Formatierung, Code-Regeln, Typfehler oder Build-Fehler), wird nichts veröffentlicht. Die Live-Website bleibt auf dem letzten funktionierenden Stand. Die Fehlermeldung steht im Vercel-Dashboard unter dem Deployment. Gib sie Claude Code zum Beheben.

**Alternative ohne Vercel:** Die Website lässt sich auch als reine HTML/CSS/JS-Dateien bei einem normalen Webhoster betreiben. Das ist getestet, aber nicht umgesetzt, weil es Umbauten braucht und ein Kontaktformular dann einen externen Dienst benötigt. Details: [statischer-export.md](statischer-export.md).

### So arbeitest du gut mit Claude Code

- **Beschreibe das Ziel, nicht den Code.** Zum Beispiel: *„Baue die Seite /ablauf nach dem Screenshot `prototype/uploads/Ablauf.png`. Nutze die vorhandenen Bausteine.“*
- **Kleine Schritte.** Lieber eine Seite oder einen Abschnitt pro Auftrag als alles auf einmal.
- **Lass dir Pläne zeigen.** Bei größeren Sachen: *„Mach erst einen Plan, bevor du Code schreibst.“*
- **Selbst anschauen.** Prüfe das Ergebnis im Browser, auch auf dem Handy (oder mit schmalem Browserfenster). Claude kann auch selbst Screenshots machen, wenn du danach fragst.
- **Vor dem Speichern prüfen lassen:** *„Führe lint und build aus und prüfe, ob alles funktioniert.“*
- **Git nutzen:** Das Repo folgt dem Modell **Git Flow**. Claude Code hält sich automatisch daran, du musst dir die Details nicht merken. So sieht es aus:
  - `main`: die **Live-Website**. Alles, was hier landet, veröffentlicht Vercel sofort. Hier wird nie direkt gearbeitet.
  - `development`: der Sammelstand für das nächste Update der Website.
  - `feature/…`: für jede neue Aufgabe legt Claude automatisch einen eigenen Branch an, z. B. `feature/seite-ablauf`. Ist die Aufgabe fertig, wird sie nach `development` übernommen.
  - `release/…`: wenn du sagst *„Veröffentliche den aktuellen Stand“*, bereitet Claude ein Release vor (z. B. `release/1.1.0`), prüft den Build, übernimmt es nach `main` und markiert die Version.
  - `hotfix/…`: für dringende Fehler auf der Live-Website, direkt ausgehend von `main`.

  Was du sagen kannst: *„Committe das“*, *„Übernimm das Feature nach development“*, *„Veröffentliche den aktuellen Stand“*, *„Auf der Live-Seite ist ein Fehler, mach einen Hotfix“*. Commits, Merges und Veröffentlichungen passieren **nur, wenn du darum bittest**. So kannst du jederzeit zurück.
  - `kotti`: der **Design-Vorschlag** deines Kollegen (feinere Abschnitte, Sticky-Header, breiteres Layout). Am 19.09.2026 nach `development` übernommen, sein Stand ist jetzt der normale Stand der Website. Der Branch bleibt als Nachweis liegen, es wird nicht mehr darauf gearbeitet.
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

**Noch offen:**

- [ ] **Kundenstimmen sind erfunden** (Platzhalter aus dem Prototyp). Der Abschnitt ist auf der Startseite auskommentiert, Texte und Code liegen weiter in `src/content/testimonials.ts` und `src/components/home/testimonials-section.tsx`. Entweder echte Stimmen einsetzen und wieder einblenden oder beides löschen.
- [ ] **Vercel-Plan prüfen:** Der Hobby-Plan ist auf nicht-kommerzielle Nutzung beschränkt, eine Geschäfts-Website braucht **Pro**. Davon hängt auch der AV-Vertrag (AVV) für die Datenschutzerklärung ab.
- [ ] **Vercel-Projekt fertig einrichten:**
  1. Unter *Settings → Environments → Production* den **Production Branch auf `main`** stellen (Vercel nimmt sonst `development`, weil das der Standard-Branch auf GitHub ist).
  2. Unter *Settings → Build and Deployment* prüfen, dass **Node.js 24.x** eingestellt ist (wird aus `package.json` übernommen).
  3. ~~Domain verbinden~~ — erledigt: `bruderjakob-kitafotografie.de` und `www.…` sind dem Projekt zugeordnet, die A-Einträge zeigen auf Vercel, die Nameserver bleiben bei IONOS. **Die Nameserver nicht auf Vercel umstellen**, sonst gehen die MX-Einträge und damit der E-Mail-Empfang verloren. Die Domain zeigt bis zum ersten Release nach `main` einen 404, weil es noch kein Production-Deployment gibt.
- [ ] **Nach dem Livegang:** Website in der [Google Search Console](https://search.google.com/search-console) anmelden und dort `https://bruderjakob-kitafotografie.de/sitemap.xml` einreichen. Im Google-Business-Eintrag (Kategorie „Fotograf“, in Verifizierung) die Website-Adresse eintragen.

**Erledigt:**

- [x] Unterseiten `/impressum` und `/datenschutz` sind gebaut (Texte aus dem e-recht24-Generator).
- [x] Datenschutz-Häkchen im Kontaktformular verlinkt auf `/datenschutz` (öffnet in neuem Tab, damit das Formular erhalten bleibt).
- [x] Links zu **Bruderimfokus** (Instagram) und zum **Onlineshop** (fotograf.de) sind in `src/config/site.ts` eingetragen.
- [x] SMTP-Zugangsdaten bei Vercel hinterlegt, für Production und Preview. **Am 22.09.2026 auf einer Vorschau-Adresse echt getestet, die Mail kam an.** Lokal läuft der Versand weiter gegen Mailpit.
- [x] Die Nummer im Impressum ist geklärt: Marius rechnet nach der **Kleinunternehmerregelung** ab und hat keine USt-IdNr. `DE446262979` ist eine **Wirtschafts-Identifikationsnummer**, die Überschrift im Impressum stimmt so. Im Code heißt das Feld `siteConfig.businessId`.
- [x] SEO-Grundausstattung: Domain in `siteConfig.url`, `metadataBase`, Canonical-URLs, `sitemap.ts`, `robots.ts` (sperrt Vorschau-Deployments aus), Open-Graph-Bild und LocalBusiness-Markup passend zum Google-Business-Eintrag.

---

## Teil B – Für den AI-Agent

### Aufbau der Startseite (Stand nach dem kotti-Design)

Der Design-Vorschlag von `kotti` ist am 19.09.2026 nach `development` übernommen worden und damit der verbindliche Stand. Neue Seiten folgen diesen Mustern:

- **Header** (`site-header.tsx`, `nav-link.tsx`): sticky, Logo links, Navigation und Kontakt-Button rechts, 64/80px hoch. Aktiver Menüpunkt mit Terracotta-Unterstrich. Anker-Ziele haben deshalb `scroll-margin-top: 6rem` in `globals.css`.
- **Layout** (`container.tsx`): Container 1408/1280/896px, Seitenabstand `px-4 sm:px-8 lg:px-12`.
- **Abschnittstöne** (`section.tsx`): `default` (Weiß), `subtle` (Creme `ink-100`), `warm` (`terracotta-100`). Töne benachbarter Abschnitte abwechseln.
- **Typografie** (`globals.css`): Überschriften mit `tracking-tight`, Absätze mit `text-pretty`, Fließtext in Abschnitten meist `text-lg`.
- **Hero:** Eyebrow „Kitafotografie“ und Subline, 720px hoch, Bild mit `sizes="(min-width: 1080px) 100vw, 1080px"`.
- **Abschnitte:** Portrait mit versetztem Kreis, Versprechen mit Häkchen und Schatten, Ablauf mit Terracotta-Linie, Stimmen-Karten mit Schatten, dunkle Kontakt-Karte, Dienstleistungen mit Eyebrow und größerer Galerie.

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
- Node-Version über **nvm**: `.nvmrc` ist die einzige Quelle für die lokale Version.
- Node 24 und pnpm 10, erzwungen über `engines` in `package.json` plus `engineStrict: true` in `pnpm-workspace.yaml`. `.nvmrc` für nvm, `packageManager` pinnt die genaue pnpm-Version. Build-Skripte von `sharp` und `unrs-resolver` sind per `ignoredBuiltDependencies` abgeschaltet.
- Deployment: Vercel mit Git-Integration, keine GitHub Actions, kein `vercel.json`. Vercel nutzt seine Standardbefehle.
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
- **Layout:** `<Section tone="default|subtle|warm">` liefert Hintergrund (Weiß, Creme `ink-100`, Warm `terracotta-100`) und vertikalen Rhythmus (`py-20 lg:py-section`). Töne benachbarter Abschnitte abwechseln. `<Container size="default|narrow|prose">` liefert Breite (1408/1280/896px) und Seitenabstand (`px-4 sm:px-8 lg:px-12`).
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
7. **Vercel und pnpm-Version:** Vercel unterstützt automatisch nur pnpm bis Version 10. Darum bleibt das Projekt bewusst auf pnpm 10. **Nicht auf pnpm 11 upgraden**, solange Vercel es nicht nativ unterstützt, sonst scheitert das Deployment an `engines.pnpm`. pnpm-11-Einstellungen wie `allowBuilds` funktionieren in pnpm 10 nicht, stattdessen `onlyBuiltDependencies`/`ignoredBuiltDependencies` nutzen. Beim Wechsel der pnpm-Version `engines.pnpm` und `packageManager` gemeinsam ändern.
8. **`tsc` im frischen Klon:** Ohne `next typegen` fehlen die Typen für Bild- und SVG-Importe (`next-env.d.ts` ist gitignored). Darum `pnpm typecheck`/`pnpm check` statt nacktem `tsc --noEmit`.
9. **Statischer Export:** `output: "export"` allein baut grün, aber alle Fotos fehlen danach beim Hoster. Nicht ungefragt auf Export umstellen. Vorgehen und Einschränkungen stehen in `docs/statischer-export.md`.

### Workflow für jede Änderung

Die verbindlichen Regeln (Next.js/React, SEO, Barrierefreiheit, Code, Bilder, Git) und die **Definition of Done** stehen in `AGENTS.md`. Kurz:

1. Relevante Next-Docs in `node_modules/next/dist/docs/` lesen, falls Next-APIs betroffen sind.
2. Mit vorhandenen Bausteinen und Tokens umsetzen.
3. Checks, Browser-Prüfung und ggf. Bild- und `curl`-Check laut Definition of Done.
4. Dem Menschen verständlich erklären, was geändert wurde. Er hat wenig Coding-Erfahrung.

### Nächste sinnvolle Aufgaben

Alle Seiten und die SEO-Basics stehen. Was bleibt:

1. Offene Punkte aus Teil A abarbeiten, sobald die Infos vorliegen (`grep -rn TODO src`). Der größte ist der auskommentierte Stimmen-Abschnitt auf der Startseite.
2. Erstes Release `1.0.0` vorbereiten, sobald der Mensch den Livegang freigibt: Version in `package.json`, `release/1.0.0` → `main`, Tag `v1.0.0`, Rückmerge nach `development`.
3. Beim Anlegen neuer öffentlicher Seiten: Eintrag in `src/app/sitemap.ts` und `alternates.canonical` in der `metadata` nicht vergessen.

**Strukturierte Daten, die es schon gibt:** `FAQPage` (über `<FaqList>`, nur einmal pro Seite einbinden) und `ProfessionalService` (`src/components/seo/local-business.tsx`, einmal im Root-Layout). Beide nur mit Angaben füllen, die auch sichtbar auf der Seite stehen.

### Empfohlene Skills

Rufe bei passender Aufgabe das Skill-Tool mit diesen Skills auf, sofern sie in der Umgebung installiert sind:

- **`run`**: App starten und Änderungen im echten Browser verifizieren.
- **`code-review`**: vor einem Commit oder PR die Änderungen auf Fehler prüfen.
- **`simplify`**: nach größeren Umsetzungen Code aufräumen und vereinfachen.
- **`design:ux-copy`**: Texte, Button-Beschriftungen und Fehlermeldungen (z. B. im Kontaktformular) formulieren.
- **`design:accessibility-review`**: neue Seiten auf Barrierefreiheit prüfen (Kontraste, Tastatur, Screenreader).
- **`design:design-critique`**: Feedback zu Layout und Hierarchie neuer Seiten im Vergleich zum Prototyp.
- **`mattpocock-skills:grilling`**: wenn eine Anforderung unklar ist, gezielt nachfragen, bevor gebaut wird.
