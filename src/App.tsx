import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "./components/Menu/Menu";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Menu />
      </QueryClientProvider>
    </>
  );
}
