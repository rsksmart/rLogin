import { MockProvider } from '@rsksmart/mock-web3-provider'

describe('sample:dapp testing, no backend', () => {
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
  }

  const confirmInformationStep = () => {
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-button.confirm').click()
  }

  it('logs in with the modal and is connected', () => {
    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#accounts').should('have.text', address)
    cy.get('#chain-id').should('have.text', '31')
  })

  it('should not be connected after cancel info step', () => {
    loginWithModal()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-button.cancel').click() // cancel button

    cy.get('#connected').should('have.text', 'No')
  })

  it('should not show confirm information again', () => {
    cy.clearLocalStorage('RLogin:DontShowAgain')

    loginWithModal()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-checkbox').check({ force: true }) // don't show again
    cy.get('.rlogin-button.confirm').click() // confirm

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#reset').click()

    cy.get('#connected').should('have.text', '')

    loginWithModal()

    cy.get('#connected').should('have.text', 'Yes')

    cy.clearLocalStorage('RLogin:DontShowAgain')
  })

  it('should show confirm information again if don`t show again is not checked', () => {
    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#reset').click()

    cy.get('#connected').should('have.text', '')

    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
  })

  it('signs data', () => {
    loginWithModal()
    confirmInformationStep()

    // sign data:
    cy.get('button#sign').click()
    cy.get('#signature').should('have.text', '0x9c400f310a6af3ab983f717a74476f552321a54e4da6f423140588c9b432ea7a5ef6c662ef02ba16cbb58f41192656851fa880324354a8a88dd49df10dfe40bb1c')
  })

  it('should open wallet info modal', () => {
    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#showInfo').click()

    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-list-description').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-list-description').eq(1).should('have.text', 'RSK Testnet')
  })

  it('should open wallet info modal after reconnect', () => {
    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
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

  it('should stay connected after reload (cacheProvider)', () => {
    loginWithModal(true)
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')

    cy.reload()

    cy.get('#connected').should('have.text', 'No')

    cy.get('#login').click()
    cy.get('.rlogin-button.confirm').click()

    cy.get('#connected').should('have.text', 'Yes')
  })

  it('should store the selected provider only if cachedProvider is set to true', () => {
    loginWithModal(false)
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')

    // eslint-disable-next-line
    expect(localStorage.getItem('RLOGIN_SELECTED_PROVIDER')).to.be.null

    cy.reload()

    cy.get('#connected').should('have.text', 'No')

    loginWithModal(false)
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
  })

  it('should NOT stay connected after a disconnect (cacheProvider)', () => {
    loginWithModal(true)
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')

    cy.get('#reset').click()

    cy.get('#connected').should('have.text', '')

    loginWithModal(true)
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
  })

  it('should open change network modal', () => {
    loginWithModal()
    confirmInformationStep()

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#changeNetwork').click()

    cy.get('.rlogin-header2').should('have.text', 'Choose Network')
  })
})
