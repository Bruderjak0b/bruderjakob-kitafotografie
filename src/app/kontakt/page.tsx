import { MailIcon, MessageCircleIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import portrait from "~/assets/images/portrait-marius-sitzend.jpg";
import { ContactForm } from "~/components/kontakt/contact-form";
import { Container } from "~/components/layout/container";
import { PageHero } from "~/components/layout/page-hero";
import { Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
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
                Schreib mir einfach per WhatsApp – oft ist eine kurze Frage so
                am schnellsten geklärt. Per E-Mail oder Telefon erreichst du
                mich genauso.
              </p>

              <ul className="mt-6 flex flex-col items-start gap-4">
                <li>
                  <Button asChild variant="outline">
                    <a
                      href={siteConfig.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircleIcon aria-hidden />
                      Per WhatsApp schreiben
                      <span className="sr-only">
                        {" "}
                        (öffnet in einem neuen Tab)
                      </span>
                    </a>
                  </Button>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 font-semibold break-all text-terracotta-600 underline-offset-4 transition-colors duration-150 hover:text-terracotta-700 hover:underline focus-visible:underline"
                  >
                    <MailIcon aria-hidden className="size-4 shrink-0" />
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.phoneHref}
                    className="inline-flex items-center gap-2 font-semibold text-terracotta-600 underline-offset-4 transition-colors duration-150 hover:text-terracotta-700 hover:underline focus-visible:underline"
                  >
                    <PhoneIcon aria-hidden className="size-4 shrink-0" />
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>

              <p className="mt-6 text-lg text-muted-foreground">
                Antworten auf die häufigsten Fragen stehen im{" "}
                <Link
                  href="/ablauf#faq"
                  className="font-semibold text-terracotta-600 underline-offset-4 transition-colors duration-150 hover:text-terracotta-700 hover:underline focus-visible:underline"
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
