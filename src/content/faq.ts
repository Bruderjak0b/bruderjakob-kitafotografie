export type FaqItem = {
  question: string;
  answer: string;
};

// TODO: Preise in "Was kosten die Fotos?" final festlegen (X € / Y €)
export const faqItems: FaqItem[] = [
  {
    question: "Sind Kindergartenfotos DSGVO-konform?",
    answer:
      "Datenschutz ist mir besonders wichtig, gerade wenn es um Kinder geht. Deshalb arbeite ich ausschließlich über Fotograf.de, eine deutsche Plattform mit Servern in Deutschland, sicherer Zahlungsabwicklung und vollständiger DSGVO-Konformität. Fotografiert wird grundsätzlich nur, wenn die Eltern ihr Einverständnis gegeben haben, das gilt auch für Gruppenfotos. Einrichtungen und Eltern müssen sich um den Datenschutz also keine Gedanken machen.",
  },
  {
    question: "Was ziehe ich meinem Kind am besten an?",
    answer:
      "Bei mir darf jedes Kind anziehen, was es möchte, denn genau das macht die Fotos später so echt. Getobt wird nach Herzenslust, da sind Festtagskleidung oder feine Anzüge eher hinderlich. Aus fotografischer Erfahrung empfehle ich Kleidung in ruhigen, eher gedeckten Tönen, denn knallige Shirts mit großen Motiven, egal ob Paw Patrol oder Disney, lenken den Blick schnell vom Gesicht deines Kindes weg. Und noch ein Tipp für den Sommer: Trägt dein Kind ein Kleid oder einen Rock, würde ich eine kurze Hose drunterziehen, dann ist beim Toben und Herumspringen nichts zu sehen, was nicht sein muss.",
  },
  {
    question: "Was passiert bei Regen?",
    answer:
      "Auch bei Regenwetter entstehen tolle Fotos! Im echten Kita-Alltag scheint schließlich auch nicht immer die Sonne. Solange es nicht zu stark regnet oder stürmt, bringe ich Regenschirme mit und bitte die Kinder, ihre Gummistiefel anzuziehen. Am liebsten fotografiere ich nämlich draußen.",
  },
  {
    question: "Was kosten die Fotos?",
    answer:
      "Für die Einrichtung entstehen keine Kosten. Eltern zahlen erst, wenn sie die fertigen Bilder gesehen haben und etwas bestellen möchten – kein Vorabgeld, keine Mindestbestellmenge. Einzelne Bilder könnt ihr schon ab X € kaufen. Die Pakete starten ab Y €.",
  },
  {
    question: "Wie lange dauert es, bis unsere Fotos verfügbar sind?",
    answer:
      "Die Fotos stehen in der Regel etwa zwei Wochen nach dem Fototag online bereit. Sobald es soweit ist, bekommst du eine Benachrichtigung und kannst deine Bestellung ganz entspannt von zu Hause aus machen.",
  },
  {
    question: "Gibt es Geschwister- oder Freund:innenfotos?",
    answer:
      "Klar, Geschwisterfotos sind bei mir kein Problem! Meldet das am besten gleich bei der Online-Registrierung mit an, wenn ihr eure Kinder für den Fototag anmeldet. Dort werdet ihr gefragt, ob ihr Geschwister- oder Freund:innenfotos möchtet und wer das Geschwisterkind bzw. die Freundin oder der Freund ist.",
  },
];
