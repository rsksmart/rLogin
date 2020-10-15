// eslint-disable-next-line
import * as React from 'react'
import axios from 'axios'
import { SimpleFunction, IProviderUserOptions, ThemeColors, CONNECT_EVENT, ERROR_EVENT } from 'web3modal'
import { WalletProviders } from './step1'
import { ConfirmSelectiveDisclosure } from './step3'
import { Web3Provider } from '@ethersproject/providers'
import { RLOGIN_AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants'
import { Modal } from './modal'

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
  themeColors: ThemeColors;
  userOptions: IProviderUserOptions[];
  onClose: SimpleFunction;
  resetState: SimpleFunction;
  lightboxOpacity: number;
  providerController: any
  onConnect: (provider: any) => Promise<void>
  onError: (error: any) => Promise<void>
  backendUrl?: string
}

type Step = 'Step1' | 'Step2' | 'Step3'

interface IModalState {
  show: boolean
  currentStep: Step
  lightboxOffset: number
  provider?: any
  sdr?: any // TBD
  sd?: any // TBD
  challenge?: number
  did?: string
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

    const { providerController, onConnect, onError, backendUrl } = props

    providerController.on(CONNECT_EVENT, (provider: any) => {
      const did = 'did:ethr:rsk:' + provider.selectedAddress.toLowerCase()

      this.setState({ provider, did })

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

  private onConfirmAuth () {
    const { backendUrl, onConnect } = this.props
    const { provider, challenge } = this.state

    new Web3Provider(provider).getSigner().signMessage(challenge!.toString())
      .then(response => axios.post(backendUrl + '/auth', { response }))
      .then(({ data }) => localStorage.setItem(RLOGIN_AUTH_TOKEN_LOCAL_STORAGE_KEY, data))
      .then(() => onConnect(provider))
  }

  private setLightboxRef (c: HTMLDivElement | null) {
    this.lightboxRef = c
  }

  public render = () => {
    const { show, lightboxOffset, currentStep, sd, did } = this.state

    const { onClose, userOptions, lightboxOpacity, themeColors } = this.props

    return <Modal
      lightboxOffset={lightboxOffset}
      lightboxOpacity={lightboxOpacity}
      show={show}
      onClose={onClose}
      setLightboxRef={this.setLightboxRef}
      themeColors={themeColors}
      userOptions={userOptions}
      mainModalCard={this.mainModalCard}
    >
      {currentStep === 'Step1' && <WalletProviders themeColors={themeColors} userOptions={userOptions} />}
      {currentStep === 'Step2' && <p>Access to Data Vault not supported yet</p>}
      {currentStep === 'Step3' && <ConfirmSelectiveDisclosure did={did!} sd={sd} onConfirm={this.onConfirmAuth} />}
    </Modal>
  }
}
