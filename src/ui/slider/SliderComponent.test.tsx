// eslint-disable-next-line no-use-before-define
import React from 'react'
import { mount } from 'enzyme'
import SliderComponent from './SliderComponent'

describe('Component: SliderComponent', () => {
  const component = (
    <SliderComponent>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </SliderComponent>
  )

  it('renders the component', () => {
    const wrapper = mount(component)
    expect(wrapper).toBeDefined()
    expect(wrapper.find('div.slide')).toHaveLength(3)
  })

  it('handles the interaction', () => {
    const wrapper = mount(component)
    expect(wrapper.find('div.slide1').props().className).toContain('show')

    wrapper.find('button.dot2').simulate('click')
    expect(wrapper.find('div.slide2').props().className).toContain('show')

    wrapper.find('button.nextSlide').simulate('click')
    expect(wrapper.find('div.slide3').props().className).toContain('show')

    wrapper.find('button.previousSlide').simulate('click')
    expect(wrapper.find('div.slide2').props().className).toContain('show')

    wrapper.find('button.dot1').simulate('click')
    expect(wrapper.find('div.slide1').props().className).toContain('show')
  })
})
