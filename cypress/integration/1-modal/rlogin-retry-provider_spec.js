import { mockInjectedProvider } from '../account'

describe('modal - chose metamask fails, then walletconnect works', () => {
  beforeEach(() => {
    mockInjectedProvider({}, (provider) => {
      provider.request = () => Promise.reject(new Error('an error'))
    })
  })

  it('Try to open Metamask but fails', () => {
    cy.visit('/')
    cy.contains('login with rLogin').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-header2').should('have.text', 'Could not connect to MetaMask')
    cy.get('.rlogin-modal-close-button').click()
  })

  it('retry to open Metamask but fails', () => {
    cy.contains('login with rLogin').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-header2').should('have.text', 'Could not connect to MetaMask')
    cy.get('.rlogin-modal-close-button').click()
  })

  it('shows a QR code for WalletConnect', () => { // try with WalletConnect should work
    cy.contains('login with rLogin').click()
    cy.contains('WalletConnect').click()
    cy.get('wcm-modal')
  })
})
