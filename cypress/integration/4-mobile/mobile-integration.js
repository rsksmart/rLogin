describe('rLoign modal interaction', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  xit('shows a QR code for WalletConnect', () => {
    cy.viewport(480, 750)
    cy.contains('WalletConnect').click()
    cy.get('wcm-modal')
  })
})
