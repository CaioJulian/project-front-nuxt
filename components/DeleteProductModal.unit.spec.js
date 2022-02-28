import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import DeleteProductModal from '@/components/DeleteProductModal.vue'
import * as managerStatus from '@/store/statusManager.js'
import * as managerProduct from '@/store/productManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('DeleteProductModal - unit', () => {
  let store, productManager, product, statusManager

  beforeEach(() => {
    product = {
      id: 1,
      title: 'Brown eggs',
      type: 'dairy',
      price: 28.1,
      rating: 4,
      description: 'Raw organic brown eggs in a basket',
    }

    productManager = {
      namespaced: true,
      ...managerProduct,
      state: {
        product,
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

    store.commit('statusManager/openDeleteModal')
  })

  const mountDeleteProductModal = () => {
    const wrapper = mount(DeleteProductModal, {
      store,
      localVue,
    })

    return { wrapper }
  }

  it('should mount the component', () => {
    const { wrapper } = mountDeleteProductModal()

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain('Delete Product')
  })

  it('should click button close', async () => {
    const { wrapper } = mountDeleteProductModal()
    const button = wrapper.find('[data-testid = "close-delete-button"]')

    await button.trigger('click')

    expect(wrapper.vm.isOpen).toBe(false)
  })

  xit('should handle submit delete product', async () => {
    const { wrapper } = mountDeleteProductModal()

    const button = wrapper.find('[data-testid="delete-product"]')

    await button.trigger('submit')

    expect(wrapper.vm.product).toBe(product)
  })
})
