import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // if you need navigation
import "swiper/css/pagination"; // if you need pagination
import { Navigation, Pagination } from "swiper";
import { getApiData } from "../../helpers/getApiData";
import { HomeRoutes } from "../../routes/home";
import Spinner from "../../icons/Spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { NavbarRoutes } from "../../routes/navbarRoutes";
import { CartContext } from "../../contexts/cartContext";
const RecentlyAddedSection = () => {
  const [recentlyAddedProducts, setRecentlyAddedProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { addCart } = useContext(CartContext);
  function fetchProducts() {
    const response = getApiData(HomeRoutes.PRODUCTS);
    return response;
  }
  let { isLoading, isFetching, error, data, refetch } = useQuery(
    "products",
    fetchProducts,
    {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes (300,000 ms)
      cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes even if unused,
      
      onSuccess: (data) => {
        setRecentlyAddedProducts(data[0]);
        setTotalCount(data[1]);
      },
    }
  );

  const firstTenRadomProducts = recentlyAddedProducts
    ?.sort(() => Math.random() - 0.5)
    .slice(0, 7);
   
    useEffect(()=> {
      refetch();
    }, firstTenRadomProducts.length == 0)
    

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-8 mx-5 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            Recently Added Products
          </h2>
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            {firstTenRadomProducts.map((product) => (
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
                  <div className="flex my-2 items-center justify-center">
                    <button
                      onClick={() => addCart(product.id)}
                      className="bg-dark-simon items-center justify-center hover:font-bold text-white px-4 py-2 rounded"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex text-center items-center justify-center px-28">
              <a className=" text-dark-simon font-bold text-2xl px-4 py-2">
                <Link to={NavbarRoutes.ALL_PRODUCTS}>View All</Link>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyAddedSection;
