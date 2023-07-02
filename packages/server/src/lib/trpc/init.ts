import { initTRPC } from '@trpc/server';
import { createContext } from './context';

export const t = initTRPC.context<typeof createContext>().create();
export const router = t.router;

const usePrisma = t.middleware(({ next, ctx }) => {
  return next({
    ctx: {
      prisma: ctx.prisma,
    },
  });
});

export const prismaProcedure = t.procedure.use(usePrisma);
export const publicProcedure = t.procedure;
