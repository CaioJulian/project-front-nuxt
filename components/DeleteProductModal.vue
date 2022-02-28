<template>
  <div :class="{ hidden: !isOpen }">
    <div
      id="editModal"
      class="modal fade fixed show top-0 left-0 w-full outline-none overflow-x-hidden overflow-y-auto z-20"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog relative w-auto pointer-events-none max-w-lg my-7 mx-auto"
      >
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div
            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md"
          >
            <h5
              id="exampleModalLabel"
              class="text-xl font-medium leading-normal text-gray-800"
            >
              Delete Product
            </h5>
            <button
              type="button"
              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="modal-body relative p-4">
              Want to delete the product <strong>{{ product.title }}</strong
              >?
            </div>
            <div
              class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
            >
              <button
                data-testid="close-delete-button"
                type="button"
                class="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                @click="closeDeleteModal"
              >
                Close
              </button>
              <button
                data-testid="delete-product"
                type="submit"
                class="px-6 py-2.5 bg-red-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-800 hover:shadow-lg focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="modal-backdrop fade show fixed top-0 left-0 opacity-50 w-full h-full bg-black z-10"
      @click="closeDeleteModal"
    ></div>
  </div>
</template>

<script>
export default {
  computed: {
    isOpen() {
      return this.$store.state.statusManager.modalDeleteOpen
    },
    product() {
      return this.$store.state.productManager.product
    },
  },
  methods: {
    closeDeleteModal() {
      this.$store.commit('statusManager/closeDeleteModal')
    },

    handleSubmit() {
      this.$store.dispatch('productManager/deleteProduct')
    },
  },
}
</script>
