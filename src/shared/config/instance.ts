import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GAMES_API_URL!,
  headers: {
    "Client-ID": process.env.NEXT_PUBLIC_API_CLIENT_ID!,
    Accept: "application/json",
  },
  withCredentials: true,
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
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      console.log(error.config);
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
