import z from 'zod';
import { prismaProcedure, t } from '../../lib/trpc/init';

export const itemsRouter = t.router({
  countItems: prismaProcedure.query(async ({ ctx: { prisma } }) => {
    const itemsCount = await prisma.item.count();
    return { message: `number of items: ${itemsCount}` };
  }),
  listItems: prismaProcedure.query(async ({ ctx: { prisma } }) => {
    const items = await prisma.item.findMany();
    return { message: items };
  }),
  addItem: prismaProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        cost: z.number().optional(),
        onHand: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const result = await prisma.item.create({
        data: {
          name: input.name,
          cost: input.cost,
          number_in_stock: input.onHand,
        },
      });
      return { message: result };
    }),
  removeItem: prismaProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const result = await prisma.item.delete({ where: { id: input.id } });

      return { message: result };
    }),
  updateItem: prismaProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        cost: z.number().optional(),
        number_in_stock: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
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
