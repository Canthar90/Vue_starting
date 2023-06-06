import { nextTick } from 'vue'
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

  it('Swaps action verb after interval', async () => {
    vi.useFakeTimers()
    render(TheHeadline)
    vi.advanceTimersToNextTimer()

    await nextTick()

    const actionPhraze = screen.getByRole('heading', {
      name: /build for everyone/i
    })

    expect(actionPhraze).toBeInTheDocument()
    vi.useRealTimers()
  })
  it('removes interval when component dissapears', () => {
    vi.useFakeTimers()
    const clearInterval = vi.fn()
    vi.stubGlobal('clearInterval', clearInterval)

    const { unmount } = render(TheHeadline)
    unmount()

    expect(clearInterval).toHaveBeenCalled()
    vi.useRealTimers()
    vi.unstubAllGlobals()
  })
})

// it('removes interval when component disappears', () => {
//   const clearInterval = vi.fn()
//   vi.stubGlobal('clearInterval', clearInterval)

//   const { unmount } = render(TheHeadline)
//   unmount()
//   expect(clearInterval).toHaveBeenCalled()
//   vi.unstubAllGlobals()
// })
