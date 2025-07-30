import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      message: 'Bonjour Adel !'
    }
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    }
  },
  actions: {
    updateMessage({ commit }, payload) {
      commit('setMessage', payload)
    }
  },
  getters: {
    message: (state) => state.message
  }
})
