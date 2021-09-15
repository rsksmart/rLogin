// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '../../ui/shared/Button'
import LedgerTutorialComponent from './LedgerTutorialComponent'

interface Interface {
  providerName: string
  handleConnect: () => void
}

const TutorialComponent: React.FC<Interface> = ({ providerName, handleConnect }) => {
  return (
    <div>
      <LedgerTutorialComponent />
      <p>
        <Button onClick={handleConnect}>Skip tutorial</Button>
      </p>
    </div>
  )
}

export default TutorialComponent
