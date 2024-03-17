import { z } from 'zod';
import { publicProcedure } from '../trpc';

export const categoriesRouter = {
  getAll: publicProcedure.query(({ ctx: { prisma } }) =>
    prisma.category.findMany()
  ),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx: { prisma }, input: { name } }) =>
      prisma.category.create({
        data: {
          name,
        },
      })
    ),
};
