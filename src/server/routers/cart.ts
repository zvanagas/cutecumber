import { z } from 'zod';
import { publicProcedure } from '../trpc';

const cartRoutes = {
  cart: publicProcedure
    .input(z.object({ cartId: z.number() }))
    .query(async ({ ctx: { prisma }, input: { cartId } }) =>
      prisma.cart.findMany({
        where: { cartId, isClosed: false },
        orderBy: [{ id: 'asc' }, { cartId: 'desc' }],
        include: {
          item: {
            include: {
              category: true,
            },
          },
        },
      })
    ),
  latestCart: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.cart.findMany({
      where: { isClosed: false },
      orderBy: [{ id: 'asc' }, { cartId: 'desc' }],
      include: {
        item: {
          include: {
            category: true,
          },
        },
      },
    })
  ),
  latestCartId: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.cart.findFirst({
      select: { cartId: true },
      where: { isClosed: false },
      orderBy: [{ id: 'asc' }, { cartId: 'desc' }],
    })
  ),
  removeFromCart: publicProcedure
    .input(z.object({ cartId: z.number(), itemId: z.number() }))
    .mutation(({ ctx: { prisma }, input: { cartId, itemId } }) =>
      prisma.cart.deleteMany({
        where: { cartId, itemId },
      })
    ),
  addToCart: publicProcedure
    .input(
      z.object({
        items: z.array(z.object({ itemId: z.number(), amount: z.number() })),
        createNewCart: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { items } }) => {
      const latestOpenCart = await prisma.cart.findFirst({
        where: { isClosed: false },
        orderBy: { cartId: 'desc' },
      });
      const latestClosedCart = await prisma.cart.findFirst({
        where: { isClosed: true },
        orderBy: { cartId: 'desc' },
      });

      const cartId =
        latestOpenCart?.cartId ?? (latestClosedCart?.id ?? 0) + 1 ?? 1;

      for (const item of items) {
        await prisma.cart.create({
          data: {
            cartId,
            itemId: item.itemId,
            isClosed: false,
            amount: item.amount,
          },
        });
      }
    }),
  updateItemAmount: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        itemId: z.number(),
        amount: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input }) =>
      prisma.cart.updateMany({
        where: { cartId: input.cartId, itemId: input.itemId },
        data: { amount: input.amount },
      })
    ),
  togglePickUp: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        itemId: z.number(),
        isPickedUp: z.boolean(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { cartId, itemId, isPickedUp } }) =>
      prisma.cart.updateMany({
        where: { cartId, itemId },
        data: { isPickedUp },
      })
    ),
};

export default cartRoutes;
