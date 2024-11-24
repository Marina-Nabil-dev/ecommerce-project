import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "../redux/APIs/categoryApi";
import Spinner from "../icons/Spinner";

export default function AllCategories() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: { categories = [] } = {}, isLoading } =
    useGetAllCategoriesQuery({ currentPage, limit: 8 });
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-8 mx-5 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            All Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-3 mt-6 text-center">
            {categories.map((category) => (
              <div
                key={category.id}
                className="border-[3px] rounded-lg p-4 hover:border-simon "
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="mx-auto h-24 w-32"
                />
                <h3 className="mt-4  font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
