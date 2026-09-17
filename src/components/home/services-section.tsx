import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import familyImage from "~/assets/images/familienshooting.jpg";
import weddingImage from "~/assets/images/hochzeit.jpg";
import christmasImage from "~/assets/images/weihnachtsfotos.jpg";
import { Container } from "~/components/layout/container";
import { Section } from "~/components/layout/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export function ServicesSection() {
  return (
    <Section tone="warm" id="dienstleistungen" className="lg:pb-50">
      <Container size="narrow" className="flex flex-col gap-16">
        <h2 className="text-3xl font-extrabold lg:text-h2">
          Sonstige Dienstleistungen
        </h2>

        <article className="max-w-3xl">
          <h3 className="mb-3.5 text-2xl font-semibold lg:text-h3">
            Minishootings
          </h3>
          <div className="space-y-3.5 text-muted-foreground">
            <p>
              Dein Kind war beim Kita-Fototermin krank oder ihr wart im Urlaub?
              Oder du möchtest einfach noch ein paar Bilder mit einem
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
              Anschluss als Gutschein vollständig im Online-Shop einlösen könnt.
            </p>
          </div>
          <Button asChild size="lg" className="mt-6">
            <Link href="/kontakt">Termin anfragen</Link>
          </Button>
        </article>

        <article className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="mb-3.5 text-2xl font-semibold lg:text-h3">
              Bruderimfokus
            </h3>
            <p className="mb-5 text-muted-foreground">
              Neben der Kita-Fotografie biete ich unter Bruderimfokus noch
              weitere Leistungen an: von Familienshootings über Weihnachtsfotos
              im Studio bis hin zu Hochzeiten und Events. Schau gerne vorbei,
              wenn du auf der Suche nach mehr als nur Kita-Bildern bist.
            </p>
            <Button asChild variant="link">
              <a href={siteConfig.links.bruderimfokus}>Zu Bruderimfokus</a>
            </Button>
          </div>

          <div className="grid h-80 grid-cols-2 grid-rows-2 gap-2.5">
            <GalleryImage
              src={familyImage}
              alt="Familienshooting im Freien"
              className="row-span-2"
            />
            <GalleryImage
              src={christmasImage}
              alt="Weihnachtsfotos im Studio"
            />
            <GalleryImage src={weddingImage} alt="Hochzeitspaar" />
          </div>
        </article>
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
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        placeholder="blur"
        sizes="(min-width: 768px) 300px, 240px"
        className="object-cover"
      />
    </div>
  );
}
