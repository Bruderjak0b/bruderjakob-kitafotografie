import type { Metadata } from "next";

import { ApproachSection } from "~/components/home/approach-section";
import { ContactSection } from "~/components/home/contact-section";
import { ServicesSection } from "~/components/home/services-section";
import { BioSection } from "~/components/ueber-mich/bio-section";

export const metadata: Metadata = {
  title: "Über mich",
  description:
    "Marius fotografiert Kitas in Göppingen und Umgebung. Wie ich arbeite, warum ich leise fotografiere und was das für euren Kita-Alltag bedeutet.",
};

export default function UeberMichPage() {
  return (
    <>
      <BioSection />
      <ApproachSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
