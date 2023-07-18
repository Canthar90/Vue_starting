<template>
  <h3>{{ job.title }}</h3>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'

import type { Job } from '@/api/types'

const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})
</script>
