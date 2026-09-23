import type { LucideIcon } from "lucide-react";
import { CheckIcon, GiftIcon, HeartIcon, SchoolIcon } from "lucide-react";

import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { cn } from "~/lib/utils";

type PromiseItem = string | { text: string; details: string[] };

const forParents: PromiseItem[] = [
  "Individuelle und authentische Fotos im Freien",
  "Große Auswahl an Motiven von eurem Kind",
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
  "Ich richte mich nach eurem Kita-Alltag, ohne laufende Abläufe zu unterbrechen",
  "Neben Kinderfotos kann ich optional Portraits der Pädagoginnen und Pädagogen sowie Aufnahmen der Einrichtung fotografieren",
];

export function PromiseSection() {
  return (
    <Section tone="subtle" id="versprechen">
      <Container>
        <SectionHeader
          eyebrow="Versprechen"
          title="Die wichtigsten Punkte zusammengefasst"
        >
          <p className="mt-2 inline-flex items-center gap-3 rounded-2xl bg-terracotta-100 px-5 py-3 text-left sm:rounded-full text-base font-semibold text-terracotta-700">
            <GiftIcon aria-hidden className="size-5 shrink-0" />
            Jedes Kind und jede Einrichtung erhält ein kostenloses digitales
            Gruppenbild
          </p>
        </SectionHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          <PromiseCard title="Für Eltern" icon={HeartIcon} items={forParents} />
          <PromiseCard
            title="Für Kitas"
            icon={SchoolIcon}
            items={forDaycares}
            dark
          />
        </div>
      </Container>
    </Section>
  );
}

function PromiseCard({
  title,
  icon: Icon,
  items,
  dark = false,
}: {
  title: string;
  icon: LucideIcon;
  items: PromiseItem[];
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 sm:p-10 lg:p-14",
        dark ? "bg-ink-800 text-white" : "bg-white shadow-card",
      )}
    >
      <div className="mb-8 flex items-center gap-4">
        <span
          className={cn(
            "flex size-12 items-center justify-center rounded-full",
            dark
              ? "bg-terracotta-500 text-white"
              : "bg-terracotta-100 text-terracotta-600",
          )}
        >
          <Icon aria-hidden className="size-5" />
        </span>
        <h3 className="text-2xl font-extrabold lg:text-h3">{title}</h3>
      </div>

      <ul
        className={cn(
          "flex flex-col gap-4 text-lg",
          dark ? "text-ink-200" : "text-muted-foreground",
        )}
      >
        {items.map((item) => {
          const text = typeof item === "string" ? item : item.text;
          return (
            <li key={text} className="flex gap-3.5">
              <CheckIcon
                aria-hidden
                className={cn(
                  "mt-1 size-5 shrink-0",
                  dark ? "text-terracotta-300" : "text-terracotta-600",
                )}
                strokeWidth={2.5}
              />
              <div>
                {text}
                {typeof item !== "string" && (
                  <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className={cn(
                          "rounded-full px-3 py-1",
                          dark
                            ? "bg-ink-700 text-white"
                            : "bg-ink-100 text-ink-800",
                        )}
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
