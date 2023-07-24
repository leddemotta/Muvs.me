import { createApp } from "vue";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createPinia } from 'pinia';

import ApiClientService from "./plugins/axios";
//import AxiosPlugin from "./plugins/axios";
// import axios from "axios";
// import VueAxios from "vue-axios";

// import Icon from "@ant-design/icons-vue";
// app.component(Icon);

const pinia = createPinia();

const app = createApp(App).use(Antd).use(store).use(router).use(ApiClientService).use(pinia);

//console.log("AxiosPlugin 2", app.use(AxiosPlugin));

app.mount("#app");
