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
    case 30: return 'RSK Mainnet'
    case 31: return 'RSK Testnet'

    case 1: return 'Ethereum Mainnet'
    case 3: return 'Ropsten Testnet'
    case 4: return 'Rinkeby Testnet'
    case 42: return 'Kovan Testnet'
    case 420: return 'Goerli Testnet'

    case 250: return 'Fantom Opera'
    case 4002: return 'Fantom Testnet'

    case 42161: return 'Arbitrum One'
    case 421611: return 'Arbitrum Rinkeby'

    case 137: return 'Polygon Mainnet'
    case 80001: return 'Polygon Testnet (Mumbai)'

    default: return `Network Id ${chainId}`
  }
}

export const getGasNameFromChain = (chainId: number) => {
  switch (chainId) {
    case 30: return 'RBTC'
    case 31: return 'tRBTC'

    case 1: return 'ETH'
    case 3: return 'ROP'
    case 4: return 'RIN'
    case 42: return 'KOV'
    case 420: return 'GOR'

    case 250: return 'FTM'
    case 4002: return 'FTM (Testnet)'

    case 42161: return 'ARETH'
    case 421611: return 'ARETH (Testnet)'

    case 137: return 'MATIC'
    case 80001: return 'MATIC (Testnet)'

    default: return 'RBTC'
  }
}

export const getChainId = (chainId: string) => parseInt(chainId)
