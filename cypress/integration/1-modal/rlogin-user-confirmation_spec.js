import { MockProvider } from '@rsksmart/mock-web3-provider'
import { privateKey, address } from '../account'

describe('rLogin modal loading while user confirms wallet', () => {
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
