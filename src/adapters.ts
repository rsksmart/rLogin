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
    case 30: return 'RSK'
    case 31: return 'RSK Testnet'
    default: return `network Id ${chainId}`
  }
}
