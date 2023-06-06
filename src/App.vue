<script setup></script>

<template>
  <div class="wrapper">
    <main-nav />
    <the-hero />
  </div>
</template>

<script>
import MainNav from '@/components/MainNav.vue'
import TheHero from '@/components/TheHero.vue'

export default {
  name: 'App',
  components: {
    MainNav,
    TheHero
  }
}
</script>
