// eslint-disable-next-line
import * as React from 'react'
import styled from 'styled-components'

import {
  MODAL_LIGHTBOX_CLASSNAME,
  MODAL_CONTAINER_CLASSNAME,
  MODAL_HITBOX_CLASSNAME,
  SimpleFunction, IProviderUserOptions, ThemeColors,
  CONNECT_EVENT, ERROR_EVENT
} from 'web3modal'
import { WalletProviders } from './step1'
import { ConfirmSelectiveDisclosure } from './step3'

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

interface ILightboxStyleProps {
  show: boolean;
  offset: number;
  opacity?: number;
}

const SLightbox = styled.div<ILightboxStyleProps>`
  font-family: Rubik;
  transition: opacity 0.1s ease-in-out;
  text-align: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-left: -50vw;
  top: ${({ offset }) => (offset ? `-${offset}px` : 0)};
  left: 50%;
  z-index: 2;
  will-change: opacity;
  background-color: ${({ opacity }) => {
    let alpha = 0.4
    if (typeof opacity === 'number') {
      alpha = opacity
    }
    return `rgba(0, 0, 0, ${alpha})`
  }};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    box-sizing: border-box !important;
  }
`

interface IModalContainerStyleProps {
  show: boolean;
}

const SModalContainer = styled.div<IModalContainerStyleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`

const SHitbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

interface IModalProps {
  themeColors: ThemeColors;
  userOptions: IProviderUserOptions[];
  onClose: SimpleFunction;
  resetState: SimpleFunction;
  lightboxOpacity: number;
  providerController: any
  onConnect: (provider: any) => Promise<void>
  onError: (error: any) => Promise<void>
}

interface IModalState {
  show: boolean
  currentStep: Step
  lightboxOffset: number
  provider: any
  sdr: any // TBD
}

type Step = 'Step1' | 'Step2' | 'Step3'

const INITIAL_STATE: IModalState = {
  show: false,
  lightboxOffset: 0,
  currentStep: 'Step1',
  provider: null,
  sdr: null
}

export class Modal extends React.Component<IModalProps, IModalState> {
  constructor (props: IModalProps) {
    super(props)
    window.updateWeb3Modal = async (state: IModalState) => this.setState(state)

    const { providerController, onConnect, onError } = props

    providerController.on(CONNECT_EVENT, (provider: any) => {
      this.setState({ provider })
      // request schema to back end
      // if schema requests credentials, go to data vault step (2)
      // otherwise, request auth to back end and go to challenge response step (3)
      this.setState({ sdr: {}, currentStep: 'Step3' })

      // onConnect(provider)
    });

    providerController.on(ERROR_EVENT, (error: any) => onError(error));
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

  public render = () => {
    const { show, lightboxOffset, currentStep, sdr } = this.state

    const { onClose, userOptions, lightboxOpacity, themeColors } = this.props

    return (
      <SLightbox
        className={MODAL_LIGHTBOX_CLASSNAME}
        offset={lightboxOffset}
        opacity={lightboxOpacity}
        ref={c => (this.lightboxRef = c)}
        show={show}
      >
        <SModalContainer className={MODAL_CONTAINER_CLASSNAME} show={show}>
          <SHitbox className={MODAL_HITBOX_CLASSNAME} onClick={onClose} />
          {currentStep === 'Step1' && <WalletProviders show={currentStep === 'Step1'} themeColors={themeColors} userOptions={userOptions} mainModalCard={this.mainModalCard} />}
          {currentStep === 'Step3' && <ConfirmSelectiveDisclosure show={currentStep === 'Step3'} themeColors={themeColors} userOptions={userOptions} mainModalCard={this.mainModalCard} sdr={sdr} />}
        </SModalContainer>
      </SLightbox>
    )
  }
}
