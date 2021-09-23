import React, { ReactNode } from 'react'

interface RLoginButtonInterface {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

const buttonStyles = {
  display: 'inline-block',
  margin: '10px',
  padding: '10px 50px',
  border: 'none',
  borderRadius: '5px',
  boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  fontSize: '18px',
  lineHeight: '100%',
  backgroundColor: '#008FF7',
  color: '#FFF',
  cursor: 'pointer'
}

export const RLoginButton: React.FC<RLoginButtonInterface> = ({ children, disabled, onClick }) => (
  <button
    onClick={onClick}
    className="rlogin-button"
    disabled={disabled || false}
    style={{
      ...buttonStyles,
      cursor: disabled ? 'auto' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }}
  >{children}</button>
)
