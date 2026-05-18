import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";
import { serverEnv } from "../lib/env/server.env";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: serverEnv.DATABASE_URL,
    }),
  });

if (serverEnv.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
