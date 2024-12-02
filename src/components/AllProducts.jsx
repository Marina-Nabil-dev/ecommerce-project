import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // if you need navigation
import "swiper/css/pagination"; // if you need pagination
import Spinner from "../icons/Spinner";
import { Link } from "react-router-dom";
import { useAddToCartMutation } from "../redux/APIs/cartApis";
import { useGetAllProductsQuery } from "../redux/APIs/productApi";

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8; // Items per page
  const inputRef = useRef(null);

  const [addToCart, { cartIsLoading }] =
    useAddToCartMutation();

  const {
    data: { products = [], totalCount = 0 } = {},
    isLoading,
    isFetching,
  } = useGetAllProductsQuery(
    { currentPage, limit },
  );
  
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId).unwrap();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const totalPages = Math.ceil(totalCount / limit);

  const isLastPage = currentPage === totalPages;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-8 mx-5 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            Recently Added Products
          </h2>
          <form className="flex items-end justify-end self-stretch ml-auto w-1/4 border-2 rounded-md ">
            {" "}
            <input
              type="text"
              ref={inputRef}
              id="search"
              placeholder="Search Products"
              className="w-full text-black rounded-md px-2 placeholder:text-center focus:border-none focus:outline-none"
            />
          </form>
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-[3px] rounded p-4 hover:border-baby-blue "
              >
                <Swiper>
                  {product.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={product.slug}
                        className="mx-auto size-64"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="block my-2">
                  <h2 className="text-left font-bold text-green-600">
                    {product.category.name}
                  </h2>
                  <h3 className="text-left">
                    {product.title.length > 30
                      ? product.title.slice(0, 30) + "..."
                      : product.title}
                  </h3>
                  <Link to={`/product/${product.id}`}>
                    <div className=" flex text-baby-purple font-bold">
                      <span>{product.price} EGP</span>
                      <span className="flex text-baby-purple ml-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="yellow"
                          stroke="none"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="px-1">{product.ratingsAverage}</span>
                      </span>
                    </div>
                  </Link>
                  <div className="flex my-2 items-center justify-center">
                    {cartIsLoading && <Spinner />}
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-dark-simon items-center justify-center hover:font-bold text-white px-4 py-2 rounded"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-baby-purple hover:bg-blue-500 text-white rounded"
              hidden={currentPage === 1}
            >
              Previous
            </button>

            <div className="flex space-x-2 px-2">
              {/* Show previous page button if on a page greater than 1 */}
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  isLoading={isFetching}
                  className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-300"
                >
                  {currentPage - 1}
                </button>
              )}

              {/* Show current page button */}
              <button className="px-3 py-1 rounded-full bg-blue-500 text-white">
                {currentPage}
              </button>

              {/* Show next page button only if not on the last page */}
              {!isLastPage && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  isLoading={isFetching}
                  className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-300"
                >
                  {currentPage + 1}
                </button>
              )}
            </div>

            {/* Disable Next button if it's the last page */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-baby-purple hover:bg-blue-500 text-white rounded"
              hidden={isLastPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
