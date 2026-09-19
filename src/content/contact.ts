export const contactSubjects = [
  "Kita-Fotografie anfragen",
  "Familienshooting",
  "Minishooting",
  "Preisliste anfordern",
  "Sonstiges",
] as const;

export const contactRoles = [
  "Erzieher/in",
  "Elternteil",
  "Elternbeirat",
  "Sonstige",
] as const;

export type ContactFormState = {
  status: "idle" | "error" | "success";
  /** Field name -> German error message, rendered below the field. */
  errors: Record<string, string>;
  /** Submitted values, so nothing is lost when validation fails. */
  values: Record<string, string>;
  /** Error message for the whole form, e.g. when sending failed. */
  formError?: string;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  errors: {},
  values: {},
};
