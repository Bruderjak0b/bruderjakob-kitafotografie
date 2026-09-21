export const siteConfig = {
  name: "Bruderjakob Kitafotografie",
  shortName: "Bruderjakob",
  description:
    "Natürliche Kitafotografie in Göppingen und Umgebung. Echte Momente aus dem Kita-Alltag – datenschutzkonform, ohne Mehraufwand für die Einrichtung.",
  email: "kontakt@bruderjakob-kitafotografie.de",
  phone: "0152 33934815",
  phoneHref: "tel:+4915233934815",
  /** Postal details as published in the Impressum. */
  address: {
    name: "Marius Jakob",
    addition: "Kindergarten Fotografie",
    street: "Ziegelstraße 15",
    city: "73084 Salach",
  },
  vatId: "DE446262979",
  links: {
    bruderimfokus: "https://www.instagram.com/bruderimfokus/",
    onlineshop: "https://marius-jakob-202.fotograf.de/login",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Ablauf", href: "/ablauf" },
  { label: "Preise", href: "/preise" },
];

export const contactNavItem: NavItem = { label: "Kontakt", href: "/kontakt" };

export const legalNav: NavItem[] = [
  { label: "Datenschutzerklärung", href: "/datenschutz" },
  { label: "Impressum", href: "/impressum" },
];
