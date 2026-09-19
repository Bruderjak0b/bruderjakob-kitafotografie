"use server";

import {
  type ContactFormState,
  contactRoles,
  contactSubjects,
} from "~/content/contact";
import { sendContactMail } from "~/lib/mail";

const MAX_MESSAGE_LENGTH = 5000;

function readField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    role: readField(formData, "role"),
    subject: readField(formData, "subject"),
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    message: readField(formData, "message"),
    privacy: formData.get("privacy") === "on" ? "on" : "",
  };

  // Hidden field that humans never see – if it is filled, a bot submitted.
  if (readField(formData, "website")) {
    return { status: "success", errors: {}, values: {} };
  }

  const errors: Record<string, string> = {};

  if (!values.name) {
    errors.name = "Bitte trag deinen Namen ein.";
  }

  if (!values.email) {
    errors.email = "Bitte trag deine E-Mail-Adresse ein.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
  }

  if (!values.message) {
    errors.message = "Bitte schreib mir ein paar Zeilen.";
  } else if (values.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Die Nachricht ist zu lang. Bitte kürze sie etwas.";
  }

  if (
    !contactSubjects.includes(
      values.subject as (typeof contactSubjects)[number],
    )
  ) {
    errors.subject = "Bitte wähle ein Thema aus.";
  }

  if (
    values.role &&
    !contactRoles.includes(values.role as (typeof contactRoles)[number])
  ) {
    errors.role = "Bitte wähle eine der angebotenen Rollen.";
  }

  if (!values.privacy) {
    errors.privacy =
      "Ohne deine Zustimmung darf ich die Daten nicht verarbeiten.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await sendContactMail({
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: values.role,
      subject: values.subject,
      message: values.message,
    });
  } catch (error) {
    console.error("Kontaktformular konnte nicht versendet werden:", error);
    return {
      status: "error",
      errors: {},
      values,
      formError:
        "Die Nachricht konnte gerade nicht verschickt werden. Bitte versuch es später noch einmal oder schreib mir direkt eine E-Mail.",
    };
  }

  return { status: "success", errors: {}, values: {} };
}
