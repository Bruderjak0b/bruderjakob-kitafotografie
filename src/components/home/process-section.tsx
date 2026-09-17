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
          title="Euer Weg zu natürlichen Kindergartenfotos"
          align="left"
          action={
            <Button asChild size="lg" variant="outline">
              <Link href="/ablauf">Mehr zum Ablauf</Link>
            </Button>
          }
        />

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative border-t border-ink-200 pt-8 before:absolute before:-top-px before:left-0 before:h-0.5 before:w-16 before:bg-primary"
            >
              <span
                aria-hidden
                className="mb-6 block font-heading text-6xl leading-none font-extrabold tracking-tight text-terracotta-200 lg:text-7xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-3 text-2xl font-extrabold lg:text-h3">
                {step.title}
              </h3>
              <p className="max-w-sm text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
