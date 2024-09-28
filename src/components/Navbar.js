import React, { useContext, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import ModalComponent from "./../Modals/ModalComponent";
import { UserContext } from "../contexts/userContext";
import { Link } from "react-router-dom";
import GuardRouting from "../helpers/GuardRouting";

const Navbar = () => {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  let { userToken } = useContext(UserContext);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmittingForm = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    window.location.reload();
  };
  return (
    <>
      <nav className="bg-baby-purple flex justify-between items-center p-4">
        <Link to="/" className="text-white text-2xl">
          E-Shop
        </Link>
        <div className="md:hidden">
          <FaBars
            className="text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        <div className="flex w-1/3 p-[10px] mx-2 gap-2 self-stretch">
          <GuardRouting>
            <Link
              className=" text-white font-semibold"
              role="menuitem"
              to="/categories"
            >
              Categories
            </Link>
          </GuardRouting>
          <GuardRouting>
            <Link
              className=" text-white font-semibold"
              role="menuitem"
              to="/recently-added-products"
            >
              Products
            </Link>
          </GuardRouting>

          <GuardRouting>
            <Link
              className=" text-white font-semibold"
              role="menuitem"
              to="/brands"
            >
              Brands
            </Link>
          </GuardRouting>

          <GuardRouting>
            <Link
              className=" text-white font-semibold"
              role="menuitem"
              to="/cart"
            >
              Cart
            </Link>
          </GuardRouting>
        </div>
        <div className="flex w-1/3 p-[8px_10px] mx-2 gap-2 self-stretch border-2 rounded-md">
          <form className="w-full" onSubmit={handleSubmittingForm}>
            {" "}
            <input
              type="text"
              ref={inputRef}
              id="search"
              placeholder="Search Products"
              className="w-full text-black rounded-md px-2 focus:border-none focus:outline-none"
            />
          </form>
        </div>
        {userToken == null ? (
          <div className="hidden md:flex space-x-4">
            <button
              className="text-white border rounded-full px-4 py-2 bg-simon hover:bg-dark-simon"
              onClick={() => openModal("login")}
            >
              Login
            </button>

            <button className=" bg-white text-baby-purple font-bold px-4 py-2 rounded-full">
              Buy Products
            </button>
          </div>
        ) : (
          <button
            className="text-white border rounded-full px-4 py-2 bg-simon  hover:bg-dark-simon"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

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
