import { AddEthereumChainParameter } from "../../lib/provider"

// export const networks: [chainId: number, params: AddEthereumChainParameter] = {
export const networks: Map<number, AddEthereumChainParameter> = new Map([
  [
    30, {
      chainId: '0x1e',
      chainName: 'RSK Mainnet',
      nativeCurrency: {
        name: 'RSK BTC',
        symbol: 'RBTC',
        decimals: 18
      },
      rpcUrls: ['https://public-node.rsk.co'],
      blockExplorerUrls: ['https://explorer.rsk.co']
    }
  ],
  [
    31, {
      chainId: '0x1f',
      chainName: 'RSK Testnet',
      nativeCurrency: {
        name: 'Test RSK BTC',
        symbol: 'tRBTC',
        decimals: 18
      },
      rpcUrls: ['https://public-node.testnet.rsk.co'],
      blockExplorerUrls: ['https://explorer.testnet.rsk.co']
    }
  ]
])

export const canAddChain = (chainId: number) => {
  return networks.get(chainId)
  // const answer = <AddEthereumChainParameter | null> networks[chainId]
  // return networks.hasOwnProperty!(chainId) ? networks[chainId] : null
  // return networks[chainId.toString()] || null
  /*
  switch (chainId) {
    case 30: return networks[30]
    case 31: return networks[31]
    default: return null
  }
  */
}
