import { mockInjectedProvider } from '../account'

describe('triggers', () => {
  beforeEach(() => {
    mockInjectedProvider()
  })

  const loginWithModal = (withCacheProvider = false) => {
    cy.visit(`/${withCacheProvider ? '?cache=yes' : ''}`)
    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-button.confirm').click()

    cy.get('#connected').should('have.text', 'Yes')
  }

  const testInfo = () => {
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'MetaMask')
    cy.get('.rlogin-list-network').eq(0).should('have.text', 'RSK Testnet')
  }

  const testSelectNetwork = () => {
    cy.get('#connected').should('have.text', 'Yes')
    cy.get('.rlogin-header2').should('have.text', 'Select Network')
  }

  describe('wallet info', () => {
    it('should open wallet info modal', () => {
      loginWithModal()

      cy.get('#showInfo').click()

      testInfo()
    })

    it('should open wallet info modal after reconnect', () => {
      loginWithModal()

      cy.get('#showInfo').click()

      testInfo()

      cy.get('.rlogin-modal-close-button').click()

      cy.get('#disconnect').click()

      cy.get('#connected').should('have.text', '')

      loginWithModal()

      cy.get('#connected').should('have.text', 'Yes')

      cy.get('#showInfo').click()

      testInfo()
    })

    it('disconnects on click', () => {
      loginWithModal()

      cy.get('#showInfo').click()

      cy.get('button.rlogin-info-disconnect').click()

      cy.get('#connected').should('have.text', '')
      cy.get('.rlogin-modal-lightbox').should('be.not.visible')
    })
  })

  describe('change network', () => {
    it('should open change network modal', () => {
      loginWithModal()

      cy.get('#changeNetwork').click()

      testSelectNetwork()
    })
  })
})
