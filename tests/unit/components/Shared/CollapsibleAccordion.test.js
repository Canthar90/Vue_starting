import { render, screen } from '@testing-library/vue'

import userEvent from '@testing-library/user-event'

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue'

describe('Collapsible Accordion', () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      },
      props: {
        header: 'My Category'
      },
      slots: {
        default: '<h3>My nested child</h3>'
      },
      ...config
    })
  }

  it('renders child content', async () => {
    const props = {
      header: 'My Category',
      slots: {
        default: '<h3>My nested child</h3>'
      }
    }

    renderCollapsibleAccordion(props)

    expect(screen.queryByText('My nested child')).not.toBeInTheDocument()
    const button = screen.getByRole('button', { name: /my category/i })
    await userEvent.click(button)
    expect(screen.getByText('My nested child')).toBeInTheDocument()
  })

  describe('when parent does not provide custom child content', () => {
    it('renders default content', async () => {
      const prop = {
        header: 'My Category',
        slots: {}
      }

      renderCollapsibleAccordion(prop)

      expect(screen.queryByText('Woops something went wrong')).not.toBeInTheDocument()
      const button = screen.getByRole('button', { name: /my category/i })
      await userEvent.click(button)
      expect(screen.getByText('Woops something went wrong')).toBeInTheDocument()
    })
  })
})
