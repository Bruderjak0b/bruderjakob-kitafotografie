import { siteConfig } from "~/config/site";
import { JsonLd } from "./json-ld";

/**
 * Structured data for the business behind the site, mirroring the verified
 * Google Business profile (category "Fotograf", service area instead of a
 * storefront). Rendered once in the root layout; other schemas can reference
 * it by its `@id`. Every value here is also visible on the site itself.
 */
export function LocalBusinessJsonLd() {
  const { address, areaServed, description, email, links, name, phoneHref } =
    siteConfig;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#business`,
        name,
        description,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image.jpg`,
        telephone: phoneHref.replace("tel:", ""),
        email,
        founder: { "@type": "Person", name: address.name },
        address: {
          "@type": "PostalAddress",
          streetAddress: address.street,
          postalCode: address.postalCode,
          addressLocality: address.locality,
          addressRegion: "Baden-Württemberg",
          addressCountry: "DE",
        },
        // The Google profile hides the address and lists a service area instead.
        areaServed: areaServed.map((town) => ({ "@type": "City", name: town })),
        sameAs: [links.bruderimfokus],
      }}
    />
  );
}
