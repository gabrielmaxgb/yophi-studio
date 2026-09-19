import { CreateClientForm } from "@/components/portal/create-client-form";
import { StudioPageIntro } from "@/components/portal/studio-shell";
import { requireStudioPage } from "@/lib/portal/session";

export const metadata = {
  title: "Novo cliente",
  robots: { index: false, follow: false },
};

export default async function NovoClientePage() {
  await requireStudioPage();

  return (
    <div>
      <StudioPageIntro eyebrow="Clientes" title="Novo cliente">
        Empresa, contato e o que entra no contrato. Isso abre a conta deles.
      </StudioPageIntro>
      <CreateClientForm />
    </div>
  );
}
