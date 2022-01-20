function getDIDMethod (chainId: number) {
  switch (chainId) {
    case 30: return 'rsk:'
    case 31: return 'rsk:testnet:'
    default: return ''
  }
}

export function getDID (chainId: number, address: string) {
  return 'did:ethr:' + getDIDMethod(chainId) + address.toLowerCase()
}

export function getChainName (chainId: number) {
  switch (chainId) {
    case 1: return 'Ethereum Mainnet'
    case 3: return 'Ropsten Testnet'
    case 4: return 'Rinkeby Testnet'
    case 30: return 'RSK Mainnet'
    case 31: return 'RSK Testnet'
    case 42: return 'Kovan Testnet'
    case 420: return 'Goerli Testnet'
    default: return `Network Id ${chainId}`
  }
}

export const getGasNameFromChain = (chainId: number) => {
  switch (chainId) {
    case 1: return 'ETH'
    case 30: return 'RBTC'
    case 31: return 'tRBTC'
    default: return ''
  }
}

export const getChainId = (chainId: string) => parseInt(chainId)
