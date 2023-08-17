import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    userId: null,
    token: null,
    isLoggedIn: false,
    user: {},
  }),
  actions: {
    setLoggedInUser(userId, token, isLoggedIn) {
      this.userId = userId;
      this.token = token;
      this.isLoggedIn = isLoggedIn;

      // Store the user data in session storage
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("isLoggedIn", isLoggedIn);
    },
    logout() {
      this.isLoggedIn = false;
      this.userId = null;
      this.token = null;
      this.user = null;

      // Remove the user data from session storage
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("user");
    },
    setToken(token) {
      this.token = token;
    },
    setUser(user) {
      this.user = user;
      sessionStorage.setItem("user", user);
    },
    clearUser() {
      this.user = null;
    },
    checkSessionStorage() {
      // Check if the user is logged in (e.g., during app initialization)
      const user = sessionStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
        this.isLoggedIn = true;
      }
    },
  },
});
