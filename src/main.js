import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import store from "./store/index"
// 导入axios
import axios from "axios";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

Vue.prototype.$http = axios.create({
  baseURL: "http://www.aimmeng.com:1903",
});

Vue.config.productionTip = false;

import VueParticles from "vue-particles";
Vue.use(VueParticles);

import "bootstrap/dist/css/bootstrap.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
