// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Header2, Paragraph } from '../../ui/shared/Typography'
import SliderComponent from '../../ui/slider/SliderComponent'

// @ts-ignore
import LedgerConnectImage from './assets/LedgerConnectImage.svg'
// @ts-ignore
import LedgerImage from './assets/LedgerImage.svg'
// @ts-ignore
import LedgerConfirm from './assets/LedgerConfirm.svg'

const LedgerTutorialComponent: React.FC = () => {
  return (
    <SliderComponent>
      <div>
        <Header2>Plug in your Ledger device</Header2>
        <Paragraph>Plug in your ledger device to your computer</Paragraph>
        <img src={LedgerConnectImage} alt="Connect your ledger device" />
      </div>
      <div>
        <Header2>Install BTC and ETH apps</Header2>
        <Paragraph>Open Ledger Live in your computer and install the BTC and ETH, and RSK apps</Paragraph>
        <img src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2>Close other apps</Header2>
        <Paragraph>Make sure to close any other app that is using ledger now, including Ledger Live</Paragraph>
        <img src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2>Open Ethereum or RSK app</Header2>
        <Paragraph>Open the Ethereum or RSK app selecting in through your Ledger device. Use the Ethereum app for RSK Testnet and the RSK app for RSK Mainnet.</Paragraph>
        <img src={LedgerImage} alt="Ledger Device" />
      </div>
      <div>
        <Header2>Confirm button</Header2>
        <Paragraph>Click both buttons on your ledger device to confirm</Paragraph>
        <img src={LedgerConfirm} alt="Ledger Device" />
      </div>
    </SliderComponent>
  )
}

export default LedgerTutorialComponent
