import "dotenv/config";
import { hashPassword } from "better-auth/crypto";
import { prisma } from "../src/lib/db";
import { createCredentialUser } from "../src/lib/portal/users";

async function main() {
  const email = (process.env.STUDIO_EMAIL ?? "hello@yophi.studio").toLowerCase();
  const password = process.env.STUDIO_PASSWORD ?? "YophiStudio!ChangeMe";

  if (password.length < 10) {
    throw new Error("STUDIO_PASSWORD must be at least 10 characters.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const passwordHash = await hashPassword(password);
    await prisma.$transaction([
      prisma.user.update({
        where: { id: existing.id },
        data: { role: "STUDIO", banned: false, emailVerified: true, mustChangePassword: false },
      }),
      prisma.account.updateMany({
        where: { userId: existing.id, providerId: "credential" },
        data: { password: passwordHash },
      }),
    ]);
    console.log(`Studio user updated (password synced): ${email}`);
    return;
  }

  await createCredentialUser({
    email,
    name: "YOPHI Studio",
    password,
    role: "STUDIO",
  });

  console.log(`Studio user created: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
