import currentProvider from '@rsksmart/mock-web3-provider'

describe('rLoign modal loading while user confirms wallet', () => {
  beforeEach(() => {
    const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
    const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'
    cy.on('window:before:load', (win) => {
      win.ethereum = currentProvider({
        address,
        privateKey,
        chainId: 31,
        debug: true,
        manualConfirmEnable: true
      })
    })

    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  it('users confirms wallet', () => {
    cy.contains('MetaMask').click()
    cy.get('.loading').should('exist')
    cy.window().then((win) => {
      win.ethereum.answerEnable(true)
      cy.get('.loading').should('not.exist')
    })
  })
})
