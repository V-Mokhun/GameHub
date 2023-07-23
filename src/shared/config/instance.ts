import { COOKIE_TOKEN_NAME } from "@shared/consts";
import { getCookie } from "@shared/lib";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/igdb",
  headers: {
    "Client-ID": process.env.NEXT_PUBLIC_API_CLIENT_ID!,
    Authorization: `Bearer ${getCookie(COOKIE_TOKEN_NAME)}`,
    Accept: "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = getCookie(COOKIE_TOKEN_NAME);
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const { data: token } = await axios.post(`/api/token`).catch((err) => {
        return Promise.reject(err);
      });
      error.config.headers["Authorization"] = `Bearer ${token}`;
      return axiosInstance(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
