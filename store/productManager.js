export const state = () => ({
  products: [],
  product: {
    title: '',
    type: '',
    price: 0,
    rating: 0,
    description: '',
  },
})

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  },

  setProduct(state, payload) {
    state.product = payload
  },

  handlerProduct(state, payload) {
    state.product = { ...state.product, ...payload }
  },
}

export const actions = {
  async fetchProducts({ commit }) {
    const { data } = await this.$axios.get('/products')

    commit('setProducts', data)
  },

  async addProduct({ dispatch, commit }, payload) {
    await this.$axios
      .post('/products', payload)
      .then((result) => {
        const { message } = result.data
        dispatch('fetchProducts')
        commit(
          'statusManager/setAlertMessage',
          { message, type: 'success' },
          { root: true }
        )
      })
      .catch((err) => {
        const { status } = err.response
        if (status) {
          const message = 'Error in the send file!'
          commit(
            'statusManager/setAlertMessage',
            { message, type: 'error' },
            { root: true }
          )
        }
      })
    commit('statusManager/openAlert', null, { root: true })
  },

  async updateProduct({ dispatch, commit, state }) {
    const { product } = state
    await this.$axios
      .put(`/products/${product.id}`, product)
      .then((result) => {
        const { message } = result.data
        dispatch('fetchProducts')
        commit(
          'statusManager/setAlertMessage',
          { message, type: 'success' },
          { root: true }
        )
      })
      .catch((err) => {
        const { status } = err.response
        if (status) {
          const message = 'Error in the save product!'
          commit(
            'statusManager/setAlertMessage',
            { message, type: 'error' },
            { root: true }
          )
        }
      })

    commit('statusManager/openAlert', null, { root: true })
    commit('statusManager/closeModal', null, { root: true })
  },
}
