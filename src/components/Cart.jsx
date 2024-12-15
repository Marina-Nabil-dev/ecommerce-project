import React, { useCallback, useEffect, useMemo, useState } from "react";
import Spinner from "../icons/Spinner";
import {
  useGetUserCartQuery,
  useClearItemFromCartMutation,
  useCheckOutMutation,
  useRemoveItemFromCartMutation,
} from "../redux/APIs/cartApis";
import ErrorComponent from "./ErrorComponent";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormField from "./Forms/Fields/FormField";
import { Link } from "react-router-dom";

export default function Cart() {
  const [clearCart] = useClearItemFromCartMutation();

  const {
    data: { cartList = [], cartId = 0 } = {},
    error,
    isLoading,
  } = useGetUserCartQuery();

  const [flatPrice, setFlatPrice] = useState(0);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleFlatRate = (event) => {
    const selectedValue = Number(event.target.value);
    setFlatPrice(selectedValue);
  };

  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const handlRemoveItem = async (productId) => {
    
    try {
      removeItemFromCart(productId).unwrap();
      cartList.filter(item => item._id !== productId)
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart().unwrap();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const [quantities, setQuantities] = useState({});
  
  useEffect(() => {
    if (cartList.length > 0) {
      const initialQuantities = cartList.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartList]);

  const handleIncreaseQuantity = useCallback((item) => {
    setQuantities((prev) => ({
      ...prev,
      [item._id]: (prev[item._id] || item.count) + 1,
    }));
  }, []);

  const handleDecreaseQuantity = useCallback((item) => {
    setQuantities((prev) => ({
      ...prev,
      [item._id]: Math.max((prev[item._id] || item.count) - 1, 1),
    }));
  }, []);

  const calculateItemSubtotal = useCallback(
    (item) => {
      const quantity = quantities[item._id] || item.count;
      return item.price * quantity;
    },
    [quantities]
  );
  const totalAmount = useMemo(() => {
    if (!cartList) return 0;
    return cartList.reduce((total, item) => {
      return total + calculateItemSubtotal(item);
    }, 0);
  }, [cartList, calculateItemSubtotal]);

  const totalAmountWithShipping = useMemo(() => {
    return totalAmount + flatPrice;
  }, [totalAmount, flatPrice]);

  const [checkOut] = useCheckOutMutation();

  const handleSubmit = () => {
    setMessage("");
    setErrors({});
    checkOut({ data: checkOurtForm.values, cartId })
      .unwrap()
      .then((response) => {
        window.location.href = response.url;
      })
      .catch((error) => {
        console.error("Checkout failed:", error);
        setMessage("Checkout failed");
      });
  };

  const checkOurtForm = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "+20",
    },
    validationSchema: Yup.object().shape({
      details: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^01[0125][0-9]{8}$/, "Invalid phone number"),
    }),
    onSubmit: handleSubmit,
  });

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div>
        <ErrorComponent />
      </div>
    );

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-10">
        <div className="container mx-auto flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

            <div className="flex justify-end mb-4">
              <button
                className="p-2 rounded-lg bg-baby-green text-white font-semibold"
                onClick={() => handleClearCart()}
              >
                Clear Cart
              </button>
            </div>

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
                        <h2 className="font-semibold">{item.product.title}</h2>
                      </div>
                    </td>
                    <td className="py-4">${item.price.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          className="px-2 py-1 bg-gray-300 rounded"
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          -
                        </button>
                        <span className="mx-2 font-semibold">
                          {quantities[item._id] || 1}
                        </span>
                        <button
                          className="px-2 py-1 bg-gray-300 rounded"
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4">${calculateItemSubtotal(item)}</td>
                    <td className="py-4">
                      <button
                        className="p-2 my-2 bg-dark-simon rounded-lg font-semibold text-white justify-end items-end"
                        onClick={() => handlRemoveItem(item._id)}
                      >
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
              <Link to="/products">
                <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                  Continue Shopping
                </button>
              </Link>
              <button className="bg-[#FF8B94] text-white px-4 py-2 rounded hover:bg-[#F76C78]">
                Update Cart
              </button>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Cart Totals</h2>

            <form onSubmit={checkOurtForm.handleSubmit}>
              <FormField
                label="Address"
                name="details"
                type="text"
                value={checkOurtForm.values.details}
                onChange={checkOurtForm.handleChange}
                onBlur={checkOurtForm.handleBlur}
                error={checkOurtForm.errors.details}
                backendError={
                  errors && errors["details"] ? errors["details"] : null
                }
                touched={checkOurtForm.touched.details}
                placeholder="Enter your address"
              />

              <FormField
                label="City"
                name="city"
                type="text"
                value={checkOurtForm.values.city}
                onChange={checkOurtForm.handleChange}
                onBlur={checkOurtForm.handleBlur}
                error={checkOurtForm.errors.city}
                backendError={errors && errors["city"] ? errors["city"] : null}
                touched={checkOurtForm.touched.city}
                placeholder="Enter your city"
              />

              <FormField
                label="Phone Number"
                name="phone"
                type="number"
                value={checkOurtForm.values.phone}
                onChange={checkOurtForm.handleChange}
                onBlur={checkOurtForm.handleBlur}
                error={checkOurtForm.errors.phone}
                backendError={
                  errors && errors["phone"] ? errors["phone"] : null
                }
                touched={checkOurtForm.touched.phone}
                placeholder="Enter your phone number"
              />

              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Shipping</span>
                <select
                  onChange={handleFlatRate}
                  className="border p-2 rounded"
                >
                  <option value={0}>Free Shipping</option>
                  <option value={5}>$5 Flat Rate</option>
                </select>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span>${totalAmountWithShipping.toFixed(2)}</span>
              </div>

              <button
                onClick={() => handleSubmit()}
                disabled={
                  !checkOurtForm.values.details ||
                  !checkOurtForm.values.city ||
                  !checkOurtForm.values.phone
                }
                type="submit"
                className={`w-full py-3 rounded-lg ${
                  !checkOurtForm.values.details ||
                  !checkOurtForm.values.city ||
                  !checkOurtForm.values.phone
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FF8B94] hover:bg-[#F76C78]"
                } text-white`}
              >
                Checkout
              </button>

              <div className="flex justify-center items-center mt-4">
                <span className="text-sm text-gray-600">or</span>
              </div>

              <button className="bg-[#89AFF0] text-white w-full py-3 mt-4 rounded-lg hover:bg-[#69A0E0]">
                PayPal
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
