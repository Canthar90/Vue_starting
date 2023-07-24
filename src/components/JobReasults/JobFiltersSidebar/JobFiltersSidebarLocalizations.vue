<template>
  <job-filers-sidebar-checkbox-group
    :unique-values="UNIQUE_LOCATIONS"
    :action="userStore.ADD_SELECTED_LOCATIONS"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import JobFilersSidebarCheckboxGroup from '@/components/JobReasults/JobFiltersSidebar/JobFilersSidebarCheckboxGroup.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

const jobsStore = useJobsStore()
const UNIQUE_LOCATIONS = computed(() => jobsStore.UNIQUE_LOCATIONS)

const userStore = useUserStore()
</script>
