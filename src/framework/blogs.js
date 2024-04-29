import { makeRequest } from "@framework/api-request";

export function getBlogs() {
  return makeRequest("/post/list");
}

export function getBlog(id) {
  return makeRequest(`/post/${id}`);
}
