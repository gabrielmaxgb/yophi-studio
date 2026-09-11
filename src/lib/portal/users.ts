import { hashPassword } from "better-auth/crypto";
import { prisma } from "@/lib/db";

/**
 * Creates a credential user without going through public /sign-up.
 * Signup stays disabled — only studio server actions call this.
 */
export async function createCredentialUser(input: {
  email: string;
  name: string;
  password: string;
  role: "STUDIO" | "CLIENT";
}) {
  const email = input.email.trim().toLowerCase();
  const passwordHash = await hashPassword(input.password);
  const isStudio = input.role === "STUDIO";

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        name: input.name.trim(),
        emailVerified: isStudio,
        role: input.role,
        banned: false,
        mustChangePassword: !isStudio,
      },
    });

    await tx.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: "credential",
        password: passwordHash,
      },
    });

    return user;
  });
}
