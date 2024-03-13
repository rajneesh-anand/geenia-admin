import useAxiosAuth from "@framework/useAxiosAuth";
import { useQuery } from "react-query";
import { mapPaginatorData } from "@framework/data-mapper";

async function fetchBlogs({ queryKey }) {
  const http = useAxiosAuth();
  const [_key, _params] = queryKey;
  const { page, limit } = _params;
  console.log(page);
  console.log(limit);
}
// const fetchBlogs = async ({ queryKey }) => {
//   const http = useAxiosAuth();
//   const [_key, _params] = queryKey;
//   const { page, limit } = _params;
//   console.log(page);
//   console.log(limit);

//   const {
//     data: { blogs, ...rest },
//   } = await http.get(`/blog/list?limit=${limit}&page=${page}`);

//   return {
//     blogs: { blogs, paginatorInfo: mapPaginatorData({ ...rest }) },
//   };
// };

const useBlogQuery = (params, options = {}) => {
  return useQuery([, params], fetchBlogs, {
    ...options,
    keepPreviousData: true,
  });
};

export { useBlogQuery };
