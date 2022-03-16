import * as React from 'react'
import * as ReactDOM from 'react-dom'

import {
  IProviderControllerOptions,
  IProviderUserOptions,
  SimpleFunction,
  EventController
} from 'web3modal'

import { RLoginProviderController } from './controllers/providers'

import { CONNECT_EVENT, ERROR_EVENT, CLOSE_EVENT, ACCOUNTS_CHANGED, CHAIN_CHANGED, THEME_CHANGED, LANGUAGE_CHANGED } from './constants/events'

import { WEB3_CONNECT_MODAL_ID } from './constants/cssSelectors'

import { Core, DataVaultOptions } from './Core'

import { IIPFSCpinnerClient as DataVault } from '@rsksmart/ipfs-cpinner-client-types'
import { checkRLoginInjectedProviders } from './providers/injectedProviders'
import { defaultTheme as defaultThemeConfig, themes as themesConfig, themesOptions } from './theme'
import { RLoginStorage } from './lib/storage'
import { AuthKeys } from './lib/did-auth'
// copy-pasted and adapted
// https://github.com/Web3Modal/web3modal/blob/4b31a6bdf5a4f81bf20de38c45c67576c3249bfc/src/core/index.tsx

const defaultOpts: IProviderControllerOptions = {
  cacheProvider: false,
  disableInjectedProvider: false,
  providerOptions: {},
  network: ''
}

interface RLoginOptions {
  backendUrl?: string
  keepModalHidden?: boolean
  supportedChains?: number[]
  supportedLanguages?: string[]
  dataVaultOptions?: DataVaultOptions
  customThemes?: any
  defaultTheme?: themesOptions
  rpcUrls?: {[key: string]: string}
}

type Options = Partial<IProviderControllerOptions> & RLoginOptions

export class RLogin {
  private eventController: EventController = new EventController();
  private rLoginStorage: RLoginStorage = new RLoginStorage();
  private providerController: RLoginProviderController;
  private userProviders: IProviderUserOptions[];
  private supportedChains?: number[];
  private supportedLanguages?: string[];
  private backendUrl?: string;
  private keepModalHidden: boolean;
  private dataVaultOptions?: DataVaultOptions
  private themes = { ...themesConfig }
  private defaultTheme: themesOptions
  private rpcUrls?: {[key: string]: string}

  constructor (opts?: Options) {
    const options: IProviderControllerOptions = {
      ...defaultOpts,
      ...opts
    }

    // setup provider controller
    this.providerController = new RLoginProviderController({
      disableInjectedProvider: options.disableInjectedProvider,
      cacheProvider: options.cacheProvider,
      providerOptions: options.providerOptions,
      network: options.network
    })

    this.supportedChains = opts && opts.supportedChains
    this.supportedLanguages = opts && opts.supportedLanguages
    this.rpcUrls = opts && opts.rpcUrls

    // setup did auth
    this.backendUrl = opts && opts.backendUrl
    this.dataVaultOptions = opts && opts.dataVaultOptions
    // setup modal
    this.userProviders = checkRLoginInjectedProviders(this.providerController.getUserOptions())
    this.keepModalHidden = (opts && opts.keepModalHidden) || false
    this.themes = themesConfig
    if (opts && opts.customThemes && opts.customThemes.light) {
      this.themes.light = { ...this.themes.light, ...opts.customThemes.light }
    }
    if (opts && opts.customThemes && opts.customThemes.dark) {
      this.themes.dark = { ...this.themes.dark, ...opts.customThemes.dark }
    }
    this.defaultTheme = (opts && opts.defaultTheme) ? opts.defaultTheme : defaultThemeConfig

    this.renderModal()
  }

  get cachedProvider (): string {
    return this.providerController.cachedProvider
  }

  private showModal = () => {
    console.log('[RLogin] showModal')
    // call the window elemenet showRLoginModal() // refactor this later??
    window.showRLoginModal()
  }

  public showWalletInfo = () => {
    // this.updateState({ show: true, currentStep: 'walletInfo' })
  }

  public showChangeNetwork = () => {
    // this.updateState({ show: true, currentStep: 'changeNetwork' })
  }

  /** handles an event and closes modal if open */
  private handleOnAndTrigger = async (event: string, ...args: any) =>
    this.eventController.trigger(event, ...args)

  /** event handlers */
  private onClose = () => {
    // this.resetState()
    this.handleOnAndTrigger(CLOSE_EVENT)
  }

  private onConnect = (provider: any, disconnect: () => void, selectedLanguage:string, selectedTheme:themesOptions, dataVault?: DataVault, authKeys?: AuthKeys) => this.handleOnAndTrigger(CONNECT_EVENT, { provider, disconnect, selectedLanguage, selectedTheme, dataVault, authKeys })
  private onError = (error: any) => this.handleOnAndTrigger(ERROR_EVENT, error) // TODO: add a default error page
  private onAccountsChange = (accounts: string[]) => this.eventController.trigger(ACCOUNTS_CHANGED, accounts)
  private onChainChange = (chainId: string | number) => this.eventController.trigger(CHAIN_CHANGED, chainId)
  private onThemeChanged = (theme:themesOptions) => {
    this.rLoginStorage.setItem(THEME_CHANGED, theme)
    this.eventController.trigger(THEME_CHANGED, theme)
  }

  private onLanguageChanged = (language:string) => this.eventController.trigger(LANGUAGE_CHANGED, language)

  private setupHandlers = (resolve: ((result: any) => void), reject: ((error: any) => void)) => {
    this.on(CONNECT_EVENT, response => resolve(response))
    this.on(ERROR_EVENT, error => reject(error))
    this.on(CLOSE_EVENT, () => reject('Modal closed by user'))
  }

  /** renders the modal in DOM */
  private renderModal () {
    const el = document.createElement('div')
    el.id = WEB3_CONNECT_MODAL_ID
    document.body.appendChild(el)

    ReactDOM.render(
      <Core
        onLanguageChanged={this.onLanguageChanged}
        onThemeChanged={this.onThemeChanged}
        userProviders={this.userProviders}
        onClose={this.onClose}
        providerController={this.providerController}
        onConnect={this.onConnect}
        onError={this.onError}
        onAccountsChange={this.onAccountsChange}
        onChainChange={this.onChainChange}
        backendUrl={this.backendUrl}
        supportedChains={this.supportedChains}
        supportedLanguages={this.supportedLanguages}
        keepModalHidden={this.keepModalHidden}
        dataVaultOptions={this.dataVaultOptions}
        themes = {this.themes}
        defaultTheme = {this.defaultTheme}
        rpcUrls={this.rpcUrls}
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
          .catch(err => {
            console.log('error on the cached provider!', err)
            reject(err)
          })
      } else {
        this.showModal()
      }
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
