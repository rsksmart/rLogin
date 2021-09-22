import React from 'react'
import styled from 'styled-components'
import { BUTTON_CLASSNAME } from '../../constants/cssSelectors'
import { typeShared } from './Typography'

interface ButtonInterface {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  variant?: 'secondary' | 'primary'
}

const ButtonWrapper = styled.button<{ variant: 'primary' | 'secondary' }>`
  ${typeShared}
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  background: ${(props) =>
    props.variant === 'primary' ? props.theme.primaryBackground : props.theme.secondaryBackground};
  color: ${(props) =>
    props.variant === 'primary' ? props.theme.buttonText : props.theme.buttonTextSecondary};
  font-size: 14px;
  cursor: pointer;
  :hover:enabled {
    background: ${(props) =>
      props.variant === 'primary' ? props.theme.primaryHoverBackground : props.theme.secondaryHoverBackground};
  };
  :disabled {
    opacity: 0.4;
    cursor: auto;
  };
`

export const Button: React.FC<ButtonInterface> = ({ children, className, disabled, onClick, variant }) => (
  <ButtonWrapper
    onClick={onClick}
    className={className ? `${BUTTON_CLASSNAME} ${className}` : BUTTON_CLASSNAME}
    disabled={disabled}
    variant={variant || 'primary'}
  >
    {children}
  </ButtonWrapper>
)
