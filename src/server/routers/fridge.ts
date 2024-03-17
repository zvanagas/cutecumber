import { z } from 'zod';
import { publicProcedure } from '../trpc';

export const fridgeRouter = {
  getAll: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.fridge.findMany({
      include: {
        item: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    })
  ),
  save: publicProcedure
    .input(
      z.object({
        items: z.array(z.object({ itemId: z.number(), amount: z.number() })),
      })
    )
    .mutation(async ({ ctx: { prisma }, input }) => {
      const itemIds: number[] = [];
      const itemList = input.items.reduce((acc, curr) => {
        acc[curr.itemId] = curr.amount;
        itemIds.push(curr.itemId);

        return acc;
      }, {} as Record<string, number>);
      const existingItems = await prisma.fridge.findMany({
        where: { itemId: { in: itemIds } },
      });
      const newItems = input.items.filter(
        (item) =>
          !existingItems.some((oldItem) => oldItem.itemId === item.itemId)
      );

      if (existingItems.length > 0) {
        for (const existingItem of existingItems) {
          await prisma.fridge.updateMany({
            data: {
              amount:
                existingItem.amount + (itemList[existingItem.itemId] ?? 0),
            },
            where: { itemId: existingItem.itemId },
          });
        }
      }

      if (newItems.length > 0) {
        await prisma.fridge.createMany({ data: newItems });
      }
    }),
  updateSingle: publicProcedure
    .input(z.object({ id: z.number(), amount: z.number() }))
    .mutation(async ({ ctx: { prisma }, input }) =>
      prisma.fridge.updateMany({
        data: {
          amount: input.amount,
        },
        where: {
          itemId: input.id,
        },
      })
    ),

  deleteSingle: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx: { prisma }, input }) =>
      prisma.fridge.deleteMany({
        where: {
          itemId: input.id,
        },
      })
    ),
};
