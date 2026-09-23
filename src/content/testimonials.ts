export type Testimonial = {
  /** One entry per paragraph. */
  quote: string[];
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: [
      "Wir hatten mit unserem 8-jährigen Sohn ein super Shooting mit Marius – locker, unkompliziert und von Anfang an auf einer Wellenlänge.",
      "Marius ist offen, sympathisch und hat gerade mit unserem Sohn einen tollen Draht gefunden. Die Fotos sind natürlich, authentisch und haben unseren Geschmack genau getroffen.",
      "Auch die schnelle Bereitstellung der Bilder war top.",
      "Danke Marius für das tolle Shooting und die schönen Erinnerungen – jederzeit wieder!",
    ],
    author: "Sabrina und Georg",
    role: "Eltern",
  },
  {
    quote: [
      "Wir hatten ein Fotoshooting mit unserem Kind und haben uns von Anfang an wohlgefühlt. Die Atmosphäre war entspannt und angenehm und auch mit unserer Kleinen wurde geduldig und liebevoll umgegangen.",
      "Die Bilder sind super schön geworden und wirken schön natürlich, genau so, wie wir es uns vorgestellt haben. Besonders die Einzelbilder von unserem Kind gefallen uns sehr gut.",
      "Vielen Dank für das schöne Shooting und die tollen Erinnerungen. Wir würden es auf jeden Fall wieder machen und können es nur weiterempfehlen.",
    ],
    author: "Anna und Fabian",
    role: "Eltern",
  },
  {
    quote: [
      "Wir sind unglaublich glücklich mit den wunderschönen Bildern!",
      "Marius hatte von Anfang an ein tolles Gespür für unseren Sohn, ist liebevoll auf ihn eingegangen und hat es geschafft, eine ganz natürliche und entspannte Atmosphäre zu schaffen. Auch wenn unser Kleiner keine große Lust auf Bilder hatte, hat Marius geduldig und mit viel Feingefühl immer wieder das Beste aus der Situation herausgeholt. Das Ergebnis sind wunderschöne, natürliche und ungestellte Bilder, die unseren Sohn genauso zeigen, wie er ist.",
      "Von Herzen vielen Dank für diese wertvollen Erinnerungen!",
    ],
    author: "Corinna und Fabian",
    role: "Eltern",
  },
];
