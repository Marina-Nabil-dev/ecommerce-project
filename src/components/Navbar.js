import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-baby-blue flex justify-between items-center p-4">
      <h1 className="text-white text-2xl">E-Shop</h1>
      <div className="md:hidden">
        <FaBars
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div className="hidden md:flex space-x-4">
        <button className="text-white">Login</button>
        <button className=" bg-white text-baby-blue px-4 py-2 rounded">
          Sell Your Product
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute right-0 top-0 bg-baby-blue h-screen w-2/3 flex flex-col items-center">
          <button className="text-white my-4">Login</button>
          <button className=" bg-white text-baby-blue px-4 py-2 rounded">
            Sell Your Product
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
