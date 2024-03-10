import { z } from 'zod';
import { publicProcedure } from '../trpc';

const itemsRoutes = {
  items: publicProcedure
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
        include: {
          category: true,
        },
      })
    ),
  getItemsByCategoryId: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ ctx, input }) =>
      ctx.prisma.item.findMany({
        where: { categoryId: input.categoryId },
        include: {
          category: true,
        },
      })
    ),
  createItem: publicProcedure
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

export default itemsRoutes;
