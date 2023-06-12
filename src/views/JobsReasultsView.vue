<template>
  <the-subnav />
  <h1 class="text-6xl font-bold">Jobs Reasults page</h1>
  <button @click="goToHome">Go to Home Page</button>
</template>

<script>
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  mame: 'JobsReasultsView',
  components: { TheSubnav },
  methods: {
    goToHome() {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
