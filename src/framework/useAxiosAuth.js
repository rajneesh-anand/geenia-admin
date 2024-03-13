import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { http } from "./axios";

const useAxiosAuth = () => {
  const { data: session } = useSession();
  useEffect(() => {
    const requestIntercept = http.interceptors.request.use((config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
      }
      return config;
    });
    return () => {
      http.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return http;
};

export default useAxiosAuth;
