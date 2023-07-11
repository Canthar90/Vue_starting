<template>
  <div
    :class="{
      flex: true,
      'w-96': true,
      'flex-col': true,
      'border-r': true,
      'border-solid': true,
      'border-brand-gray-1': true,
      'bg-white': true,
      'p-4': true,
      'pt-16': !userStore.isLoggedIn
    }"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div>

      <collapsible-accordion header="Degrees">
        <job-filers-sidebar-checkbox-group
          :unique-values="UNIQUE_DEGREES"
          :action="userStore.ADD_SELECTED_DEGREES"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filers-sidebar-checkbox-group
          :unique-values="UNIQUE_JOB_TYPES"
          :action="userStore.ADD_SELECTED_JOB_TYPES"
        />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filers-sidebar-checkbox-group
          :unique-values="UNIQUE_ORGANIZATIONS"
          :action="userStore.ADD_SELECTED_ORGANIZATIONS"
        />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'
import JobFilersSidebarCheckboxGroup from '@/components/JobReasults/JobFiltersSidebar/JobFilersSidebarCheckboxGroup.vue'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { useDegreesStore } from '@/stores/degrees'

const jobsStore = useJobsStore()
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS)
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES)

const degreesStore = useDegreesStore()
const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES)

const userStore = useUserStore()
</script>
