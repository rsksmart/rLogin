// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import { Header2, Paragraph } from '../../../ui/shared/Typography'
import { HardwareImage } from './common'

// @ts-ignore
import DCentDevice from '../assets/DCentDevice.png'

const ParagraphWrapper = styled(Paragraph)`
  padding: 0px 40px;
`

const DCentTutorialComponent = () => <>
  <Header2><Trans>Plug in your D'Cent device</Trans></Header2>
  <ParagraphWrapper><Trans>D'Cent Bridge will pop up. Follow the insttructions to connect your device.</Trans></ParagraphWrapper>
  <HardwareImage src={DCentDevice} alt="DCent device" />
</>

export default DCentTutorialComponent
