// eslint-disable-next-line
import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from './Core'
import { ThemeColors, IProviderUserOptions, ProviderController, IProviderControllerOptions, IProviderOptions } from 'web3modal'

describe('Component: Core', () => {
  it('should render and be described', () => {
    const themeColors: ThemeColors = {
      background: '#FFFFFF',
      main: '#000000',
      secondary: '#000000',
      border: '#FFFFFF',
      hover: '#FFFFFF'
    }

    const option: IProviderUserOptions = {
      name: 'test',
      logo: 'test.jpg',
      description: 'description',
      onClick: jest.fn()
    }
    const providerOptions: IProviderOptions = {
      null: {
        package: 'any'
      }
    }
    const providerControllerOptions: IProviderControllerOptions = {
      disableInjectedProvider: false,
      cacheProvider: false,
      providerOptions: providerOptions,
      network: 'string'
    }

    const wrapper = shallow(
      <Modal
        themeColors={themeColors}
        userOptions={[option]}
        onClose={jest.fn()}
        resetState={jest.fn()}
        lightboxOpacity={60}
        providerController={new ProviderController(providerControllerOptions)}
        onConnect={jest.fn()}
        onError={jest.fn()}
      />
    )
    expect(wrapper).toBeDefined()
  })
})
