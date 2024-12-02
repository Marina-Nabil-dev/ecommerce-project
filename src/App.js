import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ConfigStore } from "./redux/store";
import AllCategories from "./components/AllCategories";
import Spinner from "./icons/Spinner";
import ErrorComponent from "./components/ErrorComponent";
import Orders from "./components/Orders";
import OrderPage from "./components/OrderPage";
const LazyComponent = lazy(() => import("./icons/Spinner"));

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products",
          element: <AllProducts />,
        },
        {
          path: "/categories",
          element: <AllCategories />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/your-cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path : "/allorders",
          element: <Orders />
        },
        {
          path : "/order/:id",
          element : <OrderPage/>
        }
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={ConfigStore}>
        <RouterProvider router={router}>
          <Suspense fallback={<ErrorComponent />}>
            <LazyComponent />
          </Suspense>
        </RouterProvider>

        <Toaster
          position="middle-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                color: "green",
                backgroundColor: "white",
              },
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
