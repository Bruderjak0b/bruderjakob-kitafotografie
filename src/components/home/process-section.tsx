import Link from "next/link";

import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { Button } from "~/components/ui/button";

const steps = [
  {
    title: "Kennenlernen",
    text: "Wir besprechen Termin und Ablauf, damit für euch alles reibungslos passt.",
  },
  {
    title: "Fototag",
    text: "Die Kinder spielen frei im Garten, ich halte die schönsten Momente fest.",
  },
  {
    title: "Übergabe",
    text: "Jedes Kind bekommt eine eigene Online-Galerie zur Auswahl und Bestellung.",
  },
];

export function ProcessSection() {
  return (
    <Section id="ablauf">
      <Container>
        <SectionHeader
          eyebrow="Ablauf"
          title={
            <>
              Euer Weg zu natürlichen <br className="hidden sm:inline" />
              Kindergartenfotos
            </>
          }
        />

        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            className="absolute inset-x-[16%] top-11 hidden h-px bg-border md:block"
          />
          <ol className="relative grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                <span className="mb-6 flex size-22 items-center justify-center rounded-full bg-primary font-heading text-4xl font-extrabold text-primary-foreground">
                  {index + 1}
                </span>
                <h3 className="mb-2.5 text-2xl font-semibold lg:text-h3">
                  {step.title}
                </h3>
                <p className="max-w-xs text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-14 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/ablauf">Mehr zum Ablauf</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
