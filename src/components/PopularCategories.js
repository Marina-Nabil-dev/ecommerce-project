import React from "react";

const PopularCategories = () => {
  const categories = [
    { id: 1, name: "Electronics", image: "/images/electronics.png" },
    { id: 2, name: "Clothing", image: "/images/clothing.png" },
    { id: 3, name: "Home Appliances", image: "/images/appliances.png" },
    { id: 4, name: "Books", image: "/images/books.png" },
  ];

  return (
    <div className="my-8 p-4">
      <h2 className="text-center text-2xl text-baby-blue">
        Popular Categories
      </h2>
      <div className="grid md:grid-cols-4 gap-4 mt-6 text-center">
        {categories.map((category) => (
          <div key={category.id} className="border rounded p-4">
            <img
              src={category.image}
              alt={category.name}
              className="mx-auto h-20"
            />
            <h3 className="mt-4">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
