import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getApiData } from "../helpers/getApiData";
import { ProductRoutes } from "../routes/productRoutes";
import { useQuery } from "react-query";
import Spinner from "../icons/Spinner";

export default function ProductDetails() {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  function getProduct() {
    const response = getApiData(ProductRoutes.PRODUCT_DETAILS + id);
    return response;
  }

  let { isLoading, error , isFetched} = useQuery(["productDetails"], getProduct, {
    onSuccess: (data) => {
      setProduct(data[0]);
      
    },
  });
  return <>{isLoading && !isFetched ? <Spinner /> : (<div>Product Details</div>)}</>;
}
