describe('rLoign modal interaction', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('login with rLogin').click()
  })

  it('selects spanish and emits event', () => {
    cy.window().then((win) => {
      win.rLogin.on('languageChanged', (languageSelected) => {
        // eslint-disable-next-line jest/valid-expect
        expect(languageSelected).to.eq('es')
      })
      cy.get('select').select('es')
    })
  })

  it('selects english and emits event', () => {
    cy.window().then((win) => {
      win.rLogin.on('languageChanged', (languageSelected) => {
        // eslint-disable-next-line jest/valid-expect
        expect(languageSelected).to.eq('en')
      })
      cy.get('select').select('en')
    })
  })
})
