<template>
  <div class="container xl:max-w-5xl m-auto p-3 bg-white">
    <nuxt />
    <EditProductModal />
    <DeleteProductModal />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
