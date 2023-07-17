<template>
  <div class="bg-slate-100">
    <div class="mx-24 block rounded border border-solid bg-white p-8">
      <div :class="{ 'pt-24': !userStore.isLoggedIn }">
        <div class="flex w-full flex-row justify-center text-center">
          Job Page for job {{ currentJobId }}
          {{ FILTERED_JOBS_BY_ID }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'

const route = useRoute()

const userStore = useUserStore()
const jobsStore = useJobsStore()
onMounted(jobsStore.FETCH_JOBS)

const currentJobId = computed(() => route.params.id)

const relIdNumber = currentJobId.value.split(':')[1]
userStore.UPDATE_ID(Number(relIdNumber))
const FILTERED_JOBS_BY_ID = computed(() => jobsStore.FILTERED_JOBS_BY_ID)

// const job = jobs.filter((job) => job.id === currentJobId)
</script>
