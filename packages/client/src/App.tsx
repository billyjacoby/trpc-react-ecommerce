import React from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {createClient, trpc} from './utils/trpc';
import {useAppStore} from './stores/useAppStore';

export function App({children}: React.PropsWithChildren) {
  const authToken = useAppStore(state => state.authToken);

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );

  const [trpcClient, setTrpcClient] = React.useState(() =>
    createClient(authToken),
  );

  React.useEffect(() => {
    console.log('AUTH TOKEN CHANGE');
    setTrpcClient(() => createClient(authToken));
  }, [authToken]);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
