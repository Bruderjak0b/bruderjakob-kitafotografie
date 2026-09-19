import { ArrowRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import heroImage from "~/assets/images/hero-spielplatz.jpg";
import { Container } from "~/components/layout/container";
import { Eyebrow } from "~/components/layout/section";
import { Button } from "~/components/ui/button";

const highlights = [
  "Kostenlos für die Einrichtung",
  "DSGVO-konform über Fotograf.de",
  "Online-Galerie für jedes Kind",
];

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-ink-100">
      <Container className="grid items-center gap-12 pt-12 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16 lg:pb-24">
        <div>
          <Eyebrow className="mb-6">Kitafotografie</Eyebrow>
          <h1 className="mb-6 text-5xl leading-[1.04] font-extrabold sm:text-6xl xl:text-display">
            Lebhafte Bilder in Göppingen und Umgebung
          </h1>
          <p className="mb-9 max-w-xl text-lg text-ink-700 lg:text-xl">
            Natürliche Kindergartenfotos, die im freien Spiel entstehen. Ohne
            Studio, ohne Posen, mitten im Kita-Alltag.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/kontakt">
                Verfügbarkeit anfragen
                <ArrowRightIcon aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/preise">Preise und Pakete</Link>
            </Button>
          </div>

          <ul className="mt-12 grid gap-3 border-t border-ink-200 pt-8 text-ink-800 sm:grid-cols-3 sm:gap-6">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm font-medium">
                <CheckIcon
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-terracotta-600"
                  strokeWidth={2.5}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative aspect-[5/4] overflow-hidden rounded-3xl bg-terracotta-100 sm:aspect-[4/3] lg:aspect-[4/5] lg:rounded-t-[50%_40%]">
          <Image
            src={heroImage}
            alt="Kind läuft über den Spielplatz auf ein Klettergerüst zu"
            fill
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1408px) 660px, (min-width: 1024px) 48vw, 100vw"
            className="object-cover object-[45%_45%]"
          />
        </div>
      </Container>
    </section>
  );
}
