import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  // Nome do store
  id: 'userStore',
  // Função para criar o estado inicial
  state: () => ({
    user: null,
  }),
  // Mutations para alterar o estado
  actions: {
    setUser(user) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },
});