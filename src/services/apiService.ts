import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const user_api = axios.create({
  baseURL: "http://localhost:8081/api",
});

export const album_api = axios.create({
  baseURL: "http://localhost:8082/api",
});

user_api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("@Auth.Token");

    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

album_api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("@Auth.Token")?.replace(/['"]/g, '');

    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
