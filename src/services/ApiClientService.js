import axios from "axios";
import httpStatus from "http-status-codes";
// import store from "@/store/store";
// import router from "@/router/router";

const baseURL = import.meta.env.VITE_BASE_URL;

const ApiClientService = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

ApiClientService.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) config.headers.authorization = user.acessToken;
  return config;
});

ApiClientService.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    if (error.response.status === 401) {
      // store.dispatch("userStore/setUser", {});
      localStorage.removeItem("user");
      router.push("/login");
    }
    const finalError = error;
    if (error.response) {
      if (error.response?.status === httpStatus.UNAUTHORIZED) {
        finalError.message = "Your session has expired. Please login again.";
      } else {
        finalError.message =
          error.response?.data?.error_description ||
          error.response?.data?.name ||
          "An error has occurred.";
      }
    }
    return Promise.reject(finalError);
  }
);

export default ApiClientService;
