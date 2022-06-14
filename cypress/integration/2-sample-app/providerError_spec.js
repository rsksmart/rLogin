import { mockInjectedProvider } from '../account'

describe('Web3 Provider throws an error when connecting', () => {
  beforeEach(() => {
    mockInjectedProvider({}, (provider) => {
      provider.request = (_props) => Promise.reject(new Error('Not today'))
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
