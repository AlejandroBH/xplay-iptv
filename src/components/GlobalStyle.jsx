import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
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
    scrollbar-color: #bababa #000000;
    scrollbar-width: none;
  }
`;

export default GlobalStyle;
