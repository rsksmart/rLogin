// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import SliderButtonComponent from './SliderButtonComponent'

describe('Component: SliderButtonComponent', () => {
  const sharedProps = {
    slideCount: 5,
    currentIndex: 0,
    changeIndex: jest.fn()
  }

  it('renders the component and correct number of items', () => {
    const wrapper = mount(<SliderButtonComponent {...sharedProps} />)
    expect(wrapper).toBeDefined()

    // 5 buttons and increase and decrease
    expect(wrapper.find('button')).toHaveLength(7)
  })

  it('disables the first item', () => {
    const wrapper = mount(<SliderButtonComponent {...sharedProps} />)
    expect(wrapper.find('button.previousSlide').props().disabled).toBeTruthy()
  })

  it('disables the last item', () => {
    const wrapper = mount(<SliderButtonComponent {...sharedProps} currentIndex={4} />)
    expect(wrapper.find('button.nextSlide').props().disabled).toBeTruthy()
  })

  it('handles dot clicks', () => {
    const changeIndex = jest.fn()
    const wrapper = mount(<SliderButtonComponent {...sharedProps} changeIndex={changeIndex} />)

    wrapper.find('button.dot1').simulate('click')
    expect(changeIndex).toBeCalledWith(0)
  })

  it('handles previous button click', () => {
    const changeIndex = jest.fn()
    const wrapper = mount(<SliderButtonComponent {...sharedProps} currentIndex={4} changeIndex={changeIndex} />)

    wrapper.find('button.previousSlide').simulate('click')
    expect(changeIndex).toBeCalledWith(3)
  })

  it('handles next button click', () => {
    const changeIndex = jest.fn()
    const wrapper = mount(<SliderButtonComponent {...sharedProps} currentIndex={3} changeIndex={changeIndex} />)

    wrapper.find('button.nextSlide').simulate('click')
    expect(changeIndex).toBeCalledWith(4)
  })
})
