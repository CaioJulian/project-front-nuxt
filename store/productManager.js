export const state = () => ({
  products: [],
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },
}

export const actions = {
  async fetchProducts({ commit }) {
    const { data } = await this.$axios.get('/products')

    commit('setProducts', data)
  },

  async addProduct({ dispatch }, payload) {
    await this.$axios.post('/products', payload)

    dispatch('fetchProducts')
  },
}
