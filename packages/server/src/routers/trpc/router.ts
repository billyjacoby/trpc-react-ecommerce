import {router} from '../../lib/trpc/init';
import {itemsRouter} from './items';
import {usersRouter} from './users';

export const appRouter = router({
  items: itemsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
