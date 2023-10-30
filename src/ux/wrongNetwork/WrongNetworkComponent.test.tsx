import React from 'react'
import { mount } from 'enzyme'
import WrongNetworkComponent from './WrongNetworkComponent'
import { networks, AddEthereumChainParameter } from './changeNetwork'

describe('Component: WrongNetworkComponent', () => {
  const metamaskParagraph = 'You are connected to an incorrect network with Metamask. '
  const singleText = 'Please change your wallet to the following network:'
  const sharedProps = {
    supportedNetworks: [1],
    isMetamask: true,
    changeNetwork: jest.fn(),
    chainId: undefined,
    isWrongNetwork: true
  }

  it('renders the component', () => {
    const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
    expect(wrapper).toBeDefined()
  })

  describe('text', () => {
    it('shows error message too select network', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
      expect(wrapper.find('h2').text()).toBe('Select Network')
    })

    it('shows singular text', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
      expect(wrapper.find('p').text()).toBe(metamaskParagraph + singleText)
    })

    it('shows plural text', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[1, 30, 31]} />)
      expect(wrapper.find('p').text()).toBe(metamaskParagraph + 'Please change your wallet to one of the following networks:')
    })

    it('shows generic wallet message when not with metamask', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} isMetamask={false} />)
      expect(wrapper.find('p').text()).toBe('You are connected to an incorrect network with your wallet. ' + singleText)
    })

    it('displays network names or chainIds', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[31, 498]} />)

      expect(wrapper.find('li').at(0).text()).toBe('RSK Testnet')
      expect(wrapper.find('li').at(1).text()).toBe('Network Id 498')
    })
  })

  describe('can change network', () => {
    it('displays text when it can not change network', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[1, 30, 31]} />)

      expect(wrapper.find('ul.automatic li').at(0).text()).toBe('RSK Mainnet')
      expect(wrapper.find('ul.manual li').at(0).text()).toBe('Ethereum Mainnet')
    })

    it('sends the params when clicked', () => {
      const changeNetwork = jest.fn()
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[31]} changeNetwork={changeNetwork} />)

      wrapper.find('button').simulate('click')
      expect(changeNetwork).toBeCalledWith(networks.get(31))
    })
  })

  describe('can change network (!isWrongNetwork)', () => {
    it('displays text when it can not change network', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[1, 30, 31]} isWrongNetwork={false} />)

      expect(wrapper.find('ul.automatic li').at(0).text()).toBe('RSK Mainnet')
      expect(wrapper.find('ul.manual li').at(0).text()).toBe('Ethereum Mainnet')
    })

    it('sends the params when clicked', () => {
      const changeNetwork = jest.fn()
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[31]} changeNetwork={changeNetwork} isWrongNetwork={false} />)

      wrapper.find('button').simulate('click')
      expect(changeNetwork).toBeCalledWith(networks.get(31))
    })
  })

  describe('non-metamask', () => {
    it('shows text instead of buttons if !isMetamask', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[30]} isMetamask={false} />)
      expect(wrapper.find('button')).toHaveLength(0)
    })
  })

  describe('switch to custom network', () => {
    const rskChains: AddEthereumChainParameter[] = [
      {
        chainId: '0x1e',
        chainName: 'RSK Mainnet',
        nativeCurrency: {
          name: 'RSK BTC',
          symbol: 'RBTC',
          decimals: 18
        },
        rpcUrls: ['https://public-node.rsk.co'],
        blockExplorerUrls: ['https://explorer.rsk.co'],
        iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
      },
      {
        chainId: '0x1f',
        chainName: 'RSK Testnet',
        nativeCurrency: {
          name: 'Test RSK BTC',
          symbol: 'tRBTC',
          decimals: 18
        },
        rpcUrls: ['https://public-node.testnet.rsk.co'],
        blockExplorerUrls: ['https://explorer.testnet.rsk.co'],
        iconUrls: ['https://developers.rsk.co/assets/img/favicons/android-chrome-192x192.png']
      }
    ]
    const props = {
      supportedNetworks: rskChains.map(({ chainId }) => parseInt(chainId, 16)),
      isMetamask: true,
      changeNetwork: jest.fn(),
      chainId: undefined,
      isWrongNetwork: true,
      ethereumChains: new Map(rskChains.map(chain => [parseInt(chain.chainId, 16), chain]))
    }
    it('displays the networks', () => {
      const wrapper = mount(<WrongNetworkComponent {...props} />)
      rskChains.forEach(({ chainName }, index) => {
        expect(wrapper.find('li').at(index).text()).toBe(chainName)
      })
    })

    it('sends the params when clicked', () => {
      const changeNetwork = jest.fn()
      const wrapper = mount(<WrongNetworkComponent {...props} changeNetwork={changeNetwork} />)
      rskChains.forEach((chain, index) => {
        wrapper.find('button').at(index).simulate('click')
        expect(changeNetwork).toBeCalledWith(chain)
      })
    })
  })
})
