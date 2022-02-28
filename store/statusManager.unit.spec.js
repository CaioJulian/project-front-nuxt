import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { actions, mutations, state } from '@/store/statusManager.js'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('statusManager - unit', () => {
  let store
  beforeEach(() => {
    store = new Store({
      actions,
      mutations,
      state,
    })
  })

  it('should return true modalOpen', () => {
    store.commit('openModal')

    expect(store.state.modalOpen).toEqual(true)
  })

  it('should return false modalOpen', () => {
    store.commit('openModal')
    store.commit('closeModal')

    expect(store.state.modalOpen).toEqual(false)
  })

  it('should return true alertOpen', () => {
    store.commit('openAlert')

    expect(store.state.alertOpen).toEqual(true)
  })

  it('should return false alertOpen', () => {
    store.commit('openAlert')
    store.commit('closeAlert')

    expect(store.state.alertOpen).toEqual(false)
  })

  it('should return true modalDeleteOpen', () => {
    store.commit('openDeleteModal')

    expect(store.state.modalDeleteOpen).toEqual(true)
  })

  it('should return false modalDeleteOpen', () => {
    store.commit('openDeleteModal')
    store.commit('closeDeleteModal')

    expect(store.state.modalDeleteOpen).toEqual(false)
  })

  it('should return alert message', () => {
    const alertMessage = {
      message: 'Error in the send file!',
      type: 'error',
    }
    store.commit('setAlertMessage', alertMessage)

    expect(store.state.alertMessage).toEqual(alertMessage)
  })
})
