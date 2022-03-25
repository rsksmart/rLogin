import { MockProvider } from '@rsksmart/mock-web3-provider'

describe('show Select Network modal when trying to connect with a unsupported chainId', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = new MockProvider({
        address,
        privateKey,
        networkVersion: 2,
        debug: true
      })
      win.ethereum.isMetaMask = true
    })
  })

  it('shows the Select Network modal when using connect', () => {
    cy.visit('/')
    cy.get('#login').click()
    cy.contains('MetaMask').click()

    cy.get('h2.rlogin-header2').should('have.text', 'Select Network')
  })

  it('shows the Select Network modal when using connectTo', () => {
    cy.visit('/')
    cy.get('#loginMetamask').click()
    cy.get('h2.rlogin-header2').should('have.text', 'Select Network')
  })

  it('throws an error when using connectTo and hideModal: true', () => {
    cy.visit('/?keepModalHidden=yes')
    cy.get('#loginMetamask').click()

    cy.get('.rlogin-modal-body').should('not.be.visible')
    cy.get('#error').should('have.text', 'Error: ChainId is not supported.')
  })

  it('it should connect with any network', () => {
    cy.visit('/?supportedChains=all')
    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-button.confirm').click()
    cy.get('#connected').should('have.text', 'Yes')
  })
})
