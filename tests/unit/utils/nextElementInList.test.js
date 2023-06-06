import nextElementInList from '@/utils/nextElementInList'

describe('nextElementInList', () => {
  it('locates element in list and returns the next element in list', () => {
    const list = ['A', 'B', 'C', 'D', 'E']
    const value = 'C'
    const reasult = nextElementInList(list, value)
    expect(reasult).toBe('D')
  })

  describe('When element is in the end of the list', () => {
    it('locates next element at start of the list', () => {
      const list = ['A', 'B', 'C', 'D', 'E']
      const value = 'E'
      const reasult = nextElementInList(list, value)
      expect(reasult).toBe('A')
    })
  })
})
