export type PricePackage = {
  name: string;
  price: string;
  description: string;
  contents: string[];
  /** The most extensive package, shown in the accent colour. */
  featured?: boolean;
  /** Short highlight label shown next to the package name. */
  badge?: string;
  /** Price reaches the free-shipping threshold on its own. */
  freeShipping?: boolean;
};

export const singlePhotoPrice = "5,90 €";

export const singleDownloadPrice = "9,90 €";

/** Charged per order, so siblings ordered together pay it only once. */
export const shippingPrice = "4,90 €";

export const freeShippingFrom = "50 €";

export const groupPhotoGift = "Gruppenbild für jedes Kind geschenkt";

export const pricePackages: PricePackage[] = [
  {
    name: "Klassik",
    price: "24,90 €",
    description:
      "Der perfekte Einstieg, ideal für alle, die ein paar schöne Abzüge zum Verschenken oder Aufhängen suchen.",
    contents: [
      "1x 10x15 Abzüge: Premium Matt",
      "2x 13x19 Abzüge: Premium Matt",
      "1x 15x20 Abzüge: Premium Matt",
      "1x Klebebilder (Sticker) 16er-Set Matt",
    ],
  },
  {
    name: "Super",
    price: "39,90 €",
    description:
      "Für alle, die mehr Auswahl möchten, mit Abzügen in verschiedenen Formaten und einem Download inklusive.",
    contents: [
      "3x 10x15 Abzüge: Premium Matt",
      "3x 13x19 Abzüge: Premium Matt",
      "1x 15x20 Abzüge: Premium Matt",
      "1x 4er-Fotoset 6x9 Matt",
      "1x Klebebilder (Sticker) 16er-Set Matt",
      "1x Fotodownload Originalgröße",
    ],
  },
  {
    name: "Premium",
    price: "79,90 €",
    description:
      "Die umfangreichste Variante mit hochwertigen Silk-Abzügen und dazu allen Fotos deines Kindes als Download.",
    featured: true,
    badge: "Beliebtestes Paket",
    freeShipping: true,
    contents: [
      "4x 10x15 Abzüge: Premium Silk",
      "6x 13x19 Abzüge: Premium Silk",
      "2x 15x20 Abzüge: Premium Silk",
      "1x Magnetsticker 4er-Set Matt",
      "1x Klebebilder (Sticker) 16er-Set Matt",
      "1x 4er-Fotoset 6x9 Matt",
      "Alle Fotos als Download in Originalgröße",
    ],
  },
  {
    name: "Geschwister",
    price: "54,90 €",
    freeShipping: true,
    description:
      "Für Familien mit mehreren Kindern in der Kita. Ihr wählt frei aus den Einzelbildern aller Kinder und den Geschwisterfotos, alles in einer Bestellung.",
    contents: [
      "2x 10x15 Abzüge: Premium Matt",
      "4x 13x19 Abzüge: Premium Matt",
      "3x 15x20 Abzüge: Premium Matt",
      "2x Klebebilder (Sticker) 16er-Set Matt",
      "1x Fotodownload Originalgröße",
    ],
  },
];

export const digitalPackage = {
  eyebrow: "Alles digital",
  text: `Wer alle Fotos als Download möchte, bekommt das komplette Paket. Einzelne Downloads gibt es für je ${singleDownloadPrice}.`,
  price: "69,90 €",
};
