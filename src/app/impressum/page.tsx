import type { Metadata } from "next";

import { Container } from "~/components/layout/container";
import { PageHero } from "~/components/layout/page-hero";
import { Section } from "~/components/layout/section";
import { LegalAddress, LegalProse } from "~/components/legal/legal-prose";
import { siteConfig } from "~/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Anbieterkennzeichnung nach § 5 DDG: Name, Anschrift und Kontaktdaten von Marius Jakob, Kindergarten Fotografie in Salach.",
  alternates: { canonical: "/impressum" },
};

const { address, email, phone, phoneHref, businessId } = siteConfig;

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        className="hyphens-auto"
        eyebrow="Rechtliches"
        title="Impressum"
      />

      <Section>
        <Container size="prose">
          <LegalProse>
            <h2>Angaben gemäß § 5 DDG</h2>
            <LegalAddress>
              {address.name}
              <br />
              {address.addition}
              <br />
              {address.street}
              <br />
              {address.city}
            </LegalAddress>

            <h2>Kontakt</h2>
            <LegalAddress>
              Telefon: <a href={phoneHref}>{phone}</a>
              <br />
              E-Mail: <a href={`mailto:${email}`}>{email}</a>
            </LegalAddress>

            <h2>Wirtschaftsidentifikationsnummer</h2>
            <p>{businessId}</p>

            <h2>Verbraucherstreitbeilegung und Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>

            <h2>
              Zentrale Kontaktstelle nach dem Digital Services Act (DSA,
              Verordnung (EU) 2022/2065)
            </h2>
            <p>
              Unsere zentrale Kontaktstelle für Nutzer und Behörden nach Art.
              11, 12 DSA erreichen Sie wie folgt:
            </p>
            <LegalAddress>
              E-Mail: <a href={`mailto:${email}`}>{email}</a>
              <br />
              Telefon: <a href={phoneHref}>{phone}</a>
            </LegalAddress>
            <p>
              Die für den Kontakt zur Verfügung stehenden Sprachen sind:
              Deutsch, Englisch.
            </p>

            <p className="text-sm">
              Quelle:{" "}
              <a
                href="https://www.e-recht24.de/impressum-generator.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Impressum-Generator von e-recht24.de
              </a>
            </p>
          </LegalProse>
        </Container>
      </Section>
    </>
  );
}
