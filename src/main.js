import { createApp } from "vue";
import { createPinia } from "pinia";
import eng from "./locales/en.json";
import br from "./locales/br.json";

import Antd from "ant-design-vue";
import VueTheMask from "vue-the-mask";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "en", // Default locale
  fallbackLocale: "en", // Fallback locale
  messages: {
    en: eng,
    ptBr: br,
    // Other locales and their messages go here
  },
});

import "./assets/css/tailwind.css";

import ApiClientService from "./plugins/axios";

const pinia = createPinia();

const app = createApp(App)
  .use(i18n)
  .use(VueTheMask)
  .use(Antd)
  .use(i18n)
  .use(store)
  .use(router)
  .use(ApiClientService)
  .use(pinia);

app.mount("#app");
