// import Vue from "vue";
// import axios from "axios";

// Vue.use({
//   install(Vue) {
//     let url = "http://localhost:9000"; //https://api.muvs.me/v1

//     Vue.prototype.$http = axios.create({
//       baseURL: url,
//     });

//     Vue.prototype.$http.interceptors.request.use((config) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     });

//     Vue.prototype.$http.interceptors.response.use((res) => {
//       return res;
//     });
//   },
// });

// axios.js
import axios from "axios";

const AxiosPlugin = {
  install(app) {
    // Create an Axios instance with custom configurations
    const axiosInstance = axios.create({
      baseURL: "https://api.example.com", // Set your API base URL here
    });

    // Add a request interceptor
    axiosInstance.interceptors.request.use((config) => {
      const token = "YOUR_ACCESS_TOKEN"; // Replace this with your actual token or get it from a storage like Vuex or localStorage
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // Add the Axios instance to the Vue app's prototype
    app.config.globalProperties.$axios = axiosInstance;
  },
};

export default AxiosPlugin;

// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:9000',
//   headers: {
//     Authorization: 'Bearer your-token',
//   },
// });

// export default instance;
