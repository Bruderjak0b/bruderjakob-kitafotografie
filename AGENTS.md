<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projektregeln

Verbindliche Regeln für jede Änderung. Hintergründe, Stack, Design-Tokens und bekannte Fallstricke stehen in `docs/einstieg.md` (Teil B). Next-Doku liegt unter `node_modules/next/dist/docs/01-app/`.

## Umgebung (Node, nvm, pnpm)

- **Node-Version kommt ausschließlich über nvm aus `.nvmrc`.** Vor dem ersten Node-/pnpm-Befehl einer Sitzung `node -v` mit `.nvmrc` vergleichen. Passt die Hauptversion nicht, zuerst `nvm use` ausführen (bzw. `nvm install`, falls sie fehlt). In nicht-interaktiven Shells, in denen `nvm` nicht gefunden wird: `source "$HOME/.nvm/nvm.sh" && nvm use`.
- **Nie Node global über Homebrew o. ä. installieren oder die Version „passend machen“**, indem `engines` gelockert wird.
- **pnpm 10** (`packageManager` in `package.json`). Nie `npm install`/`yarn` für Projektabhängigkeiten. Nicht auf pnpm 11 upgraden (siehe Fallstricke in `docs/einstieg.md`).
- **Node-Upgrade** nur in einem eigenen Commit und nur, wenn Vercel die neue Hauptversion für Builds und Functions offiziell unterstützt (https://vercel.com/docs/functions/runtimes/node-js/node-js-versions). Immer gemeinsam ändern: `.nvmrc`, `engines.node` in `package.json`, Versionsangaben in `README.md` und `docs/einstieg.md`. Danach `nvm install`, `pnpm install`, `pnpm build`.

## Next.js und React

- **Server Components sind Standard.** `"use client"` nur für kleine interaktive Blätter (Vorbild: `nav-link.tsx`, `mobile-nav.tsx`), nie für ganze Abschnitte, Seiten oder Layouts. Interaktive Teile herauslösen, statt die Grenze nach oben zu ziehen. Doku: `01-getting-started/05-server-and-client-components.md`.
- **Keine Inhalte erst im Browser laden.** Kein Datenholen per `useEffect`/`fetch` im Client. Alles, was Besucher oder Google lesen sollen, muss im initialen Server-HTML stehen. Das gilt auch für aufklappbare Inhalte (siehe FAQ mit `<details>`).
- **Kein `useMemo`/`useCallback`/`React.memo` auf Verdacht.** Der React Compiler ist aktiv und übernimmt das.
- **Links:** interne Seiten und Anker mit `next/link`. Externe URLs und `mailto:`/`tel:` mit `<a>`. Externe Links, die in einem neuen Tab öffnen, bekommen `target="_blank" rel="noopener noreferrer"`.
- **Schriften nur über `next/font`** (siehe `src/app/layout.tsx`). Keine `<link>`-Einbindung von Google Fonts, keine weiteren Schriftfamilien.
- **Formulare mit Server Actions**, Eingaben immer auf dem Server validieren. Doku: `01-getting-started/07-mutating-data.md`.
- **Geheimnisse** (API-Keys, SMTP-Zugänge) nur in `.env.local` bzw. Umgebungsvariablen **ohne** `NEXT_PUBLIC_`-Präfix. Niemals committen.
- **Neue npm-Pakete nur nach Rückfrage beim Menschen.** Immer `pnpm`, nie `npm`/`yarn`.

## SEO

- **Jede Seite exportiert `metadata`** mit eigenem `title` (ohne Markenname, das Template ergänzt ihn) und eigener `description` (ca. 120–160 Zeichen, konkret, keine Superlative). Sobald `metadataBase` gesetzt ist, zusätzlich `alternates: { canonical: "/<route>" }`. Doku: `03-api-reference/04-functions/generate-metadata.md`.
- **Genau eine `<h1>` pro Seite.** Überschriften-Ebenen nicht überspringen (`h2` → `h3`, nicht `h2` → `h4`). Für optische Größe Klassen nutzen, nicht die Ebene ändern.
- **Semantisches HTML:** `<section>`, `<article>`, `<nav aria-label>`, Listen als `<ul>`/`<ol>`, Zitate als `<figure>`/`<blockquote>`. Keine Klick-`<div>`s.
- **Neue Route → Sitemap.** Sobald `src/app/sitemap.ts` existiert, jede neue öffentliche Seite dort eintragen. Impressum und Datenschutz bleiben indexierbar. Doku: `03-api-reference/03-file-conventions/01-metadata/sitemap.md`.
- **Strukturierte Daten** nur über `~/components/seo/json-ld` und nur mit echten, sichtbaren Angaben. Nichts auszeichnen, was nicht auf der Seite steht. Keine erfundenen Adressen, Öffnungszeiten oder Bewertungen.
- **Open-Graph-Bilder** über die Datei-Konvention `opengraph-image` (Doku: `03-api-reference/03-file-conventions/01-metadata/opengraph-image.md`), sobald die Domain feststeht.
- **Prüfen:** `curl -s http://localhost:3000/<route>` muss Überschriften, Fließtext und JSON-LD enthalten.

## Barrierefreiheit

- **Alt-Texte** auf Deutsch und beschreibend („Mädchen lacht auf einer Rutsche im Kita-Garten“, nicht „Bild1“ oder „Foto“). Rein dekorative Bilder: `alt=""`.
- **Icons** (lucide) bekommen `aria-hidden`. Icon-only-Buttons brauchen einen Text für Screenreader (`<span className="sr-only">`).
- **Fokus sichtbar lassen.** Kein `outline-none` ohne `focus-visible:`-Ersatz. Alles muss per Tastatur bedienbar sein.
- **Kontrast:** Text auf Weiß/Creme mindestens `ink-700` bzw. `terracotta-600`. `ink-600` und heller nur für Deko oder auf dunklem Grund.
- **Formularfelder** immer mit sichtbarem `<label>`, Fehlermeldungen per `aria-describedby` verknüpfen.

## Code und Styling

- **Nur Design-Tokens aus `src/app/globals.css`.** Keine Hex-/RGB-Werte oder beliebigen Farben in Klassen (`text-[#c5602f]` ist verboten). Beliebige Werte für Abstände/Größen nur, wenn die Tailwind-Skala nicht passt.
- **Vorhandene Bausteine zuerst:** `Section`, `SectionHeader`, `Eyebrow`, `Container`, `Button`. Neue wiederverwendbare Bausteine nach `src/components/`, nicht in eine Seite kopieren.
- **Klassen zusammenführen mit `cn()`** aus `~/lib/utils`, wenn Komponenten `className` annehmen.
- **Inhalte, die mehrfach vorkommen** (FAQ, Stimmen, Preise, Kontaktdaten, Links), gehören nach `src/content/` bzw. `src/config/site.ts`, nicht hartkodiert in Komponenten.
- **Imports über den Alias `~/`**, keine tiefen relativen Pfade (`../../..`).
- **TypeScript strict:** kein `any`, kein `@ts-ignore`. Biome-Ausnahmen (`biome-ignore`) nur mit Begründung im Kommentar.
- **Code-Kommentare und Bezeichner auf Englisch**, sichtbare Texte auf Deutsch.

## Definition of Done

Eine Änderung ist erst fertig, wenn alles davon erfüllt ist:

1. `pnpm exec biome check --write` ausgeführt, danach läuft `pnpm build` fehlerfrei. Der Build prüft Formatierung, Lint und Typen genau wie das Vercel-Deployment. Die Skripte in `package.json` nicht abschwächen, um einen Build grün zu bekommen. Fehler beheben.
2. Im Browser auf **1440px und 375px** geprüft: kein horizontales Scrollen, interaktive Teile angeklickt, keine Konsolenfehler.
3. Bei neuen oder geänderten Bildern: Bild-Check (siehe unten).
4. Bei neuen Seiten oder Inhalten: `curl`-Check (siehe SEO).
5. Dem Menschen in einfachen Worten erklärt, was geändert wurde.

## Git

- Auf `development` oder einem Branch davon arbeiten, **nie direkt auf `main`** (Livestand).
- `kotti` ist ein Design-Vorschlag. Nicht ungefragt mergen oder cherry-picken, der Mensch entscheidet.
- Commit-Nachrichten auf Deutsch, im Imperativ, erste Zeile unter ca. 70 Zeichen („Kontaktformular mit Server Action ergänzen“).
- Nur committen oder pushen, wenn der Mensch darum bittet. Kein Force-Push ohne ausdrückliche Zustimmung.

## Bilder

### Immer `next/image`

- Fotos und Grafiken **immer** über `import Image from "next/image"` einbinden. Kein `<img>`, keine CSS-`background-image` für Inhaltsbilder.
- Lokale Bilder statisch importieren (`import foo from "~/assets/images/foo.jpg"`). Das liefert Breite, Höhe und `placeholder="blur"` automatisch.
- Ausnahme: SVGs (Logo, Faultier) werden von Next nicht optimiert. Dort ist `next/image` trotzdem okay, `sizes` ist egal.
- Referenz: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (Abschnitte `sizes`, `fill`, `deviceSizes`, `imageSizes`).

### Richtige Auflösung pro Bildschirmbreite (`sizes`)

Next erzeugt aus jedem Bild ein `srcset` mit mehreren Breiten. Welche davon der Browser lädt, entscheidet er **ausschließlich anhand von `sizes`**. Ohne `sizes` nimmt er `100vw` an und lädt z. B. für ein 300px breites Bild eine 2000px-Datei. Das ist verboten.

Regeln:

1. **Jedes Bild, das nicht fest in Pixeln (`width`/`height` ohne CSS-Skalierung) dargestellt wird, bekommt `sizes`.** Bei `fill` ist `sizes` Pflicht.
2. `sizes` beschreibt die **tatsächlich gerenderte CSS-Breite** des Bildes pro Breakpoint, passend zu den Tailwind-Klassen im Layout. Mobile-first geschrieben, von groß nach klein:
   ```tsx
   // Beispiel: 3-Spalten-Grid ab md, Spalten max. 420px breit
   sizes="(min-width: 1408px) 420px, (min-width: 768px) 33vw, 100vw"
   ```
   Die Pixeldichte (Retina) rechnet der Browser selbst drauf. Nicht manuell verdoppeln.
3. **`object-cover` beachten:** Wird ein Bild in einen Container mit anderem Seitenverhältnis beschnitten, ist die gerenderte Breite größer als der Container. Beispiel: Querformat 3:2 in einem 375×640px hohen Hero wird 960px breit gerendert (640 × 1,5), also `sizes="(min-width: 960px) 100vw, 960px"`, nicht `100vw`.
4. Lieber leicht zu groß als zu klein schätzen (unscharf ist schlimmer als 20 % mehr Bytes), aber nie pauschal `100vw` für Bilder, die nicht bildschirmbreit sind.
5. Nur das LCP-Bild (meist Hero) bekommt `loading="eager" fetchPriority="high"`. `priority` ist in Next 16 deprecated.
6. Quelldateien max. ca. 2400px breit ablegen. Größere Originale vorher verkleinern.

### Bild-Check nach jeder Bildänderung

Im Browser auf **1440px und 375px** messen, ob geladene und angezeigte Breite zusammenpassen. Vorher Cache leeren oder ein privates Fenster nutzen, sonst verwendet Chrome eine bereits geladene größere Variante:

```js
// Vorher einmal ganz nach unten scrollen, damit Lazy-Bilder laden.
[...document.querySelectorAll("img")]
  .filter((i) => !i.currentSrc.endsWith(".svg"))
  .map((i) => {
    const r = i.getBoundingClientRect();
    // bei object-cover zählt die beschnittene Breite
    const cover = Math.max(r.width, (r.height * i.naturalWidth) / i.naturalHeight);
    return {
      alt: i.alt,
      noetig: Math.round(cover * devicePixelRatio),
      geladen: new URL(i.currentSrc, location.href).searchParams.get("w"),
    };
  });
```

`geladen` sollte die nächstgrößere Stufe über `noetig` sein, nicht ein Vielfaches davon.
