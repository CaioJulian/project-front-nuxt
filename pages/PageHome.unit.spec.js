import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import PageHome from '.'
import AddFileInput from '@/components/AddFileInput.vue'
import ListProducts from '@/components/ListProducts.vue'
import { state, actions } from '@/store/productManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('PageHome - unit', () => {
  let store, productManager

  beforeEach(() => {
    productManager = {
      namespaced: true,
      state,
      actions,
    }

    store = new Store({
      modules: {
        productManager,
      },
    })
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

  it('should mount page home', () => {
    const { wrapper } = mountPageHome()
    expect(wrapper.vm).toBeTruthy()
  })

  it('should mount the components', () => {
    const { wrapper } = mountPageHome()
    expect(wrapper.findComponent(AddFileInput)).toBeDefined()
    expect(wrapper.findComponent(ListProducts)).toBeDefined()
  })
})
