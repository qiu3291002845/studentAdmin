import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//引入axios
import axios from "axios"

Vue.prototype.$http =axios.create({
  baseURL:"http://www.aimmeng.com:1903/"
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
