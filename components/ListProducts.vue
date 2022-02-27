<template>
  <div class="flex flex-col py-5">
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse border-2 border-slate-400">
        <thead>
          <tr>
            <th
              v-for="(item, index) in titles"
              :key="index"
              class="border border-slate-100"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in products"
            :key="index"
            class="transition duration-300 ease-in-out hover:bg-gray-100"
          >
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              {{ item.title }}
            </td>
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              {{ item.type }}
            </td>
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              {{ ratingLabel(item.rating) }}
            </td>
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              R$ {{ item.price }}
            </td>
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              {{ item.created_at }}
            </td>
            <td class="border border-slate-300 px-2 whitespace-nowrap">
              <button
                class="p-1 mr-1 mb-1 md:mb-0 rounded text-blue-700 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                type="button"
                @click="openModal(item)"
              >
                Edit</button
              ><button
                class="p-1 rounded text-red-800 hover:text-white hover:bg-red-700 focus:outline-none focus:bg-blue-700"
                type="button"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titles: ['Title', 'Type', 'Rating', 'Price', 'Created', 'Actions'],
    }
  },
  computed: {
    products() {
      return this.$store.state.productManager.products
    },
  },
  methods: {
    openModal(product) {
      this.$store.commit('statusManager/openModal')
      this.$store.commit('productManager/setProduct', product)
    },

    ratingLabel(label) {
      return !!label === true ? label : '-'
    },
  },
}
</script>
