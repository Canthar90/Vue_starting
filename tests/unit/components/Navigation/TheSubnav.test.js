import { render, screen } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'

import { useRoute } from 'vue-router'
vi.mock('vue-router')

import TheSubnav from '@/components/Navigation/TheSubnav.vue'
import { useJobsStore } from '@/stores/jobs'

describe('TheSubnav', () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()

    render(TheSubnav, {
      global: {
        plugins: [pinia],

        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore }
  }

  describe('when user is on jobs page', () => {
    it('displays job coun', async () => {
      useRoute.mockReturnValue({ name: 'JobsReasults' })

      const { jobsStore } = renderTheSubnav()
      const numberOfJobs = 16
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({})

      const jobCount = await screen.findByText(numberOfJobs)

      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT displays job count', () => {
      const routeName = 'Home'

      useRoute.mockReturnValue({ name: routeName })

      const { jobsStore } = renderTheSubnav(routeName)
      const numberOfJobs = 16
      jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS = Array(numberOfJobs).fill({})

      const jobCount = screen.queryByText(numberOfJobs)

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
