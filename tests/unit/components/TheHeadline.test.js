import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/TheHeadline.vue'

describe('TheHeadline', () => {
  it('displays introduction action verb', () => {
    vi.useFakeTimers()
    render(TheHeadline)

    const actionPhraze = screen.getByRole('heading', {
      name: /build for everyone/i
    })
    expect(actionPhraze).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('changes action verb at a consistent interval', () => {
    vi.useFakeTimers()
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)

    render(TheHeadline)

    expect(mock).toHaveBeenCalled()
  })
})
