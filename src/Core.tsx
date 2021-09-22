import * as React from 'react'
import { SimpleFunction, IProviderUserOptions } from 'web3modal'
import { IIPFSCpinnerClient as IDataVault, IAuthManagerNewable, IWeb3ProviderEncryptionManager } from '@rsksmart/ipfs-cpinner-client-types'

import { WalletProviders } from './ux/step1'
import { SelectiveDisclosure, SDR, SD } from './ux/step2'
import WrongNetworkComponent from './ux/wrongNetwork/WrongNetworkComponent'

import { Modal } from './ui/modal'
import { ErrorMessage } from './ui/shared/ErrorMessage'

import { ACCOUNTS_CHANGED, CHAIN_CHANGED, CONNECT_EVENT, ERROR_EVENT } from './constants/events'
import { getDID, getChainId } from './adapters'
import { addEthereumChain, ethAccounts, ethChainId, isMetamask } from './lib/provider'
import { confirmAuth, requestSignup } from './lib/did-auth'
import { createDataVault } from './lib/data-vault'
import { fetchSelectiveDisclosureRequest } from './lib/sdr'
import { DONT_SHOW_TUTORIAL_AGAIN_KEY, RLOGIN_ACCESS_TOKEN, RLOGIN_REFRESH_TOKEN, WALLETCONNECT } from './constants'
import { AddEthereumChainParameter } from './ux/wrongNetwork/changeNetwork'
import { AxiosError } from 'axios'
import { portisWrapper } from './lib/portisWrapper'
import Loading from './ui/shared/Loading'
import i18next from 'i18next'
import i18n from './i18n'
import { ThemeProvider } from 'styled-components'
import { ThemeType, themesOptions } from './theme'
import { ConfirmInformation } from './ux/confirmInformation/ConfirmInformation'
import ChooseNetworkComponent from './ux/chooseNetwork/ChooseNetworkComponent'
import TutorialComponent from './ux/tutorial/TutorialComponent'

// copy-pasted and adapted
// https://github.com/Web3Modal/web3modal/blob/4b31a6bdf5a4f81bf20de38c45c67576c3249bfc/src/components/Modal.tsx

// eslint-disable-next-line
declare global {
  // eslint-disable-next-line
  interface Window {
    ethereum: any;
    web3: any;
    updateWeb3Modal: any;
  }
}

export interface DataVaultPackage {
  default: IDataVault;
  AuthManager: IAuthManagerNewable;
  AsymmetricEncryptionManager:IWeb3ProviderEncryptionManager;
  SignerEncryptionManager:IWeb3ProviderEncryptionManager;
}

export interface DataVaultOptions {
  package: DataVaultPackage;
  serviceUrl: string;
}

interface IModalProps {
  userProviders: IProviderUserOptions[];
  onClose: SimpleFunction;
  showModal: SimpleFunction;
  resetState: SimpleFunction;
  providerController: any
  onConnect: (provider: any, disconnect: () => void, selectedLanguage:string, selectedTheme:themesOptions, dataVault?: IDataVault) => Promise<void>
  onError: (error: any) => Promise<void>
  onAccountsChange: (accounts: string[]) => void
  onChainChange: (chainId : string | number) => void
  onLanguageChanged: (language: string) => void
  onThemeChanged: (theme: themesOptions) => void
  backendUrl?: string
  keepModalHidden?: boolean
  supportedChains?: number[]
  supportedLanguages?: string[]
  dataVaultOptions?: DataVaultOptions
  // eslint-disable-next-line no-unused-vars
  themes: { [K in themesOptions]: ThemeType }
  defaultTheme: themesOptions
  rpcUrls?: {[key: string]: string}
}

type Step = 'Step1' | 'Step2' | 'ConfirmInformation' | 'error' | 'wrongNetwork' | 'chooseNetwork' | 'loading' | 'tutorial'

interface ErrorDetails {
  title: string
  description?: string
}

interface IAvailableLanguage {
  code: string
  name: string
}

type NetworkConnectionConfig = { chainId: number, rpcUrl: string }

interface IModalState {
  show: boolean
  currentStep: Step
  lightboxOffset: number
  provider?: any
  sdr?: SDR
  sd?: SD
  challenge?: string
  address?: string
  chainId?: number
  errorReason?: ErrorDetails
  dataVault?: IDataVault
  loadingReason?: string
  currentTheme?: themesOptions
  selectedProviderUserOption?: IProviderUserOptions
  chosenNetwork?: NetworkConnectionConfig
}

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0,
  currentStep: 'Step1',
  loadingReason: ''
}

