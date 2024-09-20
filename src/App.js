import React from "react";
import Navbar from "./components/Navbar";
import TabsSection from "./components/TabsSection";
import RecentlyAddedProducts from "./components/RecentlyAddedProducts";
import PopularCategories from "./components/PopularCategories";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navbar />
      <TabsSection />
      <RecentlyAddedProducts />
      <PopularCategories />
      <Footer />
    </div>
  );
}

export default App;
