/**
 * Builds email-vorlagen.html from email-vorlagen.md.
 * The Markdown file stays the source of truth; the HTML is the readable,
 * copy-and-paste version in the website CI (shares ci.css with the other
 * acquisition documents).
 *
 * Run from the repository root:
 *   node docs/akquise/email-vorlagen-html.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "email-vorlagen.md");
const target = join(here, "email-vorlagen.html");

const esc = (text) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Square brackets in element text confuse Biome's HTML parser, so the
 * placeholders are written as entities outside of the <pre> blocks.
 */
const escBrackets = (text) =>
  text.replace(/\[/g, "&#91;").replace(/\]/g, "&#93;");

/** Inline Markdown: code, bold, links, bare URLs. */
const inline = (text) =>
  escBrackets(esc(text))
    // Biome's HTML parser stumbles over brackets inside <code>, so inline
    // code is rendered as a styled span instead.
    .replace(/`([^`]+)`/g, '<span class="mono">$1</span>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\((https?:[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    )
    .replace(
      /(^|[\s(])(https?:\/\/[^\s<)]+)/g,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>',
    );

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c])
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const lines = readFileSync(source, "utf8").split("\n");
const html = [];
const headings = [];
let list = null; // "ul" | "checklist" | null
let nested = false;
let quote = false;
let blocks = 0;

const closeList = () => {
  if (nested) {
    html.push("</ul></li>");
    nested = false;
  }
  if (list) {
    html.push("</ul>");
    list = null;
  }
};
const closeQuote = () => {
  if (quote) {
    html.push("</aside>");
    quote = false;
  }
};

/** A copyable box: the whole mail, or just a subject line. */
const copyBox = (content, { subject = false } = {}) => {
  const id = `tpl-${++blocks}`;
  const label = subject ? "Betreff kopieren" : "Mail kopieren";
  return `<figure class="tpl${subject ? " tpl--subject" : ""}">
