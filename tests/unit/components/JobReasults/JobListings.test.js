import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'
import axios from 'axios'

import JobListings from '@/components/JobReasults/JobListings.vue'

vi.mock('axios')

describe('JobListings', () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: '5',
      ...queryParams
    }
  })

  const renderJobListings = ($route) => {
    render(JobListings, {
      global: {
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
    axios.get.mockResolvedValue({ data: [] })
    const $route = createRoute()

    renderJobListings($route)

    expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com3213/jobs')
  })

  it('It displays maximum of 10 jobs', async () => {
    axios.get.mockResolvedValue({ data: Array(15).fill({}) })
    const $route = createRoute({ page: 1 })

    renderJobListings($route)

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
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const $route = createRoute({ page: '1' })

      renderJobListings($route)

      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).not.toBeInTheDocument()
    })

    it.only('shows link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const $route = createRoute({ page: '1' })

      renderJobListings($route)

      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).toBeInTheDocument()
    })
  })

  describe('when the user is on the last page', () => {
    it('Does not show link to next page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const $route = createRoute({ page: '2' })

      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const nextLink = screen.queryByRole('link', { name: /next/i })
      expect(nextLink).not.toBeInTheDocument()
    })
    it('Show link to the previous page', async () => {
      axios.get.mockResolvedValue({ data: Array(15).fill({}) })
      const $route = createRoute({ page: '2' })

      renderJobListings($route)
      await screen.findAllByRole('listitem')
      const previousLink = screen.queryByRole('link', { name: /previous/i })
      expect(previousLink).toBeInTheDocument()
    })
  })
})
