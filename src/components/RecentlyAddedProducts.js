import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";

const RecentlyAddedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$100",
      images: ["/images/product1.jpg", "/images/product1-2.jpg"],
    },
    {
      id: 2,
      name: "Product 2",
      price: "$150",
      images: ["/images/product2.jpg", "/images/product2-2.jpg"],
    },
    {
      id: 3,
      name: "Product 3",
      price: "$200",
      images: ["/images/product3.jpg", "/images/product3-2.jpg"],
    },
  ];

  return (
    <div className="my-8 p-4">
      <h2 className="text-center text-2xl text-baby-blue">
        Recently Added Products
      </h2>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <Swiper>
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={product.name} className="mx-auto h-40" />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="text-center my-2">
              <h3>{product.name}</h3>
              <p className="text-baby-blue font-bold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyAddedProducts;
