import { MailIcon } from "lucide-react";
import Image from "next/image";

import portrait from "~/assets/images/portrait-marius.jpg";
import { Container } from "~/components/layout/container";
import { Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { aboutDetails, aboutIntro } from "~/content/about";

export function BioSection() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-terracotta-100">
            <Image
              src={portrait}
              alt="Portrait von Marius, Fotograf bei Bruderjakob"
              fill
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1408px) 520px, (min-width: 1024px) 42vw, (min-width: 480px) 448px, 100vw"
              className="object-cover object-[50%_100%]"
            />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="space-y-5 text-lg text-muted-foreground">
            <p className="text-xl leading-relaxed text-ink-800 lg:text-2xl lg:leading-relaxed">
              {aboutIntro[0]}
            </p>
            {aboutIntro.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {aboutDetails.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Button asChild size="lg" className="mt-10">
            <a href={`mailto:${siteConfig.email}`}>
              <MailIcon aria-hidden />
              Schreib mir
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
