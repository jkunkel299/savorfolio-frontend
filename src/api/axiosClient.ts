import axios from "axios";

// let authToken: string | null = localStorage.getItem("token");

// export const setAuthToken = (token: string | null) => {
//   authToken = token;
//   if (authToken) {
//     localStorage.setItem("token", authToken);
//   } else {
//     localStorage.removeItem("token");
//   }
// };

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptor to handle requests and inject the token
// axiosClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token") || authToken;
//     if (token) {
//       // ensure headers object exists & set Authorization
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// interceptor to handle responses
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // remove invalid token
//       localStorage.removeItem("token");
//       // redirect to login page
//       window.location.href = "/auth/login";
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosClient;
