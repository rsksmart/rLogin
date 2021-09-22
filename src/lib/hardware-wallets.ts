import { DONT_SHOW_TUTORIAL_AGAIN_KEY_LEDGER, DONT_SHOW_TUTORIAL_AGAIN_KEY_TREZOR, DONT_SHOW_TUTORIAL_AGAIN_KEY_DCENT } from '../constants'

export const LEDGER_NAME = 'Ledger'
export const TREZOR_NAME = 'Trezor'
export const DCENT_NAME = 'D\'Cent'

export function isHardwareWalletProvider (providerName: string) {
  return [LEDGER_NAME, TREZOR_NAME, DCENT_NAME].includes(providerName)
}

export function getTutorialLocalStorageKey (providerName: string) {
  switch (providerName) {
    case LEDGER_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_LEDGER
    case TREZOR_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_TREZOR
    case DCENT_NAME: return DONT_SHOW_TUTORIAL_AGAIN_KEY_DCENT
    default: throw new Error('Toturials have a wrong setup...')
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
