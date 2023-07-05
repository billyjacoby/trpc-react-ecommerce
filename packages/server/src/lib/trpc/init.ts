import {TRPCError, initTRPC} from '@trpc/server';
import {createContext} from './context';

export const t = initTRPC.context<typeof createContext>().create();
export const router = t.router;

const protectProcedure = t.middleware(async opts => {
  const {ctx} = opts;

  if (!ctx.user) {
    throw new TRPCError({code: 'UNAUTHORIZED'});
  }
  return opts.next({ctx});
});

export const publicProcedure = t.procedure;
export const protectedProcedure = publicProcedure.use(protectProcedure);
