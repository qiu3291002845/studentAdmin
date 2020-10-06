import Vue from 'vue'
import Vuex from "vuex"
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        userInfo: {
            "avatar": "",
            "role": {
                "purview": [
                ],
                "time": "",
                "_id": "",
                "type": 0,
                "description": "",
                "name": "",
                "__v": 0
            },
            "time": "",
            "_id": "",
            "username": "",
            "password": "",
            "name": "",
            "email": "",
            "__v": 0
        },
    }
})
export default store