import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";

type PromiseItem = string | { text: string; details: string[] };

const forParents: PromiseItem[] = [
  "Individuelle und authentische Fotos im Freien",
  "Große Auswahl an Motiven von jedem Kind",
  "Passwortgeschützte Onlinegalerie für jedes Kind",
  "Anmeldung und Bestellung bequem online, egal wann",
  "Geschwister werden gemeinsam fotografiert",
  "Freie Wahl zwischen Einzelbildern und Paketen",
  "Alle Printprodukte direkt nach Hause geliefert",
];

const forDaycares: PromiseItem[] = [
  {
    text: "Datenschutzkonforme Abwicklung von der Anmeldung bis zur Bestellung",
    details: [
      "Keine händischen Listen",
      "Kein Einsammeln von Geldern",
      "Kein Verteilen von Mappen",
    ],
  },
  "Alle Informationen für Eltern werden von mir bereitgestellt",
  "Ich bin direkter Ansprechpartner für alle Fragen der Eltern",
  "Der Fototag richtet sich nach dem Kita-Alltag, ohne laufende Abläufe zu unterbrechen",
  "Neben Kinderfotos entstehen auch Portraits der Pädagoginnen und Pädagogen sowie Aufnahmen der Einrichtung",
];

export function PromiseSection() {
  return (
    <Section id="versprechen">
      <Container size="narrow">
        <SectionHeader eyebrow="Versprechen" title="Was ihr von mir bekommt" />

        <div className="overflow-hidden rounded-2xl border">
          <p className="bg-primary px-6 py-5 text-center font-heading text-lg font-semibold text-primary-foreground lg:px-16 lg:text-label">
            Jedes Kind und jede Einrichtung erhält ein kostenloses digitales
            Gruppenbild
          </p>

          <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1fr_1px_1fr] md:gap-14 lg:p-16">
            <PromiseList title="Für Eltern" items={forParents} />
            <div aria-hidden className="hidden bg-border md:block" />
            <PromiseList title="Für Kitas" items={forDaycares} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function PromiseList({
  title,
  items,
}: {
  title: string;
  items: PromiseItem[];
}) {
  return (
    <div>
      <h3 className="mb-5 text-2xl font-semibold lg:text-h3">{title}</h3>
      <ul className="flex list-disc flex-col gap-3.5 pl-6 text-muted-foreground marker:text-terracotta-400">
        {items.map((item) =>
          typeof item === "string" ? (
            <li key={item}>{item}</li>
          ) : (
            <li key={item.text}>
              {item.text}
              <ul className="mt-3 flex list-[circle] flex-col gap-2 pl-5 text-sm">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
