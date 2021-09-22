// eslint-disable-next-line no-use-before-define
import React from 'react'
import styled from 'styled-components'
import { Trans } from 'react-i18next'
import { Header2, Paragraph } from '../../../ui/shared/Typography'
import SliderComponent from '../../../ui/slider/SliderComponent'

// @ts-ignore
import LedgerConnectImage from '../assets/LedgerConnectImage.svg'
// @ts-ignore
import LedgerImage from '../assets/LedgerImage.svg'
// @ts-ignore
import LedgerConfirm from '../assets/LedgerConfirm.svg'

const ParagraphWrapper = styled(Paragraph)`
  min-height: 50px;
`

const HardwareImage = styled.img`
  height: 105px;
`

const LedgerTutorialComponent: React.FC = () => {
  return (
    <SliderComponent>
      <div>
        <Header2><Trans>Plug in your Ledger device</Trans></Header2>
        <ParagraphWrapper><Trans>Plug in your ledger device to your computer</Trans></ParagraphWrapper>
        <HardwareImage src={LedgerConnectImage} alt="Connect your ledger device" />
      </div>
      <div>
        <Header2>Install apps</Header2>
        <ParagraphWrapper>Open Ledger Live in your computer and install the BTC and ETH, and RSK apps</ParagraphWrapper>
        <HardwareImage src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2><Trans>Close other apps</Trans></Header2>
        <ParagraphWrapper><Trans>Make sure to close any other app that is using ledger now, including Ledger Live</Trans></ParagraphWrapper>
        <HardwareImage src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2><Trans>Open Ethereum or RSK app</Trans></Header2>
        <ParagraphWrapper><Trans>Open the Ethereum or RSK app selecting in through your Ledger device. Use the Ethereum app for RSK Testnet and the RSK app for RSK Mainnet.</Trans></ParagraphWrapper>
        <HardwareImage src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2><Trans>Confirm button</Trans></Header2>
        <ParagraphWrapper><Trans>Click both buttons on your ledger device to confirm</Trans></ParagraphWrapper>
        <HardwareImage src={LedgerConfirm} alt="Ledger Device" />
      </div>
    </SliderComponent>
  )
}

export default LedgerTutorialComponent
