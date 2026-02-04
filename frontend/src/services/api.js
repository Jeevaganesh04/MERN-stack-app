import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

api.interceptors.request.use(
  config => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    console.log('Full URL:', config.baseURL + config.url);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;