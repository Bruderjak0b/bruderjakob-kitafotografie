# Bruderjakob Kitafotografie

Website für Bruderjakob Kitafotografie, Kita-Fotograf in Göppingen und Umgebung.

Gebaut mit Next.js 16, React 19, Tailwind CSS 4 und shadcn/ui.

## Schnellstart

Voraussetzungen: **Node.js 24** (siehe `.nvmrc`) und **pnpm 11**.

```bash
nvm use            # oder Node 24 direkt installieren
corepack enable    # aktiviert pnpm in der Version aus package.json
pnpm install
pnpm dev           # http://localhost:3000
```

Weitere Befehle:

| Befehl | Zweck |
|---|---|
| `pnpm lint` | Code mit Biome prüfen |
| `pnpm format` | Code formatieren |
| `pnpm build` | Produktions-Build erstellen |

## Dokumentation

- **[docs/einstieg.md](docs/einstieg.md):** Einstieg ins Projekt für Menschen und AI-Agents (Einrichtung, Arbeitsweise, Struktur, offene Punkte). **Hier anfangen.**
- **[AGENTS.md](AGENTS.md):** verbindliche Projektregeln und Definition of Done.

## Branches

| Branch | Zweck |
|---|---|
| `main` | Livestand der Website |
| `development` | aktueller Arbeitsstand, Basis für neue Branches |
| `kotti` | Design-Vorschlag (Polish, Header, breiteres Layout), nicht gemerged |
