import Image from "next/image";
import Link from "next/link";

import portrait from "~/assets/images/portrait-marius.jpg";
import { Container } from "~/components/layout/container";
import { Eyebrow, Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";

export function AboutSection() {
  return (
    <Section tone="warm" id="ueber-mich">
      <Container className="grid items-center gap-12 md:grid-cols-[2fr_3fr] lg:gap-14">
        <div className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-full md:max-w-96">
          <Image
            src={portrait}
            alt="Portrait von Marius, Fotograf bei Bruderjakob"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 384px, 288px"
            className="object-cover"
          />
        </div>

        <div className="max-w-xl">
          <Eyebrow className="mb-4">Über mich</Eyebrow>
          <h2 className="mb-2 text-3xl font-extrabold lg:text-h2">
            Hallo, ich bin Marius
          </h2>
          <p className="mb-6 font-heading text-label font-semibold text-terracotta-700">
            Fotograf aus Leidenschaft
          </p>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Bevor ich zur Kamera gegriffen habe, habe ich als Designer
              gearbeitet und ein freiwilliges soziales Jahr mit Kindern
              verbracht. Genau diese Zeit hat mir gezeigt, wie viel in einem
              ganz normalen Kita-Tag passiert, wenn man genau hinschaut.
            </p>
            <p>
              Heute verbinde ich beides. Den Blick fürs Gestalten und die
              Erfahrung im Umgang mit Kindern. Ich fotografiere leise und
              unauffällig, damit der Alltag genau so bleibt, wie er ist. Kein
              Blitzlichtgewitter, kein Drängen in Pose, sondern echte Kindheit,
              wie sie wirklich aussieht.
            </p>
          </div>
          <Button asChild size="lg" className="mt-7">
            <Link href="/ueber-mich">Mehr über mich</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
