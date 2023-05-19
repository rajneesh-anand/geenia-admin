import Testinomial from "@repositories/testinomial";
import { useQuery } from "react-query";
import { Testinomial as T } from "src/types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchTestinomial = async (slug: string) => {
  const { data } = await Testinomial.find(
    `${API_ENDPOINTS.TESTINOMIAL}/${slug}`
  );
  return data.data;
};

export const useTestinomialQuery = (slug: string) => {
  return useQuery<T, Error>([API_ENDPOINTS.TESTINOMIAL, slug], () =>
    fetchTestinomial(slug)
  );
};
