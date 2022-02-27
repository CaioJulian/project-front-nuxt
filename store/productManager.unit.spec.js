import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { cloneDeep } from 'lodash'
import * as productManager from '@/store/productManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('productManager - unit', () => {
  let store, products
  beforeEach(() => {
    store = new Store(cloneDeep(productManager))

    products = [
      {
        title: 'Brown eggs',
        type: 'dairy',
        rating: 4,
        price: 28.1,
        created_at: '01/01/2022',
      },
      {
        title: 'Sweet fresh stawberry',
        type: 'fruit',
        rating: 3,
        price: 29.45,
        created_at: '01/01/2022',
      },
    ]
  })

  it('should return the state', () => {
    store.commit('setProducts', products)

    expect(store.state).toEqual({
      products,
    })
  })

  it('should return products empty', () => {
    store.dispatch('fetchProducts')

    expect(store.state).toEqual({
      products: [],
    })
  })
})
