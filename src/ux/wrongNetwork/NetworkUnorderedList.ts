import styled from 'styled-components'

export default styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding: 5px 0;
    font-size: 13px;
    display: block;

    span.text {
      padding: 5px;
      font-size: 15px;
      color: ${props => props.theme.secondaryText};
      font-weight: 400 !important;
    }
  }
`
