import axios from "axios";

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_SERVER,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_SERVER,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
