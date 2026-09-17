import { AboutSection } from "~/components/home/about-section";
import { ApproachSection } from "~/components/home/approach-section";
import { ContactSection } from "~/components/home/contact-section";
import { FaqSection } from "~/components/home/faq-section";
import { HeroSection } from "~/components/home/hero-section";
import { ProcessSection } from "~/components/home/process-section";
import { PromiseSection } from "~/components/home/promise-section";
import { ServicesSection } from "~/components/home/services-section";
import { TestimonialsSection } from "~/components/home/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PromiseSection />
      <ProcessSection />
      <ApproachSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <ServicesSection />
    </>
  );
}
