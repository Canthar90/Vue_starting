import { render, screen } from '@testing-library/vue'

import HeaderContainer from '@/components/Shared/HeaderContainer.vue'

describe('HeaderContainer', () => {
  it('allows parent component to provide title component', () => {
    render(HeaderContainer, {
      slots: {
        title: '<h2>Any title</h2>'
      }
    })

    expect(screen.getByText('Any title')).toBeInTheDocument()
  })

  it('allows parent component to provide subtitle content', () => {
    render(HeaderContainer, {
      slots: {
        subtitle: '<h3>Any subtitle</h3>'
      }
    })

    expect(screen.getByText('Any subtitle')).toBeInTheDocument()
  })
})
