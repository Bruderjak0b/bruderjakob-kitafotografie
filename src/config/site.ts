export const siteConfig = {
  name: "Bruderjakob Kitafotografie",
  url: "https://bruderjakob-kitafotografie.de",
  shortName: "Bruderjakob",
  description:
    "Natürliche Kitafotografie in Göppingen und Umgebung. Echte Momente aus dem Kita-Alltag – datenschutzkonform, ohne Mehraufwand für die Einrichtung.",
  email: "kontakt@bruderjakob-kitafotografie.de",
  phone: "0152 33934815",
  phoneHref: "tel:+4915233934815",
  /** WhatsApp Business runs on the same number; wa.me needs it without "+" or spaces. */
  whatsapp: {
    label: "WhatsApp",
    href: "https://wa.me/4915233934815?text=Hallo%20Marius%2C%20ich%20habe%20eine%20Frage%20zur%20Kitafotografie%3A%20",
  },
  /** Postal details as published in the Impressum. */
  address: {
    name: "Marius Jakob",
    addition: "Kindergarten Fotografie",
    street: "Ziegelstraße 15",
    postalCode: "73084",
    locality: "Salach",
    /** Postal code and town on one line, as written in a German address block. */
    city: "73084 Salach",
  },
  /**
   * Towns covered, matching the service area of the Google Business profile.
   * Shown in the footer and used for the LocalBusiness structured data.
   */
  areaServed: [
    "Göppingen",
    "Kirchheim unter Teck",
    "Schwäbisch Gmünd",
    "Geislingen an der Steige",
  ],
  /** Wirtschafts-Identifikationsnummer (W-IdNr.). Kleinunternehmer nach § 19 UStG, daher keine USt-IdNr. */
  businessId: "DE446262979",
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
