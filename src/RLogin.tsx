// eslint-disable-next-line
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {
  IProviderControllerOptions,
  IProviderUserOptions,
  SimpleFunction,
  EventController,
  ProviderController
} from 'web3modal'

import { CONNECT_EVENT, ERROR_EVENT, CLOSE_EVENT, ACCOUNTS_CHANGED, CHAIN_CHANGED } from './constants/events'

import { WEB3_CONNECT_MODAL_ID } from './constants/cssSelectors'

import { Core } from './Core'

// copy-pasted and adapted
// https://github.com/Web3Modal/web3modal/blob/4b31a6bdf5a4f81bf20de38c45c67576c3249bfc/src/core/index.tsx

const INITIAL_STATE = { show: false }

const defaultOpts: IProviderControllerOptions = {
  cacheProvider: false,
  disableInjectedProvider: false,
  providerOptions: {},
  network: ''
}

interface RLoginOptions {
  backendUrl?: string
  supportedChains?: number[]
}

type Options = Partial<IProviderControllerOptions> & RLoginOptions

export class RLogin {
  private show: boolean = INITIAL_STATE.show;
  private eventController: EventController = new EventController();
  private providerController: ProviderController;
  private userProviders: IProviderUserOptions[];
  private supportedChains?: number[];
  private backendUrl?: string;

  constructor (opts?: Options) {
    const options: IProviderControllerOptions = {
      ...defaultOpts,
      ...opts
    }

    // setup provider controller
    this.providerController = new ProviderController({
      disableInjectedProvider: options.disableInjectedProvider,
      cacheProvider: options.cacheProvider,
      providerOptions: options.providerOptions,
      network: options.network
    })

    this.supportedChains = opts && opts.supportedChains

    // setup did auth
    this.backendUrl = opts && opts.backendUrl

    // setup modal
    this.userProviders = this.providerController.getUserOptions()
    this.renderModal()
  }

  get cachedProvider (): string {
    return this.providerController.cachedProvider
  }

  /** opens or closes modal */
  private toggleModal = () => {
    const d = typeof window !== 'undefined' ? document : ''
    const body = d ? d.body || d.getElementsByTagName('body')[0] : ''

    if (body) {
      body.style.overflow = this.show ? '' : 'hidden'
    }

    return this.updateState({ show: !this.show })
  };

  private closeModalIfOpen = async () => {
    if (this.show) {
      await this.toggleModal()
    }
  }

  /** handles an event and closes modal if open */
  private handleOnAndTrigger = async (event: string, ...args: any) => this.closeModalIfOpen()
    .then(() => this.eventController.trigger(event, ...args))

  /** event handlers */
  private onClose = () => this.handleOnAndTrigger(CLOSE_EVENT)
  private onConnect = (provider: any) => this.handleOnAndTrigger(CONNECT_EVENT, provider)
  private onError = (error: any) => this.handleOnAndTrigger(ERROR_EVENT, error) // TODO: add a default error page
  private onAccountsChange = (accounts: string[]) => this.eventController.trigger(ACCOUNTS_CHANGED, accounts)
  private onChainChange = (chainId: string | number) => this.eventController.trigger(CHAIN_CHANGED, chainId)

  private setupHandlers = (resolve: ((result: any) => void), reject: ((error: any) => void)) => {
    this.on(CONNECT_EVENT, provider => resolve(provider))
    this.on(ERROR_EVENT, error => reject(error))
    this.on(CLOSE_EVENT, () => reject('Modal closed by user'))
  }

  /** dangerous! gives responsibility to update modal state */
  private updateState = async (state: any) => {
    Object.keys(state).forEach(key => {
      (this as any)[key] = state[key]
    })
    await window.updateWeb3Modal(state)
  };

  private resetState = () => this.updateState({ ...INITIAL_STATE });

  /** renders the modal in DOM */
  private renderModal () {
    const el = document.createElement('div')
    el.id = WEB3_CONNECT_MODAL_ID
    document.body.appendChild(el)

    ReactDOM.render(
      <Core
        userProviders={this.userProviders}
        onClose={this.onClose}
        resetState={this.resetState}
        providerController={this.providerController}
        onConnect={this.onConnect}
        onError={this.onError}
        onAccountsChange={this.onAccountsChange}
        onChainChange={this.onChainChange}
        backendUrl={this.backendUrl}
        supportedChains={this.supportedChains}
      />,
      document.getElementById(WEB3_CONNECT_MODAL_ID)
    )
  }

  /**
   * Connect to rLogin. This will prompt the modal based on the
   * definitions.
   */
  public connect = (): Promise<any> =>
    // eslint-disable-next-line
    new Promise(async (resolve, reject) => { // weird async, to be refactored
      this.setupHandlers(resolve, reject)

      if (this.cachedProvider) {
        await this.providerController.connectToCachedProvider()
        return
      }

      await this.toggleModal() // pre: the modal is closed
    });

  /**
   * Connect to rLogin with a specific wallet provider
   * @param id provider id (same of configuration)
   */
  public connectTo = (id: string): Promise<any> =>
    // eslint-disable-next-line
    new Promise(async (resolve, reject) => {
      this.setupHandlers(resolve, reject)

      const provider = this.providerController.getProvider(id)

      if (!provider) return reject(new Error(`Cannot connect to provider (${id}), check provider options`))

      await this.providerController.connectTo(provider.id, provider.connector)
    });

  /**
   * Subscribe to modal event
   * @param event event name
   * @param callback event callback closure
   */
  public on (event: string, callback: SimpleFunction): SimpleFunction {
    this.eventController.on({ event, callback })

    return () => this.eventController.off({ event, callback })
  }

  /**
   * Unsubscribe from modal event
   * @param event event name
   * @param callback event callback closure
   */
  public off (event: string, callback?: SimpleFunction): void {
    this.eventController.off({ event, callback })
  }

  /**
   * Clear cached provider from local storage
   */
  public clearCachedProvider (): void {
    this.providerController.clearCachedProvider()
  }

  /**
   * Set cached provider in local storage
   * @param id provider id (same of configuration)
   */
  public setCachedProvider (id: string): void {
    this.providerController.setCachedProvider(id)
  }
}
