<template>
  <div class="flex justify-center p-5">
    <form @submit.prevent="handleSubmit">
      <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
        >Append file .json</label
      >
      <input
        id="formFile"
        class="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded cursor-pointer"
        type="file"
        accept="application/JSON"
        required
        @change="updateFile"
      />

      <button
        data-testid="send-file"
        type="submit"
        class="px-6 py-2.5 m-1 bg-blue-600 text-white font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Send
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
    }
  },
  methods: {
    updateFile(e) {
      const file = e.target.files || e.dataTransfer.files
      if (!file.length) {
        return
      }

      const reader = new FileReader()
      reader.onloadend = (e) => {
        this.decodeFile(e.target.result)
      }
      reader.readAsDataURL(file[0])
    },

    decodeFile(dataURI) {
      // 29 = length of "data:application/json;base64,"
      const json = Buffer.from(dataURI.substring(29), 'base64').toString()
      const result = JSON.parse(json)
      this.product = result
    },

    handleSubmit() {
      this.$store.dispatch('productManager/addProduct', this.product)
    },
  },
}
</script>
<style lang="postcss" scoped>
input[type='file']::file-selector-button {
  @apply hidden;
}
</style>
