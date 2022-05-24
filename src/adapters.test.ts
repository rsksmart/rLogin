import { getChainName, getGasNameFromChain } from './adapters'

// ref: https://chainlist.org/
const chainList: [number, string, string][] = [
  [30, 'RSK Mainnet', 'RBTC'],
  [31, 'RSK Testnet', 'tRBTC'],
  [1, 'Ethereum Mainnet', 'ETH'],
  [3, 'Ropsten Testnet', 'ROP'],
  [4, 'Rinkeby Testnet', 'RIN'],
  [42, 'Kovan Testnet', 'KOV'],
  [420, 'Goerli Testnet', 'GOR'],
  [250, 'Fantom Opera', 'FTM'],
  [4002, 'Fantom Testnet', 'FTM (Testnet)'],
  [42161, 'Arbitrum One', 'ARETH'],
  [421611, 'Arbitrum Rinkeby', 'ARETH (Testnet)'],
  [137, 'Polygon Mainnet', 'MATIC'],
  [80001, 'Polygon Testnet (Mumbai)', 'MATIC (Testnet)'],
  [1337, 'Network Id 1337', 'RBTC']
]

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
