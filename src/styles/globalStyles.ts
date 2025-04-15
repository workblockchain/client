import {createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Alibaba PuHuiTi 3.0';
    src: url('../assets/AlibabaPuHuiTi-3-55-RegularL3.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    font-family: ${(props) => props.theme.fontFamily}, sans-serif;
    margin: 0;
  }
`
