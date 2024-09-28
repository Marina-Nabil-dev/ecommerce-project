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
