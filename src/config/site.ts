export const siteConfig = {
  name: "Bruderjakob Kitafotografie",
  shortName: "Bruderjakob",
  description:
    "Natürliche Kitafotografie in Göppingen und Umgebung. Echte Momente aus dem Kita-Alltag – datenschutzkonform, ohne Mehraufwand für die Einrichtung.",
  email: "info@bruderjakob-kitafotografie.de",
  links: {
    // TODO: echte URLs eintragen
    bruderimfokus: "#",
    onlineshop: "#",
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
