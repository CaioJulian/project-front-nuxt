import { mount, createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import AlertMessage from '@/components/AlertMessage.vue'
import * as managerStatus from '@/store/statusManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AlertMessage - unit', () => {
  let store, statusManager

  beforeEach(() => {
    statusManager = {
      namespaced: true,
      ...managerStatus,
    }

    store = new Store({
      modules: {
        statusManager,
      },
    })

    store.commit('statusManager/openAlert')
  })

  const mountAlertMessage = () => {
    const wrapper = mount(AlertMessage, {
      store,
      localVue,
    })

    return { wrapper }
  }

  it('should mount the component', () => {
    const { wrapper } = mountAlertMessage()

    expect(wrapper.vm).toBeTruthy()
    expect(wrapper.text()).toContain('Notification!')
  })

  it('should alert message error', () => {
    const alertMessage = {
      message: 'Error in the send file!',
      type: 'error',
    }
    store.commit('statusManager/setAlertMessage', alertMessage)

    const { wrapper } = mountAlertMessage()

    expect(wrapper.text()).toContain(alertMessage.message)
  })
})
