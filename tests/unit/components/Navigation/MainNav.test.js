import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import { RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/stores/user'

import { useRoute } from 'vue-router'
vi.mock('vue-router')

import MainNav from '@/components/Navigation/MainNav.vue'

describe('MainNav', () => {
  const renderMainNav = () => {
    const pinia = createTestingPinia()

    useRoute.mockReturnValue({ name: 'Home' })
    render(MainNav, {
      global: {
        plugins: [pinia],

        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub
        }
      }
    })
  }

  it('Displays company name', () => {
    renderMainNav()
    const companyName = screen.getByText('Myszojeleń Careers')
    expect(companyName).toBeInTheDocument()
  })

  it('Displays menu items for navigations', () => {
    renderMainNav()
    const navigationMenuItems = screen.getAllByRole('listitem')
    const navigatnonMenuTexts = navigationMenuItems.map((item) => item.textContent)
    expect(navigatnonMenuTexts).toEqual([
      'Teams',
      'Locations',
      'Life at Bobo Corp',
      'How we hire',
      'Students',
      'Jobs'
    ])
  })

  describe('When the user logs in', () => {
    it('displays user profile pictiure', async () => {
      renderMainNav()
      const userStore = useUserStore()

      let profileImage = screen.queryByRole('img', {
        name: /Profile pictiure/i //this means look for element with no case sensitivity
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        text: /Sing in/i
      })
      userStore.isLoggedIn = true
      await userEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /Profile pictiure/i //this means look for element with no case sensitivity
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
