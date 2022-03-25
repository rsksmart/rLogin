import { MockProvider } from '@rsksmart/mock-web3-provider'

describe('Web3 Provider throws an error when connecting', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    const provider = new MockProvider({
      address,
      privateKey,
      networkVersion: 31,
      debug: true
    })

    // overwrite the enable method to throw an error:
    provider.request = (_props) => Promise.reject(new Error('Not today'))
    provider.isMetaMask = true

    cy.on('window:before:load', (win) => {
      win.ethereum = provider
    })
  })

  it('shows an error when the provider throws', () => {
    cy.visit('/')
    cy.get('#login').click()
    cy.contains('MetaMask').click()

    cy.get('.rlogin-header2').should('have.text', 'Could not connect to MetaMask')
    cy.get('.rlogin-paragraph').should('have.text', 'User Rejected')
  })

  it('starts over', () => {
    cy.visit('/')
    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-header2').should('have.text', 'Could not connect to MetaMask')

    cy.contains('Start Over').click()
    cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
  })
})
