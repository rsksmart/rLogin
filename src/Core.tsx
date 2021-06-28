// eslint-disable-next-line
import * as React from 'react'
import { SimpleFunction, IProviderUserOptions } from 'web3modal'
import DataVault from '@rsksmart/ipfs-cpinner-client'

import { WalletProviders } from './ux/step1'
import { SelectiveDisclosure, SDR, SD } from './ux/step2'
import { ConfirmSelectiveDisclosure } from './ux/step3'
import WrongNetworkComponent from './ux/wrongNetwork/WrongNetworkComponent'

import { Modal } from './ui/modal'
import { ErrorMessage } from './ui/shared/ErrorMessage'

import { ACCOUNTS_CHANGED, CHAIN_CHANGED, CONNECT_EVENT, ERROR_EVENT } from './constants/events'
import { getDID, getChainId } from './adapters'
import { addEthereumChain, ethAccounts, ethChainId, isMetamask } from './lib/provider'
import { confirmAuth, requestSignup } from './lib/did-auth'
import { createDataVault } from './lib/data-vault'
import { fetchSelectiveDisclosureRequest } from './lib/sdr'
import { RLOGIN_ACCESS_TOKEN, RLOGIN_REFRESH_TOKEN, WALLETCONNECT } from './constants'
import { AddEthereumChainParameter } from './ux/wrongNetwork/changeNetwork'
import { AxiosError } from 'axios'
import { portisWrapper } from './lib/portisWrapper'
import Loading from './ui/shared/Loading'

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

export interface DataVaultOptions {
  [id: string]: {
    package: any
    options?: any
  }
}

interface IModalProps {
  userProviders: IProviderUserOptions[];
  onClose: SimpleFunction;
  showModal: SimpleFunction;
  resetState: SimpleFunction;
  providerController: any
  onConnect: (provider: any, disconnect: () => void, dataVault?: DataVault) => Promise<void>
  onError: (error: any) => Promise<void>
  onAccountsChange: (accounts: string[]) => void
  onChainChange: (chainId : string | number) => void
  backendUrl?: string
  hideModal?: boolean
  supportedChains?: number[]
  // dataVaultOptions?: DataVaultOptions
}

type Step = 'Step1' | 'Step2' | 'Step3' | 'error' | 'wrongNetwork' | 'loading'

interface ErrorDetails {
  title: string
  description?: string
}

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
  dataVault?: DataVault
  loadingReason?: string
}

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0,
  currentStep: 'Step1',
  loadingReason: ''
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
    this.connectToWallet = this.connectToWallet.bind(this)
  }

  public state: IModalState = {
    ...INITIAL_STATE
  };

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;

  public componentDidUpdate (prevProps: IModalProps, prevState: IModalState) {
    if (prevState.show && !this.state.show) {
      this.props.resetState()
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

  private validateCurrentChain () {
    const { supportedChains, showModal, hideModal, onError } = this.props
    const { chainId, provider } = this.state

    const isCurrentChainSupported = supportedChains && supportedChains.includes(chainId!)

    if (!isCurrentChainSupported) {
      provider.on(CHAIN_CHANGED, () => this.continueSettingUp(provider))

      if (hideModal) {
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

  /** Pre-Step 1 - user picked a wallet and waiting to connect */
  private connectToWallet () {
    this.setState({
      currentStep: 'loading',
      loadingReason: 'Connecting to provider'
    })
  }

  /** Step 1 confirmed - user picked a wallet provider */
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
    const { backendUrl, onConnect } = this.props
    const { provider, dataVault } = this.state

    if (!backendUrl) {
      return onConnect(provider, this.disconnect, dataVault)
    } else {
      this.setState({ loadingReason: 'Connecting to server' })
      // request schema to back end
      return requestSignup(backendUrl!, this.did()).then(({ challenge, sdr }) => {
        this.setState({
          challenge,
          sdr,
          sd: undefined,
          currentStep: sdr ? 'Step2' : 'Step3'
          // if response has selective disclosure request, permissioned app flavor. otherwise, open app flavor
        })
      })
    }
  }

  /** Step 2  */
  private async fetchSelectiveDisclosureRequest () {
    const { provider, address, sdr } = this.state
    const did = this.did()

    // TODO: this dependency should be taken as parameter
    // if (!dataVaultOptions) throw new Error('Invalid setup')
    const dataVault = await createDataVault(provider, did, address!)

    this.setState({ dataVault })

    return fetchSelectiveDisclosureRequest(sdr!, dataVault, did)
  }

  private onConfirmSelectiveDisclosure (sd: SD) {
    this.setState({ sd, currentStep: 'Step3' })
  }

  /** Step 3 */
  private onConfirmAuth () {
    const { backendUrl, onConnect } = this.props
    const { provider, dataVault, challenge, address, sd } = this.state

    const did = this.did()

    const handleConnect = (provider: any) => onConnect(provider, this.disconnect, dataVault)

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
      .catch((error: Error) =>
        this.setState({ currentStep: 'error', errorReason: { title: 'Authentication Error', description: error.message } })
      )
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

  public render = () => {
    const { show, lightboxOffset, currentStep, sd, sdr, chainId, address, errorReason, provider, loadingReason } = this.state
    const { onClose, userProviders, backendUrl, providerController, supportedChains } = this.props
    const did = this.did()

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

    return <Modal
      lightboxOffset={lightboxOffset}
      show={show}
      onClose={handleClose}
      setLightboxRef={this.setLightboxRef}
      mainModalCard={this.mainModalCard}
    >
      {currentStep === 'Step1' && <WalletProviders userProviders={userProviders} setLoading={this.connectToWallet} />}
      {currentStep === 'Step2' && <SelectiveDisclosure sdr={sdr!} backendUrl={backendUrl!} fetchSelectiveDisclosureRequest={this.fetchSelectiveDisclosureRequest} onConfirm={this.onConfirmSelectiveDisclosure} />}
      {currentStep === 'Step3' && <ConfirmSelectiveDisclosure did={(chainId && address) ? did : ''} sd={sd!} onConfirm={this.onConfirmAuth} />}
      {currentStep === 'error' && <ErrorMessage title={errorReason?.title} description={errorReason?.description}/>}
      {currentStep === 'wrongNetwork' && <WrongNetworkComponent supportedNetworks={supportedChains} isMetamask={isMetamask(provider)} changeNetwork={this.changeMetamaskNetwork} />}
      {currentStep === 'loading' && <Loading text={loadingReason} />}
    </Modal>
  }
}
