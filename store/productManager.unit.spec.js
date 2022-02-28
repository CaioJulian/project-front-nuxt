import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import { actions, mutations, state } from '@/store/productManager.js'
import * as managerStatus from '@/store/statusManager.js'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('productManager - unit', () => {
  let store, products, statusManager
  beforeEach(() => {
    statusManager = {
      namespaced: true,
      ...managerStatus,
    }

    store = new Store({
      modules: {
        statusManager,
      },
      actions,
      mutations,
      state,
    })

    store.$axios = axios

    products = [
      {
        title: 'Brown eggs',
        type: 'dairy',
        rating: 4,
        price: 28.1,
        created_at: '01/01/2022',
      },
      {
        title: 'Sweet fresh strawberry',
        type: 'fruit',
        rating: 3,
        price: 29.45,
        created_at: '01/01/2022',
      },
    ]

    mockAxiosProducts()
  })

  const mockAxiosProducts = (shouldReject = false) => {
    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('error list')))
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: products }))
      axios.post.mockReturnValue(
        Promise.resolve({
          data: { message: 'Product created with success!' },
        })
      )
      axios.put.mockReturnValue(
        Promise.resolve({
          data: { message: 'Product update with success!' },
        })
      )
      axios.delete.mockReturnValue(
        Promise.resolve({
          data: { message: 'Product deleted with success!' },
        })
      )
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the state', () => {
    store.commit('setProducts', products)

    expect(store.state.products).toEqual(products)
  })

  it('should return products', async () => {
    await store.dispatch('fetchProducts')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state.products).toEqual(products)
  })

  it('should return success when add product', async () => {
    const product = {
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 28.1,
      rating: 4,
    }
    const message = 'Product created with success!'

    await store.dispatch('addProduct', product)

    expect(axios.post).toHaveBeenCalledWith('/products', product)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state.statusManager.alertMessage.message).toEqual(message)
  })

  it('should return error when add product', async () => {
    const product = {
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 28.1,
      rating: 4,
    }
    const err = {
      response: { status: 422 },
      data: { message: 'Error in the send file!' },
    }

    axios.post.mockReturnValue(Promise.reject(err))

    await store.dispatch('addProduct', product)

    expect(axios.post).toHaveBeenCalledWith('/products', product)
    expect(store.state.statusManager.alertMessage.message).toEqual(
      err.data.message
    )
  })

  it('should return success when update product', async () => {
    const product = {
      id: 1,
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 26.54,
      rating: 3,
    }

    store.commit('setProduct', product)

    const message = 'Product update with success!'

    await store.dispatch('updateProduct', product)

    expect(axios.put).toHaveBeenCalledWith(`/products/${product.id}`, product)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state.statusManager.alertMessage.message).toEqual(message)
  })

  it('should return error when update product', async () => {
    const product = {
      id: 1,
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 28.1,
      rating: 4,
    }
    const err = {
      response: { status: 422 },
      data: { message: 'Error in the save product!' },
    }

    store.commit('setProduct', product)

    axios.put.mockReturnValue(Promise.reject(err))

    await store.dispatch('updateProduct', product)

    expect(axios.put).toHaveBeenCalledWith(`/products/${product.id}`, product)
    expect(store.state.statusManager.alertMessage.message).toEqual(
      err.data.message
    )
  })

  it('should return success when delete product', async () => {
    const product = {
      id: 1,
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 26.54,
      rating: 3,
    }

    store.commit('setProduct', product)

    const message = 'Product deleted with success!'

    await store.dispatch('deleteProduct', product)

    expect(axios.delete).toHaveBeenCalledWith(
      `/products/${product.id}`,
      product
    )
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state.statusManager.alertMessage.message).toEqual(message)
  })

  it('should handler product', () => {
    const product = {
      id: 1,
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 28.1,
      rating: 4,
    }
    const title = 'Kiwi'

    store.commit('setProduct', product)

    store.commit('handlerProduct', { title })

    expect(store.state.product.title).toEqual(title)
  })
})
