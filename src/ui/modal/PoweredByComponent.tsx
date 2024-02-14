import React from 'react'
import styled from 'styled-components'

const PoweredWrapper = styled.div`
  display: flex;
`

const SVG = styled.svg`
  path.outline {
    fill: ${props => props.theme.name === 'light' ? '#000' : 'white'};
  }
`

const PoweredByComponent: React.FC = () => {
  return (
    <PoweredWrapper>
      <SVG version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 536.6 150" width="47" height="31" >
        <path d="M292.7,81.1v-3.9c12.7-5.2,20.6-16.2,20.6-34.3v-2.6c0-24.2-17.9-40.3-47-40.3l-69.2,0.1L197,149.5h32.2V94.1H274 c4.8,0,8.8,3.9,8.8,8.8v46.7h31.7v-47.9C314.4,89.6,304.2,81.8,292.7,81.1L292.7,81.1z M277.7,49c0,9.3-6.1,15.4-16.6,15.4h-32V32 h32c10.6,0,16.6,6.1,16.6,15.4V49L277.7,49z" className="outline" />
        <path d="M149,0v149.5h-32.2V71.4H90.3c-3.1,0-6.1,1.2-8.4,3.2c-1.3,1.2-2.3,2.6-3,4.2c-0.7,1.6-1.1,3.3-1.1,5.1v18 c0,4.8-3.9,8.8-8.8,8.8H47.7c-4.8,0-8.8-3.9-8.8-8.8V80.2c0-4.8,3.9-8.8,8.8-8.8h19.2c2.6,0,5.1-0.9,7-2.6c1.2-1,2.2-2.3,2.9-3.8 c0.7-1.4,1-3,1-4.6V32.2H0.1V0H149z" className="outline" />
        <path d="M38.9,130.2v0.3c0,10.8-8.7,19.5-19.5,19.5C8.7,150,0,141.3,0,130.5v-0.3c0-10.8,8.7-19.5,19.5-19.5 c5.4,0,10.2,2.2,13.8,5.7C36.8,120,38.9,124.8,38.9,130.2z" className="outline" />
        <path d="M463.4,32.2v29.2H526v29.5h-54c-4.7,0-8.5,3.8-8.5,8.5v50.1h-32.2V0h8.5l96.8,0v32.2H463.4L463.4,32.2z" className="outline" />
        <path d="M387.6,28.2v94H407V150h-71.3v-27.8H355v-94h-19.3V0H407v28.2H387.6z" className="outline" />
      </SVG>
    </PoweredWrapper>
  )
}

export default PoweredByComponent
