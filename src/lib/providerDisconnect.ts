import { WALLETCONNECT } from '..'

const disconnectProvider = async (provider: any): Promise<void> => {
  if (!provider) {
    return
  }

  // WalletConnect, Hardware Wrappers, Portis Wrapper
  if (provider.disconnect) {
    // could be a promise
    await provider.disconnect()
  }

  // LocalStorage cleanup missed with the disconnect method
  localStorage.removeItem(WALLETCONNECT)
  localStorage.removeItem('RLOGIN_CACHED_PROVIDER')
}

const disconnectFromDataVault = () => {
  localStorage.removeItem('x-csrf-token')
}

const disconnectFromProvider = (provider: any) => {
  disconnectProvider(provider)
  disconnectFromDataVault()
}

export default disconnectFromProvider
