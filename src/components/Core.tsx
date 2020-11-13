// eslint-disable-next-line
import * as React from 'react'
import axios from 'axios'
import { SimpleFunction, IProviderUserOptions } from 'web3modal'
import { ACCOUNTS_CHANGED, CHAIN_CHANGED, CONNECT_EVENT, ERROR_EVENT } from '../constants/events'
import { WalletProviders } from './step1'
import { ConfirmSelectiveDisclosure } from './step3'
import { RLOGIN_AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants'
import { Modal } from './modal'
import { ErrorMessage } from './shared/ErrorMessage'
import { getDID, getChainName } from '../adapters'

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
  sdr?: any // TBD
  sd?: any // TBD
  challenge?: number
  address?: string
  chainId?: number
  errorReason?: ErrorDetails
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

    const { providerController, onConnect, onError, onAccountsChange, onChainChange, backendUrl } = props

    providerController.on(CONNECT_EVENT, (provider: any) => {
      this.setState({ provider })

      Promise.all([
        this.providerRPC({ method: 'eth_accounts' }),
        this.providerRPC({ method: 'net_version' })
      ]).then(([accounts, netVersion]) => {
        const chainId = parseInt(netVersion as string)
        this.setState({ chainId })

        if (!this.validateCurrentChain()) return

        const address = provider.selectedAddress || (accounts as string[])[0]
        const did = getDID(chainId, address)

        this.setState({ provider, address })

        provider.on(ACCOUNTS_CHANGED, onAccountsChange)
        provider.on(CHAIN_CHANGED, (_chainId: number | string) => {
          const chainId = typeof _chainId === 'number' ? _chainId : parseInt(_chainId)
          this.setState({ chainId })

          onChainChange(chainId)

          this.validateCurrentChain()
        })

        // if no back end, decentralized flavor
        if (!backendUrl) {
          return onConnect(provider)
        } else {
          // request schema to back end
          axios.post(backendUrl + '/request_auth', { did }).then(({ data: { challenge, sdr } }) => {
            if (sdr) { // schema has selective disclosure request, permissioned app flavor
              this.setState({ sdr, currentStep: 'Step2' })
            } else { // open app flavor
              this.setState({ sdr: null, sd: null, currentStep: 'Step3', challenge })
            }
          })
        }
      })
    })

    providerController.on(ERROR_EVENT, (error: any) => onError(error))

    this.onConfirmAuth = this.onConfirmAuth.bind(this)
    this.setLightboxRef = this.setLightboxRef.bind(this)
  }

  public lightboxRef?: HTMLDivElement | null;
  public mainModalCard?: HTMLDivElement | null;

  public state: IModalState = {
    ...INITIAL_STATE
  };

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

  private providerRPC (args: {
    readonly method: string;
    readonly params?: readonly unknown[] | object;
  }): Promise<unknown> {
    const { provider } = this.state

    // ref: https://github.com/rsksmart/rLogin/pull/15#pullrequestreview-529574033
    if (provider.isNiftyWallet) return provider.send(args.method, args.params)
    return provider.request(args)
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

  private onConfirmAuth () {
    const { backendUrl, onConnect } = this.props
    const { provider, challenge, address } = this.state

    console.log(challenge!.toString(16))

    this.providerRPC({ method: 'personal_sign', params: [challenge!.toString(), address] })
      .then((response: any) => axios.post(backendUrl + '/auth', { response: response as string }))
      .then(({ data }: { data: string }) => localStorage.setItem(RLOGIN_AUTH_TOKEN_LOCAL_STORAGE_KEY, data))
      .then(() => onConnect(provider))
  }

  private setLightboxRef (c: HTMLDivElement | null) {
    this.lightboxRef = c
  }

  public render = () => {
    const { show, lightboxOffset, currentStep, sd, sdr, chainId, address, errorReason } = this.state

    const { onClose, userProviders } = this.props

    return <Modal
      lightboxOffset={lightboxOffset}
      show={show}
      onClose={onClose}
      setLightboxRef={this.setLightboxRef}
      mainModalCard={this.mainModalCard}
    >
      {currentStep === 'Step1' && <WalletProviders userProviders={userProviders} />}
      {currentStep === 'Step2' && <p>Access to Data Vault not supported yet<br />SDR: {sdr && sdr.toString()}</p>}
      {currentStep === 'Step3' && <ConfirmSelectiveDisclosure did={(chainId && address) ? getDID(chainId, address) : ''} sd={sd} onConfirm={this.onConfirmAuth} />}
      {currentStep === 'error' && <ErrorMessage title={errorReason?.title} description={errorReason?.description}/>}
    </Modal>
  }
}
