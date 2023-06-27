import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import JobFiltrtSidebarOrganizations from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue'
import { useJobsStore } from '@/stores/jobs'
import { useUserStore } from '@/stores/user'

describe('JobFiltersSidebarOrganizations', () => {
  it('renders unique list of organizations from jobs', async () => {
    const pinia = createTestingPinia()
    const jobsStore = useJobsStore()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    render(JobFiltrtSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)

    const organizationListItems = screen.getAllByRole('listitem')
    const organizations = organizationListItems.map((node) => node.textContent)

    expect(organizations).toEqual(['Google', 'Amazon'])
  })

  it('communicates that user has selected checkbox for organizations', async () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()
    const jobsStore = useJobsStore()
    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon'])

    render(JobFiltrtSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })

    const button = screen.getByRole('button', { name: /organizations/i })
    await userEvent.click(button)

    const googleCheckbox = screen.getByRole('checkbox', {
      name: /google/i
    })
    await userEvent.click(googleCheckbox)

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Google'])
  })
})
