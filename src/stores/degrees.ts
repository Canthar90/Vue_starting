import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Degree } from '@/api/types'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  return { degrees }
})
