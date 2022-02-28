export const state = () => ({
  alertOpen: false,
  alertMessage: {
    message: 'Notification!',
    type: 'success',
  },
  modalOpen: false,
  modalDeleteOpen: false,
})

export const mutations = {
  openModal(state) {
    state.modalOpen = true
  },

  closeModal(state) {
    state.modalOpen = false
  },

  openDeleteModal(state) {
    state.modalDeleteOpen = true
  },

  closeDeleteModal(state) {
    state.modalDeleteOpen = false
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
