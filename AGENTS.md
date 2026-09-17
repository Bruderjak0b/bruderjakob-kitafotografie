<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projektregeln: Bilder

## Immer `next/image`

- Fotos und Grafiken **immer** über `import Image from "next/image"` einbinden. Kein `<img>`, keine CSS-`background-image` für Inhaltsbilder.
- Lokale Bilder statisch importieren (`import foo from "~/assets/images/foo.jpg"`). Das liefert Breite, Höhe und `placeholder="blur"` automatisch.
- Ausnahme: SVGs (Logo, Faultier) werden von Next nicht optimiert. Dort ist `next/image` trotzdem okay, `sizes` ist egal.
- Referenz: `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md` (Abschnitte `sizes`, `fill`, `deviceSizes`, `imageSizes`).

## Richtige Auflösung pro Bildschirmbreite (`sizes`)

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

## Pflicht-Check nach jeder Bildänderung

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
