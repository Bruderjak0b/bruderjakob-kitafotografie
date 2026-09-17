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

## Branches (Git Flow)

Das Repo folgt [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/). Details und Regeln für AI-Agents: [AGENTS.md](AGENTS.md#git-git-flow).

| Branch | Zweck |
|---|---|
| `main` | Production. Vercel-Production-Branch, jeder Merge ist ein Release mit Tag `vX.Y.Z` |
| `development` | Integrationsstand für das nächste Release |
| `feature/*` | neue Funktionen, von und nach `development` |
| `release/*` | Release-Vorbereitung, von `development` nach `main` und zurück |
| `hotfix/*` | dringende Fehler, von `main` nach `main` und `development` |
| `kotti` | Design-Vorschlag (Polish, Header, breiteres Layout), außerhalb des Flows, nicht gemerged |
