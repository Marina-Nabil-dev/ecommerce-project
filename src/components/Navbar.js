import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import ModalComponent from "./../Modals/ModalComponent";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };
  return (
    <>
      <nav className="bg-baby-purple flex justify-between items-center p-4">
        <h1 className="text-white text-2xl">E-Shop</h1>
        <div className="md:hidden">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="hidden md:flex space-x-4">
          <button
            className="text-white border rounded-full px-4 py-2 bg-simon"
            onClick={() => openModal("login")}
          >
            Login
          </button>
          <button className=" bg-white text-baby-purple font-bold px-4 py-2 rounded-full">
            Sell Your Product
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute right-0 top-0 bg-baby-purple h-screen w-2/3 flex flex-col items-center">
            <button className="text-white my-4">Login</button>
            <button className=" bg-white font-bold text-baby-purple px-4 py-2 rounded-full">
              Sell Your Product
            </button>
          </div>
        )}
      </nav>
      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalType={modalType}
          showImage={false}
          modalProps={
            {
              /* pass any additional props here */
            }
          }
        />
      )}
    </>
  );
};

export default Navbar;
