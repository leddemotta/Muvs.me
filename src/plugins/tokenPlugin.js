export const tokenPlugin = {
  // `store` will be injected automatically by Pinia
  // when the plugin is used with `pinia.use(tokenPlugin)`
  onStoreSetup(store) {
    // Watch for changes to the `token` state and persist it in local storage
    store.$subscribe(
      (mutation) => {
        if (mutation.type === "setToken") {
          sessionStorage.setItem("token", mutation.payload);
        }
      },
      { prepend: true }
    );

    // On store initialization, retrieve the token from local storage and set it in the store
    const token = sessionStorage.getItem("token");
    if (token) {
      store.setToken(token);
    }
  },
};
