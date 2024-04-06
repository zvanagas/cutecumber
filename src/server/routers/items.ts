import { z } from 'zod';
import { publicProcedure } from '../trpc';

export const itemsRouter = {
  getAll: publicProcedure
    .input(
      z
        .object({ q: z.string().nullish(), categoryId: z.number().optional() })
        .nullish()
    )
    .query(async ({ ctx, input }) =>
      ctx.prisma.item.findMany({
        where: {
          name: { contains: input?.q ?? '', mode: 'insensitive' },
          categoryId: input?.categoryId,
        },
        orderBy: {
          name: 'asc',
        },
        include: {
          category: true,
        },
      })
    ),
  getByCategoryId: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ ctx, input }) =>
      ctx.prisma.item.findMany({
        where: { categoryId: input.categoryId },
        orderBy: {
          name: 'asc',
        },
        include: {
          category: true,
        },
      })
    ),
  create: publicProcedure
    .input(z.object({ name: z.string(), categoryId: z.number() }))
    .mutation(({ ctx: { prisma }, input }) =>
      prisma.item.create({
        data: {
          name: input.name,
          categoryId: input.categoryId,
        },
      })
    ),
};
