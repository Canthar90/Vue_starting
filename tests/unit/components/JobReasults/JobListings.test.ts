import type { Mock } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import { useRoute } from 'vue-router'
vi.mock('vue-router')

import { createTestingPinia } from '@pinia/testing'

import JobListings from '@/components/JobReasults/JobListings.vue'
import { useJobsStore } from '@/stores/jobs'

const useRouteMock = useRoute as Mock

vi.mock('axios')

describe('JobListings', () => {
  const renderJobListings = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    render(JobListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    return { jobsStore }
  }

  it('fetches jobs', () => {
    useRouteMock.mockReturnValue({ query: {} })

    const { jobsStore } = renderJobListings()

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled()
  })

  it('It displays maximum of 10 jobs', async () => {
    useRouteMock.mockReturnValue({ query: { page: '1' } })

    const { jobsStore } = renderJobListings()

    // @ts-expect-error
    jobsStore.FILTERED_JOBS = Array(15).fill({})

    const jobListings = await screen.findAllByRole('listitem')
    expect(jobListings).toHaveLength(10)
  })

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      useRouteMock.mockReturnValue({ query: {} })

      renderJobListings()

      expect(screen.getByText('Page 1')).toBeInTheDocument()
    })
  })

  describe('when params include page number', () => {
    it('displays page number', () => {
      useRouteMock.mockReturnValue({ query: { page: '3' } })

      renderJobListings()

      expect(screen.getByText('Page 3')).toBeInTheDocument()
    })
  })

  describe('when user is on the first page', () => {
    it('does not show link to previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })

      const { jobsStore } = renderJobListings()

      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it('shows link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '1' } })
      const { jobsStore } = renderJobListings()

      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when the user is on the last page', () => {
    it('Does not show link to next page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()

      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('Show link to the previous page', async () => {
      useRouteMock.mockReturnValue({ query: { page: '2' } })
      const { jobsStore } = renderJobListings()

      // @ts-expect-error
      jobsStore.FILTERED_JOBS = Array(15).fill({})

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
