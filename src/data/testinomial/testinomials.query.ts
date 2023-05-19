import {
  QueryParamsType,
  TestinomialQueryOptionsType,
} from "src/types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Testinomial from "@repositories/testinomial";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchTestinomial = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const {
    page,
    limit = 25,
    orderBy = "created_at",
    sortedBy = "DESC",
  } = params as TestinomialQueryOptionsType;

  const url = `${API_ENDPOINTS.TESTINOMIAL}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Testinomial.all(url);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useTestinomialQuery = (
  params: TestinomialQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>(
    [API_ENDPOINTS.TESTINOMIAL, params],
    fetchTestinomial,
    {
      ...options,
      keepPreviousData: true,
    }
  );
};

export { useTestinomialQuery, fetchTestinomial };
