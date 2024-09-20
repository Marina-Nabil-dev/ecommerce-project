import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; // if you need navigation
import "swiper/css/pagination"; // if you need pagination
import { Navigation, Pagination } from "swiper";
import { getApiData } from "../helpers/getApiData";
import { HomeRoutes } from "../routes/home";
const RecentlyAddedProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getApiData(HomeRoutes.PRODUCTS);
      const firstTenProducts = response.slice(0, 7);
      setProducts(firstTenProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
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
            <div className="flex my-2">
              <h3 className="text-left">{product.title}</h3>
              <span className="ml-auto text-end text-baby-purple font-bold">
                {product.price} EGP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedProducts;
