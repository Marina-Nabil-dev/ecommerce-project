import React from "react";
import { useParams } from "react-router-dom";
import { useGetAllOrdersQuery } from "../redux/APIs/orderApis";

const OrderPage = () => {
  const { id } = useParams();
  const {
    data: { orders = [] } = {},
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ currentPage: 0 });

  const order = orders.find((order) => order.id.toString() === id.toString());
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Order Details for Order ID: {id}
      </h1>
      <div className="grid grid-cols-3 justify-center items-center bg-white border gap-2 border-gray-200 rounded-lg shadow-md p-4">
        <p>
          <strong>User Name:</strong> {order.user.name}
        </p>
        <p>
          <strong>User Email:</strong> {order.user.email}
        </p>

        <p>
          <strong>Payment Method :</strong> {order.paymentMethodType}
        </p>

      
        <p>
          <strong>Shipping Price :</strong> ${order.shippingPrice}
        </p>

        <p>
          <strong>Tax Price :</strong> ${order.taxPrice}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.totalOrderPrice}
        </p>
        {/* <ul className="">{order.cartItems.map((item) => {})}</ul> */}
        <p>
          <strong>Shipping Details :</strong>{" "}
          <ul className="">
            <li>City : {order.shippingAddress.city}</li>
            <li>Phone Number : {order.shippingAddress.phone}</li>
            <li>Address : {order.shippingAddress.details}</li>
          </ul>
        </p>

        <p>
          <strong>Is Delivered:</strong> {order.isDelivered == true ? "Yes" : "No"}
        </p>

        <p>
          <strong>Is Paid:</strong> {order.isPaid == true ? "Yes" : "No"}
        </p>
        <p>{/* <strong>Items:</strong> {order.items.join(", ")} */}</p>
      </div>
      {/* <p>
          <strong>User Name:</strong> {order.user.name}
        </p>
        <p>
          <strong>User Email:</strong> {order.user.email}
        </p> */}
    </div>
  );
};

export default OrderPage;
