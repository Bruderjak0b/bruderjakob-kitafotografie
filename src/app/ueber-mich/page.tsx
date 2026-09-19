import type { Metadata } from "next";

import { ApproachSection } from "~/components/home/approach-section";
import { ContactSection } from "~/components/home/contact-section";
import { ServicesSection } from "~/components/home/services-section";
import { PageHero } from "~/components/layout/page-hero";
import { BioSection } from "~/components/ueber-mich/bio-section";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Marius fotografiert Kitas in Göppingen und Umgebung: wie ich arbeite, warum ich leise fotografiere und was das für euren Kita-Alltag bedeutet.",
};

export default function UeberMichPage() {
  return (
    <>
      <PageHero eyebrow="Über mich" title="Hallo, ich bin Marius" />
      <BioSection />
      <ApproachSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
