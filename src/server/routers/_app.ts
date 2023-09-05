import { publicProcedure, router } from '../trpc';
import itemsRoutes from './items';
import cartRoutes from './cart';

export const appRouter = router({
  ...itemsRoutes,
  ...cartRoutes,
  categories: publicProcedure.query(({ ctx: { prisma } }) =>
    prisma.category.findMany()
  ),
});

export type AppRouter = typeof appRouter;
