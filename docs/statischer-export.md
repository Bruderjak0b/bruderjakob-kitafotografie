# Alternative: Statischer Export ohne Node.js-Server

> Stand: 17.09.2026, getestet mit Next.js 16.3, pnpm 10, Node 24 auf `development` (Commit `c206ebe`).
> **Status: nicht umgesetzt.** Das Projekt wird aktuell für Vercel gebaut. Dieses Dokument beschreibt, was nötig wäre, um die Website stattdessen als reine HTML/CSS/JS-Dateien bei einem beliebigen Webhoster (ohne Node.js) zu betreiben.

## Kurzfassung

- **Machbar**, aber nicht mit der aktuellen Konfiguration. Es braucht Änderungen an `next.config.ts`, allen Bild-Komponenten und dem Build-Skript.
- **Größte Einschränkung:** Server Actions funktionieren im Export nicht. Ein Kontaktformular bräuchte einen externen Formular-Dienst oder ein Skript beim Hoster.
- **Entweder Vercel oder statischer Export**, nicht beides parallel. Vercel kann einen statischen Export zwar auch ausliefern, zwei Build-Wege zu pflegen lohnt sich aber nicht.
- Die Entscheidung trifft der Mensch. Agents stellen **nicht ungefragt** auf den Export um.

## Getestete Varianten

| Variante | Build | Auf einfachem Webserver |
|---|---|---|
| A: nur `output: "export"` | läuft **ohne Fehler** | **alle Fotos fehlen (404)**, sie zeigen auf `/_next/image`, das es ohne Node-Server nicht gibt |
| B: zusätzlich `images: { unoptimized: true }` | läuft | alles lädt, aber immer das Original ohne `srcset` (z. B. 700 KB Hero auf dem Handy). Verstößt gegen die Bildregeln in `AGENTS.md` |
| C: Paket `next-image-export-optimizer` | läuft, ca. 4 s länger | alles lädt, passende Größe pro Bildschirmbreite als WebP, Blur-Platzhalter funktionieren |

**Achtung bei Variante A:** Der Build ist grün, der Fehler fällt erst beim Hoster auf.

Geprüft wurde Variante C mit einem einfachen statischen Server (`python3 -m http.server -d out`) auf 375, 768 und 1440px: geladene Bildgrößen wie bei Vercel, Mobile-Menü, FAQ-Akkordeon, Schriften und FAQ-JSON-LD funktionieren, keine kaputten Bilder. Ausgabe: Ordner `out/`, ca. 7 MB.

## Umsetzung (Variante C)

1. Paket installieren:
   ```bash
   pnpm add next-image-export-optimizer
   ```
   Getestet mit Version 1.21.1 (Peer-Dependency erlaubt Next 16).

2. `next.config.ts`:
   ```ts
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     reactCompiler: true,
     output: "export",
     // jede Seite wird zu ordner/index.html, das verstehen auch einfache Apache-Hoster
     trailingSlash: true,
     images: {
       loader: "custom",
       imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
       deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
     },
     transpilePackages: ["next-image-export-optimizer"],
     env: {
       nextImageExportOptimizer_imageFolderPath: "public/images",
       nextImageExportOptimizer_exportFolderPath: "out",
       nextImageExportOptimizer_quality: "75",
       nextImageExportOptimizer_storePicturesInWEBP: "true",
       nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
       nextImageExportOptimizer_generateAndUseBlurImages: "true",
       nextImageExportOptimizer_remoteImageCacheTTL: "0",
     },
   };

   export default nextConfig;
   ```
   Der Ordner `public/images` muss existieren (darf leer sein). Statisch importierte Bilder aus `src/assets/` werden trotzdem verarbeitet.

3. In **allen** Komponenten `next/image` ersetzen:
   ```tsx
   import Image from "next-image-export-optimizer";
   // wo der Typ gebraucht wird:
   import type { StaticImageData } from "next/image";
   ```
   Props (`fill`, `sizes`, `placeholder`, `loading`, `fetchPriority`) bleiben gleich. Die Regeln zu `sizes` gelten weiter.

4. Build-Skript in `package.json` um die Bildoptimierung ergänzen:
   ```json
   "build": "biome ci && next typegen && tsc --noEmit && next build && next-image-export-optimizer"
   ```

5. `AGENTS.md` anpassen: Regel „immer `next/image`“ durch „immer `ExportedImage` aus `next-image-export-optimizer`“ ersetzen, Hinweis auf fehlende Server Actions ergänzen.

6. Hochladen: den **Inhalt** von `out/` in das Web-Verzeichnis des Hosters kopieren.

## Was im Export nicht geht

Laut `node_modules/next/dist/docs/01-app/02-guides/static-exports.md` unter anderem:

- **Server Actions** → Kontaktformular über externen Dienst (z. B. Formspree, Web3Forms) oder ein PHP-Skript beim Hoster. Datenschutz und Auftragsverarbeitung mit dem Menschen klären.
- **Redirects, Rewrites, Headers** in `next.config.ts` → stattdessen beim Hoster konfigurieren (z. B. `.htaccess` bei Apache).
- **Proxy/Middleware, Cookies, ISR, Draft Mode**
- **Route Handlers mit Request-Zugriff.** `sitemap.ts` und `robots.ts` funktionieren, weil sie beim Build statisch erzeugt werden.
- **Dynamische Routen** nur mit `generateStaticParams()`.

## Beim Hoster beachten

- **404-Seite:** Next erzeugt `out/404.html`. Der Hoster muss sie als Fehlerseite verwenden (Apache: `ErrorDocument 404 /404.html`).
- **Caching:** Dateien unter `_next/static/` und `nextImageExportOptimizer/` haben Hashes im Namen und dürfen lange gecacht werden. `index.html`-Dateien nicht.
- **HTTPS** und die Weiterleitung von `www`/ohne `www` beim Hoster einrichten.
- **Vorschau-Deployments** pro Branch wie bei Vercel gibt es nicht.
