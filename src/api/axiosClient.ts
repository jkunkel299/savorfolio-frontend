import axios from "axios";

let authToken: string | null = localStorage.getItem("token");

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (authToken) {
    localStorage.setItem("token", authToken);
  } else {
    localStorage.removeItem("token");
  }
};

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor to handle requests and inject the token
axiosClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// interceptor to handle responses
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // remove invalid token
      localStorage.removeItem("token");
      // redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