/**
 * IProviderUserOptions with added onClick variable
 */
interface RLoginIProviderUserOptions {
  name: string;
  logo: string;
  description: string;
  onClick: (optionalOpts?: { chainId: number, rpcUrl: string }) => Promise<void>; // adds optional options
}

export class Core extends React.Component<IModalProps, IModalState> {
  constructor (props: IModalProps) {
    super(props)

    window.updateWeb3Modal = async (state: IModalState) => this.setState(state)

    const { providerController, onError } = props

    providerController.on(CONNECT_EVENT, (provider: any) => this.continueSettingUp(provider))

    providerController.on(ERROR_EVENT, (error: any) => onError(error))

    this.did = this.did.bind(this)
    this.setLightboxRef = this.setLightboxRef.bind(this)
    this.changeMetamaskNetwork = this.changeMetamaskNetwork.bind(this)
    this.continueSettingUp = this.continueSettingUp.bind(this)
    this.fetchSelectiveDisclosureRequest = this.fetchSelectiveDisclosureRequest.bind(this)
    this.onConfirmSelectiveDisclosure = this.onConfirmSelectiveDisclosure.bind(this)
    this.onConfirmAuth = this.onConfirmAuth.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.preConnectChecklist = this.preConnectChecklist.bind(this)
    this.connectToWallet = this.connectToWallet.bind(this)

    this.availableLanguages = []
    this.setupLanguages()
  }

  public state: IModalState = {
    ...INITIAL_STATE
  };

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;
  private availableLanguages: IAvailableLanguage[];

  get selectedTheme ():themesOptions {
    return this.state.currentTheme || this.props.defaultTheme
  }

  get selectedLanguageCode () {
    return i18n.language
  }

  public componentDidUpdate (prevProps: IModalProps, prevState: IModalState) {
    // this resets the state if an unhandled error closed the modal

    if (this.state.currentStep === 'loading' &&
      !prevState.show && this.state.show
    ) {
      this.disconnectProvider()
      this.setState({ currentStep: 'Step1' })
    }
    if (this.lightboxRef) {
      const lightboxRect = this.lightboxRef.getBoundingClientRect()
      const lightboxOffset = lightboxRect.top > 0 ? lightboxRect.top : 0

      if (
        lightboxOffset !== INITIAL_STATE.lightboxOffset &&
        lightboxOffset !== this.state.lightboxOffset
      ) {
        this.setState({ lightboxOffset })
      }
    }
  }

  private setupLanguages () {
    // this fetches all available languages in this form [{en:english},...]
    this.availableLanguages = Object.entries(i18next.services.resourceStore.data).map(keyValueLanguage => { return { code: keyValueLanguage[0], name: keyValueLanguage[1].name.toString() } })
    if (this.props.supportedLanguages && this.props.supportedLanguages.length > 0) {
      this.availableLanguages = this.availableLanguages.filter(availableLanguage => this.props.supportedLanguages?.includes(availableLanguage.code))
    }
  }

  /** accounts related */
  private did () {
    return this.state.chainId && this.state.address ? getDID(this.state.chainId, this.state.address) : ''
  }

  /** chain id related */
  private setChainId (rpcChainId: string) {
    const { onChainChange } = this.props
    const chainId = getChainId(rpcChainId)
    onChainChange(chainId)
    this.setState({ chainId })
    return this.validateCurrentChain()
  }

  private continueSettingUp = (provider: any) => this.setupProvider(provider).then((success) => { if (success) { return this.detectFlavor() } })

  private validateCurrentChain ():boolean {
    const { supportedChains, showModal, keepModalHidden, onError } = this.props
    const { chainId, provider } = this.state

    if (!Array.isArray(supportedChains) || supportedChains.length === 0) return true

    const isCurrentChainSupported = supportedChains.includes(chainId!)
    if (!isCurrentChainSupported) {
      provider.on(CHAIN_CHANGED, () => this.continueSettingUp(provider))

      if (keepModalHidden) {
        onError(new Error('ChainId is not supported.'))
        return false
      }

      showModal()
      this.setState({ currentStep: 'wrongNetwork' })
    }

    return isCurrentChainSupported
  }

  private changeMetamaskNetwork (params: AddEthereumChainParameter) {
    const { provider } = this.state
    addEthereumChain(provider, params)
      .then(() => this.continueSettingUp(provider))
      // user cancelled the addition or switch, don't do anything:
      .catch()
  }

