export type ProcessStep = {
  title: string;
  /** One-liner for the overview on the home page and the /ablauf intro. */
  summary: string;
  /** Full description, shown in "Ablauf im Detail" on /ablauf. */
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Kennenlernen",
    summary:
      "Wir besprechen Termin und Ablauf, damit für euch alles reibungslos passt.",
    detail:
      "Bevor es losgeht, sprechen wir gemeinsam den Fototermin ab und klären alle Fragen rund um Ablauf und Organisation. So weiß euer Team genau, was am Fototag passiert, und die Kinder können sich schon auf mich freuen.",
  },
  {
    title: "Fototag",
    summary:
      "Die Kinder spielen frei im Garten, ich halte die schönsten Momente fest.",
    detail:
      "Am Fototag komme ich bereits früh in die Einrichtung. Optimalerweise lernen mich die Kinder direkt kennen, viele erinnern sich sogar vom letzten Jahr noch an mich und es gibt ein freudiges Hallo. Die Kinder spielen frei im Garten, während ich fotografiere, so sind sie ganz in ihrem Element und ganz sie selbst. Jedes Kind ist anders, deshalb entstehen viele individuelle Bilder. Gruppenbilder runden den Fototermin ab. Im Anschluss läuft der Nachmittag wieder ganz normal weiter, damit der gewohnte Rhythmus der Kita nicht gestört wird.",
  },
  {
    title: "Übergabe",
    summary:
      "Jedes Kind bekommt eine eigene Online-Galerie zur Auswahl und Bestellung.",
    detail:
      "Nach dem Fototermin bereite ich die Bilder professionell auf und erstelle für jedes Kind eine eigene, passwortgeschützte Fotogalerie. Die Bilder können in Ruhe von zuhause ausgewählt und bestellt werden. Eltern entscheiden frei, ob sie Fotoabzüge oder digitale Daten möchten, eine Kombination aus beidem ist ebenfalls möglich. Die Bestellung wird direkt nach Hause geliefert. Besonders beliebt sind meine Fotosets, damit lässt sich im Vergleich zur Einzelbestellung noch mal richtig sparen.",
  },
];
