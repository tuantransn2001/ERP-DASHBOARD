import RouterProvider from "./context/RouterContext";
import { routes } from "./routes";
import { HelmetProvider } from "react-helmet-async";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider routes={routes} />;
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
