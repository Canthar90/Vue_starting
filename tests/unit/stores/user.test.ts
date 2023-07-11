import { createPinia, setActivePinia } from 'pinia'

import { useUserStore } from '@/stores/user'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('keeps track if user is logged in', () => {
    const store = useUserStore()
    expect(store.isLoggedIn).toBe(false)
  })

  it('Stores organizations that the user would likt yo filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedOrganizations).toEqual([])
  })
  it('Stores job types that user would like to filter jobs by', () => {
    const store = useUserStore()
    expect(store.selectedJobTypes).toEqual([])
  })

  it('Stores degrees that user would like to filter by', () => {
    const store = useUserStore()
    expect(store.selectedDegrees).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore()
      store.LOGIN_USER()
      expect(store.isLoggedIn).toBe(true)
    })
  })

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filete jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2'])

      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2'])
    })
  })

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job types the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time'])
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time'])
    })
  })

  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore()
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"])
      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"])
    })
  })

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('Removes all job filters that user has chosen', () => {
      const store = useUserStore()
      store.selectedDegrees = ['Random degree']
      store.selectedJobTypes = ['Random job type']
      store.selectedOrganizations = ['Random organization']

      store.CLEAR_USER_JOB_FILTER_SELECTIONS()
      expect(store.selectedDegrees).toEqual([])
      expect(store.selectedJobTypes).toEqual([])
      expect(store.selectedOrganizations).toEqual([])
    })
  })
})
