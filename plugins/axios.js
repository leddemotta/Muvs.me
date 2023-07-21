import Vue from "vue";
import axios from "axios";

Vue.use({
  install(Vue) {
    let url = "http://localhost:9000"; //https://api.muvs.me/v1

    Vue.prototype.$http = axios.create({
      baseURL: url,
    });

    Vue.prototype.$http.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    Vue.prototype.$http.interceptors.response.use((res) => {
      return res;
    });
  },
});
