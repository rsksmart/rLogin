import { MockProvider } from '@rsksmart/mock-web3-provider'

export const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
export const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

export const mockInjectedProvider = () => {
  cy.on('window:before:load', (win) => {
    win.ethereum = new MockProvider({
      address,
      privateKey,
      networkVersion: 31,
      debug: true
    })
  })
}
