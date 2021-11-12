import currentProvider from '@rsksmart/mock-web3-provider'

describe('sample:dapp testing, no backend', () => {
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
    })
  })

  it('logs in as normal', () => {
    cy.visit('/cacheProvider')
    cy.get('#cachedProvider').should('have.text', '')

    cy.get('#login').click()
    cy.contains('MetaMask').click()
    cy.get('.rlogin-button.confirm').click()

    cy.get('#connected').should('have.text', 'Yes')
  })

  describe('sample:dapp', () => {
    it('logs in with localStorage set to injected', () => {
      cy.visit('/cacheProvider', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"')
        }
      })

      cy.get('#cachedProvider').should('have.text', '"injected"')

      cy.get('#login').click()
      cy.get('.rlogin-button.confirm').click()

      cy.get('#connected').should('have.text', 'Yes')
    })

    it('attempts to login in to a junk provider', () => {
      cy.visit('/cacheProvider', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', 'tacos')
        }
      })

      cy.get('#cachedProvider').should('have.text', 'tacos')

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })

    it('logs in with localStorage set to injected, and do not show set true', () => {
      cy.visit('/cacheProvider', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"')
          window.localStorage.setItem('RLogin:DontShowAgain', 'true')
        }
      })

      cy.get('#cachedProvider').should('have.text', '"injected"')
      cy.get('#login').click()
      cy.get('#connected').should('have.text', 'Yes')
    })

    it('provider throws an error when connecting', () => {
      cy.visit('/cacheProvider', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"')
          window.ethereum.request = (_props) => Promise.reject(new Error('rejected'))
        }
      })

      cy.get('#cachedProvider').should('have.text', '"injected"')
      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })
  })

  describe('sample:permissioned', () => {
    it('logs in with injected', () => {
      cy.visit('/cacheProvider?backend=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"injected"')
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Would you like to give us access to info in your data vault?')
    })

    it('resets with a junk provider', () => {
      cy.visit('/cacheProvider?backend=yes', {
        onBeforeLoad: function (window) {
          window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', '"tacos"')
        }
      })

      cy.get('#login').click()
      cy.get('.rlogin-header2').should('have.text', 'Connect your wallet')
    })
  })
})
