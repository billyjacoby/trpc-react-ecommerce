import z from 'zod';
import {publicProcedure, protectedProcedure, t} from '../../lib/trpc/init';

export const itemsRouter = t.router({
  countItems: publicProcedure.query(async ({ctx: {prisma}}) => {
    const itemsCount = await prisma.item.count();
    return {message: `number of items: ${itemsCount}`};
  }),
  listItems: publicProcedure.query(async ({ctx: {prisma}}) => {
    const items = await prisma.item.findMany();
    return {data: {items}};
  }),
  addItem: protectedProcedure
    .input(
      z.object({
        name: z.string().nonempty(),
        cost: z.number().optional(),
        onHand: z.number().optional(),
      }),
    )
    .mutation(async ({input, ctx: {prisma, user}}) => {
      console.log('🪵 | file: items.ts:22 | .mutation | user:', user);
      const result = await prisma.item.create({
        data: {
          name: input.name,
          cost: input.cost,
          number_in_stock: input.onHand,
        },
      });
      return {data: result};
    }),
  removeItem: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      }),
    )
    .mutation(async ({input, ctx: {prisma}}) => {
      const result = await prisma.item.delete({where: {id: input.id}});

      return {data: result};
    }),
  updateItem: protectedProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
        cost: z.number().optional(),
        number_in_stock: z.number().optional(),
      }),
    )
    .mutation(async ({input, ctx: {prisma}}) => {
      const result = await prisma.item.update({
        where: {
          id: input.id,
        },
        data: {cost: input.cost, number_in_stock: input.number_in_stock},
      });

      return {data: result};
    }),
});
