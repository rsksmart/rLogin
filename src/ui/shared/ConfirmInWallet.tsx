// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Trans } from 'react-i18next'

import LoadingComponent from './Loading'
import { Header2, Paragraph } from './Typography'

// @ts-ignore
import ledgerConfirm from '../../ux/tutorial/assets/LedgerConfirm.svg'
// @ts-ignore
import trezorConfirm from '../../ux/tutorial/assets/trezorConfirm.svg'

interface Interface {
  providerName?: string
}

const ConfirmInWallet: React.FC<Interface> = ({ providerName }) => {
  switch (providerName) {
    case 'Ledger': return (
      <>
        <Header2><Trans>Confirm on your Ledger</Trans></Header2>
        <Paragraph><Trans>Click both buttons on your ledger device to confirm.</Trans></Paragraph>
        <img src={ledgerConfirm} alt="Confirm on your Ledger" />
      </>
    )
    case 'Trezor': return (
      <>
        <Header2><Trans>Confirm on your Trezor</Trans></Header2>
        <Paragraph><Trans>Click on the screen of your trezor device to sign the message.</Trans></Paragraph>
        <img src={trezorConfirm} alt="Confirm on your Trezor" />
      </>
    )
    default: return (
      <div>
        <Header2><Trans>Confirm in your wallet</Trans></Header2>
        <LoadingComponent />
      </div>
    )
  }
}

export default ConfirmInWallet
