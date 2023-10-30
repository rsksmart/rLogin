export const rootstockChains = [
  {
    chainId: '0x1e', // 30
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
    chainId: '0x1f', // 31
    chainName: 'RSK Testnet',
    nativeCurrency: {
      name: 'Test RSK BTC',
      symbol: 'tRBTC',
      decimals: 18
    },
    rpcUrls: ['https://public-node.testnet.rsk.co'],
    blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
    iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
  },
  {
    chainId: '0x4E', // 78
    chainName: 'RSK Alphanet',
    nativeCurrency: {
      name: 'Test RSK BTC',
      symbol: 'tRBTC',
      decimals: 18
    },
    rpcUrls: ['https://fullnode-use1-1.alphanet.iovlabs.net'],
    blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
    iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
  }
]
export default rootstockChains
