import type { Mock } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import axios from 'axios'

import { createDegree } from 'tests/utils/createDegree'

import { useDegreesStore } from '@/stores/degrees'

vi.mock('axios')
const axiosGetMock = axios.get as Mock

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

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('FETCH_DEGREES', () => {
    it('makes API request and stores recived degrees', async () => {
      axiosGetMock.mockResolvedValue({
        data: [
          {
            id: 1,
            degree: "Bathelor's"
          }
        ]
      })

      const store = useDegreesStore()
      await store.FETCH_DEGREES()

      expect(store.degrees).toEqual([
        {
          id: 1,
          degree: "Bathelor's"
        }
      ])
    })
  })
})

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('UNIQUE_DEGREES', () => {
    it('finds unique degrees from collection of degrees', () => {
      const store = useDegreesStore()

      store.degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Batchelor's" })
      ]

      const reasult = store.UNIQUE_DEGREES

      expect(reasult).toEqual(["Master's", "Batchelor's"])
    })
  })
})
