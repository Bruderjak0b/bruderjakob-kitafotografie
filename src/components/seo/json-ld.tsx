type JsonLdProps = {
  data: Record<string, unknown>;
};

/** Renders schema.org structured data. `<` is escaped to prevent XSS. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped JSON-LD payload
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
