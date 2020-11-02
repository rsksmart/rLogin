// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'
import { ERROR_ICON_WRAPPER } from '../constants/cssSelectors'

const ErrorWrapper = styled.div`
  max-width: 50px;
  margin: 10px auto;
`

const ErrorCircle = () => (
  <ErrorWrapper className={ERROR_ICON_WRAPPER}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <circle className="a" stroke="#edb21c" fill="#ffffff" cx="24" cy="24" r="23.5"/>
      <path className="b" stroke="#edb21c" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={3} d="M15.79,14,34.13,32.34"/>
      <path className="b" stroke="#edb21c" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={3} d="M15.79,32.34,34.13,14"/>
    </svg>
  </ErrorWrapper>
)

export default ErrorCircle
