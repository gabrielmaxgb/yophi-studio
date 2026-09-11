import { z } from "zod";
import type { ServiceKey } from "@/lib/portal/catalog";
import { SERVICE_CATALOG } from "@/lib/portal/catalog";

const serviceKeys = SERVICE_CATALOG.map((s) => s.key) as [
  ServiceKey,
  ...ServiceKey[],
];

/** Only http(s) — blocks javascript: / data: open redirects. */
export const safeHttpUrl = z
  .string()
  .trim()
  .url("URL inválida.")
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  }, "URL deve ser http ou https.");

const contractedServiceSchema = z.object({
  serviceKey: z.enum(serviceKeys),
  customTitle: z.string().trim().max(120).optional(),
  customBody: z.string().trim().max(500).optional(),
  customNotes: z.string().trim().max(2000).optional(),
});

export const createClientSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Nome curto demais.")
    .max(120, "Nome longo demais."),
  contactName: z.string().trim().min(2).max(120),
  contactEmail: z.string().trim().email("E-mail obrigatório.").toLowerCase(),
  services: z
    .array(contractedServiceSchema)
    .min(1, "Selecione ao menos um serviço.")
    .superRefine((services, ctx) => {
      const keys = services.map((s) => s.serviceKey);
      if (new Set(keys).size !== keys.length) {
        ctx.addIssue({
          code: "custom",
          message: "Serviço duplicado no contrato.",
        });
      }
    }),
});

export const updateServicesSchema = z.object({
  projectId: z.string().cuid(),
  services: z
    .array(contractedServiceSchema)
    .min(1, "Selecione ao menos um serviço.")
    .superRefine((services, ctx) => {
      const keys = services.map((s) => s.serviceKey);
      if (new Set(keys).size !== keys.length) {
        ctx.addIssue({
          code: "custom",
          message: "Serviço duplicado no contrato.",
        });
      }
    }),
});

export const updateStatusSchema = z.object({
  projectId: z.string().cuid(),
  status: z.enum([
    "BRIEF",
    "PRODUCTION",
    "WAITING_CLIENT",
    "LIVE",
    "PAUSED",
  ]),
  statusNow: z.string().trim().max(280),
  statusWaiting: z.string().trim().max(280),
  statusNext: z.string().trim().max(280),
  statusDueAt: z.string().max(40).optional().or(z.literal("")),
});

export const updateBriefSchema = z.object({
  projectId: z.string().cuid(),
  briefAudience: z.string().trim().max(1000),
  briefTone: z.string().trim().max(1000),
  briefDo: z.string().trim().max(2000),
  briefDont: z.string().trim().max(2000),
});

export const createApprovalSchema = z.object({
  projectId: z.string().cuid(),
  title: z.string().trim().min(2).max(160),
  kind: z.enum(["TEXT", "LAYOUT", "SITE", "OTHER"]),
  body: z.string().trim().max(4000).optional(),
  previewUrl: z
    .union([safeHttpUrl, z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
});

export const respondApprovalSchema = z.object({
  approvalId: z.string().cuid(),
  decision: z.enum(["APPROVED", "CHANGES"]),
  clientNote: z.string().trim().max(1000).optional(),
});

export const createRequestSchema = z.object({
  projectId: z.string().cuid(),
  title: z.string().trim().min(2).max(160),
  body: z.string().trim().max(2000).optional(),
  priority: z.enum(["NORMAL", "URGENT"]).default("NORMAL"),
  dueAt: z.string().datetime().optional().or(z.literal("")),
});

export const createAssetSchema = z.object({
  projectId: z.string().cuid(),
  label: z.string().trim().min(1).max(120),
  url: safeHttpUrl,
  kind: z.enum(["SITE", "DOMAIN", "SOCIAL", "FILE", "OTHER"]),
  status: z.enum(["LIVE", "DRAFT", "APPROVED"]).default("LIVE"),
});

export const createAccessSchema = z.object({
  projectId: z.string().cuid(),
  label: z.string().trim().min(1).max(120),
  holder: z.string().trim().max(160),
  status: z.enum(["OK", "MISSING", "PENDING"]),
  notes: z.string().trim().max(500).optional(),
});

export const createContentSchema = z.object({
  projectId: z.string().cuid(),
  title: z.string().trim().min(1).max(160),
  channel: z.string().trim().max(80),
  status: z.enum([
    "DRAFT",
    "WAITING_CLIENT",
    "APPROVED",
    "PUBLISHED",
    "PAUSED",
  ]),
  scheduledAt: z.string().datetime().optional().or(z.literal("")),
});

export const officialPasswordSchema = z
  .object({
    password: z
      .string()
      .min(10, "Senha: mínimo 10 caracteres.")
      .max(128),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "As senhas não batem.",
    path: ["confirm"],
  });

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}
