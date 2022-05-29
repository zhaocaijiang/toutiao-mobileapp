import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'USER.TOKEN'
export default new Vuex.Store({
  state: {
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  getters: {
  },
  mutations: {
    // 修改用户存储的token
    setUser (state, data) {
      state.user = data
      // 存储到本地
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
