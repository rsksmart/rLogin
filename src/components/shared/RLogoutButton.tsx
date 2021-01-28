// eslint-disable-next-line no-use-before-define
import React from 'react'
import { RLOGIN_ACCESS_TOKEN, RLOGIN_REFRESH_TOKEN } from '../../constants'

interface RLogoutButtonInterface {
  text?: string
}

const RLogoutButton: React.FC<RLogoutButtonInterface> = ({ text }) => {
  const handleLogout = () => {
    localStorage.removeItem(RLOGIN_ACCESS_TOKEN)
    localStorage.removeItem(RLOGIN_REFRESH_TOKEN)

    Object.keys(localStorage).map((key: string) => {
      if (key.startsWith('DV_ACCESS_TOKEN') || key.startsWith('DV_REFRESh_TOKEN')) {
        localStorage.removeItem(key)
      }
    })
  }

  return (
    <button onClick={handleLogout}>{text || 'Logout'}</button>
  )
}

export default RLogoutButton
