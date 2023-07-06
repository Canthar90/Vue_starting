<template>
  <img :src="imageLink" alt="Profile pictiure" class="h-8 w-8 rounded-3xl object-contain" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const imageLink = ref(
  'https://play.nintendo.com/images/profile-zelda-link.7bf2a8f2.aead314d58b63e27.png'
)

</script>
