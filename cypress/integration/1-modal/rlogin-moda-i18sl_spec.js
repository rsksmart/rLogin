describe('rLoign modal interaction', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  it('selects spanish', () => {
    cy.get('select').select('es')
    cy.contains('Conecte su billetera')
  })

  it('selects english', () => {
    cy.get('select').select('en')
    cy.contains('Connect your wallet')
  })
  it('selects spanish, closes modal and remembers selection', () => {
    cy.get('select').select('es')
    cy.contains('Conecte su billetera')

    cy.get('.rlogin-modal-close-button').click()
    cy.get('.rlogin-modal-lightbox').should('be.not.visible')
    cy.contains('login with rLogin').click()
    cy.contains('Conecte su billetera')

    cy.get('select#languages option:selected').should('have.text', 'Spanish')
  })
})
