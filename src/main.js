import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  axios,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
