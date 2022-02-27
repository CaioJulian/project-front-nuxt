<template>
  <main class="py-10">
    <section>
      <AddFileInput />
      <ListProducts />
    </section>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  created() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      await this.$store.dispatch('productManager/fetchProducts')
    },
  },
}
</script>
