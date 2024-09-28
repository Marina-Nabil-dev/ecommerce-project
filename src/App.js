import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RecentlyAddedProducts from "./components/RecentlyAddedProducts";
import PopularCategories from "./components/PopularCategories";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/userContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import NotFound from './components/NotFound';
import Home from "./pages/Home";

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
