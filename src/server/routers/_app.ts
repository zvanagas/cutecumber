import { router } from '../trpc';
import { itemsRouter } from './items';
import { cartRouter } from './cart';
import { fridgeRouter } from './fridge';
import { categoriesRouter } from './categories';

export const appRouter = router({
  items: itemsRouter,
  cart: cartRouter,
  fridge: fridgeRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
