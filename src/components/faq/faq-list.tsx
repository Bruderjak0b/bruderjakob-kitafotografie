import { MinusIcon, PlusIcon } from "lucide-react";

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
      <div className={cn("border-t", className)}>
        {items.map((item) => (
          <details
            key={item.question}
            name={name}
            className="group border-b details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 open:details-content:h-auto"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-5 text-left font-semibold transition-colors outline-none hover:text-terracotta-600 focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-base text-pretty">
                {item.question}
              </h3>
              <PlusIcon
                aria-hidden
                className="size-5 shrink-0 text-primary group-open:hidden"
              />
              <MinusIcon
                aria-hidden
                className="hidden size-5 shrink-0 text-primary group-open:block"
              />
            </summary>
            <p className="pb-5 text-muted-foreground">{item.answer}</p>
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
