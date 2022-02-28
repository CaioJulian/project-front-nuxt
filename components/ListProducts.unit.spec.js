import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ListProducts from '@/components/ListProducts.vue'
import * as managerStatus from '@/store/statusManager.js'
import * as managerProduct from '@/store/productManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListProducts', () => {
  let store, productManager, products, statusManager
  beforeEach(() => {
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

    productManager = {
      namespaced: true,
      ...managerProduct,
      state: {
        products,
      },
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
  })

  const mountListProducts = () => {
    const wrapper = mount(ListProducts, {
      store,
      localVue,
    })

    return { wrapper }
  }

  it('should mount the component', () => {
    const { wrapper } = mountListProducts()

    const { title, type, price } = products[1]

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(type)
    expect(wrapper.text()).toContain(`R$ ${price}`)
  })

  it('should click edit button', async () => {
    const { wrapper } = mountListProducts()
    const button = wrapper.find('[data-testid="edit-product-button"]')

    await button.trigger('click')

    expect(store.state.statusManager.modalOpen).toBe(true)
  })

  it('should click delete button', async () => {
    const { wrapper } = mountListProducts()
    const button = wrapper.find('[data-testid="delete-product-button"]')

    await button.trigger('click')

    expect(store.state.statusManager.modalDeleteOpen).toBe(true)
  })
})
