import { DONT_SHOW_TUTORIAL_AGAIN_KEY_LEDGER, DONT_SHOW_TUTORIAL_AGAIN_KEY_TREZOR, DONT_SHOW_TUTORIAL_AGAIN_KEY_DCENT } from '../constants'
import type { NetworkParamsOptions } from './networkOptionsTypes'

export const LEDGER_NAME = 'Ledger'
export const TREZOR_NAME = 'Trezor'
export const DCENT_NAME = 'D\'Cent'
export const TORUS_NAME = 'Torus'
export const PORTIS_NAME = 'Portis'

export function isHardwareWalletProvider (providerName: string) {
  return [LEDGER_NAME, TREZOR_NAME, DCENT_NAME].includes(providerName)
}

export function getTutorialLocalStorageKey (providerName: string) {
  switch (providerName) {
    case LEDGER_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_LEDGER
    case TREZOR_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_TREZOR
    case DCENT_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_DCENT
    default: throw new Error('Tutorials have a wrong setup...')
  }
}

export function isLedger (providerName: string) {
  return providerName === LEDGER_NAME
}

export function isTrezor (providerName: string) {
  return providerName === TREZOR_NAME
}

export function isDCent (providerName: string) {
  return providerName === DCENT_NAME
}

export function isTorus (providerName: string) {
  return providerName === TORUS_NAME
}

export function isPortis (providerName: string) {
  return providerName === PORTIS_NAME
}

export function requiresNetworkSelection (providerName: string) {
  return isHardwareWalletProvider(providerName) || isTorus(providerName) || isPortis(providerName)
}

const TORUS_NETWORK_PARAMS: NetworkParamsOptions = {
  30: {
    host: 'https://public-node.rsk.co',
    chainId: 30,
    networkId: 30,
    blockExplorer: 'https://explorer.rsk.co/',
    ticker: 'rBTC',
    tickerName: 'rBTC',
    networkName: 'RSK - Mainnet'
  },
  31: {
    host: 'https://public-node.testnet.rsk.co',
    chainId: 31,
    networkId: 31,
    blockExplorer: 'https://explorer.testnet.rsk.co/',
    ticker: 'tRBTC',
    tickerName: 'tRBTC',
    networkName: 'RSK - Testnet'
  }
}

const PORTIS_NETWORK_PARAMS: NetworkParamsOptions = {
  30: {
    chainId: 30,
    nodeUrl: 'https://public-node.rsk.co'
  },
  31: {
    chainId: 31,
    nodeUrl: 'https://public-node.testnet.rsk.co'
  }
}

export const PROVIDERS_NETWORK_PARAMS:{[key:string]:NetworkParamsOptions} = {
  [TORUS_NAME]: TORUS_NETWORK_PARAMS,
  [PORTIS_NAME]: PORTIS_NETWORK_PARAMS
}
