import Web3Modal, { ICoreOptions } from 'web3modal'

type Options = Partial<ICoreOptions>

const defaultRSKOptions: Options = {
  providerOptions: {}
}

export default (options: Options = defaultRSKOptions) => new Web3Modal(options)
