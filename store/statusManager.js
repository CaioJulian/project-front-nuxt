export const state = () => ({
  alertOpen: false,
  alertMessage: {
    message: 'Notification!',
    type: 'success',
  },
  modalOpen: false,
})

export const mutations = {
  openModal(state) {
    state.modalOpen = true
  },

  closeModal(state) {
    state.modalOpen = false
  },

  openAlert(state) {
    state.alertOpen = true
  },

  closeAlert(state) {
    state.alertOpen = false
  },

  setAlertMessage(state, payload) {
    state.alertMessage = payload
  },
}
