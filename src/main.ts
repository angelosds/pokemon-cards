import Vue from "vue";

import i18n from "./i18n";
import router from "./router";
import store from "./store";

import "./axios";
import "./registerServiceWorker";

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
