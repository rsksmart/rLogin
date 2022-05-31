import { getChainName, getGasNameFromChain } from './adapters'
import { chainList } from './chianList_test'

describe('network names', () => {
  test.each(chainList)('chain id %i has name %s', (chainId, expectedName) => {
    const chainName = getChainName(chainId)

    expect(chainName).toBe(expectedName)
  })
})

describe('network symbols', () => {
  test.each(chainList)('chain id %i has name %s', (chainId, _, expectedSymbol) => {
    const chainName = getGasNameFromChain(chainId)

    expect(chainName).toBe(expectedSymbol)
  })
})
