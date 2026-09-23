import type * as React from "react";

import { cn } from "~/lib/utils";

/**
 * Typography wrapper for the long-form legal pages (Impressum, Datenschutz).
 * These pages are plain running text, so the spacing and heading sizes live
 * here once instead of on every element.
 */
export function LegalProse({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // German legal terms are long compound words ("Wirtschafts-
        // identifikationsnummer") that overflow narrow screens unhyphenated.
        // The document is lang="de", so the browser hyphenates correctly.
        "hyphens-auto break-words text-ink-700",
        "[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink-900",
        "lg:[&_h2]:text-h3",
        "[&_h2:first-child]:mt-0",
        "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink-900",
        "[&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-heading [&_h4]:font-bold [&_h4]:text-ink-900",
        "[&_p]:mt-4 [&_p]:text-pretty",
        "[&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-3 [&_ul]:pl-5",
        "[&_li]:list-disc [&_li]:text-pretty",
        // Links here sit inside running ink-700 text, where the terracotta only
        // reaches 1.13:1 against its surroundings. Colour alone would not mark
        // them, so the legal pages keep the underline the rest of the site drops.
        "[&_a]:font-medium [&_a]:text-terracotta-600 [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-150",
        "[&_a:hover]:text-terracotta-700",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Block of contact or postal details inside a legal page: tighter line height
 * than running text and never broken across lines by the browser.
 */
export function LegalAddress({
  className,
  ...props
}: React.ComponentProps<"address">) {
  return (
    <address
      className={cn("mt-4 leading-relaxed not-italic", className)}
      {...props}
    />
  );
}