<button class="copy screen-only" type="button" data-target="${id}">${label}</button>
<pre id="${id}">${esc(content)}</pre>
</figure>`;
};

let i = 0;
while (i < lines.length) {
  const line = lines[i];

  if (line.startsWith("```")) {
    closeList();
    closeQuote();
    const body = [];
    i++;
    while (i < lines.length && !lines[i].startsWith("```")) {
      body.push(lines[i]);
      i++;
    }
    i++;
    html.push(copyBox(body.join("\n").trim()));
    continue;
  }

  if (line.startsWith("> ")) {
    closeList();
    if (!quote) {
      html.push('<aside class="callout intro">');
      quote = true;
    }
    html.push(`<p class="small">${inline(line.slice(2))}</p>`);
    i++;
    continue;
  }
  closeQuote();

  if (line.trim() === "---") {
    closeList();
    i++;
    continue;
  }

  const heading = /^(#{1,3})\s+(.*)$/.exec(line);
  if (heading) {
    closeList();
    const text = heading[2];
    // The document title already sits in the page header.
    if (heading[1] === "#" && text === "E-Mail-Vorlagen") {
      i++;
      continue;
    }
    const isPart = heading[1].length === 1;
    const id = slugify(text);
    headings.push({ id, text, isPart });
    html.push(
      isPart
        ? `<h2 id="${id}" class="h2 part">${inline(text)}</h2>`
        : `<h3 id="${id}" class="h3 mail-title">${inline(text)}</h3>`,
    );
    i++;
    continue;
  }

  // "**Betreff:** …" becomes its own copyable line.
  const subject = /^\*\*Betreff:\*\*\s+(.*)$/.exec(line);
  if (subject) {
    closeList();
    html.push('<p class="eyebrow subject-label">Betreff</p>');
    html.push(copyBox(subject[1], { subject: true }));
    i++;
    continue;
  }

  const item = /^(\s*)- (\[[ x]\] )?(.*)$/.exec(line);
  if (item) {
    const kind = item[2] ? "checklist" : "plain";
    const isNested = item[1].length >= 2;
    if (list !== kind) {
      closeList();
      html.push(`<ul class="${kind === "checklist" ? "todo" : "bullets"}">`);
      list = kind;
    }
    if (isNested && !nested) {
      // A nested list belongs inside the parent <li>, so reopen it.
      html.push(html.pop().replace(/<\/li>$/, ""));
      html.push('<ul class="bullets nested">');
      nested = true;
    } else if (!isNested && nested) {
      html.push("</ul></li>");
      nested = false;
    }
    // Wrapped lines of the same item are indented but carry no bullet.
    let text = item[3];
    while (i + 1 < lines.length && /^\s{2,}(?!- )\S/.test(lines[i + 1])) {
      text += ` ${lines[i + 1].trim()}`;
      i++;
    }
    html.push(`<li>${inline(text)}</li>`);
    i++;
    continue;
  }

  if (line.trim() === "") {
    closeList();
    i++;
    continue;
  }

  closeList();
  const para = [line];
  while (
    i + 1 < lines.length &&
    lines[i + 1].trim() !== "" &&
    !/^(#{1,3}\s|```|> |\s*- |---$|\*\*Betreff:)/.test(lines[i + 1])
  ) {
    para.push(lines[i + 1]);
    i++;
  }
  html.push(`<p class="muted">${inline(para.join(" "))}</p>`);
  i++;
}
closeList();
closeQuote();

const toc = headings
  .map(
    ({ id, text, isPart }) =>
      `<li${isPart ? ' class="toc-part"' : ""}><a href="#${id}">${esc(text)}</a></li>`,
  )
  .join("\n");

const page = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>E-Mail-Vorlagen – Bruderjakob Kitafotografie</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;700;800&family=Work+Sans:wght@400;500;600&display=swap">
<link rel="stylesheet" href="ci.css">
<style>
/* Screen document, not a print sheet: one long page instead of A4 pages. */
body {
  background: var(--ink-200);
  font-size: 11pt;
}
.doc {
  max-width: 210mm;
  margin: 0 auto 10mm;
  padding: var(--gutter);
  background: #ffffff;
  box-shadow: var(--shadow-card);
}
.doc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6mm;
  padding-bottom: 6mm;
  border-bottom: 0.3mm solid var(--ink-200);
  margin-bottom: 8mm;
}
.doc-head img { height: 11mm; width: auto; }
.doc-head span {
  font-family: var(--font-heading);
  font-size: 9pt;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-700);
}
.doc h1 { font-size: 24pt; line-height: 1.1; margin-bottom: 2mm; }
.doc h2.part {
  margin: 16mm 0 6mm;
  padding-top: 6mm;
  border-top: 0.8mm solid var(--terracotta-200);
  color: var(--terracotta-600);
}
.doc h3.mail-title {
  margin: 12mm 0 3mm;
  padding-top: 6mm;
  border-top: 0.3mm solid var(--ink-200);
}
.doc h3.mail-title:first-of-type { border-top: 0; }
.doc a { overflow-wrap: anywhere; }
.toc { margin-bottom: 10mm; }
.toc ul { list-style: none; columns: 2; column-gap: 10mm; }
.toc li { break-inside: avoid; margin-bottom: 1.2mm; font-size: 10pt; }
.toc li.toc-part {
  margin-top: 4mm;
  font-family: var(--font-heading);
  font-size: 9pt;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.toc li.toc-part a { color: var(--ink-700); text-decoration: none; }
.doc p { margin-bottom: 3mm; }
.doc ul.bullets { margin: 0 0 4mm 5mm; color: var(--ink-700); }
.doc ul.bullets li { margin-bottom: 1.5mm; }
.doc ul.nested { margin: 1.5mm 0 2mm 4mm; }
.doc ul.todo { list-style: none; margin: 0 0 4mm; color: var(--ink-700); }
.doc ul.todo li {
  position: relative;
  padding-left: 8mm;
  margin-bottom: 3mm;
}
.doc ul.todo li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 1.2mm;
  width: 4mm;
  height: 4mm;
  border: 0.5mm solid var(--terracotta-300);
  border-radius: 1mm;
}
.callout.intro { display: block; margin-bottom: 8mm; }
.callout.intro p:last-child { margin-bottom: 0; }
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.9em;
  background: var(--terracotta-100);
  color: var(--terracotta-700);
  padding: 0.1em 0.35em;
  border-radius: 1mm;
}
.subject-label { margin: 5mm 0 2mm; }
figure.tpl {
  position: relative;
  margin: 0 0 6mm;
  border: 0.3mm solid var(--ink-200);
  border-radius: 4mm;
  background: var(--ink-100);
}
figure.tpl pre {
  margin: 0;
  padding: 7mm 34mm 7mm 7mm;
  font-family: var(--font-sans);
  font-size: 10.5pt;
  line-height: 1.6;
  color: var(--ink-800);
  white-space: pre-wrap;
  word-break: break-word;
}
figure.tpl--subject pre {
  font-family: var(--font-heading);
  font-weight: 600;
  padding-top: 5mm;
  padding-bottom: 5mm;
}
button.copy {
  position: absolute;
  top: 4mm;
  right: 4mm;
  font-family: var(--font-sans);
  font-size: 8.5pt;
  font-weight: 500;
  color: #ffffff;
  background: var(--terracotta-500);
  border: 0;
  border-radius: 1.5mm;
  padding: 1.5mm 3mm;
  cursor: pointer;
  transition: background-color 150ms;
}
button.copy:hover { background: var(--terracotta-600); }
button.copy[data-done="true"] { background: var(--ink-700); }
button.copy:focus-visible,
a:focus-visible { outline: 0.5mm solid var(--terracotta-500); outline-offset: 1mm; }
@media (max-width: 800px) {
  .doc { padding: 8mm 5mm; margin-bottom: 0; }
  .toc ul { columns: 1; }
  figure.tpl pre { padding: 12mm 5mm 5mm; }
}
@media print {
  body { background: none; }
  .doc { box-shadow: none; max-width: none; margin: 0; padding: 12mm; }
  figure.tpl { break-inside: avoid; background: #ffffff; }
  figure.tpl pre { padding-right: 7mm; }
  .doc h3.mail-title { break-before: page; }
  .toc { display: none; }
}
</style>
</head>
<body>

<aside class="hint screen-only">
  <h2>So nutzt du diese Seite</h2>
  <p class="muted">Jede Vorlage hat einen <strong>Kopieren</strong>-Knopf: anklicken, im Mailprogramm einfügen, alle Platzhalter in eckigen Klammern ersetzen, senden. Die Datei kannst du auch drucken oder als PDF sichern (Strg/Cmd + P). Bearbeitet wird der Text in <span class="mono">email-vorlagen.md</span>, danach <span class="mono">node docs/akquise/email-vorlagen-html.mjs</span> ausführen.</p>
</aside>

<article class="doc">
  <header class="doc-head">
    <img src="bilder/LogoDark.svg" alt="Bruderjakob Kitafotografie">
    <span>Vorlagen für die Korrespondenz</span>
  </header>

  <p class="eyebrow">Kitas und Eltern</p>
  <h1 class="h1">E-Mail-Vorlagen</h1>

  <nav class="toc" aria-label="Inhalt">
    <ul>
${toc}
    </ul>
  </nav>

${html.join("\n")}
</article>

<script>
document.querySelectorAll("button.copy").forEach((button) => {
  const reset = (label) => {
    setTimeout(() => {
      button.textContent = label;
      button.dataset.done = "false";
    }, 2500);
  };
  button.addEventListener("click", async () => {
    const label = button.textContent;
    const box = document.getElementById(button.dataset.target);
    try {
      await navigator.clipboard.writeText(box.textContent);
      button.textContent = "Kopiert";
      button.dataset.done = "true";
      reset(label);
    } catch {
      // Some browsers block the clipboard on local files: select the text instead.
      const range = document.createRange();
      range.selectNodeContents(box);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      button.textContent = "Markiert, jetzt Strg/Cmd + C";
      button.dataset.done = "true";
      reset(label);
    }
  });
});
</script>
</body>
</html>
`;

writeFileSync(target, page);
console.log(`geschrieben: ${target}`);
