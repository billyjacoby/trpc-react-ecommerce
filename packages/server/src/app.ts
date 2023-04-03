import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import customConfig from './config/default';
import connectDB from './utils/prisma';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: path.join(__dirname, './.env') });

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const prisma = new PrismaClient();

const appRouter = t.router({
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
});

export type AppRouter = typeof appRouter;

const app = express();
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(
  cors({
    origin: [customConfig.origin, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const port = customConfig.port;
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);

  // CONNECT DB
  connectDB();
});
