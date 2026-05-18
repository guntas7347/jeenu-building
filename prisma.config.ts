import { serverEnv } from "./lib/env/server.env";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: serverEnv.DATABASE_URL,
  },
});
