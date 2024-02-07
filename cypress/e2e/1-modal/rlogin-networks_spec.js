import { mockInjectedProvider } from '../account'
import { chainList } from '../../../src/chianList_test'

describe('supported chain names', () => {
  chainList.forEach(([chainId, expectedName]) => {
    it(`connects to chain ${chainId} and displays ${expectedName}`, () => {
      mockInjectedProvider({ networkVersion: chainId })

      cy.visit('/')
      cy.get('#login').click()
      cy.contains('MetaMask').click()

      cy.get('.rlogin-list-network').eq(0).should('have.text', expectedName)
    })
  })
})