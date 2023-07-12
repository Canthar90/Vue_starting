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
        <job-filters-sidebar-degrees></job-filters-sidebar-degrees>
      </collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filters-sidebar-job-types></job-filters-sidebar-job-types>
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-organizations></job-filters-sidebar-organizations>
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import ActionButton from '@/components/Shared/ActionButton.vue'
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import JobFiltersSidebarDegrees from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue'
import JobFiltersSidebarJobTypes from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'
import JobFiltersSidebarOrganizations from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
