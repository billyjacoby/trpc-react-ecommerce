import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import customConfig from './config/default';
import connectDB from './utils/prisma';
import { appRouter } from './utils/trpc';
import { createContext } from 'vm';

dotenv.config({ path: path.join(__dirname, './.env') });

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
