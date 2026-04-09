import { PrismaClient } from '@/generated/prisma/client';
import { AppError } from '@/utils/AppError';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new AppError('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaBetterSqlite3({ url: databaseUrl });

export const prisma = new PrismaClient({
  adapter,
  log: ['query'],
});
