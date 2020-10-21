// eslint-disable-next-line
import React from 'react'
import { shallow } from 'enzyme'
import { Core } from './Core'
import { IProviderUserOptions, ProviderController, IProviderControllerOptions, IProviderOptions } from 'web3modal'

describe('Component: Core', () => {
  it('should render and be described', () => {
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
      <Core
        userOptions={[option]}
        onClose={jest.fn()}
        resetState={jest.fn()}
        providerController={new ProviderController(providerControllerOptions)}
        onConnect={jest.fn()}
        onError={jest.fn()}
      />
    )
    expect(wrapper).toBeDefined()
  })
})
