import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://66a88517e40d3aa6ff585239.mockapi.io"
})

axiosInstance.interceptors.request.use(
    (config) => {   
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  