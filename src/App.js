import React, { useState } from "react";
import { UserContextProvider } from "./contexts/userContext";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import { CartContextProvider } from "./contexts/cartContext";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";


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
      
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} > */}
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="top-right" reverseOrder={false} />
        </UserContextProvider>
      </CartContextProvider>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
