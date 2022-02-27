import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import ListProducts from '@/components/ListProducts.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ListProducts', () => {
  let store, productManager, products
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
        title: 'Sweet fresh stawberry',
        type: 'fruit',
        rating: 3,
        price: 29.45,
        created_at: '01/01/2022',
      },
    ]

    productManager = {
      state: {
        products,
      },
    }

    store = new Store({
      modules: {
        productManager,
      },
    })
  })

  test('should mount the component', () => {
    const wrapper = mount(ListProducts, {
      store,
      localVue,
    })

    const { title, type, price } = products[1]

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain(title)
    expect(wrapper.text()).toContain(type)
    expect(wrapper.text()).toContain(`R$ ${price}`)
  })
})
