import React from 'react'
import { mount } from 'enzyme'
import { WalletProviders } from './WalletProviders'
import { PROVIDERS_FOOTER_TEXT_CLASSNAME, PROVIDERS_DEVELOPER_CLASSNAME } from '../../constants/cssSelectors'
import { themesOptions } from '../../theme'

describe('Component: WalletProviders', () => {
  const providers = [
    { name: 'test1', logo: 'test1.jpg', description: 'description1', onClick: jest.fn() },
    { name: 'test2', logo: 'test2.jpg', description: 'description2', onClick: jest.fn() }
  ]

  const props = {
    userProviders: providers,
    connectToWallet: jest.fn(),
    changeLanguage: jest.fn(),
    availableLanguages: [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }],
    selectedLanguageCode: 'en',
    selectedTheme: 'light' as themesOptions,
    changeTheme: jest.fn()
  }

  const propsWithOneLanguage = { ...props }
  propsWithOneLanguage.availableLanguages = [{ code: 'en', name: 'English' }]

  it('renders and is defined', () => {
    const wrapper = mount(<WalletProviders {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('shows header and footer', () => {
    const wrapper = mount(<WalletProviders {...props} />)
    expect(wrapper.find('h2').text()).toBe('Connect your wallet')
    expect(wrapper.find(`span.${PROVIDERS_FOOTER_TEXT_CLASSNAME}`).text()).toEqual('No wallet? Get one here!')
  })

  it('shows custom providers', () => {
    const wrapper = mount(<WalletProviders {...props} />)
    expect(wrapper.find(`div.${PROVIDERS_DEVELOPER_CLASSNAME}`).children()).toHaveLength(2)

    expect(wrapper.find(`div.${PROVIDERS_DEVELOPER_CLASSNAME}`).childAt(0).find('h3').text()).toEqual('test1')
    expect(wrapper.find(`div.${PROVIDERS_DEVELOPER_CLASSNAME}`).childAt(1).find('h3').text()).toEqual('test2')
  })

  it('shows message about no providers', () => {
    const wrapper = mount(<WalletProviders {...props} userProviders={[]} />)
    expect(wrapper.find('h2').text()).toBe('No wallets found')
  })

  it('show language selector with two options when two language available', () => {
    const wrapper = mount(<WalletProviders {...props} userProviders={[]} />)
    expect(wrapper.find('select').children()).toHaveLength(2)
  })

  it('does not show language selector when only one language available', () => {
    const wrapper = mount(<WalletProviders {...propsWithOneLanguage} userProviders={[]} />)
    expect(wrapper.find('select').children()).toHaveLength(0)
  })
})
