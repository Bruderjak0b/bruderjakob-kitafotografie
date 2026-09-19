export type ProcessStep = {
  title: string;
  /** One-liner for the overview on the home page and the /ablauf intro. */
  summary: string;
  /** Full description, shown in the detailed section on /ablauf. */
  detail: string;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Kennenlernen",
    summary:
      "Wir besprechen Termin und Ablauf, damit für euch alles reibungslos passt.",
    detail:
      "Bevor es losgeht, sprechen wir gemeinsam den Fototermin ab und klären alle Fragen rund um Ablauf und Organisation. Von eurer Seite braucht es dafür nur einen Platz im Freien, um alles Weitere kümmere ich mich. Wenn ihr mir vorab die Vornamen der Kinder schickt, hilft mir das beim Zuordnen der Bilder, nötig ist es aber nicht. So weiß euer Team genau, was am Fototag passiert, und die Kinder können sich schon auf mich freuen.",
  },
  {
    title: "Fototag",
    summary:
      "Die Kinder spielen frei im Garten, ich halte die schönsten Momente fest.",
    detail:
      "Am Fototag komme ich bereits früh in die Einrichtung, damit die Kinder mich in Ruhe kennenlernen können, bevor es losgeht. Ich beginne mit einem kurzen Einzelportrait und einem Gespräch über Lieblingsspielzeug, Alter und Name. Danach spielen die Kinder frei im Garten, während ich weiter fotografiere, so sind sie ganz in ihrem Element und ganz sie selbst. Jedes Kind ist anders, deshalb entstehen viele individuelle Bilder. Gruppenbilder runden den Fototermin ab. Pro Gruppe dauert das Ganze ein bis zwei Stunden, danach läuft der Tag wieder ganz normal weiter, damit der gewohnte Rhythmus der Kita nicht gestört wird.",
  },
  {
    title: "Übergabe",
    summary:
      "Jedes Kind bekommt eine eigene Online-Galerie zur Auswahl und Bestellung.",
    detail:
      "Nach dem Fototermin bereite ich die Bilder professionell auf und erstelle für jedes Kind eine eigene, passwortgeschützte Fotogalerie. Den Zugang bekommen Eltern per E-Mail oder als kleine Zugangskarte, die ihr über die gewohnte Elternpost verteilt. Die Bilder können in Ruhe von zuhause ausgewählt und bestellt werden, Eltern entscheiden frei zwischen Fotoabzügen, digitalen Daten oder beidem. Bestellt und bezahlt wird online: keine Bestelllisten, kein Bargeld im Gruppenraum, keine Mappen, die zurückkommen müssen. Gedruckt wird nur, was wirklich bestellt wird. Die Bestellung geht direkt nach Hause. Besonders beliebt sind meine Fotosets, damit lässt sich im Vergleich zur Einzelbestellung noch mal richtig sparen.",
  },
];
