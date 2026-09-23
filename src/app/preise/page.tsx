import type { Metadata } from "next";

import { ContactSection } from "~/components/home/contact-section";
import { PromiseSection } from "~/components/home/promise-section";
import { PackagesSection } from "~/components/preise/packages-section";

export const metadata: Metadata = {
  title: "Preise für Kita-Fotopakete",
  description:
    "Fotopakete von 24,90 € bis 79,90 €, Einzelbilder ab 5,90 €. Für die Kita entstehen keine Kosten, Eltern bestellen erst nach der Auswahl in der Galerie.",
  alternates: { canonical: "/preise" },
};

export default function PreisePage() {
  return (
    <>
      <PackagesSection />
      <PromiseSection />
      <ContactSection />
    </>
  );
}
