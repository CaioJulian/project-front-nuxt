import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import PageHome from '.'
import AddFileInput from '@/components/AddFileInput.vue'
import ListProducts from '@/components/ListProducts.vue'
import { state, actions, mutations } from '@/store/productManager.js'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PageHome - integration', () => {
  let store, productManager, products

  beforeEach(() => {
    productManager = {
      namespaced: true,
      state,
      actions,
      mutations,
    }

    store = new Store({
      modules: {
        productManager,
      },
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

  const mountPageHome = () => {
    const wrapper = mount(PageHome, {
      store,
      localVue,
      stubs: {
        AddFileInput,
        ListProducts,
      },
    })

    return { wrapper }
  }

  const mockAxiosProducts = (shouldReject = false) => {
    if (shouldReject) {
      axios.get.mockReturnValue(Promise.reject(new Error('error list')))
    } else {
      axios.get.mockReturnValue(Promise.resolve({ data: products }))
    }
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should mount page home', () => {
    const { wrapper } = mountPageHome()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should mount the components', () => {
    const { wrapper } = mountPageHome()
    expect(wrapper.findComponent(AddFileInput)).toBeDefined()
    expect(wrapper.findComponent(ListProducts)).toBeDefined()
  })

  it('should return products', async () => {
    mountPageHome()

    await localVue.nextTick()

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('/products')
    expect(store.state.productManager).toEqual({ products })
  })
})
