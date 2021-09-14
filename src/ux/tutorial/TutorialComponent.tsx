// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '../../ui/shared/Button'

interface Interface {
  providerName: string
  handleConnect: () => void
}

const TutorialComponent: React.FC<Interface> = ({ providerName, handleConnect }) => {
  return (
    <div>
      TutorialComponent Component: {providerName}

      <Button onClick={handleConnect}>Continue</Button>
    </div>
  )
}

export default TutorialComponent
