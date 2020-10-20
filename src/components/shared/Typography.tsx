// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled, { css } from 'styled-components'
import { HEADER2_CLASS, HEADER3_CLASS, PARAGRAPH_CLASS } from '../../constants/cssSelectors'

interface TypographyInterface {
  className?: string;
}

const typeShared = css`
  font-family: 'Roboto', sans-serif;
`

const Header2Wrapper = styled.h2`
  ${typeShared}
  font-weight: 500 !important;
  font-size: 20px;
  color: #008FF7;
`

export const Header2: React.FC<TypographyInterface> = ({ children, className }) => (
  <Header2Wrapper className={className ? `${HEADER2_CLASS} ${className}` : HEADER2_CLASS}>
    {children}
  </Header2Wrapper>
)

const Header3Wrapper = styled.h3`
  ${typeShared}
  font-weight: 500 !important;
  font-size: 18px;
  color: #6C6B6C;
`

export const Header3: React.FC<TypographyInterface> = ({ children, className }) => (
  <Header3Wrapper className={className ? `${HEADER2_CLASS} ${className}` : HEADER2_CLASS}>
    {children}
  </Header3Wrapper>
)

const ParagraphWrapper = styled.p`
  ${typeShared}
  font-weight: 400 !important;
  font-size: 12px;
  color: #B0AEB1;
`
export const Paragraph: React.FC<TypographyInterface> = ({ children, className }) => (
  <ParagraphWrapper className={className ? `${PARAGRAPH_CLASS} ${className}` : PARAGRAPH_CLASS}>
    {children}
  </ParagraphWrapper>
)
