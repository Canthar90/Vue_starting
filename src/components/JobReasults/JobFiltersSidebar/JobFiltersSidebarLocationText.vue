<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="locationSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Lisbon, Los Angeles"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const locationSearchTerm = computed({
  get() {
    return userStore.locationSearchTerm
  },
  set(value: string) {
    userStore.UPDATE_LOCATION_SEARCH_TERM(value)
  }
})
</script>
