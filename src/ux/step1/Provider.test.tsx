import React from 'react'
import { mount } from 'enzyme'
import { Provider } from './Provider'
import { PROVIDER_CONTAINER_CLASSNAME } from '../../constants/cssSelectors'

describe('Component: Provider', () => {
  const props = {
    userProvider: {
      name: 'Test Provider',
      logo: 'image.jpg',
      description: 'A provider',
      onClick: jest.fn()
    },
    handleConnect: jest.fn(),
    width: '100%',
    hideIfDisabled: false
  }

  it('renders and is defined', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper).toBeDefined()
  })

  it('has correct text and image', () => {
    const wrapper = mount(<Provider {...props} />)
    expect(wrapper.find('h3').text()).toEqual('Test Provider')
    expect(wrapper.find('img').props().src).toEqual('image.jpg')
  })

  it('handles clicking on the parent div', () => {
    const onClick = jest.fn()
    const localProps = { ...props, onClick }
    const wrapper = mount(<Provider {...localProps} />)

    wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })

  describe('hideIfDisabled', () => {
    const localProps = {
      ...props,
      userProvider: {
        name: 'Test Provider',
        logo: 'image.jpg',
        description: 'A provider'
      }
    }

    it('it will show when set to false', () => {
      const wrapper = mount(<Provider {...localProps} hideIfDisabled={false} />)

      expect(wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).text()).toBe('Test Provider')
      expect(wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`).props().disabled).toBeTruthy()
    })

    it('it will hide when set to true', () => {
      const wrapper = mount(<Provider {...localProps} hideIfDisabled={true} />)

      expect(wrapper.find(`div.${PROVIDER_CONTAINER_CLASSNAME}`)).toMatchObject({})
    })
  })
})
