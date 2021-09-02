describe('rLoign modal interaction', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  it('default theme light', () => {
    cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })

  it('change to dark theme should change color and event', () => {
    cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(255, 255, 255)')
    cy.window().then((win) => {
      win.rLogin.on('themeChanged', (theme) => {
        // eslint-disable-next-line jest/valid-expect
        expect(theme).to.eq('dark')
      })

      cy.get('#theme-switcher').click()
      cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(0, 0, 0)')
    })
  })

  it('change to dark theme and go back to light', () => {
    cy.get('#theme-switcher').click().click()
    cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(255, 255, 255)')
  })
})
