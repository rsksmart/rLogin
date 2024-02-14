// adapted from: https://github.com/LucasBassetti/react-css-loaders/blob/master/lib/bubble-spin/BubbleSpin.jsx
import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingText = styled.p`
  color: ${props => props.theme.loadingText}
`

const circleSpinAnimation = keyframes`
  to{transform: rotate(1turn)}
`
const CircleSpin = styled.div`
  width:200px;
  height:200px;
  border-radius:50%;
  background:conic-gradient(#0000 10%,#D1D1D1);
  -webkit-mask:radial-gradient(farthest-side,#0000 calc(100% - 24px),#000 0);
  animation:${circleSpinAnimation} 2s infinite linear;
`

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CircleSpinImageContainer = styled.div`
  position: relative;
`
const Base64Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  margin-top: -35px;
  margin-left: -35px;
`

interface LoadingInterface {
  text?: string
  base64Image?: string
}

const LoadingComponent: React.FC<LoadingInterface> = ({ text, base64Image }) =>
  <LoadingContainer className="loading">
    <CircleSpinImageContainer>
      <CircleSpin />
      {base64Image && (
        <Base64Image
          src={base64Image}
        />
      )}
    </CircleSpinImageContainer>
    {text && <LoadingText>{text}</LoadingText>}
  </LoadingContainer>

export default LoadingComponent
