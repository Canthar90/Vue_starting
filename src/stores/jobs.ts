import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'
import type { Job } from '@/api/types'

import { useUserStore } from '@/stores/user'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const UNIQUE_LOCATIONS = 'UNIQUE_LOCATIONS'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const FILTERED_JOBS_BY_ID = 'FILTERED_JOBS_BY_ID'

export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'
export const INCLUDE_JOB_BY_DEGREE = 'INCLUDE_JOB_BY_DEGREE'
export const INCLUDE_JOB_BY_LOCATION = 'INCLUDE_JOB_BY_LOCATION'
export const INCLUDE_JOB_BY_SKILL = 'INCLUDE_JOB_BY_SKILL'
export const INCLUDE_JOB_BY_ID = 'INCLUDE_JOB_BY_ID'
export const INCLUDE_JOB_BY_SEARCHED_LOCATION = 'INCLUDE_JOB_BY_SEARCHED_LOCATION'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', {
  state: (): JobsState => ({
    jobs: []
  }),
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs()
      this.jobs = jobs
    }
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set<string>()
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization))
      return uniqueOrganizations
    },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set<string>()
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType))
      return uniqueJobTypes
    },

    [UNIQUE_LOCATIONS](state) {
      const uniqueLocations = new Set<string>()
      state.jobs.forEach((job) => {
        const locations = job.locations
        locations.forEach((location) => uniqueLocations.add(location))
      })
      return uniqueLocations
    },

    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedOrganizations.length === 0) return true

      return userStore.selectedOrganizations.includes(job.organization)
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedJobTypes.length === 0) return true

      return userStore.selectedJobTypes.includes(job.jobType)
    },
    [INCLUDE_JOB_BY_DEGREE]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedDegrees.length === 0) return true

      return userStore.selectedDegrees.includes(job.degree)
    },

    [INCLUDE_JOB_BY_LOCATION]: () => (job: Job) => {
      const userStore = useUserStore()
      if (userStore.selectedLocations.length === 0) return true

      return userStore.selectedLocations.some((selectedLocation) =>
        job.locations.includes(selectedLocation)
      )
    },

    [INCLUDE_JOB_BY_SKILL]: () => (job: Job) => {
      const userStore = useUserStore()
      return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
    },

    [INCLUDE_JOB_BY_SEARCHED_LOCATION]: () => (job: Job) => {
      const userStore = useUserStore()
      return job.locations.some((location) =>
        location.toLowerCase().includes(userStore.locationSearchTerm.toLowerCase())
      )
    },

    [INCLUDE_JOB_BY_ID]: () => (job: Job) => {
      const userStore = useUserStore()
      return job.id == userStore.searchID
    },

    [FILTERED_JOBS_BY_ID](state): Job[] {
      return state.jobs.filter((job) => this.INCLUDE_JOB_BY_ID(job))
    },

    [FILTERED_JOBS](state): Job[] {
      return state.jobs
        .filter((job) => this.INCLUDE_JOB_BY_ORGANIZATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_JOB_TYPE(job))
        .filter((job) => this.INCLUDE_JOB_BY_DEGREE(job))
        .filter((job) => this.INCLUDE_JOB_BY_LOCATION(job))
        .filter((job) => this.INCLUDE_JOB_BY_SKILL(job))
        .filter((job) => this.INCLUDE_JOB_BY_SEARCHED_LOCATION(job))
    }
  }
})

// export const useJobsStore = defineStore('jobs', () => {
//   const jobs = ref<Job[]>([])

//   const FETCH_JOBS = async () => {
//     const jobsTemp = await getJobs()
//     console.log(jobsTemp)
//     jobs.value = jobsTemp
//   }

//   const UNIQUE_ORGANIZATIONS = () => {
//     const uniqueOrganizations = new Set<string>()
//     jobs.value.forEach((job) => uniqueOrganizations.add(job.organization))
//     return uniqueOrganizations
//   }

//   const UNIQUE_JOB_TYPES = () => {
//     const uniqueJobTypes = new Set<string>()
//     jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType))
//     return uniqueJobTypes
//   }

// const UNIQUE_LOCATIONS = () => {
//   const uniqueLocations = new Set<string>()
//   jobs.value.forEach((job) => {
//     const locationsList = job.locations
//     locationsList.forEach((location) => uniqueLocations.add(location))
//   })
//   return uniqueLocations
// }

//   const INCLUDE_JOB_BY_ORGANIZATION = (job: Job) => {
//     const userStore = useUserStore()
//     if (userStore.selectedOrganizations.length === 0) return true

//     return userStore.selectedOrganizations.includes(job.organization)
//   }

//   const INCLUDE_JOB_BY_JOB_TYPE = (job: Job) => {
//     const userStore = useUserStore()
//     if (userStore.selectedJobTypes.length === 0) return true

//     return userStore.selectedJobTypes.includes(job.jobType)
//   }

//   const INCLUDE_JOB_BY_DEGREE = (job: Job) => {
//     const userStore = useUserStore()
//     if (userStore.selectedDegrees.length === 0) return true

//     return userStore.selectedDegrees.includes(job.degree)
//   }

//   const INCLUDE_JOB_BY_SKILL = (job: Job) => {
//     const userStore = useUserStore()

//     return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
//   }

//   const INCLUDE_JOB_BY_ID = (job: Job) => {
//     const userStore = useUserStore()
//     return job.id == userStore.searchID
//   }

//   const FILTERED_JOBS_BY_ID = () => {
//     return jobs.value.filter((job) => INCLUDE_JOB_BY_ID(job))
//   }

//   const FILTERED_JOBS = () => {
//     return jobs.value
//       .filter((job) => INCLUDE_JOB_BY_ORGANIZATION(job))
//       .filter((job) => INCLUDE_JOB_BY_JOB_TYPE(job))
//       .filter((job) => INCLUDE_JOB_BY_DEGREE(job))
//       .filter((job) => INCLUDE_JOB_BY_SKILL(job))
//   }

//   return {
//     jobs,
//     FETCH_JOBS,
//     UNIQUE_ORGANIZATIONS,
//     UNIQUE_JOB_TYPES,
//     UNIQUE_LOCATIONS,
//     INCLUDE_JOB_BY_ORGANIZATION,
//     INCLUDE_JOB_BY_JOB_TYPE,
//     INCLUDE_JOB_BY_DEGREE,
//     INCLUDE_JOB_BY_SKILL,
//     INCLUDE_JOB_BY_ID,
//     FILTERED_JOBS_BY_ID,
//     FILTERED_JOBS
//   }
// })
