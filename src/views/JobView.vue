<template>
  <div class="bg-slate-100">
    <div class="mx-24 block rounded border border-solid bg-white p-8">
      <div :class="{ 'pt-24': !userStore.isLoggedIn }">
        <div class="flex w-full flex-row justify-center text-center">
          Job Page for job {{ currentJobId }}

          <SingleJob v-for="job in FILTERED_JOBS_BY_ID" :key="job.id" :job="job" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import SingleJob from '@/components/JobView/SingleJob.vue'

const route = useRoute()

const userStore = useUserStore()
const jobsStore = useJobsStore()
onMounted(jobsStore.FETCH_JOBS)

const currentJobId = computed(() => route.params.id as string)

const relIdNumber = ref<number>(Number(currentJobId.value.split(':')[1]))
userStore.UPDATE_ID(relIdNumber.value)

const FILTERED_JOBS_BY_ID = computed(() => jobsStore.FILTERED_JOBS_BY_ID)
console.log(FILTERED_JOBS_BY_ID)
</script>
