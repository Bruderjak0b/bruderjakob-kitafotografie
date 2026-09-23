#!/usr/bin/env bash
# Render the acquisition documents in docs/akquise/ to print-ready A4 PDFs.
#
# The HTML files load their stylesheet, photos and fonts over HTTP, so this
# starts a throwaway local server, drives headless Chrome over it and shuts the
# server down again. Nothing is installed and the user's Chrome profile is not
# touched -- headless runs against a temporary profile in the system temp dir.
#
# Usage: ./scripts/akquise-pdf.sh

set -euo pipefail

cd "$(dirname "$0")/.."
SRC_DIR="docs/akquise"
OUT_DIR="$SRC_DIR/pdf"
PORT=4531
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE="$(mktemp -d)"

if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome nicht gefunden unter $CHROME" >&2
  echo "Ohne Chrome: die HTML-Datei im Browser oeffnen und ueber Drucken als PDF sichern." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

python3 -m http.server "$PORT" -d "$SRC_DIR" >/dev/null 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true
  rm -rf "$PROFILE"
}
trap cleanup EXIT

# Wait for the server to answer before pointing Chrome at it.
for _ in $(seq 1 25); do
  curl -sf -o /dev/null "http://localhost:$PORT/" && break
  sleep 0.2
done

for name in akquise-mappe elternbrief-und-faq; do
  out="$OUT_DIR/$name.pdf"
  rm -f "$out"
  # Headless Chrome writes the file and then sometimes lingers, so it runs in
  # the background and is stopped once the PDF has stopped growing.
  "$CHROME" --headless --disable-gpu --no-first-run --no-default-browser-check \
    --user-data-dir="$PROFILE" --no-pdf-header-footer \
    --print-to-pdf="$out" "http://localhost:$PORT/$name.html" >/dev/null 2>&1 &
  chrome_pid=$!

  last_size=-1
  for _ in $(seq 1 120); do
    sleep 0.5
    [[ -f "$out" ]] || continue
    size=$(wc -c <"$out")
    [[ "$size" -gt 0 && "$size" -eq "$last_size" ]] && break
    last_size=$size
  done
  kill "$chrome_pid" 2>/dev/null || true
  wait "$chrome_pid" 2>/dev/null || true

  if [[ ! -s "$out" ]]; then
    echo "Fehlgeschlagen: $out" >&2
    exit 1
  fi
  pages=$(python3 -c "
import re, sys
data = open(sys.argv[1], 'rb').read()
print(len(re.findall(rb'/Type\s*/Page[^s]', data)))
" "$out")
  printf '%s  (%s Seiten, %s)\n' "$out" "$pages" "$(du -h "$out" | cut -f1)"
done
