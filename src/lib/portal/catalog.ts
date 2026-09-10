/**
 * Catálogo = "O que fazemos" no site.
 * Cada serviço libera módulos no dashboard do cliente.
 * customTitle / customBody / customNotes no contrato customizam por cliente.
 */

export const SERVICE_CATALOG = [
  {
    key: "identity",
    title: "Identidade visual e design",
    body: "Logo, paleta, tipo e materiais. A cara da empresa em cartão, site e Instagram.",
    modules: ["status", "brief", "approvals", "archive"] as const,
  },
  {
    key: "content",
    title: "Criação de conteúdo",
    body: "Texto, foto e vídeo prontos pra site, redes e campanha.",
    modules: ["status", "content", "approvals", "requests"] as const,
  },
  {
    key: "social",
    title: "Gestão de redes sociais",
    body: "Planejamento, publicação e atendimento. Instagram no ritmo do negócio.",
    modules: ["status", "content", "requests", "archive"] as const,
  },
  {
    key: "sites",
    title: "Sites",
    body: "Institucional, landing ou loja. No seu domínio.",
    modules: ["status", "brief", "approvals", "archive", "access", "requests"] as const,
  },
  {
    key: "ads",
    title: "Tráfego pago",
    body: "Google e Meta. Anúncio que aponta pra WhatsApp, site ou agendamento.",
    modules: ["status", "archive", "requests"] as const,
  },
  {
    key: "systems",
    title: "Sistemas personalizados",
    body: "Agendamento, área do cliente, catálogo, operação.",
    modules: ["status", "approvals", "access", "requests", "archive"] as const,
  },
] as const;

export type ServiceKey = (typeof SERVICE_CATALOG)[number]["key"];
export type PortalModule =
  (typeof SERVICE_CATALOG)[number]["modules"][number];

export const PROJECT_STATUSES = [
  { key: "BRIEF", label: "Brief" },
  { key: "PRODUCTION", label: "Em produção" },
  { key: "WAITING_CLIENT", label: "Aguardando vocês" },
  { key: "LIVE", label: "No ar" },
  { key: "PAUSED", label: "Pausa" },
] as const;

export type ProjectStatusKey = (typeof PROJECT_STATUSES)[number]["key"];

export function getService(key: string) {
  return SERVICE_CATALOG.find((s) => s.key === key);
}

export function modulesForServices(serviceKeys: string[]): PortalModule[] {
  const set = new Set<PortalModule>();
  for (const key of serviceKeys) {
    const service = getService(key);
    if (!service) continue;
    for (const mod of service.modules) set.add(mod);
  }
  // Base always on for any contracted client
  set.add("status");
  set.add("requests");
  return [...set];
}

export const MODULE_META: Record<
  PortalModule,
  { label: string; description: string }
> = {
  status: {
    label: "Status",
    description: "Onde estamos e o que falta.",
  },
  brief: {
    label: "Brief",
    description: "O que foi combinado.",
  },
  approvals: {
    label: "Aprovações",
    description: "O que pede a sua resposta.",
  },
  archive: {
    label: "Arquivo",
    description: "Links e versões no ar.",
  },
  requests: {
    label: "Pedidos",
    description: "Preciso de X — com prazo.",
  },
  access: {
    label: "Acessos",
    description: "Quem controla o quê.",
  },
  content: {
    label: "Conteúdo",
    description: "Fila do que vai sair.",
  },
};
