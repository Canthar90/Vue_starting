<template>
  <img :src="imageLink" alt="Profile pictiure" class="h-8 w-8 rounded-3xl object-contain" />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink: 'https://play.nintendo.com/images/profile-zelda-link.7bf2a8f2.aead314d58b63e27.png'
    }
  }
}
</script>
