export type AboutSection = {
  title: string;
  paragraphs: string[];
};

/** Opening paragraph, also the start of the teaser on the home page. */
export const aboutLead =
  "Die Kindheit vergeht schneller, als man denkt. Was heute ein Lieblingsspruch, ein Lieblingsspiel oder eine bestimmte Art zu lachen ist, kann in ein paar Wochen schon verschwunden sein. Deshalb liebe ich es, genau diese flüchtigen Momente festzuhalten, bevor sie vorbei sind.";

export const aboutSections: AboutSection[] = [
  {
    title: "Wie ich zum Fotografieren kam",
    paragraphs: [
      "Meine erste Kamera habe ich mir für Reisen gekauft. Ziemlich schnell habe ich eine Leidenschaft dafür entwickelt. Die Kombination aus technischem Verständnis, kreativer Bildkomposition und dem Kontakt zu Menschen erfüllt mich. Seit 2022 fotografiere ich regelmäßig, vor allem Familien, Paare, Events und Hochzeiten. Dabei sorge ich dafür, dass die Menschen vor der Kamera sie selbst sein können und dadurch natürliche Momentaufnahmen entstehen.",
      "Ich habe Design studiert und fünf Jahre in dem Beruf gearbeitet, daher kommt mein Blick für Bildaufbau und Licht. Den Umgang mit Kindern habe ich in meinem freiwilligen sozialen Jahr gelernt. Dabei habe ich ein Inklusionskind durch die erste Klasse begleitet. Was ich dort über Geduld und Verantwortung gelernt habe, hilft mir heute mehr als jede Kameraeinstellung.",
      "In Kitas fotografiere ich, weil mich die Arbeit mit Kindern am meisten reizt. Kinder stellen sich nicht in Pose. Ihre Persönlichkeiten sind noch nicht ganz entwickelt und somit auch nicht verfälscht, und genau das macht die Bilder gut.",
    ],
  },
  {
    title: "So läuft ein Fototag bei mir",
    paragraphs: [
      "Ich setze kein Kind vor die Kamera, das mich noch nicht kennt. Wir reden erst kurz über Lieblingsspielzeug, Alter und Namen. Dann fotografiere ich, wie das Kind an diesem Tag eben ist. Deshalb sieht bei mir auch nicht jedes Bild gleich aus.",
      "Ich arbeite nur mit dem Licht, das da ist, und mit den Spielgeräten, die die Kinder ohnehin jeden Tag benutzen. Kein Blitz, kein Studiohintergrund, keine extra aufgebaute Kulisse. Man sieht den Bildern an, wo sie entstanden sind. In eurem Garten, an eurem Klettergerüst, an einem ganz normalen Vormittag.",
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
