import currentProvider from '@rsksmart/mock-web3-provider'

describe('sample:dapp testing, no backend', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D';
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = currentProvider({
        address,
        privateKey,
        chainId: 2,
        debug: true
      })
    })
  })

  it('shows the Select Network modal when using connect', () => {
    cy.visit('http://localhost:3006/')
    cy.get('#login').click()
    cy.contains('MetaMask').click()

    cy.get('h2.rlogin-header2').should('have.text', 'Select Network')
  })

  it('shows the Select Network modal when using connectTo', () => {
    cy.visit('http://localhost:3006/')
    cy.get('#loginMetamask').click()
    cy.contains('MetaMask').click()

    cy.get('h2.rlogin-header2').should('have.text', 'Select Network')
  })
})
