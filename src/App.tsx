import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu } from "./components/Menu/Menu";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Menu />
        <Toaster position="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
