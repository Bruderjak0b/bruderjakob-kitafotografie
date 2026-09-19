export type PricePackage = {
  name: string;
  price: string;
  description: string;
  contents: string[];
  /** The most extensive package, shown in the accent colour. */
  featured?: boolean;
};

export const singlePhotoPrice = "5,90 €";

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
      "Die umfangreichste Variante mit hochwertigen Silk-Abzügen und mehreren Downloads, für alle, die keine Kompromisse eingehen wollen.",
    featured: true,
    contents: [
      "4x 10x15 Abzüge: Premium Silk",
      "6x 13x19 Abzüge: Premium Silk",
      "2x 15x20 Abzüge: Premium Silk",
      "1x Magnetsticker 4er-Set Matt",
      "1x Klebebilder (Sticker) 16er-Set Matt",
      "1x 4er-Fotoset 6x9 Matt",
      "3x Fotodownload Originalgröße",
    ],
  },
  {
    name: "Geschwister",
    price: "69,90 €",
    description:
      "Für Familien mit mehreren Kindern, inklusive Einzelbildern jedes Kindes und einem gemeinsamen Geschwisterfoto, zu einem günstigeren Preis als zwei Einzelpakete.",
    contents: [
      "2x 10x15 Abzüge: Premium Matt (je Kind)",
      "2x 13x19 Abzüge: Premium Matt (je Kind)",
      "1x 15x20 Abzüge: Premium Matt (gemeinsames Geschwisterfoto)",
      "1x Klebebilder (Sticker) 16er-Set Matt (je Kind)",
      "1x Fotodownload Originalgröße (gemeinsames Geschwisterfoto)",
    ],
  },
];

export const digitalPackage = {
  eyebrow: "Alles digital",
  text: "Wer alle Fotos als Download möchte, bekommt das komplette Paket.",
  price: "69,90 €",
};
