import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

vi.mock('axios')

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  it('stores jobs listings', () => {
    const store = useJobsStore()
    expect(store.jobs).toEqual([])
  })
})

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_JOBS', () => {
    it('makes API requests and stores received jobs', async () => {
      axios.get.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
      const store = useJobsStore()
      await store.FETCH_JOBS()
      expect(store.jobs).toEqual(['Job 1', 'Job 2'])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore()

      store.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ]

      const reasult = store.UNIQUE_ORGANIZATIONS

      expect(reasult).toEqual(new Set(['Google', 'Amazon']))
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [{ jobType: 'Full-time' }, { jobType: 'Temporary' }, { jobType: 'Full-time' }]

      const reasult = store.UNIQUE_JOB_TYPES

      expect(reasult).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = ['Google', 'Microsoft']

      const reasult = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(reasult).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }])
    })
  })

  describe('When the user has not selected any organizations', () => {
    it('returns all jobs', () => {
      const jobsStore = useJobsStore()

      jobsStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ]

      const userStore = useUserStore()
      userStore.selectedOrganizations = []

      const reasult = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS

      expect(reasult).toEqual([
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Google' }
      ])
    })
  })

  describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
    it('identifies jobs that are associated with given job types', () => {
      const jobsStore = useJobsStore()
      jobsStore.jobs = [
        { jobType: 'Full-time' },
        { jobType: 'Temporary' },
        { jobType: 'Part-time' }
      ]

      const userStore = useUserStore()
      userStore.selectedJobTypes = ['Full-time', 'Part-time']

      const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES

      expect(result).toEqual([{ jobType: 'Full-time' }, { jobType: 'Part-time' }])
    })

    describe('When the user has not selected any job types', () => {
      it('it returns all jobs', () => {
        const jobsStore = useJobsStore()
        jobsStore.jobs = [
          { jobType: 'Full-time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-time' }
        ]

        const userStore = useUserStore()
        userStore.selectedJobTypes = []

        const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES

        expect(result).toEqual([
          { jobType: 'Full-time' },
          { jobType: 'Temporary' },
          { jobType: 'Part-time' }
        ])
      })
    })
  })
})
