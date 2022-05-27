import { MockProvider } from '@rsksmart/mock-web3-provider'
import { privateKey, address } from '../account'

describe('modal - chose metamask fails, then walletconnect works', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = new MockProvider({
        address,
        privateKey,
        networkVersion: 31,
        debug: true
      })
      win.ethereum.isMetaMask = true
      win.ethereum.request = () => Promise.reject(new Error('an error'))
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
    cy.get('#walletconnect-qrcode-text').should('exist')
  })
})
