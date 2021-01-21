module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/variables";'
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
