import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import ModalComponent from "./../Modals/ModalComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GuardRouting from "../helpers/GuardRouting";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { clearToken, verifyToken } from "../redux/Reducers/userReducer";
import toast from "react-hot-toast";
import { useGetUserCartQuery } from "../redux/APIs/cartApis";
import { getLastRoute, saveLastRoute } from "../services/routePersistence";

const Navbar = () => {
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken, isAuthenticated } = useSelector((state) => state.user);


  useEffect(() => {
    saveLastRoute(location.pathname);
  }, [location]);


  useEffect(() => {
    if (!isAuthenticated) {
      const lastRoute = getLastRoute();
      navigate(lastRoute, { replace: true });
    }
  }, []);

  useEffect(() => {
    if (userToken && !isAuthenticated) {
      dispatch(verifyToken(userToken));
    }
  }, [userToken, dispatch, isAuthenticated]);

  const { data: { itemNumber = 0 } = {} } = useGetUserCartQuery();

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSubmittingForm = (e) => {
    e.preventDefault();
    inputRef.current.value = "";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  const handleLogout = () => {
    dispatch(clearToken());
    toast.success("Logout Successful");
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
          {/* <GuardRouting> */}
          <Link
            className=" text-white font-semibold"
            role="menuitem"
            to="/categories"
          >
            Categories
          </Link>
          {/* </GuardRouting> */}
          {/* <GuardRouting> */}
          <Link
            className=" text-white font-semibold"
            role="menuitem"
            to="/products"
          >
            Products
          </Link>
          {/* </GuardRouting> */}

          {/* <GuardRouting> */}
          <Link
            className=" text-white font-semibold"
            role="menuitem"
            to="/brands"
          >
            Brands
          </Link>
          {/* </GuardRouting> */}

          <GuardRouting>
            <Link
              className=" text-white font-semibold"
              role="menuitem"
              to="/allorders"
            >
              All Orders
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
        {!isAuthenticated ? (
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
          <>
            <div>
              <ul className="inline-flex text-white ">
                <li className="">
                  <a href="#profile" className="flex items-center px-4 py-2 ">
                    <UserCircleIcon className="h-5 w-5 mr-2" />
                  </a>
                </li>
                <li>
                  <Link to="/your-cart">
                    <span className="flex items-center px-4 py-2 ">
                      <ShoppingCartIcon className="h-5 w-5 mr-2" />
                      <span className="relative bottom-4 right-3 items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-simon rounded-full">
                        {itemNumber}
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={handleLogout}
                    className="flex items-center px-2 py-2"
                  >
                    <BiLogOutCircle className="h-5 w-5 mr-2" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            {/* <div className="relative" ref={modalRef}>
              <button
                className="flex items-center space-x-2 text-white focus:outline-none"
                onClick={() => setAccountIsOpen((prev) => !prev)}
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="pl-1">Account</span>
              </button>
            </div>
            {accountIsOpen && (
              <>
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={closeAccountModal}
                ></div>
                <div
                  className={`fixed top-8 right-2 h-1/2 w-64 bg-white shadow-lg rounded-lg transform transition-transform duration-300 z-50 ${
                    accountIsOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="p-6">
                    <h2 className="text-lg font-bold mb-4">Account</h2>

                    <a
                      href="#profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <UserCircleIcon className="h-5 w-5 mr-2" />
                      <span>Profile</span>
                    </a>
                    <Link to="/your-cart">
                      <span className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />
                        
                        Cart
                        <span className="inline-flex items-center justify-center px-2 py-1 mx-2 text-xs font-bold leading-none text-white bg-simon rounded-full">
                        {
                          itemsCount
                        }
                      </span>
                    
                      </span>
                      
                    </Link>
                    <a
                      href="#logout"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <BiLogOutCircle className="h-5 w-5 mr-2" />
                      <span onClick={handleLogout}>Logout</span>
                    </a>
                  </div>
                </div>
              </>
            )} */}
          </>
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
