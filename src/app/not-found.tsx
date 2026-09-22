import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import faultier from "~/assets/brand/faultier.svg";
import { Container } from "~/components/layout/container";
import { PageHero } from "~/components/layout/page-hero";
import { Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { contactNavItem, mainNav } from "~/config/site";

/** Shown for unknown URLs and whenever a segment calls notFound(). */
export default function NotFound() {
  const links = [...mainNav, contactNavItem];

  return (
    <>
      <PageHero
        className="relative"
        eyebrow="Seite nicht gefunden"
        title="Diese Seite gibt es nicht"
      >
        <p className="max-w-xl text-lg text-ink-700">
          Vielleicht hat sich ein Tippfehler in die Adresse geschlichen, oder
          die Seite heißt inzwischen anders. Beides halb so wild – hier geht es
          weiter.
        </p>
        {/* Sits on the edge of the band on wide screens, below the text on phones. */}
        <Image
          src={faultier}
          alt=""
          className="mx-auto mt-10 w-44 sm:w-56 lg:absolute lg:right-8 lg:bottom-0 lg:mx-0 lg:mt-0 lg:w-64 lg:translate-y-[62%] xl:right-16 xl:w-80"
        />
      </PageHero>

      <Section>
        <Container size="narrow">
          <h2 className="mb-8 text-3xl font-extrabold lg:text-h3">
            Das findet ihr auf dieser Website
          </h2>

          <ul className="mb-12 grid gap-4 sm:grid-cols-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-ink-200 bg-ink-100 px-6 py-5 font-heading font-semibold transition-colors hover:bg-terracotta-100"
                >
                  {item.label}
                  <ArrowRightIcon
                    aria-hidden
                    className="size-5 shrink-0 text-terracotta-600"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Button asChild size="lg">
            <Link href="/">Zur Startseite</Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
