import type { Metadata } from "next";
import Link from "next/link";

import { AboutSection } from "~/components/home/about-section";
import { ApproachSection } from "~/components/home/approach-section";
import { ContactSection } from "~/components/home/contact-section";
import { FaqSection } from "~/components/home/faq-section";
import { HeroSection } from "~/components/home/hero-section";
import { ProcessSection } from "~/components/home/process-section";
import { PromiseSection } from "~/components/home/promise-section";
import { ServicesSection } from "~/components/home/services-section";
import { TestimonialsSection } from "~/components/home/testimonials-section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { homeFaqItems } from "~/content/faq";

export const metadata: Metadata = {
  // "absolute" skips the "| Bruderjakob Kitafotografie" template, the brand
  // name is already part of this title.
  title: {
    absolute: `Kitafotografie in Göppingen und Umgebung | ${siteConfig.shortName}`,
  },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PromiseSection />
      <ProcessSection />
      <ApproachSection />
      <TestimonialsSection />
      <ServicesSection />
      <FaqSection
        items={homeFaqItems}
        action={
          <Button asChild size="lg" variant="outline" className="mt-2">
            <Link href="/ablauf#faq">Alle Fragen ansehen</Link>
          </Button>
        }
      />
      <ContactSection />
    </>
  );
}
