import type { Metadata } from "next";

import { ProcessDetailSection } from "~/components/ablauf/process-detail-section";
import { ContactSection } from "~/components/home/contact-section";
import { FaqSection } from "~/components/home/faq-section";

export const metadata: Metadata = {
  title: "Ablauf",
  description:
    "Vom ersten Gespräch über den Fototag bis zur Online-Galerie: So läuft ein Fototermin in eurer Kita ab, ohne den gewohnten Tagesrhythmus zu stören.",
};

export default function AblaufPage() {
  return (
    <>
      <ProcessDetailSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
