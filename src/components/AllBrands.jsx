import React, { useState } from "react";
import { useGetAllBrandsQuery } from "../redux/APIs/brandApis";
import NotFound from "./NotFound";
import Spinner from "../icons/Spinner";

export default function AllBrands() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9;

  const {
    data: { brands = [], totalCount = 0 } = {},
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllBrandsQuery({ currentPage, limit });

  const totalPages = Math.ceil(totalCount / limit);

  const isLastPage = currentPage === totalPages;

  setTimeout(() => {
    if (brands.length === 0) {
        return <NotFound />;
      }
  }, 1000);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-8 mx-5 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            All Brands
          </h2>
          <div className="grid md:grid-cols-3 gap-3 mt-6 text-center">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="border-[3px] rounded-lg p-4 hover:border-simon "
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="mx-auto h-24 w-32"
                />
                <h3 className="mt-4  font-semibold">{brand.name}</h3>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-baby-purple hover:bg-blue-500 text-white rounded"
              hidden={currentPage === 1}
            >
              Previous
            </button>

            <div className="flex space-x-2 px-2">
              {/* Show previous page button if on a page greater than 1 */}
              {currentPage > 1 && (
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  isLoading={isFetching}
                  className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-300"
                >
                  {currentPage - 1}
                </button>
              )}

              {/* Show current page button */}
              <button className="px-3 py-1 rounded-full bg-blue-500 text-white">
                {currentPage}
              </button>

              {/* Show next page button only if not on the last page */}
              {!isLastPage && (
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  isLoading={isFetching}
                  className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-blue-300"
                >
                  {currentPage + 1}
                </button>
              )}
            </div>

            {/* Disable Next button if it's the last page */}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-baby-purple hover:bg-blue-500 text-white rounded"
              hidden={isLastPage}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
