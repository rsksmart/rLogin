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
      'There is no credentials associated with this account.': 'There is no credentials associated with this account.',
      'Please configure your credentials in the RIF identity manager.': 'Please configure your credentials in the RIF identity manager.',
      'Go to RIF Identity Manager': 'Go to RIF Identity Manager',
      Retry: 'Retry',
      'Use this Identity?': 'Use this Identity?',
      'Confirm Identity': 'Confirm Identity',
      'Confirming Identity': 'Confirming Identity'
    }
  },
  es: {
    name: 'Spanish',
    translation: {
      'Connecting to server': 'Conectando al servidor',
      'Connect your wallet': 'Conecte su wallet',
      'No wallets found': 'No se encontraron wallets',
      'No wallet?': '¿No tiene wallet?',
      'Get one here!': '¡Consiga una aquí!',
      'Would you like to give us access to info in your data vault?': '¿Le gustaría darnos acceso a la información de su bóveda de datos?',
      'Get the information from your Data Vault that you want to share with the following service': 'Obtenga la información de su bóveda de datos que desea compartir con el siguiente servicio',
      'Access Data Vault': 'Acceder a la bóveda de datos',
      'Connecting to the DataVault': 'Conectándose con DataVault',
      'DataVault Error': 'Error de DataVault',
      'Select information to share': 'Seleccionar información para compartir',
      'Sharing your information is optional. It will only be shared with': 'Compartir su información es opcional. Solo se compartirá con',
      Confirm: 'Confirmar',
      'There is no credentials associated with this account.': 'No se encontraron credenciales asociadas a esta cuenta.',
      'Please configure your credentials in the RIF identity manager.': 'Por favor, configure sus credenciales en RIF Identity Manager',
      'Go to RIF Identity Manager': 'Ir a RIF Identity Manager',
      Retry: 'Retry',
      'Use this Identity?': '¿Usar esta identidad?',
      'Confirm Identity': 'Confirmar identidad',
      'Confirming Identity': 'Confirmando identidad'
    }
  },
  ja: {
    name: 'Japanese',
    translation: {
      'Connecting to server': 'サーバーに接続しています',
      'Connect your wallet': 'ウォレットを接続',
      'No wallets found': 'ウォレットが見つかりません',
      'No wallet?': 'ウォレットがありませんか？',
      'Get one here!': 'ここでウォレットを取得',
      'Would you like to give us access to info in your data vault?': 'あなたのData Vault情報へのアクセス権を当社に付与していただけますか？',
      'Get the information from your Data Vault that you want to share with the following service': '以下のサービスと共有したいData Vaultから情報を入手してください',
      'Access Data Vault': 'Data Vaultにアクセス',
      'Connecting to the DataVault': 'DataVaultに接続しています',
      'DataVault Error': 'DataVaultエラー',
      'Select information to share': '共有する情報を選択',
      'Sharing your information is optional. It will only be shared with': '情報の共有は任意です。情報は以下のみと共有されます:',
      Confirm: '確認',
      'There is no credentials associated with this account.': 'このアカウントに関連付けられている資格情報はありません。',
      'Please configure your credentials in the RIF identity manager.': 'RIFIDマネージャーでクレデンシャルを構成してください。',
      'Go to RIF Identity Manager': 'RIF IdentityManagerに移動します',
      Retry: 'リトライ',
      'Use this Identity?': 'このIdentityを使用しますか？',
      'Confirm Identity': 'Identityを確認',
      'Confirming Identity': 'Identityを確認しています'
    }
  },
  ko: {
    name: 'Korean',
    translation: {
      'Connecting to server': '서버 연결 중',
      'Connect your wallet': '월렛 연결하기',
      'No wallets found': '월렛을 찾을 수 없음',
      'No wallet?': '월렛이 없으신가요?',
      'Get one here!': '여기서 만드세요!',
      'Would you like to give us access to info in your data vault?': '본 서비스의 데이터 볼트의 정보 이용을 허가하시겠습니까?',
      'Get the information from your Data Vault that you want to share with the following service': '다음 서비스와 공유하고 싶은 데이터 볼트 내 정보를 불러옵니다',
      'Access Data Vault': 'Data Vault 이용하기',
      'Connecting to the DataVault': 'DataVault 연결 중',
      'DataVault Error': 'DataVault 오류',
      'Select information to share': '공유할 정보 선택',
      'Sharing your information is optional. It will only be shared with': '정보 공유는 선택 사항입니다. 해당 정보는 다음 대상과만 공유됩니다.',
      Confirm: '확인',
      'There is no credentials associated with this account.': '이 계정과 연결된 자격 증명이 없습니다.',
      'Please configure your credentials in the RIF identity manager.': 'RIF ID 관리자에서 자격 증명을 구성하십시오.',
      'Go to RIF Identity Manager': 'RIF ID 관리자로 이동',
      Retry: '다시 해 보다',
      'Use this Identity?': '이 신원을 사용할까요?',
      'Confirm Identity': '신원 확인',
      'Confirming Identity': '신원 확인 중'
    }
  },
  pt: {
    name: 'Portuguese',
    translation: {
      'Connecting to server': 'Connecting to server',
      'Connect your wallet': 'Conectar a sua carteira',
      'No wallets found': 'Nenhuma carteira encontrada',
      'No wallet?': 'Nenhuma carteira?',
      'Get one here!': 'Obtenha uma aqui!',
      'Would you like to give us access to info in your data vault?': 'Você gostaria de nos dar acesso às informações em seu cofre de dados?',
      'Get the information from your Data Vault that you want to share with the following service': 'Obtenha as informações de seu Repositório de Dados que deseja compartilhar com o seguinte serviço',
      'Access Data Vault': 'Acesse o Repositório de Dados',
      'Connecting to the DataVault': 'Conectando ao Repositório de Dados',
      'DataVault Error': 'Erro no Repositório de Dados',
      'Select information to share': 'Selecione a informação a ser compartilhada',
      'Sharing your information is optional. It will only be shared with': 'O compartilhamento das suas informações é opcional. Serão compartilhadas apenas com',
      Confirm: 'Confirmar',
      'There is no credentials associated with this account.': 'Não há credenciais associadas a esta conta.',
      'Please configure your credentials in the RIF identity manager.': 'Configure suas credenciais no gerenciador de identidade RIF.',
      'Go to RIF Identity Manager': 'Vá para RIF Identity Manager',
      Retry: 'tentar novamente',
      'Use this Identity?': 'Usar esta Identidade?',
      'Confirm Identity': 'Confirmar Identidade',
      'Confirming Identity': 'Confirmando Identidade'
    }
  },
  ru: {
    name: 'Russian',
    translation: {
      'Connecting to server': 'Подключение к серверу',
      'Connect your wallet': 'Подключите свой кошелек',
      'No wallets found': 'Кошельки не найдены',
      'No wallet?': 'Нет кошелька?',
      'Get one here!': 'Получите здесь!',
      'Would you like to give us access to info in your data vault?': 'Хотите предоставить нам доступ к информации в вашем хранилище данных?',
      'Get the information from your Data Vault that you want to share with the following service': 'Укажите информацию из своего хранилища данных, которой вы хотите поделиться со следующей службой',
      'Access Data Vault': 'Доступ к хранилищу данных',
      'Connecting to the DataVault': 'Подключение к DataVault',
      'DataVault Error': 'Ошибка DataVault',
      'Select information to share': 'Выберите информацию, которой хотите поделиться',
      'Sharing your information is optional. It will only be shared with': 'Общий доступ к информации не является обязательным. Общий доступ только для',
      Confirm: 'Подтвердить',
      'There is no credentials associated with this account.': 'С этой учетной записью не связаны никакие учетные данные.',
      'Please configure your credentials in the RIF identity manager.': 'Настройте свои учетные данные в диспетчере идентификации RIF.',
      'Go to RIF Identity Manager': 'Перейти в RIF Identity Manager',
      Retry: 'повторить попытку',
      'Use this Identity?': 'Использовать данные этой личности?',
      'Confirm Identity': 'Подтвердить личность',
      'Confirming Identity': 'Подтверждение личности'
    }
  },
  zh: {
    name: 'Chinese',
    translation: {
      'Connecting to server': '连接到服务器',
      'Connect your wallet': '连接您的钱包',
      'No wallets found': '未找到钱包',
      'No wallet?': '没有钱包？',
      'Get one here!': '在这里获得一个！',
      'Would you like to give us access to info in your data vault?': '您是否愿意让我们访问您数据保险库中的信息？',
      'Get the information from your Data Vault that you want to share with the following service': '从您的数据保险库中获取您想与以下服务共享的信息',
      'Access Data Vault': '访问数据保险库',
      'Connecting to the DataVault': '连接到数据保险库',
      'DataVault Error': '数据保险库错误',
      'Select information to share': '选择要共享的信息',
      'Sharing your information is optional. It will only be shared with': '分享您的信息是可选项。仅与',
      Confirm: '确认',
      'There is no credentials associated with this account.': '没有与此帐户关联的凭据。',
      'Please configure your credentials in the RIF identity manager.': '请在 RIF 身份管理器中配置您的凭据。',
      'Go to RIF Identity Manager': '转到 RIF 身份管理器',
      Retry: '重试',
      'Use this Identity?': '使用此身份？',
      'Confirm Identity': '确认身份',
      'Confirming Identity': '正在确认身份'
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
