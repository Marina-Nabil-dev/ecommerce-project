import React from "react";
import Spinner from "../../icons/Spinner";
import { useGetAllCategoriesQuery } from "../../redux/APIs/categoryApi";
import { Link } from "react-router-dom";
import { NavbarRoutes } from "../../routes/navbarRoutes";

const PopularCategories = () => {
  const { data: { categories = [] } = {}, isLoading } =
    useGetAllCategoriesQuery({ page: 1, limit: 5 });

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

            <div className="flex text-center items-center justify-center px-28">
              <a className=" text-dark-simon font-bold text-2xl px-4 py-2">
                <Link to={NavbarRoutes.ALL_CATEGORIES}>View All</Link>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularCategories;
