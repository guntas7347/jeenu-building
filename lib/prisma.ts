import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../prisma/generated/client";
import env from "./env";

const pool = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: pool });

const globalForPrisma = global as unknown as { prisma: typeof prisma };

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
