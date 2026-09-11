import { magicLink } from "better-auth/plugins";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret || secret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be set (≥32 chars).");
}

const MAGIC_LINK_TTL_SEC = 60 * 60;

function resolveAuthBaseURL() {
  const explicit = process.env.BETTER_AUTH_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const host =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;
  if (host) return `https://${host.replace(/^https?:\/\//, "")}`;
  return "http://localhost:3000";
}

function oneLine(value: string, max = 120) {
  return value.replace(/[\r\n\t]+/g, " ").trim().slice(0, max);
}

async function sendMagicLinkEmail({
  email,
  url,
  metadata,
}: {
  email: string;
  url: string;
  metadata?: Record<string, unknown>;
}) {
  const name =
    typeof metadata?.name === "string" ? oneLine(metadata.name) : "";
  const password =
    typeof metadata?.password === "string" ? metadata.password : "";
  const welcome = Boolean(name && password);

  const text = welcome
    ? [
        `Olá, ${name}.`,
        "",
        "Sua conta na YOPHI está pronta.",
        "",
        `E-mail: ${email}`,
        `Senha provisória: ${password}`,
        "",
        "Confirma o e-mail neste link — ele também te coloca dentro:",
        url,
        "",
        "Na primeira entrada, você troca a senha provisória.",
        "O link vale uma hora. Depois disso, entra com a senha.",
      ].join("\n")
    : [
        "Entra na YOPHI neste link:",
        url,
        "",
        "O link vale uma hora.",
      ].join("\n");

  const stamp = createHash("sha256").update(url).digest("hex").slice(0, 16);

  const result = await sendEmail({
    to: email,
    subject: welcome ? "Sua conta YOPHI" : "Link para entrar — YOPHI",
    text,
    idempotencyKey: welcome
      ? `client-welcome/${email}/${stamp}`
      : `magic-link/${email}/${stamp}`,
  });

  if (!result.ok) {
    throw new Error(result.error);
  }
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret,
  baseURL: resolveAuthBaseURL(),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "CLIENT",
        input: false,
      },
      banned: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      mustChangePassword: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 20,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  plugins: [
    magicLink({
      expiresIn: MAGIC_LINK_TTL_SEC,
      disableSignUp: true,
      rateLimit: { window: 60, max: 5 },
      sendMagicLink: async ({ email, url, metadata }) => {
        await sendMagicLinkEmail({ email, url, metadata });
      },
    }),
    nextCookies(),
  ],
});

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: "STUDIO" | "CLIENT";
  banned?: boolean;
  emailVerified: boolean;
  mustChangePassword: boolean;
};
