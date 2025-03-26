'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryProvider = new QueryClient();

  return (
    <QueryClientProvider client={queryProvider}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default Provider;
