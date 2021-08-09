import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'Connecting to server': 'Connecting to server',
      'Connect your wallet': 'Connect your wallet',
      'No wallets found': 'No wallets found',
      'No wallet?': 'No wallet?',
      'Get one here!': 'Get one here!',
      'Would you like to give us access to info in your data vault?': 'Would you like to give us access to info in your data vault?',
      'Get the information from your Data Vault that you want to share with the following service': 'Get the information from your Data Vault that you want to share with the following service',
      'Access Data Vault': 'Access Data Vault',
      'Connecting to the DataVault': 'Connecting to the DataVault',
      'DataVault Error': 'DataVault Error',
      'Select information to share': 'Select information to share',
      'Sharing your information is optional. It will only be shared with': 'Sharing your information is optional. It will only be shared with',
      Confirm: 'Confirm',
      'Use this Identity?': 'Use this Identity?',
      'Confirm Identity': 'Confirm Identity',
      'Confirming Identity': 'Confirming Identity'
    }
  },
  fr: {
    translation: {
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
