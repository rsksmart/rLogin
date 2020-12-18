// eslint-disable-next-line
import * as React from 'react'
import axios from 'axios'
import { SimpleFunction, IProviderUserOptions } from 'web3modal'
import DataVault from '@rsksmart/ipfs-cpinner-client'
import { ACCOUNTS_CHANGED, CHAIN_CHANGED, CONNECT_EVENT, ERROR_EVENT } from './constants/events'
import { WalletProviders } from './ux/step1'
import { SelectiveDisclosure, SDR, SD, Data } from './ux/step2'
import { ConfirmSelectiveDisclosure } from './ux/step3'
import { RLOGIN_REFRESH_TOKEN, RLOGIN_ACCESS_TOKEN } from './constants'
import { Modal } from './ui/modal'
import { ErrorMessage } from './ui/shared/ErrorMessage'
import { getDID, getChainName, getChainId } from './adapters'
import { eth_accounts, eth_chainId } from './lib/provider'
import { requestSignup } from './lib/did-auth'
import { createDataVault } from './lib/data-vault'
import { fetchSelectiveDisclosureRequest } from './lib/sdr'

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
  resetState: SimpleFunction;
  providerController: any
  onConnect: (provider: any) => Promise<void>
  onError: (error: any) => Promise<void>
  onAccountsChange: (accounts: string[]) => void
  onChainChange: (chainId : string | number) => void
  backendUrl?: string
  supportedChains?: number[]
  // dataVaultOptions?: DataVaultOptions
}

type Step = 'Step1' | 'Step2' | 'Step3' | 'error'

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
  challenge?: number
  address?: string
  chainId?: number
  errorReason?: ErrorDetails
  dataVault?: DataVault
}

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0,
  currentStep: 'Step1'
}

export class Core extends React.Component<IModalProps, IModalState> {
  constructor (props: IModalProps) {
    super(props)
    window.updateWeb3Modal = async (state: IModalState) => this.setState(state)

    const { providerController, onError } = props

    providerController.on(CONNECT_EVENT, (provider: any) => {
      this.setupProvider(provider).then(() => this.detectFlavor())
    })

    providerController.on(ERROR_EVENT, (error: any) => onError(error))

    this.did = this.did.bind(this)
    this.setLightboxRef = this.setLightboxRef.bind(this)

    this.fetchSelectiveDisclosureRequest = this.fetchSelectiveDisclosureRequest.bind(this)
    this.onConfirmSelectiveDisclosure = this.onConfirmSelectiveDisclosure.bind(this)
    this.onConfirmAuth = this.onConfirmAuth.bind(this)
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
  private setChainId(rpcChainId: string) {
    const { onChainChange } = this.props
    const chainId = getChainId(rpcChainId)
    onChainChange(chainId)
    this.setState({ chainId })
    return this.validateCurrentChain()
  }


  private validateCurrentChain () {
    const { supportedChains } = this.props
    const { chainId, provider } = this.state

    const isCurrentChainSupported = supportedChains && supportedChains.includes(chainId!)

    if (!isCurrentChainSupported) {
      provider.on(CHAIN_CHANGED, () => this.setState({ currentStep: 'Step1' }))

      // this message can be improved
      this.setState({
        currentStep: 'error',
        errorReason: { title: 'Incorrect Network', description: `Please change your wallet's network to one of ${supportedChains!.map(getChainName).join()}` }
      })
    }

    return isCurrentChainSupported
  }

  /** Step 1 confirmed - user picked a wallet provider */
  private setupProvider(provider: any) {
    this.setState({ provider })

    const { onAccountsChange } = this.props

    return Promise.all([
      eth_accounts(provider),
      eth_chainId(provider)
    ]).then(([accounts, chainId]) => {
      if (!this.setChainId(chainId)) return

      const address = accounts[0]

      this.setState({ provider, address })

      const onChainIdChanged = (chainId: string) => this.setChainId(chainId)

      provider.on(ACCOUNTS_CHANGED, onAccountsChange)
      provider.on(CHAIN_CHANGED, onChainIdChanged)
    })
  }

  private detectFlavor() {
    const { backendUrl, onConnect } = this.props
    const { provider, address } = this.state

    if (!backendUrl) {
      return onConnect(provider)
    } else {
      // request schema to back end
      return requestSignup(backendUrl!, this.did(), address!, provider).then(({ challenge, sdr }) => {
        this.setState({
          challenge,
          sdr,
          sd: undefined,
          currentStep: sdr ? 'Step2' : 'Step3'
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
    const dataVault = createDataVault(provider, address!, did)

    return fetchSelectiveDisclosureRequest(sdr!, dataVault, did)
  }

  /** Step 2 */
  private onConfirmSelectiveDisclosure (sd: SD) {
    this.setState({ sd, currentStep: 'Step3' })
  }

  /** Step 3 */
  private onConfirmAuth () {
    const { backendUrl, onConnect } = this.props
    const { provider, challenge, address, sd } = this.state

    const did = this.did()

    provider.request({ method: 'personal_sign', params: [`Login to ${backendUrl}\nVerification code: ${challenge}`, address] })
      .then((sig: any) => axios.post(backendUrl + '/signup', { response: { sig, did, sd } }))
      .then(({ data }: { data: { refreshToken: string, accessToken: string } }) => {
        localStorage.setItem(RLOGIN_REFRESH_TOKEN, data.refreshToken)
        localStorage.setItem(RLOGIN_ACCESS_TOKEN, data.accessToken)
      })
      .then(() => onConnect(provider))
  }

  private setLightboxRef (c: HTMLDivElement | null) {
    this.lightboxRef = c
  }

  public render = () => {
    const { show, lightboxOffset, currentStep, sd, sdr, chainId, address, errorReason } = this.state
    const { onClose, userProviders, backendUrl } = this.props
    const did = this.did()

    return <Modal
      lightboxOffset={lightboxOffset}
      show={show}
      onClose={onClose}
      setLightboxRef={this.setLightboxRef}
      mainModalCard={this.mainModalCard}
    >
      {currentStep === 'Step1' && <WalletProviders userProviders={userProviders} />}
      {currentStep === 'Step2' && <SelectiveDisclosure sdr={sdr!} backendUrl={backendUrl!} fetchSelectiveDisclosureRequest={this.fetchSelectiveDisclosureRequest} onConfirm={this.onConfirmSelectiveDisclosure} />}
      {currentStep === 'Step3' && <ConfirmSelectiveDisclosure did={(chainId && address) ? did : ''} sd={sd!} onConfirm={this.onConfirmAuth} />}
      {currentStep === 'error' && <ErrorMessage title={errorReason?.title} description={errorReason?.description}/>}
    </Modal>
  }
}
