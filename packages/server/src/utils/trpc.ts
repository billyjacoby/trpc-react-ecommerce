import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { createContext } from 'vm';
import { z } from 'zod';

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const prisma = new PrismaClient();

export const appRouter = t.router({
  sayHello: t.procedure.query(async () => {
    const message = 'this is the hello';
    return { message };
  }),
  sayGoodbye: t.procedure.query(async () => {
    const message = 'This is the end for you my friend';
    return { message };
  }),
  countItems: t.procedure.query(async () => {
    const itemsCount = await prisma.item.count();
    return { message: `number of items: ${itemsCount}` };
  }),
  listItems: t.procedure.query(async () => {
    const items = await prisma.item.findMany();
    return { message: items };
  }),
  addItem: t.procedure
    .input(
      z.object({
        name: z.string().nonempty(),
        cost: z.number().optional(),
        onHand: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await prisma.item.create({
        data: {
          name: input.name,
          cost: input.cost,
          number_in_stock: input.onHand,
        },
      });
      return { message: result };
    }),
  removeItem: t.procedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await prisma.item.delete({ where: { id: input.id } });

      return { message: result };
    }),
  updateItem: t.procedure
    .input(
      z.object({
        id: z.string().nonempty(),
        cost: z.number().optional(),
        number_in_stock: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await prisma.item.update({
        where: {
          id: input.id,
        },
        data: { cost: input.cost, number_in_stock: input.number_in_stock },
      });
      console.log('result', result);

      return { message: result };
    }),
});
