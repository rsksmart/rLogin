import { MockProvider } from '@rsksmart/mock-web3-provider'

describe('triggers', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = new MockProvider({
        address,
        privateKey,
        networkVersion: 31,
        debug: true
      })
      win.ethereum.isMetaMask = true
    })
  })

  const loginWithModal = (withCacheProvider = false) => {
    cy.visit(`/${withCacheProvider ? '?cache=yes' : ''}`)
    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-button.confirm').click()

    cy.get('#connected').should('have.text', 'Yes')
  }

  describe('wallet info', () => {
    it('should open wallet info modal', () => {
      loginWithModal()

      cy.get('#showInfo').click()

      cy.get('.rlogin-header2').should('have.text', 'Information')
      cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
      cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
    })

    it('should open wallet info modal after reconnect', () => {
      loginWithModal()

      cy.get('#showInfo').click()

      cy.get('.rlogin-header2').should('have.text', 'Information')
      cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
      cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')

      cy.get('.rlogin-modal-close-button').click()

      cy.get('#reset').click()

      cy.get('#connected').should('have.text', '')

      loginWithModal()
      confirmInformationStep()

      cy.get('#connected').should('have.text', 'Yes')

      cy.get('#showInfo').click()

      cy.get('.rlogin-header2').should('have.text', 'Information')
      cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
      cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
    })
  })

  describe('change network', () => {
    it('should open change network modal', () => {
      loginWithModal()

      cy.get('#changeNetwork').click()

      cy.get('.rlogin-header2').should('have.text', 'Choose Network')
    })
  })
})
