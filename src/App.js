import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RecentlyAddedProducts from "./components/RecentlyAddedProducts";
import PopularCategories from "./components/PopularCategories";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/userContext";

function App() {
  return (
  
    <div>
      <UserContextProvider>
      <Navbar />
      <RecentlyAddedProducts />
      <PopularCategories />
      <Footer />
      </UserContextProvider>
    </div>
  );
}

export default App;
