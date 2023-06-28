import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltrtSidebarOrganizations from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    const userStore = useUserStore()
    const $router = { push: vi.fn() }

    render(JobFiltrtSidebarOrganizations, {
      global: {
        mocks: {
          $router
        },
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    return { jobsStore, userStore, $router }
  }

  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)

    const organizationListItems = screen.getAllByRole('listitem')
    const organizations = organizationListItems.map((node) => node.textContent)

    expect(organizations).toEqual(['Google', 'Amazon'])
  })

  describe('When users click checkbox', () => {
    it('communicates that user has selected checkbox for organizations', async () => {
      const { jobsStore, userStore } = renderJobFiltersSidebarOrganizations()

      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)

      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })
      await userEvent.click(googleCheckbox)

      expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Google'])
    })

    it('navigates user to Job Reasults page to se new batch of jobs', async () => {
      const { jobsStore, $router } = renderJobFiltersSidebarOrganizations()

      jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google'])

      const button = screen.getByRole('button', { name: /organizations/i })
      await userEvent.click(button)

      const googleCheckbox = screen.getByRole('checkbox', {
        name: /google/i
      })
      await userEvent.click(googleCheckbox)

      expect($router.push).toHaveBeenCalledWith({ name: 'JobsReasults' })
    })
  })
})
