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
import {
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AllProducts from './components/AllProducts';

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
          element : <AllProducts/>
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
        <UserContextProvider>
          <RouterProvider router={router}></RouterProvider>
        </UserContextProvider>
      {/* </ReactQueryDevtools> */}
    </QueryClientProvider>
  );
}

export default App;
