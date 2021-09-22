// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { getTutorialLocalStorageKey, isDCent, isLedger, isTrezor } from '../../lib/hardware-wallets'
import { Button } from '../../ui/shared/Button'
import Checkbox from '../../ui/shared/Checkbox'
import { SmallSpan } from '../../ui/shared/Typography'
import { DCentTutorialComponent, LedgerTutorialComponent, TrezorTutorialComponent } from './tutorials'

interface Interface {
  providerName: string
  handleConnect: () => void
}

const TutorialComponent: React.FC<Interface> = ({ providerName, handleConnect }) => {
  const [hideTutorial, setHideTutorial] = useState<boolean>(false)

  const handleButtonClick = () => {
    if (hideTutorial) {
      localStorage.setItem(getTutorialLocalStorageKey(providerName), 'true')
    }
    handleConnect()
  }

  return (
    <div>
      {isLedger(providerName) && <LedgerTutorialComponent />}
      {isTrezor(providerName) && <TrezorTutorialComponent />}
      {isDCent(providerName) && <DCentTutorialComponent />}
      <p>
        <Button onClick={handleButtonClick}>
          <Trans>Finish tutorial and connect</Trans>
        </Button>
      </p>
      <label>
        <Checkbox checked={hideTutorial} onChange={() => setHideTutorial(!hideTutorial)} />
        <SmallSpan><Trans>Do not show again</Trans></SmallSpan>
      </label>
    </div>
  )
}

export default TutorialComponent
