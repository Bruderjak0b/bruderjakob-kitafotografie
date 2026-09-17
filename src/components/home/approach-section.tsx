import { Container } from "~/components/layout/container";
import { Section } from "~/components/layout/section";

const ageGroups = [
  {
    label: "Ü3",
    title: "Ab drei Jahren wird der Spielplatz zur Bühne",
    paragraphs: [
      "Ich starte mit einem kurzen Einzelportrait und einem Gespräch über Lieblingsspielzeug, Alter, Name. Danach geht es an ein, zwei Klettergeräte, über die wir eine kleine Runde drehen.",
      "Nach wenigen Minuten ist die Kamera Nebensache, und genau dann entstehen die Bilder, die nichts Gestelltes mehr an sich haben.",
    ],
  },
  {
    label: "U3",
    title: "Die Kleinsten brauchen ihren Takt",
    paragraphs: [
      "Bei Krippenkindern verändere ich am Tagesablauf möglichst nichts. Die gewohnte Gruppe, die vertrauten Erzieherinnen in Reichweite, dazu der normale Morgenkreis: genau das gibt den Kindern die Sicherheit, die man auf Fotos sieht.",
    ],
  },
];

export function ApproachSection() {
  return (
    <Section tone="warm" id="natuerliche-bilder">
      <Container size="narrow">
        <div className="mb-12 flex flex-col gap-5 lg:mb-16">
          <h2 className="text-4xl leading-tight font-extrabold lg:text-h1">
            Wie entstehen die natürlichen Bilder?
          </h2>
          <p className="max-w-2xl">
            Ergebnisse allein reichen mir nicht. Wenn ein Kind die Kamera
            vergisst und einfach spielt, ist der Tag gelungen. Man sieht es
            später auf jedem Bild.
          </p>
        </div>

        <div className="divide-y border-y">
          {ageGroups.map((group) => (
            <article
              key={group.label}
              className="grid gap-4 py-10 sm:grid-cols-[6rem_1fr] sm:gap-10 lg:py-14"
            >
              <p
                aria-hidden
                className="font-heading text-5xl leading-none font-extrabold text-terracotta-400 lg:text-6xl"
              >
                {group.label}
              </p>
              <div className="max-w-2xl">
                <h3 className="mb-3.5 text-2xl font-semibold lg:text-h3">
                  {group.title}
                </h3>
                <div className="space-y-3.5 text-muted-foreground">
                  {group.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-2xl">
          Jedes Bild aus dem freien Spiel bringt ein Stück Kita mit ins Foto:
          das Klettergerüst, den Sandkasten, das Licht im Garten. Darum wirken
          sie so lebendig.
        </p>
      </Container>
    </Section>
  );
}
