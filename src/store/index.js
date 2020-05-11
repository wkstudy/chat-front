import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let sessionStorage = window.sessionStorage
export default new Vuex.Store({
  state: {
    username: '',
    avatar: ''
  },
  mutations: {
    setUserName (state, payload) {
      state.username = payload.username
    },
    setAvatar (state, payload) {
      state.avatar = payload.avatar
    }
  },
  actions: {


  },
  modules: {
  }
})
