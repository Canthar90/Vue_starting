<template>
  <div class="flex-auto bg-brand-gray-2 p-8">
    <div :class="{ 'pt-24': !userStore.isLoggedIn }">
      <div class="flex w-full flex-row justify-center text-center">
        <div v-if="FILTERED_JOBS_BY_ID.length">
          <SingleJobOffer v-for="job in FILTERED_JOBS_BY_ID" :key="job.id" :job="job" />
        </div>
        <div v-else>There is no job with this number</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'
import SingleJobOffer from '@/components/JobView/SingleJobOffer.vue'

const route = useRoute()

const userStore = useUserStore()
const jobsStore = useJobsStore()
onMounted(jobsStore.FETCH_JOBS)

const currentJobId = computed(() => route.params.id as string)

const relIdNumber = ref<number>(Number(currentJobId.value.split(':')[1]))
userStore.UPDATE_ID(relIdNumber.value)

const FILTERED_JOBS_BY_ID = computed(() => jobsStore.FILTERED_JOBS_BY_ID)

watch([currentJobId], () => {
  relIdNumber.value = Number(currentJobId.value.split(':')[1])
  userStore.UPDATE_ID(relIdNumber.value)
  const newSet = jobsStore.FILTERED_JOBS_BY_ID
  return newSet
})
</script>
