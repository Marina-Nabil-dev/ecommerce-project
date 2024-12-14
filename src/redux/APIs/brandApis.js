import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HomeRoutes } from "../../routes/home";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_DEVELOP_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept-Language", "en");
      return headers;
    },
  }),
  keepUnusedDataFor: 60 * 5,
  refetchOnMountOrArgChange: false,
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: ({currentPage , limit}) => HomeRoutes.BRANDS + `?page=${currentPage}&limit=${limit}`,
      transformResponse: (response) => {
      
        if (response.result !=0) {
          return {
            brands: response.data,
            totalCount : response.result
          };
        } else {
          return {
            brands: [],
            totalCount :0
          };
        }
      },
    }),
  }),
});

export const { useGetAllBrandsQuery } = brandApi;
