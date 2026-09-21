export type AboutSection = {
  title: string;
  paragraphs: string[];
};

/** Opening paragraph, also the start of the teaser on the home page. */
export const aboutLead =
  "Die Kindheit vergeht schneller, als man denkt. Deshalb liebe ich es, genau diese flüchtigen Momente festzuhalten, bevor sie vorbei sind. Was heute ein Lieblingsspruch, ein Lieblingsspiel oder eine bestimmte Art zu lachen ist, kann in ein paar Wochen schon verschwunden sein.";

export const aboutSections: AboutSection[] = [
  {
    title: "Vom Design zur Kamera",
    paragraphs: [
      "Zur Fotografie kam ich über einen Umweg: Ich habe Design studiert und fünf Jahre in dem Beruf gearbeitet. Daher kommt mein Blick für Bildaufbau und Licht. Den Umgang mit Kindern habe ich woanders gelernt: In meinem freiwilligen sozialen Jahr habe ich ein Inklusionskind durch die erste Klasse begleitet, jeden Tag. Was ich dort über Geduld und Verantwortung gelernt habe, hilft mir heute mehr als jede Kameraeinstellung.",
    ],
  },
  {
    title: "So läuft ein Fototag bei mir",
    paragraphs: [
      "Ich setze kein Kind vor die Kamera, das mich noch nicht kennt. Wir reden erst kurz über Lieblingsspielzeug, Alter und Namen. Dann fotografiere ich, wie das Kind an diesem Tag eben ist. Deshalb sieht bei mir auch nicht jedes Bild gleich aus.",
      "Ich arbeite nur mit dem Licht, das da ist, und mit den Spielgeräten, die die Kinder ohnehin jeden Tag benutzen. Kein Blitz, kein Studiohintergrund, keine extra aufgebaute Kulisse. Man sieht den Bildern an, wo sie entstanden sind: in eurem Garten, an eurem Klettergerüst, an einem ganz normalen Vormittag.",
    ],
  },
  {
    title: "Für euch im Kita-Team",
    paragraphs: [
      "Genauso wichtig wie die Bilder ist mir, dass bei euch nichts hängen bleibt. Anmeldung, Einverständniserklärungen, Galerien und Bestellungen laufen vollständig über mich, datenschutzkonform und ohne Listen, Bargeld oder Mappen im Gruppenraum. Eltern mit Fragen wenden sich direkt an mich, nicht an euch.",
    ],
  },
];

/** Closing paragraph, stands above the contact button. */
export const aboutClosing =
  "Ich bin im Kreis Göppingen zu Hause und fotografiere Kitas in der Umgebung. Wenn du wissen möchtest, ob ein Termin bei euch passt, schreib mir einfach. Ich melde mich innerhalb von zwei Tagen zurück.";

/** Teaser on the home page: the lead plus how I got to photography. */
export const aboutTeaser: string[] = [
  aboutLead,
  aboutSections[0].paragraphs[0],
];
