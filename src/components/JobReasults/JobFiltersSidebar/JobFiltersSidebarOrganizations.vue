<template>
  <job-filers-sidebar-checkbox-group
    :unique-values="UNIQUE_ORGANIZATIONS"
    :action="userStore.ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import JobFilersSidebarCheckboxGroup from '@/components/JobReasults/JobFiltersSidebar/JobFilersSidebarCheckboxGroup.vue'
import { useUserStore } from '@/stores/user'
import { useJobsStore } from '@/stores/jobs'

const jobsStore = useJobsStore()
const userStore = useUserStore()

const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
</script>
