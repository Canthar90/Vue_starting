<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
</template>

<script>
import JobFiltersSidebar from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebar.vue'
import JobListings from '@/components/JobReasults/JobListings.vue'

export default {
  mame: 'JobsReasultsView',
  components: {
    JobFiltersSidebar,
    JobListings
  }
}
</script>
