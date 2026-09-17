import { FaqList } from "~/components/faq/faq-list";
import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { faqItems } from "~/content/faq";

export function FaqSection() {
  return (
    <Section id="faq" className="lg:pt-0">
      <Container size="narrow">
        <SectionHeader eyebrow="FAQ" title="Häufige Fragen" />
        <FaqList items={faqItems} />
      </Container>
    </Section>
  );
}
