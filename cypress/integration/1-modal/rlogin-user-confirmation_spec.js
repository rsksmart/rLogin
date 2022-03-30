import { MockProvider } from '@rsksmart/mock-web3-provider'

describe('rLogin modal loading while user confirms wallet', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    const provider = new MockProvider({
      address,
      privateKey,
      networkVersion: 31,
      debug: true,
      manualConfirmEnable: true
    })

    provider.isMetaMask = true

    cy.on('window:before:load', (win) => {
      win.ethereum = provider
    })
    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  it('users confirms wallet', () => {
    cy.contains('MetaMask').click()
    cy.contains('Please confirm in your wallet').should('be.visible')
    cy.window().then((win) => {
      win.ethereum.answerEnable(true)
      cy.contains('Please confirm in your wallet').should('not.exist')
      cy.contains('Connecting').should('be.visible')
    })
  })
})
