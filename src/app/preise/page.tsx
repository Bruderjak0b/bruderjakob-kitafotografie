import type { Metadata } from "next";

import { ContactSection } from "~/components/home/contact-section";
import { PromiseSection } from "~/components/home/promise-section";
import { PageHero } from "~/components/layout/page-hero";
import { PackagesSection } from "~/components/preise/packages-section";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Fotopakete von 24,90 € bis 79,90 €, Einzelbilder ab 5,90 €. Für die Kita entstehen keine Kosten, Eltern bestellen erst nach der Auswahl in der Online-Galerie.",
};

export default function PreisePage() {
  return (
    <>
      <PageHero eyebrow="Preise" title="Diese Pakete stehen zur Auswahl">
        <p className="text-lg text-ink-700 lg:text-xl">
          Ob einzelnes Foto oder umfangreiches Paket, hier findest du die
          passende Auswahl für eure Erinnerungen. Alle Pakete gibt es sowohl
          gedruckt als auch digital.
        </p>
      </PageHero>
      <PackagesSection />
      <PromiseSection />
      <ContactSection />
    </>
  );
}
