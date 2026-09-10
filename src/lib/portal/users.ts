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

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        name: input.name.trim(),
        emailVerified: true,
        role: input.role,
        banned: false,
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
