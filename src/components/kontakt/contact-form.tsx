"use client";

import { CheckIcon, SendIcon } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { useActionState, useId } from "react";

import { submitContactForm } from "~/app/kontakt/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { siteConfig } from "~/config/site";
import {
  contactRoles,
  contactSubjects,
  initialContactFormState,
} from "~/content/contact";
import { cn } from "~/lib/utils";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const formId = useId();

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  if (state.status === "success") {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card sm:p-10 lg:p-12">
        <span className="mb-6 flex size-12 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600">
          <CheckIcon aria-hidden className="size-6" strokeWidth={2.5} />
        </span>
        <h2 className="mb-4 text-2xl font-extrabold lg:text-h3">
          Danke für deine Nachricht
        </h2>
        <p className="text-lg text-muted-foreground">
          Sie ist bei mir angekommen. Ich melde mich innerhalb von zwei Tagen
          bei dir zurück.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      className="flex flex-col gap-8 rounded-3xl bg-white p-6 shadow-card sm:p-10 lg:p-12"
    >
      <div>
        <h2 className="mb-2 text-2xl font-extrabold lg:text-h3">
          Bruderjakob kontaktieren
        </h2>
        <p className="text-muted-foreground">
          Schreib mir gerne, auch wenn du erst einmal nur Fragen hast. Ich melde
          mich innerhalb von zwei Tagen zurück.
        </p>
      </div>

      {state.formError && (
        <p
          role="alert"
          className="rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-destructive"
        >
          {state.formError}
        </p>
      )}

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-sans text-sm font-semibold tracking-[0.06em] text-terracotta-700 uppercase">
          Ich bin…
        </legend>
        <div className="flex flex-wrap gap-3">
          {contactRoles.map((role) => (
            <label
              key={role}
              className="flex cursor-pointer items-center gap-2.5 rounded-sm border border-input px-4 py-3 transition-colors duration-150 hover:border-terracotta-400 has-checked:border-primary has-checked:bg-terracotta-100 has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
            >
              <input
                type="radio"
                name="role"
                value={role}
                defaultChecked={state.values.role === role}
                className="size-4 accent-primary"
              />
              {role}
            </label>
          ))}
        </div>
        <FieldError id={errorId("role")} message={state.errors.role} />
      </fieldset>

      <Field
        label="Thema"
        htmlFor={fieldId("subject")}
        error={state.errors.subject}
        errorId={errorId("subject")}
      >
        <select
          id={fieldId("subject")}
          name="subject"
          defaultValue={state.values.subject || contactSubjects[0]}
          aria-invalid={Boolean(state.errors.subject)}
          aria-describedby={
            state.errors.subject ? errorId("subject") : undefined
          }
          className="h-12 w-full rounded-sm border border-input bg-white px-4 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive"
        >
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          htmlFor={fieldId("name")}
          error={state.errors.name}
          errorId={errorId("name")}
        >
          <Input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            placeholder="Vor- und Nachname"
            defaultValue={state.values.name}
            aria-invalid={Boolean(state.errors.name)}
            aria-describedby={state.errors.name ? errorId("name") : undefined}
          />
        </Field>

        <Field
          label="E-Mail"
          htmlFor={fieldId("email")}
          error={state.errors.email}
          errorId={errorId("email")}
        >
          <Input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@kita.de"
            defaultValue={state.values.email}
            aria-invalid={Boolean(state.errors.email)}
            aria-describedby={state.errors.email ? errorId("email") : undefined}
          />
        </Field>
      </div>

      <Field
        label="Telefonnummer (optional)"
        htmlFor={fieldId("phone")}
        error={state.errors.phone}
        errorId={errorId("phone")}
      >
        <Input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Für Rückfragen"
          defaultValue={state.values.phone}
        />
      </Field>

      <Field
        label="Nachricht"
        htmlFor={fieldId("message")}
        error={state.errors.message}
        errorId={errorId("message")}
      >
        <Textarea
          id={fieldId("message")}
          name="message"
          rows={5}
          placeholder="Wie viele Gruppen habt ihr, und wann würde es passen?"
          defaultValue={state.values.message}
          aria-invalid={Boolean(state.errors.message)}
          aria-describedby={
            state.errors.message ? errorId("message") : undefined
          }
        />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-muted-foreground">
          <input
            type="checkbox"
            name="privacy"
            defaultChecked={state.values.privacy === "on"}
            aria-invalid={Boolean(state.errors.privacy)}
            aria-describedby={
              state.errors.privacy ? errorId("privacy") : undefined
            }
            className="mt-1 size-4 shrink-0 accent-primary"
          />
          <span>
            Ich habe die{" "}
            <Link
              href="/datenschutz"
              target="_blank"
              className="font-semibold text-terracotta-600 underline underline-offset-4 transition-colors duration-150 hover:text-terracotta-700"
            >
              Datenschutzerklärung
              <span className="sr-only"> (öffnet in einem neuen Tab)</span>
            </Link>{" "}
            gelesen und stimme der Verarbeitung meiner Daten zu. (Pflichtfeld)
          </span>
        </label>
        <FieldError id={errorId("privacy")} message={state.errors.privacy} />
      </div>

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? "Wird gesendet…" : "Jetzt kontaktieren"}
          <SendIcon aria-hidden />
        </Button>
        <p className="text-sm text-muted-foreground">
          Lieber direkt?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-semibold break-all text-terracotta-600 underline underline-offset-4 transition-colors duration-150 hover:text-terracotta-700"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className={cn("text-sm font-medium text-destructive")}>
      {message}
    </p>
  );
}
