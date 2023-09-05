import { PrismaClient } from '@prisma/client';
import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';

const prisma = new PrismaClient();

export const createTRPCContext = () => ({ prisma });

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: SuperJSON,
});

export const router = t.router;
export const publicProcedure = t.procedure;
