import {
  createTRPCReact,
  getFetch,
  httpBatchLink,
  loggerLink,
} from '@trpc/react-query';
import type {AppRouter} from 'server';

export const trpc = createTRPCReact<AppRouter>();

export const createClient = (authToken?: string) => {
  return trpc.createClient({
    links: [
      loggerLink(),
      httpBatchLink({
        url: 'http://localhost:8000/api/trpc',
        fetch: async (input, init?) => {
          const fetch = getFetch();
          return fetch(input, {
            ...init,
            credentials: 'include',
          });
        },
        headers: {
          Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
      }),
    ],
  });
};
