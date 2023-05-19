import {
  QueryParamsType,
  TestinomialQueryOptionsType,
} from "src/types/custom.types";
import { mapPaginatorData, stringifySearchQuery } from "@utils/data-mappers";
import { useQuery } from "react-query";
import Service from "@repositories/service";
import { API_ENDPOINTS } from "@utils/api/endpoints";

const fetchService = async ({ queryKey }: QueryParamsType) => {
  const [_key, params] = queryKey;
  const { page, limit, orderBy, sortedBy } =
    params as TestinomialQueryOptionsType;

  const url = `${API_ENDPOINTS.SERVICE}?limit=${limit}&page=${page}&orderBy=${orderBy}&sortedBy=${sortedBy}`;
  const {
    data: { data, ...rest },
  } = await Service.all(url);

  return { products: { data, paginatorInfo: mapPaginatorData({ ...rest }) } };
};

const useServiceQuery = (
  params: TestinomialQueryOptionsType,
  options: any = {}
) => {
  return useQuery<any, Error>([API_ENDPOINTS.SERVICE, params], fetchService, {
    ...options,
    keepPreviousData: true,
  });
};

export { useServiceQuery, fetchService };
