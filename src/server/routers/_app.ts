import { publicProcedure, router } from '../trpc';
import itemsRoutes from './items';
import cartRoutes from './cart';
import fridgeRoutes from './fridge';

export const appRouter = router({
  ...itemsRoutes,
  ...cartRoutes,
  ...fridgeRoutes,
  categories: publicProcedure.query(({ ctx: { prisma } }) =>
    prisma.category.findMany()
  ),
});

export type AppRouter = typeof appRouter;
