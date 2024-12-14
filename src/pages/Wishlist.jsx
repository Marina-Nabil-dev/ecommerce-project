import React, { useCallback } from "react";
import { useGetWishlisttQuery } from "../redux/APIs/productApi";
import { Link } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../icons/Spinner";
import { useAddToCartMutation } from "../redux/APIs/cartApis";

export default function Wishlist() {
  const { data: { wishlist = [], count = 0 } = {} } = useGetWishlisttQuery();

  const [addToCart, { cartIsLoading }] = useAddToCartMutation();
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId).unwrap();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const isProductInWishlist = useCallback(
    (productId) => wishlist.some((product) => product.id === productId),
    [wishlist]
  );

  if (count === 0) {
    return (
      <div className="col-span-4 text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-500 mb-6">Start adding items you love!</p>
        <Link
          to="/products"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-baby-purple hover:bg-dark-simon"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-baby-purple mb-6">
          My Wishlist
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Wishlist Item Card */}
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border-[3px] rounded p-4 hover:border-baby-blue "
            >
              <HeartIcon
                productId={product.id}
                initialInWishlist={isProductInWishlist(product.id)}
              />

              {/* <Swiper>
                  {product.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={product.slug}
                        className="mx-auto size-64"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper> */}
              <img src={product.imageCover} className="mx-auto size-64" />
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
      </div>
    </>
  );
}
