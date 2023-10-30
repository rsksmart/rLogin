import { parseInfoOptions, parseRpcUrls, parseSupportedChains } from './'
import { AddEthereumChainParameter } from '../ux/wrongNetwork/changeNetwork'

const rskChains: AddEthereumChainParameter[] = [
  {
    chainId: '0x1e',
    chainName: 'RSK Mainnet',
    nativeCurrency: {
      name: 'RSK BTC',
      symbol: 'RBTC',
      decimals: 18
    },
    rpcUrls: ['https://public-node.rsk.co'],
    blockExplorerUrls: ['https://explorer.rsk.co'],
    iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
  },
  {
    chainId: '0x1f',
    chainName: 'RSK Testnet',
    nativeCurrency: {
      name: 'Test RSK BTC',
      symbol: 'tRBTC',
      decimals: 18
    },
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
    iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
  }
]

describe('Chain options parsing functions', () => {
  it('"parseSupportedChains" function should return correct chain IDs', () => {
    const supportedChains = parseSupportedChains(rskChains)
    expect(supportedChains).toEqual([30, 31])
  })

  it('"parseRpcUrls" function should return correct URLs', () => {
    const urls = parseRpcUrls(rskChains)
    expect(urls).toEqual({
      30: 'https://public-node.rsk.co',
      31: 'https://public-node.testnet.rsk.co'
    })
  })

  it('"parseInfoOptions" function returns correct block explorer URLs', () => {
    const urls = parseInfoOptions(rskChains)
    expect(urls).toEqual({
      30: {
        addressBaseURL: 'https://explorer.rsk.co'
      },
      31: {
        addressBaseURL: 'https://explorer.testnet.rsk.co'
      }
    })
  })

  it('functions should return undefined if no argument is passed', () => {
    expect(parseSupportedChains()).toBe(undefined)
    expect(parseRpcUrls()).toBe(undefined)
    expect(parseInfoOptions()).toBe(undefined)
  })
})
