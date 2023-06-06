<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8">
        <a :href="url" class="flex h-full items-center text-xl">{{ company }}</a>
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="item in menuItems" :key="item" class="ml-9 h-full first:ml-0">
              <a href="#" class="flex h-full items-center py-2.5">{{ item }}</a>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLogedIn" />
          <action-button v-else text="Sign in" type="primary" @click="loginUser" />
        </div>
      </div>

      <the-subnav v-if="isLogedIn" />
    </div>
  </header>
</template>

<!-- we will use option API right now -->
<script>
import ActionButton from './ActionButton.vue'
import ProfileImage from '@/components/ProfileImage.vue'
import TheSubnav from '@/components/TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav // <the-subnav>
  },
  data() {
    return {
      company: 'Myszojeleń Careers',
      url: 'https://careers.google.com',
      menuItems: ['Teams', 'Locations', 'Life at Bobo Corp', 'How we hire', 'Students', 'Jobs'],
      isLogedIn: false
    }
  },
  computed: {
    headerHeightClass() {
      return {
        'h-16': !this.isLogedIn, //true
        'h-32': this.isLogedIn //false
      }
    }
  },
  methods: {
    loginUser() {
      this.isLogedIn = true
    }
  }
}
</script>
