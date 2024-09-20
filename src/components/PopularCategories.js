import React, { useEffect, useState } from "react";
import { getApiData } from "../helpers/getApiData";
import { HomeRoutes } from "../routes/home";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getApiData(HomeRoutes.CATEGORIES);
      const firstFiveCategories = response.slice(0, 5);
      setCategories(firstFiveCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="my-8 p-4">
      <h2 className="text-center text-2xl text-baby-purple font-semibold">
        Popular Categories
      </h2>
      <div className="grid md:grid-cols-3 gap-3 mt-6 text-center">
        {categories.map((category) => (
          <div
            key={category.id}
            className="border border-baby-purple rounded-lg p-4"
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
  );
};

export default PopularCategories;
