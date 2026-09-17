import Image from "next/image";
import Link from "next/link";

import heroImage from "~/assets/images/hero-rutsche.jpg";
import { Container } from "~/components/layout/container";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink-100 lg:min-h-[640px] lg:items-center">
      <Image
        src={heroImage}
        alt="Mädchen lacht auf einer Rutsche im Kita-Garten"
        fill
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="-z-10 object-cover object-[72%_22%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-ink-100 from-35% via-ink-100/80 via-50% to-ink-100/0 to-75% lg:bg-linear-to-r lg:from-0% lg:from-ink-100/95 lg:via-ink-100/70 lg:via-40% lg:to-ink-100/0 lg:to-80%"
      />

      <Container className="py-16 lg:py-section">
        <div className="max-w-2xl">
          <h1 className="mb-7 text-4xl font-extrabold leading-tight lg:text-h1">
            Lebhafte Bilder in Göppingen und Umgebung
          </h1>
          <div className="flex flex-wrap gap-3.5">
            <Button asChild size="lg">
              <Link href="/kontakt">Verfügbarkeit anfragen</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-ink-100">
              <Link href="/preise">Preise und Pakete</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
