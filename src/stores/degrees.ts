import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Degree } from '@/api/types'

import getDegrees from '@/api/getDegrees'

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([])

  const FETCH_DEGREES = async () => {
    const recivedDegrees = await getDegrees()
    degrees.value = recivedDegrees
  }

  return { degrees, FETCH_DEGREES }
})
