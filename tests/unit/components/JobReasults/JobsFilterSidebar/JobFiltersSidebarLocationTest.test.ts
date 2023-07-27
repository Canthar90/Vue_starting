import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { createTestingPinia } from '@pinia/testing'

import { useUserStore } from '@/stores/user'

import JobFiltersSidebarLocationText from '@/components/JobReasults/JobFiltersSidebar/JobFiltersSidebarLocationText.vue'

describe('JobFiltersSidebarLocationText', () => {
  const renderJobFiltersSidebarLocationText = () => {
    const pinia = createTestingPinia()
    const userStore = useUserStore()

    render(JobFiltersSidebarLocationText, {
      global: {
        plugins: [pinia]
      }
    })

    return { userStore }
  }

  it('populates search input from store', async () => {
    const { userStore } = renderJobFiltersSidebarLocationText()

    userStore.locationSearchTerm = 'Lisbon'

    const input = await screen.findByRole<HTMLInputElement>('textbox')

    expect(input.value).toBe('Lisbon')
  })

  it('Writes input to store', async () => {
    const { userStore } = renderJobFiltersSidebarLocationText()
    userStore.locationSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, 'O')
    await userEvent.click(document.body)

    expect(userStore.UPDATE_LOCATION_SEARCH_TERM).toHaveBeenCalledWith('O')
  })

  it('removes whitespace from user input', async () => {
    const { userStore } = renderJobFiltersSidebarLocationText()
    userStore.locationSearchTerm = ''
    const input = screen.getByRole<HTMLInputElement>('textbox')
    await userEvent.type(input, '  O   ')
    await userEvent.click(document.body)

    expect(userStore.UPDATE_LOCATION_SEARCH_TERM).toHaveBeenCalledWith('O')
  })
})
