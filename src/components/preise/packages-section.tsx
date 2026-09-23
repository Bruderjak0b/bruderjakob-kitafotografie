import { CheckIcon, DownloadIcon, TagIcon } from "lucide-react";

import { Container } from "~/components/layout/container";
import { Section, SectionHeader } from "~/components/layout/section";
import {
  digitalPackage,
  pricePackages,
  singlePhotoPrice,
} from "~/content/pricing";
import { cn } from "~/lib/utils";

export function PackagesSection() {
  return (
    <Section id="pakete">
      <Container>
        <SectionHeader
          as="h1"
          eyebrow="Preise"
          title="Diese Pakete stehen zur Auswahl"
          align="left"
        >
          <p>
            Ob einzelnes Foto oder umfangreiches Paket, hier findest du die
            passende Auswahl für eure Erinnerungen. Alle Pakete gibt es sowohl
            gedruckt als auch digital.
          </p>
          <p className="mt-6">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-terracotta-100 px-5 py-2.5 font-heading text-base font-semibold text-terracotta-700">
              <TagIcon aria-hidden className="size-4 shrink-0" />
              Einzelfotos ab {singlePhotoPrice}
            </span>
          </p>
        </SectionHeader>

        {/* Subgrid keeps name, price, description and contents on one baseline
            across all cards, so the packages stay comparable. */}
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pricePackages.map((item) => (
            <li
              key={item.name}
              className={cn(
                "row-span-4 grid grid-rows-[auto_auto_1fr_auto] rounded-3xl p-6 sm:grid-rows-subgrid sm:p-8",
                item.featured ? "bg-terracotta-100" : "bg-white shadow-card",
              )}
            >
              <h2 className="text-2xl font-extrabold lg:text-h3">
                {item.name}
              </h2>
              <p className="mt-1 font-heading text-3xl font-extrabold text-terracotta-600">
                {item.price}
              </p>
              <p className="mt-4 mb-6 text-lg text-muted-foreground">
                {item.description}
              </p>
              <ul className="flex flex-col gap-3 border-t border-ink-200 pt-6 text-muted-foreground">
                {item.contents.map((entry) => (
                  <li key={entry} className="flex gap-3">
                    <CheckIcon
                      aria-hidden
                      className="mt-1 size-4 shrink-0 text-terracotta-600"
                      strokeWidth={2.5}
                    />
                    {entry}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col gap-6 rounded-3xl bg-ink-800 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:p-12">
          <div className="flex gap-5">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-terracotta-500">
              <DownloadIcon aria-hidden className="size-5" />
            </span>
            <div>
              <h2 className="mb-2 font-heading text-sm font-semibold tracking-[0.14em] text-terracotta-300 uppercase">
                {digitalPackage.eyebrow}
              </h2>
              <p className="max-w-xl text-lg text-ink-200">
                {digitalPackage.text}
              </p>
            </div>
          </div>
          <span className="font-heading text-3xl font-extrabold whitespace-nowrap text-terracotta-300 lg:text-h2">
            {digitalPackage.price}
          </span>
        </div>
      </Container>
    </Section>
  );
}
