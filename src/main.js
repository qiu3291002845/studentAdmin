import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import axios from "axios";

Vue.prototype.$http = axios.create({
  baseURL: "http://127.0.0.1:3000",
});
Vue.config.productionTip = false;

import VueParticles from "vue-particles";
Vue.use(VueParticles);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
