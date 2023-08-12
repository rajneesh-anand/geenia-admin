import { useQuery } from "react-query";
import { mapPaginatorData } from "@utils/data-mappers";
import axios from "axios";

const fetchOrders = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { page, limit } = _params;

  const {
    data: { data, ...rest },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/order/list?limit=${limit}&page=${page}`
  );
  return { orders: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useOrdersQuery = (params, options = {}) => {
  return useQuery([, params], fetchOrders, {
    ...options,
    keepPreviousData: true,
  });
};

export { useOrdersQuery };
