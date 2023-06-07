import { nextTick } from 'vue'
import { render, screen } from '@testing-library/vue'

import TheHeadline from '@/components/JobSearch/TheHeadline.vue'

describe('TheHeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('displays introduction action verb', () => {
    render(TheHeadline)

    const actionPhraze = screen.getByRole('heading', {
      name: /build for everyone/i
    })
    expect(actionPhraze).toBeInTheDocument()
  })

  it('changes action verb at a consistent interval', () => {
    const mock = vi.fn()
    vi.stubGlobal('setInterval', mock)

    render(TheHeadline)

    expect(mock).toHaveBeenCalled()
  })

  it('Swaps action verb after interval', async () => {
    render(TheHeadline)
    vi.advanceTimersToNextTimer()

    await nextTick()

    const actionPhraze = screen.getByRole('heading', {
      name: /create for everyone/i
    })

    expect(actionPhraze).toBeInTheDocument()
  })
  it('removes interval when component dissapears', () => {
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)

    const { unmount } = render(TheHeadline)
    unmount()

    expect(clearInterval).toHaveBeenCalled()

    vi.unstubAllGlobals()
  })
})
