<template>
  <main
    :class="{
      'flex-auto': true,
      'bg-brand-gray-2': true,
      'p-8': true,
      'pt-24': !userStore.isLoggedIn
    }"
  >
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobsReasults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobsReasults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import JobListing from '@/components/JobReasults/JobListing.vue'
import { useJobsStore } from '@/stores/jobs'
import { useDegreesStore } from '@/stores/degrees'
import { useUserStore } from '@/stores/user'

import usePreviousAndNextPage from '@/composables/usePreviousAndNextPages'

const jobsStore = useJobsStore()
onMounted(jobsStore.FETCH_JOBS)
const degreesStore = useDegreesStore()
onMounted(degreesStore.FETCH_DEGREES)

const userStore = useUserStore()
const route = useRoute()
const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'))

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS)

const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10))
const { previousPage, nextPage } = usePreviousAndNextPage(currentPage, maxPage)
console.log(FILTERED_JOBS.value)
console.log(maxPage)

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value
  const firstJobIndex = (pageNumber - 1) * 10
  const lastJobIndex = pageNumber * 10
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex)
})
</script>
