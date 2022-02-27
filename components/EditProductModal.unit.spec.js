import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import EditProductModal from '@/components/EditProductModal.vue'
import * as managerStatus from '@/store/statusManager.js'
import * as managerProduct from '@/store/productManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditProductModal - unit', () => {
  let store, productManager, product, statusManager

  beforeEach(() => {
    product = {
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
  })

  const mountEditProductModal = () => {
    const wrapper = mount(EditProductModal, {
      store,
      localVue,
    })

    return { wrapper }
  }

  it('should mount the component', () => {
    const { wrapper } = mountEditProductModal()

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain('Edit Product')
    expect(wrapper.text()).toContain('Save changes')
  })

  it('should check form filled', () => {
    const { wrapper } = mountEditProductModal()

    const { title, type, price, rating, description } = product

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.find('#titleInput').element.value).toBe(title)
    expect(wrapper.find('#typeInput').element.value).toBe(type)
    expect(wrapper.find('#priceInput').element.value).toBe(`${price}`)
    expect(wrapper.find('#ratingInput').element.value).toBe(`${rating}`)
    expect(wrapper.find('#descriptionTextarea').element.value).toBe(description)
  })

  it('should edit input title', async () => {
    const { wrapper } = mountEditProductModal()
    const value = 'Kiwi'
    const titleInput = wrapper.find('#titleInput')
    await titleInput.setValue(value)

    expect(titleInput.element.value).toBe(value)
  })

  it('should edit input type', async () => {
    const { wrapper } = mountEditProductModal()
    const value = 'fruit'
    const typeInput = wrapper.find('#typeInput')
    await typeInput.setValue(value)

    expect(typeInput.element.value).toBe(value)
  })

  it('should edit input price', async () => {
    const { wrapper } = mountEditProductModal()
    const value = 15.45
    const priceInput = wrapper.find('#priceInput')
    await priceInput.setValue(value)

    expect(priceInput.element.value).toBe(`${value}`)
  })

  it('should edit input rating', async () => {
    const { wrapper } = mountEditProductModal()
    const value = 2
    const ratingInput = wrapper.find('#ratingInput')
    await ratingInput.setValue(value)

    expect(ratingInput.element.value).toBe(`${value}`)
  })

  it('should edit textarea description', async () => {
    const { wrapper } = mountEditProductModal()
    const value = 'Raw organic kiwi in a basket'
    const descriptionTextarea = wrapper.find('#descriptionTextarea')
    await descriptionTextarea.setValue(value)

    expect(descriptionTextarea.element.value).toBe(`${value}`)
  })

  it('should click button close', async () => {
    const { wrapper } = mountEditProductModal()
    const button = wrapper.find('[data-testid = "close-button"]')

    await button.trigger('click')

    expect(wrapper.vm.isOpen).toBe(false)
  })

  it('should handle submit update product', async () => {
    const { wrapper } = mountEditProductModal()

    const value = 'Kiwi'
    const titleInput = wrapper.find('#titleInput')
    await titleInput.setValue(value)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.vm.product).not.toBe(product)
  })
})
