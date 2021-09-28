import { NetworkParams } from '../lib/networkOptionsTypes'
import { EventController, IProviderInfo, IProviderDisplayWithConnector, IProviderOptions, IProviderControllerOptions, getLocal, CACHED_PROVIDER_KEY, getInjectedProvider, INJECTED_PROVIDER_ID, getProviderInfoById, findMatchingRequiredOptions, isMobile, getProviderDescription, filterMatches, removeLocal, setLocal, CONNECT_EVENT, connectors, injected, providers } from 'web3modal'

import { RLoginIProviderUserOptions } from '../Core'

export class RLoginProviderController {
  public cachedProvider: string = '';
  public shouldCacheProvider: boolean = false;
  public disableInjectedProvider: boolean = false;

  private eventController: EventController = new EventController();
  private injectedProvider: IProviderInfo | null = null;
  private providers: IProviderDisplayWithConnector[] = [];
  private providerOptions: IProviderOptions;
  private network: string = '';

  constructor (opts: IProviderControllerOptions) {
    this.cachedProvider = getLocal(CACHED_PROVIDER_KEY) || ''

    this.disableInjectedProvider = opts.disableInjectedProvider
    this.shouldCacheProvider = opts.cacheProvider
    this.providerOptions = opts.providerOptions
    this.network = opts.network

    this.injectedProvider = getInjectedProvider()

    type ListI = {
      connectors: any,
      injected: any,
      providers: any
    }

    const list: ListI = { connectors, injected, providers }

    this.providers = Object.keys(list.connectors).map((id: string) => {
      let providerInfo: IProviderInfo
      if (id === INJECTED_PROVIDER_ID) {
        providerInfo = this.injectedProvider || list.providers.FALLBACK
      } else {
        providerInfo = getProviderInfoById(id)
      }

      // parse custom display options
      if (this.providerOptions[id]) {
        const options = this.providerOptions[id]
        if (typeof options.display !== 'undefined') {
          providerInfo = {
            ...providerInfo,
            ...this.providerOptions[id].display
          }
        }
      }

      return {
        ...providerInfo,
        connector: list.connectors[id],
        package: providerInfo.package
      }
    })
    // parse custom providers
    Object.keys(this.providerOptions)
      .filter(key => key.startsWith('custom-'))
      .map(id => {
        if (id && this.providerOptions[id]) {
          const options = this.providerOptions[id]
          if (
            typeof options.display !== 'undefined' &&
            typeof options.connector !== 'undefined'
          ) {
            this.providers.push({
              ...list.providers.FALLBACK,
              id,
              ...options.display,
              connector: options.connector
            })
          }
        }
      })
  }

  public shouldDisplayProvider (id: string) {
    const provider = this.getProvider(id)
    if (typeof provider !== 'undefined') {
      const providerPackageOptions = this.providerOptions[id]
      if (providerPackageOptions) {
        const isProvided = !!providerPackageOptions.package
        if (isProvided) {
          const requiredOptions = provider.package
            ? provider.package.required
            : undefined
          if (requiredOptions && requiredOptions.length) {
            const providedOptions = providerPackageOptions.options
            if (providedOptions && Object.keys(providedOptions).length) {
              const matches = findMatchingRequiredOptions(
                requiredOptions,
                providedOptions
              )
              if (requiredOptions.length === matches.length) {
                return true
              }
            }
          } else {
            return true
          }
        }
      }
    }
    return false
  }

  public getUserOptions = () => {
    const mobile = isMobile()

    const defaultProviderList = this.providers.map(({ id }) => id)

    const displayInjected =
      !!this.injectedProvider && !this.disableInjectedProvider
    const onlyInjected = displayInjected && mobile

    const providerList = []

    if (onlyInjected) {
      providerList.push(INJECTED_PROVIDER_ID)
    } else {
      if (displayInjected) {
        providerList.push(INJECTED_PROVIDER_ID)
      }

      defaultProviderList.forEach((id: string) => {
        if (id !== INJECTED_PROVIDER_ID) {
          const result = this.shouldDisplayProvider(id)
          if (result) {
            providerList.push(id)
          }
        }
      })
    }

    const userOptions: RLoginIProviderUserOptions[] = []

    providerList.forEach((id: string) => {
      const provider = this.getProvider(id)
      if (typeof provider !== 'undefined') {
        const { id, name, logo, connector } = provider
        userOptions.push({
          name,
          logo,
          description: getProviderDescription(provider),
          onClick: (opts?: { chainId: number, rpcUrl?: string, networkParams?: NetworkParams }) => this.connectTo(id, connector, opts)
        })
      }
    })

    return userOptions
  };

  public getProvider (id: string) {
    return filterMatches<IProviderDisplayWithConnector>(
      this.providers,
      (x: { id: string; }) => x.id === id,
      undefined
    )
  }

  public getProviderOption (id: string, key: 'package' | 'options') {
    return this.providerOptions &&
      this.providerOptions[id] &&
      this.providerOptions[id][key]
      ? this.providerOptions[id][key]
      : {}
  }

  public clearCachedProvider () {
    this.cachedProvider = ''
    removeLocal(CACHED_PROVIDER_KEY)
  }

  public setCachedProvider (id: string) {
    this.cachedProvider = id
    setLocal(CACHED_PROVIDER_KEY, id)
  }

  public connectTo = (
    id: string,
    connector: (providerPackage: any, opts: any) => Promise<any>,
    optionalOpts?: { chainId?: number, rpcUrl?: string, networkParams?: any }
  ) => {
    const providerPackage = this.getProviderOption(id, 'package')
    const providerOptions = {
      ...this.getProviderOption(id, 'options'),
      ...optionalOpts
    }

    const opts = { network: this.network || undefined, ...providerOptions }

    return new Promise((resolve, reject) => {
      connector(providerPackage, opts)
        .then((provider: any) => {
          this.eventController.trigger(CONNECT_EVENT, provider)
          if (this.shouldCacheProvider && this.cachedProvider !== id) {
            this.setCachedProvider(id)
          }
          resolve(true)
        })
        .catch((err: any) => reject(err))
    })
  };

  public async connectToCachedProvider () {
    const provider = this.getProvider(this.cachedProvider)
    if (typeof provider !== 'undefined') {
      await this.connectTo(provider.id, provider.connector)
    }
  }

  public on (event: string, callback: (result: any) => void): () => void {
    this.eventController.on({
      event,
      callback
    })

    return () =>
      this.eventController.off({
        event,
        callback
      })
  }

  public off (event: string, callback?: (result: any) => void): void {
    this.eventController.off({
      event,
      callback
    })
  }
}
