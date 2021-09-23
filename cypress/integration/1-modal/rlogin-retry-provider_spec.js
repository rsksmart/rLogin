import currentProvider from '@rsksmart/mock-web3-provider'

describe('modal - chose metamask fails, then walletconnect works', () => {
  const address = '0xB98bD7C7f656290071E52D1aA617D9cB4467Fd6D'
  const privateKey = 'de926db3012af759b4f24b5a51ef6afa397f04670f634aa4f48d4480417007f3'

  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.ethereum = currentProvider({
        address,
        privateKey,
        chainId: 31,
        debug: true
      })
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
