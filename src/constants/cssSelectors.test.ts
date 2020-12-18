import * as CSSSelector from './cssSelectors'

describe('CSS Selectors', () => {
  test('are all different', () => {
    const valuesForKeys: { [key: string]: any } = {}

    Object.keys(CSSSelector).forEach(key => {
      const value = (CSSSelector as any)[key]
      expect(valuesForKeys[value]).toBeUndefined()
      valuesForKeys[value] = key
    })
  })
})
