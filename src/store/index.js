import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        id: '',
    },
    mutations: {
        deposit(state, id) {
            state.id = id
        }
    }
})
export default store