import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const origReq = error.config;

    if (origReq.skipAuthRefresh) {
      return Promise.reject(error);
    }

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
