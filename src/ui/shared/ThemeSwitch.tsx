import React from 'react'
import styled from 'styled-components'
import { themesOptions } from '../../theme'

interface SwitchWrapperInterface {
  theme?: themesOptions
  onChange:(theme:themesOptions)=>void
}

const SwitchWrapper = styled.span`
  height: 16px;
  width: 16px;
  border-radius: 5px;
  border: none;
  color: ${props => props.theme.primaryBackground};
  font-size: 14px;
  cursor: pointer;
  :disabled {
    opacity: 0.4;
    cursor: auto;
  }`

const SwitchIcon = styled.svg`
  height: 16px;
  width: 16px;
  color: ${props => props.theme.primaryBackground};
`

export const ThemeSwitcher: React.FC<SwitchWrapperInterface> = ({ theme, onChange }) => {
  return (theme === 'light')
    ? (<SwitchWrapper onClick={() => onChange('dark')} id='theme-switcher'>
      <SwitchIcon id='moon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></SwitchIcon>
    </SwitchWrapper>)
    : (<SwitchWrapper onClick={() => onChange('light')} id='theme-switcher'>
      <SwitchIcon id='sun' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></SwitchIcon>
    </SwitchWrapper>)
}
