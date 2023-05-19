import axios from "axios";
import { getSession } from "next-auth/react";
import Router from "next/router";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Change request data/error here
http.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Change response data/error here
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === "GEENIA_ERROR.NOT_AUTHORIZED")
    ) {
      // Cookies.remove("AUTH_CRED");
      Router.push("/auth/signin");
    }
    return Promise.reject(error);
  }
);

export default http;
