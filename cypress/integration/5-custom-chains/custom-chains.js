import { mockInjectedProvider } from '../account'
import rootstockChains from '../../../sample/front/custom-chains/rootstock-chains'

describe('connect to a custom network', () => {
  rootstockChains.forEach(chain => {
    it(`Connects to chain ${chain.chainName}`, () => {
      mockInjectedProvider({ networkVersion: parseInt(chain.chainId, 16) })

      cy.visit('/custom-chains')
      cy.get('#login-button').click()
      cy.contains('MetaMask').click()
      cy.get('.rlogin-list-network').eq(0).should('have.text', chain.chainName)
    })
  })
})
