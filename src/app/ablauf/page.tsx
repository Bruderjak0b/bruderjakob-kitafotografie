import type { Metadata } from "next";

import { ProcessDetailSection } from "~/components/ablauf/process-detail-section";
import { ContactSection } from "~/components/home/contact-section";
import { FaqSection } from "~/components/home/faq-section";
import { ProcessSection } from "~/components/home/process-section";
import { PageHero } from "~/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Ablauf",
  description:
    "Vom ersten Gespräch über den Fototag bis zur Online-Galerie: So läuft ein Fototermin in eurer Kita ab, ohne den gewohnten Tagesrhythmus zu stören.",
};

export default function AblaufPage() {
  return (
    <>
      <PageHero
        eyebrow="Ablauf"
        title="Vom ersten Gespräch bis zu den fertigen Bildern"
      >
        <p className="text-lg text-ink-700 lg:text-xl">
          Drei Schritte, bei denen euer Kita-Alltag den Takt vorgibt.
        </p>
      </PageHero>
      <ProcessSection withDetailsLink={false} />
      <ProcessDetailSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