  /**
   * Before connecting to the provider, go through a checklist of items
   * Check if the provider supports multiple networks and if the user
   * should choose a network first.
   * @param provider The provider selected by the user to use
   */
  private preConnectChecklist = (provider: RLoginIProviderUserOptions) => {
    // temporarly set the provider to be used when the choose network component returns
    this.setState({ provider })

    // choose the network first:
    const { rpcUrls } = this.props
    if (['Ledger', 'Trezor', 'D\'Cent'].includes(provider.name) && rpcUrls) {
      return this.setState({ currentStep: 'chooseNetwork' })
    }

    this.connectToWallet(provider)
  }

  /** Pre-Step 1 - user picked a wallet, and network and waiting to connect */
  private connectToWallet (providerUserOption: RLoginIProviderUserOptions, networkoptions?: { chainId: number, rpcUrl: string }) {
    providerUserOption.onClick(networkoptions)

    this.setState({
      currentStep: 'loading',
      loadingReason: `Connecting to ${providerUserOption.name}`,
      selectedProviderUserOption: providerUserOption
    })
  }

  /** Step 1 Provider Answered
   * The provider has answered and is ready to go to the next step
   * or access the data vault.
   */
  private setupProvider (userProvider: any) {
    const provider = userProvider.isPortis ? portisWrapper(userProvider) : userProvider
    this.setState({ provider })

    const { onAccountsChange } = this.props

    return Promise.all([
      ethAccounts(provider),
      ethChainId(provider)
    ]).then(([accounts, chainId]) => {
      if (!this.setChainId(chainId)) return false

      const address = accounts[0]

      this.setState({ provider, address })

      const onChainIdChanged = (chainId: string) => this.setChainId(chainId)

      provider.on(ACCOUNTS_CHANGED, onAccountsChange)
      provider.on(CHAIN_CHANGED, onChainIdChanged)

      return true
    })
  }

  private detectFlavor () {
    const { backendUrl } = this.props

    if (!backendUrl) {
      this.setState({
        currentStep: 'ConfirmInformation'
      })
    } else {
      const loadingReason = i18next.t('Connecting to server')
      this.setState({ loadingReason })
      // request schema to back end
      return requestSignup(backendUrl!, this.did()).then(({ challenge, sdr }) => {
        this.setState({
          challenge,
          sdr,
          sd: undefined,
          currentStep: sdr ? 'Step2' : 'ConfirmInformation'
          // if response has selective disclosure request, permissioned app flavor. otherwise, open app flavor
        })
      })
    }
  }

  /** Step 2  */
  private async fetchSelectiveDisclosureRequest () {
    const { provider, address, sdr } = this.state
    const { dataVaultOptions } = this.props
    const did = this.did()

    if (!dataVaultOptions) throw new Error('Invalid setup')
    const dataVault = await createDataVault(dataVaultOptions!, provider, did, address!)

    this.setState({ dataVault })

    return fetchSelectiveDisclosureRequest(sdr!, dataVault, did)
  }

  private onConfirmSelectiveDisclosure (sd: SD) {
    this.setState({ sd, currentStep: 'ConfirmInformation' })
  }

  /** Step 3 */
  private onConfirmAuth () {
    const { backendUrl, onConnect } = this.props
    const { provider, dataVault, challenge, address, sd } = this.state
    const did = this.did()

    if (!backendUrl) {
      return onConnect(provider, this.disconnect, this.selectedLanguageCode, this.selectedTheme, dataVault)
    }

    const handleConnect = (provider: any) => onConnect(provider, this.disconnect, this.selectedLanguageCode, this.selectedTheme, dataVault)

    confirmAuth(provider, address!, backendUrl!, did, challenge!, handleConnect, sd)
      .catch((error: Error | AxiosError) => {
        // this error handling is added to help user when challenge expired. in that
        // case we ask for a new challenge and ask again the user to sign
        if ((error as AxiosError).response && (error as AxiosError).response?.data === 'INVALID_CHALLENGE_RESPONSE') {
          return requestSignup(backendUrl!, this.did()).then(({ challenge }) =>
            confirmAuth(provider, address!, backendUrl!, did, challenge!, handleConnect, sd)
          )
        }
        throw error
      })
      .catch((error: Error | AxiosError) => {
        const description = (error as AxiosError).response && (error as AxiosError).response?.data
        if (description) {
          this.setState({ currentStep: 'error', errorReason: { title: 'Authentication Error', description: decodeURI(description) } })
          return
        }

        this.setState({ currentStep: 'error', errorReason: { title: 'Authentication Error', description: error.message } })
      })
  }

