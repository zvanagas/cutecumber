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
  getSingle: publicProcedure.input(z.number()).query(({ ctx, input }) =>
    ctx.prisma.item.findFirst({
      where: {
        id: input,
      },
    })
  ),
  updateSingle: publicProcedure
    .input(
      z.object({ id: z.number(), name: z.string(), categoryId: z.number() })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.item.update({
        data: {
          name: input.name,
          categoryId: input.categoryId,
        },
        where: {
          id: input.id,
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
