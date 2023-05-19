import {
  QueryParamsType,
  ProductsQueryOptionsType,
} from "src/types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Product from "@repositories/product";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchProducts = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    limit = 25,
    orderBy = "created_at",
    sortedBy = "DESC",
  } = params as ProductsQueryOptionsType;

  const url = `${API_ENDPOINTS.USERS}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Product.all(url);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useProductsQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.USERS, params], fetchProducts, {
    ...options,
    keepPreviousData: true,
  });
};

export { useProductsQuery, fetchProducts };
