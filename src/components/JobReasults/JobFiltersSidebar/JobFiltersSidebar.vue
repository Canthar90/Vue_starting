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
      <job-filters-sidebar-prompt />

      <job-filters-sidebar-skills />

      <job-filters-sidebar-location-text />

      <collapsible-accordion header="Degrees">
        <job-filters-sidebar-degrees></job-filters-sidebar-degrees>
      </collapsible-accordion>

      <collapsible-accordion header="Job Types">
        <job-filters-sidebar-job-types></job-filters-sidebar-job-types>
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-organizations></job-filters-sidebar-organizations>
      </collapsible-accordion>

      <collapsible-accordion header="Locations">
        <job-filters-sidebar-localizations></job-filters-sidebar-localizations>
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

import JobFiltersSidebarDegrees from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue'
import JobFiltersSidebarJobTypes from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue'
import JobFiltersSidebarOrganizations from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import JobFiltersSidebarPrompt from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue'
import JobFiltersSidebarSkills from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarSkills.vue'
import JobFiltersSidebarLocalizations from './JobFiltersSidebarLocalizations.vue'
import JobFiltersSidebarLocationText from './JobFiltersSidebarLocationText.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const route = useRoute()

const parseSkillsSearchTerm = () => {
  const role = (route.query.role as string) || ''
  userStore.UPDATE_SKILLS_SEARCH_TERM(role)
  const location = (route.query.location as string) || ''
  userStore.UPDATE_LOCATION_SEARCH_TERM(location)
}

onMounted(parseSkillsSearchTerm)
</script>
