import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // if you need navigation
import "swiper/css/pagination"; // if you need pagination
import { Navigation, Pagination } from "swiper";
import { getApiData } from "../helpers/getApiData";
import { HomeRoutes } from "../routes/home";
import Spinner from "../icons/Spinner";
const RecentlyAddedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await getApiData(HomeRoutes.PRODUCTS);
      const firstTenRadomProducts = response
        .sort(() => Math.random() - 0.5)
        .slice(0, 7);
      setProducts(firstTenRadomProducts);
      console.log(firstTenRadomProducts);
      

      setLoading(false);      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [loading]); 

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="my-8 mx-5 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            Recently Added Products
          </h2>
          <div className="grid md:grid-cols-4 gap-3 mt-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded p-4">
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
                  <h2 className="text-left font-bold text-green-600">{product.category.name}</h2>
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
                        class="feather feather-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="px-1">{product.ratingsAverage}</span>
                    </span>
                  </div>
                  <div className="flex my-2 items-center justify-center">
                    <button className="bg-dark-simon items-center justify-center hover:font-bold text-white px-4 py-2 rounded">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyAddedProducts;
