import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      'Connecting to server': 'Connecting to server T',
      'Connect your wallet': 'Connect your wallet T',
      'No wallets found': 'No wallets found T',
      'No wallet?': 'No wallet? T',
      'Get one here!': 'Get one here! T',
      'Would you like to give us access to info in your data vault?': 'Would you like to give us access to info in your data vault? T',
      'Get the information from your Data Vault that you want to share with the following service': 'Get the information from your Data Vault that you want to share with the following service T',
      'Access Data Vault': 'Access Data Vault T',
      'Connecting to the DataVault': 'Connecting to the DataVault T',
      'DataVault Error': 'DataVault Error T'
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
