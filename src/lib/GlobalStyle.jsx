import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";
import "asset/font/font.css";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    box-sizing: border-box;
    outline: none;
  }
`;
