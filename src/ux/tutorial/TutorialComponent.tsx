// eslint-disable-next-line no-use-before-define
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { DONT_SHOW_TUTORIAL_AGAIN_KEY } from '../../constants'
import { Button } from '../../ui/shared/Button'
import Checkbox from '../../ui/shared/Checkbox'
import { SmallSpan } from '../../ui/shared/Typography'
import LedgerTutorialComponent from './LedgerTutorialComponent'

interface Interface {
  providerName: string
  handleConnect: () => void
}

const TutorialComponent: React.FC<Interface> = ({ providerName, handleConnect }) => {
  const [hideTutorial, setHideTutorial] = useState<boolean>(false)

  const handleButtonClick = () => {
    if (hideTutorial) {
      localStorage.setItem(DONT_SHOW_TUTORIAL_AGAIN_KEY, 'true')
    }
    handleConnect()
  }

  return (
    <div>
      <LedgerTutorialComponent />
      <p>
        <Button onClick={handleButtonClick}>Skip tutorial and connect</Button>
      </p>
      <label>
        <Checkbox checked={hideTutorial} onChange={() => setHideTutorial(!hideTutorial)} />
        <SmallSpan><Trans>Do not show again</Trans></SmallSpan>
      </label>
    </div>
  )
}

export default TutorialComponent
