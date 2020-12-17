// eslint-disable-next-line no-use-before-define
import React, { ReactNode } from 'react'
interface RLoginButtonInterface {
  children: ReactNode
  onClick?: () => void
}

export const RLoginButton: React.FC<RLoginButtonInterface> = ({ children, onClick }) => {
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

  return (
    <button
      onClick={onClick}
      className="rlogin-button"
      style={styles}
    >{children}</button>
  )
}
