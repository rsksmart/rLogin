import { mockInjectedProvider } from "../account"

const openRLogin = () => cy.contains('login with rLogin').click()

const switchTheme = () => cy.get('#theme-switcher').click()

const testIsLight = () => cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(255, 255, 255)')
const testIsDark = () => cy.get('.rlogin-modal-card').should('have.css', 'background-color', 'rgb(0, 0, 0)')

describe('rLoign modal interaction', () => {
  beforeEach(() => {
    mockInjectedProvider()
  })

  describe('default light', () => {
    beforeEach(() => {
      cy.visit('/')
      openRLogin()
    })

    it('default theme light', () => {
      testIsLight()
    })

    it('change to dark theme should change color and event', () => {
      cy.window().then((win) => {
        win.rLogin.on('themeChanged', (theme) => {
          // eslint-disable-next-line jest/valid-expect
          expect(theme).to.eq('dark')
        })

        switchTheme()
        testIsDark()
      })
    })

    it('change to dark theme and go back to light', () => {
      switchTheme()
      switchTheme()
      testIsLight()
    })
  })

  describe('default dark', () => {
    beforeEach(() => {
      cy.visit('/?defaultTheme=dark')
      openRLogin()
    })

    it('is initially dark', () => {
      testIsDark()
    })

    it('changes to light and emits event', () => {
      cy.window().then((win) => {
        win.rLogin.on('themeChanged', (theme) => {

          expect(theme).to.eq('light')
        })

        switchTheme()
        testIsLight()
      })
    })

    it('goes back to dark and emits event', () => {
      let count = 0
      cy.window().then((win) => {
        win.rLogin.on('themeChanged', (theme) => {
          count++

          if (count == 2) expect(theme).to.eq('dark')
        })

        switchTheme()
        switchTheme()
        testIsDark()
      })
    })

    it('shows confirm info in dark', () => {
      cy.contains('MetaMask').click()
      cy.get('.rlogin-header2').should('have.text', 'Successfully connected')
      testIsDark()
    })

    it('shows wallet info in dark', () => {
      cy.contains('MetaMask').click()
      cy.get('.rlogin-button.confirm').click()
      cy.get('#showInfo').click()
      testIsDark()
    })


    it('shows wallet info in light after switching', () => {
      switchTheme()
      cy.contains('MetaMask').click()
      cy.get('.rlogin-button.confirm').click()
      cy.get('#showInfo').click()
      testIsLight()
    })
  })
})
