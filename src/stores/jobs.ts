import { defineStore } from 'pinia'

import getJobs from '@/api/getJobs'
import type { Job } from '@/api/types'

import { useUserStore } from '@/stores/user'

import { ref } from 'vue'

export const FETCH_JOBS = 'FETCH_JOBS'
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS'
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES'
export const FILTERED_JOBS = 'FILTERED_JOBS'
export const FILTERED_JOBS_BY_ID = 'FILTERED_JOBS_BY_ID'

export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION'
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE'
export const INCLUDE_JOB_BY_DEGREE = 'INCLUDE_JOB_BY_DEGREE'
export const INCLUDE_JOB_BY_SKILL = 'INCLUDE_JOB_BY_SKILL'
export const INCLUDE_JOB_BY_ID = 'INCLUDE_JOB_BY_ID'

export interface JobsState {
  jobs: Job[]
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>([])

  const FETCH_JOBS = async () => {
    const getedJobs = await getJobs()
    jobs.value = getedJobs
  }

  const UNIQUE_ORGANIZATIONS = () => {
    const uniqueOrganizations = new Set<string>()
    jobs.value.forEach((job) => uniqueOrganizations.add(job.organization))
    return uniqueOrganizations
  }

  const UNIQUE_JOB_TYPES = () => {
    const uniqueJobTypes = new Set<string>()
    jobs.value.forEach((job) => uniqueJobTypes.add(job.jobType))
    return uniqueJobTypes
  }

  const INCLUDE_JOB_BY_ORGANIZATION = (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedOrganizations.length === 0) return true

    return userStore.selectedOrganizations.includes(job.organization)
  }

  const INCLUDE_JOB_BY_JOB_TYPE = (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedJobTypes.length === 0) return true

    return userStore.selectedJobTypes.includes(job.jobType)
  }

  const INCLUDE_JOB_BY_DEGREE = (job: Job) => {
    const userStore = useUserStore()
    if (userStore.selectedDegrees.length === 0) return true

    return userStore.selectedDegrees.includes(job.degree)
  }

  const INCLUDE_JOB_BY_SKILL = (job: Job) => {
    const userStore = useUserStore()

    return job.title.toLowerCase().includes(userStore.skillsSearchTerm.toLowerCase())
  }

  const INCLUDE_JOB_BY_ID = (job: Job) => {
    const userStore = useUserStore()
    return job.id == userStore.searchID
  }

  const FILTERED_JOBS_BY_ID = () => {
    return jobs.value.filter((job) => INCLUDE_JOB_BY_ID(job))
  }

  const FILTERED_JOBS = () => {
    return jobs.value
      .filter((job) => INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter((job) => INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter((job) => INCLUDE_JOB_BY_DEGREE(job))
      .filter((job) => INCLUDE_JOB_BY_SKILL(job))
  }

  return {
    FETCH_JOBS,
    UNIQUE_ORGANIZATIONS,
    UNIQUE_JOB_TYPES,
    INCLUDE_JOB_BY_ORGANIZATION,
    INCLUDE_JOB_BY_JOB_TYPE,
    INCLUDE_JOB_BY_DEGREE,
    INCLUDE_JOB_BY_SKILL,
    INCLUDE_JOB_BY_ID,
    FILTERED_JOBS_BY_ID,
    FILTERED_JOBS
  }
})
