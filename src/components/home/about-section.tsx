import { ArrowRightIcon, QuoteIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import portrait from "~/assets/images/portrait-marius.jpg";
import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { aboutTeaser } from "~/content/about";

export function AboutSection() {
  return (
    <Section id="ueber-mich">
      <Container className="grid items-center gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <figure className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-terracotta-100">
            <Image
              src={portrait}
              alt="Portrait von Marius, Fotograf bei Bruderjakob"
              fill
              placeholder="blur"
              sizes="(min-width: 1440px) 520px, (min-width: 1024px) 37vw, (min-width: 480px) 448px, 100vw"
              className="object-cover object-[50%_100%]"
            />
          </div>
          <figcaption className="absolute right-4 -bottom-6 left-4 flex items-center gap-4 rounded-2xl bg-white py-4 pr-6 pl-4 shadow-card sm:right-auto lg:bottom-10 lg:-left-8">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600">
              <QuoteIcon aria-hidden className="size-5 fill-current" />
            </span>
            <span className="font-heading text-base font-semibold text-balance text-ink-900">
              Ich halte lebhafte Momente für immer fest.
            </span>
          </figcaption>
        </figure>

        <div className="max-w-2xl">
          <Eyebrow className="mb-6">Über mich</Eyebrow>
          <h2 className="mb-8 text-4xl font-extrabold lg:text-h2">
            Hallo, ich bin Marius
          </h2>
          <div className="space-y-5 text-lg text-muted-foreground">
            <p className="text-xl leading-relaxed text-ink-800 lg:text-2xl lg:leading-relaxed">
              {aboutTeaser[0]}
            </p>
            {aboutTeaser.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/kontakt">
                Kontakt aufnehmen
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/ueber-mich">Mehr über mich</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
