import axios from "axios";

const baseURL = "/api";

export const publicApi = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origReq = error.config;

    if (error.response?.status === 401 && !origReq._retry) {
      origReq._retry = true;

      try {
        await refreshApi.post("/auth/refresh");

        return api(origReq);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
