import { mockInjectedProvider } from '../account'

describe('show Select Network modal when trying to connect with a unsupported chainId', () => {
  beforeEach(() => {
    mockInjectedProvider({ networkVersion: 2 })
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
