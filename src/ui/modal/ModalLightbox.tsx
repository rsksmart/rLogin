import styled from 'styled-components'

interface ModalLightboxProps {
  show: boolean;
  offset: number;
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
background-color: ${props => props.theme.overlay};
opacity: 1;
visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
display: flex;
justify-content: center;
align-items: center;

& * {
  box-sizing: border-box !important;
}
`
