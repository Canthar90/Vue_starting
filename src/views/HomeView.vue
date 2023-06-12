<template>
  <the-subnav />
  <the-hero />
</template>

<script>
import TheHero from '@/components/JobSearch/TheHero.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  mame: 'HomeView',
  components: { TheHero, TheSubnav }
}
</script>
