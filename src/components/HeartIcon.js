import React, { useState, useCallback, useEffect, memo } from "react"; // Update path to API
import {
  useAddToWishlistMutation,
  useRemoveItemFromWishlistMutation,
} from "../redux/APIs/productApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const HeartIcon = memo(({ productId, initialInWishlist }) => {
  // State for the heart icon
  const [isInWishlist, setIsInWishlist] = useState(initialInWishlist);

  const { userToken, isAuthenticated } = useSelector((state) => state.user);

  // Sync local state with parent prop when it changes
  useEffect(() => {
    setIsInWishlist(initialInWishlist);
  }, [initialInWishlist]);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveItemFromWishlistMutation();

  const toggleWishlist = useCallback(async () => {
    try {
      if (!isAuthenticated) {
        toast.error("Please Login First", {
          style: { color: "red" },
        });
      }
      if (isInWishlist) {
        await removeFromWishlist(productId).unwrap();
      } else {
        await addToWishlist(productId).unwrap();
      }
      setIsInWishlist((prev) => !prev); // Optimistic update
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  }, [isInWishlist, productId, addToWishlist, removeFromWishlist]);

  return (
    <div className="grid justify-end items-end right-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="white"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`cursor-pointer transition-colors ${
          isInWishlist ? "fill-red-500" : "hover:fill-red-500"
        }`}
        onClick={toggleWishlist}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </div>
  );
});

export default HeartIcon;
