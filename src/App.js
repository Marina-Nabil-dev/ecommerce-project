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
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { ConfigStore } from "./redux/store";
import AllCategories from "./components/AllCategories";


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
          path :"/categories",
          element : <AllCategories/>
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
      <Provider store={ConfigStore}>
          <RouterProvider router={router}></RouterProvider>
          <Toaster position="middle-right" reverseOrder={false} 
          toastOptions={{
            success: {
              style: {
                color: 'green',
                backgroundColor: 'white',
              },
            },
          }} />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
