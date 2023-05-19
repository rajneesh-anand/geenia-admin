import {
  QueryParamsType,
  ProductsQueryOptionsType,
} from "src/types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Order from "@repositories/order";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchOrders = async ({ queryKey }: any) => {
  const [_key, params] = queryKey;
  const { page, limit, orderBy, sortedBy } = params as ProductsQueryOptionsType;

  const url = `${API_ENDPOINTS.ORDERS}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Order.all(url);

  return { orders: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useOrdersQuery = (
  params: ProductsQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.ORDERS, params], fetchOrders, {
    ...options,
    keepPreviousData: true,
  });
};

export { useOrdersQuery, fetchOrders };
