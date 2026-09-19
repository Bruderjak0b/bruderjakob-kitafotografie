import { ArrowUpRightIcon, ClockIcon, ImagesIcon, TagIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import familyImage from "~/assets/images/familienshooting.jpg";
import weddingImage from "~/assets/images/hochzeit.jpg";
import coupleImage from "~/assets/images/paarshooting.jpg";
import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

const miniShootingFacts = [
  {
    icon: ClockIcon,
    value: "10–15 Min.",
    label: "pro Kind oder Geschwisterpaar",
  },
  { icon: ImagesIcon, value: "bis zu 25", label: "Fotos zur Auswahl" },
  { icon: TagIcon, value: "ab 5,90 €", label: "pro Einzelfoto als Print" },
];

export function ServicesSection() {
  return (
    <Section id="dienstleistungen">
      <Container>
        <SectionHeader
          eyebrow="Außerdem"
          title="Sonstige Dienstleistungen"
          align="left"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex flex-col rounded-3xl bg-terracotta-100 p-6 sm:p-10 lg:p-12">
            <h3 className="mb-5 text-2xl font-extrabold lg:text-h3">
              Minishootings
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Dein Kind war beim Kita-Fototermin krank oder ihr wart im
                Urlaub? Oder du möchtest einfach noch ein paar Bilder mit einem
                Geschwisterkind, das noch nicht oder nicht mehr in der Kita ist?
                Dann meld dich zu einem meiner Minishootings auf dem Spielplatz
                an!
              </p>
              <p>
                Das Shooting dauert pro Kind oder Geschwisterpaar etwa 10 bis 15
                Minuten. Im Anschluss bekommt ihr eine Galerie mit bis zu 25
                Fotos, aus denen ihr auswählen könnt, ob als Sparpaket, rein
                digital oder als Einzelprodukt. Einzelfotos als Print gibt es
                schon ab 5,90 €, die klassische Mappe ab 24,90 €.
              </p>
              <p>
                Das Shooting selbst ist für euch kostenlos. Zur verbindlichen
                Terminbuchung wird ein Betrag von 60 € fällig, den ihr im
                Anschluss als Gutschein vollständig im Online-Shop einlösen
                könnt.
              </p>
            </div>

            <dl className="my-8 grid gap-3 sm:grid-cols-3">
              {miniShootingFacts.map((fact) => (
                <div
                  key={fact.value}
                  className="flex flex-col-reverse justify-end gap-1 rounded-2xl bg-white p-4"
                >
                  <dt className="text-sm text-ink-700">{fact.label}</dt>
                  <dd className="flex items-center gap-2 font-heading text-xl font-extrabold text-terracotta-600">
                    <fact.icon aria-hidden className="size-5 shrink-0" />
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Button asChild size="lg" className="mt-auto self-start">
              <Link href="/kontakt">Termin anfragen</Link>
            </Button>
          </article>

          <article className="flex flex-col overflow-hidden rounded-3xl bg-ink-800 text-white">
            <div className="grid h-72 grid-cols-2 grid-rows-2 gap-1.5 sm:h-96 lg:h-[26rem]">
              <GalleryImage
                src={familyImage}
                alt="Kind läuft beim Familienshooting auf seine Eltern zu"
                className="row-span-2"
              />
              <GalleryImage
                src={coupleImage}
                alt="Paar umarmt sich bei einem Paarshooting"
              />
              <GalleryImage src={weddingImage} alt="Hochzeitspaar" />
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-10 lg:p-12">
              <h3 className="mb-4 text-2xl font-extrabold lg:text-h3">
                Bruderimfokus
              </h3>
              <p className="mb-8 text-lg text-ink-200">
                Neben der Kita-Fotografie biete ich unter Bruderimfokus noch
                weitere Leistungen an: von Familienshootings über
                Weihnachtsfotos im Studio bis hin zu Hochzeiten und Events.
                Schau gerne vorbei, wenn du auf der Suche nach mehr als nur
                Kita-Bildern bist.
              </p>
              <a
                href={siteConfig.links.bruderimfokus}
                className="mt-auto inline-flex items-center gap-2 self-start font-semibold text-terracotta-300 underline-offset-4 transition-colors duration-150 hover:text-terracotta-200 hover:underline"
              >
                Zu Bruderimfokus
                <ArrowUpRightIcon aria-hidden className="size-4" />
              </a>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}

function GalleryImage({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(min-width: 1440px) 330px, (min-width: 1024px) 23vw, 60vw"
        className="object-cover"
      />
    </div>
  );
}
