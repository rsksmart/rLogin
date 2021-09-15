// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Button } from '../../ui/shared/Button'
import SliderComponent from '../../ui/slider/SliderComponent'

interface Interface {
  providerName: string
  handleConnect: () => void
}

const TutorialComponent: React.FC<Interface> = ({ providerName, handleConnect }) => {
  return (
    <div>
      <h2>{providerName} tutorial</h2>
      <SliderComponent>
        <div>
          <p>Step 1:</p>
        </div>
        <div>
          <p>Slide 2:</p>
        </div>
        <div>
          <p>Slide 3</p>
        </div>
        <div>
          <p>Slide 4</p>
        </div>
      </SliderComponent>

      <p>
        <Button onClick={handleConnect}>Skip tutorial</Button>
      </p>
    </div>
  )
}

export default TutorialComponent
