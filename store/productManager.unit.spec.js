import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import * as productManager from '@/store/productManager.js'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('productManager - unit', () => {
  let store, products
  beforeEach(() => {
    store = new Store(cloneDeep(productManager))
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
        Promise.resolve({ data: { message: 'success' } })
      )
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return the state', () => {
    store.commit('setProducts', products)

    expect(store.state).toEqual({ products })
  })

  it('should return products', async () => {
    await store.dispatch('fetchProducts')

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state).toEqual({ products })
  })

  it('should add product', async () => {
    const product = {
      title: 'Brown eggs',
      type: 'dairy',
      description: 'Raw organic brown eggs in a basket',
      price: 28.1,
      rating: 4,
    }

    await store.dispatch('addProduct', product)

    expect(axios.post).toHaveBeenCalledWith('/products', product)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state).toEqual({ products })
  })
})
