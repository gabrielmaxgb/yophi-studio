"use server";

import { createHash } from "node:crypto";
import { Resend } from "resend";
import { z } from "zod";
import { studioEmail } from "@/lib/studio-contact";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160).toLowerCase(),
  presence: z.string().trim().min(2).max(400),
  trap: z.string().optional(),
});

export type ContactResult =
  | { status: "sent" }
  | { status: "mailto"; href: string }
  | { status: "error"; message: string };

function mailtoHref(data: {
  name: string;
  email: string;
  presence: string;
}) {
  const subject = encodeURIComponent(`Conversa — ${data.name}`);
  const body = encodeURIComponent(
    `${data.name}\n${data.email}\n\n${data.presence}`
  );
  return `mailto:${studioEmail}?subject=${subject}&body=${body}`;
}

export async function sendContact(input: unknown): Promise<ContactResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: "Confere os campos." };
  }

  // Honeypot — treat as success so bots don't retry.
  if (parsed.data.trap) return { status: "sent" };

  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) {
    return { status: "mailto", href: mailtoHref(parsed.data) };
  }

  const to = process.env.CONTACT_TO?.trim() || studioEmail;
  const from =
    process.env.CONTACT_FROM?.trim() || `YOPHI <${studioEmail}>`;
  const stamp = createHash("sha256")
    .update(`${parsed.data.email}:${parsed.data.presence}`)
    .digest("hex")
    .slice(0, 24);

  const resend = new Resend(key);
  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: parsed.data.email,
      subject: `Conversa — ${parsed.data.name}`,
      text: [
        parsed.data.name,
        parsed.data.email,
        "",
        parsed.data.presence,
      ].join("\n"),
    },
    { idempotencyKey: `contact/${stamp}` }
  );

  if (error) {
    return { status: "mailto", href: mailtoHref(parsed.data) };
  }

  return { status: "sent" };
}
