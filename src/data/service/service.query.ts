import Service from "@repositories/service";
import { useQuery } from "react-query";
import { Service as T } from "src/types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";

export const fetchService = async (slug: string) => {
  const { data } = await Service.find(`${API_ENDPOINTS.SERVICE}/${slug}`);
  return data.data;
};

export const useServiceQuery = (slug: string) => {
  return useQuery<T, Error>([API_ENDPOINTS.SERVICE, slug], () =>
    fetchService(slug)
  );
};
