import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import portrait from "~/assets/images/portrait-marius-sitzend.jpg";
import { ContactForm } from "~/components/kontakt/contact-form";
import { Container } from "~/components/layout/container";
import { PageHero } from "~/components/layout/page-hero";
import { Section } from "~/components/layout/section";
import { siteConfig } from "~/config/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Schreib mir, wenn ihr einen Fototermin in eurer Kita plant oder erst einmal nur Fragen habt. Ich melde mich innerhalb von zwei Tagen zurück.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Lust auf lebendige und natürliche Kindergartenbilder?"
      >
        <p className="text-lg text-ink-700 lg:text-xl">
          Gerne komme ich auch zu euch in den Kindergarten und fotografiere die
          Kinder draußen.
        </p>
      </PageHero>

      <Section tone="warm">
        <Container className="grid items-start gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-terracotta-200">
              <Image
                src={portrait}
                alt="Marius sitzt mit seiner Kamera auf einer Mauer"
                fill
                placeholder="blur"
                sizes="(min-width: 1408px) 520px, (min-width: 1024px) 36vw, 100vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div>
              <h2 className="mb-3 text-2xl font-extrabold lg:text-h3">
                Lieber direkt schreiben?
              </h2>
              <p className="text-lg text-muted-foreground">
                Du erreichst mich auch per E-Mail an{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-semibold break-all text-terracotta-600 underline underline-offset-4 transition-colors duration-150 hover:text-terracotta-700"
                >
                  {siteConfig.email}
                </a>
                . Antworten auf die häufigsten Fragen stehen im{" "}
                <Link
                  href="/ablauf#faq"
                  className="font-semibold text-terracotta-600 underline underline-offset-4 transition-colors duration-150 hover:text-terracotta-700"
                >
                  FAQ auf der Ablauf-Seite
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
