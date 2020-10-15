import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index"
import axios from "axios";
import VueCookies from "vue-cookies";
// import "./plugins/element.js";
Vue.use(VueCookies);
Vue.prototype.$http = axios.create({
  baseURL: "http://www.aimmeng.com:1903",
});
Vue.config.productionTip = false;
import VueParticles from "vue-particles";
Vue.use(VueParticles);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
