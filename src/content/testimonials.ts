export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

// TODO: Platzhalter aus dem Prototyp – vor dem Livegang durch echte Stimmen ersetzen
export const testimonials: Testimonial[] = [
  {
    quote:
      "Marius war früh da, hat sich in Ruhe vorgestellt und dann einfach mitgespielt. Für uns im Team gab es keinen Mehraufwand: keine Listen, kein Bargeld, keine Mappen. Die Eltern haben sich direkt bei ihm gemeldet.",
    author: "Sabine K.",
    role: "Kita-Leitung, Göppingen",
  },
  {
    quote:
      "Wir haben unsere Tochter auf den Bildern sofort erkannt, so wie sie wirklich ist. Kein steifes Lächeln, sondern mitten im Spielen. Die Auswahl zuhause in Ruhe treffen zu können, war angenehm.",
    author: "Familie Braun",
    role: "Eltern",
  },
  {
    quote:
      "Auch die Krippenkinder sind ruhig geblieben, weil der Morgenkreis normal weiterlief. Die Portraits unserer Erzieherinnen und die Aufnahmen vom Haus nutzen wir jetzt für unsere Konzeption.",
    author: "Melanie R.",
    role: "Kita-Leitung, Kreis Göppingen",
  },
];
