import React from "react";
import { useAddToCartMutation } from "../../redux/APIs/cartApis";
import { LoadingButton } from "./LoadingButton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function AddToCartButton({ productId }) {
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId).unwrap();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  return (
    <div>
      <LoadingButton
        isLoading={isLoading}
        onClick={() => handleAddToCart(productId)}
        className={`w-full py-3 rounded-lg ${
          isLoading
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-[#FF8B94] hover:bg-[#F76C78]"
        } text-white font-semibold p-2 flex hover:font-bold`}
      >
        <ShoppingCartIcon className="h-5 w-5 mr-2" />
        Add To Cart
      </LoadingButton>
    </div>
  );
}
