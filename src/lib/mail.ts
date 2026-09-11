import { Resend } from "resend";
import { studioEmail } from "@/lib/studio-contact";

export async function sendEmail(input: {
  to: string;
  subject: string;
  text: string;
  html?: string;
  idempotencyKey: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return { ok: false, error: "RESEND_API_KEY missing" };

  const from =
    process.env.CONTACT_FROM?.trim() || `YOPHI <${studioEmail}>`;
  const resend = new Resend(key);
  const { error } = await resend.emails.send(
    {
      from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
    },
    { idempotencyKey: input.idempotencyKey }
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
