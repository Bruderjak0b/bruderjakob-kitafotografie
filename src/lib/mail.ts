import nodemailer from "nodemailer";

/**
 * SMTP settings come from the environment, never from the client bundle.
 * Local development points at Mailpit (localhost:1025), which accepts every
 * message without credentials and shows it at http://localhost:8025.
 */
function readSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!host || !from || !to) {
    throw new Error(
      "SMTP ist nicht konfiguriert. Es fehlen SMTP_HOST, MAIL_FROM oder MAIL_TO.",
    );
  }

  return {
    host,
    port,
    // Port 465 speaks TLS from the first byte, 587 and 1025 upgrade via STARTTLS.
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: user && password ? { user, pass: password } : undefined,
    from,
    to,
  };
}

export type ContactMail = {
  name: string;
  email: string;
  phone: string;
  role: string;
  subject: string;
  message: string;
};

export async function sendContactMail(data: ContactMail) {
  const config = readSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const lines = [
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Telefon: ${data.phone || "–"}`,
    `Rolle: ${data.role || "–"}`,
    `Thema: ${data.subject}`,
    "",
    data.message,
  ];

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    replyTo: `${data.name} <${data.email}>`,
    subject: `Kontaktformular: ${data.subject} (${data.name})`,
    text: lines.join("\n"),
  });
}
