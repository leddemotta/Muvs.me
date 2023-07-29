import { defineStore } from "pinia";

export const useUserStore = defineStore({
  // Nome do store
  id: "userStore",
  // Função para criar o estado inicial
  state: () => ({
    userId: null,
    token: null,
    isLoggedIn: false,
  }),
  // Mutations para alterar o estado
  actions: {
    setLoggedInUser(userId, token, isLoggedIn) {
      this.userId = userId;
      this.token = token;
      this.isLoggedIn = isLoggedIn;
    },
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});
