// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react'
interface RLoginButtonInterface {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export const RLoginButton: React.FC<RLoginButtonInterface> = ({ children, disabled, onClick }) => {
  const styles = {
    display: 'inline-block',
    margin: '10px',
    padding: '10px 50px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#008FF7',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    color: '#FFFFFF',
    fontSize: '18px',
    lineHeight: '100%'
  }

  const stylesDisabled = {
    ...styles,
    backgroundColor: '#EFEFEF',
    cursor: 'auto',
    color: '#CCCCCC'
  }

  return (
    <button
      onClick={onClick}
      className="rlogin-button"
      style={disabled ? stylesDisabled : styles}
      disabled={disabled || false}
    >{children}</button>
  )
}
