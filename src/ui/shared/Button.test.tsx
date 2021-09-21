import React from 'react'
import { shallow, mount } from 'enzyme'
import { Button } from './Button'
import { BUTTON_CLASSNAME } from '../../constants/cssSelectors'

describe('Component: button', () => {
  it('renders and is defined', () => {
    const wrapper = shallow(<Button onClick={jest.fn()}>Hello Button!</Button>)
    expect(wrapper).toBeDefined()
  })

  it('has correct text and default class', () => {
    const wrapper = shallow(<Button onClick={jest.fn()}>Hello button</Button>)
    expect(wrapper.text()).toBe('Hello button')
    expect(wrapper.hasClass(BUTTON_CLASSNAME)).toBeTruthy()
  })

  it('has default and custom class', () => {
    const wrapper = shallow(<Button onClick={jest.fn()} className="alternate">Hello button</Button>)
    expect(wrapper.hasClass('alternate')).toBeTruthy()
    expect(wrapper.hasClass(BUTTON_CLASSNAME)).toBeTruthy()
  })

  it('should handle click event', () => {
    const onClick = jest.fn()
    const wrapper = mount(<Button onClick={onClick}>Hello button</Button>)
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalledTimes(1)
  })
})
