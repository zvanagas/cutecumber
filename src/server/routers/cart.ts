import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const cartRouter = {
  getSingle: publicProcedure
    .input(z.object({ cartId: z.number() }))
    .query(async ({ ctx: { prisma }, input: { cartId } }) =>
      prisma.cart.findFirst({
        where: { id: cartId, isClosed: false },
        orderBy: [{ id: 'desc' }],
        include: {
          items: {
            include: {
              item: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
      })
    ),
  getLatest: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.cart.findFirst({
      where: { isClosed: false },
      orderBy: [{ id: 'desc' }],
      include: {
        items: {
          include: {
            item: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    })
  ),
  getLatestId: publicProcedure.query(async ({ ctx: { prisma } }) =>
    prisma.cart.findFirst({
      select: { id: true },
      where: { isClosed: false },
      orderBy: [{ id: 'desc' }],
    })
  ),
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx: { prisma }, input: { name } }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user.id) {
        return;
      }

      return prisma.cart.create({
        data: {
          name,
          ownerId: session.user.id,
        },
      });
    }),
  removeSingle: publicProcedure
    .input(z.object({ cartId: z.number(), itemId: z.number() }))
    .mutation(({ ctx: { prisma }, input: { cartId, itemId } }) =>
      prisma.cartItem.deleteMany({
        where: { cartId, itemId },
      })
    ),
  add: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        items: z.array(z.object({ itemId: z.number(), amount: z.number() })),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { cartId, items } }) => {
      const session = await getServerSession(authOptions);

      if (!session?.user.id) {
        return;
      }

      for (const item of items) {
        await prisma.cartItem.create({
          data: {
            cartId,
            userId: session.user.id,
            itemId: item.itemId,
            amount: item.amount,
          },
        });
      }
    }),
  close: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
      })
    )
    .mutation(async ({ ctx: { prisma }, input: { cartId } }) =>
      prisma.cart.update({
        where: {
          id: cartId,
        },
        data: {
          isClosed: true,
        },
      })
    ),
  updateAmount: publicProcedure
    .input(
      z.object({
        cartId: z.number(),
        itemId: z.number(),
        amount: z.number(),
      })
    )
    .mutation(({ ctx: { prisma }, input: { cartId, itemId, amount } }) =>
      prisma.cartItem.updateMany({
        where: { cartId, itemId },
        data: { amount },
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
      prisma.cartItem.updateMany({
        where: { cartId, itemId },
        data: { isPickedUp },
      })
    ),
};
