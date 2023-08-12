import { useQuery } from "react-query";
import { mapPaginatorData } from "@utils/data-mappers";
import axios from "axios";

const fetchUsers = async ({ queryKey }) => {
  const [_key, _params] = queryKey;
  const { page, limit } = _params;

  const {
    data: { data, ...rest },
  } = await axios.get(
    `${process.env.NEXT_PUBLIC_NODE_API_SERVER}/user/list?limit=${limit}&page=${page}`
  );
  return { users: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useUsersQuery = (params, options = {}) => {
  return useQuery([, params], fetchUsers, {
    ...options,
    keepPreviousData: true,
  });
};

export { useUsersQuery };
