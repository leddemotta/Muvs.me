// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//     token: localStorage.getItem("token"),
//     isLoggedIn: localStorage.getItem("isLoggedIn")
//       ? localStorage.getItem("isLoggedIn")
//       : false,
//     userId: localStorage.getItem("userId"),
//   },
//   mutations: {},
//   actions: {},
//   modules: {},
//   getters: {},
// });

import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      // Your state properties go here
      token: localStorage.getItem("token"),
      isLoggedIn: localStorage.getItem("isLoggedIn")
        ? localStorage.getItem("isLoggedIn")
        : false,
      userId: localStorage.getItem("userId"),
    };
  },
  mutations: {
    // Your mutations go here
  },
  actions: {
    // Your actions go here
  },
  getters: {
    // Your getters go here
  },
});

export default store;
