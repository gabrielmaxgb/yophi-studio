import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Prisma, PrismaClient } from "@/generated/prisma/client";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

/** Changes when `prisma generate` adds/removes User columns — busts the HMR singleton. */
const schemaStamp = Object.values(Prisma.UserScalarFieldEnum).join(",");

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaSchemaStamp: string | undefined;
};

function createPrisma() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
  }
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma && globalForPrisma.prismaSchemaStamp === schemaStamp
    ? globalForPrisma.prisma
    : createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaSchemaStamp = schemaStamp;
}
