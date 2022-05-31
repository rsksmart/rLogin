import { MockProvider } from '@rsksmart/mock-web3-provider'
import { privateKey, address } from '../account'

describe('hardware provider tests', () => {
  const rLoginCached = JSON.stringify({
    provider: {
      name: 'Ledger',
      logo: 'data:image/svg+xml;',
      description: 'Connect to your Ledger Wallet'
    },
    chosenNetwork: {
      rpcUrl: 'http://test.com',
      chainId: 30
    }
  })

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      const provider = new MockProvider({
        address,
        privateKey,
        networkVersion: 31,
        debug: true
      })

      provider.isMetaMask = null
      provider.isLedger = true

      win.ethereum = provider
    })
  })

  it('shows the choose network and tutorial screens', () => {
    cy.visit('/?cache=yes')

    cy.get('#login').click()
    cy.contains('Ledger').click()
    cy.get('.rlogin-header2').should('have.text', 'Choose Network')

    cy.get('.rlogin-button').click()
    cy.contains('Finish tutorial and connect').click()

    // can't connect since the rLogin package attempts to connect via USB
    cy.get('.rlogin-header2').should('have.text', 'Could not connect to Ledger')
  })
})
