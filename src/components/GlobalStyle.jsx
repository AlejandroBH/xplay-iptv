import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  //Reset default styles
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #000000;
    overflow-y: hidden;
    overflow-x: hidden;
    color: #ffffff;
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default GlobalStyle;
