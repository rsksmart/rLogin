// eslint-disable-next-line
import React from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import { Header2, Paragraph } from '../../../ui/shared/Typography'
import { HardwareImage } from './common'

// @ts-ignore
import TrezorDevice from '../assets/TrezorDevice.svg'

const ParagraphWrapper = styled(Paragraph)`
  padding: 0px 40px;
`

const TrezorTutorialComponent = () => <>
  <Header2><Trans>Plug in your Trezor device</Trans></Header2>
  <ParagraphWrapper><Trans>Please install Trezor Bridge and follow the instructions to connect your device.</Trans></ParagraphWrapper>
  <ParagraphWrapper><a href="https://wallet.trezor.io/#/bridge" target="_blank" rel="noreferrer"><Trans>Trezor Bridge</Trans></a></ParagraphWrapper>
  <HardwareImage src={TrezorDevice} alt="Trezor device" />
</>

export default TrezorTutorialComponent
