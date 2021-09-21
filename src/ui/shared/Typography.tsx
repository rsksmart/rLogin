import React from 'react'
import styled, { css } from 'styled-components'
import { HEADER2_CLASS, HEADER3_CLASS, PARAGRAPH_CLASS, BIG_PARAGRAPH_CLASS, SMALL_SPAN } from '../../constants/cssSelectors'

interface TypographyInterface {
  className?: string;
}

export const typeShared = css`
  font-family: 'Roboto', sans-serif;
`

const Header2Wrapper = styled.h2`
  ${typeShared}
  font-weight: 500 !important;
  font-size: 20px;
  color: ${props => props.theme.h2};
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
  color: ${props => props.theme.h3};
  margin: 18px 0;
`

export const Header3: React.FC<TypographyInterface> = ({ children, className }) => (
  <Header3Wrapper className={className ? `${HEADER3_CLASS} ${className}` : HEADER3_CLASS}>
    {children}
  </Header3Wrapper>
)

const ParagraphWrapper = styled.p`
  ${typeShared}
  font-weight: 400 !important;
  font-size: 12px;
  color: ${props => props.theme.p};
  margin: 12px 0;
`
export const Paragraph: React.FC<TypographyInterface> = ({ children, className }) => (
  <ParagraphWrapper className={className ? `${PARAGRAPH_CLASS} ${className}` : PARAGRAPH_CLASS}>
    {children}
  </ParagraphWrapper>
)

const SmallSpanWrapper = styled.span`
  ${typeShared}
  font-weight: 400 !important;
  font-size: 12px;
  color: ${props => props.theme.p};
  margin: 12px 0;
  margin-left: 8px;
`
export const SmallSpan: React.FC<TypographyInterface> = ({ children, className }) => (
  <SmallSpanWrapper className={className ? `${SMALL_SPAN} ${className}` : SMALL_SPAN}>
    {children}
  </SmallSpanWrapper>
)

const LeftBigParagraphWrapper = styled(ParagraphWrapper)`
  font-size: 14px;
  text-align: left;
`
export const LeftBigParagraph: React.FC<TypographyInterface> = ({ children, className }) => (
  <LeftBigParagraphWrapper className={className ? `${BIG_PARAGRAPH_CLASS} ${className}` : BIG_PARAGRAPH_CLASS}>
    {children}
  </LeftBigParagraphWrapper>
)
