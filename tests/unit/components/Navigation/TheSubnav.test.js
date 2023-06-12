import { render, screen } from '@testing-library/vue'

import TheSubnav from '@/components/Navigation/TheSubnav.vue'

describe('TheSubnav', () => {
  describe('when user is on jobs page', () => {
    it('displays job coun', () => {
      const $route = {
        name: 'JobsReasults'
      }

      render(TheSubnav, {
        global: {
          mocks: {
            $route: $route
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const jobCount = screen.getByText('2137')

      expect(jobCount).toBeInTheDocument()
    })
  })

  describe('when user is not on jobs page', () => {
    it('does NOT displays job count', () => {
      const $route = {
        name: 'Home'
      }

      render(TheSubnav, {
        global: {
          mocks: {
            $route: $route
          },
          stubs: {
            FontAwesomeIcon: true
          }
        }
      })

      const jobCount = screen.queryByText('2137')

      expect(jobCount).not.toBeInTheDocument()
    })
  })
})
