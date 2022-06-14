import { MockProvider } from '@rsksmart/mock-web3-provider'
import { privateKey, address, mockInjectedProvider } from '../account'

describe('cache provider tests', () => {
  const rLoginCached = JSON.stringify({
    provider: {
      name: 'MetaMask',
      logo: 'data:image/svg+xml;',
      description: 'Connect to your MetaMask Wallet'
    }
  })

  beforeEach(() => {
    mockInjectedProvider()
  })

  it('logs in as normal', () => {
    cy.visit('/?cache=yes')

    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-button.confirm').click()

    cy.get('#connected').should('have.text', 'Yes')
  })

  describe('sample:dapp', () => {
    it('logs in with localStorage set to injected', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
          window.localStorage.setItem('RLOGIN_SELECTED_PROVIDER', rLoginCached)
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-button.confirm').click()

      cy.get('#connected').should('have.text', 'Yes')
    })

    it('attempts to login when legacy web3modal local storage is set', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"')
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })

    it('attempts to login in to a junk provider', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', 'tacos')
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })

    it('logs in with localStorage set to injected, and do not show set true', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
          window.localStorage.setItem('RLOGIN_SELECTED_PROVIDER', rLoginCached)
          window.localStorage.setItem('RLogin:DontShowAgain', 'true')
        }
      })

      cy.get('#login').click()
      cy.get('#connected').should('have.text', 'Yes')
    })

    it('provider throws an error when connecting', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
          window.ethereum.request = (_props) => Promise.reject(new Error('rejected'))
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })

    it('shows the change network prompt', () => {
      cy.visit('/?cache=yes', {
        onBeforeLoad: function (window) {
          const localProvider = new MockProvider({
            address,
            privateKey,
            networkVersion: 1000,
            debug: true
          })

          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
          window.localStorage.setItem('RLOGIN_SELECTED_PROVIDER', rLoginCached)
          window.ethereum = localProvider
        }
      })

      cy.get('#login').click()
      cy.get('h2.rlogin-header2').should('have.text', 'Select Network')
    })
  })

  describe('sample:permissioned', () => {
    it('logs in with injected', () => {
      cy.visit('/?cache=yes&backend=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
          window.localStorage.setItem('RLOGIN_SELECTED_PROVIDER', rLoginCached)
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Would you like to give us access to info in your data vault?')
    })

    it('resets with a junk provider', () => {
      cy.visit('/?cache=yes&backend=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"tacos"')
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })
  })
})
