import React, { useState } from "react";
import { useGetAllOrdersQuery } from "../redux/APIs/orderApis";
import Spinner from "../icons/Spinner";
import { Link } from "react-router-dom";

export default function Orders() {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: { orders = [], totalCount = 0 } = {},
    isLoading,
    isError,
  } = useGetAllOrdersQuery({ currentPage, limit });
  const totalPages = Math.ceil(totalCount / limit);
  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-8">Orders List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">User Name</th>
                  <th className="py-3 px-6 text-left">Cart Items</th>
                  <th className="py-3 px-6 text-left">Total Price</th>
                  <th className="py-3 px-6 text-left">Paid At</th>
                  <th className="py-3 px-6 text-left">Payment Method</th>
                  <th className="py-3 px-6 text-left">Is Delivered</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100"
                    key={order.id}
                  >
                    <td className="py-4 px-6">{order.id}</td>
                    <td className="py-4 px-6">{order.user.name}</td>
                    <td className="py-4 px-6">{order.cartItems.length}</td>
                    <td className="py-4 px-6">${order.totalOrderPrice}</td>
                    <td className="py-4 px-6">{order.paidAt ?? `Not Paid`}</td>
                    <td className="py-4 px-6">{order.paymentMethodType}</td>
                    <td className="py-4 px-6">
                      {order.isDelivered == true ? `Yes` : `No`}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/order/${order.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8">
                    <div className="flex justify-center items-center mx-2 p-2">
                      <button
                        className="bg-simon hover:bg-dark-simon text-white font-bold py-2 px-4 rounded-l"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        hidden={isFirstPage}
                      >
                        Previous
                      </button>
                      <span className="mx-2"> Page {currentPage} </span>
                      <button
                        className="bg-simon hover:bg-dark-simon  text-white  font-bold py-2 px-4 mx-1 rounded-r"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        hidden={isLastPage}
                      >
                        Next
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
