import { MockProvider } from '@rsksmart/mock-web3-provider'
import { privateKey, address } from '../account'
import { chainList } from '../../../src/chianList_test'

describe('supported chain names', () => {
  chainList.forEach(([chainId, expectedName]) => {
    it(`connects to chain ${chainId} and displays ${expectedName}`, () => {

      cy.on('window:before:load', (win) => {
        win.ethereum = new MockProvider({
          address,
          privateKey,
          networkVersion: chainId,
          debug: true
        })
        win.ethereum.isMetaMask = true
      })

      cy.visit('/')
      cy.get('#login').click()
      cy.contains('MetaMask').click()

      cy.get('.rlogin-list-network').eq(0).should('have.text', expectedName)
    })
  })
})