<template>
  <main class="mx-24 block rounded border border-solid bg-white pt-8">
    <div class="pb-24">
      <div class="px-8">
        <h2 class="pb-6 text-4xl">{{ job.title }}</h2>
        <p class="grid auto-cols-max grid-flow-col gap-x-3 text-left text-sm">
          <span v-for="location in job.locations" :key="location"> {{ location }}, </span>
          <span> {{ job.organization }}: </span>
          <span class="text-xs">{{ job.dateAdded }} </span>
        </p>

        <h4 class="grid auto-cols-max grid-flow-col gap-x-3 pb-8 text-left text-sm">
          <spam>Desired degree: </spam> {{ job.degree }} <samp>Job lvl {{ job.jobType }} </samp>
        </h4>
      </div>

      <action-button text="Apply For This Job" type="primary" class="mb-8 mt-4 rounded-r-3xl" />

      <hr class="min-h-0 min-w-full bg-black pb-0" />

      <div class="px-8 pb-6 pt-8">
        <p class="pb-4 text-left text-xl">Minimal Qualifications:</p>
        <ol class="list-inside list-disc text-left">
          <li v-for="qualification in job.minimumQualifications" :key="qualification">
            {{ qualification }}
          </li>
        </ol>
      </div>

      <hr />
      <div class="px-8 pb-6 pt-6 text-left">
        <p class="pb-4 text-xl">Desired Qualifications:</p>
        <ol class="list-inside list-disc">
          <li v-for="prefferences in job.preferredQualifications" :key="prefferences">
            {{ prefferences }}
          </li>
        </ol>
      </div>

      <hr />

      <div class="px-8 pb-6 pt-6 text-left">
        <p class="pb-4 text-xl">Job Description:</p>
        <ol class="list-inside list-disc">
          <li v-for="description in job.description" :key="description">
            {{ description }}
          </li>
        </ol>
      </div>
      <action-button text="Apply For This Job" type="primary" class="mt-8 rounded-r-3xl" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import ActionButton from '@/components/Shared/ActionButton.vue'

import type { Job } from '@/api/types'

defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true
  }
})
</script>
