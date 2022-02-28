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
              Edit Product
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
              <div class="mb-3 xl:w-96">
                <label
                  for="titleInput"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Title</label
                >
                <input
                  id="titleInput"
                  v-model="title"
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Title"
                  required
                />
              </div>
              <div class="mb-3 xl:w-96">
                <label
                  for="typeInput"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Type</label
                >
                <input
                  id="typeInput"
                  v-model="type"
                  type="text"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Type"
                  required
                />
              </div>
              <div class="mb-3 xl:w-96">
                <label
                  for="priceInput"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Price</label
                >
                <input
                  id="priceInput"
                  v-model.number="price"
                  type="number"
                  min="0"
                  step=".01"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Price"
                  required
                />
              </div>
              <div class="mb-3 xl:w-96">
                <label
                  for="ratingInput"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Rating</label
                >
                <input
                  id="ratingInput"
                  v-model.number="rating"
                  type="number"
                  min="0"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Rating"
                />
              </div>
              <div class="mb-3 xl:w-96">
                <label
                  for="descriptionTextarea"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Description</label
                >
                <textarea
                  id="descriptionTextarea"
                  v-model="description"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Description"
                />
              </div>
            </div>
            <div
              class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"
            >
              <button
                data-testid="close-button"
                type="button"
                class="px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-dismiss="modal"
                @click="closeModal"
              >
                Close
              </button>
              <button
                data-testid="edit-product"
                type="submit"
                class="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="modal-backdrop fade show fixed top-0 left-0 opacity-50 w-full h-full bg-black z-10"
      @click="closeModal"
    ></div>
  </div>
</template>

<script>
export default {
  computed: {
    isOpen() {
      return this.$store.state.statusManager.modalOpen
    },

    product() {
      return this.$store.state.productManager.product
    },

    title: {
      get() {
        return this.product.title
      },
      set(value) {
        this.handlerProduct({ title: value })
      },
    },

    type: {
      get() {
        return this.product.type
      },
      set(value) {
        this.handlerProduct({ type: value })
      },
    },

    price: {
      get() {
        return this.product.price
      },
      set(value) {
        this.handlerProduct({ price: value })
      },
    },

    rating: {
      get() {
        return this.product.rating
      },
      set(value) {
        this.handlerProduct({ rating: value })
      },
    },

    description: {
      get() {
        return this.product.description
      },
      set(value) {
        this.handlerProduct({ description: value })
      },
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('statusManager/closeModal')
    },

    handlerProduct(value) {
      this.$store.commit('productManager/handlerProduct', value)
    },

    handleSubmit() {
      this.$store.dispatch('productManager/updateProduct')
    },
  },
}
</script>
