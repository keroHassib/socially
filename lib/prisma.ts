// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as {
  prisma?: PrismaClient;
  connectionPool?: Pool;
};

// Create a connection pool
const connectionPool =
  globalForPrisma.connectionPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });

// Create the adapter
const adapter = new PrismaPg(connectionPool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.connectionPool = connectionPool;
}
