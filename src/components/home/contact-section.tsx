import { ArrowRightIcon, MailIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

export function ContactSection() {
  return (
    <Section tone="accent" id="kontakt" className="pb-28 lg:pb-40">
      <Container
        size="narrow"
        className="flex flex-col items-center text-center"
      >
        <Eyebrow className="mb-6 text-terracotta-100">Kontakt</Eyebrow>
        <h2 className="mb-6 max-w-4xl text-4xl font-extrabold sm:text-5xl lg:text-display">
          Lust auf lebendige und natürliche Kindergartenbilder?
        </h2>
        <p className="mb-10 max-w-xl text-lg text-terracotta-100 lg:text-xl">
          Gerne komme ich auch zu euch in den Kindergarten und fotografiere die
          Kinder draußen.
        </p>
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Button asChild size="lg" variant="inverse">
            <Link href="/kontakt">
              Jetzt kontaktieren
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 font-semibold break-all text-white underline-offset-4 transition-colors duration-150 hover:underline"
          >
            <MailIcon aria-hidden className="size-4 shrink-0" />
            {siteConfig.email}
          </a>
        </div>
      </Container>
    </Section>
  );
}
