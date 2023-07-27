import type { Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import type { Job } from '@/api/types'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'
import { createJob } from '../../utils/createJob'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

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
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] })
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
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' })
      ]

      const reasult = store.UNIQUE_ORGANIZATIONS
      const expected = new Set(['Google', 'Amazon'])
      expect(reasult).toEqual(expected)
    })
  })

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' })
      ]

      const reasult = store.UNIQUE_JOB_TYPES

      expect(reasult).toEqual(new Set(['Full-time', 'Temporary']))
    })
  })

  describe('UNIQUE_LOCATIONS', () => {
    it('finds unique locations from list of jobs', () => {
      const store = useJobsStore()
      store.jobs = [
        createJob({ locations: ['LA', 'Elblag'] }),
        createJob({ locations: ['Golina', 'LA'] })
      ]

      const reasult = store.UNIQUE_LOCATIONS

      expect(reasult).toEqual(new Set(['LA', 'Elblag', 'Golina']))
    })
  })

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when user has not selected any organizations', () => {
      it('Includes job', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = []

        const store = useJobsStore()
        const job = createJob({ organization: 'Google' })

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given organizations', () => {
        const userStore = useUserStore()
        userStore.selectedOrganizations = ['Google', 'Microsoft']

        const store = useJobsStore()
        const job = createJob({ organization: 'Google' }) as Job

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_DEGREE', () => {
    describe('when user has not selected any degrees', () => {
      it('Includes job', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = []

        const store = useJobsStore()
        const job = createJob()

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given degrees', () => {
        const userStore = useUserStore()
        userStore.selectedDegrees = ["Master's"]

        const store = useJobsStore()
        const job = createJob({ degree: "Master's" })

        const result = store.INCLUDE_JOB_BY_DEGREE(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_LOCATION', () => {
    describe('when user has not selected any locations', () => {
      it('includes the job', () => {
        const userStore = useUserStore()
        userStore.selectedLocations = []

        const jobStore = useJobsStore()
        const job = createJob()

        const result = jobStore.INCLUDE_JOB_BY_LOCATION(job)
        expect(result).toBe(true)
      })
    })

    it('checks if job is associated with given locations', () => {
      const userStore = useUserStore()
      userStore.selectedLocations = ['LA', 'NYC']

      const jobStore = useJobsStore()
      const job = createJob({ locations: ['LA', 'Walbrzych'] })

      const result = jobStore.INCLUDE_JOB_BY_LOCATION(job)
      expect(result).toBe(true)
    })
  })

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when user has not selected any job types', () => {
      it('Includes job', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = []

        const store = useJobsStore()
        const job = createJob({ jobType: 'Full-time' }) as Job

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })

      it('identifies if job is associated with given job types', () => {
        const userStore = useUserStore()
        userStore.selectedJobTypes = ['Full-time', 'Part-time']

        const store = useJobsStore()
        const job = createJob({ jobType: 'Full-time' }) as Job

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job)

        expect(result).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_SKILL', () => {
    it("identifies of job matches user's skill", () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'Vue'

      const store = useJobsStore()
      const job = createJob({ title: 'Vue developer' })

      const reasult = store.INCLUDE_JOB_BY_SKILL(job)

      expect(reasult).toBe(true)
    })

    it('handles inconsistent character casing', () => {
      const userStore = useUserStore()
      userStore.skillsSearchTerm = 'vUe'

      const store = useJobsStore()
      const job = createJob({ title: 'Vue developer' })

      const reasult = store.INCLUDE_JOB_BY_SKILL(job)

      expect(reasult).toBe(true)
    })

    describe('INCLUDE_JOB_BY_SEARCHED_LOCATION', () => {
      it('Identifies if job match searched location', () => {
        const userStore = useUserStore()
        userStore.locationSearchTerm = 'Warszawa'

        const jobStore = useJobsStore()
        const job = createJob({ locations: ['Warszawa'] })

        const reasult = jobStore.INCLUDE_JOB_BY_SEARCHED_LOCATION(job)

        expect(reasult).toBe(true)
      })

      it('handles inconsistant character casing', () => {
        const userStore = useUserStore()
        userStore.locationSearchTerm = 'wArSzawA'

        const jobStore = useJobsStore()
        const job = createJob({ locations: ['Warszawa'] })

        const reasult = jobStore.INCLUDE_JOB_BY_SEARCHED_LOCATION(job)

        expect(reasult).toBe(true)
      })
    })

    describe('when the user has not entered any skill', () => {
      it('includes job', () => {
        const userStore = useUserStore()
        userStore.skillsSearchTerm = ''

        const store = useJobsStore()
        const job = createJob({ title: 'Vue developer' })

        const reasult = store.INCLUDE_JOB_BY_SKILL(job)

        expect(reasult).toBe(true)
      })
    })
  })

  describe('INCLUDE_JOB_BY_ID', () => {
    it('includes job by id', () => {
      const userStore = useUserStore()
      userStore.searchID = 3

      const jobsStore = useJobsStore()
      const job = createJob({ id: 3 })

      const reasult = jobsStore.INCLUDE_JOB_BY_ID(job)
      expect(reasult).toBe(true)
    })
  })
})
