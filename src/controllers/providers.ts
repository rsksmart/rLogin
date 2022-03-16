import { NetworkParams } from '../lib/networkOptionsTypes'
import { EventController, IProviderInfo, IProviderDisplayWithConnector, IProviderOptions, IProviderControllerOptions, getLocal, getInjectedProvider, INJECTED_PROVIDER_ID, getProviderInfoById, findMatchingRequiredOptions, isMobile, getProviderDescription, filterMatches, removeLocal, setLocal, CONNECT_EVENT, connectors, injected, providers } from 'web3modal'

import { RLoginIProviderUserOptions } from '../Core'
import { RLOGIN_SELECTED_PROVIDER } from '../constants'

export class RLoginProviderController {
  public cachedProvider: {description: string,
    logo: string,
    name:string,
  }

  public shouldCacheProvider: boolean = false;
  public disableInjectedProvider: boolean = false;

  private eventController: EventController = new EventController();
  private injectedProvider: IProviderInfo | null = null;
  private providers: IProviderDisplayWithConnector[] = [];
  private providerOptions: IProviderOptions;
  private network: string = '';

  constructor (opts: IProviderControllerOptions) {
    console.log('debugger')
    // this.cachedProvider = getLocal(CACHED_PROVIDER_KEY) || ''
    this.cachedProvider = getLocal(RLOGIN_SELECTED_PROVIDER) || ''
    console.log('this.cachedProvider')
    console.log(this.cachedProvider)

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
        const { name, logo, connector } = provider

        userOptions.push({
          name,
          logo,
          description: getProviderDescription(provider),
          onClick: (opts?: { chainId: number, rpcUrl?: string, dPath?: string, networkParams?: NetworkParams }) => this.connectTo(name, connector, opts)
        })
      }
    })

    return userOptions
  };

  public getProvider (id: string) {
    console.log('this.providers')
    console.log(providers)
    return filterMatches<IProviderDisplayWithConnector>(
      this.providers,
      (x: { id: string; }) => x.id === id,
      undefined
    )
  }

  public getProviderByName (name: string) {
    console.log({ name })
    console.log('this.providers')
    console.log(name)
    console.log(this.providers)
    return filterMatches<IProviderDisplayWithConnector>(
      this.providers,
      (x: { name: string; }) => x.name === name,
      undefined
    )
  }

  public getProviderOption (name: string, key: 'package' | 'options') {
    return this.providerOptions &&
      this.providerOptions[name] &&
      this.providerOptions[name][key]
      ? this.providerOptions[name][key]
      : {}
  }

  public clearCachedProvider () {
    /* this.cachedProvider */
    // removeLocal(CACHED_PROVIDER_KEY)
    removeLocal(RLOGIN_SELECTED_PROVIDER)
  }

  public setCachedProvider (id: any) {
    this.cachedProvider = id
    console.log('Debugger')
    setLocal(RLOGIN_SELECTED_PROVIDER, id)
  }

  public connectTo = (
    provider: any,
    connector: (providerPackage: any, opts: any) => Promise<any>,
    optionalOpts?: { chainId?: number, rpcUrl?: string, dPath?: string, networkParams?: any }
  ) => {
    const providerPackage = this.getProviderOption(provider.name, 'package')
    const providerOptions = provider.name !== 'portis' ? {
      ...this.getProviderOption(provider.name, 'options'),
      ...optionalOpts
    } : {
      ...this.getProviderOption(provider.name, 'options'),
      network: {
        chainId: optionalOpts?.chainId,
        nodeUrl: optionalOpts?.rpcUrl
      }
    }
    // ref: https://github.com/Web3Modal/web3modal/blob/72596699b97d231dfaa5ef04110b61b8dc77d57d/src/providers/connectors/portis.ts#L28

    const opts = { network: this.network || undefined, ...providerOptions }

    return new Promise((resolve, reject) => {
      connector(providerPackage, opts)
        .then((provider: any) => {
          this.eventController.trigger(CONNECT_EVENT, provider)
          if (this.shouldCacheProvider && this.cachedProvider.name !== provider.name) {
            this.setCachedProvider(provider.provider)
          }
          resolve(true)
        })
        .catch((err: any) => reject(err))
    })
  };

  public connectToCachedProvider () {
    return new Promise((resolve, reject) => {
      // get the optional options to be passed to the provider from localStorage
      const cachedOptions = getLocal(RLOGIN_SELECTED_PROVIDER)
      console.log({ cachedOptions })
      const optionalOpts = cachedOptions ? cachedOptions.chosenNetwork : {}
      console.log('this.cachedProvider: ', this.cachedProvider)
      const provider = this.getProviderByName(this.cachedProvider.name)
      console.log('selected provider:', provider)
      typeof provider !== 'undefined'
        ? resolve(this.connectTo(provider, provider.connector, optionalOpts))
        : reject(new Error('Provider not found'))
    })
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
