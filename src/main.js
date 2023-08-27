import { createApp } from "vue";
import { createPinia } from "pinia";

import Antd from "ant-design-vue";
import VueTheMask from "vue-the-mask";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import './assets/css/tailwind.css';

import ApiClientService from "./plugins/axios";

const pinia = createPinia();

const app = createApp(App)
  .use(VueTheMask)
  .use(Antd)
  .use(store)
  .use(router)
  .use(ApiClientService)
  .use(pinia);

app.mount("#app");