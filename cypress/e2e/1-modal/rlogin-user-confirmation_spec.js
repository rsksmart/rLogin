import { mockInjectedProvider } from '../account'

describe('rLogin modal loading while user confirms wallet', () => {
  beforeEach(() => {
    mockInjectedProvider({ manualConfirmEnable: true })
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
