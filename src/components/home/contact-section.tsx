import Link from "next/link";

import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

export function ContactSection() {
  return (
    <Section id="kontakt" className="lg:pt-0">
      <Container size="narrow">
        <div className="flex flex-col items-start gap-8 rounded-2xl bg-ink-100 p-8 shadow-card sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:p-16">
          <div className="max-w-xl">
            <Eyebrow className="mb-4">Kontakt</Eyebrow>
            <h2 className="mb-4 text-3xl font-extrabold lg:text-h2">
              Lust auf lebendige und natürliche Kindergartenbilder?
            </h2>
            <p className="text-muted-foreground">
              Gerne komme ich auch zu euch in den Kindergarten und fotografiere
              die Kinder draußen.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href="/kontakt">Jetzt kontaktieren</Link>
            </Button>
            <Button asChild variant="link" className="justify-start">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
