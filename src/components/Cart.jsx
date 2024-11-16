import React, { useEffect, useState } from "react";
import Spinner from "../icons/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../redux/Reducers/cartReducer";

export default function Cart() {
  const dispatch = useDispatch();

  const { loading, cartList, totalPrice } = useSelector((state) => state.cart);
  function handlRemoveItem(itemId) {
    dispatch(removeItemFromCart(itemId));
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 min-h-screen p-10">
          <div className="container mx-auto flex flex-col md:flex-row gap-10">
            {/* Cart Items Section */}
            <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-4">Product</th>
                    <th className="pb-4">Price</th>
                    <th className="pb-4">Quantity</th>
                    <th className="pb-4">Subtotal</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="py-4 flex items-center space-x-4">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-20 h-20"
                        />
                        <div>
                          <h2 className="font-semibold">
                            {item.product.title}
                          </h2>
                        </div>
                      </td>
                      <td className="py-4">${item.price.toFixed(2)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button
                            className="px-2 py-1 bg-gray-300 rounded"
                            onClick={() => handlRemoveItem(item._id)}
                          >
                            -
                          </button>
                          <span className="mx-2 font-semibold">
                            {item.count}
                          </span>
                          <button className="px-2 py-1 bg-gray-300 rounded">
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4">
                      ${(item.price * item.count).toFixed(2)}
                      </td>
                      <td className="py-4">
                      <button className="p-2 my-2 bg-dark-simon rounded-lg font-semibold text-white justify-end items-end">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="border p-2 rounded w-1/2"
                />
                <button className="bg-[#89AFF0] text-white px-4 py-2 rounded hover:bg-[#69A0E0]">
                  Apply
                </button>
              </div>

              <div className="flex justify-end mt-6 space-x-4">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                  Continue Shopping
                </button>
                <button className="bg-[#FF8B94] text-white px-4 py-2 rounded hover:bg-[#F76C78]">
                  Update Cart
                </button>
              </div>
            </div>

            {/* Cart Summary Section */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <select className="border p-2 rounded">
                  <option>Free Shipping</option>
                  <option>$5 Flat Rate</option>
                </select>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button className="bg-[#FF8B94] text-white w-full py-3 rounded-lg hover:bg-[#F76C78]">
                Checkout
              </button>

              <div className="flex justify-center items-center mt-4">
                <span className="text-sm text-gray-600">or</span>
              </div>

              <button className="bg-[#89AFF0] text-white w-full py-3 mt-4 rounded-lg hover:bg-[#69A0E0]">
                PayPal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
