import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    name: 'English',
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
  es: {
    name: 'Spanish',
    translation: {
      'Connecting to server': 'Conectandose al servidor',
      'Connect your wallet': 'Conecte su billetera',
      'No wallets found': 'No se ha encontrado ninguna billetera',
      'No wallet?': 'No tiene billetera?',
      'Get one here!': 'Descargue una aquí!',
      'Would you like to give us access to info in your data vault?': 'Nos daría acceso a la información requerida de su Data Vault?',
      'Get the information from your Data Vault that you want to share with the following service': 'Descargue la información que desea compartir con el servicio',
      'Access Data Vault': 'Acceda al Data Vault',
      'Connecting to the DataVault': 'Conectándose al Data Vault',
      'DataVault Error': 'Error en el Data Vault',
      'Select information to share': 'Seleccione la información que desea compartir',
      'Sharing your information is optional. It will only be shared with': 'Compartir su información es opcional. Sólo se compartira con',
      Confirm: 'Confirmar',
      'Use this Identity?': 'Usar esta identidad?',
      'Confirm Identity': 'Confirmar identidad',
      'Confirming Identity': 'Confirmando identidad'
    }
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
