// eslint-disable-next-line no-use-before-define
import React, { useState, Children } from 'react'
import styled from 'styled-components'
import SliderButtons from './SliderButtonComponent'

const SlideComponent = styled.div<{ visible: boolean }>`
  display: ${props => props.visible ? 'block' : 'none'};
`

interface Interface {
  children: React.ReactNode
}

const SliderComponent: React.FC<Interface> = ({ children }) => {
  const slides = Children.toArray(children)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  return (
    <div className="sliderWrapper">
      <div className="slides">
        {Children.map(slides, (child, index) => {
          return (
            <SlideComponent
              className={`slide slide${index + 1} ${index === currentIndex ? 'show' : 'hide'}`}
              visible={index === currentIndex}
            >
              {child}
            </SlideComponent>
          )
        })}
      </div>
      <SliderButtons
        slideCount={slides.length}
        currentIndex={currentIndex}
        changeIndex={(newIndex: number) => setCurrentIndex(newIndex)}
      />
    </div>
  )
}

export default SliderComponent
