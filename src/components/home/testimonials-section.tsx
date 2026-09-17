import { StarIcon } from "lucide-react";

import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import { testimonials } from "~/content/testimonials";

export function TestimonialsSection() {
  return (
    <Section id="stimmen">
      <Container>
        <SectionHeader eyebrow="Stimmen" title="Das sagen Kitas und Eltern" />

        <ul className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.author}>
              <figure className="flex h-full flex-col gap-4 rounded-2xl border p-8">
                <div
                  role="img"
                  aria-label="5 von 5 Sternen"
                  className="flex gap-1 text-primary"
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static decorative list
                    <StarIcon key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="flex-1 text-muted-foreground">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="text-sm">
                  <span className="block font-heading font-semibold">
                    {testimonial.author}
                  </span>
                  <span className="text-muted-foreground">
                    {testimonial.role}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
