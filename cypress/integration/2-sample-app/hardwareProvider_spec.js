import currentProvider from '@rsksmart/mock-web3-provider'

describe('hardware provider tests', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

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
      const provider = currentProvider({
        address,
        privateKey,
        chainId: 31,
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
