import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false
  }),
  // user action is basicly method
  actions: {
    loginUser() {
      this.isLoggedIn = true
    }
  }
})