  private setLightboxRef (c: HTMLDivElement | null) {
    this.lightboxRef = c
  }

  /**
   * Disconnect from WalletConnect or Portis if it is the selected provider, and connected
   * @param provider web3 Provider
   */
  private disconnectProvider (): void {
    const { provider } = this.state
    if (provider && provider.disconnect) {
      provider.disconnect()
      localStorage.removeItem(WALLETCONNECT)
    }
  }

  /**
   * Handle disconnect and cleanup state
   */
  public async disconnect (): Promise<void> {
    const { providerController } = this.props

    // WalletConnect and Portis Wrapper:
    this.disconnectProvider()

    localStorage.removeItem(RLOGIN_ACCESS_TOKEN)
    localStorage.removeItem(RLOGIN_REFRESH_TOKEN)
    localStorage.removeItem('WEB3_CONNECT_CACHED_PROVIDER')

    Object.keys(localStorage).map((key: string) => {
      if (key.startsWith('DV_ACCESS_TOKEN') || key.startsWith('DV_REFRESH_TOKEN')) {
        localStorage.removeItem(key)
      }
    })

    providerController.clearCachedProvider()
    this.setState(INITIAL_STATE)
  }

  public changeLanguage = (language: string) => {
    const { showModal, onLanguageChanged } = this.props

    i18n.changeLanguage(language)
    onLanguageChanged(language)
    showModal()
  }

  public changeTheme = (theme: themesOptions) => {
    const { showModal, onThemeChanged } = this.props
    this.setState({ currentTheme: theme })
    onThemeChanged(theme)
    showModal()
  }

  public render = () => {
    const { show, lightboxOffset, currentStep, sd, sdr, chainId, address, errorReason, provider, selectedProviderUserOption, loadingReason } = this.state
    const { onClose, userProviders, backendUrl, providerController, supportedChains, themes, rpcUrls } = this.props

    /**
     * handleClose is fired when the modal or providerModal is closed by the user
     */
    const handleClose = () => {
      // disconnect WalletConnect and Portis
      this.disconnectProvider()

      providerController.clearCachedProvider()
      onClose()

      // reset state
      this.setState(INITIAL_STATE)
    }

    return <ThemeProvider theme={ themes[this.selectedTheme] }>
      <Modal
        lightboxOffset={lightboxOffset}
        show={show}
        onClose={handleClose}
        setLightboxRef={this.setLightboxRef}
        mainModalCard={this.mainModalCard}
        big={currentStep === 'Step1'}
      >
        {currentStep === 'Step1' && <WalletProviders userProviders={userProviders} connectToWallet={this.preConnectChecklist} changeLanguage={this.changeLanguage} availableLanguages={this.availableLanguages} selectedLanguageCode={this.selectedLanguageCode} changeTheme={this.changeTheme} selectedTheme={this.selectedTheme} />}
        {currentStep === 'Step2' && <SelectiveDisclosure sdr={sdr!} backendUrl={backendUrl!} fetchSelectiveDisclosureRequest={this.fetchSelectiveDisclosureRequest} onConfirm={this.onConfirmSelectiveDisclosure} providerName={selectedProviderUserOption?.name} />}
        {currentStep === 'ConfirmInformation' && <ConfirmInformation chainId={chainId} address={address} provider={provider} providerUserOption={selectedProviderUserOption!} sd={sd} onConfirm={this.onConfirmAuth} onCancel={handleClose} providerName={selectedProviderUserOption?.name} />}
        {currentStep === 'error' && <ErrorMessage title={errorReason?.title} description={errorReason?.description}/>}
        {currentStep === 'wrongNetwork' && <WrongNetworkComponent supportedNetworks={supportedChains} isMetamask={isMetamask(provider)} changeNetwork={this.changeMetamaskNetwork} />}
        {currentStep === 'chooseNetwork' && <ChooseNetworkComponent rpcUrls={rpcUrls} chooseNetwork={({ chainId, rpcUrl }) => this.connectToWallet(provider, { rpcUrl, chainId })} />}
        {currentStep === 'tutorial' && <TutorialComponent providerName={provider.name} handleConnect={() => this.preConnectChecklist(provider)} />}
        {currentStep === 'loading' && <Loading text={loadingReason} />}
      </Modal>
    </ThemeProvider>
  }
}
