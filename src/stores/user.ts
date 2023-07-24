import { ref } from 'vue'
import { defineStore } from 'pinia'

export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS'
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES'
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES'
export const CLEAR_USER_JOB_FILTER_SELECTIONS = 'CLEAR_USER_JOB_FILTER_SELECTIONS'

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const selectedOrganizations = ref<string[]>([])
  const selectedJobTypes = ref<string[]>([])
  const selectedDegrees = ref<string[]>([])
  const selectedLocations = ref<string[]>([])
  const skillsSearchTerm = ref<string>('')
  const searchID = ref<number>(0)

  const LOGIN_USER = () => {
    isLoggedIn.value = true
  }

  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations
  }

  const ADD_SELECTED_JOB_TYPES = (jobTypes: string[]) => {
    selectedJobTypes.value = jobTypes
  }

  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees
  }

  const ADD_SELECTED_LOCATIONS = (locations: string[]) => {
    selectedLocations.value = locations
  }

  const UPDATE_SKILLS_SEARCH_TERM = (searchTerm: string) => {
    skillsSearchTerm.value = searchTerm
  }

  const UPDATE_ID = (id: number) => {
    searchID.value = id
  }

  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = []
    selectedJobTypes.value = []
    selectedOrganizations.value = []
    skillsSearchTerm.value = ''
    searchID.value = 0
  }

  return {
    isLoggedIn,
    selectedOrganizations,
    selectedJobTypes,
    selectedDegrees,
    selectedLocations,
    skillsSearchTerm,
    searchID,
    UPDATE_ID,
    LOGIN_USER,
    ADD_SELECTED_DEGREES,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_LOCATIONS,
    ADD_SELECTED_ORGANIZATIONS,
    UPDATE_SKILLS_SEARCH_TERM,
    CLEAR_USER_JOB_FILTER_SELECTIONS
  }
})
