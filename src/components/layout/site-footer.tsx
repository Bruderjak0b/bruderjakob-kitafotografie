import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

import faultier from "~/assets/brand/faultier.svg";
import { contactNavItem, legalNav, mainNav, siteConfig } from "~/config/site";
import { Container } from "./container";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink-800 pt-18 pb-10 text-terracotta-100">
      <Image
        src={faultier}
        alt=""
        className="absolute -top-8.5 right-6 w-24 lg:right-24 lg:w-28"
      />

      <Container className="flex flex-col gap-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.4fr_1.2fr]">
          <div className="flex flex-col items-start gap-4">
            <Logo className="h-11" />
            <p className="max-w-64 text-sm leading-relaxed text-terracotta-200">
              Natürliche Kitafotografie in Göppingen und Umgebung.
            </p>
          </div>

          <FooterColumn title="Seiten">
            {[...mainNav, contactNavItem].map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Für Eltern">
            <FooterLink href="/#faq">Häufige Fragen</FooterLink>
            <FooterLink href={siteConfig.links.onlineshop}>
              Onlineshop
            </FooterLink>
            <FooterLink href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </FooterLink>
          </FooterColumn>

          <FooterColumn
            title="Bruderimfokus"
            className="lg:border-l lg:border-ink-700 lg:pl-10"
          >
            <p className="text-sm leading-relaxed text-white">
              Familienshootings, Portraits, Hochzeiten und Events.
            </p>
            <Link
              href={siteConfig.links.bruderimfokus}
              className="text-sm font-semibold text-terracotta-300 transition-colors hover:text-terracotta-200"
            >
              Zu Bruderimfokus
            </Link>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 border-t border-ink-700 pt-6 text-[13px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <nav aria-label="Rechtliches" className="flex gap-6">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-terracotta-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="mb-4 text-[13px] font-semibold tracking-wider text-terracotta-300 uppercase">
        {title}
      </h2>
      <div className="flex flex-col items-start gap-3.5">{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const className =
    "text-sm break-words transition-colors hover:text-terracotta-300";

  if (!href.startsWith("/")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
