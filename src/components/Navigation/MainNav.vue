<template>
  <header :class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8">
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl"
          >Myszojeleń Careers</router-link
        >
        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li v-for="item in menuItems" :key="item.text" class="ml-9 h-full first:ml-0">
              <router-link :to="item.url" class="flex h-full items-center py-2.5">{{
                item.text
              }}</router-link>
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
import ActionButton from '../Shared/ActionButton.vue'
import ProfileImage from '@/components/Navigation/ProfileImage.vue'
import TheSubnav from '@/components/Navigation/TheSubnav.vue'

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    TheSubnav // <the-subnav>
  },
  data() {
    return {
      menuItems: [
        { text: 'Teams', url: '/' },
        { text: 'Locations', url: '/' },
        { text: 'Life at Bobo Corp', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: '/jobs/reasults' }
      ],
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
