import { router } from '../../lib/trpc/init';
import { itemsRouter } from './items';

export const appRouter = router({
  items: itemsRouter,
});

export type AppRouter = typeof appRouter;
