import React from "react";
import Navbar from "./components/Navbar";
import RecentlyAddedProducts from "./components/RecentlyAddedProducts";
import PopularCategories from "./components/PopularCategories";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <RecentlyAddedProducts />
      <PopularCategories />
      <Footer />
    </div>
  );
}

export default App;
