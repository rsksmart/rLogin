import { MockProvider } from '@rsksmart/mock-web3-provider'

const testHasNoAuthKeys = () => {
  cy.get('#access-token').should('be.empty')
  cy.get('#refresh-token').should('be.empty')
}

describe('permissioned e2e testing', () => {
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

  const requestAuth = () => {
    cy.visit('/?backend=yes')
    cy.get('#login').click()
    cy.contains('MetaMask').click()

    // rLogin makes 3 post requests to this URL, we will wait but not mock as they need to increment.
    cy.intercept('POST', 'https://did.rsk.co:4444/').as('didRsk')
    cy.wait('@didRsk')

    // mock response from the app
    cy.intercept('GET', 'http(.+)request-signup(.+)', { fixture: 'request-signup.json' }).as('requestSignup')
    cy.get('.rlogin-header2').should('have.text', 'Would you like to give us access to info in your data vault?')
    cy.contains('Access Data Vault').click()
    // mock response exchange to and from the Data Vault
    cy.intercept('GET', 'http(.+)request-auth(.+)', { fixture: 'request-auth.json' }).as('requestAuth')
    cy.intercept('GET', '**auth', { fixture: 'auth.json' }).as('auth')
  }

  it('Login into the datavault', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-email.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-name.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-header2').should('have.text', 'Select information to share')
    cy.get('label').eq(0).should('have.text', 'CI Testing').click()
    cy.get('label').eq(1).should('have.text', 'Email address: jesse@iovlabs.org (Verifiable Credential)').click()

    cy.contains('Confirm').click()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
    cy.get('.rlogin-list-description').eq(2).should('have.text', 'CI Testing')
    cy.get('.rlogin-list-description').eq(3).should('have.text', 'jesse@iovlabs.org')

    cy.get('.rlogin-button.confirm').click()
    cy.get('#connected').should('have.text', 'Yes')

    cy.get('#access-token').should('not.be.empty')
    cy.get('#refresh-token').should('not.be.empty')
  })

  it('Login into the datavault without Name (required by backend)', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-email.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-name.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-header2').should('have.text', 'Select information to share')
    cy.get('label').eq(1).should('have.text', 'Email address: jesse@iovlabs.org (Verifiable Credential)').click()

    cy.contains('Confirm').click()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('dd.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D')
    cy.get('dd.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
    cy.get('dd.rlogin-list-description').eq(2).should('have.text', 'jesse@iovlabs.org')
    cy.contains('Confirm').click()

    cy.get('.rlogin-header2').should('have.text', 'Authentication Error')
    cy.get('.rlogin-paragraph').eq(0).should('have.text', 'The Name is required.')

    cy.get('#connected').should('have.text', 'No')

    testHasNoAuthKeys()
  })

  it('Login into the datavault without Email (required by backend)', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-email.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-name.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-header2').should('have.text', 'Select information to share')
    cy.get('label').eq(0).should('have.text', 'CI Testing').click()

    cy.contains('Confirm').click()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('dd.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D')
    cy.get('dd.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
    cy.get('dd.rlogin-list-description').eq(2).should('have.text', 'CI Testing')

    cy.contains('Confirm').click()

    cy.get('.rlogin-header2').should('have.text', 'Authentication Error')
    cy.get('.rlogin-paragraph').eq(0).should('have.text', 'The Email is required.')

    cy.get('#connected').should('have.text', 'No')

    testHasNoAuthKeys()
  })

  it('Login into the datavault without Name and Email (required by backend)', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-email.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-name.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-header2').should('have.text', 'Select information to share')

    cy.contains('Confirm').click()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('dd.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D')
    cy.get('dd.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')

    cy.contains('Confirm').click()

    cy.get('.rlogin-header2').should('have.text', 'Authentication Error')
    cy.get('.rlogin-paragraph').eq(0).should('have.text', 'The Email is required.')

    cy.get('#connected').should('have.text', 'No')

    testHasNoAuthKeys()
  })

  it('No credential', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-email.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-no-response.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-button').should('have.text', 'Retry')

    testHasNoAuthKeys()
  })

  it('No claims', () => {
    cy.intercept('GET', '**/content/EmailVerifiableCredential', { fixture: 'content-no-response.json' }).as('emailCred')
    cy.intercept('GET', '**/content/DD_NAME', { fixture: 'content-no-response.json' }).as('name')

    requestAuth()

    // continue with the content
    cy.get('.rlogin-button').should('have.text', 'Retry')

    testHasNoAuthKeys()
  })

  it('shows connection window with cache provider set true', () => {
    cy.visit('/?backend=yes', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('RLOGIN_CACHED_PROVIDER', '"injected"')
        window.localStorage.setItem('RLogin:DontShowAgain', 'true')
      }
    })

    cy.get('#login').click()

    // rLogin makes 3 post requests to this URL, we will wait but not mock as they need to increment.
    cy.intercept('POST', 'https://did.rsk.co:4444/').as('didRsk')
    cy.wait('@didRsk')

    // mock response from the app
    cy.intercept('GET', 'http(.+)request-signup(.+)', { fixture: 'request-signup.json' }).as('requestSignup')

    // expect statement:
    cy.get('.rlogin-header2').should('have.text', 'Would you like to give us access to info in your data vault?')
  })
})
