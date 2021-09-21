import React, { ReactNode } from 'react'
import styled from 'styled-components'
interface RLoginButtonInterface {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const RLoginButton: React.FC<RLoginButtonInterface> = ({ children, disabled, onClick }) => {
  const ButtonWrapper = styled.button`
    display: 'inline-block';
    margin: '10px';
    padding: '10px 50px';
    border: 'none';
    border-radius: '5px';
    box-shadow: '0px 4px 10px rgba(0,0,0,0.1)';
    font-size: '18px';
    line-height: '100%';
    cursor: ${() => disabled ? 'auto' : 'pointer'};
    background-color: ${props => disabled ? props.theme.disabledBackground : props.theme.primaryBackground};
    color: ${props => disabled ? props.theme.disabledText : props.theme.primaryText};
  `
  return (
    <ButtonWrapper
      onClick={onClick}
      className="rlogin-button"
      disabled={disabled || false}
    >{children}</ButtonWrapper>
  )
}
