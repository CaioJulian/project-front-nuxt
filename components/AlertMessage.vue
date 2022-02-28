<template>
  <div
    v-if="alertOpen"
    class="rounded-lg py-5 px-6 mb-4 text-base"
    :class="typeColor()"
    role="alert"
  >
    {{ alertMessage.message }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('statusManager', ['alertMessage', 'alertOpen']),
  },
  methods: {
    typeColor() {
      const { type } = this.alertMessage
      return type === 'error'
        ? 'bg-red-100 text-red-700'
        : 'bg-green-100 text-green-700'
    },
  },
}
</script>
