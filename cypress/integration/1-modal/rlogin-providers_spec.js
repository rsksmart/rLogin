import { mockInjectedProvider } from '../account'

describe('rLogin modal loading while user confirms wallet', () => {
  it('hides Nifty wallet when it is not present', () => {
    mockInjectedProvider()
    cy.visit('/')
    cy.contains('login with rLogin').click()

    cy.contains('Nifty').should('not.exist')
  })

  it('shows Nifty', () => {
    mockInjectedProvider({}, (provider) => {
      provider.isMetaMask = null
      provider.isNiftyWallet = true
    })

    cy.visit('/')
    cy.contains('login with rLogin').click()

    cy.contains('Nifty').should('exist')
  })
})
