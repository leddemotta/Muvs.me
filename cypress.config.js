const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "bv22dy",
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://127.0.0.1:5173",
  },
  compilerOptions: {
    types: ["cypress"],
  },
  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
  // component: {
  //   specPattern: "src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}",
  //   devServer: {
  //     framework: "vue",
  //     bundler: "vite",
  //   },
  // },
});
