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

  const loginWithModal = () => {
    cy.visit('/')
    cy.get('#login').click()
    cy.contains('MetaMask').click()
  }

  const confirmInformationStep = () => {
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-span2').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-span2').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-button').click()
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
    cy.get('.rlogin-span2').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-span2').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-button-secondary').click() // cancel button

    cy.get('#connected').should('have.text', 'No')
  })

  it('should not show confirm information again', () => {
    cy.clearLocalStorage('RLogin:DontShowAgain')

    loginWithModal()
    cy.get('.rlogin-header2').should('have.text', 'Information')
    cy.get('.rlogin-span2').eq(0).should('have.text', '0xB98b...Fd6D') // '0xb98bd7c7f656290071e52d1aa617d9cb4467fd6d'
    cy.get('.rlogin-span2').eq(1).should('have.text', 'RSK Testnet')

    cy.get('.rlogin-checkbox').check({ force: true }) // don't show again
    cy.get('.rlogin-button').click() // confirm

    cy.get('#connected').should('have.text', 'Yes')
    cy.get('#reset').click()

    cy.get('#connected').should('have.text', '')

    loginWithModal()

    cy.get('#connected').should('have.text', 'Yes')

    cy.clearLocalStorage('RLogin:DontShowAgain')
  })

  it('signs data', () => {
    loginWithModal()
    confirmInformationStep()

    // sign data:
    cy.get('button#sign').click()
    cy.get('#signature').should('have.text', '0x9c400f310a6af3ab983f717a74476f552321a54e4da6f423140588c9b432ea7a5ef6c662ef02ba16cbb58f41192656851fa880324354a8a88dd49df10dfe40bb1c')
  })
})
