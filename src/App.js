import React, { useState } from "react";
import { UserContextProvider } from "./contexts/userContext";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from './components/NotFound';
import Home from "./pages/Home";

function GuardRouting({ children }) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;

}
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element:  <Home />,
        },
        {
          path: "*",
          element: <NotFound />,
        }
      ],
    },
  ]);

  return (
    <UserContextProvider>
    <RouterProvider router={router}>
    </RouterProvider>
    </UserContextProvider>
  );
}

export default App;
