// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'

const SlideButton = styled.button`
  padding: 10px 5px;
  background: none;
  border: 0;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: auto;
  }
`

interface SliderButtonsInterface {
  slideCount: number
  currentIndex: number
  changeIndex: (index: number) => void
}

export const SliderButtons: React.FC<SliderButtonsInterface> = ({ slideCount, currentIndex, changeIndex }) => (
  <div className="buttons">
    <SlideButton
      disabled={currentIndex === 0}
      onClick={() => changeIndex(currentIndex - 1)}
      className="previousSlide"
    >
      <svg width="7" height="18" viewBox="0 0 7 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 16C1.1588 11.1499 0.844295 8.1184 5 2" stroke={currentIndex === 0 ? '#E4E4E4' : '#C4C4C4'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </SlideButton>

    {new Array(slideCount).fill('', 0, slideCount).map((_empty, index) =>
      <SlideButton
        key={index}
        onClick={() => changeIndex(index)}
        className={currentIndex === index ? `selected dot${index + 1}` : `dot${index + 1}`}
      >
        <svg width="6" height="18" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill={currentIndex === index ? '#008FF7' : '#C4C4C4'} />
        </svg>
      </SlideButton>
    )}

    <SlideButton
      disabled={currentIndex + 2 > slideCount}
      onClick={() => changeIndex(currentIndex + 1)}
      className="nextSlide"
    >
      <svg width="7" height="18" viewBox="0 0 7 18" fill="none" xmlns="http://www.w3.org/2000/svg" transform='rotate(180)'>
        <path d="M5 16C1.1588 11.1499 0.844295 8.1184 5 2" stroke={currentIndex + 2 > slideCount ? '#E4E4E4' : '#C4C4C4'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </SlideButton>
  </div>
)

export default SliderButtons
