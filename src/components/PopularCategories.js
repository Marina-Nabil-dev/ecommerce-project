import React, { useEffect, useState } from "react";
import { getApiData } from "../helpers/getApiData";
import { HomeRoutes } from "../routes/home";
import { useQuery } from "react-query";
import Spinner from "./../icons/Spinner";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  function fetchCategories() {
    const response = getApiData(HomeRoutes.CATEGORIES);
    return response;
  }

  let { isLoading, isFetching, error, data , refetch} = useQuery(
    "categories",
    fetchCategories,
    {
      staleTime: 1000 * 60 * 5, // Cache data for 5 minutes (300,000 ms)
      cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes even if unused
      refetchInterval: 1000 * 60 * 5, // Refetch data every 5 minutes,
      onSuccess: (data) => {
        setCategories(data[0]);
        setTotalCount(data[1]);
      },
    }
  );
  const firstFiveCategories = categories?.slice(0, 5);

  useEffect(() => {
    refetch();
  }, [firstFiveCategories.length == 0]);


  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="my-8 p-4">
          <h2 className="text-center text-2xl text-baby-purple font-semibold">
            Popular Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-3 mt-6 text-center">
            {firstFiveCategories.map((category) => (
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
    </>
  );
};

export default PopularCategories;
