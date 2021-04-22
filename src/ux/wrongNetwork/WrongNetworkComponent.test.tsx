// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import WrongNetworkComponent from './WrongNetworkComponent'
import { networks } from './changeNetwork'

describe('Component: WrongNetworkComponent', () => {
  const sharedProps = {
    currentNetwork: 31,
    supportedNetworks: [1],
    isMetamask: true,
    changeNetwork: jest.fn()
  }

  it('renders the component', () => {
    const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
    expect(wrapper).toBeDefined()
  })

  describe('text', () => {
    it('shows error message about incorrect network', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
      expect(wrapper.find('h2').text()).toBe('Incorrect Network')
    })

    it('shows singular text', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} />)
      expect(wrapper.find('p').text()).toBe('Please change your wallet to the following network:')
    })

    it('shows plural text', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[1, 30, 31]} />)
      expect(wrapper.find('p').text()).toBe('Please change your wallet to one of the following networks:')
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

      expect(wrapper.find('li').at(0).text()).toBe('Ethereum Mainnet')
      expect(wrapper.find('button').at(0).text()).toBe('RSK Mainnet')
    })

    it('sends the params when clicked', () => {
      const changeNetwork = jest.fn()
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} supportedNetworks={[31]} changeNetwork={changeNetwork} />)

      wrapper.find('button').simulate('click')
      expect(changeNetwork).toBeCalledWith(networks.get(31))
    })
  })

  describe('non-metamask', () => {
    it('shows text instead of buttons if !isMetamask', () => {
      const wrapper = mount(<WrongNetworkComponent {...sharedProps} isMetamask={false} />)
      expect(wrapper.find('button')).toHaveLength(0)
    })
  })
})
