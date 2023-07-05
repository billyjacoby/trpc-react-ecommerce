import type {CreateNextContextOptions} from '@trpc/server/adapters/next';
import {PrismaClient} from '@prisma/client';
import {inferAsyncReturnType} from '@trpc/server';

export async function createContext(opts: CreateNextContextOptions) {
  const req = opts.req;
  const prisma = new PrismaClient();

  const token = req?.headers?.authorization?.split(' ')[1];
  let user = null;
  if (token) {
    user = await prisma.user.findFirst({where: {token: {equals: token}}});
  }

  return {prisma, user};
}
export type Context = inferAsyncReturnType<typeof createContext>;
