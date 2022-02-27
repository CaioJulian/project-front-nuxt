import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import AddFileInput from '@/components/AddFileInput.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AddFileInput', () => {
  let store, productManager, products

  beforeEach(() => {
    products = []

    productManager = {
      namespaced: true,
      state: {
        products,
      },
      actions: {
        addProduct: jest.fn(),
      },
    }

    store = new Store({
      modules: {
        productManager,
      },
    })
  })

  const mountAddFileInput = () => {
    const wrapper = mount(AddFileInput, {
      store,
      localVue,
    })

    return { wrapper }
  }

  test('should mount the component', () => {
    const { wrapper } = mountAddFileInput()

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain('Anexar arquivo .json')
  })

  xit('should submit button', async () => {
    const { wrapper } = mountAddFileInput()

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().handleSubmit).toBeTruthy()
  })
})
