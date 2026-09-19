import { StudioShell } from "@/components/portal/studio-shell";
import { requireUser } from "@/lib/portal/session";

export const metadata = {
  title: "Conta",
  robots: { index: false, follow: false },
};

export default async function ContaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser({ allowPendingPassword: true });

  if (user.role === "STUDIO") {
    return <StudioShell user={user}>{children}</StudioShell>;
  }

  return children;
}
