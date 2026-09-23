import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import portrait from "~/assets/images/portrait-marius.jpg";
import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { aboutClosing, aboutLead, aboutSections } from "~/content/about";

export function BioSection() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div className="mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-terracotta-100 lg:aspect-auto lg:h-[min(40rem,calc(100dvh-20rem))]">
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

          {/* Desktop: stays in view next to the text while scrolling. */}
          <Button asChild size="lg" className="mt-6 hidden lg:inline-flex">
            <Link href="/kontakt">
              Kontakt aufnehmen
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="max-w-2xl">
          <Eyebrow className="mb-6">Über mich</Eyebrow>
          <h1 className="mb-8 text-4xl leading-[1.06] font-extrabold sm:text-5xl lg:text-h2">
            Hallo, ich bin Marius
          </h1>

          <p className="text-xl leading-relaxed text-ink-800 lg:text-2xl lg:leading-relaxed">
            {aboutLead}
          </p>

          {aboutSections.map((section) => (
            <section key={section.title} className="mt-12">
              <h2 className="mb-4 text-2xl font-extrabold lg:text-h3">
                {section.title}
              </h2>
              <div className="space-y-5 text-lg text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <p className="mt-12 text-lg text-muted-foreground">{aboutClosing}</p>

          {/* Mobile: the sticky button above is hidden, so repeat it here. */}
          <Button asChild size="lg" className="mt-10 lg:hidden">
            <Link href="/kontakt">
              Kontakt aufnehmen
              <ArrowRightIcon aria-hidden />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
