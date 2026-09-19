import Link from "next/link";
import { getService, PROJECT_STATUSES } from "@/lib/portal/catalog";

type ProjectCardData = {
  id: string;
  name: string;
  slug: string;
  status: string;
  updatedAt: Date;
  services: {
    id: string;
    serviceKey: string;
    customTitle: string | null;
  }[];
  members: {
    user: { name: string; email: string };
  }[];
};

export function statusLabel(status: string) {
  return PROJECT_STATUSES.find((s) => s.key === status)?.label ?? status;
}

export function StudioProjectCard({ project }: { project: ProjectCardData }) {
  const contact = project.members[0]?.user;

  return (
    <Link
      href={`/conta/projetos/${project.id}`}
      className="block border border-line bg-paper/80 p-5 transition-colors hover:border-ink/30"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-xl tracking-wide">{project.name}</h2>
        <span className="shrink-0 text-[0.65rem] tracking-[0.16em] text-stone uppercase">
          {statusLabel(project.status)}
        </span>
      </div>
      <p className="mt-2 text-sm text-ink/55">
        {contact ? `${contact.name} · ${contact.email}` : "Sem contato"}
      </p>
      <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-stone uppercase">
        /{project.slug}
      </p>
      {project.services.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.services.map((service) => (
            <li
              key={service.id}
              className="border border-line px-2 py-1 text-[0.65rem] tracking-[0.12em] uppercase"
            >
              {service.customTitle ||
                getService(service.serviceKey)?.title ||
                service.serviceKey}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}
