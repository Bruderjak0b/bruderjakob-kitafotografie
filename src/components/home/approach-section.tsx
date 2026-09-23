import { SunIcon } from "lucide-react";
import Image from "next/image";

import detailImage from "~/assets/images/detail-haengebruecke.jpg";
import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";

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
      <Container className="grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow className="mb-6">Herangehensweise</Eyebrow>
          <h2 className="mb-6 text-4xl font-extrabold lg:text-h2">
            Wie entstehen die natürlichen Bilder?
          </h2>
          <p className="mb-10 text-lg text-muted-foreground">
            Ergebnisse allein reichen mir nicht. Wenn ein Kind die Kamera
            vergisst und einfach spielt, ist der Tag gelungen. Man sieht es
            später auf jedem Bild.
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-terracotta-200 lg:aspect-square lg:rounded-t-[50%]">
            <Image
              src={detailImage}
              alt="Kinderbeine balancieren über eine Seilbrücke auf dem Spielplatz"
              fill
              placeholder="blur"
              sizes="(min-width: 1408px) 560px, (min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_40%]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:pt-4">
          {ageGroups.map((group) => (
            <article
              key={group.label}
              className="rounded-3xl bg-white p-6 shadow-card sm:p-10 lg:p-12"
            >
              <div className="mb-5 flex items-center gap-4 lg:gap-5">
                <span
                  aria-hidden
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-terracotta-100 font-heading text-xl font-extrabold text-terracotta-600 lg:size-16 lg:text-2xl"
                >
                  {group.label}
                </span>
                <h3 className="text-2xl font-extrabold lg:text-h3">
                  {group.title}
                </h3>
              </div>
              <div className="space-y-4 text-lg text-muted-foreground">
                {group.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-5 rounded-3xl bg-terracotta-600 p-6 text-white sm:flex-row sm:gap-6 sm:p-10 lg:p-12">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-terracotta-500">
              <SunIcon aria-hidden className="size-6" />
            </span>
            <div>
              <p className="mb-3 text-lg text-terracotta-100">
                Jedes Bild aus dem freien Spiel bringt ein Stück Kita mit ins
                Foto: das Klettergerüst, den Sandkasten, das Licht im Garten.
              </p>
              <p className="font-heading text-2xl font-extrabold lg:text-h3">
                Darum wirken sie so lebendig.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
