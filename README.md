# Bruderjakob Kitafotografie

Website für Bruderjakob Kitafotografie, Kita-Fotograf in Göppingen und Umgebung.

Gebaut mit Next.js 16, React 19, Tailwind CSS 4 und shadcn/ui.

## Schnellstart

Voraussetzungen: [nvm](https://github.com/nvm-sh/nvm) und **pnpm 10**. Die Node-Version steht in `.nvmrc` (aktuell 24).

```bash
nvm install        # installiert und aktiviert die Version aus .nvmrc
npm install -g pnpm@10
pnpm install
pnpm dev           # http://localhost:3000
```

Weitere Befehle:

| Befehl | Zweck |
|---|---|
| `pnpm format` | Code formatieren |
| `pnpm check` | Formatierung, Lint-Regeln und Typen prüfen |
| `pnpm build` | `check` plus Produktions-Build, genau wie bei Vercel |

## Deployment

Vercel mit Git-Integration. `main` wird produktiv veröffentlicht, alle anderen Branches erhalten Preview-Deployments. Vercel nutzt seine Standardbefehle (`pnpm install`, `pnpm run build`), es gibt kein `vercel.json`. Der Build bricht bei Format-, Lint- oder Typfehlern ab. Einrichtung des Vercel-Projekts: siehe [docs/einstieg.md](docs/einstieg.md#offene-punkte-vor-dem-livegang).

## Dokumentation

- **[docs/einstieg.md](docs/einstieg.md):** Einstieg ins Projekt für Menschen und AI-Agents (Einrichtung, Arbeitsweise, Struktur, offene Punkte). **Hier anfangen.**
- **[AGENTS.md](AGENTS.md):** verbindliche Projektregeln und Definition of Done.
- **[docs/statischer-export.md](docs/statischer-export.md):** getestete, nicht umgesetzte Alternative zu Vercel (reines HTML/CSS/JS bei einem normalen Webhoster).

## Branches

| Branch | Zweck |
|---|---|
| `main` | Livestand der Website |
| `development` | aktueller Arbeitsstand, Basis für neue Branches |
| `kotti` | Design-Vorschlag (Polish, Header, breiteres Layout), nicht gemerged |
