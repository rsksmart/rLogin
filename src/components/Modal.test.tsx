import React from 'react'
import { shallow } from 'enzyme'
import { Modal } from './Modal'
import { ThemeColors, IProviderUserOptions } from 'web3modal'

describe('Component: Modal', () => {
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

    const wrapper = shallow(
      <Modal
        themeColors={themeColors}
        userOptions={[option]}
        onClose={jest.fn()}
        resetState={jest.fn()}
        lightboxOpacity={60}
        providerController="string"
        onConnect={jest.fn()}
        onError={jest.fn()}
      />
    )
    expect(wrapper).toBeDefined()
  })
})
