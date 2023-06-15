// ChildrenType for Children
import { ChildrenType } from "../types/defaultType";
// QueryClient and  QueryClientProvider for Data Fetching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Create a client
const queryClient = new QueryClient();
// TanstackQueryProvider
export default function TanstackQueryProvider(props: ChildrenType) {
  return (
    <QueryClientProvider client={queryClient}>
      {props?.children}
    </QueryClientProvider>
  );
}
