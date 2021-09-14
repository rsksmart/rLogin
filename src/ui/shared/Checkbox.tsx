// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'
import { CHECKBOX_CLASSNAME } from '../../constants/cssSelectors'

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`
// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

interface StyledCheckboxProps {
    checked: boolean;
}

const StyledCheckbox = styled.div<StyledCheckboxProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => (props.checked ? props.theme.primaryColor : props.theme.p)};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${props => `0 0 0 3px ${props.theme.primaryColor}80`};
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`

interface CheckboxInterface {
    className?: string,
    checked: boolean,
    onChange?: () => void
}

const Checkbox: React.FC<CheckboxInterface> = ({ className, checked, onChange }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} className={CHECKBOX_CLASSNAME} onChange={onChange} />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

export default Checkbox
