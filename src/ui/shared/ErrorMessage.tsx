import React from 'react'
import styled from 'styled-components'
import { ERROR_MESSAGE_WRAPPER, HEADER2_CLASS } from '../../constants/cssSelectors'
import ErrorCircle from '../../images/ErrorCircle'
import { Paragraph } from './Typography'

interface ErrorMessageInterface {
  className?: string;
  title?: string;
  description?: string;
  footerCta?: React.ReactNode;
}

const ErrorHeading = styled.h2`
  font-weight: 400 !important;
  font-size: 16px;
  color: ${props => props.theme.error};
`

const forceString = (text: any) => typeof text === 'string' ? text : (text as any).toString()

export const ErrorMessage: React.FC<ErrorMessageInterface> = ({ className, title, description, footerCta }) => (
  <div className={className ? `${ERROR_MESSAGE_WRAPPER} ${className}` : ERROR_MESSAGE_WRAPPER}>
    <ErrorCircle />
    {title && <ErrorHeading className={HEADER2_CLASS}>{forceString(title)}</ErrorHeading>}
    {description && <Paragraph>{forceString(description)}</Paragraph>}
    {footerCta && <div className="footer">{footerCta}</div>}
  </div>
)
