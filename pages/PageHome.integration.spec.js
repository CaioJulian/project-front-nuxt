import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import axios from 'axios'
import PageHome from '.'
import AddFileInput from '@/components/AddFileInput.vue'
import ListProducts from '@/components/ListProducts.vue'
import AlertMessage from '@/components/AlertMessage.vue'
import * as managerProduct from '@/store/productManager.js'
import * as managerStatus from '@/store/statusManager.js'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PageHome - integration', () => {
  let store, productManager, statusManager, products

  beforeEach(() => {
    productManager = {
      namespaced: true,
      ...managerProduct,
    }

    statusManager = {
      namespaced: true,
      ...managerStatus,
    }

    store = new Store({
      modules: {
        productManager,
        statusManager,
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
        AlertMessage,
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
    expect(store.state.productManager.products).toEqual(products)
  })
})
