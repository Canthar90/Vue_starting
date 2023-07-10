import { createPinia, setActivePinia } from 'pinia'

import { useDegreesStore } from '@/stores/degrees'

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('stores all degress that job may require', () => {
    const store = useDegreesStore()
    expect(store.degrees).toEqual([])
  })

  it('', () => {})
})
