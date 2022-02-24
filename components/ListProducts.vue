<template>
  <section>
    <table
      class="table-auto md:table-fixed w-full border-collapse border-2 border-slate-400"
    >
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
          <td class="border border-slate-300 px-2">{{ item.title }}</td>
          <td class="border border-slate-300 px-2">{{ item.type }}</td>
          <td class="border border-slate-300 px-2">{{ item.rating }}</td>
          <td class="border border-slate-300 px-2">R$ {{ item.price }}</td>
          <td class="border border-slate-300 px-2">{{ item.created }}</td>
          <td class="border border-slate-300 px-2">
            <button
              class="p-1 mr-1 mb-1 md:mb-0 rounded text-blue-700 hover:text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Edit</button
            ><button
              class="p-1 rounded text-red-800 hover:text-white hover:bg-red-700 focus:outline-none focus:bg-blue-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      titles: ['Title', 'Type', 'Rating', 'Price', 'Created', 'Actions'],
      products: [
        {
          title: 'Brown eggs',
          type: 'dairy',
          rating: 4,
          price: 28.1,
          created: '01/01/2022',
        },
        {
          title: 'Sweet fresh stawberry',
          type: 'fruit',
          rating: 3,
          price: 29.45,
          created: '01/01/2022',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>
