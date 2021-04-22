import styled from 'styled-components'

export default styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    padding: 5px 0;
    font-size: 13px;

    button {
      display: block;
      width: 100%;
      cursor: pointer;
      border: none;
      background-color: #F2F2F2;
      border-radius: 12px;
      padding: 12px;
    }

    button:hover {
      background-color: #E4E4E4;
    }

    button:focus {
      outline:0;
    }

    span {
      display: block;
      padding: 5px;
    }
  }
`
