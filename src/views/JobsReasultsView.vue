<template>
  <h1 class="text-6xl font-bold">Jobs Reasults page</h1>
  <h2>{{ experiment }}</h2>
</template>

<script>
export default {
  mame: 'JobsReasultsView',
  computed: {
    experiment() {
      console.log(this.$route)
      return 'Any'
    }
  }
}
</script>
