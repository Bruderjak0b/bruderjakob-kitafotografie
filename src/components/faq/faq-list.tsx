import { PlusIcon } from "lucide-react";

import { JsonLd } from "~/components/seo/json-ld";
import type { FaqItem } from "~/content/faq";
import { cn } from "~/lib/utils";

type FaqListProps = {
  items: FaqItem[];
  /** Group name – only one item per group is open at a time. */
  name?: string;
  className?: string;
};

/**
 * FAQ accordion built on native <details>, so questions and answers are
 * always part of the server-rendered HTML. Includes FAQPage structured data.
 */
export function FaqList({ items, name = "faq", className }: FaqListProps) {
  return (
    <>
      <div className={cn("flex flex-col gap-3", className)}>
        {items.map((item) => (
          <details
            key={item.question}
            name={name}
            className="group rounded-2xl bg-white px-6 shadow-card transition-shadow duration-150 lg:px-8 details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:h-auto"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-semibold transition-colors duration-150 rounded-lg outline-none hover:text-terracotta-600 focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-lg tracking-normal text-pretty">
                {item.question}
              </h3>
              <span
                aria-hidden
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600 transition-colors duration-150 group-open:bg-primary group-open:text-white"
              >
                <PlusIcon className="size-4 transition-transform duration-200 group-open:rotate-45" />
              </span>
            </summary>
            <p className="max-w-3xl pb-7 text-lg text-muted-foreground">
              {item.answer}
            </p>
          </details>
        ))}
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
    </>
  );
}
