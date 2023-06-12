<template>
  <h1 class="text-6xl font-bold">Jobs Reasults page</h1>
  <button @click="goToHome">Go to Home Page</button>
</template>

<script>
export default {
  mame: 'JobsReasultsView',
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
