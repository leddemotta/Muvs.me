// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "@/custom-theme.less";`,
          },
        },
      },
    },
  },
};