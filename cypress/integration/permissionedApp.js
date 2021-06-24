import currentProvider from '@rsksmart/mock-web3-provider'

describe('sample:dapp testing, no backend', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D';
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = currentProvider({
        address,
        privateKey,
        chainId: 31,
        debug: true
      })
    })
  })

  it('test the data vault flow', () => {
    cy.visit('http://localhost:3006/?backend=yes')
    cy.get('#login').click()
    cy.contains('MetaMask').click()
    
    cy.get('h2').should('have.text', 'Welcome')
  })
})