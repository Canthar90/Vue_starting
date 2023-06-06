import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'

import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  const renderMainNav = () => {
    render(MainNav, {
      global: {
        stubs: {
          FontAwesomeIcon: true
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

      let profileImage = screen.queryByRole('img', {
        name: /Profile pictiure/i //this means look for element with no case sensitivity
      })
      expect(profileImage).not.toBeInTheDocument()

      const loginButton = screen.getByRole('button', {
        text: /Sing in/i
      })
      await userEvent.click(loginButton)

      profileImage = screen.getByRole('img', {
        name: /Profile pictiure/i //this means look for element with no case sensitivity
      })
      expect(profileImage).toBeInTheDocument()
    })
  })
})
