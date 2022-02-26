<template>
  <div class="flex justify-center p-5">
    <form @submit.prevent="">
      <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
        >Anexar arquivo .json</label
      >
      <input
        id="formFile"
        class="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded cursor-pointer"
        type="file"
        accept="application/JSON"
      />

      <button
        type="submit"
        class="px-6 py-2.5 m-1 bg-blue-600 text-white font-medium rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
export default {}
</script>
<style lang="postcss" scoped>
input[type='file']::file-selector-button {
  @apply hidden;
}
</style>
