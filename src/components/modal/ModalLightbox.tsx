import styled from 'styled-components'

interface ModalLightboxProps {
  show: boolean;
  offset: number;
  opacity?: number;
}

export const ModalLightbox = styled.div<ModalLightboxProps>`
font-family: Rubik;
transition: opacity 0.1s ease-in-out;
text-align: center;
position: fixed;
width: 100vw;
height: 100vh;
margin-left: -50vw;
top: ${({ offset }) => (offset ? `-${offset}px` : 0)};
left: 50%;
z-index: 2;
will-change: opacity;
background-color: ${({ opacity }) => {
  let alpha = 0.4
  if (typeof opacity === 'number') {
    alpha = opacity
  }
  return `rgba(0, 0, 0, ${alpha})`
}};
opacity: ${({ show }) => (show ? 1 : 0)};
visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
display: flex;
justify-content: center;
align-items: center;

& * {
  box-sizing: border-box !important;
}
`
