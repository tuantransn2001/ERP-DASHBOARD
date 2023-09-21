import axios from "axios";
import { env } from "src/env/env";

axios.defaults.headers.post["Content-Type"] = "application/json";

const api = axios.create({
  baseURL: env.baseURL,
});

const token: string = localStorage.getItem("token") ?? "";

const [token_type, access_token]: string[] = token.split(" ");

api.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers["content-type"] = "application/json";
      config.headers.Authorization = `${token_type} ${access_token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
