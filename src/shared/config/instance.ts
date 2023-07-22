import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.GAMES_API_URL!,
  headers: {
    "Client-ID": process.env.API_CLIENT_ID!,
    Accept: "application/json",
  },
});
