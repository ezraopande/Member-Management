import axios from 'axios';
import { baseUrl } from './constants/api.constant';

const api = axios.create({
    baseURL: baseUrl,
});
  
api.interceptors.request.use(function (config) {
    let token = undefined;
    let hostname = process.env.REACT_CLIENT_HOST_URL;
  
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
  
    if (token) config.headers.authorization = `Bearer ${token}`;
    if (hostname) config.headers["origin"] = hostname;
    config.headers["Accept"] = 'application/json'
    return config;
});

export default api;
