import React, { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiData } from "../helpers/getApiData";
import { ProductRoutes } from "../routes/productRoutes";
import { useQuery } from "react-query";
import Spinner from "../icons/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { useAddToCartMutation } from "../redux/APIs/cartApis";
import { useGetProductQuery, useGetWishlisttQuery } from "../redux/APIs/productApi";
import HeartIcon from "./HeartIcon";

export default function ProductDetails() {
  const { id } = useParams();
  const swiperRef = useRef(null);

  const {
    data: { product = {} } = {},
    isLoading,
    isFetching,
  } = useGetProductQuery(id);
  const [addToCart, { isLoading: isButtonLoading }] = useAddToCartMutation();

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const { data: { wishlist = [] } = {} } = useGetWishlisttQuery();

  const isProductInWishlist = useCallback(
    (productId) => wishlist.some((product) => product.id === productId),
    [wishlist]
  );

  const handleAddToCart = async (productId) => {
    console.log(`Added product ${productId} to the cart`);
    try {
      await addToCart(productId).unwrap();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      {isLoading && isFetching ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 min-h-screen p-10">
          <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
         <div className="relative top-3 right-3">
         <HeartIcon
                  productId={product.id}
                  initialInWishlist={isProductInWishlist(product.id)}
                />
         </div>
            <div className="flex flex-col md:flex-row gap-8">
              
              {/* Left: Image Slider */}
              <div className="w-full md:w-1/2">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={10}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                  }}
                  onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance in ref
                  className="rounded-lg"
                >
                  {product.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`Product ${index}`}
                        className="rounded-lg size-[490px]"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnail Images */}
                <div className="flex space-x-4 mt-4 px-7">
                  {product.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index}`}
                      className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() => handleThumbnailClick(index)} // Thumbnail click handler
                    />
                  ))}
                </div>
              </div>

              {/* Right: Product Details */}
              <div className="w-full md:w-1/2">
                <h1 className="text-3xl font-semibold">{product.title}</h1>
                <div className="flex items-center mt-2">
                  <span className="flex">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.ratingsAverage)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </span>
                </div>

                <p className="text-xl text-simon font-semibold mt-4">
                  {product.price} EGP
                </p>

                <p className="text-gray-600 mt-2">{product.description}</p>

                <div className="mt-4">
                  <span className="text-gray-700 font-semibold text-lg">
                    {product.brand.name}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="flex items-center justify-center px-4 py-2 bg-dark-simon text-white font-semibold rounded-lg hover:bg-simon"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs: Description, Additional Information, Reviews */}
            <div className="tabs mt-10">
              <div className="border-b flex space-x-8">
                <button className="pb-2 border-b-2 border-yellow-500 text-yellow-500">
                  Description
                </button>
                <button className="pb-2 border-b-2 border-transparent hover:border-gray-300">
                  Additional Information
                </button>
                <button className="pb-2 border-b-2 border-transparent hover:border-gray-300">
                  Reviews (0)
                </button>
              </div>

              <div className="mt-4">
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum maximus ex nec velit commodo blandit. Duis quis est
                  feugiat, cursus nunc ac, pretium erat. Nulla consectetur
                  molestie pharetra.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
