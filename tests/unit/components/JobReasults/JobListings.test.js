import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import { createTestingPinia } from '@pinia/testing'

import JobListings from '@/components/JobReasults/JobListings.vue'
import { useJobsStore } from '@/stores/jobs'

vi.mock('axios')

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = ($route) => {
    const pinia = createTestingPinia()

    render(JobListings, {
      global: {
        plugins: [pinia],
        mocks: {
          $route: $route
        },
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it('fetches jobs', () => {
    const $route = createRoute()

    renderJobListings($route)
    const jobsStore = useJobsStore()
    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('It displays maximum of 10 jobs', async () => {
    const $route = createRoute({ page: 1 })
    renderJobListings($route)

    const jobsStore = useJobsStore()
    jobsStore.jobs = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      const queryParams = { page: undefined }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      const queryParams = { page: '3' }
      const $route = createRoute(queryParams)

      renderJobListings($route)

      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('when user is on the first page', () => {
    it('does not show link to previous page', async () => {
      const $route = createRoute({ page: '1' })
      renderJobListings($route)
      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      const $route = createRoute({ page: '1' })
      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when the user is on the last page', () => {
    it('Does not show link to next page', async () => {
      const $route = createRoute({ page: '2' })
      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('Show link to the previous page', async () => {
      const $route = createRoute({ page: '2' })
      renderJobListings($route)

      const jobsStore = useJobsStore()
      jobsStore.jobs = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
