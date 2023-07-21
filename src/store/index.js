import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    isLoggedIn: localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : false,
    userId: localStorage.getItem("userId"),
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {},
});
