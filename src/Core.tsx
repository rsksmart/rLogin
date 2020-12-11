// eslint-disable-next-line
import * as React from 'react'
import axios from 'axios'
import { SimpleFunction, IProviderUserOptions } from 'web3modal'
import { ACCOUNTS_CHANGED, CHAIN_CHANGED, CONNECT_EVENT, ERROR_EVENT } from './constants/events'
import { WalletProviders } from './ux/step1'
import { SelectiveDisclosure } from './ux/step2'
import { ConfirmSelectiveDisclosure } from './ux/step3'
import { RLOGIN_REFRESH_TOKEN, RLOGIN_ACCESS_TOKEN } from './constants'
import { Modal } from './ui/modal'
import { ErrorMessage } from './ui/shared/ErrorMessage'
import { getDID, getChainName, getChainId } from './adapters'
import { verifyDidJwt } from './jwt'

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
        provider.request({ method: 'eth_accounts' }),
        provider.request({ method: 'eth_chainId' })
      ]).then(([accounts, _chainId]) => {
        const chainId = getChainId(_chainId)
        this.setState({ chainId })

        if (!this.validateCurrentChain()) return

        const address = (accounts as string[])[0]

        this.setState({ provider, address })

        provider.on(ACCOUNTS_CHANGED, onAccountsChange)
        provider.on(CHAIN_CHANGED, (_chainId: string) => {
          const chainId = getChainId(_chainId)

          this.setState({ chainId })

          onChainChange(chainId)

          this.validateCurrentChain()
        })

        // if no back end, decentralized flavor
        if (!backendUrl) {
          return onConnect(provider)
        } else {
          const did = getDID(chainId, address)
          // request schema to back end
          axios.get(backendUrl + `/request-signup/${did}`).then(({ data: { challenge, sdr } }) => {
            if (sdr) { // schema has selective disclosure request, permissioned app flavor
              verifyDidJwt(sdr).then(verifiedSdr => {
                this.setState({
                  sdr: {
                    credentials: verifiedSdr.payload.credentials,
                    claims: verifiedSdr.payload.claims
                  },
                  currentStep: 'Step2'
                })
              })
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
    const { provider, challenge, chainId, address } = this.state

    const did = getDID(chainId!, address!)

    provider.request({ method: 'personal_sign', params: [`Login to ${backendUrl}\nVerification code: ${challenge}`, address] })
      .then((sig: any) => axios.post(backendUrl + '/signup', { response: { sig, did } }))
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

    return <Modal
      lightboxOffset={lightboxOffset}
      show={show}
      onClose={onClose}
      setLightboxRef={this.setLightboxRef}
      mainModalCard={this.mainModalCard}
    >
      {currentStep === 'Step1' && <WalletProviders userProviders={userProviders} />}
      {currentStep === 'Step2' && <SelectiveDisclosure sdr={sdr} backendUrl={backendUrl!} />}
      {currentStep === 'Step3' && <ConfirmSelectiveDisclosure did={(chainId && address) ? getDID(chainId, address) : ''} sd={sd} onConfirm={this.onConfirmAuth} />}
      {currentStep === 'error' && <ErrorMessage title={errorReason?.title} description={errorReason?.description}/>}
    </Modal>
  }
}
