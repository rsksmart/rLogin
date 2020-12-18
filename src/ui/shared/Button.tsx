// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'
import { BUTTON_CLASSNAME } from '../../constants/cssSelectors'
import { typeShared } from './Typography'

interface ButtonInterface {
  onClick: () => void;
  className?: string;
}

const ButtonWrapper = styled.button`
  ${typeShared}
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  background: #008FF7;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  :hover {
    background: #0066CC;
  }
`

export const Button: React.FC<ButtonInterface> = ({ children, className, onClick }) => (
  <ButtonWrapper
    onClick={onClick}
    className={className ? `${BUTTON_CLASSNAME} ${className}` : BUTTON_CLASSNAME}
  >
    {children}
  </ButtonWrapper>
)